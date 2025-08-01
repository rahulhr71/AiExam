import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
const counts=Array.from({length:100})

  return (
    <div  >
      <code><span className='text-red-700'>console.log</span>("<span className='text-green-800'>hello world</span>")</code>
    
   
    </div>
  )
}

export default App
