const mongoose = require("mongoose");
const productsModel = require("../models/product");

const getProducts = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://cluster0.ydyd3d0.mongodb.net/test?retryWrites=true&w=majority",
      {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const productList = await productsModel.find();
    return res.status(200).json({ result: productList });
  } catch (err) {
    console.log(err);
  }
};

const getProduct = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://cluster0.ydyd3d0.mongodb.net/test?retryWrites=true&w=majority",
      {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const products = await productsModel.find();
    const product = await productsModel.findOne({ _id: req.params.productid });
    // console.log(product);
    return res.status(200).json({ products: products, product: product });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getProducts, getProduct };
