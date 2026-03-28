import React from 'react';

const Profile = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 h-32 flex items-end justify-center pb-4">
          <div className="w-24 h-24 rounded-full border-4 border-white bg-slate-300 overflow-hidden translate-y-12">
            <img src="https://api.dicebear.com" alt="Avatar" />
          </div>
        </div>

        {/* User Info */}
        <div className="pt-16 pb-8 px-8 text-center border-b border-slate-100">
          <h1 className="text-2xl font-bold text-slate-800">Alex Tracker</h1>
          <p className="text-slate-500 text-sm">Member since January 2024</p>
        </div>

        {/* Settings Form */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input type="text" defaultValue="Alex Tracker" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input type="email" defaultValue="alex@example.com" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="font-semibold text-slate-800 text-sm">Monthly Report Emails</p>
              <p className="text-xs text-slate-500">Receive a PDF summary every 30 days</p>
            </div>
            <input type="checkbox" className="w-5 h-5 accent-blue-600 cursor-pointer" defaultChecked />
          </div>

          <button className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
