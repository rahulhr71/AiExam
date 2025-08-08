import React, { useEffect, useState } from "react";
import { useAdmin } from "../context/adminContext";

const dummyStudents = [
    { id: 1, name: "Amit Sharma", email: "amit.sharma@example.com", class: "10A", phone: "987-654-3210" },
    { id: 2, name: "Neha Verma", email: "neha.verma@example.com", class: "10B", phone: "876-543-2109" },
    { id: 3, name: "Rahul Singh", email: "rahul.singh@example.com", class: "9A", phone: "765-432-1098" },
    { id: 4, name: "Sanya Gupta", email: "sanya.gupta@example.com", class: "10A", phone: "654-321-0987" },
];

const StudentsList = () => {
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState("All");
    const {activeComponent,setActiveComponent} = useAdmin();

    // Get unique class values
    const classList = ["All", ...new Set(dummyStudents.map(s => s.class))];

    useEffect(() => {
        setStudents(dummyStudents);
    }, []);

    const filteredStudents = selectedClass === "All"
        ? students
        : students.filter(s => s.class === selectedClass);

    return (
        <div className="max-w-6xl mx-auto mt-10 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                 <button
                    onClick={() => setActiveComponent}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm shadow"
                >
                    ← Back to Dashboard
                </button>
                <h2 className="text-2xl font-bold text-[#152259]">Students List</h2>

                <div>
                    <label className="text-sm font-medium mr-2 text-gray-700">Filter by Class:</label>
                    <select
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        {classList.map((cls, idx) => (
                            <option key={idx} value={cls}>
                                {cls}
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
                            <th className="bg-[#152259] text-white px-4 py-3 text-left text-sm">Class</th>
                            <th className="bg-[#152259] text-white px-4 py-3 text-left text-sm">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-green-50">
                                    <td className="px-4 py-3 border-b text-sm">{student.name}</td>
                                    <td className="px-4 py-3 border-b text-sm">{student.email}</td>
                                    <td className="px-4 py-3 border-b text-sm">{student.class}</td>
                                    <td className="px-4 py-3 border-b text-sm">{student.phone}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center px-4 py-6 text-gray-500">
                                    No students found for selected class.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentsList;
