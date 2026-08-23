import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-xl">
              <HeartPulse className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">MediRecord</span>
              <p className="text-[10px] text-gray-500 font-medium">Your Health. Your Records. Your Control.</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="#" className="text-sm font-medium text-emerald-600 border-b-2 border-emerald-600 pb-1">Home</Link>
            <Link to="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">How It Works</Link>
            <Link to="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">For Patients</Link>
            <Link to="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">For Doctors</Link>
            <Link to="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Security</Link>
            <Link to="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">About Us</Link>
          </div>

          <div className="flex items-center gap-5">
            <Link 
              to="/login" 
              className="text-sm font-bold text-slate-800 hover:text-emerald-700 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/role-selection" 
              className="bg-[#0b3b2c] hover:bg-[#082a1f] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
