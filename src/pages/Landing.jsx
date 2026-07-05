import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Library, ArrowRight, Activity, Cpu } from 'lucide-react';
import libraryHeroBg from '../assets/library_hero_bg.png';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col relative overflow-hidden">
      {/* Decent Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img src={libraryHeroBg} alt="Background" className="w-full h-full object-cover" />
      </div>
      {/* Decorative Blur Spheres */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[130px] pointer-events-none"></div>

      {/* Navigation Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-gray-800/40 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Library className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-indigo-400 bg-clip-text text-transparent">
            Libraro
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all duration-300"
          >
            Sign In
          </Link>
          <Link
            to="/login"
            className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 transform hover:-translate-y-[1px]"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 max-w-7xl mx-auto w-full py-16 relative z-10">
        <div className="text-center max-w-3xl space-y-6">
          {/* Subtle Pill */}
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/25 px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-400 tracking-wider uppercase mb-2 animate-pulse">
            <Activity className="w-3.5 h-3.5" />
            <span>Smart Inventory System v2.0</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            Welcome to the{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Digital Library
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            Manage books, users, and transactions effortlessly. The modern MERN solution designed for fast-paced administrative logistics.
          </p>

          {/* Action Callouts */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/35 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              Access Portal
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Features Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full">
          {/* Card 1 */}
          <div className="glass hover:bg-gray-800/40 p-8 rounded-3xl transition-all duration-300 group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-3">Inventory Tracking</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Real-time synchronization of physical status, categories, total stock, and available copies database-wide.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass hover:bg-gray-800/40 p-8 rounded-3xl transition-all duration-300 group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Cpu className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-3">Seamless Book Issuing</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Issue books instantaneously. Automate transaction tracking and automatically decrement copy volume counters.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass hover:bg-gray-800/40 p-8 rounded-3xl transition-all duration-300 group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-3">Secure Credentials</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Strict role authentication limits administrative mutations to verified Admin accounts via secure JWT structures.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 w-full max-w-7xl mx-auto px-6 border-t border-gray-800/40 text-center text-gray-500 text-xs mt-12 relative z-10">
        <p>© 2026 Libraro Management Portal. Powered by the MERN stack.</p>
      </footer>
    </div>
  );
};

export default Landing;
