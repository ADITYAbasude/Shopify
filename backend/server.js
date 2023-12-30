const db = require("./database");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

db();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
``;
app.use("/api/auth", require("./routes/auth"));
app.use("/api/seller", require("./routes/sellerAccountRegistration"));
app.use("/api/product", require("./routes/products"));
app.use("/api/paymentGateway", require("./utils/paymentGateway"));
app.use("/api/orders", require("./routes/productOrder"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
