import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200/80 shadow-sm">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-2 text-xl font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span>InterviewPrep AI</span>
          </Link>

          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 text-sm font-medium"
            >
              Help
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar