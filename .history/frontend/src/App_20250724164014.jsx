import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Children } from 'react'
function App() {
  const isAuth = false
  const navigate = useNavigate()
  const PrivateRoutes = ({ Children }) => {
    isAuth ? Children : navigate('/register');

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
