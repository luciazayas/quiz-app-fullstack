const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;


function authRequired(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log("Authorization header recibido:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No se proporcionó token o formato incorrecto");
    return res.status(401).json({ error: "Token no proporcionado o mal formado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    console.log("Token válido:", decoded);
    req.user = decoded;
    next(); // 👈 ESTE PASO ES CRUCIAL
  } catch (err) {
    console.error("Error verificando token:", err.message);
    return res.status(403).json({ error: "Token no válido o expirado" });
  }
}

module.exports = authRequired;