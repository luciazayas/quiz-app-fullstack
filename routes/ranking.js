const express = require("express");
const router = express.Router();
const db = require("../db"); 

router.get("/ranking", async (req, res) => {
  try {
    const [rows]= await db.query("SELECT * FROM users ORDER BY score DESC LIMIT 5");
    res.json(rows);
  } catch (err) {
   console.error("Error al obtener ranking:", err.message);
   res.status(500).json({ error: err.message });
  }
});

module.exports = router;
