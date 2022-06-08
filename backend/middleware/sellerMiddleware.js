
const jwt = require('jsonwebtoken')
require('dotenv').config()


const sellerMiddleware = (req, res, next) => {
    const token = req.header('seller-token');
    if (!token) {
        res.status(401).send({ error: "Unauthorized user" })
    }
    try {

        const data =  jwt.verify(token, process.env.khupiya);
        req.seller = data.seller;
        next();
    } catch (error) {
        res.status(401).send({ error: error})
    }
}

module.exports = sellerMiddleware 