import { ChevronLeft, CheckCircle2, Info, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../lib/api';

interface DoctorMedicalHistoryProps {
  onBack: () => void;
  patient?: any;
}

export default function DoctorMedicalHistory({ onBack, patient }: DoctorMedicalHistoryProps) {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/doctor/patient/${patient.id}/history`);
      setRecords(res.data.treatments || []);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch medical history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patient?.id) {
      fetchHistory();
    }
  }, [patient]);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#0b5c46] mb-4" />
        <p className="text-gray-500 font-medium">Loading medical history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full pt-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#0b5c46] hover:text-[#084836] transition-colors font-bold text-[15px] mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full font-sans max-w-[1000px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#0b5c46] hover:text-[#084836] transition-colors font-bold text-[15px]"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl font-extrabold text-gray-900">Treatment History</h1>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#e6f4ef] text-[#0b5c46] rounded-full text-[13px] font-bold border border-[#0b5c46]/20">
            <CheckCircle2 className="w-4 h-4" />
            Access Approved
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-[#f0f5ff] border border-[#d6e4ff] rounded-xl p-4 flex items-center gap-3 mb-6">
        <Info className="w-5 h-5 text-[#2f5ce3]" />
        <span className="text-[14.5px] font-bold text-[#2f5ce3]">
          You are viewing historical records for {patient?.name || 'the patient'} with their approval.
        </span>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No medical history found for this patient.
        </div>
      ) : (
        /* Timeline Card */
        <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">
          {records.map((record, index) => {
            const date = new Date(record.createdAt);
            const dateStr = date.toLocaleDateString([], { month: 'short', day: '2-digit' });
            const yearStr = date.getFullYear().toString();
            const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            return (
              <div key={record.id} className={`flex items-stretch ${index !== records.length - 1 ? 'border-b border-gray-50' : ''}`}>
                
                {/* Date Column */}
                <div className="w-[120px] shrink-0 py-8 px-6 text-right">
                  <div className="text-[15px] font-extrabold text-gray-900">{dateStr}</div>
                  <div className="text-[14px] text-gray-500 font-medium">{yearStr}</div>
                </div>
                
                {/* Timeline Line & Dot */}
                <div className="relative w-10 flex justify-center shrink-0">
                  <div className="w-px bg-gray-200 h-full absolute left-1/2 -translate-x-1/2"></div>
                  <div className="w-[14px] h-[14px] rounded-full border-[3px] border-[#0b5c46] bg-white absolute top-9 z-10"></div>
                </div>

                {/* Content Column */}
                <div className="flex-1 py-8 pr-8 flex justify-between items-start">
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-12 mb-5">
                      <h3 className="font-bold text-[16px] text-gray-900 w-[120px]">Dr. {record.doctor?.name || 'Unknown'}</h3>
                      <span className="text-gray-500 font-medium text-[14.5px]">{timeStr}</span>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start gap-12">
                        <span className="text-[14px] font-medium text-gray-500 w-[120px] shrink-0">Condition</span>
                        <span className="text-[15px] font-bold text-gray-900">{record.condition || 'Not specified'}</span>
                      </div>
                      <div className="flex items-start gap-12">
                        <span className="text-[14px] font-medium text-gray-500 w-[120px] shrink-0">Diagnosis</span>
                        <span className="text-[15px] font-bold text-gray-900">{record.diagnosis || 'Not specified'}</span>
                      </div>
                      
                      {record.prescriptions && record.prescriptions.length > 0 && (
                        <div className="flex items-start gap-12">
                          <span className="text-[14px] font-medium text-gray-500 w-[120px] shrink-0 pt-0.5">Prescriptions</span>
                          <div className="flex flex-col gap-3">
                            {record.prescriptions.map((p: any) => (
                              <div key={p.id}>
                                <p className="text-[15px] font-bold text-gray-900 mb-1">{p.medicine}</p>
                                <p className="text-[13.5px] text-gray-600">
                                  {p.dosage} • {p.frequency} • {p.duration} • {p.route}
                                  {p.instructions ? ` • ${p.instructions}` : ''}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
