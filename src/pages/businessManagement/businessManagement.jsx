import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Clock, 
  AlertOctagon, 
  Edit,
  Eye, 
  CheckCircle, 
  XCircle,
  ArrowUpAZ,   
  ArrowDownAZ
} from 'lucide-react';
import StatCard from "../../components/statCard.jsx";
import { useBusinessData } from './useBusinessData.js';
import EditBusinessModal from './editBusinessInfo.jsx';

const BusinessManagement = () => {
  const { data, loading } = useBusinessData();
  
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState("Profile");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [localBusinessList, setLocalBusinessList] = useState([]);
  const [sortBy, setSortBy] = useState('name'); 
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    if (data?.businesses) {
      setLocalBusinessList(data.businesses);
    }
  }, [data]);

  const sortedBusinessList = [...localBusinessList].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (sortBy === 'dateRegistered') {
      valA = new Date(a.dateRegistered).getTime();
      valB = new Date(b.dateRegistered).getTime();
    }
    else if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const selectedBusiness = sortedBusinessList.find(b => b.id === selectedId) || sortedBusinessList[0];

  const handleSaveChanges = (updatedBusiness) => {
    const updatedList = localBusinessList.map(b => 
      b.id === updatedBusiness.id ? updatedBusiness : b
    );
    setLocalBusinessList(updatedList);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified': return 'bg-blue-100 text-blue-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Suspended': return 'bg-red-100 text-red-700';
      case 'Missing': return 'bg-gray-200 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header*/}
      <div className="bg-brand-dark p-6 pb-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">Business Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Business" value={loading || !data ? "..." : data.stats.total} icon={Building2} />
          <StatCard title="Verified" value={loading || !data ? "..." : data.stats.verified} icon={ShieldCheck} />
          <StatCard title="Pending" value={loading || !data ? "..." : data.stats.pending} icon={Clock} />
          <StatCard title="Suspended" value={loading || !data ? "..." : data.stats.suspended} icon={AlertOctagon} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[800px]">
        
        {/* LEFT PANEL: Business List */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
          
          <div className="p-4 border-b border-gray-100 flex flex-col gap-3 bg-gray-50 rounded-t-xl">
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Business List</span>
              <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded-full">Items: {sortedBusinessList.length}</span>
            </div>

            <div className="flex gap-2">
              {/* Dropdown for Criteria */}
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 text-sm text-gray-700 bg-white border border-gray-300 px-3 py-2 rounded-lg shadow-sm outline-none focus:border-brand-yellow cursor-pointer"
              >
                <option value="name">Name</option>
                <option value="dateRegistered">Date Registered</option>
                <option value="status">Status</option>
                <option value="type">Business Type</option>
              </select>

              {/* Button for Direction */}
              <button 
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="bg-white border border-gray-300 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition text-gray-600"
                title={sortOrder === 'asc' ? "Ascending (A-Z)" : "Descending (Z-A)"}
              >
                {sortOrder === 'asc' ? <ArrowUpAZ size={18} /> : <ArrowDownAZ size={18} />}
              </button>
            </div>

          </div>

          <div className="overflow-y-auto flex-1 p-2 space-y-2">
            {loading ? <div className="p-4 text-center text-gray-500">Loading list...</div> : 
              sortedBusinessList.map((business) => (
                <div key={business.id} onClick={() => setSelectedId(business.id)} className={`p-4 rounded-lg cursor-pointer transition-all border ${selectedBusiness?.id === business.id ? 'bg-gray-200 border-gray-300 shadow-inner' : 'bg-white border-transparent hover:bg-gray-50'}`}>
                   <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800">{business.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">ID: {business.id}</p>
                      {sortBy === 'dateRegistered' && <p className="text-[10px] text-gray-400">{business.dateRegistered}</p>}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${getStatusColor(business.status)}`}>{business.status}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button onClick={() => setActiveTab("Profile")} className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === "Profile" ? 'border-brand-yellow text-brand-yellow bg-yellow-50/50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Profile & Verification</button>
            <button onClick={() => setActiveTab("Status")} className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === "Status" ? 'border-brand-yellow text-brand-yellow bg-yellow-50/50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Status Control</button>
          </div>

          {!selectedBusiness ? (
            <div className="p-10 text-center text-gray-400">Select a business</div>
          ) : (
            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              
              {activeTab === "Profile" && (
                <>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Business Information</h3>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative">
                      
                      {/* Edit button*/}
                      <button 
                        onClick={() => setIsEditModalOpen(true)}
                        className="absolute top-4 right-4 flex items-center gap-1 bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-green-800 transition cursor-pointer"
                      >
                        <Edit size={12} /> Edit
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                        <InfoItem label="Business Name" value={selectedBusiness.name} />
                        <InfoItem label="Email address" value={selectedBusiness.email} />
                        <InfoItem label="Business Type" value={selectedBusiness.type} />
                        <InfoItem label="Registration Number" value={selectedBusiness.regNumber} />
                        <InfoItem label="Owner Name" value={selectedBusiness.owner} />
                        <InfoItem label="Date Registered" value={selectedBusiness.dateRegistered} />
                        <InfoItem label="Business Address" value={selectedBusiness.address} />
                        <InfoItem label="Phone number" value={selectedBusiness.phone} />
                      </div>
                    </div>
                  </div>
                  {/* Documents Section  */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {selectedBusiness.documents?.map((doc) => (
                        <div key={doc.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col justify-between h-40">
                           <div className="text-center">
                            <p className="font-bold text-sm text-gray-700 mb-2">{doc.title}</p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusColor(doc.status === 'Missing' ? 'Missing' : doc.status === 'Verified' ? 'Verified' : 'Pending')}`}>{doc.status === 'Missing' ? 'No document' : doc.status}</span>
                          </div>
                          <div className="flex justify-center gap-2 mt-4">
                            {doc.status !== 'Missing' && (
                              <>
                                <button className={`flex items-center gap-1 text-[10px] font-bold px-3 py-1.5 rounded-lg text-white transition ${doc.status === 'Verified' ? 'bg-red-400 hover:bg-red-500' : 'bg-yellow-500 hover:bg-yellow-600'}`}>{doc.status === 'Verified' ? <XCircle size={12}/> : <CheckCircle size={12}/>}{doc.status === 'Verified' ? 'Unverify' : 'Verify'}</button>
                                <button className="flex items-center gap-1 bg-gray-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-gray-600 transition"><Eye size={12}/> View</button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "Status" && (
                 <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Account Status Control</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div><p className="text-xs text-gray-500 mb-2">Account Status:</p><span className={`text-xs font-bold px-4 py-1.5 rounded-full ${getStatusColor(selectedBusiness.status)}`}>{selectedBusiness.status}</span></div>
                      <div><p className="text-xs text-gray-500 mb-1">Changed By:</p><p className="text-sm font-bold text-gray-800">{selectedBusiness.statusHistory?.changedBy || "System"}</p></div>
                      <div className="md:col-span-2"><p className="text-xs text-gray-500 mb-1">Last Status Changed:</p><p className="text-sm font-bold text-gray-800">{selectedBusiness.statusHistory?.lastChanged || "N/A"}</p></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <EditBusinessModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        business={selectedBusiness}
        onSave={handleSaveChanges}
      />

    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}:</p>
    <p className="text-sm font-bold text-gray-800">{value}</p>
  </div>
);

export default BusinessManagement;