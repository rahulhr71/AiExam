import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Megaphone,
  Settings,
} from "lucide-react";
import Students from "../components/Students";
import ExamList from '../components/Exams'
import Results from '../components/Results'
function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      className={`border border-gray-300 px-3 py-2 rounded-lg w-full ${className}`}
      {...props}
    />
  );
}

function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`border border-gray-300 px-3 py-2 rounded-lg w-full ${className}`}
      {...props}
    />
  );
}

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "students", label: "Students", icon: <Users size={18} /> },
    { id: "exams", label: "Exams", icon: <FileText size={18} /> },
    { id: "results", label: "Results", icon: <BarChart3 size={18} /> },
    { id: "announcements", label: "Announcements", icon: <Megaphone size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-6">Teacher Panel</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200
                ${activeTab === item.id ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-gray-600">Total Students</h2>
                <p className="text-3xl font-bold">120</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-gray-600">Upcoming Exams</h2>
                <p className="text-3xl font-bold">5</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-gray-600">Pending Results</h2>
                <p className="text-3xl font-bold">8</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <ul className="space-y-2 text-gray-700">
                <li>📌 New exam scheduled: Mathematics - 20th Aug</li>
                <li>📌 10 new students registered</li>
                <li>📌 Result published: Science Test</li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="flex gap-4">
                <Button>➕ Add Student</Button>
                <Button>📝 Create Exam</Button>
                <Button>📢 Make Announcement</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <Students/>
        )}

        {activeTab === "exams" && (
          <ExamList/>
        )}

        {activeTab === "results" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Results</h1>
            <p className="text-gray-600">View and analyze student results.</p>
          </div>
        )}

        {activeTab === "announcements" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Announcements</h1>
            <Textarea placeholder="Write an announcement..." />
            <Button className="mt-2">Publish</Button>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <p className="text-gray-600">Teacher profile and preferences.</p>
          </div>
        )}
      </main>
    </div>
  );
}
