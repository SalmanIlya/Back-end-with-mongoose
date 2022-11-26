const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const route = require("./Routes/admin");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyparser.json());
app.use("/api", route);
module.exports = app;
