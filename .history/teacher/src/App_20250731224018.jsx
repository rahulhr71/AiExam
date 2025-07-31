import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
const counts=Array.from({length:100})

  return (
    <div  >
    
    <div className="transition-transform absolute top-30 left-130 z-30  duration-500 hover:scale-150 bg-red-500 text-white p-4">
  ENTER PASSWORD
</div>
    </div>
  )
}

export default App
