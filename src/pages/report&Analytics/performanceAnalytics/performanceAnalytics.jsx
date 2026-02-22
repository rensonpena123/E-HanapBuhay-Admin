import React from 'react';
import { usePerformanceData } from './performanceData.js';
import { FileText, Handshake, Clock } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PerformanceAnalytics = () => {
  const { data, loading } = usePerformanceData();

  if (loading) return <div className="p-8 text-white">Loading Performance Data...</div>;
  if (!data) return null;

  // --- CHART 1 CONFIG: Top Employers (Horizontal) ---
  const employersOptions = {
    indexAxis: 'y', 
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { beginAtZero: true } },
  };

  const employersData = {
    labels: data.topEmployers.map(item => item.name),
    datasets: [{
      data: data.topEmployers.map(item => item.value),
      backgroundColor: data.topEmployers.map(item => item.color),
      borderRadius: 4,
      barThickness: 20,
    }],
  };

  // --- CHART 2 CONFIG: Top Jobs (Vertical) ---
  const jobsOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: { legend: { display: false } },
    scales: { 
      y: { 
        beginAtZero: true,
        grid: { color: '#f3f4f6' } 
      },
      x: {
        grid: { display: false } 
      }
    },
  };

  const jobsData = {
    labels: data.topJobs.map(item => item.name),
    datasets: [{
      data: data.topJobs.map(item => item.value),
      backgroundColor: data.topJobs.map(item => item.color),
      borderRadius: 4,
      barThickness: 30,
    }],
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 mt-6">
      {/* Header */}
      <div className="bg-[#1a263e] p-4">
        <h2 className="text-white text-lg font-bold">Performance Analytics</h2>
      </div>

      <div className="p-6 bg-gray-50 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left column */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <h3 className="font-bold text-gray-800 mb-6">Top Employers</h3>
          <div className="h-64">
            <Bar options={employersOptions} data={employersData} />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          
          {/* Hiring & Placement Cards */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">Hiring and Placement</h3>
            <div className="flex flex-wrap gap-4 justify-between items-center">
              
              {/* Total Applicants */}
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold">Total Applicants</p>
                  <p className="text-xl font-bold text-gray-800">{data.hiringStats.totalApplicants.toLocaleString()}</p>
                </div>
              </div>

              {/* Hired */}
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Handshake className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold">Hired</p>
                  <p className="text-xl font-bold text-gray-800">{data.hiringStats.hired}</p>
                </div>
              </div>

              {/* Pending */}
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Clock className="text-yellow-600" size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold">Pending</p>
                  <p className="text-xl font-bold text-gray-800">{data.hiringStats.pending}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Top Jobs Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1 flex flex-col">
            <h3 className="font-bold text-gray-800 mb-4">Top Jobs</h3>
            
            <div className="h-64 w-full"> 
              <Bar options={jobsOptions} data={jobsData} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PerformanceAnalytics;