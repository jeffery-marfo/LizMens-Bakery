import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-b from-black/25 via-black/15 to-transparent  border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* LEFT SECTION - LOGO/BRAND */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group transition-transform duration-300 hover:scale-105"
          >
            {/* Brand name */}
            <span className="text-white text-xl md:text-2xl font-bold tracking-tight transition-all duration-300">
              eduromɔ-naa
            </span>
          </Link>

          {/* MIDDLE SECTION - NAVIGATION TABS */}
          <div className="hidden md:flex items-center space-x-0">
            <Link
              to="/"
              className={`group relative px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                isActive('/')
                  ? 'text-white'
                  : 'text-white/90 hover:text-white hover:scale-105'
              }`}
            >
              <span className="relative z-10">Home</span>
              {isActive('/') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#000000] to-transparent animate-pulse"></span>
              )}
              {!isActive('/') && (
                <span className="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-[#000000] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              )}
            </Link>
            <div className="h-6 w-px bg-white/40 mx-2" />
            <Link
              to="/menu"
              className={`group relative px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                isActive('/menu')
                  ? 'text-white'
                  : 'text-white/90 hover:text-white hover:scale-105'
              }`}
            >
              <span className="relative z-10">Menu</span>
              {isActive('/menu') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#000000] to-transparent animate-pulse"></span>
              )}
              {!isActive('/menu') && (
                <span className="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-[#000000] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              )}
            </Link>
            <div className="h-6 w-px bg-white/40 mx-2" />
            <Link
              to="/order"
              className={`group relative px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                isActive('/order')
                  ? 'text-white'
                  : 'text-white/90 hover:text-white hover:scale-105'
              }`}
            >
              <span className="relative z-10">Order</span>
              {isActive('/order') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#000000] to-transparent animate-pulse"></span>
              )}
              {!isActive('/order') && (
                <span className="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-[#000000] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              )}
            </Link>
            <div className="h-6 w-px bg-white/40 mx-2" />
            <Link
              to="/delivery"
              className={`group relative px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                isActive('/delivery')
                  ? 'text-white'
                  : 'text-white/90 hover:text-white hover:scale-105'
              }`}
            >
              <span className="relative z-10">Delivery</span>
              {isActive('/delivery') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#000000] to-transparent animate-pulse"></span>
              )}
              {!isActive('/delivery') && (
                <span className="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-[#000000] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              )}
            </Link>
          </div>

          {/* RIGHT SECTION - ACCOUNT */}
          <div className="flex items-center space-x-3">
          
            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-white/15 py-4 backdrop-blur-xl bg-gradient-to-b from-black/25 via-black/15 to-transparent">
            <div className="flex flex-col space-y-1">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`relative px-4 py-3 text-sm font-semibold uppercase tracking-wide rounded-lg transition-all duration-300 ${
                  isActive('/')
                    ? 'text-white bg-gradient-to-r from-white/20 to-white/10 border-l-4 border-[#000000]'
                    : 'text-white/90 hover:text-white hover:bg-white/10 hover:translate-x-2'
                }`}
              >
                Home
              </Link>
              <Link
                to="/menu"
                onClick={() => setIsMenuOpen(false)}
                className={`relative px-4 py-3 text-sm font-semibold uppercase tracking-wide rounded-lg transition-all duration-300 ${
                  isActive('/menu')
                    ? 'text-white bg-gradient-to-r from-white/20 to-white/10 border-l-4 border-[#000000]'
                    : 'text-white/90 hover:text-white hover:bg-white/10 hover:translate-x-2'
                }`}
              >
                Menu
              </Link>
              <Link
                to="/order"
                onClick={() => setIsMenuOpen(false)}
                className={`relative px-4 py-3 text-sm font-semibold uppercase tracking-wide rounded-lg transition-all duration-300 ${
                  isActive('/order')
                    ? 'text-white bg-gradient-to-r from-white/20 to-white/10 border-l-4 border-[#000000]'
                    : 'text-white/90 hover:text-white hover:bg-white/10 hover:translate-x-2'
                }`}
              >
                Order
              </Link>
              <Link
                to="/delivery"
                onClick={() => setIsMenuOpen(false)}
                className={`relative px-4 py-3 text-sm font-semibold uppercase tracking-wide rounded-lg transition-all duration-300 ${
                  isActive('/delivery')
                    ? 'text-white bg-gradient-to-r from-white/20 to-white/10 border-l-4 border-[#000000]'
                    : 'text-white/90 hover:text-white hover:bg-white/10 hover:translate-x-2'
                }`}
              >
                Delivery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
