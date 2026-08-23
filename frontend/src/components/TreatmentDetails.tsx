import { ChevronLeft, Calendar, FileText, ChevronRight, Copy } from 'lucide-react';

interface TreatmentDetailsProps {
  onBack: () => void;
}

export default function TreatmentDetails({ onBack }: TreatmentDetailsProps) {
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
        <div className="flex justify-between items-center px-8 py-5 border-b border-gray-50">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span className="font-medium text-[15px]">Aug 22, 2026 • 10:35 AM</span>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[13px] font-bold rounded-md">
            Completed
          </span>
        </div>

        {/* Doctor Info */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-50">
          <div className="flex items-center gap-4">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
              alt="Dr. Sharma" 
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-[19px] font-bold text-gray-900 mb-0.5">Dr. Sharma</h3>
              <p className="text-[15px] text-gray-500 mb-1.5">General Physician</p>
              <div className="flex items-center gap-2 text-[14px] text-gray-600">
                <span>License No: MP-12345</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-white border border-gray-200 text-emerald-700 font-bold text-[14px] rounded-xl hover:bg-emerald-50 transition-colors shadow-sm">
            View Doctor Profile
          </button>
        </div>

        {/* Treatment Info */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-[150px_1fr] gap-y-6">
            <div className="text-[15px] font-medium text-gray-500">Condition</div>
            <div className="text-[15px] font-bold text-gray-900">Fever</div>

            <div className="text-[15px] font-medium text-gray-500">Diagnosis</div>
            <div className="text-[15px] font-bold text-gray-900">Sore throat, headache</div>

            <div className="text-[15px] font-medium text-gray-500">Doctor Notes</div>
            <div className="text-[15px] font-bold text-gray-900 leading-relaxed">
              Patient reports symptoms for 2 days.<br />
              No breathing difficulty.
            </div>
          </div>
        </div>
      </div>

      {/* Prescriptions Section */}
      <div>
        <h2 className="text-[18px] font-bold text-gray-900 mb-4">Prescriptions (1)</h2>
        
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[18px] font-bold text-gray-900">Paracetamol</h3>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[13px] font-bold rounded-md">
                Prescribed
              </span>
            </div>

            <div className="grid grid-cols-4 gap-y-6 gap-x-4 mb-2">
              <div>
                <p className="text-[13px] font-medium text-gray-500 mb-1">Strength</p>
                <p className="text-[15px] font-bold text-gray-900">650 mg</p>
              </div>
              <div>
                <p className="text-[13px] font-medium text-gray-500 mb-1">Dosage</p>
                <p className="text-[15px] font-bold text-gray-900">1 tablet</p>
              </div>
              <div>
                <p className="text-[13px] font-medium text-gray-500 mb-1">Frequency</p>
                <p className="text-[15px] font-bold text-gray-900">Twice daily</p>
              </div>
              <div>
                <p className="text-[13px] font-medium text-gray-500 mb-1">Duration</p>
                <p className="text-[15px] font-bold text-gray-900">3 days</p>
              </div>
              
              <div>
                <p className="text-[13px] font-medium text-gray-500 mb-1">Route</p>
                <p className="text-[15px] font-bold text-gray-900">Oral</p>
              </div>
              <div className="col-span-3">
                <p className="text-[13px] font-medium text-gray-500 mb-1">Instructions</p>
                <p className="text-[15px] font-bold text-gray-900">After food</p>
              </div>
            </div>
          </div>

          <div className="bg-[#f4f7fb] px-6 py-4 border-t border-gray-100 flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-[#2e5a95] shrink-0 mt-0.5" />
            <div>
              <p className="text-[14px] font-bold text-[#2e5a95] mb-1">Amendments</p>
              <p className="text-[14px] font-medium text-[#466a9d]">No amendments for this treatment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
