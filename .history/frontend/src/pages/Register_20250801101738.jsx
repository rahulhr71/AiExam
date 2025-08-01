import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import PopupModal from "../components/PopupModal";

export default function Register() {
  const navigate = useNavigate();
  const firstRender = useRef(true);

  const courseOptions = {
    School: ['Math', 'Science', 'English', 'Social Studies'],
    College: ['BCA', 'B.Tech', 'B.Com', 'BA', 'MBA'],
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    category: '',
    course: '',
  });

  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (errors.length > 0) {
      setShowModal(true);
      console.log(errors);
    }
  }, [errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset course when category changes
    if (name === 'category') {
      setFormData((prev) => ({ ...prev, category: value, course: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = [];

    const { name, email, password, confirmPassword, category, course } = formData;

    if (name.length < 3 || name.length > 20) {
      tempErrors.push("Name must be at least 3 characters.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.push('Invalid email format');
    }
    if (password.length < 6) {
      tempErrors.push("Password must be at least 6 characters.");
    }
    if (password !== confirmPassword) {
      tempErrors.push("Confirm Password must be same as Password.");
    }
    if (!category) {
      tempErrors.push("Please select a category.");
    }
    if (!course) {
      tempErrors.push("Please select a course.");
    }

    if (tempErrors.length > 0) {
      setErrors(tempErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/auth/register", formData);

      if (response.status === 201) {
        alert("User registered successfully!");
        navigate('/login');
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
      <Link to="/" className="absolute top-4 left-4 text-sm text-white hover:text-purple-300 hover:underline">Home &gt; </Link>
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl max-w-md w-full border border-purple-800">
        <h2 className="text-3xl font-bold text-purple-400 text-center mb-6">
          SmartExam Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-purple-500"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-purple-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-purple-500"
            >
              <option value="">Select Category</option>
              <option value="School">School</option>
              <option value="College">College</option>
            </select>
          </div>

          {/* Course */}
          {formData.category && (
            <div>
              <label className="block mb-1 text-sm text-gray-300">Course</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-purple-500"
              >
                <option value="">Select Course</option>
                {courseOptions[formData.category].map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-purple-500"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-purple-500"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-sm text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to='/login' className="text-purple-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      <PopupModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Validation Errors"
        children={errors}
      />
    </div>
  );
}
