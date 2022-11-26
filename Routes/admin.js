const express = require("express");
const User = require("./Users");
const route = express.Router();
route.use("/admin", User);

module.exports = route;
