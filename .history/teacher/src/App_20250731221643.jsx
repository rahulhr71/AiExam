import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
const counts=Array.from({length:100})

  return (
    <>
    {
      counts.map((i)=>{
        return(
          <div key={i} className='w-full m-3 h-2 bg-amber-500'></div>

        )
        
      })
    }
    
    </>
  )
}

export default App
