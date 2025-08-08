import React, { useState } from 'react';

const ProfileAndSettings = () => {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@smartexam.ai',
    role: 'Administrator',
  });

  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    autoScheduleExams: true,
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated!');
    // TODO: Connect to backend
  };

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100 rounded-lg">
      {/* Profile Section */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-[#152259] mb-4">My Profile</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              type="email"
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Role</label>
            <input
              name="role"
              value={profile.role}
              disabled
              className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            className="bg-[#152259] text-white px-4 py-2 rounded hover:bg-blue-900"
          >
            Save Profile
          </button>
        </form>
      </div>

      {/* Settings Section */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-[#152259] mb-4">Settings</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Dark Mode</span>
            <button
              onClick={() => toggleSetting('darkMode')}
              className={`px-3 py-1 rounded text-sm ${
                settings.darkMode ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}
            >
              {settings.darkMode ? 'On' : 'Off'}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Notifications</span>
            <button
              onClick={() => toggleSetting('notifications')}
              className={`px-3 py-1 rounded text-sm ${
                settings.notifications ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}
            >
              {settings.notifications ? 'On' : 'Off'}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Auto Schedule Exams</span>
            <button
              onClick={() => toggleSetting('autoScheduleExams')}
              className={`px-3 py-1 rounded text-sm ${
                settings.autoScheduleExams ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}
            >
              {settings.autoScheduleExams ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAndSettings;
