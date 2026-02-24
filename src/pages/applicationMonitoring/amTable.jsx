import React, { useRef, useEffect, useState } from "react";
import { MoreHorizontal, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { statusBadge } from "./applicationHelpers.jsx";

function DropdownMenu({ application, openModal, triggerRef }) {
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
      className="bg-white border border-gray-200 rounded-xl shadow-xl w-48 py-1 transition-opacity duration-100"
      onClick={(e) => e.stopPropagation()}
    >
      <button 
        onClick={() => openModal("view", application)} 
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
      >
        <Eye size={14} /> View Application Details
      </button>
    </div>
  );
}

function TableRow({ application, openMenu, setOpenMenu, openModal }) {
  const triggerRef = useRef(null);

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-3 px-2 font-medium text-gray-800">{application.id}</td>
      <td className="py-3 px-2 text-gray-700">{application.applicant}</td>
      <td className="py-3 px-2 text-gray-700">{application.jobTitle}</td>
      <td className="py-3 px-2 text-gray-600">{application.employer}</td>
      <td className="py-3 px-2">{statusBadge(application.status)}</td>
      <td className="py-3 px-2 text-gray-600">{application.responseTime}</td>
      <td className="py-3 px-2 text-gray-500 text-xs">{application.lastActivity}</td>
      <td className="py-3 px-2">
        <button
          ref={triggerRef}
          onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === application.id ? null : application.id); }}
        >
          <MoreHorizontal size={18} className="text-gray-400" />
        </button>
        {openMenu === application.id && (
          <DropdownMenu application={application} openModal={openModal} triggerRef={triggerRef} />
        )}
      </td>
    </tr>
  );
}

export default function AmTable({
  paginatedApplications, openMenu, setOpenMenu, openModal,
  currentPage, setCurrentPage, totalPages, filteredCount,
}) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500">
              <th className="py-3 px-2">App ID</th>
              <th className="py-3 px-2">Applicant</th>
              <th className="py-3 px-2">Job Title</th>
              <th className="py-3 px-2">Employer</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Response Time</th>
              <th className="py-3 px-2">Last Activity</th>
              <th className="py-3 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedApplications.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-16 text-gray-400">No applications found.</td></tr>
            ) : (
              paginatedApplications.map((application) => (
                <TableRow
                  key={application.id}
                  application={application}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                  openModal={openModal}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400 pt-2">
        <span>Showing {paginatedApplications.length} of {filteredCount} Applications</span>
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

      <p className="text-xs text-gray-400 mt-2">
        Applications with no employer response for 7+ days are automatically flagged as Inactive.
      </p>
    </>
  );
}