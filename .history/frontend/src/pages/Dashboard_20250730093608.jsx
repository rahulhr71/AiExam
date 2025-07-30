import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Dashboard() {
    const navigate = useNavigate()
    const [data, setData] = useState('')
    const [auth, setAuth] = useState(true)
    const logout = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/logout", {
                withCredentials: true,
            })
            setData('please login again')
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
                }

            } catch (error) {
                return console.log(error)
            }
        }
        loadData()


    }, [data])
    return (
        <>
            {

                auth ? <UnAuthorized /> : (
                    <div className='bg-red-500 w-full '>
                        <div className='w-full bg-green-400 flex justify-between p-3'>
                            <h1 className="text-2xl font-bold text-purple-400">SmartExam</h1>
                            <div>
                                <ul className='flex justify-center items-center gap-7' >
                                    <li>Home</li>
                                    <li>Dashboard</li>
                                    <li>John doe</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                )


            }
        </>
    )
}
function UnAuthorized() {
    return (
        <>
            <h1 className='text-3xl text-center absolute w-full mt-50 text-white bg-red-700'>UNATHORIZED ! PLEASE LOGIN</h1>
        </>
    )
}
