import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RoleSelection from './pages/RoleSelection';
import LoginPage from './pages/LoginPage';
import PatientSignup from './pages/PatientSignup';
import DoctorSignup from './pages/DoctorSignup';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorVerification from './pages/DoctorVerification';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

const DoctorProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.role !== 'DOCTOR') return <Navigate to="/" />;
  

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/patient/signup" element={<PatientSignup />} />
            <Route path="/doctor/signup" element={<DoctorSignup />} />
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route 
              path="/doctor/dashboard" 
              element={
                <DoctorProtectedRoute>
                  <DoctorDashboard />
                </DoctorProtectedRoute>
              } 
            />
            <Route path="/doctor/verify" element={<DoctorVerification />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
