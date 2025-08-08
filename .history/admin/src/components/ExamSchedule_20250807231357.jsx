import React, { useState, useEffect } from 'react';

const dummyExams = [
  {
    id: 1,
    title: 'Math Midterm',
    subject: 'Mathematics',
    date: '2025-08-10',
  },
  {
    id: 2,
    title: 'Physics Final',
    subject: 'Physics',
    date: '2025-07-20',
  },
  {
    id: 3,
    title: 'Chemistry Quiz',
    subject: 'Chemistry',
    date: '2025-08-15',
  },
];

const ExamSchedule = () => {
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [previousExams, setPreviousExams] = useState([]);

  useEffect(() => {
    const today = new Date();
    const upcoming = dummyExams.filter((exam) => new Date(exam.date) >= today);
    const previous = dummyExams.filter((exam) => new Date(exam.date) < today);

    setUpcomingExams(upcoming);
    setPreviousExams(previous);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-gray-50 rounded-lg shadow">
      <h1 className="text-3xl font-bold text-[#152259] mb-6">Exam Schedule</h1>

      {/* Upcoming Exams */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">📅 Upcoming Exams</h2>
        {upcomingExams.length === 0 ? (
          <p className="text-gray-600">No upcoming exams.</p>
        ) : (
          <ul className="space-y-3">
            {upcomingExams.map((exam) => (
              <li
                key={exam.id}
                className="p-4 bg-white rounded shadow border-l-4 border-green-500"
              >
                <h3 className="text-lg font-bold">{exam.title}</h3>
                <p className="text-sm text-gray-600">{exam.subject}</p>
                <p className="text-sm">{new Date(exam.date).toDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Previous Exams */}
      <div>
        <h2 className="text-2xl font-semibold text-red-600 mb-4">🕒 Previous Exams</h2>
        {previousExams.length === 0 ? (
          <p className="text-gray-600">No previous exams.</p>
        ) : (
          <ul className="space-y-3">
            {previousExams.map((exam) => (
              <li
                key={exam.id}
                className="p-4 bg-white rounded shadow border-l-4 border-red-500"
              >
                <h3 className="text-lg font-bold">{exam.title}</h3>
                <p className="text-sm text-gray-600">{exam.subject}</p>
                <p className="text-sm">{new Date(exam.date).toDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExamSchedule;
