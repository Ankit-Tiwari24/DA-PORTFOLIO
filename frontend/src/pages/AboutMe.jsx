import { motion } from 'framer-motion';
import { Database, LineChart, LayoutDashboard, BrainCircuit } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

export default function AboutMe() {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Data Insights Extracted',
        data: [12, 19, 15, 25, 22, 30],
        fill: true,
        borderColor: '#ffdb70',
        backgroundColor: 'rgba(255, 219, 112, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#a3a3a3' } },
      y: { grid: { color: '#383838' }, ticks: { color: '#a3a3a3' } },
    },
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-16 lg:pb-0"
    >
      <h2 className="text-3xl font-bold text-white mb-6 relative w-fit">
        About Me
        <span className="w-12 h-1.5 bg-accent rounded-full absolute -bottom-3 left-0"></span>
      </h2>
      
      <div className="text-dark-mutedtext space-y-5 mb-10 text-[15px] leading-relaxed mt-8">
        <p>
          As a detail-oriented Data Analyst, I specialize in transforming complex datasets into actionable business intelligence. With strong expertise in Python, SQL, and Power BI, I bridge the gap between raw data and strategic decision-making by architecting intuitive, high-impact visualization dashboards.
        </p>
        <p>
          My focus is on identifying performance metrics, seasonal trends, and predictive anomalies that directly drive operational efficiency. From optimizing pricing models to analyzing customer retention, my goal is to deliver clean, scalable, and visually compelling data solutions that empower stakeholders to make informed, data-driven decisions.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-white mb-6 mt-12">What I'm Doing</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <ServiceCard 
          icon={<Database className="text-accent w-8 h-8" />}
          title="Data Analysis"
          desc="Deep dive into datasets to uncover trends, anomalies, and metrics."
        />
        <ServiceCard 
          icon={<LineChart className="text-accent w-8 h-8" />}
          title="Data Visualization"
          desc="High-quality infographics and charts created at the professional level."
        />
        <ServiceCard 
          icon={<LayoutDashboard className="text-accent w-8 h-8" />}
          title="Dashboard Creation"
          desc="Interactive and real-time dashboards for executives and teams."
        />
        <ServiceCard 
          icon={<Database className="text-accent w-8 h-8" />}
          title="Statistical Analysis"
          desc="Applying advanced statistical models to ensure data integrity and uncover meaning."
        />
      </div>

      <h3 className="text-2xl font-bold text-white mb-6 mt-12">Performance Metrics</h3>
      <div className="bg-dark-bg border border-dark-border rounded-2xl p-6 shadow-sm">
         <Line options={chartOptions} data={chartData} className="max-h-[300px]" />
      </div>
    </motion.div>
  );
}

function ServiceCard({ icon, title, desc }) {
  return (
    <div className="bg-dark-bg border border-dark-border rounded-2xl p-6 flex gap-4 shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-[100px] -z-0 transition-transform duration-500 group-hover:scale-125"></div>
      <div className="z-10">{icon}</div>
      <div className="z-10">
        <h4 className="text-white font-bold mb-2">{title}</h4>
        <p className="text-dark-mutedtext text-sm">{desc}</p>
      </div>
    </div>
  );
}
