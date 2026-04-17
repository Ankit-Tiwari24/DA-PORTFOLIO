import { motion } from 'framer-motion';

export default function HeroSection() {
  const skills = ['Python', 'SQL', 'Excel', 'Power BI', 'Tableau', 'Statistics', 'Machine Learning'];

  return (
    <section id="about" className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
            Hi, I'm <span className="text-primary-500">Alex</span> <br/>
            <span className="text-3xl md:text-4xl text-slate-600 dark:text-slate-300">Data Analyst</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            I transform raw data into actionable insights. With a data-driven and problem-solving mindset, I help businesses make informed decisions through analytics and storytelling.
          </p>
          
          <div className="pt-4">
            <h3 className="text-sm uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-3">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium border border-primary-100 dark:border-primary-800">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-white dark:border-dark-card shadow-2xl overflow-hidden bg-gradient-to-tr from-primary-500 to-indigo-500 flex items-center justify-center text-white text-6xl font-bold">
            DP
          </div>
        </motion.div>
      </div>
    </section>
  );
}
