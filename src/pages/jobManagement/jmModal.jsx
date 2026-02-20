import React from "react";
import { Eye, Pencil, CircleCheck, CircleX, Trash2, Clock } from "lucide-react";

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

export default function JmModal({ modalType, selectedJob, bulkAction, selectedIds, closeModal, setSelectedIds }) {
  if (!((modalType && selectedJob) || bulkAction)) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeModal}>
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>

        {/* View Details */}
        {modalType === "view" && selectedJob && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-brand-dark/10 p-3 rounded-xl"><Eye size={20} className="text-brand-dark" /></div>
              <h2 className="text-xl font-bold text-brand-dark">Job Details</h2>
              <div className="ml-auto">{statusBadge(selectedJob.status)}</div>
            </div>
            <div className="space-y-3 text-sm">
              {[
                ["Job ID", selectedJob.id],
                ["Title", selectedJob.title],
                ["Employer", selectedJob.employer],
                ["Type", selectedJob.type],
                ["Salary", selectedJob.salary],
                ["Applicants", selectedJob.applicants],
                ["Posted", selectedJob.posted],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-semibold text-gray-600">{k}</span>
                  <span className="text-gray-800">{v}</span>
                </div>
              ))}
            </div>
            <button onClick={closeModal} className="mt-6 w-full bg-brand-dark text-white py-2 rounded-full hover:opacity-90 transition">
              Close
            </button>
          </>
        )}

        {/* Edit */}
        {modalType === "edit" && selectedJob && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-50 p-3 rounded-xl"><Pencil size={20} className="text-blue-500" /></div>
              <h2 className="text-xl font-bold text-brand-dark">Edit Job Post</h2>
            </div>
            <div className="space-y-3">
              {[["Job Title", selectedJob.title], ["Employer", selectedJob.employer], ["Salary Range", selectedJob.salary]].map(([ph, val]) => (
                <div key={ph}>
                  <label className="text-xs text-gray-500 mb-1 block">{ph}</label>
                  <input defaultValue={val} className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-brand-yellow" />
                </div>
              ))}
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Type</label>
                <select defaultValue={selectedJob.type} className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-brand-yellow">
                  <option>Full-time</option>
                  <option>Part-time</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={closeModal} className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-full text-sm hover:bg-gray-50">Cancel</button>
              <button onClick={closeModal} className="flex-1 bg-brand-dark text-white py-2 rounded-full text-sm hover:opacity-90">Save Changes</button>
            </div>
          </>
        )}

        {/* Approve - Pending only */}
        {modalType === "approve" && selectedJob && (
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-4 rounded-full mb-4"><CircleCheck size={32} className="text-green-600" /></div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Approve Job Post</h2>
            <p className="text-xs text-gray-400 mb-1">Status: <span className="font-semibold text-yellow-500">Pending → Active</span></p>
            <p className="text-sm text-gray-500 mb-6">Approving <span className="font-semibold text-gray-700">"{selectedJob.title}"</span> will make it visible to job seekers.</p>
            <div className="flex gap-2 w-full">
              <button onClick={closeModal} className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-full text-sm">Cancel</button>
              <button onClick={closeModal} className="flex-1 bg-green-500 text-white py-2 rounded-full text-sm hover:bg-green-600">Approve</button>
            </div>
          </div>
        )}

        {/* Reject - Pending or Active */}
        {modalType === "reject" && selectedJob && (
          <div className="flex flex-col items-center text-center">
            <div className="bg-red-100 p-4 rounded-full mb-4"><CircleX size={32} className="text-red-500" /></div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Reject Job Post</h2>
            <p className="text-xs text-gray-400 mb-1">Status: <span className="font-semibold text-red-400">{selectedJob.status} → Closed</span></p>
            <p className="text-sm text-gray-500 mb-3">This will close <span className="font-semibold text-gray-700">"{selectedJob.title}"</span> and notify the employer.</p>
            <textarea className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-red-400 resize-none mb-4 text-left" rows={3} placeholder="Reason for rejection (optional)" />
            <div className="flex gap-2 w-full">
              <button onClick={closeModal} className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-full text-sm">Cancel</button>
              <button onClick={closeModal} className="flex-1 bg-red-500 text-white py-2 rounded-full text-sm hover:bg-red-600">Reject</button>
            </div>
          </div>
        )}

        {/* Renew - Expired only */}
        {modalType === "renew" && selectedJob && (
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4"><Clock size={32} className="text-blue-500" /></div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Renew Job Post</h2>
            <p className="text-xs text-gray-400 mb-1">Status: <span className="font-semibold text-blue-400">Expired → Active</span></p>
            <p className="text-sm text-gray-500 mb-6">Renewing <span className="font-semibold text-gray-700">"{selectedJob.title}"</span> will reactivate the listing for another 30 days.</p>
            <div className="flex gap-2 w-full">
              <button onClick={closeModal} className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-full text-sm">Cancel</button>
              <button onClick={closeModal} className="flex-1 bg-blue-500 text-white py-2 rounded-full text-sm hover:bg-blue-600">Renew</button>
            </div>
          </div>
        )}

        {/* Reopen - Closed only */}
        {modalType === "reopen" && selectedJob && (
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-4 rounded-full mb-4"><CircleCheck size={32} className="text-green-600" /></div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Reopen Job Post</h2>
            <p className="text-xs text-gray-400 mb-1">Status: <span className="font-semibold text-green-500">Closed → Active</span></p>
            <p className="text-sm text-gray-500 mb-6">Reopening <span className="font-semibold text-gray-700">"{selectedJob.title}"</span> will make it visible to job seekers again.</p>
            <div className="flex gap-2 w-full">
              <button onClick={closeModal} className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-full text-sm">Cancel</button>
              <button onClick={closeModal} className="flex-1 bg-green-500 text-white py-2 rounded-full text-sm hover:bg-green-600">Reopen</button>
            </div>
          </div>
        )}

        {/* Delete */}
        {modalType === "delete" && selectedJob && (
          <div className="flex flex-col items-center text-center">
            <div className="bg-red-100 p-4 rounded-full mb-4"><Trash2 size={32} className="text-red-500" /></div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Delete Job Post</h2>
            <p className="text-sm text-gray-500 mb-6">Permanently delete <span className="font-semibold text-gray-700">"{selectedJob.title}"</span>? This cannot be undone.</p>
            <div className="flex gap-2 w-full">
              <button onClick={closeModal} className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-full text-sm">Cancel</button>
              <button onClick={closeModal} className="flex-1 bg-red-500 text-white py-2 rounded-full text-sm hover:bg-red-600">Delete</button>
            </div>
          </div>
        )}

        {/* Bulk Approve */}
        {bulkAction === "approve" && (
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-4 rounded-full mb-4"><CircleCheck size={32} className="text-green-600" /></div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Approve {selectedIds.length} Jobs</h2>
            <p className="text-sm text-gray-500 mb-6">All selected job posts will be approved and made visible to job seekers.</p>
            <div className="flex gap-2 w-full">
              <button onClick={closeModal} className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-full text-sm">Cancel</button>
              <button onClick={() => { setSelectedIds([]); closeModal(); }} className="flex-1 bg-green-500 text-white py-2 rounded-full text-sm hover:bg-green-600">Approve All</button>
            </div>
          </div>
        )}

        {/* Bulk Reject */}
        {bulkAction === "reject" && (
          <div className="flex flex-col items-center text-center">
            <div className="bg-red-100 p-4 rounded-full mb-4"><CircleX size={32} className="text-red-500" /></div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Reject {selectedIds.length} Jobs</h2>
            <p className="text-sm text-gray-500 mb-3">All selected job posts will be rejected and closed.</p>
            <textarea className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none resize-none mb-4 text-left" rows={3} placeholder="Reason for rejection (optional)" />
            <div className="flex gap-2 w-full">
              <button onClick={closeModal} className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-full text-sm">Cancel</button>
              <button onClick={() => { setSelectedIds([]); closeModal(); }} className="flex-1 bg-red-500 text-white py-2 rounded-full text-sm hover:bg-red-600">Reject All</button>
            </div>
          </div>
        )}

        {/* Bulk Delete */}
        {bulkAction === "delete" && (
          <div className="flex flex-col items-center text-center">
            <div className="bg-red-100 p-4 rounded-full mb-4"><Trash2 size={32} className="text-red-500" /></div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Delete {selectedIds.length} Jobs</h2>
            <p className="text-sm text-gray-500 mb-6">Permanently delete all selected job posts? This cannot be undone.</p>
            <div className="flex gap-2 w-full">
              <button onClick={closeModal} className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-full text-sm">Cancel</button>
              <button onClick={() => { setSelectedIds([]); closeModal(); }} className="flex-1 bg-red-500 text-white py-2 rounded-full text-sm hover:bg-red-600">Delete All</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}