import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { BellIcon } from '@heroicons/react/24/outline';
const Dashboard = () => {
    const [data, setData] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = axios.get('http://localhost:4000/api/dashboard', {
                    withCredentials: true
                })
                if (response.status === 200) {
                    console.log("Dashboard data loaded successfully");
                } else {
                    console.log("Failed to load dashboard data");
                }
            } catch (error) {
                console.error("Error loading dashboard data:", error);
            }

        }
        loadData()


    }, [])
    return (
        <div className=''>
            <Sidebar />
            <div className='  absolute top-0 right-0 w-[calc(100%-240px)]  '>
                <div className='flex items-center justify-end bg-gray-200 p-3 gap-4'>
                    <button className="relative p-2 rounded-full bg-amber-50 hover:bg-gray-100">
                        <BellIcon className="h-6 w-6 text-black" />

                        <span className="absolute top-0 right-0 inline-block h-2 w-2 rounded-full bg-red-500"></span>
                    </button>
                    <button className=' bg-blue-500 px-3 py-2 hover:bg-[#509CDB] cursor-pointer text-white rounded-sm'>Logout</button>
                </div>
                <div className='p-4'>
                    <h1 className='text-2xl font-bold text-gray-700'>Dashboard</h1>
                    <p className='text-gray-500'>Welcome to the admin panel</p>
                    <div>
                        <p className='text-gray-600 mt-4'>Here you can manage all aspects of the application, including users, settings, and more.</p>
                        <p className='text-gray-600'>Use the sidebar to navigate through different sections
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard
