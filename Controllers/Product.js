const Products = require("../models/Product");

module.exports = {
  createProduct: async (req, res) => {
    const newproduct = new Products(req.body);
    try {
      const product = await newproduct.save();
      res.status(200).json({
        massage: "product successfully created ",
        product,
      });
    } catch (err) {
      res.status.json({
        massage: "error is ",
        err,
      });
    }
  },
};
