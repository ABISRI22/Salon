const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://Saurav_4067:SauravJha12@cluster0.kzarmlp.mongodb.net/login-app?retryWrites=true&w=majority&appName=Cluster0",
    {}
  )
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = new User({ name, email, password, role });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (user.role !== role) {
    return res.status(400).json({ message: "Role mismatch" });
  }

  res.json({ message: "Login successful" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});