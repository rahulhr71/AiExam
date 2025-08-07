import React, { useEffect, useState } from "react";

const dummyTeachers = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        subject: "Mathematics",
        phone: "123-456-7890",
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob.smith@example.com",
        subject: "Physics",
        phone: "234-567-8901",
    },
    {
        id: 3,
        name: "Carol Lee",
        email: "carol.lee@example.com",
        subject: "Chemistry",
        phone: "345-678-9012",
    },
];

const TeachersList = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        setTeachers(dummyTeachers);
    }, []);

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Teachers List</h2>
            <table className="w-full border-collapse bg-white shadow">
                <thead>
                    <tr>
                        <th className="bg-blue-700 text-white px-4 py-3 text-left border-b-2 border-gray-200">Name</th>
                        <th className="bg-blue-700 text-white px-4 py-3 text-left border-b-2 border-gray-200">Email</th>
                        <th className="bg-blue-700 text-white px-4 py-3 text-left border-b-2 border-gray-200">Subject</th>
                        <th className="bg-blue-700 text-white px-4 py-3 text-left border-b-2 border-gray-200">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher.id} className="hover:bg-blue-50">
                            <td className="px-4 py-2 border-b">{teacher.name}</td>
                            <td className="px-4 py-2 border-b">{teacher.email}</td>
                            <td className="px-4 py-2 border-b">{teacher.subject}</td>
                            <td className="px-4 py-2 border-b">{teacher.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeachersList;
