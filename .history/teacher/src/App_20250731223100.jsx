import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
const counts=Array.from({length:100})

  return (
    <div className='bg-black transition-colors animate-bounce '>
    {
      counts.map((i,index)=>{
        return(
          index%5==0?<div key={i} className='w-full m-2 h-2 transition-transform duration-500 animate-bounce bg-amber-500'></div>:<div key={i} className='w-full h-2 m-2 transition-transform animate-bounce duration-500    bg-green-700'></div>

        )
        
      })
    }
    <div className="transition-transform duration-500 hover:scale-20 bg-red-500 text-white p-4">
  Hover to change color
</div>
    </div>
  )
}

export default App
