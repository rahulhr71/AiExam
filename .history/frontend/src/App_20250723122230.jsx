import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
function App() {
  return(
    <>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path='/' element={<LandingPage/>} />
    </Routes>
    </>
  
  )
}

export default App
