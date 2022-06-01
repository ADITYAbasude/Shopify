const mongoose = require("mongoose");
const { Schema } = mongoose


const sellerRegistration = new Schema({
    shopName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    }
}) 

const Registration = mongoose.model('seller' , sellerRegistration);
module.exports = Registration 