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
      password: CryptoJS.RC4.encrypt(
        req.body.password,
        process.env.pass
      ).toString(),
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
      const query = req.query.new;
      const user = query
        ? await Users.find().sort({ _id: -1 }).limit(2)
        : await Users.find();
      res.send(user);
    } catch (err) {
      res.status(500).json({
        massage: "error is ",
        err,
      });
    }
  },
  // login user
  LoginUser: async (req, res) => {
    try {
      const user = await Users.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json({
          massage: "user is not avalable ",
        });
      } else {
        const hashpassword = CryptoJS.RC4.decrypt(
          user.password,
          process.env.pass
        );
        const hpassword = hashpassword.toString(CryptoJS.enc.Utf8);
        hpassword !== req.body.password &&
          res.status(404).json({
            massage: "password does not match",
          });
        const accessTocken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.secrit_key
        );

        const { password, ...other } = user._doc;
        res.status(202).json({ ...other, accessTocken });
      }
    } catch (err) {
      res.status(500).json({
        massage: "error ",
        err,
      });
    }
  },
  // update user
  UpdateUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      if (!user) {
        res.status(500).json({
          massage: " !!! 500 error is ",
          err,
        });
      } else {
        const updatedate = {
          username: req.body.username,
          email: req.body.email,
          password: CryptoJS.RC4.encrypt(
            req.body.password,
            process.env.pass
          ).toString(),
        };
        const updateUser = await Users.findByIdAndUpdate(
          req.params.id,
          {
            $set: updatedate,
          },
          { new: true }
        );
        res.status(202).json({
          massage: "user is update ",
          user,
        });
      }
    } catch (error) {
      res.status(500).json({
        massage: "error ",
        err,
      });
    }
  },
  // get 1 user
  getOneUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      if (!user) {
        res.status(404).json({
          massage: "error ",
          err,
        });
      } else {
        const { password, isAdmin, ...other } = user._doc;
        res.status(202).json(other);
      }
      console.log("if is  working");
    } catch (err) {
      res.status(500).json({
        massage: "error ",
        err,
      });
    }
  },
  // delete user
  deleteUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      if (!user) {
        res.status(403).json({
          massage: "!!!404 error ",
        });
      } else {
        await user.remove();
        res.status(202).json({
          massage: "user delete successfully",
        });
      }
    } catch (err) {
      res.status(500).json({
        massage: "!!!500 error",
        err,
      });
    }
  },
};
