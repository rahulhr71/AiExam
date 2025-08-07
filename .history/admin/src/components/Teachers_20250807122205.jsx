import React from 'react'

const Teachers = () => {
  return (
    <div>
        <h1 className="text-2xl font-bold">Teachers Component</h1>
        <p className="mt-4">This is where you can manage teachers.</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Teacher
        </button>
        <button className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          View Teachers
        </button>
        <button className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Delete Teacher
        </button>
        <button className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Edit Teacher
        </button>
        <button className="ml-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
          View Teacher Details
        </button>
        <button className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Export Teachers
        </button>
        <button className="ml-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
          Import Teachers
        </button>
        <button className="ml-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
          Search Teachers
        </button>
        <button className="ml-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
          Filter Teachers
        </button>
        <button className="ml-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Sort Teachers
        </button>
        <button className="ml-4 bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600">
          View Teacher Statistics
        </button>
    </div>
  )
}

export default Teachers
