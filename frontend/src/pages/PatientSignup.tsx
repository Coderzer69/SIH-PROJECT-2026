import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff, 
  ShieldCheck, CalendarDays, FileText
} from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function PatientSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { 
        name, email, password, role: 'PATIENT'
      });
      if (res.status === 201) {
        // Log them in automatically
        const loginRes = await api.post('/auth/login', { email, password });
        login(loginRes.data.token, loginRes.data.user);
        navigate('/patient/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-white">
      
      {/* Left Column - Information & Branding */}
      <div className="hidden lg:flex flex-col w-[380px] xl:w-[460px] bg-[#f8faf9] border-r border-gray-100 p-10 xl:p-12 relative overflow-y-auto">
        
        {/* Logo */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2">
            <div className="text-[#0b3b2c]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M7.5 12h2l1.5 -3l2.5 6l1.5 -3h2.5" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-[#0b3b2c] tracking-tight">MediTrack</span>
          </div>
          <span className="text-[13px] text-gray-500 font-medium mt-1 ml-10">Digital care. Smart records.</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl xl:text-[34px] font-extrabold text-gray-900 leading-[1.2] mb-4 tracking-tight">
          Join MediTrack <br />
          as a <span className="text-emerald-700">Patient</span>
        </h1>
        <p className="text-[15px] text-gray-600 leading-relaxed mb-12">
          Create your patient account to access your health records, book appointments, and more.
        </p>

        {/* Illustration Mockup */}
        <div className="relative w-full max-w-[280px] mx-auto h-[240px] mb-12 flex items-center justify-center">
          {/* Background Blob */}
          <div className="absolute w-[240px] h-[60px] bg-emerald-50 rounded-full bottom-0 blur-xl"></div>
          
          {/* Clipboard */}
          <div className="relative w-[160px] h-[200px] bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col items-center pt-8 px-4 z-10">
            {/* Clip */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-gray-300 rounded-full"></div>
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-gray-400 rounded-full"></div>
            
            {/* Profile Circle */}
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-emerald-600" />
            </div>
            
            {/* Lines */}
            <div className="w-full flex flex-col gap-2.5">
              <div className="h-2 bg-gray-100 rounded-full w-full"></div>
              <div className="h-2 bg-gray-100 rounded-full w-3/4"></div>
              <div className="h-2 bg-gray-100 rounded-full w-5/6"></div>
              <div className="h-2 bg-gray-100 rounded-full w-1/2"></div>
            </div>
          </div>
          
          {/* Shield */}
          <div className="absolute bottom-4 right-4 z-20 w-16 h-16 bg-[#0b3b2c] rounded-2xl flex items-center justify-center shadow-lg transform rotate-[-5deg]">
            <div className="text-white text-3xl font-bold">+</div>
          </div>
          
          {/* Plant Leaf (simplified) */}
          <div className="absolute bottom-8 right-[-10px] z-0">
             <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 60C20 60 40 40 40 20C40 0 20 0 20 0C20 0 0 20 0 40C0 60 20 60 20 60Z" fill="#a7f3d0" opacity="0.8"/>
            </svg>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-6 mt-auto">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h4 className="font-bold text-[14px] text-gray-900 mb-0.5">Secure & Private</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed">Your data is encrypted and protected with top-tier security.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <CalendarDays className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h4 className="font-bold text-[14px] text-gray-900 mb-0.5">Easy Appointments</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed">Book and manage appointments with just a few clicks.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h4 className="font-bold text-[14px] text-gray-900 mb-0.5">Health Records</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed">Access your medical history anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Signup Form */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto bg-white">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center p-6 sm:p-8">
          <Link to="/role-selection" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="text-sm font-medium text-gray-500">
            Already have an account? <Link to="/login" className="text-emerald-700 hover:text-emerald-800 font-bold ml-1">Sign in</Link>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col items-center px-6 sm:px-12 pb-12 w-full max-w-[680px] mx-auto">
          
          {/* Header */}
          <div className="text-center mb-10 mt-4">
            <div className="w-16 h-16 rounded-full bg-[#f0fdf7] flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#0b3b2c]">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              <span className="text-emerald-700">Patient</span> Sign Up
            </h2>
            <p className="text-gray-500 text-[15px] font-medium">Create your account to get started</p>
          </div>

          <form className="w-full flex flex-col gap-5" onSubmit={handleSignup}>
            {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-gray-900">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Enter your full name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-[14.5px]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-gray-900">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-[14.5px]"
                  />
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-gray-900">Phone Number (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                <input 
                  type="tel" 
                  placeholder="Enter your phone number" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-[14.5px]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-gray-900">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create a password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-[14.5px]"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
              
              {/* Password Requirements */}
              <div className="mt-1 bg-gray-50/80 rounded-xl p-4 border border-gray-100 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <span className="text-[12px] font-bold text-gray-700">Password must contain:</span>
                <div className="flex items-center gap-4 text-[12px] text-emerald-700 font-medium">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div> At least 8 characters
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div> One uppercase letter
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div> One number
                  </div>
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-gray-900">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirm your password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-[14.5px]"
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2.5 mt-2">
              <input 
                type="checkbox" 
                id="terms" 
                className="mt-1 w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <label htmlFor="terms" className="text-[13px] text-gray-600 cursor-pointer leading-relaxed">
                I agree to the <Link to="#" className="text-emerald-700 font-bold hover:underline">Terms of Service</Link> and <Link to="#" className="text-emerald-700 font-bold hover:underline">Privacy Policy</Link>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#0b3b2c] hover:bg-[#082a1f] text-white py-3.5 rounded-xl font-bold text-[15px] transition-colors mt-2 shadow-md shadow-emerald-900/10 disabled:opacity-70"
            >
              {loading ? 'Creating...' : 'Create Patient Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full my-7">
            <div className="h-px bg-gray-100 flex-1"></div>
            <span className="text-[12px] text-gray-400 font-bold uppercase tracking-wider">or</span>
            <div className="h-px bg-gray-100 flex-1"></div>
          </div>

          {/* Google Login */}
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
                      role: 'PATIENT'
                    }),
                  });
                  const data = await res.json();
                  if (res.ok) {
                    login(data.token, data.user);
                    if (data.user.role === 'PATIENT') {
                      navigate('/patient/dashboard');
                    } else if (data.user.role === 'DOCTOR') {
                      navigate('/doctor/dashboard');
                    } else if (data.user.role === 'ADMIN') {
                      navigate('/admin/dashboard');
                    }
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

          {/* Trust text */}
          <div className="mt-10 flex items-center gap-2 text-[12px] text-gray-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Your information is secure with us and will never be shared.
          </div>

        </div>
      </div>
    </div>
  );
}
