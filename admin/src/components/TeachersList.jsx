import React, { useEffect, useState } from "react";
import { useAdmin } from '../context/adminContext';

const dummyTeachers = [
    { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", subject: "Mathematics", phone: "123-456-7890" },
    { id: 2, name: "Bob Smith", email: "bob.smith@example.com", subject: "Physics", phone: "234-567-8901" },
    { id: 3, name: "Carol Lee", email: "carol.lee@example.com", subject: "Chemistry", phone: "345-678-9012" },
    { id: 4, name: "David White", email: "david.white@example.com", subject: "Mathematics", phone: "456-789-0123" },
];

const TeachersList = () => {
    const [teachers, setTeachers] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("All");
    const {activeComponent,setActiveComponent} = useAdmin();

    
    const subjects = ["All", ...new Set(dummyTeachers.map(t => t.subject))];

    useEffect(() => {
        setTeachers(dummyTeachers);
    }, []);

  
    const filteredTeachers = selectedSubject === "All"
        ? teachers
        : teachers.filter(t => t.subject === selectedSubject);

    return (
        <div className="max-w-6xl mx-auto mt-10 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                  <button
                    onClick={() => setActiveComponent('')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm shadow"
                >
                    ← Back to Dashboard
                </button>
                <h2 className="text-2xl font-bold text-[#152259]">Teachers List</h2>

                <div>
                    <label className="text-sm font-medium mr-2 text-gray-700">Filter by Subject:</label>
                    <select
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                        {subjects.map((subject, index) => (
                            <option key={index} value={subject}>
                                {subject}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
                    <thead>
                        <tr>
                            <th className="bg-[#152259] text-white px-4 py-3 text-left text-sm">Name</th>
                            <th className="bg-[#152259] text-white px-4 py-3 text-left text-sm">Email</th>
                            <th className="bg-[#152259] text-white px-4 py-3 text-left text-sm">Subject</th>
                            <th className="bg-[#152259] text-white px-4 py-3 text-left text-sm">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeachers.length > 0 ? (
                            filteredTeachers.map((teacher) => (
                                <tr key={teacher.id} className="hover:bg-blue-50">
                                    <td className="px-4 py-3 border-b text-sm">{teacher.name}</td>
                                    <td className="px-4 py-3 border-b text-sm">{teacher.email}</td>
                                    <td className="px-4 py-3 border-b text-sm">{teacher.subject}</td>
                                    <td className="px-4 py-3 border-b text-sm">{teacher.phone}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center px-4 py-6 text-gray-500">
                                    No teachers found for selected subject.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeachersList;
