require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(
  cors({
    origin: [`${process.env.SMTP_CROSS_ORIGIN}`],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies if needed
  })
);
app.use(bodyParser.json());

// ✅ Account Activation API (No validation, just sending the email)
app.post("/account-activation", async (req, res) => {
  const { email, otp, token } = req.body;

  // const transporter = nodemailer.createTransport({
  //   host: "smtp-relay.sendinblue.com",
  //   port: 587,
  //   secure: false,
  //   pool: true,
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASS,
  //   },
  // });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER_GMAIL,
      pass: process.env.SMTP_PASS_GMAIL,
    },
  });

  const accountActivationLink = `${process.env.SMTP_CROSS_ORIGIN}/#/accountActivation/${email}/${otp}/${token}`;
  const mailOptions = {
    from: `"Track My Money" <victoryranjit@gmail.com>`,
    to: email,
    subject: "Account Activation Link",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Password Reset</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 500px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .logo {
            width: 150px;
            margin-bottom: 20px;
          }
          h2 {
            color: #333;
          }
          p {
            color: #555;
            font-size: 16px;
          }
          .btn {
            display: inline-block;
            background-color: #27b397;
            color: #ffffff !important;
            padding: 12px 20px;
            text-decoration: none;
            font-size: 16px;
            border-radius: 5px;
            margin-top: 20px;
            transition: background 0.3s ease;
          }
          .btn:hover {
            background-color:rgb(20, 128, 106);
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://trackmymoney-ranjit.netlify.app/images/icon-192x192.png" alt="TrackMyMoney Logo" class="logo">
          <h2>Account Activation Link</h2>
          <p>Click the button below and enter the OTP to Activate your account.</p>
          <h1>${otp}</h1>
          <a href="${accountActivationLink}" class="btn">Activate Account</a>
          <p>If you did not request a new account, please ignore this email.</p>
          <div class="footer">
            &copy; 2025 TrackMyMoney. All rights reserved. 
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Account Activation link sent" });
  } catch (error) {
    console.error("Email sending error:", error);
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
});

// ✅ Forgot Password API (No validation, just sending the email)
app.post("/request-resetPassword", async (req, res) => {
  const { email, token } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER_GMAIL,
      pass: process.env.SMTP_PASS_GMAIL,
    },
  });

  const resetLink = `${process.env.SMTP_CROSS_ORIGIN}/#/resetPassword/${email}/${token}`;
  const mailOptions = {
    from: `"Track My Money" <victoryranjit@gmail.com>`,
    to: email,
    subject: "Password Reset Link",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Password Reset</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 500px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .logo {
            width: 150px;
            margin-bottom: 20px;
          }
          h2 {
            color: #333;
          }
          p {
            color: #555;
            font-size: 16px;
          }
          .btn {
            display: inline-block;
            background-color: #27b397;
            color: #ffffff !important;
            padding: 12px 20px;
            text-decoration: none;
            font-size: 16px;
            border-radius: 5px;
            margin-top: 20px;
            transition: background 0.3s ease;
          }
          .btn:hover {
            background-color:rgb(20, 128, 106);
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://trackmymoney-ranjit.netlify.app/images/icon-192x192.png" alt="TrackMyMoney Logo" class="logo">
          <h2>Password Reset Link</h2>
          <p>Click the button below to reset your password.</p>
          <a href="${resetLink}" class="btn">Reset Password</a>
          <p>If you did not request a password reset, please ignore this email.</p>
          <div class="footer">
            &copy; 2025 TrackMyMoney. All rights reserved. 
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Reset link sent" });
  } catch (error) {
    console.error("Email sending error:", error);
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
});

// ✅ Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
