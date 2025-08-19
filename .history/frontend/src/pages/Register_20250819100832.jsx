import { useState } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", form);

    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
      
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />


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

   
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="student">Student 👨‍🎓</option>
            <option value="teacher">Teacher 👩‍🏫</option>
          </select>

       
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

          <input
            type="text"
            name="rollOrEmpId"
            placeholder={form.role === "student" ? "Roll Number" : "Employee ID"}
            value={form.rollOrEmpId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />

          
          {form.role === "student" ? (
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
