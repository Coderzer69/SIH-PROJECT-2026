import { ChevronLeft, User, Lock, Shield, Bell, HelpCircle, LogOut, ChevronRight, Copy, Check, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProfileSettingsProps {
  onBack: () => void;
  profile?: any;
}

type Section = 'menu' | 'personal' | 'password' | 'privacy' | 'notifications' | 'help';

export default function ProfileSettings({ onBack, profile }: ProfileSettingsProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>('menu');
  
  const [formData, setFormData] = useState({
    name: profile?.user?.name || user?.name || 'Patient',
    email: profile?.user?.email || user?.email || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSaveProfile = () => {
    alert('Profile updated successfully!');
    setActiveSection('menu');
  };

  const handleUpdatePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert('Password updated successfully!');
    setActiveSection('menu');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (activeSection === 'personal') {
    return (
      <div className="w-full h-full font-sans animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setActiveSection('menu')} className="text-emerald-700 hover:text-emerald-800">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Personal Information</h1>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>
          <button onClick={handleSaveProfile} className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition-colors">
            <Save className="w-4 h-4" /> Save Profile
          </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'password') {
    return (
      <div className="w-full h-full font-sans animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setActiveSection('menu')} className="text-emerald-700 hover:text-emerald-800">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Current Password</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>
          <button onClick={handleUpdatePassword} className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition-colors">
            <Lock className="w-4 h-4" /> Update Password
          </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'privacy' || activeSection === 'notifications' || activeSection === 'help') {
    return (
      <div className="w-full h-full font-sans animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setActiveSection('menu')} className="text-emerald-700 hover:text-emerald-800">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeSection} Settings</h1>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 text-center py-20">
          <p className="text-gray-500 font-medium">This section is currently under construction.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={onBack}
          className="text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] mb-6 p-6 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=10b981&color=fff&size=150`}
            alt={formData.name} 
            className="w-[84px] h-[84px] rounded-full object-cover shadow-sm"
          />
          <div>
            <h2 className="text-[22px] font-bold text-gray-900 mb-1">{formData.name}</h2>
            <p className="text-[15px] text-gray-500 mb-2">{formData.email}</p>
            <div className="flex items-center gap-2">
              <span className="text-[14px] text-gray-500 font-medium">Patient ID:</span>
              <span className="text-[14px] font-bold text-gray-900">{profile?.qrCodeIdentifier || '—'}</span>
              <button 
                onClick={() => profile?.qrCodeIdentifier && navigator.clipboard.writeText(profile.qrCodeIdentifier)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setActiveSection('personal')}
          className="px-6 py-2.5 bg-white border border-gray-200 text-emerald-700 font-bold text-[14px] rounded-xl hover:bg-emerald-50 transition-colors shadow-sm"
        >
          Edit Profile
        </button>
      </div>

      {/* Settings List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] overflow-hidden">
        
        <button 
          onClick={() => setActiveSection('personal')}
          className="w-full flex items-center justify-between p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors group"
        >
          <div className="flex items-center gap-4 text-gray-700 group-hover:text-emerald-700 transition-colors">
            <User className="w-5 h-5" />
            <span className="font-bold text-[15px]">Personal Information</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-700 transition-colors" />
        </button>

        <button 
          onClick={() => setActiveSection('password')}
          className="w-full flex items-center justify-between p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors group"
        >
          <div className="flex items-center gap-4 text-gray-700 group-hover:text-emerald-700 transition-colors">
            <Lock className="w-5 h-5" />
            <span className="font-bold text-[15px]">Change Password</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-700 transition-colors" />
        </button>

        <button 
          onClick={() => setActiveSection('privacy')}
          className="w-full flex items-center justify-between p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors group"
        >
          <div className="flex items-center gap-4 text-gray-700 group-hover:text-emerald-700 transition-colors">
            <Shield className="w-5 h-5" />
            <span className="font-bold text-[15px]">Privacy & Security</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-700 transition-colors" />
        </button>

        <button 
          onClick={() => setActiveSection('notifications')}
          className="w-full flex items-center justify-between p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors group"
        >
          <div className="flex items-center gap-4 text-gray-700 group-hover:text-emerald-700 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="font-bold text-[15px]">Notification Settings</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-700 transition-colors" />
        </button>

        <button 
          onClick={() => setActiveSection('help')}
          className="w-full flex items-center justify-between p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors group"
        >
          <div className="flex items-center gap-4 text-gray-700 group-hover:text-emerald-700 transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span className="font-bold text-[15px]">Help & Support</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-700 transition-colors" />
        </button>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-6 hover:bg-red-50 transition-colors group"
        >
          <div className="flex items-center gap-4 text-red-600">
            <LogOut className="w-5 h-5" />
            <span className="font-bold text-[15px]">Logout</span>
          </div>
        </button>

      </div>
    </div>
  );
}
