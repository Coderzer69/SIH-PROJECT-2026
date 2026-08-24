import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-xl">
              <HeartPulse className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">MediRecord</span>
              <p className="text-[10px] text-gray-500 font-medium hidden sm:block">Your Health. Your Records. Your Control.</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="#" className="text-sm font-medium text-emerald-600 border-b-2 border-emerald-600 pb-1">Home</Link>
            <Link to="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">How It Works</Link>
            <Link to="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">For Patients</Link>
            <Link to="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">For Doctors</Link>
            <Link to="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Security</Link>
            <Link to="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">About Us</Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4 lg:gap-5">
            <Link
              to="/login"
              className="text-sm font-bold text-slate-800 hover:text-emerald-700 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/role-selection"
              className="bg-[#0b3b2c] hover:bg-[#082a1f] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile: CTA + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-bold text-slate-800 hover:text-emerald-700 transition-colors"
            >
              Login
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1 shadow-lg">
          <Link to="#" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-600 bg-emerald-50">Home</Link>
          <Link to="#" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">How It Works</Link>
          <Link to="#" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">For Patients</Link>
          <Link to="#" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">For Doctors</Link>
          <Link to="#" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Security</Link>
          <Link to="#" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">About Us</Link>
          <div className="pt-2 mt-1 border-t border-gray-100">
            <Link
              to="/role-selection"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-[#0b3b2c] hover:bg-[#082a1f] text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
