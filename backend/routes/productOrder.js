const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const orders = require("../modules/orders");
const router = express.Router()
const addProductModule = require("../modules/addProductModule");
const sellerOrders = require("../modules/sellerOrders");
const sellerMiddleware = require("../middleware/sellerMiddleware");



router.post('/orders/:orderId', authMiddleware, async (req, res) => {
    let { title, amount, image, paymentId, sellerId, productId, quantity } = req.body
    const userId = req.findUser.id
    const already = await orders.findOne({ user: userId })

    let { orderId } = req.params
    try {
        if (!already)   // checking already order cart is created or not.
            return res.status(404).json({ message: 'Not found' })

        // remove useless text from id
        orderId = orderId.split("order_").at(1)
        paymentId = paymentId.split("pay_").at(1)

        // create an order cart
        const createCart = {
            orderId,
            title,
            image,
            amount,
            paymentId,
            sellerId,
            productId
        }

        const createSellerOrder = {
            orderId,
            paymentId,
            amount,
            productId,
            userId,
            quantity
        }
        console.log(sellerId)
        const findSeller = await sellerOrders.findOne({ sellerId: sellerId })
        const sellerProducts = await addProductModule.findById(productId)

        console.log(sellerProducts)
        findSeller.orders.push(createSellerOrder)
        sellerProducts.stock = sellerProducts.stock - 1         // decrease the product stock

        already.orders.push(createCart)     // ;push an order to order cart

        await sellerProducts.save()
        await findSeller.save()
        await already.save()
        res.status(201).json({ message: "Successfully order" })
    } catch (error) {
        res.status(500).json({ message: error })
        console.error(error)
    }
})

router.get('/getOrders', authMiddleware, async (req, res) => {
    const userId = req.findUser.id
    const already = await orders.findOne({ user: userId })
    try {
        res.json(already.orders)
    } catch (error) {
        res.status(500).json({ message: error })
        console.error(error)
    }
})



router.get('/getSellerOrders', sellerMiddleware, async (req, res) => {

    const sellerId = req.seller.id
    const sellerOrder = await sellerOrders.findOne({ sellerId: sellerId })
    try {

        res.json(sellerOrder.orders.reverse())

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
})


module.exports = router
