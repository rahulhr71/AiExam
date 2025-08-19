import { useState } from "react";

export default function Setting() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "teacher@example.com",
    password: "",
    theme: "light",
    notifications: true,
  });

  // Handle profile update
  const handleUpdate = () => {
    alert("Settings updated successfully ✅");
    console.log("Updated Settings:", profile);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        {/* Profile Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Profile</h3>
          <div className="space-y-3">
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Full Name"
              className="w-full border px-3 py-2 rounded-lg"
            />
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              placeholder="Email Address"
              className="w-full border px-3 py-2 rounded-lg"
            />
            <input
              type="password"
              value={profile.password}
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
              placeholder="New Password"
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Preferences</h3>
          <div className="space-y-3">
            <select
              value={profile.theme}
              onChange={(e) => setProfile({ ...profile, theme: e.target.value })}
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="light">🌞 Light Theme</option>
              <option value="dark">🌙 Dark Theme</option>
            </select>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={profile.notifications}
                onChange={(e) =>
                  setProfile({ ...profile, notifications: e.target.checked })
                }
              />
              <span>Enable Email Notifications</span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
