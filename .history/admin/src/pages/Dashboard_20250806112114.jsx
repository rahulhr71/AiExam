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
        <div>
           <Sidebar/>
           <div className='bg-amber-700 z-10 p-3 w-[80%] ml-0'>

           </div>
        </div>
    )
}

export default Dashboard
