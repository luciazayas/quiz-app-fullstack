const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();
const SECRET = process.env.JWT_SECRET;


router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [exists] = await db.query("SELECT id FROM users WHERE username = ?", [username]);
    if (exists.length > 0) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }
    const hash = await bcrypt.hash(password, 10);

    await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash]);

    res.json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = rows[0];

    // 2. comparar contraseña
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // 3. generar token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Login correcto ✅", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
