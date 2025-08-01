import { useState } from 'react'
import { Router,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
function App() {
  const [count, setCount] = useState(0)
const counts=Array.from({length:100})

  return (
    < >
      
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>

        
      </Routes>
    </Router>
   
    </>
  )
}

export default App
