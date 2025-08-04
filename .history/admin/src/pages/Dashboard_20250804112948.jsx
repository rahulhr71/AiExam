import React from 'react'

const Dashboard = () => {
  return (
    <div>
        <h1 className="text-2xl font-bold text-center mt-10">Welcome to the Dashboard</h1>
        <div className="mt-8 flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                <div className="bg-white shadow rounded-lg p-6 text-center">
                    <h2 className="text-lg font-semibold mb-2">Total Users</h2>
                    <p className="text-3xl font-bold text-blue-600">120</p>
                </div>
                <div className="bg-white shadow rounded-lg p-6 text-center">
                    <h2 className="text-lg font-semibold mb-2">Active Exams</h2>
                    <p className="text-3xl font-bold text-green-600">8</p>
                </div>
                <div className="bg-white shadow rounded-lg p-6 text-center">
                    <h2 className="text-lg font-semibold mb-2">Pending Requests</h2>
                    <p className="text-3xl font-bold text-red-600">5</p>
                </div>
            </div>
            <div className="mt-10 w-full max-w-4xl">
                <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
                <ul className="bg-white shadow rounded-lg divide-y">
                    <li className="p-4">User John Doe registered.</li>
                    <li className="p-4">Exam "Math 101" created.</li>
                    <li className="p-4">Request for exam approval received.</li>
                </ul>
            </div>
        </div>
    
    </div>
  )
}

export default Dashboard
