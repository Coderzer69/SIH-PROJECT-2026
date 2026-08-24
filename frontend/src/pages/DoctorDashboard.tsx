import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell, User, Settings, Users, PlusCircle,
  Clock, ScanLine, Check, ArrowRight, Home,
  FileCheck, UserCheck, FileEdit, Shield, LogOut, Menu, X
} from 'lucide-react';
import NewTreatment from '../components/NewTreatment';
import DoctorMedicalHistory from '../components/DoctorMedicalHistory';
import DoctorHistoryRequests from '../components/DoctorHistoryRequests';
import ScannerModal from '../components/ScannerModal';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showScanner, setShowScanner] = useState(false);
  const [activePatient, setActivePatient] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [accessRequests, setAccessRequests] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      const [patientsRes, requestsRes, treatmentsRes] = await Promise.all([
        api.get('/doctor/patients'),
        api.get('/doctor/access-requests'),
        api.get('/doctor/treatments').catch(() => ({ data: [] }))
      ]);
      setPatients(patientsRes.data);
      setAccessRequests(requestsRes.data);
      setTreatments(treatmentsRes.data);
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    }
  };

  useEffect(() => {
    if (user?.verificationStatus === 'APPROVED' && (activeTab === 'dashboard' || activeTab === 'history-requests' || activeTab === 'patients')) {
      fetchDashboardData();
    }
  }, [activeTab, user?.verificationStatus]);



  const [treatments, setTreatments] = useState<any[]>([]);
  const pendingRequests = accessRequests.filter(r => r.status === 'PENDING');

  // Derived stat counts from real data
  const totalTreatments = treatments.length;
  const confirmedTreatments = treatments.filter(t => t.status === 'CONFIRMED').length;
  const draftTreatments = treatments.filter(t => t.status === 'DRAFT').length;

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    if (user && user.verificationStatus !== 'APPROVED') {
      navigate('/doctor/verify');
    }
  }, [user, navigate]);

  if (user?.verificationStatus !== 'APPROVED') {
    return null; // Don't render anything while redirecting
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#f8fdfa] font-sans overflow-hidden">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-40 lg:z-auto
        w-[260px] bg-white border-r border-gray-100 flex flex-col h-full
        transition-transform duration-300 ease-in-out shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 lg:p-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-[#0b5c46]">
              {/* New Logo SVG */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>
            <span className="text-[22px] font-extrabold text-[#0b5c46] tracking-tight">MediTrack</span>
          </div>
          <button
            className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile */}
        <div className="px-8 pb-6 flex flex-col items-center mb-2 mt-4">
          <div className="w-[72px] h-[72px] rounded-full bg-emerald-100 flex items-center justify-center mb-3 shadow-sm border border-gray-100 text-emerald-700 text-2xl font-bold">
            {user?.name?.charAt(0) || 'D'}
          </div>
          <h3 className="text-[17px] font-bold text-gray-900">{user?.name || 'Doctor'}</h3>
          <p className="text-[13px] text-gray-500 font-medium mb-3">{user?.specialization || 'Doctor'}</p>
          {user?.verificationStatus === 'APPROVED' && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#e6f4ef] text-[#0b5c46] rounded-full">
              <Check className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold tracking-wide uppercase">Verified</span>
            </div>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 flex flex-col gap-1 overflow-y-auto">
          <Link
            to="#"
            onClick={() => handleTabChange('dashboard')}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[14.5px] transition-colors ${activeTab === 'dashboard' ? 'bg-[#f0f7f4] text-[#0b5c46]' : 'text-slate-600 hover:bg-gray-50'}`}
          >
            <Home className="w-[18px] h-[18px]" />
            Dashboard
          </Link>
          <Link
            to="#"
            onClick={() => handleTabChange('patients')}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[14.5px] transition-colors ${activeTab === 'patients' ? 'bg-[#f0f7f4] text-[#0b5c46]' : 'text-slate-600 hover:bg-gray-50'}`}
          >
            <Users className="w-[18px] h-[18px]" />
            Patients
          </Link>
          <Link
            to="#"
            onClick={() => handleTabChange('new-treatment')}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[14.5px] transition-colors ${activeTab === 'new-treatment' ? 'bg-[#f0f7f4] text-[#0b5c46]' : 'text-slate-600 hover:bg-gray-50'}`}
          >
            <PlusCircle className="w-[18px] h-[18px]" />
            New Treatment
          </Link>
          <Link
            to="#"
            onClick={() => handleTabChange('history')}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[14.5px] transition-colors ${activeTab === 'history' ? 'bg-[#f0f7f4] text-[#0b5c46]' : 'text-slate-600 hover:bg-gray-50'}`}
          >
            <Clock className="w-[18px] h-[18px]" />
            Treatment History
          </Link>
          <Link
            to="#"
            onClick={() => handleTabChange('history-requests')}
            className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-[14.5px] transition-colors ${activeTab === 'history-requests' ? 'bg-[#f0f7f4] text-[#0b5c46]' : 'text-slate-600 hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-3">
              <Shield className="w-[18px] h-[18px]" />
              History Requests
            </div>
            {pendingRequests.length > 0 && (
              <span className="w-[20px] h-[20px] bg-[#ef4444] text-white text-[11px] font-bold flex items-center justify-center rounded-full">
                {pendingRequests.length}
              </span>
            )}
          </Link>

          <div className="my-3 h-px bg-gray-50 w-full"></div>

          <Link
            to="#"
            onClick={() => handleTabChange('profile')}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[14.5px] transition-colors ${activeTab === 'profile' ? 'bg-[#f0f7f4] text-[#0b5c46]' : 'text-slate-600 hover:bg-gray-50'}`}
          >
            <User className="w-[18px] h-[18px]" />
            Profile
          </Link>
          <Link
            to="#"
            onClick={() => handleTabChange('settings')}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[14.5px] transition-colors ${activeTab === 'settings' ? 'bg-[#f0f7f4] text-[#0b5c46]' : 'text-slate-600 hover:bg-gray-50'}`}
          >
            <Settings className="w-[18px] h-[18px]" />
            Settings
          </Link>
        </nav>

        {/* Scan Button */}
        <div className="px-6 pb-8 pt-4 mt-auto flex flex-col gap-3">
          <button
            onClick={() => user?.verificationStatus === 'APPROVED' && setShowScanner(true)}
            disabled={user?.verificationStatus !== 'APPROVED'}
            className={`w-full flex items-center justify-center gap-2.5 py-3.5 bg-white border border-[#0b5c46] text-[#0b5c46] font-bold text-[14.5px] rounded-xl transition-colors shadow-sm ${user?.verificationStatus !== 'APPROVED' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#f0f7f4]'}`}
          >
            <ScanLine className="w-[18px] h-[18px]" />
            Scan Patient
          </button>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-white text-red-600 font-bold text-[14.5px] rounded-xl transition-colors hover:bg-red-50"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-[#0b5c46]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
            <span className="text-lg font-extrabold tracking-tight">MediTrack</span>
          </div>
          <button className="relative p-2 text-gray-500 hover:text-gray-700">
            <Bell className="w-[20px] h-[20px]" />
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
          <div className="max-w-[1100px] mx-auto">

            {activeTab === 'new-treatment' ? (
              <NewTreatment
                patient={activePatient}
                onBack={() => {
                  setActiveTab('dashboard');
                  setActivePatient(null);
                  fetchDashboardData();
                }}
              />
            ) : activeTab === 'history' ? (
              <DoctorMedicalHistory
                patient={activePatient}
                onBack={() => {
                  setActiveTab('history-requests');
                  setActivePatient(null);
                }}
              />
            ) : (
              <>
                {/* Desktop Header */}
                {activeTab !== 'history-requests' && (
                  <header className="hidden lg:flex justify-between items-start mb-8">
                    <div>
                      <h1 className="text-[26px] font-bold text-gray-900 mb-1 flex items-center gap-2">
                        {getGreeting()}, {user?.name} <span className="text-2xl">👋</span>
                      </h1>
                      <p className="text-gray-500 font-medium text-[14.5px]">Here's what's happening today.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="p-2.5 bg-white rounded-full border border-gray-100 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                        <Bell className="w-[20px] h-[20px]" />
                      </button>
                    </div>
                  </header>
                )}

                {/* Mobile page title */}
                {activeTab !== 'history-requests' && (
                  <div className="lg:hidden mb-5">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {getGreeting()}, {user?.name} 👋
                    </h1>
                    <p className="text-gray-500 font-medium text-sm mt-1">Here's what's happening today.</p>
                  </div>
                )}

                {/* Top Cards Section */}
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div
                    onClick={() => setShowScanner(true)}
                    className="flex-1 bg-[#0b5c46] rounded-2xl p-6 sm:p-8 flex items-center justify-between text-white shadow-sm relative overflow-hidden cursor-pointer hover:bg-[#094d3a] transition-colors"
                  >
                    <div className="z-10 max-w-[200px]">
                      <h3 className="text-[17px] sm:text-[19px] font-bold mb-2 sm:mb-3">Scan Patient QR Code</h3>
                      <p className="text-emerald-50/80 text-[13px] sm:text-[14px] leading-relaxed">
                        Identify a patient and start a new treatment
                      </p>
                    </div>
                    <div className="w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] rounded-full border border-emerald-400/30 flex items-center justify-center z-10 shrink-0">
                      <ScanLine className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-300" />
                    </div>
                    <div className="absolute right-[-40px] bottom-[-40px] w-[200px] h-[200px] bg-emerald-500/10 rounded-full blur-2xl"></div>
                  </div>

                  {/* Right Cards: Overview */}
                  <div className="flex-[1.8] bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[15px] font-bold text-gray-900 mb-4">Today's Overview</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                      {/* Stat 1 */}
                      <div className="bg-[#fcfdfd] border border-gray-50 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center">
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2">
                          <FileCheck className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-emerald-600" />
                          <span className="text-[20px] sm:text-[22px] font-bold text-gray-900">{totalTreatments}</span>
                        </div>
                        <p className="text-[11px] sm:text-[12.5px] font-medium text-gray-500">Treatments<br />Created</p>
                      </div>
                      {/* Stat 2 */}
                      <div className="bg-[#fcfdfd] border border-gray-50 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center">
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2">
                          <UserCheck className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-blue-500" />
                          <span className="text-[20px] sm:text-[22px] font-bold text-gray-900">{confirmedTreatments}</span>
                        </div>
                        <p className="text-[11px] sm:text-[12.5px] font-medium text-gray-500">Confirmed<br />Treatments</p>
                      </div>
                      {/* Stat 3 */}
                      <div className="bg-[#fcfdfd] border border-gray-50 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center">
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2">
                          <FileEdit className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-sky-500" />
                          <span className="text-[20px] sm:text-[22px] font-bold text-gray-900">{draftTreatments}</span>
                        </div>
                        <p className="text-[11px] sm:text-[12.5px] font-medium text-gray-500">Draft<br />Treatments</p>
                      </div>
                    </div>
                  </div>
                </div>

                {activeTab === 'history-requests' ? (
                  <DoctorHistoryRequests
                    requests={accessRequests}
                    onRefresh={fetchDashboardData}
                    onViewHistory={(patient) => {
                      setActivePatient(patient);
                      setActiveTab('history');
                    }}
                  />
                ) : (
                  /* Bottom Lists Section */
                  <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4 sm:gap-6">

                    {/* Recent Patients */}
                    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm">
                      <div className="flex justify-between items-center mb-5 sm:mb-6">
                        <h3 className="text-[16px] font-bold text-gray-900">Recent Patients</h3>
                        <button onClick={() => setActiveTab('patients')} className="text-[13px] font-bold text-[#0b5c46] hover:text-[#084836]">View all</button>
                      </div>
                      <div className="flex flex-col gap-4">
                        {patients.length === 0 && (
                          <p className="text-gray-500 text-[14px]">No recent patients found.</p>
                        )}
                        {patients.slice(0, 4).map((p: any) => (
                          <div key={p.id} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                              <div className="w-[42px] h-[42px] rounded-full bg-[#e6f4ef] text-[#0b5c46] font-bold text-[14px] flex items-center justify-center shrink-0 uppercase">
                                {p.name?.substring(0, 2) || 'PT'}
                              </div>
                              <div className="min-w-0">
                                <p className="text-[14.5px] font-bold text-gray-900 mb-0.5 truncate">{p.name || 'Unknown'}</p>
                                <p className="text-[12.5px] text-gray-500">Patient</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 shrink-0 ml-2">
                              <button
                                onClick={() => {
                                  setActivePatient(p);
                                  setActiveTab('new-treatment');
                                }}
                                className="px-3 sm:px-4 py-1.5 border border-[#0b5c46]/30 text-[#0b5c46] font-bold text-[12px] sm:text-[12.5px] rounded-lg hover:bg-[#0b5c46]/5 transition-colors whitespace-nowrap"
                              >
                                New Treatment
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* History Requests Summary */}
                    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm flex flex-col">
                      <div className="flex justify-between items-center mb-5 sm:mb-6">
                        <h3 className="text-[16px] font-bold text-gray-900">History Requests</h3>
                        <button onClick={() => setActiveTab('history-requests')} className="text-[13px] font-bold text-[#0b5c46] hover:text-[#084836]">View all</button>
                      </div>
                      <div className="flex flex-col gap-4 flex-1">
                        {accessRequests.length === 0 && (
                          <p className="text-gray-500 text-[14px]">No history requests found.</p>
                        )}
                        {accessRequests.slice(0, 3).map((req: any) => (
                          <div key={req.id} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                              <div className="w-[42px] h-[42px] rounded-full bg-gray-100 text-gray-600 font-bold text-[14px] flex items-center justify-center shrink-0 uppercase">
                                {req.patient?.name?.substring(0, 2) || 'PT'}
                              </div>
                              <div className="min-w-0">
                                <p className="text-[14.5px] font-bold text-gray-900 mb-0.5 truncate">{req.patient?.name || 'Unknown Patient'}</p>
                                <p className="text-[12.5px] text-gray-500">Requested {new Date(req.createdAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                              <span className={`px-2.5 py-1 text-[11px] font-bold rounded-md uppercase ${req.status === 'PENDING' ? 'bg-orange-50 text-orange-600' :
                                req.status === 'APPROVED' ? 'bg-[#e6f4ef] text-[#0b5c46]' :
                                  'bg-red-50 text-red-600'
                                }`}>
                                {req.status}
                              </span>
                              {req.status === 'APPROVED' && (
                                <span className="text-[11px] font-medium text-[#0b5c46]">
                                  Exp: {new Date(req.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-50">
                        <button
                          onClick={() => setActiveTab('history-requests')}
                          className="flex items-center gap-1.5 text-[13.5px] font-bold text-[#0b5c46] hover:text-[#084836]"
                        >
                          View all requests
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                )}
              </>
            )}

          </div>
        </main>
      </div>

      {showScanner && (
        <ScannerModal
          onClose={() => setShowScanner(false)}
          onPatientFound={(patient) => {
            setActivePatient(patient);
            setShowScanner(false);
            setActiveTab('new-treatment');
          }}
        />
      )}
    </div>
  );
}
