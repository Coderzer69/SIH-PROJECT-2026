import { Link } from 'react-router-dom';
import { Stethoscope, ArrowRight } from 'lucide-react';

export default function RoleSelection() {
  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[100px] opacity-70"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[100px] opacity-70"></div>
      
      {/* Dot Pattern (subtle) */}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.4 }}></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl px-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2">
            <div className="text-[#0b3b2c]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M7.5 12h2l1.5 -3l2.5 6l1.5 -3h2.5" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-[#0b3b2c] tracking-tight">MediTrack</span>
          </div>
          <span className="text-[14px] text-gray-500 font-medium mt-1">Digital care. Smart records.</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-[32px] sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Welcome to MediTrack</h1>
          <p className="text-gray-500 font-medium text-[16px]">Choose how you want to continue</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-[640px] mx-auto">
          {/* Patient Card */}
          <Link to="/patient/signup" className="group bg-white rounded-[24px] p-8 flex flex-col items-center text-center border border-gray-200 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 relative overflow-hidden w-full aspect-[4/5] sm:aspect-auto sm:h-[340px]">
            <div className="w-24 h-24 rounded-full bg-[#f0fdf7] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mt-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-[#0b3b2c]">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h2 className="text-[22px] font-bold text-[#0b3b2c] mb-3">I'm a Patient</h2>
            <p className="text-gray-500 text-[14.5px] leading-relaxed mb-8 max-w-[200px]">
              Access your health records, book appointments and more.
            </p>
            <div className="mt-auto w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center group-hover:border-emerald-300 group-hover:bg-emerald-50 transition-colors">
              <ArrowRight className="w-5 h-5 text-[#0b3b2c]" />
            </div>
          </Link>

          {/* Doctor Card */}
          <Link to="/doctor/signup" className="group bg-white rounded-[24px] p-8 flex flex-col items-center text-center border border-gray-200 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 relative overflow-hidden w-full aspect-[4/5] sm:aspect-auto sm:h-[340px]">
            <div className="w-24 h-24 rounded-full bg-[#f0fdf7] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mt-2">
              <Stethoscope className="w-12 h-12 text-[#0b3b2c]" strokeWidth={2.2} />
            </div>
            <h2 className="text-[22px] font-bold text-[#0b3b2c] mb-3">I'm a Doctor</h2>
            <p className="text-gray-500 text-[14.5px] leading-relaxed mb-8 max-w-[200px]">
              Manage your patients, treatments and prescriptions.
            </p>
            <div className="mt-auto w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center group-hover:border-emerald-300 group-hover:bg-emerald-50 transition-colors">
              <ArrowRight className="w-5 h-5 text-[#0b3b2c]" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
