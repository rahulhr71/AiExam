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
                    <div className='bg-[#15082b] w-full  box-border  shadow  text-white'>
                        <div className='w-full flex justify-between border-t shadow-[#42207d] border-[#6c34c5] border-b p-3'>
                            <h1 className="text-2xl font-bold  text-purple-400">SmartExam</h1>
                            <div>
                                <ul className='flex justify-center items-center gap-7 ' >
                                    <li className='cursor-pointer'>Home</li>
                                    <li className='cursor-pointer'>Dashboard</li>
                                    <li className='cursor-pointer' onClick={() => logout()}>Logout</li>
                                </ul>
                            </div>
                        </div>
                        <h1 className='p-10 text-3xl capitalize font-medium'>welcome, John Doe</h1>
                        <div className='flex '>
                            <div className='w-190 border border-[#6c34c5] ml-8  rounded-2xl'>
                                <div className='border-b p-3 border-[#6c34c5]'>
                                    <p className='text-cyan-300 font-medium'>Assigned Exams</p>
                                </div>
                                <h1 className='text-2xl font-medium px-4 pt-2 '>Math Quiz</h1>
                                <div className='flex justify-between  px-4 pb-2  '>
                                    <div className='text-[#dfd4f4]'>
                                        <p>June,21,2022</p>
                                        <p>25 Min</p>
                                    </div>
                                    <button className='px-5 font-medium bg-[#6c34c5] cursor-pointer  hover:bg-purple-400 rounded-sm'>Start Exam</button>
                                </div>
                            </div>
                            <div className='w-100 ml-8 border border-[#6c34c5]   rounded-2xl'>
                                <div className='border-b p-3 border-[#6c34c5]'>
                                    <p className='text-cyan-300 font-medium'>Join Exam</p>
                                </div>
                                <div className='flex  gap-4 items-center justify-center    '>
                                    <input type="text" className='border mt-5 border-[#6c34c5] p-1' placeholder='Enter Exam Code' />
                                    <button className='p-2 mt-5 font-medium bg-[#6c34c5] cursor-pointer  hover:bg-purple-400 rounded-sm'>Join Exam</button>
                                </div>
                            </div>
                        </div>
                        <div className='w-100 ml-8 border border-[#6c34c5]   rounded-2xl'>
                                <div className='border-b p-3 border-[#6c34c5]'>
                                    <p className='text-cyan-300 font-medium'>Previous Exam</p>
                                </div>
                                <div className='flex  gap-4 items-center justify-center    '>
                                    <div className='flex justify-between w-full p-4'>
                                        <p>Science Test </p>
                                        <p>May 20 ,2025</p>
                                    </div>
                                    <div className='flex justify-between w-full p-4'>
                                        <p>Science Test </p>
                                        <p>May 20 ,2025</p>
                                    </div>
                                    <div className='flex justify-between w-full p-4'>
                                        <p>Science Test </p>
                                        <p>May 20 ,2025</p>
                                    </div>
                                    <div className='flex justify-between w-full p-4'>
                                        <p>Science Test </p>
                                        <p>May 20 ,2025</p>
                                    </div>
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
