import React from "react";
import { Eye } from "lucide-react";
import { statusBadge } from "./applicationHelpers.jsx";

export default function AmModal({ modalType, selectedApplication, closeModal }) {
  if (!(modalType && selectedApplication)) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeModal}>
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        
        {modalType === "view" && selectedApplication && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-brand-dark/10 p-3 rounded-xl"><Eye size={20} className="text-brand-dark" /></div>
              <h2 className="text-xl font-bold text-brand-dark">Application Details</h2>
              <div className="ml-auto">{statusBadge(selectedApplication.status)}</div>
            </div>
            
            <div className="space-y-3 text-sm">
              {[
                ["Application ID", selectedApplication.id],
                ["Applicant Name", selectedApplication.applicant],
                ["Job Title", selectedApplication.jobTitle],
                ["Employer", selectedApplication.employer],
                ["Status", selectedApplication.status],
                ["Response Time", selectedApplication.responseTime],
                ["Last Activity", selectedApplication.lastActivity],
                ["Applied Date", selectedApplication.appliedDate || "N/A"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-semibold text-gray-600">{k}</span>
                  <span className="text-gray-800">{v}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mt-4">
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Note:</span> Application status is managed by the employer. 
                Contact employer directly for updates.
              </p>
            </div>
            
            <button onClick={closeModal} className="mt-6 w-full bg-brand-dark text-white py-2 rounded-full hover:opacity-90 transition">
              Close
            </button>
          </>
        )}

      </div>
    </div>
  );
}