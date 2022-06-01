const db = require('./database')
const cors = require('cors');
const express = require('express');

db()

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/seller', require('./routes/sellerAccountRegistration'))
app.use('/api/product' , require('./routes/products'))
// app.use('/api/paymentGateway' , require('./utils/paymentGateway'))


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})