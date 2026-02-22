import React, { useState } from "react";
import {
  UsersRound,
  ShieldUser,
  ShieldCheck,
  UserStar,
  UserCog,
  ChevronDown,
  UserPen,
  SquareX,
  CirclePlus,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  Briefcase,
  Eye,
} from "lucide-react";
import StatCard from "../../components/statCard.jsx";
import FilterBar from "../../components/filters/filterBar.jsx";
import FilterItem from "../../components/filters/filterItem.jsx";

// ─── Constants ────────────────────────────────────────────────────────────────
const DROPDOWN_OPTIONS = [
  "Role & Permission Control",
  "Business Registrations Approval",
  "Applicant Oversight",
];

// ── Role & Permission Control data ──
const ROLE_STYLES = {
  "Super Admin": "bg-yellow-400/10 text-yellow-300 border border-yellow-400/20",
  "Moderator":   "bg-green-400/10 text-green-300 border border-green-400/20",
  "Verifier":    "bg-purple-400/10 text-purple-300 border border-purple-400/20",
};

const INITIAL_USERS = [
  { id: 1, name: "Juan dela Cruz", email: "juan@example.com",  role: "Super Admin", status: "Active",   joined: "Jan 10, 2025" },
  { id: 2, name: "Maria Santos",   email: "maria@example.com", role: "Moderator",   status: "Active",   joined: "Feb 3, 2025"  },
  { id: 3, name: "Pedro Reyes",    email: "pedro@example.com", role: "Verifier",    status: "Inactive", joined: "Mar 18, 2025" },
  { id: 4, name: "Ana dela Cruz",  email: "ana@example.com",   role: "Moderator",   status: "Active",   joined: "Apr 2, 2025"  },
  { id: 5, name: "Carlo Mendoza",  email: "carlo@example.com", role: "Verifier",    status: "Active",   joined: "Apr 15, 2025" },
  { id: 6, name: "Liza Ramos",     email: "liza@example.com",  role: "Moderator",   status: "Inactive", joined: "May 1, 2025"  },
];

// ── Business Registrations data ──
const BUSINESS_STATUS_STYLES = {
  "Pending":  "bg-yellow-400/10 text-yellow-300 border border-yellow-400/20",
  "Approved": "bg-green-400/10 text-green-300 border border-green-400/20",
  "Rejected": "bg-red-400/10 text-red-300 border border-red-400/20",
};

const INITIAL_BUSINESSES = [
  { id: 1, business: "Santos Bakery",       owner: "Maria Santos",   type: "Food & Beverage", submitted: "2025-02-01", status: "Pending"  },
  { id: 2, business: "Cruz Tech Solutions", owner: "Juan dela Cruz", type: "IT Services",     submitted: "2025-01-28", status: "Approved" },
  { id: 3, business: "Reyes Pharmacy",      owner: "Pedro Reyes",   type: "Healthcare",      submitted: "2025-02-05", status: "Pending"  },
  { id: 4, business: "Dela Cruz Hardware",  owner: "Ana dela Cruz", type: "Retail",          submitted: "2025-01-20", status: "Rejected" },
  { id: 5, business: "Mendoza Auto Repair", owner: "Carlo Mendoza", type: "Automotive",      submitted: "2025-03-03", status: "Pending"  },
  { id: 6, business: "Ramos Fashion Store", owner: "Liza Ramos",    type: "Retail",          submitted: "2025-03-10", status: "Approved" },
  { id: 7, business: "Torres Catering",     owner: "Nina Torres",   type: "Food & Beverage", submitted: "2025-03-15", status: "Pending"  },
];

// ── Applicant Oversight data ──
const APPLICANT_STATUS_STYLES = {
  "Under Review": "bg-yellow-400/10 text-yellow-300 border border-yellow-400/20",
  "Shortlisted":  "bg-blue-400/10 text-blue-300 border border-blue-400/20",
  "Hired":        "bg-green-400/10 text-green-300 border border-green-400/20",
  "Rejected":     "bg-red-400/10 text-red-300 border border-red-400/20",
};

