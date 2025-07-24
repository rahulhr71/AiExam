import { useEffect, useState } from 'react'
import axios from 'axios'
export default function Dashboard() {
    const [data, setData] = useState('')
    const logout = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/logout", {
                withCredentials: true,
            })
            if (response.status === 200) {
                setData('please login again')
            }
        } catch (error) {
            console.log(error);

        }


    }
    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/dashboard', {
                    withCredentials: true
                })
                if (res.status === 200)
                    return setData(res.data.message)
                else {
                    return setData("unauthorized ")
                }

            } catch (error) {
                return console.log(error)
            }
        }
        loadData()


    }, [data])
    return (
        <div className='flex w-full justify-between'>
            <h1>{data}</h1>
            <button className='bg-red-500 rounded-2xl py-2 px-5 font-bold cursor-pointer    text-white' onClick={() => logout}>Logout</button>
        </div>
    )
}
