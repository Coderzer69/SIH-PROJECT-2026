import { useState, useEffect } from 'react';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../lib/api';

const AdminDoctorDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('profile');
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await api.get('/admin/doctors');
        const foundDoctor = response.data.find((d: any) => d.id === id);
        
        if (foundDoctor) {
          setDoctor(foundDoctor);
        } else {
          setError('Doctor not found.');
        }
      } catch (err) {
        console.error("Failed to fetch doctor", err);
        setError('Failed to load doctor details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctor();
    }
  }, [id]);

  const handleVerify = async (status: string) => {
    if (!id) return;
    setIsUpdating(true);
    try {
      await api.patch(`/admin/doctors/${id}/verify`, { status });
      setDoctor({ ...doctor, verificationStatus: status });
    } catch (err) {
      console.error("Failed to update status", err);
      alert('Failed to update doctor status');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
     return (
       <div className="flex justify-center items-center h-screen">
         <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
       </div>
     );
  }

  if (error || !doctor) {
     return (
       <div className="p-8 text-center text-red-600 font-medium">{error || 'Doctor not found'}</div>
     );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      {/* Top Navigation */}
      <button 
        onClick={() => navigate('/admin/doctors')}
        className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Doctors
      </button>

      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Doctor Details</h1>
        <div className="flex gap-3">
          {doctor.verificationStatus !== 'SUSPENDED' && (
            <button 
              onClick={() => handleVerify('SUSPENDED')}
              disabled={isUpdating}
              className="px-6 py-2 bg-orange-50 text-orange-600 border border-orange-200 rounded-lg text-sm font-semibold hover:bg-orange-100 transition-colors shadow-sm disabled:opacity-50"
            >
              Suspend
            </button>
          )}
          {doctor.verificationStatus !== 'REJECTED' && (
            <button 
              onClick={() => handleVerify('REJECTED')}
              disabled={isUpdating}
              className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50"
            >
              Deactivate/Reject
            </button>
          )}
          {doctor.verificationStatus !== 'APPROVED' && (
            <button 
              onClick={() => handleVerify('APPROVED')}
              disabled={isUpdating}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-50"
            >
              Approve
            </button>
          )}
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-3xl">
               {doctor.user?.name?.charAt(0) || 'D'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-slate-900">{doctor.user?.name}</h2>
                <span className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wide uppercase ${
                   doctor.verificationStatus === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                   doctor.verificationStatus === 'PENDING' ? 'bg-orange-50 text-orange-600 border border-orange-200' :
                   doctor.verificationStatus === 'REJECTED' ? 'bg-red-50 text-red-600 border border-red-200' :
                   'bg-slate-100 text-slate-600 border border-slate-300'
                }`}>
                  {doctor.verificationStatus}
                </span>
              </div>
              <p className="text-slate-600 font-medium">{doctor.specialization || 'N/A'}</p>
              <div className="flex gap-6 mt-2 text-sm text-slate-500">
                <p>License Number: <span className="font-medium text-slate-700">{doctor.licenseNumber || 'N/A'}</span></p>
                <p>Email: <span className="font-medium text-slate-700">{doctor.user?.email}</span></p>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-slate-500 space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-100 min-w-[200px]">
            <div className="flex justify-between gap-4">
              <span>Verified By</span>
              <span className="font-medium text-slate-700">{doctor.verifiedById ? 'Admin' : 'None'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50 px-6">
          {[
            { id: 'profile', label: 'Profile' },
            { id: 'documents', label: 'Documents' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-semibold transition-colors border-b-2 ${
                activeTab === tab.id 
                  ? 'border-emerald-500 text-emerald-600 bg-white' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-8">
          {activeTab === 'profile' && (
            <div className="max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">Profile Information</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'Full Name', value: doctor.user?.name },
                  { label: 'Specialization', value: doctor.specialization },
                  { label: 'License Number', value: doctor.licenseNumber },
                  { label: 'Verification Status', value: <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-xs">{doctor.verificationStatus}</span> },
                  { label: 'User ID', value: <span className="font-mono text-xs bg-slate-100 p-1 rounded text-slate-600">{doctor.userId}</span> },
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-3 py-3 border-b border-slate-100 last:border-0">
                    <div className="text-sm text-slate-500 font-medium">{item.label}</div>
                    <div className="col-span-2 text-sm text-slate-900 font-medium">{item.value || 'N/A'}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Verification Documents</h3>
              
              {!doctor.verificationDocumentUrl && !doctor.qualificationDocumentUrl && (
                <div className="text-slate-500 bg-slate-50 p-6 rounded-lg border border-slate-100 text-center">
                  No documents uploaded by this doctor yet.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {doctor.verificationDocumentUrl && (
                  <div className="border border-slate-200 rounded-xl p-6 flex flex-col gap-4">
                    <h4 className="font-bold text-slate-900">Medical License / Registration</h4>
                    <a 
                      href={`http://localhost:3000/uploads/${doctor.verificationDocumentUrl}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-sm font-bold transition-colors text-center border border-emerald-200"
                    >
                      View License Document
                    </a>
                  </div>
                )}
                
                {doctor.qualificationDocumentUrl && (
                  <div className="border border-slate-200 rounded-xl p-6 flex flex-col gap-4">
                    <h4 className="font-bold text-slate-900">Qualification Certificate</h4>
                    <a 
                      href={`http://localhost:3000/uploads/${doctor.qualificationDocumentUrl}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-sm font-bold transition-colors text-center border border-emerald-200"
                    >
                      View Qualification Document
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDoctorDetails;
