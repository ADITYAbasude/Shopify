const mongoose = require('mongoose')
const { Schema } = mongoose


const productSchema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        data: Buffer,
        contentType: String
    },
    amount: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seller"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productId"
    }

},
    { timestamps: true })

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    orders: [productSchema]
})

module.exports = mongoose.model('orders', orderSchema)