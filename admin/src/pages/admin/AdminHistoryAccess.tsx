import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import api from '../../lib/api';

const AdminHistoryAccess = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get('/admin/history-requests');
        setRequests(response.data);
      } catch (err) {
        console.error("Failed to fetch history requests", err);
        setError('Failed to load history requests.');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'APPROVED': return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      case 'PENDING': return 'bg-orange-50 text-orange-600 border border-orange-200';
      case 'DENIED': return 'bg-red-50 text-red-600 border border-red-200';
      case 'EXPIRED': return 'bg-slate-100 text-slate-600 border border-slate-300';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">History Access Requests</h1>
        <p className="text-slate-500 mt-1">View patient history access requests</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-[calc(100vh-200px)] flex flex-col">
        <div className="flex-1 overflow-auto">
          {loading ? (
             <div className="flex justify-center items-center h-full">
               <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
             </div>
          ) : error ? (
             <div className="text-center p-8 text-red-600">{error}</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Doctor</th>
                  <th className="px-6 py-4 font-semibold">Patient</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Requested On</th>
                  <th className="px-6 py-4 font-semibold">Expires At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((req: any) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{req.doctor?.name || 'Unknown'}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{req.patient?.name || 'Unknown'}</td>
                    <td className="px-6 py-4">
                       <span className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wide uppercase ${getStatusStyle(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{new Date(req.createdAt).toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-600">{req.expiresAt ? new Date(req.expiresAt).toLocaleString() : 'N/A'}</td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No requests found.
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

export default AdminHistoryAccess;
