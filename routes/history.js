const express = require("express");

const getHistory = require("../controllers/getHistory");

const route = express.Router();

route.post("/", getHistory);

module.exports = route;
