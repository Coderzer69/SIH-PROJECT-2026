import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDoctors from './pages/admin/AdminDoctors';
import AdminDoctorDetails from './pages/admin/AdminDoctorDetails';
import AdminHistoryAccess from './pages/admin/AdminHistoryAccess';
import AdminAuditLogs from './pages/admin/AdminAuditLogs';
import AdminPatients from './pages/admin/AdminPatients';
import AdminTreatments from './pages/admin/AdminTreatments';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/login" element={<AdminLogin />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="doctors" element={<AdminDoctors />} />
              <Route path="doctors/:id" element={<AdminDoctorDetails />} />
              <Route path="patients" element={<AdminPatients />} />
              <Route path="treatments" element={<AdminTreatments />} />
              <Route path="history-requests" element={<AdminHistoryAccess />} />
              <Route path="history-requests/:id" element={<AdminHistoryAccess />} />
              <Route path="audit-logs" element={<AdminAuditLogs />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
