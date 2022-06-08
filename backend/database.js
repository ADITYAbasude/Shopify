const mongoose = require('mongoose');

require('dotenv').config()

const url = process.env.databaseUrl

const connectToMongo =  () => {
    mongoose.connect(url, () => {
        console.log("Connected to mongodb successfully")
    });
}

module.exports = connectToMongo;