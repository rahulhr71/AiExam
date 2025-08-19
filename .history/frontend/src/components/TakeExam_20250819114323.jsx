import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TakeExam() {
  const navigate = useNavigate();

  const [exam] = useState({
    id: 1,
    title: "Math Quiz",
    duration: 15, // minutes
    questions: [
      { id: 1, type: "mcq", question: "What is 5 + 7?", options: ["10", "11", "12", "13"], answer: "12" },
      { id: 2, type: "mcq", question: "Square root of 49?", options: ["6", "7", "8", "9"], answer: "7" },
      { id: 3, type: "subjective", question: "Explain the Pythagoras theorem with an example." },
    ],
  });

  const [responses, setResponses] = useState({});
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
  const [submitted, setSubmitted] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

  const videoRef = useRef(null);

  // Handle answers
  const handleAnswer = (qid, value) => {
    setResponses({ ...responses, [qid]: value });
  };

  // Timer countdown
  useEffect(() => {
    if (submitted) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Auto-start camera
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch (err) {
      alert("⚠️ Camera access is required to take the exam. Please allow access.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setCameraOn(false);
  };

  // Submit exam
  const handleSubmit = () => {
    setSubmitted(true);
    stopCamera();
    console.log("Submitted Answers:", responses);
    alert("Exam submitted! (AI will evaluate subjective answers)");
    navigate("/dashboard");
  };

  
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel the exam?")) {
      stopCamera();
      alert("Exam cancelled ");
      navigate("/dashboard");
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-xl md:text-2xl font-bold">{exam.title}</h1>
        <div className="text-red-600 font-semibold">⏳ Time Left: {formatTime(timeLeft)}</div>
      </div>

      {/* Live Camera */}
      <div className="bg-gray-100 p-3 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">Live Monitoring 🎥</h3>
        <div className="flex items-center space-x-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-40 h-28 border rounded-lg bg-black"
          ></video>
          <p className="text-sm text-gray-600">
            {cameraOn ? "Camera is active ✅" : "Waiting for camera..."}
          </p>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {exam.questions.map((q, index) => (
          <div key={q.id} className="bg-white shadow p-4 rounded-lg">
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

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm md:text-base"
        >
          Submit Exam
        </button>
        <button
          onClick={handleCancel}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm md:text-base"
        >
          Cancel Exam
        </button>
      </div>
    </div>
  );
}
