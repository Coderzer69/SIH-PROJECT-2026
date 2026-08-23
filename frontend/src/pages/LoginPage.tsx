import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex w-full font-sans">
      
      {/* Left Column - Branding */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden bg-gradient-to-br from-[#f0fdf7] to-[#F8FAF9] p-16 justify-center">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50/50 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>
        
        {/* Dot Pattern (subtle) */}
        <div className="absolute top-10 right-10 w-48 h-48" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', backgroundSize: '16px 16px', opacity: 0.4 }}></div>

        {/* Content */}
        <div className="relative z-10 max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-16">
            <div className="text-[#0b3b2c]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M7.5 12h2l1.5 -3l2.5 6l1.5 -3h2.5" />
              </svg>
            </div>
            <span className="text-[26px] font-bold text-[#0b3b2c] tracking-tight">MediTrack</span>
          </div>

          <h1 className="text-[44px] font-extrabold text-gray-900 leading-[1.1] mb-5 tracking-tight">
            Smart Care. <br />
            <span className="text-emerald-700">Better Outcomes.</span>
          </h1>

          <p className="text-[17px] text-gray-600 leading-relaxed mb-10 max-w-sm">
            MediTrack helps healthcare professionals manage treatments, prescriptions and medical history securely.
          </p>

          <div className="flex items-center gap-2 text-emerald-800 font-semibold text-[14px]">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Secure. Private. Compliant.
          </div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="w-full max-w-[460px] bg-white rounded-2xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative z-10">
          
          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-[26px] font-extrabold text-gray-900 mb-2 flex items-center justify-center gap-2">
              Welcome back <span>👋</span>
            </h2>
            <p className="text-gray-500 text-sm font-medium">Log in to your MediTrack account</p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); navigate('/patient/dashboard'); }}>
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-gray-800">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-[14.5px] transition-colors bg-gray-50/30"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[13px] font-bold text-gray-800">Password</label>
                <Link to="#" className="text-[12px] font-bold text-emerald-700 hover:text-emerald-800">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-[14.5px] transition-colors bg-gray-50/30"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-[18px] h-[18px]" />
                  ) : (
                    <Eye className="w-[18px] h-[18px]" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-[#0b3b2c] hover:bg-[#082a1f] text-white py-3 rounded-xl font-bold text-[15px] transition-colors mt-2"
            >
              Log In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="h-px bg-gray-100 flex-1"></div>
            <span className="text-[12px] text-gray-400 font-medium">or</span>
            <div className="h-px bg-gray-100 flex-1"></div>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-center w-full [&>div]:w-full">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const res = await fetch('http://localhost:3000/api/auth/oauth-login', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        credential: credentialResponse.credential,
                      }),
                    });
                    const data = await res.json();
                    if (res.ok) {
                      localStorage.setItem('token', data.token);
                      alert('Successfully logged in with Google!');
                      navigate('/patient/dashboard');
                    } else {
                      alert(data.error || 'Login failed');
                    }
                  } catch (error) {
                    console.error('Error during Google login', error);
                    alert('An error occurred during Google login.');
                  }
                }}
                onError={() => {
                  console.log('Google Login Failed');
                  alert('Google Login Failed');
                }}
                shape="rectangular"
                size="large"
                logo_alignment="center"
              />
            </div>
          </div>

          <div className="mt-8 text-center text-[13px] text-gray-500 font-medium">
            Don't have an account? <Link to="/role-selection" className="text-emerald-700 hover:text-emerald-800 font-bold">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
