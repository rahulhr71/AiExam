import { useState } from "react";
import axios from "axios";

const CreateExam = () => {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Exam (AI Powered)</h2>
      <form onSubmit={handleGenerate} className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Questions"}
        </button>
      </form>
      {questions.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Generated Questions:</h3>
          <ul className="list-disc pl-6">
            {questions.map((q, idx) => (
              <li key={idx} className="mb-2">{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateExam;