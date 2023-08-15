const express = require("express");

const {
  loginPost,
  isLogInAdmin,
  isLogIn,
  loginPostAdmin,
} = require("../controllers/login");

const route = express.Router();

route.post("/", loginPost);
route.post("/islogin", isLogIn);
route.get("/islogin/admin", isLogInAdmin);
route.post("/admin", loginPostAdmin);

module.exports = route;
