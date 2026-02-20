import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, CircleUser } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-20 bg-brand-dark flex items-center justify-between px-8 border-b-2 border-l-2 border-brand-yellow/80 shrink-0">
      
      <div className="relative w-100">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-brand-yellow" />
        </div>
        <input
          type="text"
          placeholder="Search ..."
          className="w-full bg-white text-gray-800 rounded-md py-2 pl-10 pr-4 outline-none border-2 border-brand-yellow focus:shadow-[0_0_8px_rgba(251,192,45,0.5)] transition-shadow text-sm"
        />
      </div>

      <div className="flex items-center h-full">
        
        <button className="pr-6 hover:opacity-80 transition-opacity cursor-pointer">
          <Bell size={24} className="text-brand-yellow" />
        </button>

        <div className="h-full border-l-2 border-brand-yellow/80"></div>

      <Link 
        to="/profile" 
        className="flex items-center gap-5 pl-6 cursor-pointer hover:opacity-80 transition-opacity active:scale-95 decoration-none"
      >
        <CircleUser size={36} strokeWidth={1.5} className="text-brand-yellow" />
        <div className="flex flex-col text-left">
          <span className="text-white font-medium text-[15px] leading-tight">Sample Profile</span>
          <span className="text-gray-300 text-xs">System Admin</span>
        </div>
      </Link>
      </div>
      
    </header>
  );
};

export default Header;