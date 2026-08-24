import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  Activity, 
  FileClock, 
  ShieldAlert, 
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Doctors', href: '/admin/doctors', icon: UserSquare2 },
    { name: 'Patients', href: '/admin/patients', icon: Users },
    { name: 'Treatments', href: '/admin/treatments', icon: Activity },
    { name: 'History Access Requests', href: '/admin/history-requests', icon: FileClock },
    { name: 'Audit Logs', href: '/admin/audit-logs', icon: ShieldAlert },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-slate-800">
      {/* Sidebar */}
      <div className="w-64 bg-[#0F2926] text-white flex flex-col h-full flex-shrink-0">
        {/* Logo area */}
        <div className="p-6 flex items-center gap-3">
          <div className="bg-emerald-500/10 p-2 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">MediTrack</h1>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Admin Panel</p>
          </div>
        </div>

        {/* User Profile */}
        <div className="px-6 pb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-white overflow-hidden border border-gray-600">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <p className="text-sm font-semibold text-white truncate max-w-[120px]">{user?.name || 'Admin User'}</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1.5 uppercase font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              Super Administrator
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/admin/dashboard' && location.pathname.startsWith(item.href));
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-emerald-500/10 text-emerald-400' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                <span className="flex-1">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 mt-auto border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <main className="flex-1 overflow-y-auto w-full h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
