const express = require("express");
const router = express.Router()
const Razorpay = require("razorpay");
const shortid = require("shortid");


require("dotenv").config()


const instance = new Razorpay({
    key_id: process.env.keyId,
    key_secret: process.env.keySecret
})


router.post('/createOrder', async (req, res) => {
    const {amount , currency} = req.body
    try {
        const order = {
            amount: Number(amount),
            currency: currency,
            receipt: shortid.generate(),
            payment_capture: 1
        }

        const response = await instance.orders.create(order)
        res.json(response)

    } catch (e) {
        res.status(400).json({ error: e })
        console.log(e)
    }
})

module.exports = router
