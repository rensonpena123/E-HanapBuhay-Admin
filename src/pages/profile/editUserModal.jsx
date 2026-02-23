import React, { useState, useEffect } from 'react';
import { X, Save, User } from 'lucide-react';

const EditUsernameModal = ({ isOpen, onClose, currentUsername, onSave }) => {
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNewUsername(currentUsername);
    }
  }, [isOpen, currentUsername]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUsername.trim()) {
      onSave(newUsername);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-brand-dark p-4 flex justify-between items-center">
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <User size={20} className="text-brand-yellow" />
            Edit Username
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">New Username</label>
            <input 
              type="text" 
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition"
              placeholder="Enter new username"
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition shadow-md"
            >
              <Save size={16} /> Save
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EditUsernameModal;