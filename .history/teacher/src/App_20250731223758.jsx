import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
const counts=Array.from({length:100})

  return (
    <div  >
    {
      counts.map((i,index)=>{
        return(
          index%2==0?<div key={i} className='w-full m-2 h-2 duration-500  bg-amber-500'></div>:<div key={i} className='w-full h-2 m-2  animate-spin duration-500    bg-green-700'></div>

        )
        
      })
    }
    <div className="transition-transform absolute top-30 left-130 z-30  duration-500 bg-red-500 text-white p-4">
  Hover to change color
</div>
    </div>
  )
}

export default App
