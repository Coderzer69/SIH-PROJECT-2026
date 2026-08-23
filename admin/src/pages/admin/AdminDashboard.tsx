import { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Activity, 
  Lock, 
  ChevronDown, 
  Bell, 
  ArrowRight,
  TrendingUp,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsRes = await api.get('/admin/dashboard-stats');
        setStats(statsRes.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
        setError('Failed to load dashboard statistics.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            Welcome back, Admin! <span className="text-2xl">👋</span>
          </h1>
          <p className="text-slate-500 mt-1">Here's what's happening in the system today.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-sm text-slate-600">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Doctors', value: stats.totalDoctors, icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Total Patients', value: stats.totalPatients, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Total Treatments', value: stats.totalTreatments, icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Pending Access Requests', value: stats.pendingRequests, icon: Lock, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-slate-500">{stat.label}</h3>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-xl flex items-center justify-between">
         <div>
            <h3 className="text-lg font-semibold text-blue-900">Manage System</h3>
            <p className="text-sm text-blue-700 mt-1">Navigate through the sidebar to manage doctors, patients, and view audit logs.</p>
         </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
