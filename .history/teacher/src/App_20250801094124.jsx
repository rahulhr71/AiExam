import { useState } from 'react'
import { Router,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
function App() {
  const [count, setCount] = useState(0)
const counts=Array.from({length:100})

  return (
    < >
      
   
      <Routes>
        <Route path='/' element={<Login/>}/>

        
      </Routes>
   
   
    </>
  )
}

export default App
