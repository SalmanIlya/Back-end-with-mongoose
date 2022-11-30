const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "Config/config.env" });
const verifitocken = (req, res, next) => {
  const authh = req.headers.tocken;
  if (authh) {
    const tocken = authh.split(" ")[1];
    jwt.verify(tocken, process.env.secrit_key, (err, user) => {
      if (err) res.status(401).json({ massage: "your tocken is not valed" });
      else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(404).json({
      massage: "you are not able to use this account",
    });
  }
};
const verifyTockenandAuth = (req, res, next) => {
  verifitocken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        massage: "you are not able to use this account",
      });
    }
  });
};
const verifyAdminTockenandAuth = (req, res, next) => {
  verifitocken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        massage: "you are not able to use this account",
      });
    }
  });
};
module.exports = {
  verifyAdminTockenandAuth,
  verifyTockenandAuth,
  verifitocken,
};
