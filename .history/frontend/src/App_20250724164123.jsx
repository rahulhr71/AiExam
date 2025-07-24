import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Children } from 'react'
function App() {
  const isAuth = false
  
  const PrivateRoutes = ({ Children }) => {
    isAuth ? Children : <Navigate to="/register" />;

  }
  return (
    <>

      <Routes>

        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Register />} />


        <Route path="/login" element={
          <PrivateRoutes>
            <Login />
          </PrivateRoutes>

        } />


      </Routes>
    </>

  )
}

export default App
