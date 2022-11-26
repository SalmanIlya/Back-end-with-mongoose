const app = require("./app");
const dotenv = require("dotenv");
const mydb = require("./DataBase/Db");
dotenv.config({ path: "Config/config.env" });
mydb();
app.listen(5000, () => {
  console.log("server is working on 5000");
});
