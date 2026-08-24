import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ArrowRight, Stethoscope, Lock, Shield, Settings,
  CheckCircle2, UserCircle, QrCode, FileText,
  Smartphone, Mic, LockKeyhole, History,
  Bot
} from 'lucide-react';

const Step4Visual = () => {
  return (
    <div className="w-full max-w-[300px] bg-white rounded-2xl p-6 shadow-xl shadow-emerald-900/5 border border-emerald-50 flex flex-col gap-6 relative mx-auto my-auto origin-center">
      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="bg-[#0b3b2c] text-white p-1.5 rounded-lg shadow-sm">
            <Bot className="w-4 h-4" />
          </div>
          <span className="font-bold text-gray-900 text-[13px] tracking-tight">AI Voice <span className="text-emerald-600">Assistant</span></span>
        </div>
        <div className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold border border-emerald-100">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          Active
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center gap-3 z-10">
        {/* Mic with pulse effect */}
        <div className="relative flex items-center justify-center w-12 h-12 flex-shrink-0">
          <div className="absolute w-12 h-12 bg-emerald-50 rounded-full animate-ping opacity-60"></div>
          <div className="absolute w-9 h-9 bg-emerald-100/80 rounded-full"></div>
          <div className="w-9 h-9 relative flex items-center justify-center z-10">
            <Mic className="w-4 h-4 text-emerald-700" />
          </div>
        </div>

        {/* Waveform */}
        <div className="flex-1 flex items-center justify-between h-8 gap-[2px] overflow-hidden px-1">
          {[20, 35, 25, 50, 75, 45, 90, 100, 60, 45, 80, 55, 30, 45, 20].map((h, i) => (
            <div key={i} className="w-[3px] bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-full" style={{ height: `${h}%` }}></div>
          ))}
        </div>
      </div>

      {/* Bottom text */}
      <div className="text-center z-10 -mt-2">
        <span className="text-gray-900 font-bold text-sm tracking-wide">Listening...</span>
      </div>
    </div>
  )
}

