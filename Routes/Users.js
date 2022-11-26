const express = require("express");
const Users = require("../Controllers/Users");
const route = express.Router();

route.post("/user", Users.userRouter);
route.post("/login", Users.LoginUser);
route.get("/user", Users.allUser);

module.exports = route;