const INITIAL_APPLICANTS = [
  { id: 1, name: "Carlo Mendoza",    position: "Web Developer",   company: "Cruz Tech Solutions", applied: "2025-02-03", status: "Shortlisted"  },
  { id: 2, name: "Liza Ramos",       position: "Cashier",         company: "Santos Bakery",       applied: "2025-02-06", status: "Under Review" },
  { id: 3, name: "Marco Villanueva", position: "Pharmacist",      company: "Reyes Pharmacy",      applied: "2025-02-07", status: "Hired"        },
  { id: 4, name: "Nina Torres",      position: "Sales Associate", company: "Dela Cruz Hardware",  applied: "2025-01-30", status: "Rejected"     },
  { id: 5, name: "Jose Garcia",      position: "Mechanic",        company: "Mendoza Auto Repair", applied: "2025-03-05", status: "Under Review" },
  { id: 6, name: "Rosa Villanueva",  position: "Store Assistant", company: "Ramos Fashion Store", applied: "2025-03-12", status: "Shortlisted"  },
  { id: 7, name: "Ben Castro",       position: "Delivery Driver", company: "Torres Catering",     applied: "2025-03-17", status: "Hired"        },
];

// ─── Shared input style ───────────────────────────────────────────────────────
const inputClass =
  "w-full h-[42px] px-3 rounded-lg border border-gray-700 bg-white/5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition";

// ─── Helper: format ISO date for display ─────────────────────────────────────
const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });


