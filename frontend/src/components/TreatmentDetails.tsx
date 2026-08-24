import { ChevronLeft, Calendar, FileText } from 'lucide-react';

interface TreatmentDetailsProps {
  onBack: () => void;
  treatment?: any;
}

export default function TreatmentDetails({ onBack, treatment }: TreatmentDetailsProps) {
  if (!treatment) {
    return <div className="p-8">Loading treatment details...</div>;
  }

  const prescriptions = treatment.prescriptions || [];
  const amendments = treatment.amendments || [];

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
        <h1 className="text-2xl font-bold text-gray-900">Treatment Details</h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] mb-8 overflow-hidden">
        {/* Treatment Date & Status */}
        <div className="flex flex-wrap justify-between items-center gap-3 px-5 sm:px-8 py-5 border-b border-gray-50">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span className="font-medium text-[15px]">
              {new Date(treatment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[13px] font-bold rounded-md">
            {treatment.status}
          </span>
        </div>

        {/* Doctor Info */}
        <div className="flex flex-wrap justify-between items-center gap-4 px-5 sm:px-8 py-6 border-b border-gray-50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-xl">
              {treatment.doctor?.name?.charAt(0) || 'D'}
            </div>
            <div>
              <h3 className="text-[19px] font-bold text-gray-900 mb-0.5">Dr. {treatment.doctor?.name || 'Unknown'}</h3>
              <p className="text-[15px] text-gray-500 mb-1.5">Doctor</p>
            </div>
          </div>
        </div>

        {/* Treatment Info */}
        <div className="px-5 sm:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-y-4 sm:gap-y-6">
            <div className="text-[15px] font-medium text-gray-500 sm:pt-0">Condition</div>
            <div className="text-[15px] font-bold text-gray-900">{treatment.condition || 'N/A'}</div>

            <div className="text-[15px] font-medium text-gray-500">Diagnosis</div>
            <div className="text-[15px] font-bold text-gray-900">{treatment.diagnosis || 'N/A'}</div>

            <div className="text-[15px] font-medium text-gray-500">Doctor Notes</div>
            <div className="text-[15px] font-bold text-gray-900 leading-relaxed whitespace-pre-wrap">
              {treatment.doctorNotes || 'No notes provided.'}
            </div>
          </div>
        </div>
      </div>

      {/* Prescriptions Section */}
      <div>
        <h2 className="text-[18px] font-bold text-gray-900 mb-4">Prescriptions ({prescriptions.length})</h2>

        {prescriptions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] text-gray-500 text-sm">
            No prescriptions for this treatment.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {prescriptions.map((p: any) => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[18px] font-bold text-gray-900">{p.medicineName}</h3>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[13px] font-bold rounded-md">
                      Prescribed
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-5 sm:gap-y-6 gap-x-4 mb-2">
                    <div>
                      <p className="text-[13px] font-medium text-gray-500 mb-1">Strength</p>
                      <p className="text-[15px] font-bold text-gray-900">{p.strength || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-gray-500 mb-1">Dosage</p>
                      <p className="text-[15px] font-bold text-gray-900">{p.dosage || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-gray-500 mb-1">Frequency</p>
                      <p className="text-[15px] font-bold text-gray-900">{p.frequency || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-gray-500 mb-1">Duration</p>
                      <p className="text-[15px] font-bold text-gray-900">{p.duration || 'N/A'}</p>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-[13px] font-medium text-gray-500 mb-1">Route</p>
                      <p className="text-[15px] font-bold text-gray-900">{p.route || 'N/A'}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-3">
                      <p className="text-[13px] font-medium text-gray-500 mb-1">Instructions</p>
                      <p className="text-[15px] font-bold text-gray-900">{p.instructions || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Amendments */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] overflow-hidden">
          <div className="bg-[#f4f7fb] px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#2e5a95] shrink-0" />
            <div>
              <p className="text-[14px] font-bold text-[#2e5a95]">Amendments ({amendments.length})</p>
            </div>
          </div>
          {amendments.length === 0 ? (
            <div className="p-6">
              <p className="text-[14px] font-medium text-gray-500">No amendments for this treatment.</p>
            </div>
          ) : (
            <div className="p-6">
              {amendments.map((a: any) => (
                <div key={a.id} className="mb-4 last:mb-0 border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <p className="text-[13px] text-gray-500 mb-1">{new Date(a.createdAt).toLocaleDateString()}</p>
                  <p className="text-[14.5px] font-medium text-gray-900">{a.reason || 'No reason provided'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}