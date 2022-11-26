const Users = require("../models/Users");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config({ path: "Config/config.env" });
// create user
module.exports = {
  userRouter: async (req, res) => {
    const user = new Users({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      const item = await user.save();
      res.status(200).json(item);
    } catch (err) {
      res.status(500).json({
        massage: "error is ",
        err,
      });
    }
  },
  // get all user
  allUser: async (req, res) => {
    try {
      const user = await Users.find();
      res.send(user);
    } catch (err) {
      res.status(500).json({
        massage: "error is ",
        err,
      });
    }
  },
  LoginUser: async (req, res) => {
    try {
      const user = await Users.findOne();
      if (!user) {
        res.status(404).json({
          massage: "user not found",
        });
      } else {
        if (user.password === req.body.password) {
          res.status(200).json({
            massage: "user login succesfully",
          });
        }
      }
    } catch (err) {
      res.status(500).json({
        massage: "error ",
        err,
      });
    }
  },
};
