const express = require("express");
const fs = require("fs");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const TOKEN_FILE = "tokens.json";
let storedTokens = fs.existsSync(TOKEN_FILE)
  ? JSON.parse(fs.readFileSync(TOKEN_FILE, "utf8"))
  : {};

// ✅ Store Token (Manual Storage)
app.post("/store-token", (req, res) => {
  const { email, token } = req.body;

  if (!email || !token) {
    return res.status(400).json({ error: "Email and token are required" });
  }

  storedTokens[email] = { token, expiresAt: Date.now() + 3600000 }; // Store token with expiration
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(storedTokens, null, 2));

  console.log("Token stored:", { email, token });
  res.json({ message: "Token stored successfully!" });
});

// ✅ Retrieve Token
app.get("/get-token/:email", (req, res) => {
  const email = req.params.email;

  if (!storedTokens[email]) {
    return res.status(404).json({ error: "Token not found" });
  }

  res.json({ email, token: storedTokens[email].token });
});

// ✅ 1. Request Password Reset (Generate Token & Send Email)
app.post("/request-reset", (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  const resetToken = uuidv4(); // Generate unique token
  storedTokens[email] = { token: resetToken, expiresAt: Date.now() + 3600000 }; // Token expires in 1 hour

  fs.writeFileSync(TOKEN_FILE, JSON.stringify(storedTokens, null, 2));

  // ✅ Send email with reset link
  sendResetEmail(email, resetToken);

  res.json({ message: "Reset link sent to your email" });
});

// ✅ 2. Verify Token & Reset Password
app.post("/reset-password", (req, res) => {
  const { email, token, newPassword } = req.body;

  if (!email || !token || !newPassword)
    return res.status(400).json({ error: "All fields are required" });

  const storedToken = storedTokens[email];

  if (!storedToken || storedToken.token !== token)
    return res.status(400).json({ error: "Invalid or expired token" });

  if (Date.now() > storedToken.expiresAt)
    return res.status(400).json({ error: "Token has expired" });

  // ✅ Update password (For simplicity, log it; in real app, update in DB)
  console.log(`Password for ${email} updated to: ${newPassword}`);

  // Remove token after successful reset
  delete storedTokens[email];
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(storedTokens, null, 2));

  res.json({ message: "Password reset successful" });
});

// ✅ Email Sender Function
function sendResetEmail(email, token) {
  const transporter = nodemailer.createTransport({
    host: "smtp.relay.brevo.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "8578ec001@smtp-brevo.com",
      pass: "U4KnwAVaXLyB1GOz",
    },
  });

  const resetLink = `http://localhost:3000/reset-password?email=${email}&token=${token}`;

  const mailOptions = {
    from: "victoryranjit@gmail.com",
    to: email,
    subject: "Password Reset Request",
    text: `Click the link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error("Error sending email:", error);
    else console.log("Reset email sent:", info.response);
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
