import { useState } from "react";
import LoginPopup from "../components/auth/LoginPopup.jsx";
import SignupPopup from "../components/auth/SignupPopup.jsx";
import logo from "../assets/hero-img.png";

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false); // State to control login popup visibility
  const [showSignup, setShowSignup] = useState(false); // State to control signup popup visibility

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-200 to-indigo-100
 flex flex-col items-center justify-center p-6"
    >
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-10">
        <div className="text-2xl font-bold text-indigo-700">
          InterviewPrep.AI
        </div>
        <div className="space-x-3">
          <button
            className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium shadow"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button
            className="px-4 py-2  bg-white text-indigo-600 rounded-lg font-medium shadow"
            onClick={() => setShowSignup(true)}
          >
            SignUp
          </button>
        </div>
      </header>

      {/* Hero image */}
      <img
        src={logo}
        alt="Hero"
        className="w-full max-w-xs sm:max-w-md mb-8 drop-shadow-lg"
      />

      {/* Hero text */}
      <main className="text-center max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Ace Interviews with AI-Powered Learning
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Generate personalized interview questions, take notes, and review
          technical concepts — all powered by AI and tailored to your role and
          experience.
        </p>
        <button
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-indigo-700"
          onClick={() => setShowSignup(true)}
        >
          Get Started
        </button>
      </main>

      {/* Popups */}
      {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupPopup onClose={() => setShowSignup(false)} />}
    </div>
  );
}
