import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
const counts=[1]

  return (
    <>
    {
      counts.map(element => {
        counts.push(1)
        <div className='bg-red-500 w-full h-2 m-3'></div>

      })
    }
    
    </>
  )
}

export default App
