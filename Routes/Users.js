const express = require("express");
const Users = require("../Controllers/Users");
const {
  verifyTockenandAuth,
  verifitocken,
  verifyAdminTockenandAuth,
} = require("../middlewear/VerifiTocken");

const route = express.Router();

route.post("/user", Users.userRouter);
route.post("/login", Users.LoginUser);
route.put("/:id", verifyTockenandAuth, Users.UpdateUser);
route.delete("/:id", verifyTockenandAuth, Users.deleteUser);
route.get("/user/:id", verifyAdminTockenandAuth, Users.getOneUser);
route.get("/alluser", verifyAdminTockenandAuth, Users.allUser);

module.exports = route;
