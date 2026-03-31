import React, { useState } from "react";
import API from "../../api";

const Settings = ({ userId }) => {
  const [settings, setSettings] = useState({
    language: "English (US)",
    theme: "light",
    emailAlerts: true
  });

  const handleUpdate = async (field, value) => {
    const updatedData = { ...settings, [field]: value };
    setSettings(updatedData); // Optimistic UI update
    try {
      await API.put(`/settings/update/${userId}`, updatedData);
    } catch (err) {
      console.error("Failed to save setting", err);
    }
  };

  return (
    <div className="p-6 space-y-8 bg-white rounded-xl border border-slate-200">
      <div>
        <h2 className="text-lg font-bold text-slate-800">General Settings</h2>
        <p className="text-sm text-slate-500">Manage your language and display preferences.</p>
      </div>

      <div className="space-y-4">
        {/* Language Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Interface Language</label>
          <select 
            value={settings.language} 
            onChange={(e) => handleUpdate('language', e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        {/* Theme Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Appearance</label>
          <div className="flex gap-4">
            {['light', 'dark', 'system'].map((t) => (
              <button 
                key={t}
                onClick={() => handleUpdate('theme', t)}
                className={`px-4 py-2 rounded-md capitalize ${settings.theme === t ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
