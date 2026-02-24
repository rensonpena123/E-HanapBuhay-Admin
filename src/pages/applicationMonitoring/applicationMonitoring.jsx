import React, { useState, useRef, useEffect } from "react";
import {
  FileText, CheckCircle, Clock, AlertTriangle,
  ChevronDown, ChevronUp
} from "lucide-react";
import StatCard from "../../components/statCard.jsx";
import FilterBar from "../../components/filters/filterBar.jsx";
import FilterItem from "../../components/filters/filterItem.jsx";
import AmTable from "./amTable.jsx";
import AmModal from "./amModal.jsx";
import {
  sampleApplications, ITEMS_PER_PAGE, STATUS_OPTIONS,
  RESPONSE_TIME_OPTIONS, filterApplications, paginateApplications,
} from "./applicationHelpers.jsx";

// GlassSelect - local to this page, same pattern as jobManagement
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
        <div className="absolute z-50 top-11 left-0 right-0 bg-[#1a263e] border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm transition ${
                value === opt ? "text-brand-yellow bg-white/10" : "text-white hover:bg-white/10"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ApplicationMonitoring() {
  const [openMenu, setOpenMenu] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [responseTime, setResponseTime] = useState("Any");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const clearFilters = () => {
    setDateFrom("");
    setDateTo("");
    setStatusFilter("All");
    setResponseTime("Any");
    setCurrentPage(1);
  };

  const openModal = (type, application) => {
    setSelectedApplication(application);
    setModalType(type);
    setOpenMenu(null);
  };

  const closeModal = () => {
    setSelectedApplication(null);
    setModalType(null);
  };

  const filteredApplications = filterApplications(sampleApplications, {
    statusFilter,
    responseTime,
    dateFrom,
    dateTo,
  });

  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  const paginatedApplications = paginateApplications(filteredApplications, currentPage, ITEMS_PER_PAGE);

  const totalApps = sampleApplications.length;
  const pendingCount = sampleApplications.filter(a => a.status === "Pending").length;
  const reviewedCount = sampleApplications.filter(a => a.status === "Reviewed").length;
  const inactiveCount = sampleApplications.filter(a => a.status === "Inactive").length;

  return (
    <div
      className="min-h-screen bg-gray-100 p-.5 space-y-6"
      onClick={() => setOpenMenu(null)}
    >
      {/* Stat Cards */}
      <div className="bg-brand-dark p-6 pb-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">Application Monitoring</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Applications" value={totalApps.toString()} icon={FileText} />
          <StatCard title="Pending Employer Response" value={pendingCount.toString()} icon={Clock} />
          <StatCard title="Reviewed" value={reviewedCount.toString()} icon={CheckCircle} />
          <StatCard title="Inactive Applications" value={inactiveCount.toString()} icon={AlertTriangle} />
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
            <GlassSelect
              value={statusFilter}
              onChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}
              options={STATUS_OPTIONS}
            />
          </FilterItem>

          <FilterItem label="Response Time">
            <GlassSelect
              value={responseTime}
              onChange={(v) => { setResponseTime(v); setCurrentPage(1); }}
              options={RESPONSE_TIME_OPTIONS}
            />
          </FilterItem>

        </FilterBar>

        {/* Table */}
        <AmTable
          paginatedApplications={paginatedApplications}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          openModal={openModal}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          filteredCount={filteredApplications.length}
        />
      </div>

      {/* Modal */}
      <AmModal
        modalType={modalType}
        selectedApplication={selectedApplication}
        closeModal={closeModal}
      />
    </div>
  );
}