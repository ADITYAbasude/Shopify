
const mongoose = require('mongoose')
const { Schema } = mongoose

const signUpAuthentication = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        default: '',
    },
    password:{
        type: String,
        required: true,
        unique: false
    }
})

const SignUp = mongoose.model('auth' , signUpAuthentication)
module.exports = SignUp