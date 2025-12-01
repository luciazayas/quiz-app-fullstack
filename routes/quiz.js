const express = require("express");
const router = express.Router();
const authRequired = require("../middleware/auth");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const db = require("../db");

router.get("/question", async (req, res) => {
  try {
    console.log("Petición recibida...");
    const response = await fetch("https://opentdb.com/api.php?amount=10");
    console.log("Respuesta de la API:", response.status);
    const data = await response.json();
    console.log("Preguntas recibidas:", data.results.length);
    const formatted = data.results.map((q) => {
      const options = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
      return {
        question: q.question,
        options,
        correct_answer: q.correct_answer,
        category: q.category,
        difficulty: q.difficulty,
      };
    });
   res.json(formatted);
  } catch (error) {
    console.error("Error al obtener preguntas:", error);
    res.status(500).json({ error: "No se pudieron obtener las preguntas" });
  }
});




  router.post("/score", authRequired, async(req, res) => {
    try {
      console.log("Usuario autenticado:", req.user);
      const { score } = req.body;
      const userId = req.user.id;

      await db.query("UPDATE users SET score = score + ? WHERE id = ?", [score, userId]);

      res.json({ message: `Puntuación actualizada a ${score} puntos ` });

    }catch (err) {
    console.error("Error al actualizar score:", err);
    res.status(500).json({ error: "Error al actualizar la puntuación" });
    }
});

module.exports = router;
