import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900/95 backdrop-blur-sm border-t border-white/10 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white/80">
              Made with ❤️ by{' '}
              <span className="font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                Coder Hacks
              </span>
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors">Privacy</a>
            <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors">Terms</a>
            <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-white/50 text-sm">
            © 2024 NoteKey. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;