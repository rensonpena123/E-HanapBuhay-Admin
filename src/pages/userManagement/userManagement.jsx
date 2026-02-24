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
  X,
  Check
} from "lucide-react";
import StatCard from "../../components/statCard.jsx";
import FilterBar from "../../components/filters/filterBar.jsx";
import FilterItem from "../../components/filters/filterItem.jsx";

// --- Constants ---
const ROLE_STYLES = {
  "Super Admin": "bg-yellow-400/10 text-yellow-300 border border-yellow-400/20",
  "Moderator":   "bg-green-400/10 text-green-300 border border-green-400/20",
  "Verifier":    "bg-purple-400/10 text-purple-300 border border-purple-400/20",
};

const INITIAL_USERS = [
  { id: 1, name: "Juan dela Cruz", email: "juan@example.com",   role: "Super Admin", status: "Active",   joined: "Jan 10, 2025" },
  { id: 2, name: "Maria Santos",   email: "maria@example.com", role: "Moderator",   status: "Active",   joined: "Feb 3, 2025"  },
  { id: 3, name: "Pedro Reyes",    email: "pedro@example.com", role: "Verifier",    status: "Inactive", joined: "Mar 18, 2025" },
  { id: 4, name: "Ana dela Cruz",  email: "ana@example.com",   role: "Moderator",   status: "Active",   joined: "Apr 2, 2025"  },
  { id: 5, name: "Carlo Mendoza",  email: "carlo@example.com", role: "Verifier",    status: "Active",   joined: "Apr 15, 2025" },
  { id: 6, name: "Liza Ramos",     email: "liza@example.com",  role: "Moderator",   status: "Inactive", joined: "May 1, 2025"  },
];

// BACK TO ORIGINAL: Using white/5 for that transparent look
const inputClass = "w-full h-[42px] px-3 rounded-lg border border-gray-700 bg-white/5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/40 transition";

// FIX: Forcing white background and black text for the actual dropdown list
const optionClass = "bg-white text-black";

