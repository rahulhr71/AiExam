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
                    <div className='bg-[#15082b] w-full h-100   shadow  text-white'>
                        <div className='w-full flex justify-between border-t shadow-[#42207d] border-purple-400 border-b p-3'>
                            <h1 className="text-2xl font-bold  text-purple-400">SmartExam</h1>
                            <div>
                                <ul className='flex justify-center items-center gap-7 ' >
                                    <li className='cursor-pointer'>Home</li>
                                    <li className='cursor-pointer'>Dashboard</li>
                                    <li className='cursor-pointer'>John doe</li>
                                </ul>
                            </div>
                        </div>
                        <h1 className='p-10 text-3xl capitalize font-medium'>welcome, John Doe</h1>
                        <div>
                            <div className='w-200 border border-purple-400  h-40 rounded-2xl'>
                                <div className='border-b p-3 border-b-purple-400'>
                                    <p className='text-cyan-300 font-medium'>Assigned Exams</p>
                                </div>
                                <h1 className='text-2xl font-medium'>Math Quiz</h1>
                                <div className='flex'>
                                    
                                    <div>
                                        <p>June,21,2022</p>
                                        <p>25 Min</p>
                                    </div>
                                    <button>Start Exam</button>

                                </div>
                            </div>
                            <div></div>
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
