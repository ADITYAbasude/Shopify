const express = require("express");
const Authentication = require("../modules/authentication");
const { body, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const cart = require("../modules/cart");
const orders = require("../modules/orders");
require("dotenv").config();

//      signUp for user  required
// TODO:
router.post(
  "/signUp",
  [
    body("name").notEmpty(),
    body("mobile").isLength({ min: 10 }),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() }); // if error is occurred then throw a BAD REQUEST status (400)
    }
    try {
      let findUser = await Authentication.findOne({ email: req.body.email }); // checking that user is exist or not
      // if user already exist then throws a NOT ACCEPTABLE status (406)
      if (findUser)
        return res.status(406).json({ error: "User is already exist" });

      const genSalt = await bcryptjs.genSalt(10); // generating a salt value trying
      const passwordHashing = await bcryptjs.hash(req.body.password, genSalt); // hashing the password

      findUser = await Authentication.create({
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        password: passwordHashing,
      });

      const userId = { findUser: { id: findUser.id } };
      const jwt = JWT.sign(userId, process.env.khupiya); // generating a jsonWebToken

      const findCart = await cart.findOne({ user: userId.findUser.id }); // creating a cart for a user to add their favorite products
      const findOrderCart = await orders.findOne({ user: userId.findUser.id });
      if (!findCart) {
        cart.create({
          user: userId.findUser.id,
        });
      }

      if (!findOrderCart) {
        orders.create({
          user: userId.findUser.id,
        });
      }

      res.status(200).json({ jwtToken: jwt });
    } catch (e) {
      console.error(e);
      // res.status(500).json({ error: e }); // if any error is occurred then throw a INTERNAL SERVER ERROR status (500)
    }
  }
);

// user login api

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 8 })],
  async (req, res) => {
    const error = validationResult(req);

    if (!error) return res.status(400).json({ error: error }); // when user puts a wrong validation, then it will throw a BAD REQUEST status (400)

    const { email, password } = req.body;

    try {
      const findUser = await Authentication.findOne({ email });
      if (!findUser)
        return res
          .status(404)
          .json({ error: email + " not found such user 😢" }); // if user is not found, them it will throw a NOT FOUND status (404)

      const compPassword = await bcryptjs.compare(password, findUser.password);

      if (!compPassword)
        return res.status(404).json({ error: " incorrect password" }); // if user is not found, them it will throw a NOT FOUND status (404)

      const userId = { findUser: { id: findUser.id } };
      const jwt = JWT.sign(userId, process.env.khupiya); // generating a jsonWebToken

      const findCart = await cart.findOne({ user: userId.findUser.id }); // creating a cart for a user to add their favorite products
      const findOrderCart = await orders.findOne({ user: userId.findUser.id });
      if (!findCart) {
        cart.create({
          user: userId.findUser.id,
        });
      }

      if (!findOrderCart) {
        orders.create({
          user: userId.findUser.id,
        });
      }
      res.json({ jwtToken: jwt });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
);

router.get("/getUserInfo", authMiddleware, async (req, res) => {
  try {
    const id = req.findUser.id;
    const user = await Authentication.findById(id).select("-password");
    res.json({ userInfo: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;
