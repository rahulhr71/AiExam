import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const navigate = useNavigate()
    const [data, setData] = useState('')
    const [auth, setAuth] = useState(true)

    const logout = async () => {
        try {
            await axios.get("http://localhost:4000/api/logout", {
                withCredentials: true,
            })
            setData('Please login again')
            navigate('/login')
        } catch (error) {
            console.log(error, "error in logout");
        }
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/dashboard', {
                    withCredentials: true
                })
                if (res.status === 200) {
                    setData(res.data.message)
                    setAuth(false)
                } else {
                    setData("Unauthorized")
                    setAuth(true)
                }
            } catch (error) {
                setData("Unauthorized")
                setAuth(true)
                console.log(error)
            }
        }
        loadData()
    }, [])

    return (
        <>
            {!auth ? (
                <div className="bg-gray-100 min-h-screen font-sans">
                    
                    {/* Navbar */}
                    <header className="bg-white shadow-sm border-b border-gray-200">
                        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-blue-600">SmartExam</h1>
                            <nav>
                                <ul className="flex gap-6 text-gray-700 font-medium">
                                    <li className="hover:text-blue-500 cursor-pointer transition">Home</li>
                                    <li className="hover:text-blue-500 cursor-pointer transition">Dashboard</li>
                                    <li onClick={logout} className="hover:text-red-500 cursor-pointer transition">Logout</li>
                                </ul>
                            </nav>
                        </div>
                    </header>

                    {/* Welcome */}
                    <section className="max-w-7xl mx-auto px-6 mt-8">
                        <h2 className="text-3xl font-semibold text-gray-800">
                            Welcome, <span className="text-blue-600">John Doe</span>
                        </h2>
                        <p className="text-gray-500 mt-1">Here’s what’s happening with your exams</p>
                    </section>

                    {/* Assigned & Join Exam */}
                    <section className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Assigned Exam */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition">
                            <div className="border-b border-gray-200 px-4 py-3">
                                <p className="text-blue-500 font-medium">Assigned Exams</p>
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800">Math Quiz</h3>
                                <div className="flex justify-between items-center mt-3">
                                    <div className="text-gray-500 text-sm">
                                        <p>June 21, 2022</p>
                                        <p>25 Min</p>
                                    </div>
                                    <button className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition">
                                        Start Exam
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Join Exam */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition">
                            <div className="border-b border-gray-200 px-4 py-3">
                                <p className="text-blue-500 font-medium">Join Exam</p>
                            </div>
                            <div className="p-4 flex flex-col sm:flex-row gap-3 sm:items-center">
                                <input 
                                    type="text" 
                                    className="border border-gray-300 rounded-md px-3 py-2 flex-1 focus:outline-none focus:border-blue-500" 
                                    placeholder="Enter Exam Code" 
                                />
                                <button className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition">
                                    Join Exam
                                </button>
                            </div>
                        </div>

                    </section>

                    {/* Previous & Upcoming Exams */}
                    <section className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Previous Exams */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition">
                            <div className="border-b border-gray-200 px-4 py-3">
                                <p className="text-blue-500 font-medium">Previous Exams</p>
                            </div>
                            <div>
                                {Array(3).fill(0).map((_, i) => (
                                    <div key={i} className="flex justify-between px-4 py-3 border-b last:border-none border-gray-100">
                                        <span className="text-gray-700">Science Test</span>
                                        <span className="text-gray-500 text-sm">May 20, 2025</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Exams */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition">
                            <div className="border-b border-gray-200 px-4 py-3">
                                <p className="text-blue-500 font-medium">Upcoming Exams</p>
                            </div>
                            <div>
                                {Array(3).fill(0).map((_, i) => (
                                    <div key={i} className="flex justify-between px-4 py-3 border-b last:border-none border-gray-100">
                                        <span className="text-gray-700">Science Test</span>
                                        <span className="text-gray-500 text-sm">May 20, 2025</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </section>

                    <footer className="mt-12 py-4 border-t border-gray-200 text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} SmartExam - All Rights Reserved
                    </footer>
                </div>
            ) : (
                <UnAuthorized />
            )}
        </>
    )
}

function UnAuthorized() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-xl font-semibold text-red-600 bg-red-100 px-4 py-2 rounded-md">
                UNAUTHORIZED! PLEASE LOGIN
            </h1>
        </div>
    )
}