// ═══════════════════════════════════════════════════════════════════════════════
// ── VIEW 1: Role & Permission Control ──
// ═══════════════════════════════════════════════════════════════════════════════
function RolePermissionView() {
  const [users, setUsers]               = useState(INITIAL_USERS);
  const [showAddModal, setShowAddModal] = useState(false);

  const [filterName,   setFilterName]   = useState("");
  const [filterRole,   setFilterRole]   = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleRemove = (id) => setUsers((prev) => prev.filter((u) => u.id !== id));
  const handleClear  = () => { setFilterName(""); setFilterRole(""); setFilterStatus(""); };

  const filtered = users.filter((u) => {
    const matchName   = u.name.toLowerCase().includes(filterName.toLowerCase());
    const matchRole   = filterRole   ? u.role   === filterRole   : true;
    const matchStatus = filterStatus ? u.status === filterStatus : true;
    return matchName && matchRole && matchStatus;
  });

  const totalUsers  = users.length;
  const superAdmins = users.filter((u) => u.role === "Super Admin").length;
  const moderators  = users.filter((u) => u.role === "Moderator").length;
  const verifiers   = users.filter((u) => u.role === "Verifier").length;

  return (
    <div className="space-y-4">
      <FilterBar onClear={handleClear}>
        <FilterItem label="Search Name">
          <input type="text" placeholder="e.g. Juan dela Cruz" value={filterName}
            onChange={(e) => setFilterName(e.target.value)} className={inputClass} />
        </FilterItem>
        <FilterItem label="Role">
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className={inputClass}>
            <option value="">Any</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="Verifier">Verifier</option>
          </select>
        </FilterItem>
        <FilterItem label="Status">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={inputClass}>
            <option value="">Any</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </FilterItem>
      </FilterBar>

      <div className="bg-brand-dark p-6 pb-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Role & Permission Control</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Users"  value={totalUsers}  icon={UsersRound} />
          <StatCard title="Super Admins" value={superAdmins} icon={ShieldUser}  />
          <StatCard title="Moderators"   value={moderators}  icon={UserStar}   />
          <StatCard title="Verifiers"    value={verifiers}   icon={ShieldCheck} />
        </div>

        <div className="flex justify-end gap-3 mb-5">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 text-xs font-medium transition-colors">
            <UserCog className="w-4 h-4" /> Assign Roles
          </button>
          <button onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-brand-dark text-xs font-bold hover:bg-white/90 transition-colors shadow-sm">
            <CirclePlus className="w-4 h-4" /> Add new user
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Role</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Joined</th>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr key={user.id} className={`border-t border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 1 ? "bg-white/[0.02]" : ""}`}>
                  <td className="px-4 py-3 font-medium text-white">{user.name}</td>
                  <td className="px-4 py-3 text-white/50">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium ${ROLE_STYLES[user.role]}`}>{user.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-1.5 text-xs font-medium w-fit ${user.status === "Active" ? "text-green-400" : "text-white/30"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-green-400" : "bg-white/20"}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/50">{user.joined}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors"><UserPen className="w-4 h-4" /></button>
                      <button onClick={() => handleRemove(user.id)} className="text-red-400 hover:text-red-300 transition-colors"><SquareX className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-white/30 text-sm">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── YOUR CUSTOM ADD USER MODAL GOES HERE ── */}
        {/* showAddModal is true when "Add new user" is clicked.                 */}
        {/*   {showAddModal && (                                                  */}
        {/*     <YourAddUserModal                                                 */}
        {/*       onClose={() => setShowAddModal(false)}                         */}
        {/*       onSubmit={(newUser) => {                                        */}
        {/*         setUsers((prev) => [...prev, { id: Date.now(), ...newUser }]);*/}
        {/*         setShowAddModal(false);                                       */}
        {/*       }}                                                              */}
        {/*     />                                                                */}
        {/*   )}                                                                  */}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// ── VIEW 2: Business Registrations Approval ──
// ═══════════════════════════════════════════════════════════════════════════════
function BusinessRegistrationsView() {
  const [businesses, setBusinesses]             = useState(INITIAL_BUSINESSES);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  // ── Filter state ── matching screenshot: Range Date + Status
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo,   setFilterDateTo]   = useState("");
  const [filterStatus,   setFilterStatus]   = useState("");

  const handleApprove = (id) => setBusinesses((prev) => prev.map((b) => b.id === id ? { ...b, status: "Approved" } : b));
  const handleReject  = (id) => setBusinesses((prev) => prev.map((b) => b.id === id ? { ...b, status: "Rejected" } : b));
  const handleClear   = () => { setFilterDateFrom(""); setFilterDateTo(""); setFilterStatus(""); };

  const filtered = businesses.filter((b) => {
    const date        = new Date(b.submitted);
    const matchFrom   = filterDateFrom ? date >= new Date(filterDateFrom) : true;
    const matchTo     = filterDateTo   ? date <= new Date(filterDateTo)   : true;
    const matchStatus = filterStatus   ? b.status === filterStatus        : true;
    return matchFrom && matchTo && matchStatus;
  });

  const total    = businesses.length;
  const pending  = businesses.filter((b) => b.status === "Pending").length;
  const approved = businesses.filter((b) => b.status === "Approved").length;
  const rejected = businesses.filter((b) => b.status === "Rejected").length;

  return (
    <div className="space-y-4">
      {/* ── Filter Bar — Range Date + Status (matches screenshot) ── */}
      <FilterBar onClear={handleClear}>
        <FilterItem label="Range Date">
          <div className="flex items-center gap-2 h-[42px]">
            <input type="date" value={filterDateFrom} onChange={(e) => setFilterDateFrom(e.target.value)} className={inputClass} />
            <span className="text-white/50 text-sm font-medium shrink-0">To</span>
            <input type="date" value={filterDateTo}   onChange={(e) => setFilterDateTo(e.target.value)}   className={inputClass} />
          </div>
        </FilterItem>
        <FilterItem label="Status">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={inputClass}>
            <option value="">Any</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </FilterItem>
      </FilterBar>

      <div className="bg-brand-dark p-6 pb-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Business Registrations Approval</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total"    value={total}    icon={Building2}   />
          <StatCard title="Pending"  value={pending}  icon={Clock}       />
          <StatCard title="Approved" value={approved} icon={CheckCircle} />
          <StatCard title="Rejected" value={rejected} icon={XCircle}     />
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-medium">Business</th>
                <th className="text-left px-4 py-3 font-medium">Owner</th>
                <th className="text-left px-4 py-3 font-medium">Type</th>
                <th className="text-left px-4 py-3 font-medium">Submitted</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, i) => (
                <tr key={b.id} className={`border-t border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 1 ? "bg-white/[0.02]" : ""}`}>
                  <td className="px-4 py-3 font-medium text-white">{b.business}</td>
                  <td className="px-4 py-3 text-white/50">{b.owner}</td>
                  <td className="px-4 py-3 text-white/50">{b.type}</td>
                  <td className="px-4 py-3 text-white/50">{fmtDate(b.submitted)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium ${BUSINESS_STATUS_STYLES[b.status]}`}>{b.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setSelectedBusiness(b)} className="text-blue-400 hover:text-blue-300 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleApprove(b.id)} disabled={b.status !== "Pending"} className="text-green-400 hover:text-green-300 disabled:opacity-25 disabled:cursor-not-allowed transition-colors">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleReject(b.id)} disabled={b.status !== "Pending"} className="text-red-400 hover:text-red-300 disabled:opacity-25 disabled:cursor-not-allowed transition-colors">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-white/30 text-sm">No businesses found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── YOUR CUSTOM BUSINESS VIEW MODAL GOES HERE ── */}
        {/* selectedBusiness is set when the Eye icon is clicked.               */}
        {/*   {selectedBusiness && (                                             */}
        {/*     <YourBusinessViewModal                                           */}
        {/*       business={selectedBusiness}                                   */}
        {/*       onClose={() => setSelectedBusiness(null)}                     */}
        {/*     />                                                               */}
        {/*   )}                                                                 */}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// ── VIEW 3: Applicant Oversight ──
