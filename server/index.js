const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static("client")); // Serve static frontend files

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/../client/index.html");
});

app.listen(3000, () => {
  console.log("✅ Server started on http://localhost:3000");
});
