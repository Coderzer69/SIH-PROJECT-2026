import { Link } from 'react-router-dom';
import { HeartPulse, MessageCircle, Share2, Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b3b2c] text-emerald-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">

          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-emerald-500 p-2 rounded-xl">
                <HeartPulse className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">MediRecord</span>
                <p className="text-[10px] text-emerald-200 font-medium">Your Health. Your Records.</p>
              </div>
            </div>
            <div className="flex space-x-4 mb-8">
              <a href="#" className="text-emerald-200 hover:text-white"><MessageCircle className="h-5 w-5" /></a>
              <a href="#" className="text-emerald-200 hover:text-white"><Share2 className="h-5 w-5" /></a>
              <a href="#" className="text-emerald-200 hover:text-white"><Mail className="h-5 w-5" /></a>
              <a href="#" className="text-emerald-200 hover:text-white"><Globe className="h-5 w-5" /></a>
            </div>
            <p className="text-sm text-emerald-400">© 2026 MediRecord. All rights reserved.</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-sm text-emerald-200 hover:text-white">How it Works</Link></li>
              <li><Link to="#" className="text-sm text-emerald-200 hover:text-white">For Patients</Link></li>
              <li><Link to="#" className="text-sm text-emerald-200 hover:text-white">For Doctors</Link></li>
              <li><Link to="#" className="text-sm text-emerald-200 hover:text-white">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-sm text-emerald-200 hover:text-white">About Us</Link></li>
              <li><Link to="#" className="text-sm text-emerald-200 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="#" className="text-sm text-emerald-200 hover:text-white">Terms of Service</Link></li>
              <li><Link to="#" className="text-sm text-emerald-200 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider mb-4">Support</h3>
            <ul className="space-y-3 mb-8">
              <li><Link to="#" className="text-sm text-emerald-200 hover:text-white">Help Center</Link></li>
              <li><Link to="#" className="text-sm text-emerald-200 hover:text-white">FAQs</Link></li>
              <li><Link to="#" className="text-sm text-emerald-200 hover:text-white">Contact Support</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider mb-4">Stay Updated</h3>
            <p className="text-sm text-emerald-200 mb-4">Subscribe to get updates and health tips.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[#124b38] border border-[#1b624a] text-white placeholder-emerald-400 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-emerald-500 w-full"
              />
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors">
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
