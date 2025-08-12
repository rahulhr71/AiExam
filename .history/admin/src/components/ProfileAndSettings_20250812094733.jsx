import React, { useState } from "react";
import {
  Moon,
  Sun,
  Bell,
  BellOff,
  CalendarClock,
  Globe,
  ShieldCheck,
  Mail,
  Database,
  Clock
} from "lucide-react";

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
    language: "English",
    twoFactorAuth: false,
    emailReports: "Weekly",
    autoBackup: true,
    examReminder: "30 minutes before",
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated!");
  };

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const updateSetting = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100 rounded-lg">
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

     
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-[#152259] mb-6">Settings</h2>
        <div className="space-y-6">
         
          <ToggleSetting
            icon={settings.darkMode ? <Moon /> : <Sun />}
            label="Dark Mode"
            active={settings.darkMode}
            toggle={() => toggleSetting("darkMode")}
          />

       
          <ToggleSetting
            icon={settings.notifications ? <Bell /> : <BellOff />}
            label="Notifications"
            active={settings.notifications}
            toggle={() => toggleSetting("notifications")}
          />

         
          <ToggleSetting
            icon={<CalendarClock />}
            label="Auto Schedule Exams"
            active={settings.autoScheduleExams}
            toggle={() => toggleSetting("autoScheduleExams")}
          />

         
          <SelectSetting
            icon={<Globe />}
            label="Language"
            value={settings.language}
            options={["English", "Hindi", "Spanish", "French"]}
            onChange={(val) => updateSetting("language", val)}
          />

          <ToggleSetting
            icon={<ShieldCheck />}
            label="Two-Factor Authentication"
            active={settings.twoFactorAuth}
            toggle={() => toggleSetting("twoFactorAuth")}
          />

     
          <SelectSetting
            icon={<Mail />}
            label="Email Reports"
            value={settings.emailReports}
            options={["Daily", "Weekly", "Monthly", "None"]}
            onChange={(val) => updateSetting("emailReports", val)}
          />

     
          <ToggleSetting
            icon={<Database />}
            label="Auto Backup Data"
            active={settings.autoBackup}
            toggle={() => toggleSetting("autoBackup")}
          />

  
          <SelectSetting
            icon={<Clock />}
            label="Exam Reminder"
            value={settings.examReminder}
            options={[
              "15 minutes before",
              "30 minutes before",
              "1 hour before",
              "1 day before",
            ]}
            onChange={(val) => updateSetting("examReminder", val)}
          />
        </div>
      </div>
    </div>
  );
};


const ToggleSetting = ({ icon, label, active, toggle }) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-3 text-[#152259]">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    <button
      onClick={toggle}
      className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
        active ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
          active ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </button>
  </div>
);


const SelectSetting = ({ icon, label, value, options, onChange }) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-3 text-[#152259]">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-2 py-1 text-sm"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default ProfileAndSettings;
