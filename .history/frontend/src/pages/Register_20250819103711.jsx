import { cache, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
 
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "student",
    studentType: "", 
    rollOrEmpId: "",
    classOrDept: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Register Data:", form);
    try{
      const resposnse = await axios.post("http://localhost:4000/api/auth/login", form, {
        withCredentials: true,
      });
      if (resposnse.status === 201) {
        console.log("Registration successful:", resposnse.data);
        navigate("/login");
        return;
      }
      if (resposnse.status === 409) {
        console.error("Email already exists:", resposnse.data);
        alert("Email already exists. Please use a different email.");
        return;
      }
      if (resposnse.status === 400) {
        console.error("Validation error:", resposnse.data);
        alert("Validation error. Please check your input.");
        return;
      }
      if (resposnse.status === 500) {
        console.error("Server error:", resposnse.data);
        alert("Server error. Please try again later.");
        return;
      }

      

    } catch (error) {
      console.error("Registration Error:", error);
      alert(" Registration failed. Please try again.");
      return;
    }
    alert("✅ Registration successful!");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />

          {/* Role */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="student">Student 👨‍🎓</option>
            <option value="teacher">Teacher 👩‍🏫</option>
          </select>

          {/* Student Type (College/School) */}
          {form.role === "student" && (
            <select
              name="studentType"
              value={form.studentType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">Select Student Type</option>
              <option value="school">School</option>
              <option value="college">College</option>
            </select>
          )}

          {/* Roll No / Employee ID */}
          <input
            type="text"
            name="rollOrEmpId"
            placeholder={form.role === "student" ? "Roll Number" : "Employee ID"}
            value={form.rollOrEmpId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />

          {/* Class (School) OR Branch (College) OR Department (Teacher) */}
          {form.role === "student" ? (
            form.studentType === "school" ? (
              <select
                name="classOrDept"
                value={form.classOrDept}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">Select Class</option>
                <option value="10A">10th A</option>
                <option value="10B">10th B</option>
                <option value="11A">11th A</option>
                <option value="11B">11th B</option>
                <option value="12A">12th A</option>
                <option value="12B">12th B</option>
              </select>
            ) : form.studentType === "college" ? (
              <select
                name="classOrDept"
                value={form.classOrDept}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">Select Branch</option>
                <option value="CSE">Computer Science (CSE)</option>
                <option value="IT">Information Technology (IT)</option>
                <option value="ECE">Electronics & Communication (ECE)</option>
                <option value="EEE">Electrical & Electronics (EEE)</option>
                <option value="MECH">Mechanical Engineering (MECH)</option>
                <option value="CIVIL">Civil Engineering</option>
              </select>
            ) : null
          ) : (
            <input
              type="text"
              name="classOrDept"
              placeholder="Department"
              value={form.classOrDept}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          )}

          {/* Address */}
          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg h-20"
            required
          ></textarea>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
