import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginBg from '../assets/login-bg.png';
import Logo from '../components/logo.jsx';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-start pl-6 md:pl-20 lg:pl-32 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/* Login Card  */}
      <div className="w-full max-w-lg bg-brand-dark rounded-[2rem] px-8 pt-4 pb-8 md:px-12 md:pt-6 md:pb-12 shadow-2xl flex flex-col shrink-0">  
        
        {/* Logo */}
        <Logo className="mb-2 -mt-2" />

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-brand-yellow mb-8 leading-snug text-center">
          Welcome Back,<br />Admin!
        </h1>

        {/* Form */}
        <form 
          className="w-full space-y-5" 
          onSubmit={(e) => {
            e.preventDefault(); 
            navigate('/dashboard'); 
          }}
        >
          
          {/* Email Input */}
          <div className="w-full">
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-transparent border-2 border-brand-yellow rounded-2xl px-5 py-4 outline-none hover:shadow-[0_0_12px_rgba(251,192,45,0.4)] focus:shadow-[0_0_16px_rgba(251,192,45,0.7)] focus:border-brand-yellow transition-all duration-300 text-white placeholder-gray-300 text-base"
            />
          </div>

          {/* Password Input */}
          <div className="w-full relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full bg-transparent border-2 border-brand-yellow rounded-2xl px-5 py-4 pr-12 outline-none hover:shadow-[0_0_12px_rgba(251,192,45,0.4)] focus:shadow-[0_0_16px_rgba(251,192,45,0.7)] focus:border-brand-yellow transition-all duration-300 text-white placeholder-gray-300 text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-yellow transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="w-full text-left pt-1">
            <a href="#" className="text-brand-yellow text-sm hover:underline hover:text-yellow-400 transition-colors tracking-wide">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-brand-yellow hover:bg-brand-yellow hover:shadow-[0_0_20px_rgba(251,192,45,0.6)] text-white font-bold py-4 rounded-full text-lg transition-all duration-300 tracking-wide cursor-pointer"
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