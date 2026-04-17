import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function SampleDashboard() {
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue Growth',
        data: [12000, 19000, 15000, 22000, 18000, 25000],
        backgroundColor: 'rgba(14, 165, 233, 0.8)',
        borderRadius: 4,
      },
    ],
  };

  const doughnutData = {
    labels: ['Organic', 'Direct', 'Referral', 'Social'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgba(14, 165, 233, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
       <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Sample Analytics</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">A quick glimpse of my visualization capabilities.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">Monthly Revenue Trend</h3>
          <Bar options={{ responsive: true, plugins: { legend: { display: false } } }} data={barData} />
        </div>
        <div className="glass p-6 rounded-2xl flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">Traffic Sources</h3>
          <div className="w-2/3">
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </div>
    </section>
  );
}
