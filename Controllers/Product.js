const Products = require("../models/Product");

module.exports = {
  createProduct: async (req, res) => {
    const newproduct = new Products(req.body);
    try {
      const product = await newproduct.save();
      res.status(200).json(product);
    } catch (err) {
      res.status(502).json({
        massage: "error is ",
        err,
      });
    }
  },
  // get all product
  GetAllProduct: async (req, res) => {
    try {
      const product = await Products.find();
      if (product) {
        res.send(product);
      } else {
        res.status(404).json({
          massage: "!!! 404 error",
        });
      }
    } catch (error) {
      res.status(500).json({
        massage: " !!! 500 error is ",
        err,
      });
    }
  },
  // get single product
  getSingleProduct: async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);
      if (product) {
        res.send(product);
      } else {
        res.status(401).json({
          massage: " !!! 404 error is ",
        });
      }
    } catch (err) {
      res.status(500).json({
        massage: " !!! 500 error is ",
        err,
      });
    }
  },
  // update product
  UpdateProduct: async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);
      if (!product) {
        res.status(500).json({
          massage: " !!! 500 error is ",
          err,
        });
      } else {
        const updateUser = await Products.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(202).json({
          massage: "user is update ",
        });
      }
    } catch (err) {
      res.status(500).json({
        massage: " !!! 500 error is ",
        err,
      });
    }
  },

  // delete product
  Delete_Product: async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);
      if (product) {
        await product.remove();
        res.status(202).json({
          massage: "product delete successfully",
        });
      } else {
        res.status(401).json({
          massage: " !!! 404 error is ",
        });
      }
    } catch (err) {
      res.status(500).json({
        massage: " !!! 500 error is ",
        err,
      });
    }
  },
};
