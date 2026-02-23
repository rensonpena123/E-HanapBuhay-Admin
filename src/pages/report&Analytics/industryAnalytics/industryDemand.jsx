import React from 'react';
import { Briefcase, TrendingUp, CheckCircle } from 'lucide-react';
import { categoryStats } from './industryData.js';
const IndustryDemand = ({ filters }) => { 

  const getStatusColor = (status) => {
    switch (status) {
      case 'High Demand': return 'bg-orange-100 text-orange-700';
      case 'Balanced': return 'bg-green-100 text-green-700';
      case 'Low Supply': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex flex-col shadow-sm rounded-2xl overflow-hidden border border-gray-200">
      <div className="bg-brand-dark p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            Industry Demand Analysis
          </h3>
          {/* Optional: Show active filter hint */}
          {filters?.barangay !== "Any" && (
            <span className="text-xs text-brand-dark bg-brand-yellow px-2 py-1 rounded font-bold">
              {filters.barangay}
            </span>
          )}
        </div>
      </div>
      
      {/* BODY: White background for the table */}
      <div className="bg-white p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-gray-500 uppercase border-b border-gray-200 bg-gray-50/50">
                <th className="py-3 pl-4 font-bold rounded-l-lg">Rank</th>
                <th className="py-3 font-bold">Category</th>
                <th className="py-3 font-bold text-center">Open Positions</th>
                <th className="py-3 font-bold text-center">Total Hired</th>
                <th className="py-3 font-bold text-right pr-4 rounded-r-lg">Market Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {categoryStats.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                  <td className="py-4 pl-4 font-bold text-gray-400">#{item.rank}</td>
                  <td className="py-4 font-bold text-brand-dark flex items-center gap-3">
                     <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-brand-yellow group-hover:text-white transition-colors">
                       <Briefcase size={16} />
                     </div>
                     {item.name}
                  </td>
                  <td className="py-4 text-center">
                    <span className="font-bold text-brand-dark text-md">{item.openPositions}</span>
                  </td>
                  <td className="py-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600">
                      <CheckCircle size={14} className="text-green-500"/>
                      {item.hired}
                    </div>
                  </td>
                  <td className="py-4 text-right pr-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border border-transparent ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IndustryDemand;