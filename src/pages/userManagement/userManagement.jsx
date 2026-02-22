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
];

// ── Business Registrations data ──
const BUSINESS_STATUS_STYLES = {
  "Pending":  "bg-yellow-400/10 text-yellow-300 border border-yellow-400/20",
  "Approved": "bg-green-400/10 text-green-300 border border-green-400/20",
  "Rejected": "bg-red-400/10 text-red-300 border border-red-400/20",
};

const INITIAL_BUSINESSES = [
  { id: 1, business: "Santos Bakery",       owner: "Maria Santos",   type: "Food & Beverage", submitted: "Feb 1, 2025",  status: "Pending"  },
  { id: 2, business: "Cruz Tech Solutions", owner: "Juan dela Cruz",  type: "IT Services",     submitted: "Jan 28, 2025", status: "Approved" },
  { id: 3, business: "Reyes Pharmacy",      owner: "Pedro Reyes",    type: "Healthcare",      submitted: "Feb 5, 2025",  status: "Pending"  },
  { id: 4, business: "Dela Cruz Hardware",  owner: "Ana dela Cruz",  type: "Retail",          submitted: "Jan 20, 2025", status: "Rejected" },
];

// ── Applicant Oversight data ──
const APPLICANT_STATUS_STYLES = {
  "Under Review": "bg-yellow-400/10 text-yellow-300 border border-yellow-400/20",
  "Shortlisted":  "bg-blue-400/10 text-blue-300 border border-blue-400/20",
  "Hired":        "bg-green-400/10 text-green-300 border border-green-400/20",
  "Rejected":     "bg-red-400/10 text-red-300 border border-red-400/20",
};

const INITIAL_APPLICANTS = [
  { id: 1, name: "Carlo Mendoza",  position: "Web Developer",    company: "Cruz Tech Solutions", applied: "Feb 3, 2025",  status: "Shortlisted"  },
  { id: 2, name: "Liza Ramos",     position: "Cashier",          company: "Santos Bakery",       applied: "Feb 6, 2025",  status: "Under Review" },
  { id: 3, name: "Marco Villanueva", position: "Pharmacist",     company: "Reyes Pharmacy",      applied: "Feb 7, 2025",  status: "Hired"        },
  { id: 4, name: "Nina Torres",    position: "Sales Associate",  company: "Dela Cruz Hardware",  applied: "Jan 30, 2025", status: "Rejected"     },
];


// ═══════════════════════════════════════════════════════════════════════════════
// ── VIEW 1: Role & Permission Control ──
// ═══════════════════════════════════════════════════════════════════════════════
function RolePermissionView() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [showAddModal, setShowAddModal] = useState(false); // reserved for your modal

  const handleRemove = (id) => setUsers((prev) => prev.filter((u) => u.id !== id));

  const totalUsers  = users.length;
  const superAdmins = users.filter((u) => u.role === "Super Admin").length;
  const moderators  = users.filter((u) => u.role === "Moderator").length;
  const verifiers   = users.filter((u) => u.role === "Verifier").length;

  return (
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
          <UserCog className="w-4 h-4" />
          Assign Roles
        </button>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-brand-dark text-xs font-bold hover:bg-white/90 transition-colors shadow-sm"
        >
          <CirclePlus className="w-4 h-4" />
          Add new user
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
            {users.map((user, i) => (
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
            {users.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-white/30 text-sm">No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── YOUR CUSTOM ADD USER MODAL GOES HERE ── */}
      {/* showAddModal is true when "Add new user" is clicked.                 */}
      {/*                                                                      */}
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
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// ── VIEW 2: Business Registrations Approval ──
// ═══════════════════════════════════════════════════════════════════════════════
function BusinessRegistrationsView() {
  const [businesses, setBusinesses] = useState(INITIAL_BUSINESSES);

  const handleApprove = (id) => setBusinesses((prev) => prev.map((b) => b.id === id ? { ...b, status: "Approved" } : b));
  const handleReject  = (id) => setBusinesses((prev) => prev.map((b) => b.id === id ? { ...b, status: "Rejected" } : b));

  const total    = businesses.length;
  const pending  = businesses.filter((b) => b.status === "Pending").length;
  const approved = businesses.filter((b) => b.status === "Approved").length;
  const rejected = businesses.filter((b) => b.status === "Rejected").length;

  return (
    <div className="bg-brand-dark p-6 pb-8 rounded-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Business Registrations Approval</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total"    value={total}    icon={Building2}     />
        <StatCard title="Pending"  value={pending}  icon={Clock}         />
        <StatCard title="Approved" value={approved} icon={CheckCircle}   />
        <StatCard title="Rejected" value={rejected} icon={XCircle}       />
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
            {businesses.map((b, i) => (
              <tr key={b.id} className={`border-t border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 1 ? "bg-white/[0.02]" : ""}`}>
                <td className="px-4 py-3 font-medium text-white">{b.business}</td>
                <td className="px-4 py-3 text-white/50">{b.owner}</td>
                <td className="px-4 py-3 text-white/50">{b.type}</td>
                <td className="px-4 py-3 text-white/50">{b.submitted}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium ${BUSINESS_STATUS_STYLES[b.status]}`}>{b.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
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
          </tbody>
        </table>
      </div>

      {/* ── YOUR CUSTOM BUSINESS MODAL GOES HERE ── */}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// ── VIEW 3: Applicant Oversight ──
// ═══════════════════════════════════════════════════════════════════════════════
function ApplicantOversightView() {
  const [applicants] = useState(INITIAL_APPLICANTS);

  const total       = applicants.length;
  const underReview = applicants.filter((a) => a.status === "Under Review").length;
  const shortlisted = applicants.filter((a) => a.status === "Shortlisted").length;
  const hired       = applicants.filter((a) => a.status === "Hired").length;

  return (
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
            {applicants.map((a, i) => (
              <tr key={a.id} className={`border-t border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 1 ? "bg-white/[0.02]" : ""}`}>
                <td className="px-4 py-3 font-medium text-white">{a.name}</td>
                <td className="px-4 py-3 text-white/50">{a.position}</td>
                <td className="px-4 py-3 text-white/50">{a.company}</td>
                <td className="px-4 py-3 text-white/50">{a.applied}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium ${APPLICANT_STATUS_STYLES[a.status]}`}>{a.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-400 hover:text-blue-300 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── YOUR CUSTOM APPLICANT MODAL GOES HERE ── */}
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
      case "Role & Permission Control":      return <RolePermissionView />;
      case "Business Registrations Approval": return <BusinessRegistrationsView />;
      case "Applicant Oversight":            return <ApplicantOversightView />;
      default:                               return null;
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