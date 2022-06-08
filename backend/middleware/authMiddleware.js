const jwt = require("jsonwebtoken");
require('dotenv').config()


const authMiddleware = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Unauthorized user" })
    }
    try {
        const data = jwt.verify(token, process.env.khupiya);
        req.findUser = data.findUser;
        
        next();
    } catch (error) {
        res.status(401).send({ error: error})
    }
}

module.exports = authMiddleware