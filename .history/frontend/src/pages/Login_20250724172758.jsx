import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    
    if (email && password) {
      console.log("Login success", { email, password });
      navigate("/dashboard"); 
    } else {
      alert("Please fill in all fields.");
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
          SmartExam Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-400 mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-purple-400 hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
