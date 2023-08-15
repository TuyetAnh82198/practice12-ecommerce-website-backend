const express = require("express");

const { signup, signupAdmin } = require("../controllers/signup");

const route = express.Router();

route.post("/", signup);
route.post("/admin", signupAdmin);

module.exports = route;
