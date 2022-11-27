const express = require("express");
const Product = require("../Controllers/Product");
const route = express.Router();

route.post("/product", Product.createProduct);

module.exports = route;
