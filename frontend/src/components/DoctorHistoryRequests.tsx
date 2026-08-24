import { Eye } from 'lucide-react';
import { useState } from 'react';

interface DoctorHistoryRequestsProps {
  requests?: any[];
  onRefresh?: () => void;
  onViewHistory?: (patient: any) => void;
}

export default function DoctorHistoryRequests({ requests = [], onViewHistory }: DoctorHistoryRequestsProps) {
  const [tab, setTab] = useState<'PENDING' | 'APPROVED' | 'ALL'>('ALL');

  const filteredRequests = requests.filter(req => {
    if (tab === 'ALL') return true;
    return req.status === tab;
  });

  const pendingCount = requests.filter(r => r.status === 'PENDING').length;
  const approvedCount = requests.filter(r => r.status === 'APPROVED').length;

  const getExpiresIn = (expiresAt: string) => {
    const diff = new Date(expiresAt).getTime() - new Date().getTime();
    if (diff <= 0) return 'Expired';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m left`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-8">
      
      {/* Header & Tabs */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-6">History Requests</h2>
          <div className="flex items-center gap-8 border-b border-gray-100">
            <button 
              onClick={() => setTab('ALL')}
              className={`pb-4 font-bold text-[14.5px] flex items-center gap-2 ${tab === 'ALL' ? 'border-b-2 border-[#0b5c46] text-[#0b5c46]' : 'text-gray-500'}`}
            >
              All Requests
              <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center ${tab === 'ALL' ? 'bg-[#e6f4ef] text-[#0b5c46]' : 'bg-gray-100 text-gray-500'}`}>
                {requests.length}
              </span>
            </button>
            <button 
              onClick={() => setTab('PENDING')}
              className={`pb-4 font-bold text-[14.5px] flex items-center gap-2 ${tab === 'PENDING' ? 'border-b-2 border-[#0b5c46] text-[#0b5c46]' : 'text-gray-500'}`}
            >
              Pending Requests
              <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center ${tab === 'PENDING' ? 'bg-[#e6f4ef] text-[#0b5c46]' : 'bg-gray-100 text-gray-500'}`}>
                {pendingCount}
              </span>
            </button>
            <button 
              onClick={() => setTab('APPROVED')}
              className={`pb-4 font-bold text-[14.5px] flex items-center gap-2 ${tab === 'APPROVED' ? 'border-b-2 border-[#0b5c46] text-[#0b5c46]' : 'text-gray-500'}`}
            >
              Approved Requests
              <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center ${tab === 'APPROVED' ? 'bg-[#e6f4ef] text-[#0b5c46]' : 'bg-gray-100 text-gray-500'}`}>
                {approvedCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_0.8fr_0.8fr] gap-4 py-4 border-b border-gray-100 text-[12.5px] font-bold text-gray-500">
        <div>Patient</div>
        <div>Requested On</div>
        <div>Requested By</div>
        <div>Reason</div>
        <div>Expires In</div>
        <div>Status</div>
        <div className="text-right">Actions</div>
      </div>

      {/* Requests List */}
      <div className="flex flex-col">
        {filteredRequests.length === 0 ? (
          <p className="text-gray-500 py-8 text-center">No requests found.</p>
        ) : (
          filteredRequests.map((req: any) => (
            <div key={req.id} className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_0.8fr_0.8fr] gap-4 py-5 border-b border-gray-50 items-center">
              <div className="flex items-center gap-4">
                <div className="w-[42px] h-[42px] rounded-full bg-gray-100 text-gray-600 font-bold text-[14px] flex items-center justify-center shrink-0 uppercase">
                  {req.patient?.name?.substring(0, 2) || 'PT'}
                </div>
                <div>
                  <p className="text-[14.5px] font-bold text-gray-900 mb-0.5">{req.patient?.name || 'Unknown Patient'}</p>
                </div>
              </div>
              <div>
                <p className="text-[13.5px] text-gray-600 font-medium mb-0.5">
                  {new Date(req.createdAt).toLocaleDateString()}
                </p>
                <p className="text-[12.5px] text-gray-400">
                  {new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div>
                <p className="text-[14px] font-bold text-gray-900 mb-0.5">Dr. {req.doctor?.name || 'You'}</p>
              </div>
              <div className="text-[13px] text-gray-600 leading-relaxed max-w-[140px]">
                {req.reason || 'Medical review'}
              </div>
              <div>
                {req.status === 'APPROVED' && req.expiresAt ? (
                  new Date(req.expiresAt) > new Date() ? (
                    <>
                      <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded mb-1">
                        {getExpiresIn(req.expiresAt)}
                      </span>
                      <p className="text-[11.5px] text-gray-400">({new Date(req.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})</p>
                    </>
                  ) : (
                    <span className="text-[12.5px] font-bold text-[#0b5c46] mb-0.5 block">Expired</span>
                  )
                ) : (
                  <span className="text-gray-400 text-[12.5px]">-</span>
                )}
              </div>
              <div>
                <span className={`px-3 py-1 text-[12px] font-bold rounded-md uppercase ${
                  req.status === 'PENDING' ? 'bg-orange-50 text-orange-600' :
                  req.status === 'APPROVED' ? 'bg-[#e6f4ef] text-[#0b5c46]' :
                  'bg-red-50 text-red-600'
                }`}>
                  {req.status}
                </span>
              </div>
              <div className="flex items-center justify-end">
                {req.status === 'APPROVED' && onViewHistory && (
                  <button 
                    onClick={() => onViewHistory(req.patient)}
                    className="w-[90px] py-1.5 border border-gray-200 text-gray-700 font-bold text-[12.5px] rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
