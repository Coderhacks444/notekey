import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
            NoteKey
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-8 font-light">
            Your Ultimate Task Management Solution
          </p>
          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Organize your life with our beautiful, intuitive task manager. 
            Create, edit, and track your todos with style and efficiency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/tasks" 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started 🚀
            </Link>
            <Link 
              to="/about" 
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 border border-white/20"
            >
              Learn More
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-white/70">Instant task creation and updates</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-white mb-2">Beautiful Design</h3>
              <p className="text-white/70">Modern UI with smooth animations</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="text-xl font-semibold text-white mb-2">Auto Save</h3>
              <p className="text-white/70">Never lose your tasks again</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;