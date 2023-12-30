const express = require("express");
const productModule = require("../modules/addProductModule");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const router = express.Router();
const sellerMiddleware = require("../middleware/sellerMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const cart = require("../modules/cart");
const fs = require("fs");
const path = require("path");
const addProductModule = require("../modules/addProductModule");

require("dotenv").config();

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads");
  },
  filename: (req, file, cd) => {
    cd(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// taking a random products from product collection
router.get("/randProduct", async (req, res) => {
  const product = await addProductModule.find().limit(6);
  let arr = [];
  try {
    arr.push(
      product.sort((a, b) => {
        return 0.5 - Math.random();
      })
    );
    res.json(arr);
  } catch (error) {
    console.log(arr);
  }
});

// add product api
router.post(
  "/addProduct",
  sellerMiddleware,
  upload.single("productImage"),
  async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array(),
      });
    }

    try {
      const sellerId = req.seller.id;
      const { title, productsDetails, stock, amount, productType } = req.body;
      if (productType === "Type of product" || productType === undefined)
        return res.status(400).json({
          error: "pls select type of product",
        });

      // console.log(req.files.testImage)

      const product = await productModule.create({
        title: title,
        productsDetails: productsDetails,
        stock: stock,
        amount: amount,
        productType: productType,
        sellerId: sellerId,
        image: {
          data: fs.readFileSync(path.join(req.file.path)),
          contentType: `image/jpg`,
        },
      });

      await product.save();

      res.status(200).json({ message: "successfully added" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internet server error");
    }
  }
);

// get a Seller products
router.get("/getSellerProducts", sellerMiddleware, async (req, res) => {
  try {
    const product = await productModule.find({ sellerId: req.seller.id });

    res.json({ product });
  } catch (e) {
    console.log({ error: e });
  }
});

router.get("/getProducts/:productType", async (req, res) => {
  try {
    const productType = req.params.productType;
    const arr = new Array(5);
    const data = await productModule.find({ productType: productType });
    data.sort(() => {
      return 0.5 - Math.random();
    });
    res.json({ data });
  } catch (e) {
    console.log(e);
    res.json({ error: e }).status(500);
  }
});

router.post(
  "/:productID/rating",
  authMiddleware,
  [
    body("rating").isNumeric().isLength({ min: 1 }),
    body("comment").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) return res.status(400).json({ error: error });
      const productID = req.params.productID;
      const { name, comment, rating } = req.body;
      const product = await productModule.findById(productID);

      if (product) {
        const alreadyReview = product.reviews.find(
          (r) => r.user.toString() === req.findUser.id.toString()
        );

        if (alreadyReview) {
          return res.status(406).json({ message: "you already reviewed" });
        }

        const review = {
          name: name,
          rating: Number(rating),
          comment: comment,
          user: req.findUser.id,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = Number(
          product.reviews.reduce((rate, product) => product.rating + rate, 0) /
            product.numReviews
        );

        await product.save();
        res.status(201).json({ message: "successfully created" });
      }
    } catch (e) {
      res.json({ error: e }).status(500);
      console.log(e);
    }
  }
);

router.get("/productDetail/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const data = await productModule.find({ _id: productId });
    if (data.length === 0)
      return res
        .status(400)
        .json({ error: "sorry! we haven't found such a product 😢" });
    res.json({ data });
  } catch (e) {
    console.log(e);
    res.json({ error: e }).status(500);
  }
});

// this router is for, to add your favorite products in your card list
router.post("/addCart/:productId", authMiddleware, async (req, res) => {
  const userId = req.findUser.id;
  const already = await cart.findOne({ user: userId });
  const { productId } = req.params;
  const { title, amount, stock, image } = req.body;
  try {
    const checkProduct = already.products.find(
      (p) => p.productId.toString() === productId.toString()
    );
    if (checkProduct) {
      return res.status(202).json({ message: "Successfully added" });
    }

    const createCart = {
      productId,
      title,
      image,
      amount,
      stock,
    };
    already.products.push(createCart);
    await already.save();
    res.status(201).json({ message: "Successfully added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

//  this router is for getting the product from the card list
router.get("/cardList", authMiddleware, async (req, res) => {
  const userId = req.findUser.id;
  const getProductList = await cart.findOne({ user: userId });

  try {
    if (!getProductList)
      return res.status(404).json({ message: "Not found 😢" });

    res.json(getProductList.products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

// deleting the product from cart list
router.delete("/deleteCart/:productId", authMiddleware, async (req, res) => {
  const pro = await cart.findOne({ user: req.findUser.id });
  try {
    if (!pro) return res.status(404).json("not found");
    pro.products = pro.products.filter(
      (item) => item.productId != req.params.productId
    );

    const result = await pro.save();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

// updating quantity of products in cart list
router.put("/updateQuantity/:productId", authMiddleware, async (req, res) => {
  const productId = req.params.productId;
  const product = await cart.findOne({ user: req.findUser.id });
  const { quantity } = req.body;
  try {
    if (!product) return res.status(404).json({ message: "Not found" });

    product.products.filter((item) => {
      if (item.productId == productId) {
        item.quantity = quantity;
        res.json({ message: "successfully update" });
      }
    });
    await product.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
