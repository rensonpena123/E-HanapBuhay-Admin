// jmTable.jsx
// Renders the jobs data table with smart fixed-position dropdown per row.
// Posted column shows both relative time and exact date.
// Handles bulk action bar and pagination footer.

import React, { useRef, useEffect, useState } from "react";
import {
  MoreHorizontal, Eye, Pencil, CircleCheck, CircleX,
  Trash2, Clock, ChevronLeft, ChevronRight
} from "lucide-react";
import { statusBadge } from "./jobHelpers.jsx";

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
      let top = spaceBelow < dropHeight + 8 && spaceAbove > dropHeight + 8
        ? btnRect.top - dropHeight - 4
        : btnRect.bottom + 4;

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
      <button onClick={() => openModal("view", job)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"><Eye size={14} /> View Details</button>
      <button onClick={() => openModal("edit", job)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"><Pencil size={14} /> Edit Job Post</button>
      {job.status === "Pending" && (
        <button onClick={() => openModal("approve", job)} className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-gray-50 w-full"><CircleCheck size={14} /> Approve</button>
      )}
      {(job.status === "Pending" || job.status === "Active") && (
        <button onClick={() => openModal("reject", job)} className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-50 w-full"><CircleX size={14} /> Reject</button>
      )}
      {job.status === "Expired" && (
        <button onClick={() => openModal("renew", job)} className="flex items-center gap-2 px-4 py-2 text-sm text-blue-500 hover:bg-gray-50 w-full"><Clock size={14} /> Renew</button>
      )}
      {job.status === "Closed" && (
        <button onClick={() => openModal("reopen", job)} className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-gray-50 w-full"><CircleCheck size={14} /> Reopen</button>
      )}
      <button onClick={() => openModal("delete", job)} className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-50 w-full"><Trash2 size={14} /> Delete</button>
    </div>
  );
}

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
      <td className="py-3 px-2">
        <p className="text-gray-500 text-sm">{job.posted}</p>
        <p className="text-gray-400 text-xs">{job.postedDate}</p>
      </td>
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

export default function JmTable({
  paginatedJobs, openMenu, setOpenMenu, openModal,
  selectedIds, toggleOne, allChecked, toggleAll,
  currentPage, setCurrentPage, totalPages, filteredCount,
  selectedIdsCount, setBulkAction, setSelectedIds,
}) {
  return (
    <>
      {selectedIdsCount > 0 && (
        <div className="flex items-center gap-3 bg-brand-yellow/10 border border-brand-yellow/30 rounded-xl px-4 py-2">
          <span className="text-sm font-semibold text-brand-yellow">{selectedIdsCount} selected</span>
          <button onClick={() => setBulkAction("approve")} className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full hover:bg-green-200 transition">Approve All</button>
          <button onClick={() => setBulkAction("reject")} className="text-xs bg-red-100 text-red-500 px-3 py-1 rounded-full hover:bg-red-200 transition">Reject All</button>
          <button onClick={() => setBulkAction("delete")} className="text-xs bg-red-100 text-red-500 px-3 py-1 rounded-full hover:bg-red-200 transition">Delete All</button>
          <button onClick={() => setSelectedIds([])} className="text-xs text-gray-400 hover:text-gray-600 ml-auto">Clear</button>
        </div>
      )}

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

      <div className="flex items-center justify-between text-sm text-gray-400 pt-2">
        <span>Showing {paginatedJobs.length} of {filteredCount} Jobs</span>
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
    </>
  );
}