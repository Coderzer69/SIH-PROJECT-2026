import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, ClipboardList, Lock, UserCog, Headphones, 
  Bell, Copy, CalendarDays, ArrowRight 
} from 'lucide-react';
import TreatmentDetails from '../components/TreatmentDetails';
import ProfileSettings from '../components/ProfileSettings';
import HistoryAccess from '../components/HistoryAccess';
import MedicalRecords from '../components/MedicalRecords';
import QrCodeView from '../components/QrCodeView';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';

export default function PatientDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [viewingTreatment, setViewingTreatment] = useState<any>(null);
  const [viewingQr, setViewingQr] = useState(false);

  const [treatments, setTreatments] = useState<any[]>([]);
  const [accessRequests, setAccessRequests] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const fetchDashboardData = async () => {
    try {
      const [treatmentsRes, requestsRes, profileRes] = await Promise.all([
        api.get('/patient/treatments'),
        api.get('/patient/access-requests'),
        api.get('/patient/profile')
      ]);
      setTreatments(treatmentsRes.data);
      setAccessRequests(requestsRes.data);
      setProfile(profileRes.data);
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    }
  };

  useEffect(() => {
    if (activeTab === 'home') {
      fetchDashboardData();
    }
  }, [activeTab]);



  const handleUpdateAccessRequest = async (id: string, status: 'APPROVED' | 'DENIED') => {
    try {
      await api.patch(`/patient/access-requests/${id}`, { status });
      fetchDashboardData(); // Refresh data
    } catch (err) {
      console.error('Failed to update request', err);
      alert('Failed to update request');
    }
  };

  const pendingRequests = accessRequests.filter(r => r.status === 'PENDING');
  const lastTreatment = treatments[0];
  const recentPrescriptions = treatments.flatMap(t => t.prescriptions || []).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex w-full font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-[280px] bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
        {/* Logo */}
        <div className="p-8">
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
          <div className="w-[72px] h-[72px] rounded-full bg-emerald-100 flex items-center justify-center mb-3 shadow-sm border border-gray-100 text-emerald-700 text-2xl font-bold">
            {user?.name?.charAt(0) || 'P'}
          </div>
          <h3 className="text-[17px] font-bold text-gray-900">{user?.name || 'Patient'}</h3>
          <p className="text-[14px] text-gray-500 font-medium">Patient</p>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 flex flex-col gap-1.5">
          <Link 
            to="#" 
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[14.5px] transition-colors ${activeTab === 'home' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Home className="w-[18px] h-[18px]" />
            Home
          </Link>
          <Link 
            to="#"
            onClick={() => setActiveTab('records')}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[14.5px] transition-colors ${activeTab === 'records' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <ClipboardList className="w-[18px] h-[18px]" />
            My Records
          </Link>
          <Link 
            to="#"
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[14.5px] transition-colors ${activeTab === 'history' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Lock className="w-[18px] h-[18px]" />
            History Access
          </Link>
          <Link 
            to="#"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[14.5px] transition-colors ${activeTab === 'profile' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <UserCog className="w-[18px] h-[18px]" />
            Profile & Settings
          </Link>
        </nav>

        {/* Support Section */}
        <div className="p-6 mt-auto">
          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-gray-500 mb-0.5">Need help?</p>
              <Link to="#" className="text-[13px] font-bold text-emerald-700 hover:text-emerald-800">Contact Support</Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-10 xl:p-12 overflow-y-auto h-screen">
        {viewingQr ? (
          <div className="max-w-[900px] mx-auto h-full pb-10">
            <QrCodeView onBack={() => setViewingQr(false)} qrId={profile?.qrCodeIdentifier} />
          </div>
        ) : viewingTreatment ? (
          <div className="max-w-[900px] mx-auto h-full">
            <TreatmentDetails 
              onBack={() => setViewingTreatment(null)} 
              treatment={viewingTreatment}
            />
          </div>
        ) : activeTab === 'profile' ? (
          <div className="max-w-[900px] mx-auto h-full">
            <ProfileSettings onBack={() => setActiveTab('home')} profile={profile} />
          </div>
        ) : activeTab === 'history' ? (
          <div className="max-w-[900px] mx-auto h-full">
            <HistoryAccess 
              onBack={() => setActiveTab('home')} 
              requests={accessRequests}
              onUpdateStatus={handleUpdateAccessRequest}
            />
          </div>
        ) : activeTab === 'records' ? (
          <div className="max-w-[900px] mx-auto h-full">
            <MedicalRecords 
              onBack={() => setActiveTab('home')} 
              treatments={treatments}
              onViewTreatment={(t) => setViewingTreatment(t)}
            />
          </div>
        ) : (
          <div className="max-w-[1000px] mx-auto">
          
          {/* Header */}
          <header className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-1 flex items-center gap-2">
                Good morning, {user?.name} <span className="text-3xl">👋</span>
              </h1>
              <p className="text-gray-500 font-medium">Here's your health overview</p>
            </div>
            <button className="relative p-2.5 bg-white rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
              <Bell className="w-[22px] h-[22px]" />
              <span className="absolute -top-1 -right-1 w-[20px] h-[20px] bg-red-500 text-white text-[11px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                2
              </span>
            </button>
          </header>

          {/* Top Row Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(340px,400px)] gap-6 mb-6">
            
            {/* QR Code Card */}
            <div 
              onClick={() => setViewingQr(true)}
              className="bg-gradient-to-b from-[#f8fdfa] to-white rounded-2xl border border-emerald-50 p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
            >
              <h2 className="text-[18px] font-bold text-gray-900 mb-1">Your QR Code</h2>
              <p className="text-[14px] text-gray-500 font-medium mb-6">Show this QR at the clinic</p>
              
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
                {/* Mock QR Code Image */}
                {profile?.qrCodeIdentifier && (
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${profile.qrCodeIdentifier}`}
                    alt="QR Code" 
                    className="w-[180px] h-[180px] opacity-90"
                  />
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-[14px] font-bold text-gray-900">Patient ID:</span>
                <span className="text-[15px] font-bold text-gray-700 tracking-wide bg-gray-50 px-3 py-1 rounded-lg">{profile?.qrCodeIdentifier || 'Loading...'}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(profile?.qrCodeIdentifier || ''); }}
                  className="text-gray-400 hover:text-gray-600 transition-colors ml-1"
                >
                  <Copy className="w-[18px] h-[18px]" />
                </button>
              </div>
            </div>

            {/* Right Column Cards */}
            <div className="flex flex-col gap-6">
              
              {/* Last Treatment Card */}
              {lastTreatment ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                  <h3 className="text-[17px] font-bold text-gray-900 mb-3">Last Treatment</h3>
                  <p className="text-[13px] font-medium text-gray-500 mb-4 flex items-center gap-1.5">
                    {new Date(lastTreatment.createdAt).toLocaleDateString()}
                  </p>
                  <div className="mb-5">
                    <h4 className="text-[15px] font-bold text-gray-900">Dr. {lastTreatment.doctor?.name || 'Unknown'}</h4>
                    <p className="text-[13.5px] text-gray-500">{lastTreatment.condition}</p>
                  </div>
                  <button 
                    onClick={() => setViewingTreatment(lastTreatment)}
                    className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[14.5px] rounded-xl transition-colors"
                  >
                    View Details
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] text-center py-10">
                  <p className="text-gray-500">No recent treatments.</p>
                </div>
              )}

              {/* Pending Access Request Card */}
              {pendingRequests.length > 0 && (
                <div className="bg-[#fff9f0] rounded-2xl border border-orange-100/50 p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100/40 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="flex justify-between items-start mb-2 relative z-10">
                    <h3 className="text-[16px] font-bold text-gray-900 max-w-[70%]">Pending Access Request</h3>
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-orange-100/70 text-orange-600 flex items-center justify-center font-bold text-sm">
                        {pendingRequests.length}
                      </div>
                    </div>
                  </div>
                  <p className="text-[13.5px] text-gray-600 font-medium mb-5 leading-relaxed max-w-[85%] relative z-10">
                    You have {pendingRequests.length} pending request(s) to view your history.
                  </p>
                  <div className="flex justify-end relative z-10">
                    <button 
                      onClick={() => setActiveTab('history')}
                      className="px-5 py-2 bg-white hover:bg-orange-50 border border-orange-200 text-orange-600 font-bold text-[14px] rounded-xl transition-colors shadow-sm"
                    >
                      Review
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Bottom Row Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(300px,360px)] gap-6">
            
            {/* Recent Treatments List */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <h3 className="text-[17px] font-bold text-gray-900 mb-5">Recent Treatments</h3>
              
              <div className="flex flex-col gap-4">
                {treatments.length === 0 ? (
                  <div className="text-gray-500 text-sm text-center py-4">No treatments found.</div>
                ) : (
                  treatments.slice(0, 3).map((treatment, idx) => (
                    <div key={idx} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg px-2" onClick={() => setViewingTreatment(treatment)}>
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center shrink-0">
                        <CalendarDays className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="w-32">
                        <p className="text-[14.5px] font-bold text-gray-900">{new Date(treatment.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-[14.5px] font-bold text-gray-900">Dr. {treatment.doctor?.name}</p>
                        <p className="text-[13px] font-medium text-gray-500">{treatment.condition}</p>
                      </div>
                      <div>
                        <span className={`px-2.5 py-1 ${treatment.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-700'} text-[12px] font-bold rounded-md`}>
                          {treatment.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Prescriptions List */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col">
              <h3 className="text-[17px] font-bold text-gray-900 mb-5">Recent Prescriptions</h3>
              
              <div className="flex flex-col gap-5 flex-1">
                {recentPrescriptions.length === 0 ? (
                  <div className="text-gray-500 text-sm text-center py-4">No recent prescriptions.</div>
                ) : (
                  recentPrescriptions.map((med: any, idx: number) => (
                    <div key={idx} className="border-b border-gray-50 pb-4">
                      <p className="text-[14.5px] font-bold text-gray-900 mb-1">{med.medicineName} {med.strength}</p>
                      <p className="text-[13.5px] font-medium text-gray-500">{med.frequency} • {med.duration}</p>
                    </div>
                  ))
                )}
              </div>

              <Link to="#" className="mt-6 flex items-center gap-1.5 text-[14px] font-bold text-emerald-700 hover:text-emerald-800 transition-colors">
                View All Medicines <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
          </div>
          
          </div>
        )}
      </main>
      
    </div>
  );
}
