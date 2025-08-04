import { useState } from 'react'
import Login from './pages/Login'
import {  Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
function App() {
 
  return (
    <>
     
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>  
    </>
  )
}

export default App
