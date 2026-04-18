import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink, X, Star, TrendingUp, Users, AlertTriangle } from 'lucide-react';

const FEATURED_PROJECT = {
  _id: "featured-1",
  isFeatured: true,
  title: "Hotel Booking Trends & Cancellation Analysis Dashboard",
  category: "Data Analysis",
  description: "Just completed my Hotel Booking Trends & Cancellation Analysis Dashboard!\nUsing Power BI, SQL, Python, and DAX, I analyzed 40K+ booking records to uncover key insights:\n\n• Seasonal peaks in ADR (August highest at 164)\n• Weak customer loyalty (<5% repeat guests)\n• Cancellation hotspots in OTA segments (~45%)",
  shortDescription: "Analyzed 40K+ hotel bookings to uncover trends in pricing, cancellations, and customer behavior.",
  businessImpact: "These insights can help optimize pricing strategies, improve customer retention, and reduce cancellations in the hospitality industry.",
  tools: ["Power BI", "SQL", "Python", "DAX"],
  githubLink: "https://github.com/Ankit-Tiwari24/Hotel-booking-trends-and-cancellation-Analysis",
  images: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
  ],
  keyInsights: [
    { icon: <TrendingUp className="w-5 h-5 text-accent" />, title: "Peak ADR in August", desc: "Highest Average Daily Rate hitting 164" },
    { icon: <Users className="w-5 h-5 text-accent" />, title: "Low repeat customers", desc: "Less than 5% of guests are returning" },
    { icon: <AlertTriangle className="w-5 h-5 text-red-400" />, title: "High cancellations in OTA", desc: "Approximately 45% cancellation rate" }
  ]
};

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/projects`);
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
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-16 lg:pb-0"
    >
      <h2 className="text-3xl font-bold text-white mb-10 relative w-fit">
        Portfolio
        <span className="w-12 h-1.5 bg-accent rounded-full absolute -bottom-3 left-0"></span>
      </h2>

      {/* Featured Project Banner / Card */}
      {(filter === 'All' || filter === FEATURED_PROJECT.category) && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-accent fill-accent" />
            <h3 className="text-xl font-bold text-white">Featured Project</h3>
          </div>
          
          <motion.div 
            layout
            onClick={() => setSelectedProject(FEATURED_PROJECT)}
            className="group cursor-pointer rounded-3xl overflow-hidden bg-dark-bg border border-dark-border transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_15px_40px_-10px_rgba(255,219,112,0.2)] md:flex relative min-h-[300px]"
          >
            <div className="md:w-1/2 relative overflow-hidden flex-shrink-0 h-64 md:h-auto">
               <img src={FEATURED_PROJECT.images[0]} alt={FEATURED_PROJECT.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#111111] via-[#111111]/40 to-transparent"></div>
            </div>
            
            <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center relative z-10 bg-dark-bg">
               <div className="flex flex-wrap gap-2 mb-4">
                 {FEATURED_PROJECT.tools.map((tool, i) => (
                   <span key={i} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-[#2b2b2c] text-accent rounded-md border border-dark-border">
                     {tool}
                   </span>
                 ))}
               </div>
               <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-accent transition-colors">{FEATURED_PROJECT.title}</h3>
               <p className="text-dark-mutedtext text-[15px] leading-relaxed mb-6">
                 {FEATURED_PROJECT.shortDescription}
               </p>
               
               <div className="mt-auto">
                 <span className="inline-flex items-center text-sm font-semibold text-white bg-accent/20 px-4 py-2 rounded-xl group-hover:bg-accent group-hover:text-dark-bg transition-colors">
                   <ExternalLink className="w-4 h-4 mr-2"/> View Details
                 </span>
               </div>
            </div>
          </motion.div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="flex gap-6 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`whitespace-nowrap transition font-medium text-[15px] pb-1 border-b-2 ${filter === cat ? 'text-accent border-accent' : 'text-dark-mutedtext border-transparent hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map(project => (
            <ProjectCard key={project._id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProjectCard({ project, onClick }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group cursor-pointer rounded-3xl overflow-hidden bg-dark-bg border border-dark-border transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_15px_40px_-10px_rgba(255,219,112,0.2)] relative h-64"
    >
      {project.image ? (
        <img src={`${API_URL}${project.image}`} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center text-dark-mutedtext transition-transform duration-500 group-hover:scale-105">
          No Image
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-transparent opacity-100 transition-opacity duration-300 z-10"></div>
      <div className="relative z-20 h-full p-6 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
         <span className="text-accent text-[11px] font-bold uppercase tracking-widest mb-2 drop-shadow-md">{project.category}</span>
         <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">{project.title}</h3>
         <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 mt-1 border-t border-dark-border pt-3">
            <span className="inline-flex items-center text-[13px] font-semibold text-dark-mutedtext group-hover:text-accent transition-colors"><ExternalLink className="w-4 h-4 mr-2"/> View Details</span>
         </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      ></motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-card border border-dark-border p-6 md:p-8 rounded-3xl shadow-2xl scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-dark-bg border border-dark-border rounded-xl text-dark-mutedtext hover:text-accent transition-colors z-50 shadow-lg"
        >
          <X className="w-5 h-5"/>
        </button>
        
        {(() => {
          let imageUrl = null;
          if (project.isFeatured && project.images && project.images.length > 0) {
            imageUrl = project.images[0];
          } else if (project.image) {
            imageUrl = `${API_URL}${project.image}`;
          }

          if (imageUrl) {
            return (
              <div className="mb-8 relative group">
                <span className="text-accent text-[11px] font-bold uppercase tracking-widest pl-1 mb-2 block">
                  Dashboard Preview
                </span>
                <div className="rounded-2xl overflow-hidden border border-dark-border shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <img src={imageUrl} alt={project.title} className="w-full object-cover max-h-[450px]" />
                </div>
              </div>
            );
          }
          return null;
        })()}
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tools?.map((tool, i) => (
            <span key={i} className="text-[12px] font-bold uppercase tracking-wider px-3 py-1.5 bg-[#2b2b2c] text-accent rounded-lg border border-dark-border">
              {tool}
            </span>
          ))}
        </div>

        <h3 className="text-3xl font-bold text-white mb-6 pr-10">{project.title}</h3>
        
        <div className="mb-8 whitespace-pre-line text-dark-mutedtext leading-relaxed text-[15px]">
          {project.description}
        </div>

        {project.isFeatured && project.keyInsights && (
          <div className="mb-8">
             <h4 className="text-xl font-bold text-white mb-4 flex items-center">
               <TrendingUp className="w-5 h-5 mr-2 text-accent" /> Key Insights
             </h4>
             <div className="grid md:grid-cols-3 gap-4">
               {project.keyInsights.map((insight, idx) => (
                 <div key={idx} className="p-5 bg-dark-bg border border-dark-border rounded-2xl hover:shadow-[0_0_15px_rgba(255,219,112,0.1)] transition-all">
                    <div className="mb-3 p-3 bg-[#2b2b2c] rounded-xl w-fit border border-dark-border">
                      {insight.icon}
                    </div>
                    <h5 className="text-white font-bold mb-1 text-[15px]">{insight.title}</h5>
                    <p className="text-sm text-dark-mutedtext leading-relaxed">{insight.desc}</p>
                 </div>
               ))}
             </div>
          </div>
        )}

        {project.isFeatured && project.businessImpact && (
          <div className="mb-8 p-6 bg-[#2b2b2c] border border-dark-border rounded-2xl shadow-inner">
             <h4 className="text-lg font-bold text-white mb-2 flex items-center">
               💡 Business Impact
             </h4>
             <p className="text-[15px] text-dark-mutedtext leading-relaxed">{project.businessImpact}</p>
          </div>
        )}
        
        {!project.isFeatured && project.insights && (
          <div className="mb-6 p-5 bg-dark-bg border border-dark-border rounded-2xl">
            <h4 className="text-white font-bold mb-2 flex items-center text-[15px]">
              Key Insights
            </h4>
            <p className="text-sm text-dark-mutedtext leading-relaxed italic border-l-2 border-accent pl-3">{project.insights}</p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-4 pt-4 border-t border-dark-border">
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-dark-bg bg-accent hover:bg-accent-hover transition px-6 py-3 rounded-xl shadow-lg shadow-accent/20">
              <ExternalLink className="w-5 h-5 mr-2" /> Live Dashboard
            </a>
          )}
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-white hover:text-accent transition px-6 py-3 bg-dark-bg border border-dark-border rounded-xl">
              <FaGithub className="w-5 h-5 mr-2" /> View on GitHub
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
