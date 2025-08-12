import { useState } from "react";
import axios from "axios";

const CreateExam = () => {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [editText, setEditText] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedExam, setSavedExam] = useState(null); // <-- NEW

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setQuestions([]);
    try {
      // POST to your backend API that uses OpenAI to generate questions
      const res = await axios.post("http://localhost:4000/api/exams/generate", {
        subject,
        topic,
      });
      setQuestions(res.data.questions);
    } catch (err) {
      alert("Failed to generate questions");
    }
    setLoading(false);
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditText(questions[idx]);
  };

  const handleEditSave = (idx) => {
    const updated = [...questions];
    updated[idx] = editText;
    setQuestions(updated);
    setEditIdx(null);
    setEditText("");
  };

  const handleRemove = (idx) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleClearAll = () => {
    setQuestions([]);
  };

  const handleSaveExam = async () => {
    setSaving(true);
    try {
      await axios.post("http://localhost:4000/api/exams/save", {
        subject,
        topic,
        questions,
      });
      setSavedExam({ subject, topic, questions }); // <-- Save for preview
      alert("Exam saved successfully!");
      setQuestions([]);
      setSubject("");
      setTopic("");
    } catch (err) {
      alert("Failed to save exam");
    }
    setSaving(false);
  };

  return (
    <div className="bg-white p-8 rounded shadow max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Create Exam <span className="text-sm text-gray-500">(AI Powered)</span></h2>
      <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-blue-400 flex-1"
          required
        />
        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-blue-400 flex-1"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded font-semibold shadow hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-blue-400 rounded-full"></span>
              Generating...
            </span>
          ) : "Generate"}
        </button>
      </form>

      {questions.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg text-gray-700">Preview Questions</h3>
            <button
              onClick={handleClearAll}
              className="text-red-500 hover:underline text-sm"
            >
              Clear All
            </button>
          </div>
          <ul className="bg-gray-50 rounded p-4">
            {questions.map((q, idx) => (
              <li key={idx} className="mb-3 flex items-start gap-2">
                <span className="font-bold text-blue-600">{idx + 1}.</span>
                {editIdx === idx ? (
                  <div className="flex flex-col flex-1 gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      className="border px-2 py-1 rounded flex-1"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSave(idx)}
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditIdx(null)}
                        className="bg-gray-300 px-2 py-1 rounded text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="flex-1">{q}</span>
                    <button
                      onClick={() => handleEdit(idx)}
                      className="text-blue-500 hover:underline text-xs ml-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemove(idx)}
                      className="text-red-500 hover:underline text-xs ml-2"
                    >
                      Remove
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={handleSaveExam}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded font-semibold shadow hover:bg-green-700 transition"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Exam"}
          </button>
        </div>
      )}

      {/* Exam Paper Preview */}
      {savedExam && (
        <div className="mt-10 border-t pt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Exam Paper Preview</h3>
          <div className="bg-gray-50 rounded p-6 shadow">
            <div className="mb-2">
              <span className="font-semibold text-gray-700">Subject:</span> {savedExam.subject}
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Topic:</span> {savedExam.topic}
            </div>
            <ol className="list-decimal pl-6">
              {savedExam.questions.map((q, idx) => (
                <li key={idx} className="mb-3 text-gray-900">{q}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateExam;