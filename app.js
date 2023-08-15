const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ydyd3d0.mongodb.net/test?retryWrites=true&w=majority`,
  collection: "sessions",
});

const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout");
const signupRoute = require("./routes/signup");
const productRoute = require("./routes/products");
const orderRoute = require("./routes/order");
const orderListRoute = require("./routes/orderList.js");
const historyRoute = require("./routes/history");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// sử dụng session
app.set("trust proxy", 1); //trust first proxy

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: true,
    },
  })
);

app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/signup", signupRoute);
app.use("/products", productRoute);
app.use("/order", orderRoute);
app.use("/orderlist", orderListRoute);
app.use("/history", historyRoute);
app.use("/", (req, res) => {
  res.send("Backend");
});
// app.use((req, res) => {
//   res.status(404).send({ message: "Route not found" });
// });

// app.listen(process.env.PORT || 5000);
app.listen(5000);
