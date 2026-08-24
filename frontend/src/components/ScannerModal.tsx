import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { X } from 'lucide-react';
import api from '../lib/api';

interface ScannerModalProps {
  onClose: () => void;
  onPatientFound: (patient: any) => void;
}

export default function ScannerModal({ onClose, onPatientFound }: ScannerModalProps) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScan = async (text: string) => {
    if (loading || !text) return;
    setLoading(true);
    setError('');
    
    try {
      const res = await api.get(`/doctor/patient/${text}`);
      // The API returns the patient inside res.data, so let's pass it
      // Based on doctorController.ts, scanPatientQr returns:
      // { patientId, name, qrIdentifier }
      onPatientFound(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch patient details');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white/50 hover:bg-white rounded-full"
        >
          <X className="w-5 h-5 text-gray-800" />
        </button>
        
        <div className="p-6 pb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Scan Patient QR Code</h2>
          <p className="text-sm text-gray-500 mb-4">Point your camera at the patient's QR code to start a new treatment.</p>
        </div>
        
        <div className="w-full bg-black aspect-square relative">
          <Scanner
            onScan={(detectedCodes) => {
              if (detectedCodes && detectedCodes.length > 0) {
                handleScan(detectedCodes[0].rawValue);
              }
            }}
            onError={(error) => console.log(error)}
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 text-sm text-center">
            {error}
          </div>
        )}
        {loading && (
          <div className="p-4 bg-blue-50 text-blue-600 text-sm text-center">
            Fetching patient details...
          </div>
        )}
      </div>
    </div>
  );
}
