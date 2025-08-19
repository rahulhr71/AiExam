import { useState } from "react";

export default function TakeExam() {
  // Mock exam data
  const [exam] = useState({
    id: 1,
    title: "Math Quiz",
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "What is 5 + 7?",
        options: ["10", "11", "12", "13"],
        answer: "12", // backend will check
      },
      {
        id: 2,
        type: "mcq",
        question: "Square root of 49?",
        options: ["6", "7", "8", "9"],
        answer: "7",
      },
      {
        id: 3,
        type: "subjective",
        question: "Explain the Pythagoras theorem with an example.",
      },
    ],
  });

  const [responses, setResponses] = useState({}); // store answers

  const handleAnswer = (qid, value) => {
    setResponses({ ...responses, [qid]: value });
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", responses);
    alert("Exam submitted! ✅ (AI will evaluate subjective answers)");
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{exam.title}</h1>

      <div className="space-y-6">
        {exam.questions.map((q, index) => (
          <div
            key={q.id}
            className="bg-white shadow p-4 rounded-lg text-sm md:text-base"
          >
            <p className="font-semibold mb-2">
              {index + 1}. {q.question}
            </p>

            {q.type === "mcq" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt) => (
                  <label
                    key={opt}
                    className={`border px-3 py-2 rounded-lg cursor-pointer flex items-center space-x-2 ${
                      responses[q.id] === opt
                        ? "bg-blue-600 text-white border-blue-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={opt}
                      checked={responses[q.id] === opt}
                      onChange={() => handleAnswer(q.id, opt)}
                      className="hidden"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                placeholder="Write your answer here..."
                value={responses[q.id] || ""}
                onChange={(e) => handleAnswer(q.id, e.target.value)}
                className="w-full border rounded-lg px-3 py-2 h-24"
              />
            )}
          </div>
        ))}
      </div>

      {/* Submit button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm md:text-base"
        >
          Submit Exam
        </button>
      </div>
    </div>
  );
}
