import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const EditBusinessModal = ({ isOpen, onClose, business, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    regNumber: '',
    owner: '',
    dateRegistered: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    if (business) {
      setFormData({
        name: business.name || '',
        email: business.email || '',
        type: business.type || '',
        regNumber: business.regNumber || '',
        owner: business.owner || '',
        dateRegistered: business.dateRegistered || '',
        address: business.address || '',
        phone: business.phone || ''
      });
    }
  }, [business, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...business, ...formData }); 
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-brand-dark p-4 flex justify-between items-center">
          <h2 className="text-white font-bold text-lg">Edit Business Information</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <InputGroup label="Business Name" name="name" value={formData.name} onChange={handleChange} />
            <InputGroup label="Email Address" name="email" value={formData.email} onChange={handleChange} type="email" />
            
            <InputGroup label="Business Type" name="type" value={formData.type} onChange={handleChange} />
            <InputGroup label="Registration No." name="regNumber" value={formData.regNumber} onChange={handleChange} />
            
            <InputGroup label="Owner Name" name="owner" value={formData.owner} onChange={handleChange} />
            <InputGroup label="Date Registered" name="dateRegistered" value={formData.dateRegistered} onChange={handleChange} />
            
            <div className="md:col-span-2">
              <InputGroup label="Business Address" name="address" value={formData.address} onChange={handleChange} />
            </div>
            
            <InputGroup label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition shadow-md"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

// Helper Component for inputs
const InputGroup = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</label>
    <input 
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition"
    />
  </div>
);

export default EditBusinessModal;