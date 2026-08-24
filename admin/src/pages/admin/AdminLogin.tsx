import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';
import { Shield, Loader2, Mail, Lock, Eye, EyeOff, LogIn, Check, ShieldPlus } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      
      const { user, token } = response.data;
      
      if (user.role !== 'ADMIN') {
        setError('Access denied. Admin privileges required.');
        setIsSubmitting(false);
        return;
      }

      login(user, token);
      window.location.href = from;
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Invalid credentials or server error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 font-sans p-4 sm:p-8 lg:p-12">
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-200 lg:aspect-[16/10] xl:aspect-[16/9] min-h-[600px]">
        
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#0b3b2c] flex-col relative overflow-hidden">
          {/* Decorative dots pattern */}
          <div 
            className="absolute top-12 right-12 w-64 h-64 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)', backgroundSize: '24px 24px' }}
          />

          <div className="p-12 xl:p-16 flex flex-col h-full z-10 relative">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-24">
              <div className="text-emerald-400 border border-emerald-400 p-2 rounded-xl">
                <ShieldPlus className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white tracking-wide leading-none">MediTrack</span>
                <span className="text-[10px] text-gray-300 tracking-[0.2em] font-medium mt-1 uppercase">Admin Panel</span>
              </div>
            </div>

            {/* Hero Content */}
            <div className="max-w-md">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                <span className="text-emerald-400">Smart Healthcare</span>
                <br />
                <span className="text-white">Starts Here</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-12">
                Manage doctors, patients, treatments and healthcare operations seamlessly.
              </p>
            </div>

            {/* Illustration Container removed as requested */}

            {/* Footer Note */}
            <div className="mt-auto flex items-center gap-2 text-gray-400 text-sm font-medium">
              <Lock className="w-4 h-4" />
              Secure. Reliable. Built for Healthcare.
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 xl:p-20">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#1e293b] mb-3">Welcome Back!</h2>
              <p className="text-gray-500 font-medium">Sign in to continue to your admin dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-[#334155] mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium sm:text-sm bg-gray-50/50"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-[#334155] mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="block w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium sm:text-sm bg-gray-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${rememberMe ? 'bg-[#065f46] border-[#065f46]' : 'bg-white border-gray-300'}`}
                  >
                    {rememberMe && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                  </button>
                  <label 
                    onClick={() => setRememberMe(!rememberMe)} 
                    className="ml-2.5 block text-sm font-medium text-[#475569] cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm font-semibold text-[#065f46] hover:text-[#047857]">
                  Forgot password?
                </a>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm font-medium rounded-lg">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm shadow-emerald-900/10 text-sm font-bold text-white bg-[#065f46] hover:bg-[#064e3b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all mt-8"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center mt-12 mb-8">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  OR
                </span>
              </div>
            </div>

            {/* Footer Text */}
            <div className="text-center text-sm font-medium text-gray-500 pb-4">
              Don't have an account? <span className="text-[#065f46] hover:text-[#047857] cursor-pointer">Contact System Administrator</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
