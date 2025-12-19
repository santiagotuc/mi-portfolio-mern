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

module.exports = router;
