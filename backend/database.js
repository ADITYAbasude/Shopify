const mongoose = require("mongoose");

require("dotenv").config();

const url = process.env.databaseUrl;

const connectToMongo = () => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB", error);
    });
};

module.exports = connectToMongo;
