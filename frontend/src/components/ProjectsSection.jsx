import { useState, useEffect } from 'react';
import axios from 'axios';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('https://da-portfolio-backend.onrender.com/api/projects');
        setProjects(res.data);
        const cats = new Set(res.data.map(p => p.category).filter(Boolean));
        setCategories(['All', ...Array.from(cats)]);
      } catch (error) {
        console.error('Error fetching projects', error);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Projects</h2>
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition font-medium ${filter === cat ? 'bg-primary-600 text-white' : 'bg-slate-200 dark:bg-dark-border text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <div key={project._id} className="glass rounded-2xl overflow-hidden flex flex-col transition hover:-translate-y-1 hover:shadow-xl">
            {project.image ? (
              <img src={`https://da-portfolio-backend.onrender.com${project.image}`} alt={project.title} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                No Image
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-1">{project.description}</p>
              
              <div className="mb-4">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Key Insights:</span>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 italic">{project.insights}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tools?.map((tool, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-slate-200 dark:bg-dark-border text-slate-700 dark:text-slate-300 rounded">
                    {tool}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4 mt-auto">
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary-500 transition">
                    <FaGithub className="w-4 h-4 mr-1" /> Code
                  </a>
                )}
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 transition">
                    <ExternalLink className="w-4 h-4 mr-1" /> View Live
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
