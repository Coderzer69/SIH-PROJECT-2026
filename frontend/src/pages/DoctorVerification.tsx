import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, Bell, ChevronDown, LayoutDashboard, 
  Users, Calendar, FileText, Pill, FolderOpen, Settings,
  ShieldCheck, UploadCloud, Lock, FileBadge, HelpCircle
} from 'lucide-react';

export default function DoctorVerification() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex w-full font-sans overflow-hidden text-gray-900">
      
      {/* Sidebar Navigation */}
      <aside className="w-[280px] bg-[#fdfdfd] border-r border-gray-100 flex flex-col h-screen shrink-0 relative z-20">
        {/* Logo */}
        <div className="p-8 pb-6 border-b border-gray-50/50">
          <div className="flex items-center gap-2 mb-1">
            <div className="text-[#0b3b2c]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M7.5 12h2l1.5 -3l2.5 6l1.5 -3h2.5" />
              </svg>
            </div>
            <span className="text-[22px] font-bold text-[#0b3b2c] tracking-tight">MediTrack</span>
          </div>
          <p className="text-[11px] font-medium text-gray-500 pl-10 leading-tight">Digital care. Smart records.</p>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
          <Link 
            to="/doctor/dashboard" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[14.5px] transition-colors text-emerald-700 hover:bg-emerald-50/50"
          >
            <LayoutDashboard className="w-[18px] h-[18px]" />
            Dashboard
          </Link>
          
          <div className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-400 cursor-not-allowed">
            <div className="flex items-center gap-3 font-medium text-[14.5px]">
              <Users className="w-[18px] h-[18px]" />
              Patients
            </div>
            <Lock className="w-3.5 h-3.5 opacity-50" />
          </div>
          
          <div className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-400 cursor-not-allowed">
            <div className="flex items-center gap-3 font-medium text-[14.5px]">
              <Calendar className="w-[18px] h-[18px]" />
              Appointments
            </div>
            <Lock className="w-3.5 h-3.5 opacity-50" />
          </div>
          
          <div className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-400 cursor-not-allowed">
            <div className="flex items-center gap-3 font-medium text-[14.5px]">
              <FileText className="w-[18px] h-[18px]" />
              Treatments
            </div>
            <Lock className="w-3.5 h-3.5 opacity-50" />
          </div>
          
          <div className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-400 cursor-not-allowed">
            <div className="flex items-center gap-3 font-medium text-[14.5px]">
              <Pill className="w-[18px] h-[18px]" />
              Prescriptions
            </div>
            <Lock className="w-3.5 h-3.5 opacity-50" />
          </div>
          
          <div className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-400 cursor-not-allowed">
            <div className="flex items-center gap-3 font-medium text-[14.5px]">
              <FolderOpen className="w-[18px] h-[18px]" />
              Medical History
            </div>
            <Lock className="w-3.5 h-3.5 opacity-50" />
          </div>
          
          <div className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-400 cursor-not-allowed mt-2">
            <div className="flex items-center gap-3 font-medium text-[14.5px]">
              <Settings className="w-[18px] h-[18px]" />
              Settings
            </div>
            <Lock className="w-3.5 h-3.5 opacity-50" />
          </div>
        </nav>

        {/* Need Help Card */}
        <div className="p-6 mt-auto">
          <div className="bg-[#f4f7f6] rounded-2xl p-5 border border-gray-100 flex flex-col items-start text-left">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-700 shadow-sm mb-3">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">Need Help?</h4>
            <p className="text-[12px] text-gray-500 mb-4 leading-relaxed">
              Contact our support team if you face any issues.
            </p>
            <button className="w-full py-2 bg-white border border-emerald-200 text-emerald-700 font-bold text-[13px] rounded-lg shadow-sm hover:bg-emerald-50 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
        
        {/* Top Header */}
        <header className="h-[76px] px-8 flex items-center justify-between border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <button className="text-gray-500 hover:text-gray-700">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="relative w-full max-w-md hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
              <input 
                type="text" 
                placeholder="Search patients, appointments..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[14px] focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100 cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                alt="Dr. Rahul Sharma" 
                className="w-10 h-10 rounded-full object-cover border border-gray-100"
              />
              <div className="hidden sm:block">
                <div className="text-[14px] font-bold text-gray-900 leading-tight">Dr. Rahul Sharma</div>
                <div className="text-[12px] font-medium text-gray-500">General Physician</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-12 lg:px-20 pb-24">
          <div className="max-w-[800px] mx-auto w-full">
            
            {/* Back Link */}
            <button 
              onClick={() => navigate('/doctor/dashboard')}
              className="flex items-center gap-1.5 text-[14px] font-bold text-emerald-700 hover:text-emerald-800 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            
            {/* Header Title */}
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-[52px] h-[52px] rounded-full bg-[#f2f9f5] flex items-center justify-center mb-4">
                <ShieldCheck className="w-7 h-7 text-emerald-700" />
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Get Verified</h1>
              <p className="text-[14.5px] text-gray-500 max-w-md mx-auto leading-relaxed">
                Submit your professional details and documents for verification. 
                Our team will review your application and notify you via email.
              </p>
            </div>

            <div className="space-y-8">
              {/* Section 1: Professional Information */}
              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h2 className="text-[16px] font-bold text-gray-900 mb-6 pb-4 border-b border-gray-50">
                  Professional Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900">
                      Medical License / Registration Number <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      defaultValue="KL-24567"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[14.5px] text-gray-800 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900">
                      Issuing Authority / Medical Council <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 text-[14.5px] text-gray-800 focus:outline-none focus:border-emerald-500 appearance-none bg-white">
                        <option>Kerala Medical Council</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900">
                      Year of Registration <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        defaultValue="2018"
                        className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 text-[14.5px] text-gray-800 focus:outline-none focus:border-emerald-500"
                      />
                      <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900">
                      Specialization <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 text-[14.5px] text-gray-800 focus:outline-none focus:border-emerald-500 appearance-none bg-white">
                        <option>General Medicine</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-900">
                      Qualification (Highest) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 text-[14.5px] text-gray-800 focus:outline-none focus:border-emerald-500 appearance-none bg-white">
                        <option>MBBS</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Verification Documents */}
              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div className="mb-6 pb-4 border-b border-gray-50">
                  <h2 className="text-[16px] font-bold text-gray-900 mb-1">
                    Verification Documents
                  </h2>
                  <p className="text-[13px] text-gray-500 font-medium">
                    Upload clear and valid documents. All files are securely stored.
                  </p>
                </div>
                
                <div className="flex flex-col gap-4">
                  {/* Doc 1 */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors gap-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#f2f9f5] flex items-center justify-center shrink-0">
                        <FileBadge className="w-6 h-6 text-emerald-700" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider mb-1">Required</span>
                        <h4 className="text-[14.5px] font-bold text-gray-900 mb-1">Medical License / Registration Certificate</h4>
                        <p className="text-[13px] text-gray-500 leading-relaxed max-w-sm">
                          Upload your medical license or registration certificate issued by the medical council.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 sm:border-l sm:border-gray-100 sm:pl-6 shrink-0 w-full sm:w-auto">
                      <div className="flex items-center gap-3">
                        <UploadCloud className="w-5 h-5 text-emerald-600" />
                        <div>
                          <div className="text-[13px] font-bold text-gray-900">Upload file <span className="text-gray-500 font-medium">(PDF, JPG, PNG)</span></div>
                          <div className="text-[11px] text-gray-500">Max size 5MB</div>
                        </div>
                      </div>
                      <label className="ml-auto sm:ml-2 px-6 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer text-center inline-block">
                        Browse
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                      </label>
                    </div>
                  </div>

                  {/* Doc 2 */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors gap-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Optional</span>
                        <h4 className="text-[14.5px] font-bold text-gray-900 mb-1">Qualification Certificate</h4>
                        <p className="text-[13px] text-gray-500 leading-relaxed max-w-sm">
                          Upload your degree or qualification certificate (MBBS / MD / MS etc.)
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 sm:border-l sm:border-gray-100 sm:pl-6 shrink-0 w-full sm:w-auto">
                      <div className="flex items-center gap-3">
                        <UploadCloud className="w-5 h-5 text-emerald-600" />
                        <div>
                          <div className="text-[13px] font-bold text-gray-900">Upload file <span className="text-gray-500 font-medium">(PDF, JPG, PNG)</span></div>
                          <div className="text-[11px] text-gray-500">Max size 5MB</div>
                        </div>
                      </div>
                      <label className="ml-auto sm:ml-2 px-6 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer text-center inline-block">
                        Browse
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                      </label>
                    </div>
                  </div>
                  
                  {/* Doc 3 */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors gap-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Optional</span>
                        <h4 className="text-[14.5px] font-bold text-gray-900 mb-1">Other Supporting Document</h4>
                        <p className="text-[13px] text-gray-500 leading-relaxed max-w-sm">
                          Any other relevant document (ID proof, experience certificate, etc.)
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 sm:border-l sm:border-gray-100 sm:pl-6 shrink-0 w-full sm:w-auto">
                      <div className="flex items-center gap-3">
                        <UploadCloud className="w-5 h-5 text-emerald-600" />
                        <div>
                          <div className="text-[13px] font-bold text-gray-900">Upload file <span className="text-gray-500 font-medium">(PDF, JPG, PNG)</span></div>
                          <div className="text-[11px] text-gray-500">Max size 5MB</div>
                        </div>
                      </div>
                      <label className="ml-auto sm:ml-2 px-6 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer text-center inline-block">
                        Browse
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              {/* Warning Banner */}
              <div className="bg-[#f2f9f5] border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
                <div className="shrink-0 text-emerald-700">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-emerald-900">Important</h4>
                  <p className="text-[13px] text-emerald-800">
                    Providing false information or documents may lead to permanent suspension of your account.
                  </p>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => navigate('/doctor/dashboard')}
                  className="px-8 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold text-[14.5px] rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Cancel
                </button>
                <button 
                  className="flex items-center gap-2 px-8 py-3.5 bg-[#0b3b2c] hover:bg-[#082a1f] text-white font-bold text-[14.5px] rounded-xl transition-colors shadow-md shadow-emerald-900/10"
                >
                  <ShieldCheck className="w-5 h-5" />
                  Submit for Verification
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
