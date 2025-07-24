import {useEffect,useState} from 'react'
import axios from 'axios'
export default function Dashboard() {
    const [data,setData]=useState('')
    useEffect(async()=>{
        try{
            const res = await axios.get('http://localhost:4000/api/dashboard',{
                withCredentials:true
            })
            if(res.status===200)
                setData(res.data.message)
            else{
                setData("unauthorized ")
            }
             
        }catch(error){
            console.log(error)
        }
       

    },[])
  return (
    <div className='flex w-full justify-between'>
     <h1>{data}</h1>
     <button className='bg-red-500 rounded-2xl py-2 px-5 font-bold cursor-pointer    text-white'>Logout</button>
    </div>
  )
}
