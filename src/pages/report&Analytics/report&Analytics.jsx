import React, { useState } from "react";
import { Building2, Briefcase, Timer, BadgeCheck } from "lucide-react";
import StatCard from "../../components/statCard.jsx";
import FilterBar from '../../components/filters/filterBar.jsx';
import FilterItem from '../../components/filters/filterItem.jsx';
import GeographicAnalytics from './geographicAnalytics/geographicAnalytics.jsx';
import PerformanceAnalytics from './performanceAnalytics/performanceAnalytics.jsx';
import DataExport from './dataExport.jsx';

export default function ReportsAndAnalytics() {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [barangay, setBarangay] = useState("Any");
  const [employers, setEmployers] = useState("Any");
  const [jobType, setJobType] = useState("Any");

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setBarangay("Any");
    setEmployers("Any");
    setJobType("Any");
  };

  return (
    <> 
    
      {/* Stat Cards*/}
      <div className="bg-brand-dark p-6 pb-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">Reports & Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Jobs" value="248" icon={Building2} />
          <StatCard title="Active" value="142" icon={Briefcase} />
          <StatCard title="Pending Reviews" value="38" icon={Timer} />
          <StatCard title="Expired" value="15" icon={BadgeCheck} />
        </div>
      </div>

      {/* Filter */}
      <div className="p-6">
          <FilterBar onClear={handleClear}>
            
            <div className="flex items-end gap-2">

            {/* Range Date */}
              <FilterItem label="Range Date">
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-[#2b3a55] text-white text-sm border border-gray-600 rounded-lg px-3 py-2 w-38 outline-none focus:border-brand-yellow" 
                />
              </FilterItem>
              <span className="text-brand-yellow font-bold pb-3">To</span>
              <FilterItem label="">
                <input 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-[#2b3a55] text-white text-sm border border-gray-600 rounded-lg px-3 py-2 w-38 outline-none focus:border-brand-yellow" 
                />
              </FilterItem>
            </div>

        {/* Barangay */}
          <FilterItem label="Barangay">
            <select 
              value={barangay} 
              onChange={(e) => setBarangay(e.target.value)}
              className="bg-[#2b3a55] text-white text-sm border border-gray-600 rounded-lg px-3 py-2 w-44 outline-none focus:border-brand-yellow"
            >
              <option value="Any">Any</option>
              <option value="Highway Hills">Highway Hills</option>
              <option value="Addition Hills">Addition Hills</option>
              <option value="Hulo">Hulo</option>
              <option value="Plainview">Plainview</option>
              <option value="Poblacion">Poblacion</option>
            </select>
          </FilterItem>

          {/* Employers */}
          <FilterItem label="Employers">
            <select 
              value={employers} 
              onChange={(e) => setEmployers(e.target.value)}
              className="bg-[#2b3a55] text-white text-sm border border-gray-600 rounded-lg px-3 py-2 w-44 outline-none focus:border-brand-yellow"
            >
              <option value="Any">Any</option>
              <option value="HSI">HSI</option>
              <option value="Mcdo">Mcdo</option>
              <option value="Jollibee">Jollibee</option>
              <option value="Inasal">Inasal</option>
              <option value="Mr.DIY">Mr.DIY</option>
            </select>
          </FilterItem>

        {/* Job Type */}
          <FilterItem label="Job Type">
            <select 
              value={jobType} 
              onChange={(e) => setJobType(e.target.value)}
              className="bg-[#2b3a55] text-white text-sm border border-gray-600 rounded-lg px-3 py-2 w-44 outline-none focus:border-brand-yellow"
            >
              <option value="Any">Any</option>
              <option value="IT">IT</option>
              <option value="Construction">Construction</option>
              <option value="Food Service">Food Service</option>
              <option value="Retail">Retail</option>
              <option value="Healthcare">Healthcare</option>
            </select>
          </FilterItem>

          </FilterBar>

          <GeographicAnalytics />

          <PerformanceAnalytics />

          <DataExport />
        </div>
    </> 
  );
}