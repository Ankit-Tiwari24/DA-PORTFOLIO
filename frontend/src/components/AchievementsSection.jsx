export default function AchievementsSection() {
    return (
      <section id="achievements" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10">Achievements & Education</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-primary-500 mb-6">Certifications</h3>
                <ul className="space-y-4">
                    <li className="flex items-start">
                        <span className="w-2 h-2 mt-2 mr-3 bg-primary-500 rounded-full flex-shrink-0"></span>
                        <div>
                            <h4 className="font-medium text-slate-900 dark:text-white">Google Data Analytics Professional Certificate</h4>
                            <p className="text-sm text-slate-500">Coursera, 2023</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="w-2 h-2 mt-2 mr-3 bg-primary-500 rounded-full flex-shrink-0"></span>
                        <div>
                            <h4 className="font-medium text-slate-900 dark:text-white">Microsoft Certified: Power BI Data Analyst Associate</h4>
                            <p className="text-sm text-slate-500">Microsoft, 2023</p>
                        </div>
                    </li>
                </ul>
            </div>
            
            <div className="glass p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-primary-500 mb-6">Hackathons & Awards</h3>
                <ul className="space-y-4">
                    <li className="flex items-start">
                        <span className="w-2 h-2 mt-2 mr-3 bg-indigo-500 rounded-full flex-shrink-0"></span>
                        <div>
                            <h4 className="font-medium text-slate-900 dark:text-white">1st Place - DataViz Hackathon</h4>
                            <p className="text-sm text-slate-500">Analyzed public health datasets and built interactive dashboards.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </section>
    );
}
