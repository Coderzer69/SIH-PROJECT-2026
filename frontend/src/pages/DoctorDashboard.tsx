import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Users, PlusCircle, Clock, ClipboardList,
  User, Settings, ScanLine, Check, Bell, ChevronDown, Lock, ShieldCheck,
  FileText
} from 'lucide-react';

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50/50 flex w-full font-sans overflow-hidden">

      {/* Sidebar Navigation */}
      <aside className="w-[280px] bg-white border-r border-gray-100 flex flex-col h-screen shrink-0 relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.01)]">
        {/* Logo */}
        <div className="p-8 pb-6">
          <div className="flex items-center gap-2">
            <div className="text-[#0b3b2c]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M7.5 12h2l1.5 -3l2.5 6l1.5 -3h2.5" />
              </svg>
            </div>
            <span className="text-[22px] font-bold text-[#0b3b2c] tracking-tight">MediTrack</span>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="px-8 pb-6 flex flex-col items-center border-b border-gray-50 mb-6">
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
            alt="Dr. Sharma"
            className="w-[72px] h-[72px] rounded-full object-cover mb-3 shadow-sm"
          />
          <h3 className="text-[17px] font-bold text-gray-900">Dr. Sharma</h3>
          <p className="text-[13.5px] text-gray-500 font-medium mb-3">General Physician</p>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#f0fdf7] text-emerald-700 rounded-full border border-emerald-100/50">
            <Check className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold tracking-wide uppercase">Verified</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 flex flex-col gap-1.5">
          <Link
            to="#"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[14.5px] transition-colors bg-emerald-50/80 text-emerald-700"
          >
            <LayoutDashboard className="w-[18px] h-[18px]" />
            Dashboard
          </Link>
          <div className="flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-400">
            <div className="flex items-center gap-3 font-medium text-[14.5px]">
              <Users className="w-[18px] h-[18px]" />
              Patients
            </div>
            <Lock className="w-[15px] h-[15px]" />
          </div>
          <div className="flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-400">
            <div className="flex items-center gap-3 font-medium text-[14.5px]">
              <PlusCircle className="w-[18px] h-[18px]" />
              New Treatment
            </div>
            <Lock className="w-[15px] h-[15px]" />
          </div>
          <div className="flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-400">
            <div className="flex items-center gap-3 font-medium text-[14.5px]">
              <Clock className="w-[18px] h-[18px]" />
              Treatment History
            </div>
            <Lock className="w-[15px] h-[15px]" />
          </div>
          <div className="flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-400">
            <div className="flex items-center gap-3 font-medium text-[14.5px] text-gray-600">
              <ClipboardList className="w-[18px] h-[18px] text-gray-400" />
              History Requests
            </div>
            <span className="w-[20px] h-[20px] bg-red-500 text-white text-[11px] font-bold flex items-center justify-center rounded-full">
              3
            </span>
          </div>

          <div className="my-2 h-px bg-gray-50 w-full"></div>

          <div className="flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-400">
            <div className="flex items-center gap-3 font-medium text-[14.5px]">
              <User className="w-[18px] h-[18px]" />
              Profile
            </div>
            <Lock className="w-[15px] h-[15px]" />
          </div>
          <div className="flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-400">
            <div className="flex items-center gap-3 font-medium text-[14.5px]">
              <Settings className="w-[18px] h-[18px]" />
              Settings
            </div>
            <Lock className="w-[15px] h-[15px]" />
          </div>
        </nav>

        {/* Bottom Scan Button */}
        <div className="p-6 mt-auto">
          <button className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-white border-2 border-emerald-600/80 text-emerald-700 font-bold text-[14.5px] rounded-xl transition-colors hover:bg-emerald-50">
            <ScanLine className="w-[18px] h-[18px]" />
            Scan Patient
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col h-screen overflow-hidden bg-white">

        {/* Header */}
        <header className="px-10 py-8 flex justify-between items-start z-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1 flex items-center gap-2">
              Good morning, Dr. Sharma <span className="text-3xl">👋</span>
            </h1>
            <p className="text-gray-500 font-medium">Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2.5 bg-white rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
              <Bell className="w-[20px] h-[20px]" />
              <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                3
              </span>
            </button>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-bold text-gray-700 cursor-pointer hover:bg-gray-50">
              Aug 22, 2026
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Blurred Background Content Mockup */}
        <div className="px-10 flex-1 overflow-y-auto blur-md opacity-40 select-none pointer-events-none pb-12">

          <div className="grid grid-cols-[380px_1fr] gap-6 mb-10">
            {/* Scan Card Mock */}
            <div className="bg-gray-50 rounded-3xl p-8 h-[220px] flex flex-col justify-center relative overflow-hidden border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Scan Patient QR Code</h3>
              <p className="text-gray-500 text-sm max-w-[200px]">Identify a patient and start a new treatment</p>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-24 h-24 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center">
                <ScanLine className="w-10 h-10 text-gray-300" />
              </div>
            </div>

            {/* Stats Mock */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-gray-400">Today's Overview</h3>
              <div className="flex gap-8 mt-2">
                <div>
                  <div className="flex items-center gap-2 mb-1"><FileText className="w-5 h-5 text-gray-300" /><span className="text-3xl font-bold text-gray-700">12</span></div>
                  <p className="text-xs text-gray-400 font-medium w-20">Treatments Created</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1"><User className="w-5 h-5 text-gray-300" /><span className="text-3xl font-bold text-gray-700">10</span></div>
                  <p className="text-xs text-gray-400 font-medium w-20">Confirmed Treatments</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1"><FileText className="w-5 h-5 text-gray-300" /><span className="text-3xl font-bold text-gray-700">2</span></div>
                  <p className="text-xs text-gray-400 font-medium w-20">Draft Treatments</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1"><Lock className="w-5 h-5 text-gray-300" /><span className="text-3xl font-bold text-gray-700">3</span></div>
                  <p className="text-xs text-gray-400 font-medium w-20">History Requests Pending</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            {/* List Mock 1 */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 mb-6">Recent Patients</h3>
              <div className="flex flex-col gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100"></div>
                      <div>
                        <div className="h-4 w-32 bg-gray-200 rounded mb-1.5"></div>
                        <div className="h-3 w-24 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    <div className="h-4 w-20 bg-gray-100 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* List Mock 2 */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-gray-400">History Requests</h3>
                <span className="text-xs text-gray-400 font-bold">View all</span>
              </div>
              <div className="flex flex-col gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100"></div>
                      <div>
                        <div className="h-4 w-32 bg-gray-200 rounded mb-1.5"></div>
                        <div className="h-3 w-40 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Verification Overlay Modal */}
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="bg-white/40 absolute inset-0 backdrop-blur-[2px]"></div>

          <div className="relative z-40 flex flex-col items-center text-center max-w-[440px] px-6">
            <div className="w-[88px] h-[88px] bg-[#e6f4ef] rounded-full flex items-center justify-center mb-6 shadow-sm border border-white">
              <Lock className="w-9 h-9 text-[#0b3b2c]" />
            </div>

            <h2 className="text-[26px] font-extrabold text-gray-900 mb-4">
              Verification Required
            </h2>

            <p className="text-[15px] text-gray-700 font-medium leading-relaxed mb-8">
              Your doctor account is not verified yet. <br />
              To access all features and start managing your patients, <br />
              please verify your professional credentials.
            </p>

            <Link to="/doctor/verify" className="flex items-center justify-center gap-2 bg-[#0b3b2c] hover:bg-[#082a1f] text-white px-8 py-3.5 rounded-xl font-bold text-[15px] transition-colors shadow-lg shadow-emerald-900/20 mb-6">
              <ShieldCheck className="w-[18px] h-[18px]" />
              Get Verified
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-[12.5px] text-gray-500 font-medium">
              <Lock className="w-3.5 h-3.5" />
              Once verified, you'll get full access to all doctor features.
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}
