import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const initialExams = [
    { id: 1, name: "Mid Term Exam", subject: "Math", date: "2025-08-20", class: "10" },
    { id: 2, name: "Science Quiz", subject: "Science", date: "2025-07-15", class: "9" },
    { id: 3, name: "Final Exam", subject: "English", date: "2025-09-05", class: "10" },
];

const ExamList = () => {
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [form, setForm] = useState({ name: "", subject: "", date: "", class: "" });

    useEffect(() => {
        setExams(initialExams);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newExam = {
            id: exams.length + 1,
            ...form,
        };
        setExams([...exams, newExam]);
        setForm({ name: "", subject: "", date: "", class: "" });
    };

    const today = new Date().toISOString().split("T")[0];
    const upcomingExams = exams.filter(exam => exam.date >= today);
    const previousExams = exams.filter(exam => exam.date < today);

    return (
        <div className="max-w-6xl mx-auto mt-10 px-4">
            {/* Back Button */}
            <div className="mb-4">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-[#152259] hover:bg-[#101a3e] text-white px-4 py-2 rounded-md text-sm shadow"
                >
                    ← Back to Dashboard
                </button>
            </div>

            {/* Page Title */}
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#152259" }}>
                Exams Management
            </h2>

            {/* Create Exam Form */}
            <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-md shadow mb-10">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Create New Exam</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Exam Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded-md"
                    />
                    <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded-md bg-white"
                    >
                        <option value="">Select Subject</option>
                        <option value="Math">Math</option>
                        <option value="Science">Science</option>
                        <option value="English">English</option>
                        <option value="History">History</option>
                        <option value="Computer">Computer</option>
                    </select>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded-md"
                    />
                    <input
                        type="text"
                        name="class"
                        placeholder="Class"
                        value={form.class}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-[#152259] text-white px-4 py-2 rounded-md hover:bg-[#101a3e]"
                >
                    Create Exam
                </button>
            </form>

            {/* Upcoming Exams */}
            <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4 text-[#152259]">Upcoming Exams</h3>
                {upcomingExams.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border rounded-md shadow-sm bg-white">
                            <thead>
                                <tr>
                                    <th className="bg-[#152259] text-white px-4 py-2 text-left text-sm">Name</th>
                                    <th className="bg-[#152259] text-white px-4 py-2 text-left text-sm">Subject</th>
                                    <th className="bg-[#152259] text-white px-4 py-2 text-left text-sm">Class</th>
                                    <th className="bg-[#152259] text-white px-4 py-2 text-left text-sm">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {upcomingExams.map(exam => (
                                    <tr key={exam.id} className="hover:bg-blue-50">
                                        <td className="px-4 py-2 border-b text-sm">{exam.name}</td>
                                        <td className="px-4 py-2 border-b text-sm">{exam.subject}</td>
                                        <td className="px-4 py-2 border-b text-sm">{exam.class}</td>
                                        <td className="px-4 py-2 border-b text-sm">{exam.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">No upcoming exams.</p>
                )}
            </div>

            {/* Previous Exams */}
            <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4 text-[#152259]">Previous Exams</h3>
                {previousExams.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border rounded-md shadow-sm bg-white">
                            <thead>
                                <tr>
                                    <th className="bg-[#152259] text-white px-4 py-2 text-left text-sm">Name</th>
                                    <th className="bg-[#152259] text-white px-4 py-2 text-left text-sm">Subject</th>
                                    <th className="bg-[#152259] text-white px-4 py-2 text-left text-sm">Class</th>
                                    <th className="bg-[#152259] text-white px-4 py-2 text-left text-sm">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {previousExams.map(exam => (
                                    <tr key={exam.id} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 border-b text-sm">{exam.name}</td>
                                        <td className="px-4 py-2 border-b text-sm">{exam.subject}</td>
                                        <td className="px-4 py-2 border-b text-sm">{exam.class}</td>
                                        <td className="px-4 py-2 border-b text-sm">{exam.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">No previous exams.</p>
                )}
            </div>
        </div>
    );
};

export default ExamList;
