import {useEffect,useState} from 'react'
import axios from 'axios'
export default function Dashboard() {
    useEffect(async()=>{
        try{
            const res = await axios.get('http://localhost:4000/api/dashboard')

        }catch(error){
            console.log(error)
        }
       

    },[])
  return (
    <div>
     <h1>Dashboard</h1>
    </div>
  )
}
