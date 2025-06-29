import express from "express";
import cors from "cors";
import { elAgente } from "./agent.js";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json()); // Para procesar cuerpos JSON

// Endpoint raíz
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Endpoint para el chat
app.post("/api/chat", async (req, res) => {
  const { mensaje } = req.body;

  if (!mensaje) {
    return res.status(400).json({ error: "El mensaje es requerido" });
  }

  try {
    const respuesta = await elAgente.run(mensaje);
    res.json({ respuesta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});