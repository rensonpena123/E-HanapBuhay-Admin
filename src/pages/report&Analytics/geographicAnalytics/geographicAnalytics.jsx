import React from 'react';
import { useGeographicData } from './geographicData.js';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GeographicAnalytics = () => {
  const { data, loading } = useGeographicData();

  if (loading) return <div className="p-8 text-white">Loading Analytics...</div>;
  if (!data) return null;

  // --- CONFIGURATION FOR CHART 1 (Vertical) ---
  const jobPostOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  const jobPostData = {
    labels: data.jobPosts.map(item => item.name),
    datasets: [
      {
        label: 'Job Posts',
        data: data.jobPosts.map(item => item.value),
        backgroundColor: '#1a263e', // Dark Blue
        borderRadius: 4,
      },
    ],
  };

  // --- CONFIGURATION FOR CHART 2 (Horizontal) ---
  const applicantOptions = {
    indexAxis: 'y', 
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { beginAtZero: true },
    },
  };

  const applicantData = {
    labels: data.applicants.map(item => item.name),
    datasets: [
      {
        label: 'Applicants',
        data: data.applicants.map(item => item.value),
        backgroundColor: data.applicants.map(item => item.color), 
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 mt-6">
      {/* Header */}
      <div className="bg-[#1a263e] p-4">
        <h2 className="text-white text-lg font-bold">Geographic Analytics</h2>
      </div>

      <div className="p-6 bg-gray-50 space-y-8">
        
        {/* Top Row: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Chart 1: Job Post per Barangay */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">Job Post per Barangay</h3>
            <div className="h-64">
              <Bar options={jobPostOptions} data={jobPostData} />
            </div>
          </div>

          {/* Chart 2: Applicant Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800">Applicant Distribution</h3>
            <p className="text-sm text-gray-500 mb-4">Registered job seekers per barangay</p>
            <div className="h-64">
              <Bar options={applicantOptions} data={applicantData} />
            </div>
          </div>
        </div>

        {/* Bottom Row: Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Barangay Engagement</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                <tr>
                  <th className="px-6 py-3 text-brand-yellow">Rank</th>
                  <th className="px-6 py-3 text-brand-yellow">Barangay Name</th>
                  <th className="px-6 py-3 text-brand-yellow">Session Counts</th>
                  <th className="px-6 py-3 text-brand-yellow">Avg. Time per Sessions</th>
                  <th className="px-6 py-3 text-brand-yellow">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.engagement.map((row) => (
                  <tr key={row.rank} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{row.rank}</td>
                    <td className="px-6 py-4">{row.name}</td>
                    <td className="px-6 py-4">{row.sessions}</td>
                    <td className="px-6 py-4">{row.time}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${row.status === 'High' ? 'bg-green-100 text-green-700' : 
                          row.status === 'Moderate' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-red-100 text-red-700'}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GeographicAnalytics;