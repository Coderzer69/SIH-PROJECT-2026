import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Mic, Save, Edit, Trash2, Plus, CheckCircle2, Loader2 } from 'lucide-react';
import ReviewTreatment from './ReviewTreatment';
import api from '../lib/api';

interface NewTreatmentProps {
  onBack: () => void;
  patient?: any;
}

export default function NewTreatment({ onBack, patient }: NewTreatmentProps) {
  const [isReviewing, setIsReviewing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);
  
  // Treatment Form State
  const [condition, setCondition] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');
  const [prescriptions, setPrescriptions] = useState<any[]>([]);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(prev => prev + ' ' + currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("Speech Recognition API is not supported in this browser.");
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setTranscript('');
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleDraftFromAudio = async () => {
    if (!transcript.trim()) return;
    setIsDrafting(true);
    try {
      const res = await api.post('/doctor/treatment/draft-from-audio', {
        text: transcript,
        patientId: patient?.id
      });
      const draft = res.data.draft;
      if (draft) {
        setCondition(draft.condition || '');
        setSymptoms(draft.symptoms || '');
        setDiagnosis(draft.diagnosis || '');
        setDoctorNotes(draft.doctorNotes || '');
        if (draft.prescriptions) {
          setPrescriptions(draft.prescriptions);
        }
      }
    } catch (err) {
      console.error('Failed to generate draft', err);
      alert('Failed to generate draft from audio');
    } finally {
      setIsDrafting(false);
    }
  };

  const handleSave = async (confirm: boolean) => {
    if (!patient?.id) {
      alert('No patient selected');
      return;
    }
    try {
      await api.post('/doctor/treatment', {
        patientId: patient.id,
        condition,
        symptoms,
        diagnosis,
        doctorNotes,
        prescriptions,
        status: confirm ? 'CONFIRMED' : 'DRAFT'
      });
      onBack();
    } catch (err) {
      console.error('Failed to save treatment', err);
      alert('Failed to save treatment');
    }
  };

  if (isReviewing) {
    return (
      <div className="pt-2 pb-10">
        <ReviewTreatment 
          patient={patient}
          treatmentData={{
            condition, symptoms, diagnosis, doctorNotes, prescriptions
          }}
          onBack={() => setIsReviewing(false)}
          onEdit={() => setIsReviewing(false)}
          onConfirm={() => {
            handleSave(true);
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full font-sans">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 transition-colors font-bold text-[15px]"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-2xl font-extrabold text-gray-900">New Treatment</h1>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-md text-[13px] font-bold">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-600"></div>
          Draft
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
        
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          
          {/* Patient Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center gap-4">
            <div className="w-[52px] h-[52px] rounded-full bg-[#e6f4ef] text-[#0b3b2c] font-bold text-[16px] flex items-center justify-center shrink-0">
              {patient?.name ? patient.name.charAt(0) : '?'}
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 mb-0.5">{patient?.name || 'Unknown Patient'}</h3>
              <p className="text-[13px] text-gray-500 font-medium">P-ID: {patient?.qrId || 'N/A'}</p>
            </div>
          </div>

          {/* AI Voice Assistant */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col items-center">
            <h3 className="text-[16px] font-bold text-gray-900 self-start mb-6">AI Voice Assistant</h3>
            
            <button 
              onClick={toggleRecording}
              className={`w-20 h-20 transition-colors rounded-full flex flex-col items-center justify-center text-white mb-4 shadow-lg ${isRecording ? 'bg-red-600 hover:bg-red-700 shadow-red-900/20 animate-pulse' : 'bg-[#0b5c46] hover:bg-[#084836] shadow-emerald-900/20'}`}
            >
              <Mic className="w-8 h-8" />
            </button>
            <p className="text-[15px] font-bold text-gray-900 mb-6">
              {isRecording ? 'Listening...' : 'Tap to speak'}
            </p>

            {transcript && (
              <div className="w-full bg-gray-50 p-4 rounded-xl mb-4 text-sm text-gray-700 italic border border-gray-100">
                "{transcript}"
              </div>
            )}

            {transcript && !isRecording && (
              <button 
                onClick={handleDraftFromAudio}
                disabled={isDrafting}
                className="w-full py-2.5 bg-emerald-50 text-emerald-700 font-bold text-[14px] rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isDrafting ? <Loader2 className="w-[18px] h-[18px] animate-spin" /> : <Save className="w-[18px] h-[18px]" />}
                {isDrafting ? 'Drafting...' : 'Generate Treatment Draft'}
              </button>
            )}

          </div>

          {/* AI Suggested Draft (If we want to keep it as a separate section) */}
          {/* <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            ...
          </div> */}

        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          
          {/* Clinical Information */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <h2 className="text-[18px] font-bold text-gray-900 mb-6">Clinical Information</h2>
            
            <div className="flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <label className="text-[14px] font-medium text-gray-600 w-28 shrink-0">Condition</label>
                <div className="relative flex-1">
                  <input 
                    type="text"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    placeholder="E.g. Fever"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14.5px] font-medium text-gray-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-shadow"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <label className="text-[14px] font-medium text-gray-600 w-28 shrink-0">Symptoms</label>
                <input 
                  type="text" 
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="E.g. Sore throat, headache"
                  className="w-full flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14.5px] font-medium text-gray-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-shadow"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <label className="text-[14px] font-medium text-gray-600 w-28 shrink-0">Diagnosis</label>
                <input 
                  type="text" 
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="E.g. Viral pharyngitis"
                  className="w-full flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14.5px] font-medium text-gray-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-shadow"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                <label className="text-[14px] font-medium text-gray-600 w-28 shrink-0 pt-3">Doctor Notes</label>
                <textarea 
                  rows={3}
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  placeholder="Patient reports symptoms..."
                  className="w-full flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14.5px] font-medium text-gray-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-shadow resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Prescriptions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <h2 className="text-[18px] font-bold text-gray-900 mb-6">Prescriptions</h2>
            
            {prescriptions.length === 0 ? (
              <div className="text-center py-6 text-gray-500 text-sm">
                No prescriptions added yet. You can speak to add them or add manually.
              </div>
            ) : (
              prescriptions.map((med, index) => (
                <div key={index} className="border border-gray-100 rounded-2xl p-6 shadow-sm mb-6 relative">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-[18px] font-bold text-gray-900">{med.medicineName}</h3>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-[13px] font-bold transition-colors">
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button 
                        onClick={() => setPrescriptions(prev => prev.filter((_, i) => i !== index))}
                        className="p-1.5 border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
                    <div>
                      <p className="text-[12.5px] font-medium text-gray-500 mb-1">Strength</p>
                      <p className="text-[14.5px] font-bold text-gray-900">{med.strength || '-'}</p>
                    </div>
                    <div>
                      <p className="text-[12.5px] font-medium text-gray-500 mb-1">Dosage</p>
                      <p className="text-[14.5px] font-bold text-gray-900">{med.dosage || '-'}</p>
                    </div>
                    <div>
                      <p className="text-[12.5px] font-medium text-gray-500 mb-1">Frequency</p>
                      <p className="text-[14.5px] font-bold text-gray-900">{med.frequency || '-'}</p>
                    </div>
                    <div>
                      <p className="text-[12.5px] font-medium text-gray-500 mb-1">Duration</p>
                      <p className="text-[14.5px] font-bold text-gray-900">{med.duration || '-'}</p>
                    </div>
                    
                    <div>
                      <p className="text-[12.5px] font-medium text-gray-500 mb-1">Route</p>
                      <p className="text-[14.5px] font-bold text-gray-900">{med.route || '-'}</p>
                    </div>
                    <div className="col-span-3">
                      <p className="text-[12.5px] font-medium text-gray-500 mb-1">Instructions</p>
                      <p className="text-[14.5px] font-bold text-gray-900">{med.instructions || '-'}</p>
                    </div>
                  </div>
                </div>
              ))
            )}

            <button className="w-full py-3.5 border-2 border-dashed border-emerald-600/40 text-emerald-700 font-bold text-[14.5px] rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 mb-8">
              <Plus className="w-5 h-5" />
              Add Medicine
            </button>

            {/* Bottom Actions */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
              <button 
                onClick={() => handleSave(false)}
                className="flex-1 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold text-[15px] rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Save className="w-5 h-5" />
                Save as Draft
              </button>
              <button 
                onClick={() => setIsReviewing(true)}
                className="flex-1 py-3.5 bg-[#0b5c46] hover:bg-[#084836] text-white font-bold text-[15px] rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
              >
                <CheckCircle2 className="w-5 h-5" />
                Review & Confirm
                <span className="font-normal ml-1">→</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
