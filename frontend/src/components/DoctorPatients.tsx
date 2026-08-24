import React, { useState } from 'react';
import { 
  Users, Calendar, UserPlus, Clock, 
  Search, Filter, Plus, ChevronLeft, ChevronRight 
} from 'lucide-react';

interface DoctorPatientsProps {
  patients: any[];
  onAddPatient?: () => void;
}

export default function DoctorPatients({ patients, onAddPatient }: DoctorPatientsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.phone?.includes(searchTerm)
  );

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const thisMonthPatients = patients.filter(p => {
    if (!p.lastVisit) return false;
    const date = new Date(p.lastVisit);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  }).length;

  const newPatients = patients.filter(p => p.treatmentsCount <= 1).length;
  const returningPatients = patients.filter(p => p.treatmentsCount > 1).length;

  return (
    <div className="max-w-[1100px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[26px] font-bold text-gray-900 mb-1">Patients</h1>
          <p className="text-gray-500 font-medium text-[14.5px]">View and manage your patients</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{patients.length}</h3>
            <p className="text-[13px] font-medium text-gray-500">Total Patients</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{thisMonthPatients}</h3>
            <p className="text-[13px] font-medium text-gray-500">This Month</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{newPatients}</h3>
            <p className="text-[13px] font-medium text-gray-500">New Patients</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{returningPatients}</h3>
            <p className="text-[13px] font-medium text-gray-500">Returning Patients</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name, phone or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0b5c46]/20 focus:border-[#0b5c46] transition-all"
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="w-[18px] h-[18px]" />
            All Patients
          </button>
          <button 
            onClick={onAddPatient}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0b5c46] text-white rounded-xl text-[14px] font-bold hover:bg-[#094d3a] transition-colors"
          >
            <Plus className="w-[18px] h-[18px]" />
            Add Patient
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[13px] font-bold text-gray-700">Patient</th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-700">Contact</th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-700">Last Visit</th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-700">Treatments</th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                        <Users className="w-8 h-8" />
                      </div>
                      <h3 className="text-[16px] font-bold text-gray-900 mb-1">No patients found</h3>
                      <p className="text-[14px] text-gray-500 mb-6">
                        {searchTerm ? "No patients match your search criteria." : "You haven't added any patients yet."}
                      </p>
                      {!searchTerm && (
                        <button 
                          onClick={onAddPatient}
                          className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-emerald-100 text-[#0b5c46] rounded-xl text-[14px] font-bold hover:bg-emerald-50 transition-colors"
                        >
                          <Plus className="w-[18px] h-[18px]" />
                          Add Your First Patient
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPatients.map(patient => (
                  <tr key={patient.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#0b5c46] flex items-center justify-center font-bold text-[14px] uppercase">
                          {patient.name?.substring(0, 2) || 'PT'}
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-gray-900">{patient.name}</p>
                          <p className="text-[13px] text-gray-500">ID: {patient.id?.substring(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[14px] text-gray-700">{patient.phone || 'N/A'}</p>
                      <p className="text-[13px] text-gray-500">{patient.email || 'No email'}</p>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-gray-700">
                      {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-gray-700">
                      {patient.treatmentsCount || 0}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-[13px] font-bold text-[#0b5c46] hover:text-[#084836] hover:underline">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[13px] text-gray-500 font-medium">
            Showing {filteredPatients.length} of {patients.length} patients
          </p>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#0b5c46] text-white text-[13px] font-bold flex items-center justify-center">
              1
            </button>
            <button className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 disabled:opacity-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