function RolePermissionView() {
  const [users, setUsers] = useState(INITIAL_USERS);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Moderator" });
  const [assignment, setAssignment] = useState({ userId: "", newRole: "Moderator" });

  const [filterName, setFilterName] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    const userEntry = {
      ...newUser,
      id: Date.now(),
      status: "Active",
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setUsers([userEntry, ...users]);
    setShowAddModal(false);
    setNewUser({ name: "", email: "", role: "Moderator" });
  };

  const handleUpdateRole = () => {
    if (!assignment.userId) return;
    setUsers(users.map(u => 
      u.id === parseInt(assignment.userId) ? { ...u, role: assignment.newRole } : u
    ));
    setShowAssignModal(false);
  };

  const handleRemove = (id) => setUsers((prev) => prev.filter((u) => u.id !== id));
  const handleClear = () => { setFilterName(""); setFilterRole(""); setFilterStatus(""); };

  const filtered = users.filter((u) => {
    const matchName = u.name.toLowerCase().includes(filterName.toLowerCase());
    const matchRole = filterRole ? u.role === filterRole : true;
    const matchStatus = filterStatus ? u.status === filterStatus : true;
    return matchName && matchRole && matchStatus;
  });

  return (
    <div className="space-y-4">
      
      {/* --- ADD NEW USER MODAL --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#1e293b] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Register New User</h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/40 hover:text-white"><X size={20}/></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/50 uppercase font-bold mb-1 block">Full Name</label>
                <input type="text" className={inputClass} placeholder="Enter name" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
              </div>
              <div>
                <label className="text-xs text-white/50 uppercase font-bold mb-1 block">Email Address</label>
                <input type="email" className={inputClass} placeholder="email@example.com" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
              </div>
              <div>
                <label className="text-xs text-white/50 uppercase font-bold mb-1 block">Initial Role</label>
                <select className={inputClass} value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
                  <option className={optionClass} value="Super Admin">Super Admin</option>
                  <option className={optionClass} value="Moderator">Moderator</option>
                  <option className={optionClass} value="Verifier">Verifier</option>
                </select>
              </div>
              <button onClick={handleAddUser} className="w-full bg-white text-[#1e293b] font-bold py-3 rounded-xl mt-4 hover:bg-gray-200 transition-colors">Confirm Registration</button>
            </div>
          </div>
        </div>
      )}

      {/* --- ASSIGN ROLES MODAL --- */}
      {showAssignModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#1e293b] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Update User Permissions</h3>
              <button onClick={() => setShowAssignModal(false)} className="text-white/40 hover:text-white"><X size={20}/></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/50 uppercase font-bold mb-1 block">Select User</label>
                <select className={inputClass} value={assignment.userId} onChange={e => setAssignment({...assignment, userId: e.target.value})}>
                  <option className={optionClass} value="">Choose a user...</option>
                  {users.map(u => <option className={optionClass} key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-white/50 uppercase font-bold mb-1 block">New Designation</label>
                <select className={inputClass} value={assignment.newRole} onChange={e => setAssignment({...assignment, newRole: e.target.value})}>
                  <option className={optionClass} value="Super Admin">Super Admin</option>
                  <option className={optionClass} value="Moderator">Moderator</option>
                  <option className={optionClass} value="Verifier">Verifier</option>
                </select>
              </div>
              <button onClick={handleUpdateRole} className="w-full bg-blue-500 text-white font-bold py-3 rounded-xl mt-4 hover:bg-blue-600 transition-colors">Apply New Role</button>
            </div>
          </div>
        </div>
      )}

      {/* --- Filters --- */}
      <FilterBar onClear={handleClear}>
        <FilterItem label="Search Name">
          <input type="text" placeholder="e.g. Juan dela Cruz" value={filterName} onChange={(e) => setFilterName(e.target.value)} className={inputClass} />
        </FilterItem>
        <FilterItem label="Role">
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className={inputClass}>
            <option className={optionClass} value="">Any</option>
            <option className={optionClass} value="Super Admin">Super Admin</option>
            <option className={optionClass} value="Moderator">Moderator</option>
            <option className={optionClass} value="Verifier">Verifier</option>
          </select>
        </FilterItem>
        <FilterItem label="Status">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={inputClass}>
            <option className={optionClass} value="">Any</option>
            <option className={optionClass} value="Active">Active</option>
            <option className={optionClass} value="Inactive">Inactive</option>
          </select>
        </FilterItem>
      </FilterBar>

      <div className="bg-[#1e293b] p-6 pb-8 rounded-2xl border border-white/5 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Role & Permission Control</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Users"  value={users.length} icon={UsersRound} />
          <StatCard title="Super Admins" value={users.filter(u => u.role === "Super Admin").length} icon={ShieldUser}  />
          <StatCard title="Moderators"   value={users.filter(u => u.role === "Moderator").length} icon={UserStar}   />
          <StatCard title="Verifiers"    value={users.filter(u => u.role === "Verifier").length} icon={ShieldCheck} />
        </div>

        <div className="flex justify-end gap-3 mb-5">
          <button 
            onClick={() => setShowAssignModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 text-xs font-medium transition-colors"
          >
            <UserCog className="w-4 h-4" /> Assign Roles
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-[#1e293b] text-xs font-bold hover:bg-white/90 transition-colors shadow-sm"
          >
            <CirclePlus className="w-4 h-4" /> Add new user
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider bg-white/[0.02]">
                <th className="text-left px-4 py-4 font-medium">Name</th>
                <th className="text-left px-4 py-4 font-medium">Email</th>
                <th className="text-left px-4 py-4 font-medium">Role</th>
                <th className="text-left px-4 py-4 font-medium">Status</th>
                <th className="text-left px-4 py-4 font-medium">Joined</th>
                <th className="text-left px-4 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr key={user.id} className={`border-t border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 1 ? "bg-white/[0.01]" : ""}`}>
                  <td className="px-4 py-4 font-medium text-white">{user.name}</td>
                  <td className="px-4 py-4 text-white/50">{user.email}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-block text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${ROLE_STYLES[user.role]}`}>{user.role}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${user.status === "Active" ? "text-green-400" : "text-white/30"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-green-400" : "bg-white/20"}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-white/50">{user.joined}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors"><UserPen size={16}/></button>
                      <button onClick={() => handleRemove(user.id)} className="text-red-400 hover:text-red-300 transition-colors"><SquareX size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RolePermissionView;