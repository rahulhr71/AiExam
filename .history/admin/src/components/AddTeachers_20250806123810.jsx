import React from 'react'

const AddTeachers = () => {
  return (
    <div>
      add teachers component
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
        <div className='mt-4'>
            <h2 className='text-xl font-bold'>Teacher List</h2>
            <ul className='list-disc pl-5'>
                <li>Teacher 1</li>
                <li>Teacher 2</li>
                <li>Teacher 3</li>
            </ul>

    </div>
    </div>
  )
}

export default AddTeachers
