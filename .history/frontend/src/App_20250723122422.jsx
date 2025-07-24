import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
function App() {
  return(
    <>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </>
  
  )
}

export default App
