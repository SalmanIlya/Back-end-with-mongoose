const express = require("express");
const User = require("./Users");
const ProductRoute = require("./ProductRoute");
const route = express.Router();
route.use("/admin", User);
route.use("/product", ProductRoute);

module.exports = route;
