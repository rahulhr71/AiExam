import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const exams = [
    { id: 1, title: "Math Quiz", date: "2025-08-21", status: "Upcoming" },
    { id: 2, title: "Science Test", date: "2025-08-18", status: "Completed" },
  ];

  const results = [
    { id: 1, exam: "Science Test", score: 42, total: 50, feedback: "Good job! Work on diagrams." },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-4">
        <h2 className="text-xl font-bold mb-6">Student Panel</h2>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`block w-full text-left px-3 py-2 rounded-lg ${activeTab === "dashboard" ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("exams")}
            className={`block w-full text-left px-3 py-2 rounded-lg ${activeTab === "exams" ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
          >
            My Exams
          </button>
          <button
            onClick={() => setActiveTab("results")}
            className={`block w-full text-left px-3 py-2 rounded-lg ${activeTab === "results" ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
          >
            My Results
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`block w-full text-left px-3 py-2 rounded-lg ${activeTab === "profile" ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
          >
            Profile
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Welcome Student 👩‍🎓</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-2">Upcoming Exams</h3>
                <ul className="space-y-2">
                  {exams.filter(e => e.status === "Upcoming").map(e => (
                    <li key={e.id} className="border p-2 rounded">
                      {e.title} - {e.date}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-2">Recent Results</h3>
                <ul className="space-y-2">
                  {results.map(r => (
                    <li key={r.id} className="border p-2 rounded">
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
            {exams.map(e => (
              <div key={e.id} className="bg-white p-4 rounded shadow mb-3">
                <h3 className="font-semibold">{e.title}</h3>
                <p className="text-gray-600">Date: {e.date}</p>
                <p>Status: {e.status}</p>
                {e.status === "Upcoming" && (
                  <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Start Exam
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "results" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">My Results</h1>
            {results.map(r => (
              <div key={r.id} className="bg-white p-4 rounded shadow mb-3">
                <h3 className="font-semibold">{r.exam}</h3>
                <p>Score: {r.score}/{r.total}</p>
                <p className="text-gray-600">Feedback: {r.feedback}</p>
                <button className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "profile" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            <div className="bg-white p-4 rounded shadow space-y-3">
              <input type="text" placeholder="Full Name" className="w-full border px-3 py-2 rounded" />
              <input type="email" placeholder="Email" className="w-full border px-3 py-2 rounded" />
              <input type="password" placeholder="New Password" className="w-full border px-3 py-2 rounded" />
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Update Profile
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
