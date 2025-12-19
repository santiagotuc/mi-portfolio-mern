const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 1. IMPORTAR LAS RUTAS
const projectRoutes = require("./routes/projectRoutes"); // <--- AGREGAR ESTO

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 2. USAR LAS RUTAS
app.use("/api/projects", projectRoutes); // <--- AGREGAR ESTO ANTES DEL app.get("/")

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ ¡Conexión exitosa a MongoDB Atlas!"))
  .catch((err) => console.log("❌ Error de conexión:", err));

app.get("/", (req, res) => {
  res.send("Servidor corriendo...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
