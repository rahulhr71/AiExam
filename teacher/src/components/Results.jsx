import { useState } from "react";

export default function Results() {
  const [results, setResults] = useState([
    { id: 1, student: "Rahul Sharma", exam: "Math Midterm", score: 85, grade: "A", status: "Passed" },
    { id: 2, student: "Priya Verma", exam: "Science Quiz", score: 45, grade: "D", status: "Failed" },
  ]);

  const [newResult, setNewResult] = useState({
    student: "",
    exam: "",
    score: "",
    grade: "",
    status: "Pending",
  });

  const [editingId, setEditingId] = useState(null);

  // Add new result
  const handleAddResult = () => {
    if (!newResult.student || !newResult.exam || !newResult.score) return;

    setResults([...results, { ...newResult, id: Date.now() }]);
    setNewResult({ student: "", exam: "", score: "", grade: "", status: "Pending" });
  };

  // Delete result
  const handleDelete = (id) => {
    setResults(results.filter((res) => res.id !== id));
  };

  // Edit result
  const handleEdit = (res) => {
    setEditingId(res.id);
    setNewResult(res);
  };

  // Update result
  const handleUpdateResult = () => {
    setResults(results.map((r) => (r.id === editingId ? { ...newResult, id: editingId } : r)));
    setEditingId(null);
    setNewResult({ student: "", exam: "", score: "", grade: "", status: "Pending" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Results Management</h2>

      {/* Result Form */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">{editingId ? "Edit Result" : "Add New Result"}</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Student Name"
            value={newResult.student}
            onChange={(e) => setNewResult({ ...newResult, student: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Exam Name"
            value={newResult.exam}
            onChange={(e) => setNewResult({ ...newResult, exam: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg"
          />
          <input
            type="number"
            placeholder="Score"
            value={newResult.score}
            onChange={(e) => setNewResult({ ...newResult, score: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Grade"
            value={newResult.grade}
            onChange={(e) => setNewResult({ ...newResult, grade: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg"
          />
          <select
            value={newResult.status}
            onChange={(e) => setNewResult({ ...newResult, status: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="Pending">Pending</option>
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
          </select>

          {editingId ? (
            <button
              onClick={handleUpdateResult}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Update Result
            </button>
          ) : (
            <button
              onClick={handleAddResult}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Result
            </button>
          )}
        </div>
      </div>

      {/* Results List */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Results List</h3>
        {results.length === 0 ? (
          <p className="text-gray-500">No results available.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2">Student</th>
                <th className="border px-3 py-2">Exam</th>
                <th className="border px-3 py-2">Score</th>
                <th className="border px-3 py-2">Grade</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res) => (
                <tr key={res.id}>
                  <td className="border px-3 py-2">{res.student}</td>
                  <td className="border px-3 py-2">{res.exam}</td>
                  <td className="border px-3 py-2">{res.score}</td>
                  <td className="border px-3 py-2">{res.grade}</td>
                  <td className="border px-3 py-2">{res.status}</td>
                  <td className="border px-3 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(res)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(res.id)}
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
