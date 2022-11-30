const express = require("express");
const Product = require("../Controllers/Product");
const route = express.Router();

route.post("/product", Product.createProduct);
route.get("/", Product.GetAllProduct);
route.get("/:id", Product.getSingleProduct);
route.put("/:id", Product.UpdateProduct);
route.delete("/:id", Product.Delete_Product);

module.exports = route;
