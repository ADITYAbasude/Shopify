const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

const product = new Schema({
  title: {
    type: String,
    required: true,
  },
  productsDetails: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },

  image: {
    data: Buffer,
    contentType: String,
  },
  reviews: [reviewSchema],

  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  productType: {
    type: String,
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "seller",
  },
});

module.exports = mongoose.model("product", product);