const Step5Visual = () => {
  return (
    <div className="w-full max-w-[250px] relative mx-auto my-auto origin-center mt-4 mb-2">
      {/* Clipboard Clip */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="w-4 h-4 rounded-full border-[3px] border-[#0b3b2c] bg-white -mb-1 relative z-10"></div>
        <div className="w-16 h-3.5 bg-[#0b3b2c] rounded-full shadow-sm"></div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-xl shadow-emerald-900/5 border border-emerald-50 flex flex-col relative z-10 pt-6 px-5 pb-5 text-left">
        <h4 className="text-[#0b3b2c] font-bold text-[15px]">Review Treatment</h4>
        <div className="w-full h-px bg-gray-200 mt-2.5 mb-3.5"></div>

        <h3 className="font-extrabold text-gray-900 text-[19px] mb-2.5">Paracetamol</h3>

        <div className="flex flex-col gap-1.5 text-[#4A5568] font-medium text-sm mb-5">
          <div>650 mg</div>
          <div>1 tablet</div>
          <div>Twice daily</div>
          <div>3 days</div>
          <div>After food</div>
        </div>

        <button className="w-full bg-[#0b3b2c] hover:bg-emerald-900 text-white font-bold py-2.5 rounded-[10px] shadow-md text-[13px] transition-colors">
          Confirm Treatment
        </button>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAF9] font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/50 text-emerald-800 text-sm font-medium mb-8">
              Digital Treatment & Prescription Management
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              Your treatment. <br />
              Your record. <br />
              <span className="text-emerald-700">Always with you.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              A simple, secure and intelligent way to manage your treatment records and prescriptions digitally.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/role-selection" className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/doctor/signup" className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-emerald-700 border-2 border-emerald-100 px-8 py-4 rounded-xl text-lg font-semibold transition-colors">
                I'm a Doctor
                <Stethoscope className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-600" />
                Secure
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                Private
              </div>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-emerald-600" />
                Patient Controlled
              </div>
            </div>
          </div>

          {/* Hero Image Mockup */}
          <div className="relative mx-auto w-full max-w-sm sm:max-w-lg lg:max-w-xl xl:max-w-2xl mt-8 lg:mt-0">
            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-50 rounded-full blur-3xl -z-10"></div>

            <img src="/images/hero/hero.png" alt="MediTrack QR Code" className="relative z-10 w-full object-contain sm:scale-110 lg:scale-125" />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto text-center">
        <div className="text-emerald-800 font-bold text-sm tracking-wider uppercase mb-3">How It Works</div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple steps. <span className="text-emerald-700">Smarter care.</span></h2>
        <p className="text-gray-600 mb-16 max-w-2xl mx-auto text-lg">From the clinic to your phone – your treatment journey in a few simple steps.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 lg:gap-x-8 lg:gap-y-14 w-full pt-8 max-w-7xl mx-auto">
          {[
            { step: 1, title: 'Patient QR', desc: 'Every patient gets a unique QR code linked to their profile.', img: '/images/how-it-works/step-1.png' },
            { step: 2, title: 'Doctor Scans', desc: 'Doctor scans the QR code to instantly identify the patient.', img: '/images/how-it-works/step-2.png' },
            { step: 3, title: 'Patient Details Auto-Filled', desc: 'The form is auto-filled with the patient\'s basic details.', img: '/images/how-it-works/step-3.png' },
            { step: 4, title: 'Record & AI Assist', desc: 'Doctor records symptoms, medicines, dosage, and prescriptions. AI converts voice into a structured draft.', customVisual: <Step4Visual /> },
            { step: 5, title: 'Review & Confirm', desc: 'Doctor reviews, edits if needed, and confirms the consultation.', customVisual: <Step5Visual /> }
          ].map((item) => (
            <div key={item.step} className="relative w-full flex flex-col items-center h-full group">
              <div className="w-12 h-12 rounded-full bg-[#0b3b2c] text-white flex items-center justify-center text-lg font-bold absolute -top-6 z-10 border-4 border-[#F8FAF9] shadow-sm">
                {item.step}
              </div>
              <div className="bg-transparent rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md border border-gray-200/60 pt-8 w-full flex flex-col items-center flex-1 transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="font-bold text-gray-900 text-xl mb-3 text-center px-4">{item.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed text-center mb-8 px-4">{item.desc}</p>
                <div className="w-full flex-1 flex items-center justify-center min-h-[220px] p-4">
                  {item.customVisual ? item.customVisual : <img src={item.img} alt={item.title} className="w-[85%] max-w-[240px] h-auto object-contain drop-shadow-sm" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Banner */}
        {/* <div className="mt-20 inline-flex items-center justify-center gap-3 bg-[#F4F9F7] border border-emerald-100 py-4 px-8 rounded-full shadow-sm text-emerald-900 font-medium text-sm">
          <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Trusted by patients and doctors who believe healthcare records should be secure, accessible and private.</span>
        </div> */}
      </section>

      {/* For Patients / For Doctors Split */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">
          {/* For Patients */}
          <div id="for-patients" className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-row items-center overflow-hidden relative flex-1">
            <div className="p-5 sm:p-6 lg:p-5 xl:p-8 flex-1 z-10 relative">
              <div className="flex items-center gap-2 text-emerald-700 font-bold mb-3 md:mb-5 text-base md:text-lg">
                <UserCircle className="w-5 h-5" />
                For Patients
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 md:mb-6 max-w-sm">
                Your health history,<br className="hidden sm:block" />always in your control.
              </h2>
              <ul className="space-y-2.5 md:space-y-3 mb-6 md:mb-8 text-sm">
                {[
                  'View all your consultations',
                  'See medicines & instructions',
                  'Track prescription changes',
                  'Know who accessed your history',
                  'Approve or deny access requests'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="text-emerald-700 font-semibold flex items-center gap-2 border border-emerald-200 px-4 py-2 md:px-5 md:py-2.5 rounded-xl hover:bg-emerald-50 transition-colors w-fit text-sm">
                Learn More <span className="hidden sm:inline">for Patients</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="w-[50%] sm:w-[55%] flex items-center justify-center p-0 sm:p-2 md:p-4 shrink-0 relative overflow-hidden">
              <img src="/images/for-patients/for-patients.png" alt="Patient using app" className="w-full max-w-[200px] sm:max-w-[280px] md:max-w-[400px] h-auto object-contain drop-shadow-sm scale-105 origin-right" />
            </div>
          </div>

          {/* For Doctors */}
          <div id="for-doctors" className="bg-[#f2f9f5] rounded-3xl shadow-sm border border-emerald-100 flex flex-row items-center overflow-hidden relative flex-1">
            <div className="p-5 sm:p-6 lg:p-5 xl:p-8 flex-1 z-10 relative">
              <div className="flex items-center gap-2 text-emerald-800 font-bold mb-3 md:mb-5 text-base md:text-lg">
                <Stethoscope className="w-5 h-5" />
                For Doctors
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 md:mb-6 max-w-sm">
                Focus on your patients.<br className="hidden sm:block" />Leave the paperwork to AI.
              </h2>
              <ul className="space-y-2.5 md:space-y-3 mb-6 md:mb-8 text-sm">
                {[
                  'Speak naturally, type less',
                  'AI drafts structured treatment',
                  'Review, edit and confirm',
                  'Accurate dosage tracking',
                  'Tamper-proof records'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="text-emerald-800 font-semibold flex items-center gap-2 border border-emerald-300 px-4 py-2 md:px-5 md:py-2.5 rounded-xl hover:bg-emerald-100 transition-colors bg-transparent w-fit text-sm">
                Learn More <span className="hidden sm:inline">for Doctors</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="w-[50%] sm:w-[55%] flex items-center justify-center p-0 sm:p-2 md:p-4 shrink-0 relative overflow-hidden">
              <img src="/images/for-doctors/for-dcctors.png" alt="Doctor using tablet" className="w-full max-w-[200px] sm:max-w-[280px] md:max-w-[400px] h-auto object-contain drop-shadow-sm scale-105 origin-right" />
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="security" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-sm border border-gray-100 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="flex-1">
            <div className="text-emerald-700 font-bold text-sm tracking-wider uppercase mb-4">Your Privacy, Your Choice</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">You control who sees your medical history.</h2>
            <p className="text-lg text-gray-600 mb-10">
              Being identified is not the same as giving access. Doctors must request your permission to view your past records.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: <LockKeyhole className="w-4 h-4" />, text: 'Approve or deny access requests' },
                { icon: <History className="w-4 h-4" />, text: 'Temporary access with expiry' },
                { icon: <Settings className="w-4 h-4" />, text: 'See who accessed and when' },
                { icon: <Lock className="w-4 h-4" />, text: 'Revoke access anytime' },
                { icon: <QrCode className="w-4 h-4" />, text: 'Your QR identifies you, not your entire history' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium pt-1">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img src="/images/history-access-req/manage.png" alt="History Access Request Mockup" className="w-full max-w-[280px] h-auto object-contain drop-shadow-xl" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-100">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Verified Doctors', desc: 'All doctors go through a verification process by our platform administrators before they can treat patients.', icon: <UserCircle /> },
            { title: 'Prescription Accuracy', desc: 'AI assists, but doctors decide. Every prescription is reviewed, confirmed and changes are recorded transparently.', icon: <FileText /> },
            { title: 'Secure & Private', desc: 'End-to-end encryption, strict access controls and audit trails keep your health information safe.', icon: <Lock /> },
            { title: 'Always Accessible', desc: 'Access your treatment history anytime, anywhere from your secure account.', icon: <Smartphone /> }
          ].map((feat, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                {feat.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">{feat.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#0b3b2c] rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
          <div className="max-w-xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Your next doctor's visit can be simpler.</h2>
            <p className="text-emerald-100 text-lg">
              No more lost prescriptions. No more repeating your history. <br />
              Just a secure, simple and transparent way to manage your treatment records.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link to="/role-selection" className="flex items-center justify-center gap-2 bg-white text-emerald-800 px-8 py-4 rounded-xl text-lg font-bold hover:bg-emerald-50 transition-colors">
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/doctor/signup" className="flex items-center justify-center gap-2 bg-transparent text-white border border-emerald-400 px-8 py-4 rounded-xl text-lg font-bold hover:bg-emerald-800 transition-colors">
              I'm a Doctor
              <Stethoscope className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <div id="about-us">
        <Footer />
      </div>
    </div>
  );
}
