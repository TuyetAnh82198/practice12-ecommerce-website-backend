const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

const OrderList = require("../models/orderList");
const OrderModel = require("../models/order");
const UserModel = require("../models/user");

const getOrderList = async (req, res) => {
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
    await UserModel.findOneAndUpdate(
      { userId: req.body.userId },
      {
        address: req.body.address,
      }
    );
    const newOrderList = new OrderList({
      userId: req.body.userId,
      email: req.body.email,
      fullname: req.body.fullName,
      phone: req.body.phoneNumber,
      address: req.body.address,
      delivery: "Waiting for progressing",
      status: "Waiting for pay",
      orderList: req.body.orderList,
      totalOrder: req.body.totalOrder,
    });
    newOrderList.save();
    await OrderModel.deleteMany({ userId: req.body.userId });
    //định dạng tiền tệ
    const VND = new Intl.NumberFormat("vi-VN");
    const myOAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET
    );
    // Set Refresh Token vào OAuth2Client Credentials
    myOAuth2Client.setCredentials({
      refresh_token: process.env.RF_TOKEN,
    });
    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
    const myAccessToken = myAccessTokenObject?.token;
    // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "tailieu22072023@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refresh_token: process.env.RF_TOKEN,
        accessToken: myAccessToken,
      },
    });

    let message =
      `<div style="color: white; background-color: black; padding: 2rem">` +
      `<p style="color: white; font-size: 1.5rem">Xin Chào ${req.body.fullName}</p>` +
      `<p style="color: white">Phone: ${req.body.phoneNumber}</p>` +
      `<p style="color: white">Address: ${req.body.address}</p>` +
      `<table style="text-align: center">` +
      `<thead>` +
      `<tr>` +
      `<th scope="col" style="border: solid white 0.05rem; padding: 0.5rem">
            Tên Sản Phẩm
          </th>` +
      `<th scope="col" style="border: solid white 0.05rem; padding: 0.5rem">
            Hình ảnh
          </th>` +
      `<th scope="col" style="border: solid white 0.05rem; padding: 0.5rem">
            Giá
          </th>` +
      `<th scope="col" style="border: solid white 0.05rem; padding: 0.5rem">
            Số Lượng
          </th>` +
      `<th scope="col" style="border: solid white 0.05rem; padding: 0.5rem">
            Thành Tiền
          </th>` +
      `</tr>` +
      `</thead>` +
      `<tbody>`;
    for (const pd of req.body.orderList) {
      message +=
        `<tr>` +
        `<td scope="col" style="border: solid white 0.05rem; padding: 0.5rem"> ` +
        pd.pdname +
        ` </td>` +
        `<td scope="col" style="border: solid white 0.05rem; padding: 0.5rem"> ` +
        `<img src="` +
        pd.img +
        `" alt="" height=100 width=100>` +
        ` </td>` +
        `<td scope="col" style="border: solid white 0.05rem; padding: 0.5rem"> ` +
        VND.format(pd.price) +
        ` VND</td>` +
        `<td scope="col" style="border: solid white 0.05rem; padding: 0.5rem"> ` +
        pd.quantity +
        ` </td>` +
        `<td scope="col" style="border: solid white 0.05rem; padding: 0.5rem"> ` +
        VND.format(pd.total) +
        ` VND</td>` +
        `</tr>`;
    }
    message +=
      `</tbody>` +
      `</table>` +
      `<p style="color: white; font-size: 1.5rem">Tổng Thanh Toán:</p>` +
      `<p style="color: white; font-size: 1.5rem; margin-top: -1rem">${VND.format(
        req.body.totalOrder
      )} VND</p>` +
      `<p style="color: white; font-size: 1.5rem; margin-top: 2rem">Cảm ơn bạn!</p>` +
      `</div>`;

    const mailOptions = {
      to: req.body.email,
      //tiêu đề mail
      subject: "Thông tin đơn hàng",
      html: message,
    };
    // Gọi hành động gửi email
    await transport.sendMail(mailOptions);
    // Không có lỗi gì thì trả về success
    res.status(200).json({ message: "Email sent successfully." });
  } catch (err) {
    console.log(err);
  }
};

module.exports = getOrderList;
