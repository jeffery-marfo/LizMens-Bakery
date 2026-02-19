import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full backdrop-blur-xl bg-gradient-to-b from-transparent via-black/15 to-black/25 border-white/15 text-white bg-black/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 font-semibold ">
        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8">
          {/* LEFT SECTION - CONTACT */}
          <div>
            <h3 className="text-white font-bold text-lg md:text-xl uppercase mb-4 tracking-wide">
              CONTACT
            </h3>
            <div className="space-y-2 text-white/90 text-sm md:text-base">
              <p className="hover:text-white transition-colors duration-300">KAE DABI HOUSE, Teshie, Aboma, Accra, Ghana</p>
              <p className="hover:text-white transition-colors duration-300">0244 097 094</p>
              <p className="hover:text-white transition-colors duration-300">020 572 1817</p>
            </div>
          </div>

          {/* RIGHT SECTION - BRAND & SOCIAL */}
          <div className="flex flex-col items-start md:items-end">
            {/* Brand Logo and Name */}
            <div className="flex items-center space-x-3 mb-4 group">
              {/* Logo - Square with intricate pattern */}
              <div className="w-12 h-12 border-2 border-white/60 flex items-center justify-center bg-white/10 backdrop-blur-sm hover:border-white/90 hover:bg-white/15 transition-all duration-300 group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-8 h-8 text-white transition-transform duration-300 group-hover:rotate-90"
                >
                  {/* Four-leaf clover / interconnected pattern */}
                  <circle cx="12" cy="12" r="8" stroke="currentColor" fill="none" />
                  <circle cx="12" cy="8" r="3" stroke="currentColor" fill="none" />
                  <circle cx="12" cy="16" r="3" stroke="currentColor" fill="none" />
                  <circle cx="8" cy="12" r="3" stroke="currentColor" fill="none" />
                  <circle cx="16" cy="12" r="3" stroke="currentColor" fill="none" />
                </svg>
              </div>
              <span className="text-white font-bold text-xl md:text-2xl uppercase tracking-tight transition-all duration-300 group-hover:text-white">
                eduromɔ-naa
              </span>
            </div>

            {/* Tagline */}
            <p className="text-white/90 text-sm md:text-base mb-6 max-w-md text-left md:text-right leading-relaxed hover:text-white transition-colors duration-300">
              Handcrafted with care. Made fresh daily with premium ingredients and traditional recipes.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              {/* Instagram Icon */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 text-white/80 hover:text-white hover:scale-110 transition-all duration-300 flex items-center justify-center rounded-lg hover:bg-white/10 p-1"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-full h-full"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </a>

              {/* Twitter Icon */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 text-white/80 hover:text-white hover:scale-110 transition-all duration-300 flex items-center justify-center rounded-lg hover:bg-white/10 p-1"
                aria-label="Twitter"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-full h-full"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* SEPARATOR LINE */}
        <div className="border-t border-white/15 my-8"></div>

        {/* COPYRIGHT */}
        <div className="text-center text-white/70 text-xs md:text-sm">
          © {currentYear} eduromɔ-naa. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
