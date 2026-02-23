import React, { useState } from 'react';
import { Plus, UserRoundPen, SquareX, ChevronDown, ListFilter, Search, X } from 'lucide-react';

// --- 1. DISTRICT MAPPING DATA ---
// Keeping this inside the file as a constant for easy access.
const DISTRICT_MAP = {
  "Addition Hills": 1, "Bagong Silang": 1, "Burol": 1, "Daang Bakal": 1,
  "Hagdan Bato Itaas": 1, "Hagdan Bato Libis": 1, "Harapin Ang Bukas": 1,
  "Highway Hills": 1, "Mauway": 1, "New Zañiga": 1, "Pag-asa": 1,
  "Pleasant Hills": 1, "Poblacion": 1, "Wack-Wack Greenhills East": 1,
  "Barangka Drive": 2, "Barangka Ibaba": 2, "Barangka Ilaya": 2,
  "Barangka Itaas": 2, "Buayang Bato": 2, "Hulo": 2, "Mabini–J. Rizal": 2,
  "Malamig": 2, "Namayan": 2, "Old Zañiga": 2, "Plainview": 2,
  "San Jose": 2, "Vergara": 2
};

const Settings = () => {
  // --- 2. STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('Master Data Management');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  // Mock Data
  const [jobsData] = useState([
    { id: 1, job: "Software Developer", barangay: "Highway Hills" },
    { id: 2, job: "Graphic Designer", barangay: "Addition Hills" },
    { id: 3, job: "Marketing Specialist", barangay: "Bagong Silang" },
    { id: 4, job: "Project Manager", barangay: "Barangka Drive" },
    { id: 5, job: "Data Analyst", barangay: "Plainview" },
    { id: 6, job: "UI/UX Designer", barangay: "Wack-Wack Greenhills East" },
  ]);

  const tabs = ['Master Data Management', 'Content Management System', 'Audit Logs'];

  // --- 3. FILTER LOGIC ---
  const filteredJobs = jobsData.filter((item) => {
    // Search Filter
    const matchesSearch = item.job.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Barangay Filter
    const matchesBarangay = selectedBarangay === "All" || item.barangay === selectedBarangay;
    
    // District Filter
    const itemDistrict = DISTRICT_MAP[item.barangay]?.toString();
    const matchesDistrict = selectedDistrict === "All" || itemDistrict === selectedDistrict;

    return matchesSearch && matchesBarangay && matchesDistrict;
  });

  // Get dynamic list of barangays based on selected district
  const availableBarangays = Object.keys(DISTRICT_MAP).filter(brgy => 
    selectedDistrict === "All" || DISTRICT_MAP[brgy].toString() === selectedDistrict
  );

  return (
    <div className="p-6 bg-[#f3f4f6] min-h-screen font-sans text-gray-800">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* HEADER NAVIGATION */}
        <div className="bg-[#1e293b] rounded-t-2xl p-8 shadow-md">
          <h1 className="text-white text-2xl font-semibold mb-6">System Configuration</h1>
          <div className="flex gap-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                    setActiveTab(tab);
                    // Reset filters when switching tabs
                    setSearchTerm("");
                    setSelectedBarangay("All");
                    setSelectedDistrict("All");
                }}
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-all border-2 whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-amber-400 text-amber-400 bg-[#2d3a4d]'
                    : 'border-transparent text-gray-400 bg-[#334155] hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT CARD */}
        <div className="bg-white rounded-b-2xl border border-gray-200 shadow-sm min-h-[600px] p-8">
          
          {/* TAB 1: MASTER DATA MANAGEMENT */}
          {activeTab === 'Master Data Management' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex flex-wrap gap-3 mb-8 items-center">
                
                {/* District Filter Dropdown */}
                <div className="relative">
                  <select 
                    value={selectedDistrict}
                    onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        setSelectedBarangay("All"); // Reset barangay when district changes
                    }}
                    className="appearance-none px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors pr-10 outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="All">Sort by District</option>
                    <option value="1">District 1</option>
                    <option value="2">District 2</option>
                  </select>
                  <ListFilter size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>

                {/* Barangay Filter Dropdown */}
                <div className="relative">
                  <select 
                    value={selectedBarangay}
                    onChange={(e) => setSelectedBarangay(e.target.value)}
                    className="appearance-none px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors pr-10 outline-none focus:ring-1 focus:ring-amber-400 max-w-[200px]"
                  >
                    <option value="All">Select Barangay</option>
                    {availableBarangays.sort().map(brgy => (
                      <option key={brgy} value={brgy}>{brgy}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>

                {/* Search Input */}
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    placeholder="Enter Job Category Name..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:ring-1 focus:ring-amber-400 pl-10" 
                  />
                  <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm("")} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                      <X size={16} />
                    </button>
                  )}
                </div>

                <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                  Add <Plus size={16} className="text-gray-400" />
                </button>
              </div>

              {/* Table Data */}
              <TableHeader columns={['Jobs', 'Barangay']} />
              
              <div className="divide-y divide-gray-100">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((item) => (
                    <DataRow key={item.id} label={item.job} sublabel={item.barangay} />
                  ))
                ) : (
                  <div className="py-20 text-center flex flex-col items-center justify-center text-gray-400">
                    <Search size={48} className="mb-2 opacity-20" />
                    <p>No results found for your filters.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CMS (Placeholder Content) */}
          {activeTab === 'Content Management System' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-amber-500 font-bold text-lg mb-6 uppercase tracking-wide">Manage FAQS</h2>
              <div className="space-y-4 mb-10 max-w-4xl">
                <div>
                  <label className="block text-sm font-bold mb-1">Question</label>
                  <input type="text" placeholder="Enter FAQ Question" className="w-full px-4 py-2 border border-gray-400 rounded-lg text-sm bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Answer</label>
                  <textarea rows="4" placeholder="Enter FAQ Answer" className="w-full px-4 py-2 border border-gray-400 rounded-lg text-sm bg-white resize-none" />
                </div>
                <button className="bg-amber-400 text-white px-6 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 hover:bg-amber-500">
                  Add <Plus size={16} />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: AUDIT LOGS (Placeholder Content) */}
          {activeTab === 'Audit Logs' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-amber-500 font-bold text-lg mb-6 uppercase tracking-wide">Audit Logs</h2>
              <div className="text-center py-20 text-gray-400 italic">
                System activity logs will appear here.
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// --- 4. REUSABLE UI SUB-COMPONENTS ---

const TableHeader = ({ columns }) => (
  <div className={`grid grid-cols-2 px-12 py-3 mb-2 bg-[#fdf8e9] rounded-full text-gray-400 font-medium text-center text-sm`}>
    {columns.map(col => <div key={col}>{col}</div>)}
  </div>
);

const ActionIcons = () => (
  <div className="flex items-center gap-3">
    <button className="hover:text-blue-600 transition-all hover:scale-110" title="Edit Profile">
      <UserRoundPen size={20} strokeWidth={2.5} />
    </button>
    <div className="bg-red-600 rounded p-0.5 hover:bg-red-700 cursor-pointer transition-all hover:scale-110 shadow-sm" title="Delete">
      <SquareX size={16} className="text-white" />
    </div>
  </div>
);

const DataRow = ({ label, sublabel }) => (
  <div className="grid grid-cols-2 px-12 py-5 items-center group animate-in fade-in slide-in-from-bottom-1">
    <div className="text-gray-800 font-medium text-center">{label}</div>
    <div className="flex justify-center items-center gap-24 relative">
      <span className="text-gray-600">{sublabel}</span>
      <div className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <ActionIcons />
      </div>
    </div>
  </div>
);

export default Settings;