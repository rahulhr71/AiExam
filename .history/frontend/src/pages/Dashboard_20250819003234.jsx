import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
   const navigate = useNavigate();
  const exams = [
    { id: 1, title: "Math Quiz", date: "2025-08-21", status: "Upcoming" },
    { id: 2, title: "Science Test", date: "2025-08-18", status: "Completed" },
  ];

  const results = [
    { id: 1, exam: "Science Test", score: 42, total: 50, feedback: "Good job! Work on diagrams." },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (collapsible on mobile) */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-200 z-20 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-4 flex items-center justify-between md:block">
          <h2 className="text-xl font-bold">Student Panel</h2>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            ✖
          </button>
        </div>

        <nav className="space-y-2 p-4">
          {["dashboard", "exams", "results", "profile"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSidebarOpen(false); // close sidebar on mobile
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg capitalize ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 ml-0 md:ml-64 transition-all">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <button
            className="px-3 py-2 bg-blue-600 text-white rounded"
            onClick={() => setSidebarOpen(true)}
          >
            ☰ Menu
          </button>
          <h1 className="text-lg font-bold capitalize">{activeTab}</h1>
        </div>

        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Welcome Student 👩‍🎓</h1>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-2">Upcoming Exams</h3>
                <ul className="space-y-2">
                  {exams
                    .filter((e) => e.status === "Upcoming")
                    .map((e) => (
                      <li key={e.id} className="border p-2 rounded text-sm sm:text-base">
                        {e.title} - {e.date}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-2">Recent Results</h3>
                <ul className="space-y-2">
                  {results.map((r) => (
                    <li key={r.id} className="border p-2 rounded text-sm sm:text-base">
                      {r.exam}: {r.score}/{r.total}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "exams" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">My Exams</h1>
            <div className="space-y-3">
              {exams.map((e) => (
                <div key={e.id} className="bg-white p-4 rounded shadow">
                  <h3 className="font-semibold">{e.title}</h3>
                  <p className="text-gray-600 text-sm">Date: {e.date}</p>
                  <p className="text-sm">Status: {e.status}</p>
                  {e.status === "Upcoming" && (
                    <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                      Start Exam
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "results" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">My Results</h1>
            <div className="space-y-3">
              {results.map((r) => (
                <div key={r.id} className="bg-white p-4 rounded shadow">
                  <h3 className="font-semibold">{r.exam}</h3>
                  <p className="text-sm">Score: {r.score}/{r.total}</p>
                  <p className="text-gray-600 text-sm">Feedback: {r.feedback}</p>
                  <button className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            <div className="bg-white p-4 rounded shadow space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border px-3 py-2 rounded text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border px-3 py-2 rounded text-sm"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full border px-3 py-2 rounded text-sm"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                Update Profile
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
