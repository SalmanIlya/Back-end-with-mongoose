const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    des: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Products", ProductsSchema);
