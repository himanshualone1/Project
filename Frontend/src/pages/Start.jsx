import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden flex flex-col">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">GoCab</span>
          </div>

          {/* Sign In Link */}
          <Link 
            to="/login" 
            className="text-white text-sm font-medium hover:text-yellow-400 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12">
          <div className="inline-block">
            <span className="bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-500/20">
              🚀 Your Ride, Your Way
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Ride with
            <span className="block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Confidence
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            Experience seamless rides with verified drivers, real-time tracking, and competitive pricing.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-lg mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-all">
            <div className="text-3xl mb-2">⚡</div>
            <p className="text-white text-xs font-medium">Fast Pickup</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-all">
            <div className="text-3xl mb-2">💰</div>
            <p className="text-white text-xs font-medium">Best Prices</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-all">
            <div className="text-3xl mb-2">🛡️</div>
            <p className="text-white text-xs font-medium">Safe & Secure</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-lg mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">50K+</div>
            <div className="text-gray-400 text-xs">Active Riders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">5K+</div>
            <div className="text-gray-400 text-xs">Drivers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">4.8★</div>
            <div className="text-gray-400 text-xs">Rating</div>
          </div>
        </div>
      </main>

      {/* Bottom CTA Card */}
      <div className="relative z-10 bg-white rounded-t-[2.5rem] px-6 py-8 shadow-2xl">
        <div className="max-w-lg mx-auto space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Get Started
            </h2>
            <p className="text-gray-600 text-base">
              Join thousands of riders enjoying reliable transportation
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/login"
              className="flex items-center justify-center w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="mr-2">🚗</span>
              Book a Ride
            </Link>

            <Link
              to="/captain-login"
              className="flex items-center justify-center w-full bg-gray-900 text-white font-semibold py-4 rounded-2xl shadow-lg hover:bg-gray-800 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="mr-2">💼</span>
              Drive with GoCab
            </Link>
          </div>

          {/* Additional Info */}
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 pt-2">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>24/7 Support</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Safe Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Start;