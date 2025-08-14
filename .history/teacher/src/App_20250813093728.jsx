import { useState } from 'react'
import { Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import TeacherDashboard from './pages/dashboard'
import CreateExam from './components/Exam'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<TeacherDashboard />} />
      </Routes>
    </>
  )
}

export default App
