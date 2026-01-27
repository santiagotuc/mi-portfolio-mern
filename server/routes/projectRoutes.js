const express = require("express");
const router = express.Router();
const Project = require("../models/Project"); // Asegúrate de haber creado el modelo Project.js antes

// RUTA PARA CREAR UN PROYECTO (POST)
router.post("/add", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// RUTA PARA VER TODOS LOS PROYECTOS (GET)
router.get("/all", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Ruta para eliminar un proyecto por ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject)
      return res.status(404).json({ message: "Proyecto no encontrado" });
    res.json({ message: "Proyecto eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
