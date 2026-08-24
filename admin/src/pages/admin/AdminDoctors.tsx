import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

const AdminDoctors = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const queryParams = statusFilter !== 'all' ? `?status=${statusFilter}` : '';
        const response = await api.get(`/admin/doctors${queryParams}`);
        setDoctors(response.data);
      } catch (err) {
        console.error("Failed to fetch doctors", err);
        setError('Failed to load doctors list.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [statusFilter]);

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'APPROVED': return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      case 'PENDING': return 'bg-orange-50 text-orange-600 border border-orange-200';
      case 'REJECTED': return 'bg-red-50 text-red-600 border border-red-200';
      case 'SUSPENDED': return 'bg-slate-100 text-slate-600 border border-slate-300';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredDoctors = doctors.filter((doc: any) => 
    doc.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.licenseNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Doctors</h1>
        <p className="text-slate-500 mt-1">Manage and verify doctor accounts</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-200px)]">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="relative w-80">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search doctors..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="all">All Status</option>
              <option value="APPROVED">Approved</option>
              <option value="PENDING">Pending</option>
              <option value="REJECTED">Rejected</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {loading ? (
             <div className="flex justify-center items-center h-full">
               <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
             </div>
          ) : error ? (
             <div className="text-center p-8 text-red-600">{error}</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Doctor</th>
                  <th className="px-6 py-4 font-semibold">Specialization</th>
                  <th className="px-6 py-4 font-semibold">License No.</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDoctors.map((doc: any) => (
                  <tr 
                    key={doc.id} 
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/admin/doctors/${doc.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                           {doc.user?.name?.charAt(0) || 'D'}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{doc.user?.name}</p>
                          <p className="text-xs text-slate-500">{doc.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{doc.specialization || 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-600">{doc.licenseNumber || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wide uppercase ${getStatusStyle(doc.verificationStatus)}`}>
                        {doc.verificationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        className="text-emerald-600 hover:text-emerald-800 font-medium text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/doctors/${doc.id}`);
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredDoctors.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No doctors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDoctors;
