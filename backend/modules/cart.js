const mongoose = require('mongoose')
const { Schema } = mongoose


const productSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product', 
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
    stock: {
        type: Number,
        required: true
    }
},
{ timestamps: true})

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products: [productSchema]
})

module.exports = mongoose.model('cart', cartSchema)