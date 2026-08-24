import { useState, useEffect } from 'react';
import {
  Users, Activity, ClipboardList, ShieldCheck,
  Bell, ChevronDown, CheckCircle, XCircle, Eye, Menu, X
} from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<any>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'dashboard') {
        const res = await api.get('/admin/dashboard-stats');
        setStats(res.data);
      } else if (activeTab === 'doctors') {
        const res = await api.get('/admin/doctors');
        setDoctors(res.data);
      } else if (activeTab === 'patients') {
        const res = await api.get('/admin/patients');
        setPatients(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleVerifyDoctor = async (doctorId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      await api.patch(`/admin/doctors/${doctorId}/verify`, { status });
      fetchData(); // Refresh list
    } catch (err) {
      console.error('Failed to verify doctor', err);
      alert('Failed to verify doctor');
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex w-full font-sans">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-40 lg:z-auto
        w-[280px] bg-white border-r border-gray-100 flex flex-col h-screen
        transition-transform duration-300 ease-in-out shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 lg:p-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-[#0b3b2c]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-[22px] font-bold text-[#0b3b2c] tracking-tight">MediAdmin</span>
          </div>
          <button
            className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 flex flex-col gap-1.5">
          <button
            onClick={() => handleTabChange('dashboard')}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[14.5px] transition-colors w-full text-left ${activeTab === 'dashboard' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Activity className="w-[18px] h-[18px]" />
            Dashboard Overview
          </button>
          <button
            onClick={() => handleTabChange('doctors')}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[14.5px] transition-colors w-full text-left ${activeTab === 'doctors' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Users className="w-[18px] h-[18px]" />
            Manage Doctors
          </button>
          <button
            onClick={() => handleTabChange('patients')}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[14.5px] transition-colors w-full text-left ${activeTab === 'patients' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <ClipboardList className="w-[18px] h-[18px]" />
            Manage Patients
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* Header */}
        <header className="h-[76px] px-4 sm:px-8 flex items-center justify-between border-b border-gray-100 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 ml-auto">
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 pl-4 sm:pl-6 border-l border-gray-100 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="hidden sm:block">
                <div className="text-[14px] font-bold text-gray-900 leading-tight">{user?.name || 'Admin'}</div>
                <div className="text-[12px] font-medium text-gray-500">System Administrator</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 xl:p-10 flex-1 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto">
            {activeTab === 'dashboard' && (
              <>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">System Overview</h1>
                {loading ? (
                  <p>Loading stats...</p>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <p className="text-[13px] font-medium text-gray-500 mb-1">Total Doctors</p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{stats?.totalDoctors || 0}</h3>
                    </div>
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <p className="text-[13px] font-medium text-gray-500 mb-1">Pending Verifications</p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-orange-600">{stats?.pendingDoctors || 0}</h3>
                    </div>
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <p className="text-[13px] font-medium text-gray-500 mb-1">Total Patients</p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{stats?.totalPatients || 0}</h3>
                    </div>
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <p className="text-[13px] font-medium text-gray-500 mb-1">Total Treatments</p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-emerald-600">{stats?.totalTreatments || 0}</h3>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === 'doctors' && (
              <>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Manage Doctors</h1>
                {loading ? (
                  <p>Loading doctors...</p>
                ) : (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left min-w-[640px]">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                          <tr>
                            <th className="px-4 sm:px-6 py-4 text-[13px] font-bold text-gray-500">Doctor</th>
                            <th className="px-4 sm:px-6 py-4 text-[13px] font-bold text-gray-500">License No</th>
                            <th className="px-4 sm:px-6 py-4 text-[13px] font-bold text-gray-500">Specialization</th>
                            <th className="px-4 sm:px-6 py-4 text-[13px] font-bold text-gray-500">Status</th>
                            <th className="px-4 sm:px-6 py-4 text-[13px] font-bold text-gray-500 text-center">Docs</th>
                            <th className="px-4 sm:px-6 py-4 text-[13px] font-bold text-gray-500 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {doctors.map((doc: any) => (
                            <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-4 sm:px-6 py-4">
                                <div className="text-[14.5px] font-bold text-gray-900">{doc.user.name}</div>
                                <div className="text-[13px] text-gray-500">{doc.user.email}</div>
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-[14px] text-gray-700">{doc.licenseNumber}</td>
                              <td className="px-4 sm:px-6 py-4 text-[14px] text-gray-700">{doc.specialization}</td>
                              <td className="px-4 sm:px-6 py-4">
                                <span className={`px-2.5 py-1 text-[12px] font-bold rounded-md ${doc.verificationStatus === 'APPROVED' ? 'bg-emerald-50 text-emerald-700' :
                                    doc.verificationStatus === 'PENDING' ? 'bg-orange-50 text-orange-700' :
                                      'bg-red-50 text-red-700'
                                  }`}>
                                  {doc.verificationStatus}
                                </span>
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  {doc.verificationDocumentUrl && (
                                    <a 
                                      href={`${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:3000'}/uploads/${doc.verificationDocumentUrl}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                      title="View License"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </a>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 sm:px-6 py-4">
                                <div className="flex items-center justify-end gap-2">
                                  {doc.verificationStatus === 'PENDING' && (
                                    <>
                                      <button
                                        onClick={() => handleVerifyDoctor(doc.userId, 'APPROVED')}
                                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                        title="Approve"
                                      >
                                        <CheckCircle className="w-5 h-5" />
                                      </button>
                                      <button
                                        onClick={() => handleVerifyDoctor(doc.userId, 'REJECTED')}
                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Reject"
                                      >
                                        <XCircle className="w-5 h-5" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === 'patients' && (
              <>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Manage Patients</h1>
                {loading ? (
                  <p>Loading patients...</p>
                ) : (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left min-w-[400px]">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                          <tr>
                            <th className="px-4 sm:px-6 py-4 text-[13px] font-bold text-gray-500">Patient</th>
                            <th className="px-4 sm:px-6 py-4 text-[13px] font-bold text-gray-500">QR ID</th>
                            <th className="px-4 sm:px-6 py-4 text-[13px] font-bold text-gray-500">Date of Birth</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {patients.map((pat: any) => (
                            <tr key={pat.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-4 sm:px-6 py-4">
                                <div className="text-[14.5px] font-bold text-gray-900">{pat.user.name}</div>
                                <div className="text-[13px] text-gray-500">{pat.user.email}</div>
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-[14px] text-gray-700 truncate max-w-[150px]">{pat.qrCodeIdentifier}</td>
                              <td className="px-4 sm:px-6 py-4 text-[14px] text-gray-700">
                                {pat.dateOfBirth ? new Date(pat.dateOfBirth).toLocaleDateString() : '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
