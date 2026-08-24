import { ChevronLeft, ListFilter, ChevronRight } from 'lucide-react';

interface MedicalRecordsProps {
  onBack: () => void;
  treatments: any[];
  onViewTreatment: (treatment: any) => void;
}

export default function MedicalRecords({ onBack, treatments, onViewTreatment }: MedicalRecordsProps) {
  return (
    <div className="w-full h-full font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
        </div>
        <button className="flex items-center gap-2 text-emerald-700 font-medium hover:text-emerald-800 transition-colors">
          <ListFilter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Timeline List */}
      <div className="relative ml-2">
        {treatments.length > 0 && (
          <div className="absolute top-6 bottom-0 left-[7px] w-[2px] bg-emerald-700"></div>
        )}

        {treatments.length === 0 && (
          <p className="text-gray-500 py-10">No medical records found.</p>
        )}

        {treatments.map((t) => (
          <div key={t.id} className="relative mb-6 sm:mb-8 flex gap-4 sm:gap-6">
            <div className="w-4 h-4 rounded-full border-[3px] border-emerald-700 bg-white z-10 shrink-0 mt-[14px]"></div>
            
            {/* Date & Time */}
            <div className="hidden sm:block w-28 shrink-0 pt-2.5">
              <h3 className="text-[15px] font-bold text-gray-900 mb-1">
                {new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </h3>
              <p className="text-[14px] text-gray-500">
                {new Date(t.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {/* Record Card */}
            <div 
              onClick={() => onViewTreatment(t)}
              className="flex-1 min-w-0 bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] cursor-pointer hover:shadow-md transition-shadow"
            >
              {/* Mobile date */}
              <p className="sm:hidden text-[12px] text-gray-500 mb-3">
                {new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <div className="flex justify-between items-start mb-4 gap-2">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base sm:text-lg shrink-0">
                    {t.doctor?.name?.charAt(0) || 'D'}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[15px] sm:text-[16px] font-bold text-gray-900 truncate">Dr. {t.doctor?.name || 'Unknown'}</h4>
                    <p className="text-[13px] text-gray-500">Doctor</p>
                  </div>
                </div>
                <span className="px-2.5 sm:px-3 py-1 bg-emerald-50 text-emerald-700 text-[12px] sm:text-[13px] font-bold rounded-md shrink-0">
                  {t.status}
                </span>
              </div>

              <div className="relative">
                <h5 className="text-[15px] sm:text-[16px] font-bold text-gray-900 mb-1 pr-8">{t.condition || 'N/A'}</h5>
                <p className="text-[13px] sm:text-[14px] text-gray-500 mb-4 pr-8">
                  Diagnosis: {t.diagnosis || 'Pending'}
                </p>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              <p className="text-[13px] sm:text-[14px] font-medium text-emerald-700">{t.prescriptions?.length || 0} Prescription(s)</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
