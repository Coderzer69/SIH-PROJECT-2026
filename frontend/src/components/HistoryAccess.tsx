import { ChevronLeft, CheckCircle2 } from 'lucide-react';

interface HistoryAccessProps {
  onBack: () => void;
  requests: any[];
  onUpdateStatus: (id: string, status: 'APPROVED' | 'DENIED') => void;
}

export default function HistoryAccess({ onBack, requests, onUpdateStatus }: HistoryAccessProps) {
  const pendingRequests = requests.filter(r => r.status === 'PENDING');
  const activeRequests = requests.filter(r => r.status === 'APPROVED' && new Date(r.expiresAt) > new Date());
  const logRequests = requests.filter(r => r.status === 'DENIED' || (r.status === 'APPROVED' && new Date(r.expiresAt) <= new Date()));

  const getExpiresIn = (expiresAt: string) => {
    const diff = new Date(expiresAt).getTime() - new Date().getTime();
    if (diff <= 0) return 'Expired';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="w-full h-full font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={onBack}
          className="text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">History Access</h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-6 mb-8">
        
        {/* Pending Requests */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-[18px] font-bold text-gray-900">Pending Requests</h2>
            {pendingRequests.length > 0 && (
              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[12px] font-bold">
                {pendingRequests.length}
              </span>
            )}
          </div>

          {pendingRequests.length === 0 ? (
            <p className="text-gray-500 text-sm">No pending requests.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {pendingRequests.map(req => (
                <div key={req.id} className="bg-[#fffcf7] border border-orange-100/60 rounded-xl p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xl shrink-0">
                      {req.doctor?.name?.charAt(0) || 'D'}
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-gray-900 mb-1">Dr. {req.doctor?.name || 'Unknown'}</h3>
                      <p className="text-[13px] text-gray-500 mb-2">
                        Requested on {new Date(req.createdAt).toLocaleDateString()} • {new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <button 
                      onClick={() => onUpdateStatus(req.id, 'APPROVED')}
                      className="w-full sm:w-[140px] py-2.5 bg-[#0b6e4f] hover:bg-[#095940] text-white font-bold text-[14px] rounded-lg transition-colors shadow-sm"
                    >
                      Allow
                    </button>
                    <button 
                      onClick={() => onUpdateStatus(req.id, 'DENIED')}
                      className="w-full sm:w-[140px] py-2.5 bg-white border border-red-500 text-red-600 hover:bg-red-50 font-bold text-[14px] rounded-lg transition-colors shadow-sm"
                    >
                      Deny
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Access */}
        <div className="mb-8">
          <h2 className="text-[18px] font-bold text-gray-900 mb-4">Active Access</h2>

          {activeRequests.length === 0 ? (
            <p className="text-gray-500 text-sm">No active access.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {activeRequests.map(req => (
                <div key={req.id} className="bg-[#f5faf7] border border-emerald-100/60 rounded-xl p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl shrink-0">
                      {req.doctor?.name?.charAt(0) || 'D'}
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-gray-900 mb-1">Dr. {req.doctor?.name || 'Unknown'}</h3>
                      <p className="text-[13px] text-gray-500 mb-2">Granted on {new Date(req.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2.5 bg-emerald-50/50 border border-emerald-200 text-emerald-800 text-center rounded-xl min-w-[110px]">
                      <p className="text-[13px] font-bold mb-0.5">Expires in</p>
                      <p className="text-[15px] font-bold">{getExpiresIn(req.expiresAt)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Access Log */}
        <div>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-[18px] font-bold text-gray-900">Access Log</h2>
          </div>

          <div className="flex flex-col">
            {logRequests.length === 0 ? (
              <p className="text-gray-500 text-sm py-4">No access logs.</p>
            ) : (
              logRequests.map((req, idx) => (
                <div key={req.id} className={`flex items-center justify-between py-4 ${idx !== logRequests.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${req.status === 'DENIED' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-gray-50 border-gray-100 text-gray-600'}`}>
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-gray-900 mb-0.5">Dr. {req.doctor?.name || 'Unknown'}</p>
                      <p className="text-[13px] text-gray-500">{req.status === 'DENIED' ? 'Denied on' : 'Accessed on'} {new Date(req.updatedAt).toLocaleDateString()} • {new Date(req.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-[12px] font-bold rounded-md ${req.status === 'DENIED' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                    {req.status === 'DENIED' ? 'Denied' : 'Expired'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
