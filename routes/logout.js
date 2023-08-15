const express = require("express");

const logOut = require("../controllers/logout");

const route = express.Router();

route.post("/", logOut);

module.exports = route;
