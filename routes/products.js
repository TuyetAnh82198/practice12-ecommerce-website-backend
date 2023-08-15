const express = require("express");

const { getProducts, getProduct } = require("../controllers/getProducts");

const route = express.Router();

route.get("/", getProducts);
route.post("/:productid", getProduct);

module.exports = route;
