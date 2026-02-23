import React, { useState, useEffect, useRef } from "react";
import {
  Briefcase, CheckCircle, Clock, XCircle,
  ChevronDown, ChevronUp
} from "lucide-react";
import StatCard from "../../components/statCard.jsx";
import FilterBar from "../../components/filters/filterBar.jsx";
import FilterItem from "../../components/filters/filterItem.jsx";
import JmTable from "./jmTable.jsx";
import JmModal from "./jmModal.jsx";
import {
  sampleJobs, ITEMS_PER_PAGE, STATUS_OPTIONS,
  TYPE_OPTIONS, SALARY_OPTIONS, filterJobs, paginateJobs,
} from "./jobHelpers.jsx";

// GlassSelect - local to this page, used only in the filter bar
function GlassSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative min-w-[150px]">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="w-full flex items-center justify-between px-4 py-2 text-sm text-white rounded-full border border-white/20 bg-white/[0.07] backdrop-blur-md"
      >
        <span>{value}</span>
        {open
          ? <ChevronUp size={14} className="text-white/60" />
          : <ChevronDown size={14} className="text-white/60" />}
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-full bg-[#1a263e] border border-white/20 rounded-xl shadow-xl py-1 z-50">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm transition ${value === opt ? "text-brand-yellow bg-white/10" : "text-white hover:bg-white/10"}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JobManagement() {
  const [openMenu, setOpenMenu] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [activeFilter, setActiveFilter] = useState("Any");
  const [jobType, setJobType] = useState("Any");
  const [salaryRange, setSalaryRange] = useState("Any");
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkAction, setBulkAction] = useState(null);

  const clearFilters = () => {
    setDateFrom("");
    setDateTo("");
    setActiveFilter("Any");
    setJobType("Any");
    setSalaryRange("Any");
    setCurrentPage(1);
  };

  const openModal = (type, job) => {
    setSelectedJob(job);
    setModalType(type);
    setOpenMenu(null);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setModalType(null);
    setBulkAction(null);
  };

  const filteredJobs = filterJobs(sampleJobs, { activeFilter, jobType, salaryRange, dateFrom, dateTo });
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = paginateJobs(filteredJobs, currentPage, ITEMS_PER_PAGE);
  const allChecked = paginatedJobs.length > 0 && paginatedJobs.every(j => selectedIds.includes(j.id));

  const toggleAll = () => {
    if (allChecked) setSelectedIds(selectedIds.filter(id => !paginatedJobs.find(j => j.id === id)));
    else setSelectedIds([...new Set([...selectedIds, ...paginatedJobs.map(j => j.id)])]);
  };

  const toggleOne = (id) => setSelectedIds(
    selectedIds.includes(id) ? selectedIds.filter(i => i !== id) : [...selectedIds, id]
  );

  return (
    <div
      className="min-h-screen bg-gray-100 p-.5 space-y-6"
      onClick={() => setOpenMenu(null)}
    >
      {/* Stat Cards */}
      <div className="bg-brand-dark p-6 pb-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">Job Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Jobs" value={sampleJobs.length.toString()} icon={Briefcase} />
          <StatCard title="Active" value={sampleJobs.filter(j => j.status === "Active").length.toString()} icon={CheckCircle} />
          <StatCard title="Pending Reviews" value={sampleJobs.filter(j => j.status === "Pending").length.toString()} icon={Clock} />
          <StatCard title="Expired" value={sampleJobs.filter(j => j.status === "Expired").length.toString()} icon={XCircle} />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">

        {/* Filter Bar */}
        <FilterBar onClear={clearFilters}>

          <FilterItem label="Range Date">
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }}
                className="px-4 py-2 text-sm text-white rounded-lg border border-white/20 bg-white/[0.07] backdrop-blur-md w-40 outline-none focus:border-brand-yellow cursor-pointer"
              />
              <span className="text-brand-yellow text-sm font-semibold">To</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }}
                className="px-4 py-2 text-sm text-white rounded-lg border border-white/20 bg-white/[0.07] backdrop-blur-md w-40 outline-none focus:border-brand-yellow cursor-pointer"
              />
            </div>
          </FilterItem>

          <FilterItem label="Status">
            <GlassSelect value={activeFilter} onChange={(v) => { setActiveFilter(v); setCurrentPage(1); }} options={STATUS_OPTIONS} />
          </FilterItem>

          <FilterItem label="Type">
            <GlassSelect value={jobType} onChange={(v) => { setJobType(v); setCurrentPage(1); }} options={TYPE_OPTIONS} />
          </FilterItem>

          <FilterItem label="Salary Range">
            <GlassSelect value={salaryRange} onChange={(v) => { setSalaryRange(v); setCurrentPage(1); }} options={SALARY_OPTIONS} />
          </FilterItem>

        </FilterBar>

        {/* Table */}
        <JmTable
          paginatedJobs={paginatedJobs}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          openModal={openModal}
          selectedIds={selectedIds}
          toggleOne={toggleOne}
          allChecked={allChecked}
          toggleAll={toggleAll}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          filteredCount={filteredJobs.length}
          selectedIdsCount={selectedIds.length}
          setBulkAction={setBulkAction}
          setSelectedIds={setSelectedIds}
        />
      </div>

      {/* Modal */}
      <JmModal
        modalType={modalType}
        selectedJob={selectedJob}
        bulkAction={bulkAction}
        selectedIds={selectedIds}
        closeModal={closeModal}
        setSelectedIds={setSelectedIds}
      />
    </div>
  );
}