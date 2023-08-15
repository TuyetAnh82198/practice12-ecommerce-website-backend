const express = require("express");

const getOrderList = require("../controllers/getOrderList");

const route = express.Router();

route.post("/", getOrderList);

module.exports = route;
