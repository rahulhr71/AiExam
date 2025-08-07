import React from 'react'

const Students = () => {
  return (
    <div className="p-4">
            
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Teacher List</h2>
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
