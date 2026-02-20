import React, { useState, useRef, useEffect } from "react";
import {
  Briefcase, CheckCircle, Clock, XCircle, MoreHorizontal, Eye, Pencil,
  CircleCheck, CircleX, Trash2, ChevronLeft, ChevronRight, Calendar,
  ChevronDown, ChevronUp
} from "lucide-react";
import StatCard from "../../components/statCard.jsx";
import JmModal from "./jmModal.jsx";

const sampleJobs = [
  { id: "JOB-001", title: "Cashier", employer: "Peña-Nitro Coffee Shop", type: "Full-time", salary: "₱15,000 - ₱18,000", status: "Pending", applicants: 12, posted: "1 day ago" },
  { id: "JOB-002", title: "Customer Service", employer: "Teleperformance PH", type: "Full-time", salary: "₱18,000 - ₱22,000", status: "Active", applicants: 34, posted: "2 days ago" },
  { id: "JOB-003", title: "Delivery Rider", employer: "Grab Philippines", type: "Part-time", salary: "₱12,000 - ₱15,000", status: "Active", applicants: 56, posted: "3 days ago" },
  { id: "JOB-004", title: "Office Staff / Clerk", employer: "Highly Succeed Inc.", type: "Full-time", salary: "₱15,000 - ₱18,000", status: "Pending", applicants: 8, posted: "2 days ago" },
  { id: "JOB-005", title: "Security Guard", employer: "Securitas PH", type: "Full-time", salary: "₱14,000 - ₱16,000", status: "Closed", applicants: 22, posted: "2 weeks ago" },
  { id: "JOB-006", title: "Barista", employer: "Starbucks Shaw Blvd", type: "Part-time", salary: "₱10,000 - ₱13,000", status: "Active", applicants: 19, posted: "4 days ago" },
  { id: "JOB-007", title: "IT Support Specialist", employer: "RCBC Plaza", type: "Full-time", salary: "₱25,000 - ₱35,000", status: "Expired", applicants: 5, posted: "Just now" },
  { id: "JOB-008", title: "Graphic Designer", employer: "Creative Studio MNL", type: "Full-time", salary: "₱20,000 - ₱28,000", status: "Active", applicants: 14, posted: "5 days ago" },
  { id: "JOB-009", title: "Nurse", employer: "Makati Medical Center", type: "Full-time", salary: "₱22,000 - ₱30,000", status: "Pending", applicants: 9, posted: "1 week ago" },
  { id: "JOB-010", title: "Call Center Agent", employer: "Concentrix PH", type: "Full-time", salary: "₱16,000 - ₱20,000", status: "Active", applicants: 41, posted: "3 days ago" },
  { id: "JOB-011", title: "Electrician", employer: "PowerTech Services", type: "Part-time", salary: "₱13,000 - ₱17,000", status: "Expired", applicants: 3, posted: "2 weeks ago" },
  { id: "JOB-012", title: "Driver", employer: "LBC Express", type: "Full-time", salary: "₱14,000 - ₱16,000", status: "Closed", applicants: 7, posted: "1 week ago" },
];

const ITEMS_PER_PAGE = 7;

const salaryMap = {
  "₱10,000 - ₱15,000": [10000, 15000],
  "₱15,000 - ₱20,000": [15000, 20000],
  "₱20,000 - ₱30,000": [20000, 30000],
  "₱30,000+": [30000, Infinity],
};

