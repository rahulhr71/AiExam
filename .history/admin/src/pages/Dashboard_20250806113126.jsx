import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
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
           <Sidebar/>
           <div className='bg-amber-700 z-10 p-2 absolute top-0 right-0 w-[calc(100%-240px)] h-16 flex items-center justify-end'>
            <button className='bg-[#509CDB] p-2 text-white'>Logout</button>

           </div>
        </div>
    )
}

export default Dashboard
