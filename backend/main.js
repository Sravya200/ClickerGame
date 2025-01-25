const express = require("express");
const processClick = require("./jobs/processClick");
const db = require("./models/db");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.post("/click", async (req, res) => {
  const { userId } = req.body;
  const result = await processClick(userId);
  res.json(result);
});

app.get("/user/:userId", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM users WHERE userId = ?", [req.params.userId]);
  if (rows.length > 0) {
    res.json(rows[0]);
  } else {
    res.json({ message: "User not found" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
