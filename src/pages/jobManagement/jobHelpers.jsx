// jobHelpers.jsx
// Constants, mock data, filter logic, and pagination for Job Management.
// Replace sampleJobs with real API calls when PostgreSQL is ready.

export const ITEMS_PER_PAGE = 7;

export const sampleJobs = [
  { id: "JOB-001", title: "Cashier", employer: "Nitoro Coffee Shop", type: "Full-time", salary: "₱15,000 - ₱18,000", status: "Pending", applicants: 12, posted: "1 day ago", postedDate: "2026-02-22" },
  { id: "JOB-002", title: "Customer Service", employer: "Teleperformance PH", type: "Full-time", salary: "₱18,000 - ₱22,000", status: "Active", applicants: 34, posted: "2 days ago", postedDate: "2026-02-21" },
  { id: "JOB-003", title: "Delivery Rider", employer: "Grab Philippines", type: "Part-time", salary: "₱12,000 - ₱15,000", status: "Active", applicants: 56, posted: "3 days ago", postedDate: "2026-02-20" },
  { id: "JOB-004", title: "Office Staff / Clerk", employer: "Highly Succeed Inc.", type: "Full-time", salary: "₱15,000 - ₱18,000", status: "Pending", applicants: 8, posted: "2 days ago", postedDate: "2026-02-21" },
  { id: "JOB-005", title: "Security Guard", employer: "Securitas PH", type: "Full-time", salary: "₱14,000 - ₱16,000", status: "Closed", applicants: 22, posted: "2 weeks ago", postedDate: "2026-02-09" },
  { id: "JOB-006", title: "Barista", employer: "Starbucks Shaw Blvd", type: "Part-time", salary: "₱10,000 - ₱13,000", status: "Active", applicants: 19, posted: "4 days ago", postedDate: "2026-02-19" },
  { id: "JOB-007", title: "IT Support Specialist", employer: "RCBC Plaza", type: "Full-time", salary: "₱25,000 - ₱35,000", status: "Expired", applicants: 5, posted: "Just now", postedDate: "2026-02-23" },
  { id: "JOB-008", title: "Graphic Designer", employer: "Creative Studio MNL", type: "Full-time", salary: "₱20,000 - ₱28,000", status: "Active", applicants: 14, posted: "5 days ago", postedDate: "2026-02-18" },
  { id: "JOB-009", title: "Nurse", employer: "Makati Medical Center", type: "Full-time", salary: "₱22,000 - ₱30,000", status: "Pending", applicants: 9, posted: "1 week ago", postedDate: "2026-02-16" },
  { id: "JOB-010", title: "Call Center Agent", employer: "Concentrix PH", type: "Full-time", salary: "₱16,000 - ₱20,000", status: "Active", applicants: 41, posted: "3 days ago", postedDate: "2026-02-20" },
  { id: "JOB-011", title: "Electrician", employer: "PowerTech Services", type: "Part-time", salary: "₱13,000 - ₱17,000", status: "Expired", applicants: 3, posted: "2 weeks ago", postedDate: "2026-02-09" },
  { id: "JOB-012", title: "Driver", employer: "LBC Express", type: "Full-time", salary: "₱14,000 - ₱16,000", status: "Closed", applicants: 7, posted: "1 week ago", postedDate: "2026-02-16" },
];

export const SALARY_MAP = {
  "₱10,000 - ₱15,000": [10000, 15000],
  "₱15,000 - ₱20,000": [15000, 20000],
  "₱20,000 - ₱30,000": [20000, 30000],
  "₱30,000+": [30000, Infinity],
};

export const STATUS_OPTIONS = ["Any", "Active", "Pending", "Closed", "Expired"];
export const TYPE_OPTIONS = ["Any", "Full-time", "Part-time"];
export const SALARY_OPTIONS = ["Any", ...Object.keys(SALARY_MAP)];

export function filterJobs(jobs, { activeFilter, jobType, salaryRange, dateFrom, dateTo }) {
  return jobs.filter((job) => {
    if (activeFilter !== "Any" && job.status !== activeFilter) return false;
    if (jobType !== "Any" && job.type !== jobType) return false;

    if (salaryRange !== "Any") {
      const [min, max] = SALARY_MAP[salaryRange] || [0, Infinity];
      const numbers = job.salary.match(/\d+,?\d+/g);
      if (!numbers) return false;
      const jobMin = parseInt(numbers[0].replace(/,/g, ""));
      if (jobMin < min || jobMin >= max) return false;
    }

    if (dateFrom || dateTo) {
      const jobDate = new Date(job.postedDate);
      const from = dateFrom ? new Date(dateFrom) : null;
      const to = dateTo ? new Date(dateTo) : null;
      if (from && jobDate < from) return false;
      if (to && jobDate > to) return false;
    }

    return true;
  });
}

export function paginateJobs(jobs, currentPage, itemsPerPage) {
  return jobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
}

export const statusBadge = (status) => {
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

// ============================================================
// DATABASE INTEGRATION (PostgreSQL - Future Implementation)
// ============================================================
// When ready, replace sampleJobs with these API calls:
//
// export async function fetchJobs(filters) {
//   const params = new URLSearchParams(filters);
//   const res = await fetch(`/api/jobs?${params}`);
//   return res.json();
// }
//
// export async function approveJob(id) {
//   return fetch(`/api/jobs/${id}/approve`, { method: "PATCH" });
// }
//
// export async function rejectJob(id, reason) {
//   return fetch(`/api/jobs/${id}/reject`, {
//     method: "PATCH",
//     body: JSON.stringify({ reason }),
//   });
// }
//
// export async function deleteJob(id) {
//   return fetch(`/api/jobs/${id}`, { method: "DELETE" });
// }
//
// export async function renewJob(id) {
//   return fetch(`/api/jobs/${id}/renew`, { method: "PATCH" });
// }
//
// export async function reopenJob(id) {
//   return fetch(`/api/jobs/${id}/reopen`, { method: "PATCH" });
// }
// ============================================================