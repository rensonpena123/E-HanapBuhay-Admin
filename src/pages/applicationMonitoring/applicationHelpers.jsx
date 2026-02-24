export const ITEMS_PER_PAGE = 7;

export const sampleApplications = [
  { id: "APP-001", applicant: "Juan Dela Cruz", jobTitle: "Cashier", employer: "Nitoro Coffee Shop", status: "Pending", responseTime: "—", lastActivity: "12 days ago", appliedDate: "2026-02-01", responseTimeHours: null },
  { id: "APP-002", applicant: "Maria Santos", jobTitle: "Customer Service", employer: "Teleperformance PH", status: "Reviewed", responseTime: "1 day", lastActivity: "2 days ago", appliedDate: "2026-02-10", responseTimeHours: 24 },
  { id: "APP-003", applicant: "Carlos Reyes", jobTitle: "Delivery Rider", employer: "Grab Philippines", status: "Shortlisted", responseTime: "3 hrs", lastActivity: "5 days ago", appliedDate: "2026-02-08", responseTimeHours: 3 },
  { id: "APP-004", applicant: "Ana Bautista", jobTitle: "Office Staff / Clerk", employer: "Highly Succeed Inc.", status: "Pending", responseTime: "—", lastActivity: "6 days ago", appliedDate: "2026-02-07", responseTimeHours: null },
  { id: "APP-005", applicant: "Pedro Lim", jobTitle: "Security Guard", employer: "Securitas PH", status: "Rejected", responseTime: "2 days", lastActivity: "2 weeks ago", appliedDate: "2026-01-30", responseTimeHours: 48 },
  { id: "APP-006", applicant: "Grace Villanueva", jobTitle: "Barista", employer: "Starbucks Shaw Blvd", status: "Reviewed", responseTime: "12 hrs", lastActivity: "3 days ago", appliedDate: "2026-02-09", responseTimeHours: 12 },
  { id: "APP-007", applicant: "Roberto Aquino", jobTitle: "IT Support Specialist", employer: "RCBC Plaza", status: "Pending", responseTime: "—", lastActivity: "1 day ago", appliedDate: "2026-02-12", responseTimeHours: null },
  { id: "APP-008", applicant: "Lisa Tan", jobTitle: "Graphic Designer", employer: "Creative Studio MNL", status: "Shortlisted", responseTime: "5 hrs", lastActivity: "4 days ago", appliedDate: "2026-02-06", responseTimeHours: 5 },
  { id: "APP-009", applicant: "Miguel Torres", jobTitle: "Nurse", employer: "Makati Medical Center", status: "Reviewed", responseTime: "1 day", lastActivity: "1 week ago", appliedDate: "2026-02-05", responseTimeHours: 24 },
  { id: "APP-010", applicant: "Sofia Garcia", jobTitle: "Call Center Agent", employer: "Concentrix PH", status: "Inactive", responseTime: "—", lastActivity: "3 weeks ago", appliedDate: "2026-01-25", responseTimeHours: null },
  { id: "APP-011", applicant: "Ramon Cruz", jobTitle: "Electrician", employer: "PowerTech Services", status: "Rejected", responseTime: "3 days", lastActivity: "1 month ago", appliedDate: "2026-01-20", responseTimeHours: 72 },
  { id: "APP-012", applicant: "Elena Rodriguez", jobTitle: "Driver", employer: "LBC Express", status: "Pending", responseTime: "—", lastActivity: "8 hours ago", appliedDate: "2026-02-13", responseTimeHours: null },
];

export const STATUS_OPTIONS = ["All", "Reviewed", "Pending", "Shortlisted", "Rejected", "Inactive"];
export const RESPONSE_TIME_OPTIONS = ["Any", "Within 24hrs", "1-3 days", "More than 3 days"];

export const statusBadge = (status) => {
  const styles = {
    Reviewed: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Shortlisted: "bg-blue-100 text-blue-600",
    Rejected: "bg-red-100 text-red-500",
    Inactive: "bg-gray-100 text-gray-500",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-500"}`}>
      {status}
    </span>
  );
};

export function filterApplications(apps, { statusFilter, responseTime, dateFrom, dateTo }) {
  return apps.filter((app) => {
    if (statusFilter !== "All" && app.status !== statusFilter) return false;
    
    if (responseTime !== "Any") {
      const hours = app.responseTimeHours;
      if (hours === null) return false;
      if (responseTime === "Within 24hrs" && hours > 24) return false;
      if (responseTime === "1-3 days" && (hours < 24 || hours > 72)) return false;
      if (responseTime === "More than 3 days" && hours <= 72) return false;
    }
    
    if (dateFrom || dateTo) {
      const appDate = new Date(app.appliedDate);
      const from = dateFrom ? new Date(dateFrom) : null;
      const to = dateTo ? new Date(dateTo) : null;
      if (from && appDate < from) return false;
      if (to && appDate > to) return false;
    }
    
    return true;
  });
}

export function paginateApplications(apps, currentPage, itemsPerPage) {
  return apps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
}