import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { BellIcon, AcademicCapIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to fetch students", err);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/students', newStudent);
      setStudents([...students, res.data]);
      setNewStudent({ name: '', email: '' });
    } catch (err) {
      console.error("Failed to add student", err);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/students/${id}`);
      setStudents(students.filter(student => student.id !== id));
    } catch (err) {
      console.error("Failed to delete student", err);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className='absolute top-0 right-0 w-[calc(100%-240px)] min-h-screen bg-gray-100'>
        <div className='flex items-center justify-end bg-white p-3 shadow'>
          <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <BellIcon className="h-6 w-6 text-black" />
            <span className="absolute top-0 right-0 inline-block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <button className='ml-4 bg-blue-500 px-4 py-2 hover:bg-blue-600 text-white rounded'>Logout</button>
        </div>
        <div className='p-6'>
          <DashboardOverview studentCount={students.length} />
          <div className='mt-8'>
            <h3 className='text-xl font-semibold mb-3'>Quick Actions</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <ActionButton label="Add Student" />
            </div>
            <form onSubmit={handleAddStudent} className="my-6 flex gap-2">
              <input
                type="text"
                placeholder="Student Name"
                value={newStudent.name}
                onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                className="border px-2 py-1 rounded"
                required
              />
              <input
                type="email"
                placeholder="Student Email"
                value={newStudent.email}
                onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
                className="border px-2 py-1 rounded"
                required
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Add Student</button>
            </form>
            <StudentTable students={students} onDelete={handleDeleteStudent} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardOverview = ({ studentCount }) => (
  <div>
    <h2 className='text-2xl font-bold text-gray-800 mb-4'>Overview</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      <div className='bg-white rounded-lg p-4 shadow flex justify-between items-center'>
        <div>
          <h3 className='text-gray-500 text-sm'>Students</h3>
          <p className='text-2xl font-semibold text-gray-800'>{studentCount}</p>
        </div>
        <AcademicCapIcon className="h-8 w-8 text-green-600" />
      </div>
    </div>
  </div>
);

const ActionButton = ({ label }) => (
  <div
    className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer transition"
  >
    <span className="text-gray-800 font-medium">{label}</span>
    <ArrowRightIcon className="h-5 w-5 text-gray-500" />
  </div>
);

const StudentTable = ({ students, onDelete }) => (
  <table className="min-w-full bg-white">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b">Name</th>
        <th className="py-2 px-4 border-b">Email</th>
        <th className="py-2 px-4 border-b">Actions</th>
      </tr>
    </thead>
    <tbody>
      {students.map(student => (
        <tr key={student.id}>
          <td className="py-2 px-4 border-b">{student.name}</td>
          <td className="py-2 px-4 border-b">{student.email}</td>
          <td className="py-2 px-4 border-b">
            <button
              onClick={() => onDelete(student.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TeacherDashboard;
