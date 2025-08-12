import { useState } from 'react'
import { Router,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import TeacherDashboard from './pages/dashboard'
function App() {
  const [count, setCount] = useState(0)
const counts=Array.from({length:100})

  return (
    < >
      
   
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<TeacherDashboard/>}/>
        
      </Routes>
   
   
    </>
  )
}

export default App
