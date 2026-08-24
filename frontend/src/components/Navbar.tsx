import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80; // account for navbar height
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => { e.preventDefault(); scrollToSection(e as any, 'home'); }}>
            <div className="bg-emerald-600 p-2 rounded-xl">
              <HeartPulse className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">MediTrack</span>
              <p className="text-[10px] text-gray-500 font-medium hidden sm:block">Your Health. Your Records. Your Control.</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="text-sm font-medium text-gray-600 hover:text-gray-900">How It Works</a>
            <a href="#for-patients" onClick={(e) => scrollToSection(e, 'for-patients')} className="text-sm font-medium text-gray-600 hover:text-gray-900">Patients & Doctors</a>
            <a href="#security" onClick={(e) => scrollToSection(e, 'security')} className="text-sm font-medium text-gray-600 hover:text-gray-900">Security</a>
            <a href="#about-us" onClick={(e) => scrollToSection(e, 'about-us')} className="text-sm font-medium text-gray-600 hover:text-gray-900">About Us</a>
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
          <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">How It Works</a>
          <a href="#for-patients" onClick={(e) => scrollToSection(e, 'for-patients')} className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Patients & Doctors</a>
          <a href="#security" onClick={(e) => scrollToSection(e, 'security')} className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Security</a>
          <a href="#about-us" onClick={(e) => scrollToSection(e, 'about-us')} className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">About Us</a>
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
