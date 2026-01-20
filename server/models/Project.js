const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
  },
  imageUrl: { type: String }, // Aquí irá el link de la imagen de tu trabajo
  projectUrl: { type: String }, // Link a la web o campaña (opcional)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", ProjectSchema);
