import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Login Data:", form);
    
    try{
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        form,
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        alert("Login successful!");
        navigate("/student"); 
        return;
      }

      if (response.status === 401) {
        alert("⚠️ Invalid credentials. Please try again.");
        return;
      }

      if (response.status === 500) {
        alert("⚠️ Server error. Please try again later.");
        return;
      } 
    }
    catch (error) {
      console.error("Login error:", error);
      alert("⚠️ An error occurred. Please try again later.");
    }
    alert("✅ Login successful!");
    navigate("/student"); // redirect to student dashboard
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
