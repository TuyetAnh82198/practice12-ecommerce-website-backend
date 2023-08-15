const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserModel = require("../models/user");
const SessionModel = require("../models/session");

const loginPost = async (req, res) => {
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
    const existingUser = await UserModel.findOne({
      email: req.body.email,
      role: "client",
    });
    if (existingUser) {
      const isCorrectPass = bcrypt.compareSync(
        req.body.password,
        existingUser.password
      );
      if (isCorrectPass) {
        existingUser.password = undefined;
        req.session.isLoggedIn = true;
        req.session.user = existingUser;
        // return res.redirect(
        //   process.env.WEBSITE_FOR_CLIENT + existingUser.userId
        // );
        return res.status(200).json({ id: existingUser.userId });
      }
    }
    return res.status(409).json({ message: "Wrong email or password" });
  } catch (err) {
    console.log(err);
  }
};

const isLogIn = async (req, res) => {
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
    const isLoggedIn = await SessionModel.findOne({
      "session.user.role": "client",
      "session.user.userId": req.body.id,
    });

    if (isLoggedIn) {
      return res.status(200).json({ result: [isLoggedIn] });
    } else {
      return res.status(200).json({ result: [] });
    }
  } catch (err) {
    console.log(err);
  }
};

const isLogInAdmin = async (req, res) => {
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
    const isLoggedIn = await SessionModel.findOne({
      "session.user.role": "admin",
    });

    if (isLoggedIn) {
      return res.status(200).json({ result: [isLoggedIn] });
    } else {
      return res.status(200).json({ result: [] });
    }
  } catch (err) {
    console.log(err);
  }
};

const loginPostAdmin = async (req, res) => {
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
    const existingUser = await UserModel.findOne({
      email: req.body.email,
      role: "admin",
    });
    if (existingUser) {
      const isCorrectPass = bcrypt.compareSync(
        req.body.password,
        existingUser.password
      );

      if (isCorrectPass) {
        existingUser.password = undefined;
        req.session.isLoggedIn = true;
        req.session.user = existingUser;
        // console.log(req.session.user);
        return res.redirect(process.env.WEBSITE_FOR_ADMIN_PRODUCTS);
      }
    }
    return res.status(409).json({ message: "Wrong email or password" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { loginPost, isLogInAdmin, isLogIn, loginPostAdmin };
