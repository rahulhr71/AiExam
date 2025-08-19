import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
const Students = () => {
    const [students, setStudents] = useState([]);
    useEffect(()=>{
        const fetchStudents = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/teacher/allStudents", { withCredentials: true });
                if (response.status === 200) {
                    setStudents(response.data.students);
                } else {
                    console.error("Failed to fetch students:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
    })
  return (
    <div className="p-4">
            
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Students List</h2>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm shadow">
                    + Add Student
                </button>
            </div>

           
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700">
                    <tr className="text-sm font-semibold text-center">
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Subject</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-center">
                    <tr className="hover:bg-gray-50 text-sm">
                        <td className="px-6 py-4 font-medium text-gray-900">Rahul Sharma</td>
                        <td className="px-6 py-4 text-gray-600">rahul@example.com</td>
                        <td className="px-6 py-4">Math</td>
                        <td className="px-6 py-4 space-x-2">
                            <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">Edit</button>
                            <button className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">Delete</button>
                        </td>
                    </tr>
                    <tr className="hover:bg-gray-50 text-sm">
                        <td className="px-6 py-4 font-medium text-gray-900">Priya Verma</td>
                        <td className="px-6 py-4 text-gray-600">priya@example.com</td>
                        <td className="px-6 py-4">Science</td>
                        <td className="px-6 py-4 space-x-2">
                            <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">Edit</button>
                            <button className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">Delete</button>
                        </td>
                    </tr>
                    <tr className="hover:bg-gray-50 text-sm">
                        <td className="px-6 py-4 font-medium text-gray-900">Aman Singh</td>
                        <td className="px-6 py-4 text-gray-600">aman@example.com</td>
                        <td className="px-6 py-4">English</td>
                        <td className="px-6 py-4 space-x-2">
                            <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">Edit</button>
                            <button className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
  )
}

export default Students
