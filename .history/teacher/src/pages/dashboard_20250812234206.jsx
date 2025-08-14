import React, { useState } from "react";
import axios from "axios";

const TeacherDashboard = () => {
  const [topic, setTopic] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState({ mcqs: [], subjective: [] });

  const handleGenerate = async () => {
    if (!topic && !file) {
      alert("Please enter a topic or upload a file");
      return;
    }

    const formData = new FormData();
    if (topic) formData.append("topic", topic);
    if (file) formData.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/generate-questions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
      alert("Error generating questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <textarea
          placeholder="Enter topic or passage..."
          className="w-full border p-2 rounded mb-4"
          rows={5}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        ></textarea>

        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Generate Questions"}
        </button>
      </div>

      {questions.mcqs.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-semibold mb-2">MCQs</h2>
          {questions.mcqs.map((q, index) => (
            <div key={index} className="mb-3">
              <p className="font-medium">{index + 1}. {q.question}</p>
              <ul className="ml-4 list-disc">
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
              <p className="text-green-600 text-sm">Answer: {q.answer}</p>
            </div>
          ))}
        </div>
      )}

      {questions.subjective.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Subjective Questions</h2>
          <ul className="list-decimal ml-5">
            {questions.subjective.map((q, index) => (
              <li key={index} className="mb-2">{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
