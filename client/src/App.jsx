import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [projects, setProjects] = useState([]);

  // Estado inicial actualizado para un Desarrollador Full Stack
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Full Stack",
    technologies: "",
    githubUrl: "",
    demoUrl: "",
    imageUrl: "",
  });

  const fetchProjects = () => {
    axios
      .get("http://localhost:5000/api/projects/all")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/projects/add", formData);
      alert("¡Proyecto guardado con éxito!");
      // Limpiamos el formulario volviendo al estado inicial
      setFormData({
        title: "",
        description: "",
        category: "Full Stack",
        technologies: "",
        githubUrl: "",
        demoUrl: "",
        imageUrl: "",
      });
      fetchProjects();
    } catch (err) {
      console.error("Error al guardar:", err);
      alert(
        "Hubo un error al guardar. Asegúrate de que el Backend esté corriendo.",
      );
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres eliminar este proyecto profesional?",
      )
    ) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error("Error al eliminar:", err);
      }
    }
  };

  return (
    <div className="min-h-screen text-white p-8 bg-slate-950">
      {/* HEADER PROFESIONAL */}
      <header className="max-w-6xl mx-auto mb-16 pt-10 border-b border-slate-800 pb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent italic">
          Santiago Emmanuel Molina
        </h1>
        <div className="flex items-center gap-3 mt-4">
          <span className="h-px w-8 bg-cyan-500"></span>
          <p className="text-slate-400 text-xl font-light tracking-widest uppercase">
            Full Stack Web Developer | MERN Stack
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* FORMULARIO DE CARGA TÉCNICA */}
        <section className="mb-20 bg-slate-900/50 p-8 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center gap-2">
            <span className="text-white">01.</span> Añadir Proyecto al Stack
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input
              className="bg-slate-950 border border-slate-800 p-4 rounded-xl focus:outline-none focus:border-cyan-500 transition-all text-sm"
              placeholder="Nombre del Proyecto (ej: E-commerce Emuna)"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <input
              className="bg-slate-950 border border-slate-800 p-4 rounded-xl focus:outline-none focus:border-cyan-500 transition-all text-sm"
              placeholder="Tecnologías (ej: React, Node.js, MongoDB, Tailwind)"
              value={formData.technologies}
              onChange={(e) =>
                setFormData({ ...formData, technologies: e.target.value })
              }
              required
            />
            <input
              className="bg-slate-950 border border-slate-800 p-4 rounded-xl focus:outline-none focus:border-cyan-500 transition-all text-sm"
              placeholder="URL Repositorio GitHub"
              value={formData.githubUrl}
              onChange={(e) =>
                setFormData({ ...formData, githubUrl: e.target.value })
              }
            />
            <input
              className="bg-slate-950 border border-slate-800 p-4 rounded-xl focus:outline-none focus:border-cyan-500 transition-all text-sm"
              placeholder="URL de la Imagen del Proyecto"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />
            <textarea
              className="bg-slate-950 border border-slate-800 p-4 rounded-xl focus:outline-none focus:border-cyan-500 transition-all text-sm md:col-span-2"
              placeholder="Descripción técnica: ¿Qué problemas resolviste? ¿Qué arquitectura usaste?"
              rows="4"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
            <button className="md:col-span-2 bg-gradient-to-r from-blue-600 to-cyan-600 py-4 rounded-xl font-black hover:scale-[1.01] active:scale-95 transition-all uppercase tracking-[0.2em] text-sm shadow-lg shadow-cyan-900/20">
              Desplegar Proyecto
            </button>
          </form>
        </section>

        {/* GRILLA DE PROYECTOS */}
        <h2 className="text-2xl font-semibold mb-8 text-slate-400 flex items-center gap-2">
          <span className="text-cyan-500">02.</span> Repositorio de Aplicaciones
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 shadow-xl"
            >
              {/* ACCIÓN: ELIMINAR */}
              <button
                onClick={() => handleDelete(project._id)}
                className="absolute top-4 right-4 bg-slate-950/80 text-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all z-30 border border-red-500/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>

              {/* IMAGEN DEL PROYECTO */}
              <div className="h-48 overflow-hidden bg-slate-800">
                <img
                  src={
                    project.imageUrl ||
                    "https://via.placeholder.com/600x400/0f172a/67e8f9?text=Proyecto+MERN"
                  }
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
              </div>

              {/* CONTENIDO TÉCNICO */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                {/* PILLS DE TECNOLOGÍAS */}
                <div className="flex flex-wrap gap-2 my-4">
                  {project.technologies?.split(",").map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-500/30 rounded uppercase font-bold tracking-tighter"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-6">
                  {project.description}
                </p>

                {/* LINKS EXTERNOS */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-slate-300 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                  >
                    GITHUB CODE <span>↗</span>
                  </a>
                  <span className="text-[10px] text-slate-600 font-mono">
                    ID: {project._id.slice(-4)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="max-w-6xl mx-auto mt-20 py-10 border-t border-slate-900 text-center text-slate-600 text-xs tracking-widest uppercase">
        © 2026 - Construido con el Stack MERN por Santiago Molina
      </footer>
    </div>
  );
}

export default App;
