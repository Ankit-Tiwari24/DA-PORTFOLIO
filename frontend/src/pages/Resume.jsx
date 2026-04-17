import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Briefcase, Award, Database, BarChart, LineChart, X } from 'lucide-react';
import { FaPython, FaFileExcel } from 'react-icons/fa';
import certImage from '../assets/Certificate.jpg';

export default function Resume() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-16 lg:pb-0"
    >
      <h2 className="text-3xl font-bold text-white mb-4 relative w-fit">
        Resume
        <span className="w-12 h-1.5 bg-accent rounded-full absolute -bottom-3 left-0"></span>
      </h2>
      <p className="text-accent font-medium mb-8 text-lg">Ankit Tiwari</p>

      <div className="mt-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-dark-bg border border-dark-border rounded-xl flex items-center justify-center text-accent shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold text-white">Education</h3>
        </div>

        <div className="relative border-l border-dark-border ml-6 pl-8 space-y-8 mb-12">
          <TimelineItem 
            title="BCA - IGNOU" 
            date="2023 — 2026" 
            desc="Currently pursuing BCA with focus on Data Analysis, SQL, Python, and data visualization tools." 
          />
        </div>
      </div>

      <div className="bg-[#2b2b2c] p-8 mt-12 rounded-3xl border border-dark-border">
        <h3 className="text-xl font-bold text-white mb-6">My Skills</h3>
        <div className="space-y-4">
          <SkillBar name="Python" percent={90} icon={<FaPython className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-300 drop-shadow-md" />} />
          <SkillBar name="SQL" percent={85} icon={<Database className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-300 drop-shadow-md" />} />
          <SkillBar name="Power BI" percent={80} icon={<BarChart className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-300 drop-shadow-md" />} />
          <SkillBar name="Excel" percent={95} icon={<FaFileExcel className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-300 drop-shadow-md" />} />
          <SkillBar name="Data Visualization" percent={85} icon={<LineChart className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-300 drop-shadow-md" />} />
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-dark-bg border border-dark-border rounded-xl flex items-center justify-center text-accent shadow-sm">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold text-white">Certifications</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div 
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer p-6 bg-dark-bg border border-dark-border rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,219,112,0.15)] group"
            >
                <div className="absolute top-0 right-0 w-16 h-16 bg-accent opacity-[0.03] rounded-bl-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl drop-shadow-md">🎓</span>
                  <h4 className="text-white font-bold">Data Analytics Certification</h4>
                </div>
                <p className="text-accent text-sm font-semibold mb-3">Udayan Care</p>
                <p className="text-dark-mutedtext text-sm leading-relaxed mb-4">Completed training in data analysis, including Excel, SQL, and data visualization.</p>
                <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border-t border-dark-border pt-4 mt-2">
                  <span className="text-accent text-sm font-bold flex items-center gap-2">View Certificate →</span>
                </div>
            </div>
        </div>
      </div>

      {/* Certification Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative z-10 w-full max-w-3xl bg-[#111] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10 flex flex-col max-h-[90vh]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/60 hover:bg-accent rounded-full text-white hover:text-[#111] transition-all backdrop-blur-md border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="p-3 sm:p-5 overflow-y-auto w-full h-full flex items-center justify-center">
                <img 
                  src={certImage} 
                  alt="Data Analytics Certification" 
                  className="w-full h-auto object-contain max-h-[80vh] rounded-lg shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TimelineItem({ title, date, desc }) {
  return (
    <div className="relative">
      <div className="absolute -left-[41px] top-1 w-4 h-4 bg-accent rounded-full border-[3px] border-dark-card shadow-[0_0_0_4px_rgba(255,219,112,0.15)] flex-shrink-0 z-10"></div>
      <h4 className="text-white font-bold text-[15px]">{title}</h4>
      <span className="text-accent text-sm font-medium block my-1">{date}</span>
      <p className="text-dark-mutedtext text-sm leading-relaxed mt-2">{desc}</p>
    </div>
  );
}

function SkillBar({ name, percent, icon }) {
  return (
    <div className="group bg-dark-bg p-5 rounded-2xl border border-dark-border transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,219,112,0.1)]">
      <div className="flex items-center gap-4 mb-3">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="flex-grow flex justify-between items-center">
          <span className="text-white text-[15px] font-bold tracking-wide">{name}</span>
          <span className="text-accent text-sm font-semibold">{percent}%</span>
        </div>
      </div>
      <div className="w-full bg-[#111111] rounded-full h-2 overflow-hidden border border-dark-border">
        <motion.div 
          className="bg-accent h-full rounded-full" 
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
        ></motion.div>
      </div>
    </div>
  );
}
