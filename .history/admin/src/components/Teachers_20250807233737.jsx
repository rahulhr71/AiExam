import React from 'react'
import { useState } from 'react';

const Teachers = () => {
    const [activeComponent, setActiveComponent] = useState(false);
    const renderComponent = () => {
        return  <AddTeacher/>
    }
    return (
        <div className="p-4">
            
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Teacher List</h2>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm shadow" onClick={()=> setActiveComponent(!activeComponent)}>
                    + Add Teacher
                </button>
            </div>
            <div className="mb-6 ">
                {renderComponent()}

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
export default Teachers;
const AddTeacher = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Teacher:', formData);
    alert('Teacher added successfully!');
    setFormData({ name: '', email: '', subject: '', phone: '' });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-[#152259] mb-6">Add New Teacher</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#152259]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#152259]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <select
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#152259]"
          >
            <option value="">Select Subject</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="History">History</option>
            <option value="Computer">Computer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#152259]"
          />
        </div>

        <button
          type="submit"
          className="bg-[#152259] text-white px-4 py-2 rounded-md hover:bg-blue-900"
        >
          Add Teacher
        </button>
      </form>
    </div>
  );
};