function MiniCalendar({ value, onChange, onClose }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(value ? new Date(value) : today);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleString("default", { month: "long" });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const selectDay = (day) => {
    const selected = new Date(year, month, day);
    const formatted = selected.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
    onChange(formatted);
    onClose();
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="absolute z-50 top-12 left-0 bg-[#1a263e] border border-white/20 rounded-2xl p-4 w-64 shadow-2xl">
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="text-white/70 hover:text-white p-1"><ChevronLeft size={14} /></button>
        <span className="text-white text-sm font-semibold">{monthName} {year}</span>
        <button onClick={nextMonth} className="text-white/70 hover:text-white p-1"><ChevronRight size={14} /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
          <div key={d} className="text-white/40 text-xs text-center">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => (
          <div key={i}>
            {day ? (
              <button onClick={() => selectDay(day)} className="w-7 h-7 text-xs text-white rounded-full hover:bg-brand-yellow transition flex items-center justify-center">
                {day}
              </button>
            ) : <div />}
          </div>
        ))}
      </div>
    </div>
  );
}

function GlassSelect({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex-1 min-w-[150px]" ref={ref}>
      <label className="text-brand-yellow text-sm font-semibold mb-1 block">{label}</label>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-4 py-2 text-sm text-white rounded-full border border-white/20 bg-white/[0.07] backdrop-blur-md"
        >
          <span>{value}</span>
          {open ? <ChevronUp size={14} className="text-white/60" /> : <ChevronDown size={14} className="text-white/60" />}
        </button>
        {open && (
          <div className="absolute z-50 top-11 left-0 right-0 bg-[#1a263e] border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
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
    </div>
  );
}

function DropdownMenu({ job, openModal, triggerRef }) {
  const dropdownRef = useRef(null);
  const [style, setStyle] = useState({ opacity: 0 });

  useEffect(() => {
    if (triggerRef.current && dropdownRef.current) {
      const btnRect = triggerRef.current.getBoundingClientRect();
      const dropHeight = dropdownRef.current.offsetHeight;
      const dropWidth = dropdownRef.current.offsetWidth;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      const spaceBelow = viewportHeight - btnRect.bottom;
      const spaceAbove = btnRect.top;
      let top;
      if (spaceBelow < dropHeight + 8 && spaceAbove > dropHeight + 8) {
        top = btnRect.top - dropHeight - 4;
      } else {
        top = btnRect.bottom + 4;
      }

      let left = btnRect.right - dropWidth;
      if (left < 8) left = 8;
      if (left + dropWidth > viewportWidth - 8) left = viewportWidth - dropWidth - 8;

      setStyle({ top, left, opacity: 1 });
    }
  }, [triggerRef]);

  return (
    <div
      ref={dropdownRef}
      style={{ position: "fixed", zIndex: 9999, ...style }}
      className="bg-white border border-gray-200 rounded-xl shadow-xl w-44 py-1 transition-opacity duration-100"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={() => openModal("view", job)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full">
        <Eye size={14} /> View Details
      </button>
      <button onClick={() => openModal("edit", job)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full">
        <Pencil size={14} /> Edit Job Post
      </button>
      {job.status === "Pending" && (
        <button onClick={() => openModal("approve", job)} className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-gray-50 w-full">
          <CircleCheck size={14} /> Approve
        </button>
      )}
      {(job.status === "Pending" || job.status === "Active") && (
        <button onClick={() => openModal("reject", job)} className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-50 w-full">
          <CircleX size={14} /> Reject
        </button>
      )}
      {job.status === "Expired" && (
        <button onClick={() => openModal("renew", job)} className="flex items-center gap-2 px-4 py-2 text-sm text-blue-500 hover:bg-gray-50 w-full">
          <Clock size={14} /> Renew
        </button>
      )}
      {job.status === "Closed" && (
        <button onClick={() => openModal("reopen", job)} className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-gray-50 w-full">
          <CircleCheck size={14} /> Reopen
        </button>
      )}
      <button onClick={() => openModal("delete", job)} className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-50 w-full">
        <Trash2 size={14} /> Delete
      </button>
    </div>
  );
}

const statusBadge = (status) => {
  const styles = {
    Active: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Closed: "bg-red-100 text-red-500",
    Expired: "bg-gray-100 text-gray-500",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-500"}`}>
      {status}
    </span>
  );
};

function TableRow({ job, openMenu, setOpenMenu, openModal, selectedIds, toggleOne }) {
  const triggerRef = useRef(null);

  return (
    <tr className={`border-b border-gray-100 hover:bg-gray-50 ${selectedIds.includes(job.id) ? "bg-yellow-50" : ""}`}>
      <td className="py-3 px-2">
        <input type="checkbox" checked={selectedIds.includes(job.id)} onChange={() => toggleOne(job.id)} className="cursor-pointer accent-brand-yellow" />
      </td>
      <td className="py-3 px-2 text-gray-500">{job.id}</td>
      <td className="py-3 px-2 font-semibold">{job.title}</td>
      <td className="py-3 px-2 text-gray-500">{job.employer}</td>
      <td className="py-3 px-2 text-gray-500">{job.type}</td>
      <td className="py-3 px-2 text-gray-500">{job.salary}</td>
      <td className="py-3 px-2">{statusBadge(job.status)}</td>
      <td className="py-3 px-2 text-gray-500">{job.applicants}</td>
      <td className="py-3 px-2 text-gray-500">{job.posted}</td>
      <td className="py-3 px-2 relative">
        <button
          ref={triggerRef}
          onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === job.id ? null : job.id); }}
        >
          <MoreHorizontal size={18} className="text-gray-400" />
        </button>
        {openMenu === job.id && (
          <DropdownMenu job={job} openModal={openModal} triggerRef={triggerRef} />
        )}
      </td>
    </tr>
  );
}

export default function JobManagement() {
  const [openMenu, setOpenMenu] = useState(null);
  const [dateFrom, setDateFrom] = useState("02/13/2026");
  const [dateTo, setDateTo] = useState("02/13/2026");
  const [showCalFrom, setShowCalFrom] = useState(false);
  const [showCalTo, setShowCalTo] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Any");
  const [jobType, setJobType] = useState("Any");
  const [salaryRange, setSalaryRange] = useState("Any");
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkAction, setBulkAction] = useState(null);

  const clearFilters = () => {
    setDateFrom("02/13/2026");
    setDateTo("02/13/2026");
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

  const filteredJobs = sampleJobs.filter((job) => {
    if (activeFilter !== "Any" && job.status !== activeFilter) return false;
    if (jobType !== "Any" && job.type !== jobType) return false;
    if (salaryRange !== "Any") {
      const [min, max] = salaryMap[salaryRange] || [0, Infinity];
      const numbers = job.salary.match(/\d+,?\d+/g);
      if (!numbers) return false;
      const jobMin = parseInt(numbers[0].replace(",", ""));
      if (jobMin < min || jobMin >= max) return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
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
      className="min-h-screen bg-gray-100 p-6 space-y-6"
      onClick={() => { setOpenMenu(null); setShowCalFrom(false); setShowCalTo(false); }}
    >

      {/* Dark top section */}
      <div className="bg-brand-dark p-6 pb-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">Job Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Jobs" value={sampleJobs.length.toString()} icon={Briefcase} />
          <StatCard title="Active" value={sampleJobs.filter(j => j.status === "Active").length.toString()} icon={CheckCircle} />
          <StatCard title="Pending Reviews" value={sampleJobs.filter(j => j.status === "Pending").length.toString()} icon={Clock} />
          <StatCard title="Expired" value={sampleJobs.filter(j => j.status === "Expired").length.toString()} icon={XCircle} />
        </div>
      </div>

      {/* White container */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">

        {/* Filters */}
        <div className="bg-brand-dark rounded-2xl p-4">
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="text-brand-yellow text-sm font-semibold mb-1 block">Range Date</label>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowCalFrom(!showCalFrom); setShowCalTo(false); }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white rounded-full border border-white/20 bg-white/[0.07] backdrop-blur-md w-36"
                  >
                    <Calendar size={13} className="text-white/60" />
                    {dateFrom}
                  </button>
                  {showCalFrom && (
                    <div onClick={(e) => e.stopPropagation()}>
                      <MiniCalendar value={dateFrom} onChange={setDateFrom} onClose={() => setShowCalFrom(false)} />
                    </div>
                  )}
                </div>
                <span className="text-white text-sm">To</span>
                <div className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowCalTo(!showCalTo); setShowCalFrom(false); }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white rounded-full border border-white/20 bg-white/[0.07] backdrop-blur-md w-36"
                  >
                    <Calendar size={13} className="text-white/60" />
                    {dateTo}
                  </button>
                  {showCalTo && (
                    <div onClick={(e) => e.stopPropagation()}>
                      <MiniCalendar value={dateTo} onChange={setDateTo} onClose={() => setShowCalTo(false)} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <GlassSelect
              label="Status"
              value={activeFilter}
              onChange={(v) => { setActiveFilter(v); setCurrentPage(1); }}
              options={["Any", "Active", "Pending", "Closed", "Expired"]}
            />
            <GlassSelect
              label="Type"
              value={jobType}
              onChange={(v) => { setJobType(v); setCurrentPage(1); }}
              options={["Any", "Full-time", "Part-time"]}
            />
            <GlassSelect
              label="Salary Range"
              value={salaryRange}
              onChange={(v) => { setSalaryRange(v); setCurrentPage(1); }}
              options={["Any", "₱10,000 - ₱15,000", "₱15,000 - ₱20,000", "₱20,000 - ₱30,000", "₱30,000+"]}
            />

            <div>
              <button onClick={clearFilters} className="border border-white/20 text-white bg-white/[0.07] backdrop-blur-md rounded-full px-4 py-2 text-sm transition">
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Bulk action bar */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-3 bg-brand-yellow/10 border border-brand-yellow/30 rounded-xl px-4 py-2">
            <span className="text-sm font-semibold text-brand-yellow">{selectedIds.length} selected</span>
            <button onClick={() => setBulkAction("approve")} className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full hover:bg-green-200 transition">Approve All</button>
            <button onClick={() => setBulkAction("reject")} className="text-xs bg-red-100 text-red-500 px-3 py-1 rounded-full hover:bg-red-200 transition">Reject All</button>
            <button onClick={() => setBulkAction("delete")} className="text-xs bg-red-100 text-red-500 px-3 py-1 rounded-full hover:bg-red-200 transition">Delete All</button>
            <button onClick={() => setSelectedIds([])} className="text-xs text-gray-400 hover:text-gray-600 ml-auto">Clear</button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-3 px-2">
                  <input type="checkbox" checked={allChecked} onChange={toggleAll} className="cursor-pointer accent-brand-yellow" />
                </th>
                <th className="py-3 px-2">Job Id</th>
                <th className="py-3 px-2">Job Title</th>
                <th className="py-3 px-2">Employer</th>
                <th className="py-3 px-2">Type</th>
                <th className="py-3 px-2">Salary Range</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Applicants</th>
                <th className="py-3 px-2">Posted</th>
                <th className="py-3 px-2"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedJobs.length === 0 ? (
                <tr><td colSpan={10} className="text-center py-16 text-gray-400">No data available.</td></tr>
              ) : (
                paginatedJobs.map((job) => (
                  <TableRow
                    key={job.id}
                    job={job}
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                    openModal={openModal}
                    selectedIds={selectedIds}
                    toggleOne={toggleOne}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-400 pt-2">
          <span>Showing {paginatedJobs.length} of {filteredJobs.length} Jobs</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-1 hover:text-gray-600 disabled:opacity-30">
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button key={page} onClick={() => setCurrentPage(page)} className={`px-2 py-1 rounded text-sm ${currentPage === page ? "bg-brand-yellow text-white" : "hover:text-gray-600"}`}>
                {page}
              </button>
            ))}
            <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="p-1 hover:text-gray-600 disabled:opacity-30">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400">
          Expired job listings are automatically closed by the system. Jobs past their expiration date are flagged and moved to the Expired status.
        </p>
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