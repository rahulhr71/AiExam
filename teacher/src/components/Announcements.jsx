import { useState } from "react";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Holiday Notice", description: "School will remain closed on 20th Aug.", date: "2025-08-20" },
    { id: 2, title: "Exam Schedule", description: "Midterm exams will start from 1st Sep.", date: "2025-09-01" },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Add new announcement
  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.description || !newAnnouncement.date) return;
    setAnnouncements([...announcements, { ...newAnnouncement, id: Date.now() }]);
    setNewAnnouncement({ title: "", description: "", date: "" });
  };

  // Delete announcement
  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  // Edit announcement
  const handleEdit = (a) => {
    setEditingId(a.id);
    setNewAnnouncement(a);
  };

  // Update announcement
  const handleUpdateAnnouncement = () => {
    setAnnouncements(announcements.map((a) => (a.id === editingId ? { ...newAnnouncement, id: editingId } : a)));
    setEditingId(null);
    setNewAnnouncement({ title: "", description: "", date: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Announcements</h2>

      {/* Announcement Form */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">
          {editingId ? "Edit Announcement" : "Add New Announcement"}
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            value={newAnnouncement.title}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={newAnnouncement.description}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, description: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg"
          />
          <input
            type="date"
            value={newAnnouncement.date}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, date: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg"
          />

          {editingId ? (
            <button
              onClick={handleUpdateAnnouncement}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Update Announcement
            </button>
          ) : (
            <button
              onClick={handleAddAnnouncement}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Announcement
            </button>
          )}
        </div>
      </div>

      {/* Announcement List */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">All Announcements</h3>
        {announcements.length === 0 ? (
          <p className="text-gray-500">No announcements available.</p>
        ) : (
          <ul className="space-y-3">
            {announcements.map((a) => (
              <li
                key={a.id}
                className="p-3 border rounded-lg flex justify-between items-start"
              >
                <div>
                  <h4 className="font-semibold text-lg">{a.title}</h4>
                  <p className="text-gray-600">{a.description}</p>
                  <p className="text-sm text-gray-500">Date: {a.date}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(a)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
