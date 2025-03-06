const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let storedTokens = {}; // ✅ Declare storedTokens at the top

// Route to store token
app.post("/store-token", (req, res) => {
  const { email, token } = req.body;

  if (!email || !token) {
    return res.status(400).json({ error: "Email and token are required" });
  }

  storedTokens[email] = token; // ✅ Store token with email as key
  console.log("Token stored:", { email, token });

  res.json({ message: "Token stored successfully!" });
});

// ✅ Route to Get Token
app.get("/get-token/:email", (req, res) => {
  const email = req.params.email;

  if (!storedTokens[email]) {
    return res.status(404).json({ error: "Token not found" });
  }

  res.json({ email, token: storedTokens[email] });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
