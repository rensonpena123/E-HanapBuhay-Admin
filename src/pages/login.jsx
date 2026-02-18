import React, { useState } from 'react';
import loginBg from '../assets/login-bg.png';
import logo from '../assets/logo.png';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-start pl-6 md:pl-20 lg:pl-32 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/* Login Card*/}
      <div className="w-full max-w-lg bg-[#1a263e] rounded-[2rem] px-8 pt-4 pb-8 md:px-12 md:pt-6 md:pb-12 shadow-2xl flex flex-col shrink-0">  
        
    {/* Logo */}
        <div className="flex items-center justify-center mb-2 -mt-2">
          <img src={logo} alt="Logo" className="h-28 w-auto object-contain" />
            <span className="-ml-10 pr-10 text-2xl font-bold tracking-wider relative z-10">
                <span className="text-[#fbc02d]">e-</span>
                <span className="text-blue-500">HanapBuhay</span>
            </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#fbc02d] mb-8 leading-snug text-center">
          Welcome Back,<br />Admin!
        </h1>
        {/* Form */}
        <form className="w-full space-y-5" onSubmit={(e) => e.preventDefault()}>
          
          {/* Email Input */}
          <div className="w-full">
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-transparent border-2 border-[#fbc02d] rounded-2xl px-5 py-4 outline-none focus:border-white transition-colors text-white placeholder-gray-300 text-base"
            />
          </div>

          {/* Password Input */}
          <div className="w-full relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full bg-transparent border-2 border-[#fbc02d] rounded-2xl px-5 py-4 pr-12 outline-none focus:border-white transition-colors text-white placeholder-gray-300 text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="w-full text-left pt-1">
            <a href="#" className="text-[#fbc02d] text-sm hover:underline tracking-wide">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#fbc02d] hover:bg-yellow-500 text-white font-bold py-4 rounded-full text-lg shadow-lg transition-colors tracking-wide cursor-pointer"
            >
              Login
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Login;