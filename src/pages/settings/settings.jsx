import React, { useState } from 'react';
import { Plus, UserRoundPen, SquareX, ChevronDown, ListFilter, Search, X, Check } from 'lucide-react';

// --- 1. DISTRICT MAPPING DATA ---
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
  const [activeTab, setActiveTab] = useState('Master Data Management');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // --- 2. MASTER DATA STATES ---
  const [jobsData, setJobsData] = useState([
    { id: 1, job: "Software Developer", barangay: "Highway Hills" },
    { id: 2, job: "Graphic Designer", barangay: "Addition Hills" },
    { id: 3, job: "Marketing Specialist", barangay: "Bagong Silang" },
    { id: 4, job: "Project Manager", barangay: "Barangka Drive" },
  ]);

  const [modalJob, setModalJob] = useState("");
  const [modalBarangay, setModalBarangay] = useState("");
  const [modalDistrict, setModalDistrict] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("All");
  const [filterBarangay, setFilterBarangay] = useState("All");

  // --- 3. FAQ STATES ---
  const [faqs, setFaqs] = useState([
    { id: 1, question: "How do I register?", answer: "Click on the registration button and fill out the required information." },
    { id: 2, question: "What are the Requirements?", answer: "You need a valid ID and proof of residency in Mandaluyong City." }
  ]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Style Constant for the White Dropdowns
  const selectClass = "w-full appearance-none px-4 py-2 border-none rounded-xl text-sm bg-white text-black outline-none pr-10 font-medium cursor-pointer";

  // --- 4. HANDLERS ---
  const openAddModal = () => {
    setEditingId(null);
    setModalJob("");
    setModalBarangay("");
    setModalDistrict("");
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setModalJob(item.job);
    setModalBarangay(item.barangay);
    setModalDistrict(DISTRICT_MAP[item.barangay]?.toString() || "");
    setIsModalOpen(true);
  };

  const handleSaveJob = () => {
    if (!modalJob || !modalBarangay) return;
    if (editingId) {
      setJobsData(jobsData.map(j => j.id === editingId ? { ...j, job: modalJob, barangay: modalBarangay } : j));
    } else {
      setJobsData([{ id: Date.now(), job: modalJob, barangay: modalBarangay }, ...jobsData]);
    }
    setIsModalOpen(false);
  };

  const deleteJob = (id) => setJobsData(jobsData.filter(j => j.id !== id));

  const getBarangaysByDistrict = (district) => {
    return Object.keys(DISTRICT_MAP).filter(brgy => 
      district === "All" || DISTRICT_MAP[brgy].toString() === district
    ).sort();
  };

  const filteredJobs = jobsData.filter((item) => {
    const matchesSearch = item.job.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrgy = filterBarangay === "All" || item.barangay === filterBarangay;
    const matchesDist = filterDistrict === "All" || DISTRICT_MAP[item.barangay]?.toString() === filterDistrict;
    return matchesSearch && matchesBrgy && matchesDist;
  });

  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen font-sans text-gray-800 space-y-6">
      
      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#1e293b]">
                {editingId ? 'Edit Job Entry' : 'Add New Job Category'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">District</label>
                <select 
                  value={modalDistrict}
                  onChange={(e) => { setModalDistrict(e.target.value); setModalBarangay(""); }}
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="">Select District</option>
                  <option value="1">District 1</option>
                  <option value="2">District 2</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Barangay</label>
                <select 
                  value={modalBarangay}
                  disabled={!modalDistrict}
                  onChange={(e) => setModalBarangay(e.target.value)}
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-amber-400 disabled:bg-gray-50"
                >
                  <option value="">Select Barangay</option>
                  {getBarangaysByDistrict(modalDistrict).map(brgy => (
                    <option key={brgy} value={brgy}>{brgy}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Job Title</label>
                <input 
                  type="text" value={modalJob}
                  onChange={(e) => setModalJob(e.target.value)}
                  placeholder="e.g. Graphic Designer"
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <button onClick={handleSaveJob} className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 rounded-xl transition-colors mt-4">
                {editingId ? 'Save Changes' : 'Confirm Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOX 1: HEADER SECTION */}
      <div className="bg-[#1e293b] rounded-2xl p-8 shadow-md">
        <h1 className="text-white text-2xl font-semibold mb-6">System Configuration</h1>
        <div className="flex gap-4">
          {['Master Data Management', 'Content Management System', 'Audit Logs'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all border-2 ${
                activeTab === tab ? 'border-amber-400 text-amber-400 bg-[#2d3a4d]' : 'border-transparent text-gray-400 bg-[#334155] hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* BOX 2: FILTER & SEARCH BOX */}
      {activeTab === 'Master Data Management' && (
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg flex flex-wrap gap-4 items-center">
            {/* District Filter - Background White, Text Black */}
            <div className="relative min-w-[180px]">
              <select 
                value={filterDistrict}
                onChange={(e) => { setFilterDistrict(e.target.value); setFilterBarangay("All"); }}
                className={selectClass}
              >
                <option value="All">District Filter</option>
                <option value="1">District 1</option>
                <option value="2">District 2</option>
              </select>
              <ListFilter size={14} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
            </div>

            {/* Barangay Filter - Background White, Text Black */}
            <div className="relative min-w-[200px]">
              <select 
                value={filterBarangay}
                onChange={(e) => setFilterBarangay(e.target.value)}
                className={selectClass}
              >
                <option value="All">Select Barangay</option>
                {getBarangaysByDistrict(filterDistrict).map(brgy => (
                  <option key={brgy} value={brgy}>{brgy}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
            </div>

            {/* Search Input - Remains Dark for contrast */}
            <div className="flex-1 relative min-w-[250px]">
              <input 
                type="text" 
                placeholder="Enter Job Category Name" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-[#334155] text-white rounded-xl text-sm outline-none border-none pl-10 placeholder-gray-400" 
              />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            <button 
              onClick={openAddModal}
              className="flex items-center gap-2 px-8 py-2 bg-white text-[#1e293b] rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors"
            >
              Add <Plus size={16} />
            </button>
        </div>
      )}

      {/* BOX 3: MAIN CONTENT BOX */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm min-h-[500px] p-8">
        {activeTab === 'Master Data Management' && (
          <div className="animate-in fade-in">
            <TableHeader columns={['Jobs', 'Barangay']} />
            <div className="divide-y divide-gray-100">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((item) => (
                  <DataRow 
                    key={item.id} 
                    label={item.job} 
                    sublabel={item.barangay} 
                    onDelete={() => deleteJob(item.id)}
                    onEdit={() => openEditModal(item)}
                  />
                ))
              ) : (
                <div className="py-20 text-center text-gray-400 font-medium">No matching records found.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'Content Management System' && (
          <div className="animate-in fade-in">
            <h2 className="text-amber-500 font-bold text-lg mb-6 uppercase tracking-wide">Manage FAQS</h2>
            <div className="space-y-4 mb-10 max-w-4xl">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Question</label>
                <input 
                  type="text" value={question} onChange={(e)=>setQuestion(e.target.value)}
                  placeholder="Enter FAQ Question" className="w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-amber-400" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Answer</label>
                <textarea 
                  rows="4" value={answer} onChange={(e)=>setAnswer(e.target.value)}
                  placeholder="Enter FAQ Answer" className="w-full px-4 py-2 border rounded-lg text-sm resize-none outline-none focus:ring-1 focus:ring-amber-400" 
                />
              </div>
              <button 
                onClick={() => { if(question && answer) { setFaqs([{id: Date.now(), question, answer}, ...faqs]); setQuestion(""); setAnswer(""); }}}
                className="bg-amber-400 text-white px-8 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg hover:bg-amber-500 transition-colors"
              >
                Add <Plus size={16} />
              </button>
            </div>
            <div className="space-y-6">
              {faqs.map(f => (
                <div key={f.id} className="flex justify-between items-start group border-b border-gray-50 pb-4">
                  <div>
                    <h4 className="font-bold text-gray-800">{f.question}</h4>
                    <p className="text-gray-500 text-sm">{f.answer}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                     <ActionIcons onDelete={() => setFaqs(faqs.filter(x => x.id !== f.id))} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---
const TableHeader = ({ columns }) => (
  <div className="grid grid-cols-2 px-12 py-3 mb-2 bg-[#fdf8e9] rounded-full text-gray-400 font-medium text-center text-sm">
    {columns.map(col => <div key={col}>{col}</div>)}
  </div>
);

const ActionIcons = ({ onEdit, onDelete }) => (
  <div className="flex items-center gap-3">
    {onEdit && (
      <button onClick={onEdit} className="text-gray-400 hover:text-blue-600 transition-transform hover:scale-110">
        <UserRoundPen size={20} strokeWidth={2.5} />
      </button>
    )}
    <button onClick={onDelete} className="bg-red-600 rounded p-0.5 hover:bg-red-700 transition-transform hover:scale-110 shadow-sm">
      <SquareX size={16} className="text-white" />
    </button>
  </div>
);

const DataRow = ({ label, sublabel, onEdit, onDelete }) => (
  <div className="grid grid-cols-2 px-12 py-5 items-center group border-b border-gray-50">
    <div className="text-gray-800 font-medium text-center">{label}</div>
    <div className="flex justify-center items-center gap-24 relative">
      <span className="text-gray-600">{sublabel}</span>
      <div className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <ActionIcons onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  </div>
);

export default Settings;