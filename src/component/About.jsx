import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
          <h1 className="text-5xl font-bold mb-6 text-white text-center">About NoteKey</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h2 className="text-2xl font-semibold text-cyan-300 mb-4">🚀 Our Mission</h2>
              <p className="text-gray-200 leading-relaxed">
                NoteKey is designed to simplify your task management experience. We believe in creating 
                intuitive, powerful tools that help you stay organized and productive.
              </p>
            </div>
            
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h2 className="text-2xl font-semibold text-pink-300 mb-4">✨ Features</h2>
              <ul className="text-gray-200 space-y-2">
                <li>• Real-time task management</li>
                <li>• Smart filtering system</li>
                <li>• Local storage persistence</li>
                <li>• Responsive design</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
            <h2 className="text-2xl font-semibold text-yellow-300 mb-4">🎯 Why Choose NoteKey?</h2>
            <p className="text-gray-200 leading-relaxed max-w-2xl mx-auto">
              Built with modern React technology, NoteKey offers a seamless experience across all devices. 
              Your tasks are automatically saved locally, ensuring you never lose your important notes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;