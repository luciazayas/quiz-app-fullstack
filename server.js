const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz"); 
const rankingRoutes = require("./routes/ranking"); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "front")));

app.use("/auth", authRoutes);

app.use("/quiz", quizRoutes);

app.use("/ranking", rankingRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "front", "index.html"));
});

app.get("/quiz", (req, res) => {
  res.sendFile(path.join(__dirname, "front", "quiz.html"));
});

// app.get("/auth", (req, res) => {
//   res.sendFile(path.join(__dirname, "front", "index.html"));
// });
  
app.listen(3000, () => console.log('Servidor corriendo'));