// ═══════════════════════════════════════════════════════════════════════════════
function ApplicantOversightView() {
  const [applicants]                              = useState(INITIAL_APPLICANTS);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // ── Filter state ── Range Date + Status (same pattern as Business view)
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo,   setFilterDateTo]   = useState("");
  const [filterStatus,   setFilterStatus]   = useState("");

  const handleClear = () => { setFilterDateFrom(""); setFilterDateTo(""); setFilterStatus(""); };

  const filtered = applicants.filter((a) => {
    const date        = new Date(a.applied);
    const matchFrom   = filterDateFrom ? date >= new Date(filterDateFrom) : true;
    const matchTo     = filterDateTo   ? date <= new Date(filterDateTo)   : true;
    const matchStatus = filterStatus   ? a.status === filterStatus        : true;
    return matchFrom && matchTo && matchStatus;
  });

  const total       = applicants.length;
  const underReview = applicants.filter((a) => a.status === "Under Review").length;
  const shortlisted = applicants.filter((a) => a.status === "Shortlisted").length;
  const hired       = applicants.filter((a) => a.status === "Hired").length;

  return (
    <div className="space-y-4">
      {/* ── Filter Bar — Range Date + Status ── */}
      <FilterBar onClear={handleClear}>
        <FilterItem label="Range Date">
          <div className="flex items-center gap-2 h-[42px]">
            <input type="date" value={filterDateFrom} onChange={(e) => setFilterDateFrom(e.target.value)} className={inputClass} />
            <span className="text-white/50 text-sm font-medium shrink-0">To</span>
            <input type="date" value={filterDateTo}   onChange={(e) => setFilterDateTo(e.target.value)}   className={inputClass} />
          </div>
        </FilterItem>
        <FilterItem label="Status">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={inputClass}>
            <option value="">Any</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
        </FilterItem>
      </FilterBar>

      <div className="bg-brand-dark p-6 pb-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Applicant Oversight</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Applicants" value={total}       icon={UsersRound} />
          <StatCard title="Under Review"     value={underReview} icon={Eye}        />
          <StatCard title="Shortlisted"      value={shortlisted} icon={Briefcase}  />
          <StatCard title="Hired"            value={hired}       icon={CheckCircle}/>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-medium">Applicant</th>
                <th className="text-left px-4 py-3 font-medium">Position</th>
                <th className="text-left px-4 py-3 font-medium">Company</th>
                <th className="text-left px-4 py-3 font-medium">Applied</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={a.id} className={`border-t border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 1 ? "bg-white/[0.02]" : ""}`}>
                  <td className="px-4 py-3 font-medium text-white">{a.name}</td>
                  <td className="px-4 py-3 text-white/50">{a.position}</td>
                  <td className="px-4 py-3 text-white/50">{a.company}</td>
                  <td className="px-4 py-3 text-white/50">{fmtDate(a.applied)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium ${APPLICANT_STATUS_STYLES[a.status]}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelectedApplicant(a)} className="text-blue-400 hover:text-blue-300 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-white/30 text-sm">No applicants found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── YOUR CUSTOM APPLICANT VIEW MODAL GOES HERE ── */}
        {/* selectedApplicant is set when the Eye icon is clicked.              */}
        {/*   {selectedApplicant && (                                            */}
        {/*     <YourApplicantViewModal                                          */}
        {/*       applicant={selectedApplicant}                                  */}
        {/*       onClose={() => setSelectedApplicant(null)}                    */}
        {/*     />                                                               */}
        {/*   )}                                                                 */}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// ── MAIN EXPORT ──
// ═══════════════════════════════════════════════════════════════════════════════
export default function UserManagement() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("Role & Permission Control");

  const renderView = () => {
    switch (selectedView) {
      case "Role & Permission Control":       return <RolePermissionView />;
      case "Business Registrations Approval": return <BusinessRegistrationsView />;
      case "Applicant Oversight":             return <ApplicantOversightView />;
      default:                                return null;
    }
  };

  return (
    <div className="space-y-4">

      {/* ── Top Card: Title + Dropdown ── */}
      <div className="bg-brand-dark p-6 pb-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">User Management</h1>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 text-sm font-medium transition-colors"
          >
            <span>{selectedView}</span>
            <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-brand-dark border border-white/10 rounded-xl shadow-xl z-20 overflow-hidden">
              {DROPDOWN_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setSelectedView(opt); setDropdownOpen(false); }}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-white/10 ${
                    selectedView === opt ? "text-white font-semibold bg-white/10" : "text-white/60"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Dynamic View ── */}
      {renderView()}

    </div>
  );
}