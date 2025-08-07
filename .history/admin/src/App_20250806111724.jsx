import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/students" element={<Dashboard />} />
        <Route path="/dashboard/teachers" element={<Dashboard />} />
        <Route path="/dashboard/settings" element={<Dashboard />} />
        <Route path="/dashboard/exams" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
