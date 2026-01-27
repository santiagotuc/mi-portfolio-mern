import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "https://via.placeholder.com/300",
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
      setFormData({
        title: "",
        description: "",
        category: "",
        imageUrl: "https://via.placeholder.com/300",
      });
      fetchProjects();
    } catch (err) {
      console.error("Error al guardar:", err);
      alert("Hubo un error al guardar.");
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este proyecto?")
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
    <div className="min-h-screen text-white p-8">
      <header className="max-w-6xl mx-auto mb-16 pt-10 border-b border-slate-800 pb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent italic">
          Santiago Emmanuel
        </h1>
        <p className="text-slate-400 text-xl mt-4 font-light tracking-wide">
          Estratega de Marketing Digital & Full Stack Developer
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        <section className="mb-20 bg-slate-800/30 p-8 rounded-3xl border border-slate-700/50 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-cyan-400">
            Añadir Nuevo Proyecto
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input
              className="bg-slate-900 border border-slate-700 p-3 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="Título del Proyecto"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <input
              className="bg-slate-900 border border-slate-700 p-3 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="Categoría"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            />
            <textarea
              className="bg-slate-900 border border-slate-700 p-3 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors md:col-span-2"
              placeholder="Descripción..."
              rows="4"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
            <button className="md:col-span-2 bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-xl font-bold hover:opacity-90 transition-all uppercase tracking-widest">
              Publicar Proyecto
            </button>
          </form>
        </section>

        <h2 className="text-2xl font-semibold mb-8 text-slate-300">
          Proyectos Actuales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div
              key={project._id}
              className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 group"
            >
              <button
                onClick={() => handleDelete(project._id)}
                className="absolute top-4 right-4 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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

              <div className="h-48 bg-slate-700 flex items-center justify-center">
                <span className="text-slate-500 font-bold">MARKETING CASE</span>
              </div>
              <div className="p-6">
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-3 text-white">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
