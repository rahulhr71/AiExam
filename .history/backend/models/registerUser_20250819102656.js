// models/registerUser.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
    studentType: { type: String, enum: ["school", "college", ""], default: "" },
    rollOrEmpId: { type: String, required: true },
    classOrDept: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });

// ✅ export the model
const User = mongoose.model("User", userSchema);
module.exports = User;
