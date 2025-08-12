import { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/students', {
          withCredentials: true,
        });
        setStudents(res.data);
      } catch (err) {
        console.error("Failed to fetch students", err);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/students/${id}`, {
        withCredentials: true,
      });
      setStudents(students.filter(student => student.id !== id));
    } catch (err) {
      console.error("Failed to delete student", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/students', newStudent, {
        withCredentials: true,
      });
      setStudents([...students, res.data]);
      setNewStudent({ name: '', email: '' });
    } catch (err) {
      console.error("Failed to add student", err);
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>Student List</h2>
      <form onSubmit={handleAdd} className='mb-4 flex gap-2'>
        <input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
          className='border px-2 py-1 rounded'
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
          className='border px-2 py-1 rounded'
          required
        />
        <button type="submit" className='bg-blue-500 text-white px-4 py-1 rounded'>Add Student</button>
      </form>
      <table className='min-w-full bg-white'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b'>Name</th>
            <th className='py-2 px-4 border-b'>Email</th>
            <th className='py-2 px-4 border-b'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td className='py-2 px-4 border-b'>{student.name}</td>
              <td className='py-2 px-4 border-b'>{student.email}</td>
              <td className='py-2 px-4 border-b'>
                <button onClick={() => handleDelete(student.id)} className='text-red-500'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;