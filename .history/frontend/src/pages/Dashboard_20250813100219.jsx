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

    const menuOptions = [
        { title: "View Results", desc: "Check your latest exam scores", color: "bg-green-100 text-green-600", icon: "📊" },
        { title: "Previous Results", desc: "Review past exam performances", color: "bg-yellow-100 text-yellow-600", icon: "📁" },
        { title: "Attendance Tracker", desc: "See your attendance record", color: "bg-blue-100 text-blue-600", icon: "🗓️" },
        { title: "Study Materials", desc: "Access class notes & resources", color: "bg-purple-100 text-purple-600", icon: "📚" },
        { title: "Messages", desc: "View announcements & messages", color: "bg-pink-100 text-pink-600", icon: "💬" },
        { title: "Profile", desc: "Update your personal details", color: "bg-orange-100 text-orange-600", icon: "👤" }
    ]

    return (
        <>
            {!auth ? (
                <div className="bg-gray-100 min-h-screen font-sans">
                    
                 
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
                        <p className="text-gray-500 mt-1">Here’s your school overview & quick actions</p>
                    </section>

                    {/* Quick Action Menu */}
                    <section className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menuOptions.map((item, i) => (
                            <div 
                                key={i} 
                                className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition p-4 cursor-pointer group"
                            >
                                <div className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl mb-4 ${item.color}`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">{item.title}</h3>
                                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                            </div>
                        ))}
                    </section>

                 
                    <section className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                 
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

                     
                        <div className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition">
                            <div className="border-b border-gray-200 px-4 py-3">
                                <p className="text-blue-500 font-medium">Upcoming Exams</p>
                            </div>
                            <div>
                                {Array(3).fill(0).map((_, i) => (
                                    <div key={i} className="flex justify-between px-4 py-3 border-b last:border-none border-gray-100">
                                        <span className="text-gray-700">Math Quiz</span>
                                        <span className="text-gray-500 text-sm">June 21, 2025</span>
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
