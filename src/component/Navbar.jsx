import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm shadow-2xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-pink-300 transition-all">
              📝 NoteKey
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              🏠 Home
            </Link>
            <Link 
              to="/tasks" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/tasks') 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              📋 Tasks
            </Link>
            <Link 
              to="/about" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/about') 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              ℹ️ About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar