import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import { Routes,Route } from 'react-router-dom'
function App() {
  return(
    <>
    <Routes>
      <Route path="/login" element={<div>login page</div>}/>
      <Route path='/' element=    {<LandingPage/>} />
    </Routes>
    </>
  
  )
}

export default App
