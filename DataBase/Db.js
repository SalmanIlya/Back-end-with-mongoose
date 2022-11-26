const mongoose = require("mongoose");

const mydb = () => {
  mongoose
    .connect(process.env.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connection successfully");
    })
    .catch((error) => {
      console.log("error is", error);
    });
};
module.exports = mydb;
