const express = require("express");
const { body, validationResult } = require('express-validator');
const JWT = require('jsonwebtoken')
const bcryptjs = require("bcryptjs");
const router = express.Router()
const registration = require('../modules/sellerRegister');
const sellerMiddleware = require("../middleware/sellerMiddleware");
const product = require('../modules/addProductModule')

require('dotenv').config()



router.post('/registration',
    [
        body('contactNumber').isLength({ min: 10 }),
        body('email').isEmail(),
        body('password').isStrongPassword()
    ], async (req, res) => {
        const { shopName, contactNumber, email, password, address, pincode } = req.body
        const error = validationResult(req)


        if (!error.isEmpty())
            return res.status(400).json({ error: error.array() })       // if error is occurred then throw a BAD REQUEST status (400)

        const checkUSerEmail = await registration.findOne({ email: email })
        const checkUSerPhoneNumber = await registration.findOne({ contactNumber: contactNumber })

        if (checkUSerEmail && checkUSerPhoneNumber) {
            return res.status(406).json({ error: "User already exist" })
        }
        try {
            const genSalt = await bcryptjs.genSalt(10)
            const passwordHash = await bcryptjs.hash(password, genSalt)

            const seller = await registration.create({
                shopName: shopName,
                contactNumber: contactNumber,
                email: email,
                password: passwordHash,
                address: address,
                pincode: pincode
            })


            const sellerId = { seller: { id: seller.id } }
            const jwt = JWT.sign(sellerId, process.env.khupiya)

            res.json({ sellerToken: jwt })
        } catch (e) {
            res.status(500).json({ error: e })       // if any error is occurred then throw a INTERNAL SERVER ERROR status (500)
        }


    })

router.post('/sellerLogin', [
    body('email').isEmail(),
], async (req, res) => {
    const error = validationResult(req)
    const { email, password } = req.body
    if (!error)
        return res.status(400).json({ error: error })       // when user puts a wrong validation, then it will throw a BAD REQUEST status (400)

    try {
        const seller = await registration.findOne({ email })
        if (!seller)
            return res.status(404).json({ error: "check your email id and try again" })
        const compPassword = await bcryptjs.compare(password, seller.password)
        if (!compPassword)
            return res.status(404).json({ error: " incorrect password" })      // if user is not found, them it will throw a NOT FOUND status (404)

        const sellerId = { seller: { id: seller.id } }
        const jwt = JWT.sign(sellerId, process.env.khupiya)
        res.json({ sellerToken: jwt })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})


router.post('/getSeller/:productId', async (req, res) => {
    try {
        const { productId } = req.params
        if (!productId) {
            console.log('give a product id')
        }
        const id = await product.findById({ _id: productId })
        const seller = await registration.findById(id.sellerId)
        res.json({ sellerData: seller })
    } catch (error) {
        res.json({ error: error }).status(500)
    }
})




module.exports = router