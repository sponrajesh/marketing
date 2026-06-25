import React from 'react';
import { useApp } from '../../context/AppContext';

const Settings = () => {
  const { settings, setSettings } = useApp();

  const update = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 print:hidden">
      <h2 className="text-lg font-bold mb-4">Market Configuration</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <input 
            className="w-full border p-2 rounded" 
            value={settings.companyName} 
            onChange={(e) => update('companyName', e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input 
            className="w-full border p-2 rounded" 
            value={settings.address} 
            onChange={(e) => update('address', e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Commission %</label>
          <input 
            type="number"
            className="w-full border p-2 rounded" 
            value={settings.commission} 
            onChange={(e) => update('commission', parseFloat(e.target.value) || 0)} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Display Language</label>
          <select 
            className="w-full border p-2 rounded" 
            value={settings.language} 
            onChange={(e) => update('language', e.target.value)}
          >
            <option value="en">English</option>
            <option value="ta">Tamil (தமிழ்)</option>
            <option value="hi">Hindi (हिन्दी)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;