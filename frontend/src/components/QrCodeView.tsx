import { ArrowLeft, Scan, Copy, Lock, Info } from 'lucide-react';


interface QrCodeViewProps {
  onBack: () => void;
  qrId?: string;
}

export default function QrCodeView({ onBack, qrId }: QrCodeViewProps) {
  const patientQrId = qrId || 'Unknown';

  return (
    <div className="w-full h-full font-sans max-w-[600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative">
        <button 
          onClick={onBack}
          className="text-emerald-700 hover:text-emerald-800 transition-colors absolute left-0"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 w-full text-center">My QR Code</h1>
      </div>

      {/* Main QR Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-8 mb-6 flex flex-col items-center text-center">
        
        <div className="flex items-center gap-2 text-gray-900 font-bold text-[17px] mb-1">
          <Scan className="w-5 h-5 text-emerald-700" />
          Show this QR at the clinic
        </div>
        <p className="text-[14px] text-gray-500 mb-8">The doctor will scan to identify you</p>

        {/* QR Code Container */}
        <div className="relative p-6 mb-8 inline-block">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-emerald-700 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-emerald-700 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-emerald-700 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-emerald-700 rounded-br-lg"></div>
          
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${patientQrId}`}
            alt="Patient QR Code" 
            className="w-[200px] h-[200px]"
          />
        </div>

        <p className="text-[13px] font-medium text-gray-500 mb-1">Patient ID</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-[18px] font-bold text-gray-900">{patientQrId}</span>
          <button 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => navigator.clipboard.writeText(patientQrId)}
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Privacy Info Card */}
      <div className="bg-[#f5faf7] border border-emerald-100/60 rounded-2xl p-6">
        <div className="flex items-start gap-4 mb-5">
          <Lock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-[15px] font-bold text-gray-900 mb-1">Your privacy is important</h3>
            <p className="text-[13.5px] text-gray-600 leading-relaxed">
              This QR code only contains a unique identifier.<br />
              It does not contain any of your medical records.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[14px] font-bold text-emerald-700 pl-9 cursor-pointer hover:text-emerald-800 transition-colors">
          <Info className="w-4 h-4" />
          How QR & privacy works
        </div>
      </div>

    </div>
  );
}
