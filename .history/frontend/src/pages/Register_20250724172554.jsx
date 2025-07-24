import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import PopupModal from "../components/PopupModal";
export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([])
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (errors && Object.keys(errors).length > 0) {
      setShowModal(true);
      console.log(errors);
    }

  }, [errors])
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3 || name.length > 20) {
      setErrors(prev => [...prev, "Name must be at least 3 characters."]);
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

    }
    try {
    const response = await axios.post("http://localhost:4000/api/auth/register", payload);

    if (response.status === 201) {
      alert("User registered successfully!");
      navigate('/login');
    } else if (response.status === 400) {
      console.log(response.data.message, "Bad Request");
      alert("Bad request: " + response.data.message);
    } else if (response.status === 500) {
      alert("Internal Server Error");
    } else {
      alert("Unexpected response");
      console.log("response:", response);
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      if (status === 409) {
        alert("User already exists");
      } else if (status === 400) {
        alert("Validation failed: " + error.response.data.message);
      } else if (status === 500) {
        alert("Server error: " + error.response.data.message);
      } else {
        alert("Error: " + error.response.data.message);
      }
    } else {
      alert("No response from server");
      console.error("Network error:", error);
    }
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
      <PopupModal isOpen={showModal} onClose={() => setShowModal(false)} title="Validations Error" children={errors} />
    </div>
  );
}

