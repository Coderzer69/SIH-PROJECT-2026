import { ChevronLeft, Calendar, AlertTriangle, Edit3, Check } from 'lucide-react';

interface ReviewTreatmentProps {
  onBack: () => void;
  onConfirm: () => void;
  onEdit: () => void;
  patient: any;
  treatmentData: any;
}

export default function ReviewTreatment({ onBack, onConfirm, onEdit, patient, treatmentData }: ReviewTreatmentProps) {
  return (
    <div className="w-full h-full font-sans max-w-[900px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative">
        <button 
          onClick={onBack}
          className="text-emerald-700 hover:text-emerald-800 transition-colors absolute left-0 flex items-center gap-2 font-bold text-[15px]"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-[22px] font-extrabold text-gray-900 w-full text-center">Review Treatment</h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)] p-8">
        
        {/* Top Info */}
        <div className="flex justify-between items-start pb-8 border-b border-gray-100">
          <div className="flex items-center gap-5">
            <div className="w-[60px] h-[60px] rounded-full bg-[#e6f4ef] text-[#0b3b2c] font-bold text-[18px] flex items-center justify-center shrink-0">
              {patient?.name ? patient.name.charAt(0) : '?'}
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-gray-900 mb-1">{patient?.name || 'Unknown'}</h2>
              <p className="text-[14px] text-gray-500 font-medium">P-ID: {patient?.qrId}</p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 text-gray-500 text-[13px] font-medium mb-1.5">
              <Calendar className="w-4 h-4" />
              Date & Time
            </div>
            <p className="text-[14.5px] font-bold text-gray-900">{new Date().toLocaleString()}</p>
          </div>
        </div>

        {/* Clinical Summary */}
        <div className="py-8 border-b border-gray-100">
          <h3 className="text-[17px] font-bold text-gray-900 mb-6">Clinical Summary</h3>
          
          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <span className="text-[14px] font-medium text-gray-500 w-32 shrink-0">Condition</span>
              <span className="text-[14.5px] font-bold text-gray-900">{treatmentData.condition || '-'}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <span className="text-[14px] font-medium text-gray-500 w-32 shrink-0">Symptoms</span>
              <span className="text-[14.5px] font-bold text-gray-900">{treatmentData.symptoms || '-'}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <span className="text-[14px] font-medium text-gray-500 w-32 shrink-0">Diagnosis</span>
              <span className="text-[14.5px] font-bold text-gray-900">{treatmentData.diagnosis || '-'}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <span className="text-[14px] font-medium text-gray-500 w-32 shrink-0">Doctor Notes</span>
              <span className="text-[14.5px] font-bold text-gray-900">{treatmentData.doctorNotes || '-'}</span>
            </div>
          </div>
        </div>

        {/* Prescription */}
        <div className="py-8">
          <h3 className="text-[17px] font-bold text-gray-900 mb-6">Prescription ({treatmentData.prescriptions?.length || 0})</h3>
          
          {treatmentData.prescriptions?.map((med: any, idx: number) => (
            <div key={idx} className="border border-gray-100 rounded-2xl p-6 shadow-sm mb-8">
              <h4 className="text-[17px] font-bold text-gray-900 mb-6">{med.medicineName}</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
                <div>
                  <p className="text-[13px] font-medium text-gray-500 mb-1">Strength</p>
                  <p className="text-[14.5px] font-bold text-gray-900">{med.strength || '-'}</p>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-gray-500 mb-1">Dosage</p>
                  <p className="text-[14.5px] font-bold text-gray-900">{med.dosage || '-'}</p>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-gray-500 mb-1">Frequency</p>
                  <p className="text-[14.5px] font-bold text-gray-900">{med.frequency || '-'}</p>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-gray-500 mb-1">Duration</p>
                  <p className="text-[14.5px] font-bold text-gray-900">{med.duration || '-'}</p>
                </div>
                
                <div>
                  <p className="text-[13px] font-medium text-gray-500 mb-1">Route</p>
                  <p className="text-[14.5px] font-bold text-gray-900">{med.route || '-'}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-[13px] font-medium text-gray-500 mb-1">Instructions</p>
                  <p className="text-[14.5px] font-bold text-gray-900">{med.instructions || '-'}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Warning Alert */}
          <div className="bg-[#fffcf0] border border-[#f5e6c4] rounded-xl p-5 mb-8 flex items-start gap-4">
            <AlertTriangle className="w-[22px] h-[22px] text-orange-500 shrink-0 mt-0.5" />
            <p className="text-[14px] font-bold text-gray-900 leading-relaxed">
              Please review all medicine names, strength, dosage,<br />
              frequency and duration before confirming.
            </p>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onEdit}
              className="flex-1 py-4 bg-white border border-gray-200 text-gray-900 font-bold text-[15px] rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Edit3 className="w-[18px] h-[18px]" />
              Edit Treatment
            </button>
            <button 
              onClick={onConfirm}
              className="flex-[1.5] py-4 bg-[#0b5c46] hover:bg-[#084836] text-white font-bold text-[15px] rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
            >
              <Check className="w-5 h-5" />
              Confirm Treatment
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
