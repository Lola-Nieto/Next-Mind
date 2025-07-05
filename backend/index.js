import express from "express";
import cors from "cors";
import { elAgente, toolTracker } from "./agent.js";

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
  const { conversacion } = req.body;
  toolTracker.reset();

  console.log("Conversacion recibida:", conversacion);

  try {
    const respuesta = await elAgente.run(conversacion);
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