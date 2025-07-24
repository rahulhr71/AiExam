import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isOpen,setIsOpen]=useState(true)



  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = [];
    if (name.length < 3 || name.length > 20) {
      errors.push("Name must be at least 3 characters.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Invalid email format')
    }

    if (password.length < 6) {
      errors.push("Password must be at least 6 characters.");
    }
    if (password != confirmPassword) {
      errors.push("confirm Password must be same");
    }
    const payload = { name: name, email: email, password: password, confirmPassword: confirmPassword }
    if (errors.length > 0) {
      return console.log(errors);

    }
    const response = await axios.post("http://localhost:4000/api/auth/register",payload)
    if (response.status === 201) {
      console.log(response.data.user)
      navigate("/login");
    }
    if(response.status === 400){
      console.log(response.data.message,"fails")
    }
    if(response.status === 409){
      console.log('user already exist');
    }
     if(response.status ===500){
      console.log('internal server error')
     }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-gray-950 px-4">
      <Link
        to="/"
        className="absolute top-4 left-4 text-sm text-white hover:text-purple-300 hover:underline"
      >

        Home &gt;
      </Link>
      <PopupModal/>
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl max-w-md w-full border border-purple-800">
        <h2 className="text-3xl font-bold text-purple-400 text-center mb-6">
          SmartExam Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              required

              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-purple-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-purple-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-purple-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-purple-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to='/login' className="text-purple-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
function PopupModal({ isOpen, onClose, title, children }) {
  if (isOpen===true) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-semibold mb-4 text-purple-600">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
}
