const db = require("./database");
const cors = require("cors");
const Express = require("express");
const morgan = require("morgan");
const path = require("path");

db();

const app = Express();

const port = process.env.PORT || 5000;

app.use(Express.json());
app.use(morgan("dev"));
app.use(cors());

app.use(Express.static(`${__dirname}/client`));

// deployment
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(Express.static(path.join(__dirname1, `/client/build`)));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname1, `client`, `build`, `index.html`));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use("/api/auth", require("./routes/auth"));
app.use("/api/seller", require("./routes/sellerAccountRegistration"));
app.use("/api/product", require("./routes/products"));
app.use("/api/paymentGateway", require("./utils/paymentGateway"));
app.use("/api/orders", require("./routes/productOrder"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
