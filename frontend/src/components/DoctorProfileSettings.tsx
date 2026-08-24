import { useEffect, useState } from 'react';
import { ChevronLeft, Loader2, Lock, Save, ShieldCheck, UserRound } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

interface DoctorProfileSettingsProps {
  defaultSection?: 'profile' | 'settings';
  onBack: () => void;
}

export default function DoctorProfileSettings({
  defaultSection = 'profile',
  onBack,
}: DoctorProfileSettingsProps) {
  const { updateUser, logout } = useAuth();
  const [section, setSection] = useState<'profile' | 'settings'>(defaultSection);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    specialization: '',
    licenseNumber: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setSection(defaultSection);
  }, [defaultSection]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await api.get('/doctor/profile');
        const nextProfile = res.data;
        setProfile(nextProfile);
        setProfileForm({
          name: nextProfile.user?.name || '',
          email: nextProfile.user?.email || '',
          specialization: nextProfile.specialization || '',
          licenseNumber: nextProfile.licenseNumber || '',
        });
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load doctor profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileSave = async () => {
    try {
      setIsSavingProfile(true);
      setError('');
      setSuccessMessage('');
      const res = await api.patch('/doctor/profile', profileForm);
      const nextProfile = res.data.profile;
      setProfile(nextProfile);
      setProfileForm({
        name: nextProfile.user?.name || '',
        email: nextProfile.user?.email || '',
        specialization: nextProfile.specialization || '',
        licenseNumber: nextProfile.licenseNumber || '',
      });
      updateUser({
        name: nextProfile.user?.name || '',
        email: nextProfile.user?.email || '',
        specialization: nextProfile.specialization || '',
      });
      setSuccessMessage('Profile updated successfully.');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setError('Please fill in all password fields.');
      setSuccessMessage('');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New password and confirm password do not match.');
      setSuccessMessage('');
      return;
    }

    try {
      setIsUpdatingPassword(true);
      setError('');
      setSuccessMessage('');
      const res = await api.patch('/doctor/password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setSuccessMessage(res.data.message || 'Password updated successfully.');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update password');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const verificationBadgeClassName =
    profile?.verificationStatus === 'APPROVED'
      ? 'bg-[#e6f4ef] text-[#0b5c46]'
      : profile?.verificationStatus === 'PENDING'
        ? 'bg-orange-50 text-orange-600'
        : profile?.verificationStatus === 'REJECTED'
          ? 'bg-red-50 text-red-600'
          : 'bg-gray-100 text-gray-600';

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#0b5c46] mb-4" />
        <p className="text-gray-500 font-medium">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[980px] mx-auto w-full">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="text-[#0b5c46] hover:text-[#084836] transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctor Profile & Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your account details, verification info, and security settings.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setSection('profile')}
          className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${section === 'profile' ? 'bg-[#0b5c46] text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
        >
          Profile
        </button>
        <button
          onClick={() => setSection('settings')}
          className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${section === 'settings' ? 'bg-[#0b5c46] text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
        >
          Settings
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm">
          {successMessage}
        </div>
      )}

      {section === 'profile' ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-full bg-[#e6f4ef] text-[#0b5c46] flex items-center justify-center">
                <UserRound className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
                <p className="text-sm text-gray-500">Update the doctor details shown across your dashboard.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-gray-900 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm((current) => ({ ...current, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#0b5c46]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm((current) => ({ ...current, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#0b5c46]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Specialization</label>
                <input
                  type="text"
                  value={profileForm.specialization}
                  onChange={(e) => setProfileForm((current) => ({ ...current, specialization: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#0b5c46]"
                  placeholder="General Medicine"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">License Number</label>
                <input
                  type="text"
                  value={profileForm.licenseNumber}
                  onChange={(e) => setProfileForm((current) => ({ ...current, licenseNumber: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#0b5c46]"
                  placeholder="KL-24567"
                />
              </div>
            </div>

            <button
              onClick={handleProfileSave}
              disabled={isSavingProfile}
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-[#0b5c46] text-white font-bold text-sm rounded-xl hover:bg-[#094d3a] transition-colors disabled:opacity-70"
            >
              {isSavingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSavingProfile ? 'Saving...' : 'Save Profile'}
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-[#e6f4ef] text-[#0b5c46] font-bold text-xl flex items-center justify-center">
                  {profile?.user?.name?.charAt(0) || 'D'}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{profile?.user?.name || 'Doctor'}</h3>
                  <p className="text-sm text-gray-500">{profile?.specialization || 'Doctor'}</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-gray-100">
                <span className="text-sm text-gray-500">Verification Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${verificationBadgeClassName}`}>
                  {profile?.verificationStatus || 'INCOMPLETE'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-gray-100">
                <span className="text-sm text-gray-500">Member Since</span>
                <span className="text-sm font-bold text-gray-900">
                  {profile?.user?.createdAt ? new Date(profile.user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-gray-100">
                <span className="text-sm text-gray-500">Verification Document</span>
                <span className="text-sm font-bold text-gray-900 truncate max-w-[180px] text-right">
                  {profile?.verificationDocumentUrl || 'Not uploaded'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-gray-100">
                <span className="text-sm text-gray-500">Qualification Document</span>
                <span className="text-sm font-bold text-gray-900 truncate max-w-[180px] text-right">
                  {profile?.qualificationDocumentUrl || 'Not uploaded'}
                </span>
              </div>
            </div>

            <div className="bg-[#f4f8f6] rounded-2xl border border-[#dcebe4] p-6">
              <div className="flex items-center gap-3 mb-3 text-[#0b5c46]">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-bold">Verification Notes</h3>
              </div>
              <p className="text-sm text-[#355d50] leading-relaxed">
                Keep your name, specialization, and license number up to date so patients and admins always see the latest information.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-full bg-[#eef4ff] text-[#2f5ce3] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Security Settings</h2>
                <p className="text-sm text-gray-500">Update your password to keep your doctor account secure.</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm((current) => ({ ...current, currentPassword: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#0b5c46]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm((current) => ({ ...current, newPassword: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#0b5c46]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm((current) => ({ ...current, confirmPassword: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#0b5c46]"
                />
              </div>
            </div>

            <button
              onClick={handlePasswordUpdate}
              disabled={isUpdatingPassword}
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-[#0b5c46] text-white font-bold text-sm rounded-xl hover:bg-[#094d3a] transition-colors disabled:opacity-70"
            >
              {isUpdatingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              {isUpdatingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Account Snapshot</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Email</p>
                  <p className="text-sm font-bold text-gray-900">{profile?.user?.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Role</p>
                  <p className="text-sm font-bold text-gray-900">Doctor</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Specialization</p>
                  <p className="text-sm font-bold text-gray-900">{profile?.specialization || 'Not set'}</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-red-700 mb-2">Session Actions</h3>
              <p className="text-sm text-red-600 mb-4">
                If you are using a shared device, log out after updating your account settings.
              </p>
              <button
                onClick={logout}
                className="px-4 py-2 bg-white border border-red-200 text-red-600 font-bold text-sm rounded-xl hover:bg-red-100 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
