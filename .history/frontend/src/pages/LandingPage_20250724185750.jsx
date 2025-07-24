import React from "react";
import { Link as ScrollLink } from "react-scroll";
import {Link as RouterLink} from 'react-router-dom'
import {useUser} from '../context/UserContext'
export default function LandingPage() {
  const {ct}=useUser()
  return (
    <div className="bg-gray-950 text-white font-sans scroll-smooth">
      
 
      <header className="p-4 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-xl font-bold text-purple-400">SmartExam</h1>
        <nav className="space-x-6 hidden md:block">
          <ScrollLink
            to="features"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-purple-400"
          >
            Features
          </ScrollLink>
          <ScrollLink
            to="how"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-purple-400"
          >
            How It Works
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-purple-400"
          >
            Contact
          </ScrollLink>
        </nav>
        <RouterLink
          to="/login"
          className="bg-purple-600 px-4 py-2 rounded cursor-pointer hover:bg-purple-700"
        >
          Login
        </RouterLink>
      </header>

      {/* Hero Section */}
      <section className="text-center px-4 py-20 bg-gradient-to-br from-purple-900 to-gray-900">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Generate & Evaluate Exams <span className="text-purple-400">with AI{console.log(ct)
          }</span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Empowering educators with instant AI-generated exams and auto-evaluation to save time and ensure accuracy.
        </p>
        <a href="/register" className="bg-purple-600 px-6 py-3 text-lg rounded hover:bg-purple-700">
          Get Started Free
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-gray-900">
        <h3 className="text-3xl text-center font-bold mb-12">Core Features</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div className="p-6 bg-gray-800 rounded-lg shadow">
            <h4 className="text-xl font-semibold mb-2 text-purple-300">🎓 AI Exam Generation</h4>
            <p>Create custom quizzes instantly based on topics, difficulty, and type.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow">
            <h4 className="text-xl font-semibold mb-2 text-purple-300">⚡ Auto Evaluation</h4>
            <p>Submissions are automatically scored with feedback.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow">
            <h4 className="text-xl font-semibold mb-2 text-purple-300">📊 Real-time Results</h4>
            <p>Students get immediate feedback and scores post-submission.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-16 px-6 bg-gray-950 border-t border-gray-800">
        <h3 className="text-3xl text-center font-bold mb-12">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div>
            <div className="text-5xl mb-4 text-purple-400">1️⃣</div>
            <h4 className="text-xl font-bold">Create an Exam</h4>
            <p>Choose topic, question type, difficulty — let AI generate it.</p>
          </div>
          <div>
            <div className="text-5xl mb-4 text-purple-400">2️⃣</div>
            <h4 className="text-xl font-bold">Share with Students</h4>
            <p>Students join with a link or code. No sign-up required.</p>
          </div>
          <div>
            <div className="text-5xl mb-4 text-purple-400">3️⃣</div>
            <h4 className="text-xl font-bold">Evaluate & Export</h4>
            <p>AI evaluates answers and provides downloadable reports.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 text-center bg-gray-900 border-t border-gray-800">
        <h4 className="text-xl font-semibold mb-2">Built by SmartExam Team</h4>
        <p className="text-sm text-gray-400">© 2025 All rights reserved.</p>
        <p className="mt-4 text-purple-300">Contact: rahulkainswal@gmail.com</p>
      </footer>
    </div>
  );
}
