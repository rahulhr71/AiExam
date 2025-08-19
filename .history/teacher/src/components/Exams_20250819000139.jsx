// src/pages/Exams.jsx
import { useState } from "react";

export default function Exams() {
  const [exams, setExams] = useState([
    { id: 1, title: "Math Midterm", description: "Algebra & Geometry", date: "2025-09-01", status: "Scheduled" },
    { id: 2, title: "Science Quiz", description: "Physics basics", date: "2025-09-05", status: "Draft" },
  ]);

  const [newExam, setNewExam] = useState({
    title: "",
    description: "",
    date: "",
    status: "Draft",
  });

  const [editingId, setEditingId] = useState(null);

  const handleAddExam = () => {
    if (!newExam.title || !newExam.date) return;
    setExams([...exams, { ...newExam, id: Date.now() }]);
    setNewExam({ title: "", description: "", date: "", status: "Draft" });
  };

  const handleDelete = (id) => {
    setExams(exams.filter((exam) => exam.id !== id));
  };

  const handleEdit = (exam) => {
    setEditingId(exam.id);
    setNewExam(exam);
  };

  const handleUpdateExam = () => {
    setExams(exams.map((e) => (e.id === editingId ? { ...newExam, id: editingId } : e)));
    setEditingId(null);
    setNewExam({ title: "", description: "", date: "", status: "Draft" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Exams Management</h2>

      {/* Exam Form */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">{editingId ? "Edit Exam" : "Create New Exam"}</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Exam Title"
            value={newExam.title}
            onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={newExam.description}
            onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg"
          />
          <input
            type="date"
            value={newExam.date}
            onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg"
          />
          <select
            value={newExam.status}
            onChange={(e) => setNewExam({ ...newExam, status: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="Draft">Draft</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Published">Published</option>
          </select>

          {editingId ? (
            <button
              onClick={handleUpdateExam}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Update Exam
            </button>
          ) : (
            <button
              onClick={handleAddExam}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Exam
            </button>
          )}
        </div>
      </div>

      {/* Exam List */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Exams List</h3>
        {exams.length === 0 ? (
          <p className="text-gray-500">No exams available.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2">Title</th>
                <th className="border px-3 py-2">Description</th>
                <th className="border px-3 py-2">Date</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr key={exam.id}>
                  <td className="border px-3 py-2">{exam.title}</td>
                  <td className="border px-3 py-2">{exam.description}</td>
                  <td className="border px-3 py-2">{exam.date}</td>
                  <td className="border px-3 py-2">{exam.status}</td>
                  <td className="border px-3 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(exam)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exam.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
