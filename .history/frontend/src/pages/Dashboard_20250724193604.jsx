import {useEffect,useState} from 'react'
import axios from 'axios'
export default function Dashboard() {
    useEffect(async()=>{
       const res=await axios.get('http://localhost:4000/api/dashboard')
    },[])
  return (
    <div>
     <h1>Dashboard</h1>
    </div>
  )
}
