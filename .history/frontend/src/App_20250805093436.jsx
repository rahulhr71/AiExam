import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import DemoPage from './pages/DemoPage'
function App() {
  const isAuth = !!document.cookie.split('; ').find(row => row.startsWith('token='))
  console.log("isAuth", isAuth)
  const PrivateRoutes = ({ children }) => {
    return isAuth ? children : <Navigate to="/login" />;
  }
  return (
    <>

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/dashboard" element={
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        } />
      </Routes>
     
    </>

  )
}

export default App
