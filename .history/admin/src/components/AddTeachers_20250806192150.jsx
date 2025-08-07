import React from 'react'

const AddTeachers = () => {
  return (
    <div>

      <form className='flex flex-col gap-4 p-4'>
        <label className='text-gray-700'>Name</label>
        <input type="text" className='border border-gray-300 p-2 rounded' placeholder='Enter teacher name' />
        <label className='text-gray-700'>Email</label>
        <input type="email" className='border border-gray-300 p-2 rounded ' placeholder='Enter teacher email' />
        <label className='text-gray-700'>Password</label>
        <input type="password" className='border border-gray-300 p-2 rounded
        ' placeholder='Enter teacher password' />
        <label className='text-gray-700'>Subject</label>
        <input type="text" className='border border-gray-300 p-2 rounded  ' placeholder='Enter subject taught by teacher' />
        <button type='submit' className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>Add Teacher</button>
      </form>
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Teacher List</h2>
  <ul className="space-y-3">
    {['Teacher 1', 'Teacher 2', 'Teacher 3'].map((teacher, index) => (
      <li
        key={index}
        className="flex items-center p-3 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition"
      >
        <span className="font-medium text-gray-700">{teacher}</span>
      </li>
    ))}
  </ul>
</div>

    </div>
  )
}

export default AddTeachers
