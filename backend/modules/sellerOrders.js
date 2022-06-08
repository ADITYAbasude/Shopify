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
    amount: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    orderProcessing: {
        type: Boolean,
        default: false,
    },
    orderOutOfDelivery: {
        type: Boolean,
        default: false,
    },
    orderSuccessful: {
        type: Boolean,
        default: false,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productId"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

},
    { timestamps: true })

const orderSchema = new Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "seller"
    },
    orders: [productSchema]
})

module.exports = mongoose.model('sellerOrders', orderSchema)