const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String, // Aquí pondremos "Full Stack", "Frontend", etc.
    required: true,
  },
  technologies: {
    type: String, // Guardaremos algo como "React, Node, MongoDB"
    required: true,
  },
  githubUrl: {
    type: String,
    default: "",
  },
  demoUrl: {
    type: String,
    default: "",
  },
  imageUrl: {
    type: String,
    default: "https://via.placeholder.com/500x300?text=Proyecto+Web",
  },
});

module.exports = mongoose.model("Project", projectSchema);
