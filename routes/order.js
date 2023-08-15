const express = require("express");

const { order, getOrderList } = require("../controllers/order");

const route = express.Router();

route.post("/", order);
route.post("/get-order-list", getOrderList);

module.exports = route;
