import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { Search, Bell, CircleUser } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  return (
    <header className="h-20 bg-brand-dark flex items-center justify-between px-8 border-b-2 border-l-2 border-brand-yellow/80 shrink-0">
      
      {/* Search Bar */}
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

      <div className="flex items-center h-full gap-4">
        
        <button className="hover:opacity-80 transition-opacity cursor-pointer">
          <Bell size={24} className="text-brand-yellow" />
        </button>

        <div className="h-10 border-l-2 border-brand-yellow/80 mx-2"></div>

        {/* Profile Link with Active State */}
        <Link 
          to="/profile" 
          className={`flex items-center gap-4 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer decoration-none border ${
            isProfilePage 
              ? "bg-brand-yellow/10 border-brand-yellow/50"
              : "border-transparent hover:bg-white/5"      
          }`}
        >
          {/* Icon fills slightly when active */}
          <CircleUser 
            size={36} 
            strokeWidth={1.5} 
            className={`text-brand-yellow transition-transform ${isProfilePage ? "fill-brand-yellow/20" : ""}`} 
          />
          
          <div className="flex flex-col text-left">
            {/* Text turns yellow when active */}
            <span className={`font-medium text-[15px] leading-tight transition-colors ${
              isProfilePage ? "text-brand-yellow" : "text-white"
            }`}>
              Sample Profile
            </span>
            <span className="text-gray-300 text-xs">System Admin</span>
          </div>
        </Link>
      </div>
      
    </header>
  );
};

export default Header;