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
                }
                else {
                    setData("unauthorized ")
                    setAuth(true)
                }
            } catch (error) {
                setData("unauthorized ")
                setAuth(true)
                console.log(error)
            }
        }
        loadData()
    }, [])

    return (
        <>
            {!auth ? (
                <div className='bg-gray-100 w-full min-h-screen text-gray-800'>
                    {/* Navbar */}
                    <div className='w-full flex justify-between border-t shadow border-gray-300 border-b p-3 bg-white'>
                        <h1 className="text-2xl font-bold text-blue-600">SmartExam</h1>
                        <div>
                            <ul className='flex justify-center items-center gap-7'>
                                <li className='cursor-pointer hover:text-blue-500'>Home</li>
                                <li className='cursor-pointer hover:text-blue-500'>Dashboard</li>
                                <li className='cursor-pointer hover:text-blue-500' onClick={logout}>Logout</li>
                            </ul>
                        </div>
                    </div>

                    {/* Welcome */}
                    <h1 className='p-10 text-3xl capitalize font-medium'>Welcome, John Doe</h1>

                    {/* Assigned & Join Exam */}
                    <div className='flex flex-wrap gap-8 px-8'>
                        <div className='w-80 border border-gray-300 bg-white rounded-2xl shadow-sm'>
                            <div className='border-b p-3 border-gray-300'>
                                <p className='text-blue-500 font-medium'>Assigned Exams</p>
                            </div>
                            <h1 className='text-2xl font-medium px-4 pt-2'>Math Quiz</h1>
                            <div className='flex justify-between px-4 pb-2'>
                                <div className='text-gray-600'>
                                    <p>June 21, 2022</p>
                                    <p>25 Min</p>
                                </div>
                                <button className='px-5 font-medium bg-blue-500 text-white hover:bg-blue-400 rounded-sm'>
                                    Start Exam
                                </button>
                            </div>
                        </div>

                        <div className='w-80 border border-gray-300 bg-white rounded-2xl shadow-sm'>
                            <div className='border-b p-3 border-gray-300'>
                                <p className='text-blue-500 font-medium'>Join Exam</p>
                            </div>
                            <div className='flex gap-4 items-center justify-center'>
                                <input type="text" className='border mt-5 border-gray-300 p-1 rounded' placeholder='Enter Exam Code' />
                                <button className='p-2 mt-5 font-medium bg-blue-500 text-white hover:bg-blue-400 rounded-sm'>
                                    Join Exam
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Previous & Upcoming Exams */}
                    <div className="flex flex-wrap gap-8 px-8 mt-5">
                        <div className='w-96 border border-gray-300 bg-white rounded-2xl shadow-sm'>
                            <div className='border-b p-3 border-gray-300'>
                                <p className='text-blue-500 font-medium'>Previous Exam</p>
                            </div>
                            <div>
                                {Array(3).fill(0).map((_, i) => (
                                    <div key={i} className='flex justify-between w-full p-4 border-b last:border-none border-gray-200'>
                                        <p>Science Test</p>
                                        <p>May 20, 2025</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='w-96 border border-gray-300 bg-white rounded-2xl shadow-sm'>
                            <div className='border-b p-3 border-gray-300'>
                                <p className='text-blue-500 font-medium'>Upcoming Exam</p>
                            </div>
                            <div>
                                {Array(3).fill(0).map((_, i) => (
                                    <div key={i} className='flex justify-between w-full p-4 border-b last:border-none border-gray-200'>
                                        <p>Science Test</p>
                                        <p>May 20, 2025</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <UnAuthorized />
            )}
        </>
    )
}

function UnAuthorized() {
    return (
        <>
            <h1 className='text-3xl text-center w-full mt-20 text-white bg-red-600 p-4'>
                UNAUTHORIZED! PLEASE LOGIN
            </h1>
        </>
    )
}
