import React, { useState } from 'react';
import { User, Edit2, Eye, EyeOff } from 'lucide-react';
import EditUsernameModal from './editUserModal.jsx';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    username: "Juan",
    email: "juan@gmail.com",
    role: "Admin",
    image: null
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [isEditUsernameOpen, setIsEditUsernameOpen] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo({ ...userInfo, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateUsername = (newName) => {
    setUserInfo(prev => ({ ...prev, username: newName }));
    console.log("Username updated to:", newName);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      
      {/* Page Header */}
      <div className="bg-brand-dark p-6 rounded-2xl shadow-lg border border-gray-700">
        <h1 className="text-2xl font-bold text-white">Profile Management</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Picture Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit">
          <div className="bg-brand-dark p-4">
            <h2 className="text-white font-bold">Profile Picture</h2>
          </div>
          
          <div className="p-8 flex flex-col items-center justify-center gap-6">
            <div className="w-32 h-32 rounded-full border-4 border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50 relative group">
              {userInfo.image ? (
                <img src={userInfo.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={64} className="text-gray-400" />
              )}
            </div>

            <div className="relative">
              <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
              <label 
                htmlFor="file-upload"
                className="bg-brand-yellow text-white font-bold py-2 px-6 rounded-lg cursor-pointer hover:opacity-90 transition-opacity shadow-md flex items-center gap-2"
              >
                Choose File
              </label>
            </div>
          </div>
        </div>

        {/* Account & Profile Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-brand-dark p-4">
            <h2 className="text-white font-bold">Account & Profile</h2>
          </div>

          <div className="p-8 space-y-6">
            
            {/* Username Input Group */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-500">Username:</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={userInfo.username} 
                  readOnly 
                  className="w-full bg-gray-100 border border-gray-300 text-gray-800 font-bold px-4 py-3 rounded-lg focus:outline-none cursor-default"
                />
                
                <button 
                  onClick={() => setIsEditUsernameOpen(true)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand-dark text-white p-2 rounded-md hover:opacity-90 transition-all shadow-sm"
                  title="Edit Username"
                >
                  <Edit2 size={18} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-500">Email:</label>
              <input 
                type="email" 
                value={userInfo.email} 
                onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                className="w-full bg-gray-100 border border-gray-300 text-gray-800 font-bold px-4 py-3 rounded-lg focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-500">Role:</label>
              <div className="w-full bg-gray-100 border border-gray-300 text-gray-800 font-bold px-4 py-3 rounded-lg flex justify-between items-center opacity-70 cursor-not-allowed">
                {userInfo.role}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Password Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-brand-dark p-4">
          <h2 className="text-white font-bold">Reset Password</h2>
        </div>

        <div className="p-8 space-y-6">
          
          {/* Current Password */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-bold text-gray-800">Current Password</label>
            <div className="relative">
              <input 
                type={showCurrent ? "text" : "password"} 
                placeholder="Enter Current Password"
                className="w-full bg-gray-100 border border-gray-300 text-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow"
              />
              <button 
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-800">New Password</label>
              <div className="relative">
                <input 
                  type={showNew ? "text" : "password"} 
                  placeholder="Enter New Password"
                  className="w-full bg-gray-100 border border-gray-300 text-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow"
                />
                <button 
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-800">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirm ? "text" : "password"} 
                  placeholder="Confirm New Password"
                  className="w-full bg-gray-100 border border-gray-300 text-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow"
                />
                <button 
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              className="bg-brand-yellow text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity shadow-md flex items-center gap-2"
            >
              Change Password
            </button>
          </div>

        </div>
      </div>

      {/* Render modal */}
      <EditUsernameModal 
        isOpen={isEditUsernameOpen}
        onClose={() => setIsEditUsernameOpen(false)}
        currentUsername={userInfo.username}
        onSave={handleUpdateUsername}
      />

    </div>
  );
};

export default UserProfile;