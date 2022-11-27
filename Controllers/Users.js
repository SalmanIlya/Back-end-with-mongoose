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
      const user = await Users.findOne({ username: req.body.username });
      !user &&
        res.status(404).json({
          massage: "user is not avalable ",
        });

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
        },
        process.env.secrit_key
      );
      const { password, ...other } = user._doc;
      res.status(202).json({ ...other, accessTocken });
    } catch (err) {
      res.status(500).json({
        massage: "error ",
        err,
      });
      console.log(err);
    }
  },
};
