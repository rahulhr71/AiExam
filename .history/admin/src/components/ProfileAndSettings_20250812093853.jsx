import React, { useState } from "react";
import { Moon, Sun, Bell, BellOff, CalendarClock } from "lucide-react";

const ProfileAndSettings = () => {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@smartexam.ai",
    role: "Administrator",
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
    alert("Profile updated!");
    // TODO: Connect to backend
  };

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100 rounded-lg">
      {/* Profile Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
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
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-[#152259] mb-6">Settings</h2>
        <div className="space-y-6">
          {/* Dark Mode */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {settings.darkMode ? (
                <Moon className="text-[#152259]" size={20} />
              ) : (
                <Sun className="text-[#152259]" size={20} />
              )}
              <span className="font-medium">Dark Mode</span>
            </div>
            <button
              onClick={() => toggleSetting("darkMode")}
              className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                settings.darkMode ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  settings.darkMode ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>

          {/* Notifications */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {settings.notifications ? (
                <Bell className="text-[#152259]" size={20} />
              ) : (
                <BellOff className="text-[#152259]" size={20} />
              )}
              <span className="font-medium">Notifications</span>
            </div>
            <button
              onClick={() => toggleSetting("notifications")}
              className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                settings.notifications ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  settings.notifications ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>

          {/* Auto Schedule Exams */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CalendarClock className="text-[#152259]" size={20} />
              <span className="font-medium">Auto Schedule Exams</span>
            </div>
            <button
              onClick={() => toggleSetting("autoScheduleExams")}
              className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                settings.autoScheduleExams ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  settings.autoScheduleExams ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAndSettings;
