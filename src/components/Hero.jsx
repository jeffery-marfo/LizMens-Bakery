
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

import NoBGPattern from '../assets/images/NoBG_Pattern.png';
import HeroImg from '../assets/images/HeroImg.png';
import HeroImg2 from '../assets/images/HeroImg2.png';
import HeroImg3 from '../assets/images/HeroImg3.png';
import HeroImg4 from '../assets/images/HeroImg4.png';
import HeroDoodle from '../assets/images/HeroDoodle.png';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: ['TASTE THE', 'DIFFERENCE.'],
      subtitle: 'Handcrafted with care. Made fresh daily with premium ingredients and traditional recipes.',
      buttonText: 'Order Now',
      image: HeroImg,
      imageAlt: 'Crispy Spring Rolls',
      nutritionalTitle: 'Nutritional Info',
      nutritionalDescription: 'Enjoy our crispy spring rolls, a delicious snack packed with veggies, protein, and fibre to fuel your day!',
      badges: [
        { text: 'Protein 9g', color: 'yellow-400', textColor: 'black' },
        { text: 'Protein 9g', color: 'red-500', textColor: 'white' },
        { text: 'Protein 9g', color: 'blue-600', textColor: 'white' },
        { text: 'Protein 9g', color: 'green-500', textColor: 'white' },
      ],
    },
    {
      id: 2,
      title: ['FRESH &', 'DELICIOUS.'],
      subtitle: 'Premium quality ingredients, expertly prepared to deliver exceptional flavor in every bite.',
      buttonText: 'Order Now',
      image: HeroImg3,
      imageAlt: 'Fresh Delights',
      nutritionalTitle: 'Nutritional Info',
      nutritionalDescription: 'Packed with essential nutrients, vitamins, and minerals to keep you energized throughout the day!',
      badges: [
        { text: 'Protein 9g', color: 'yellow-400', textColor: 'black' },
        { text: 'Protein 9g', color: 'red-500', textColor: 'white' },
        { text: 'Protein 9g', color: 'blue-600', textColor: 'white' },
        { text: 'Protein 9g', color: 'green-500', textColor: 'white' },
      ],
    },
    {
      id: 3,
      title: ['PREMIUM', 'QUALITY.'],
      subtitle: 'Sourced from the finest ingredients, crafted with passion and attention to detail.',
      buttonText: 'Order Now',
      image: HeroImg2,
      imageAlt: 'Premium Selection',
      nutritionalTitle: 'Nutritional Info',
      nutritionalDescription: 'A perfect balance of taste and nutrition, designed to satisfy your cravings healthily!',
      badges: [
        { text: 'Protein 9g', color: 'yellow-400', textColor: 'black' },
        { text: 'Protein 9g', color: 'red-500', textColor: 'white' },
        { text: 'Protein 9g', color: 'blue-600', textColor: 'white' },
        { text: 'Protein 9g', color: 'green-500', textColor: 'white' },
      ],
    },
    {
      id: 4,
      title: ['EXPERIENCE', 'EXCELLENCE.'],
      subtitle: 'Every dish tells a story of tradition, quality, and our commitment to your satisfaction.',
      buttonText: 'Order Now',
      image: HeroImg4,
      imageAlt: 'Excellence Collection',
      nutritionalTitle: 'Nutritional Info',
      nutritionalDescription: 'Nutritious and delicious, our meals are designed to fuel your body and delight your taste buds!',
      badges: [
        { text: 'Protein 9g', color: 'yellow-400', textColor: 'black' },
        { text: 'Protein 9g', color: 'red-500', textColor: 'white' },
        { text: 'Protein 9g', color: 'blue-600', textColor: 'white' },
        { text: 'Protein 9g', color: 'green-500', textColor: 'white' },
      ],
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* BACKGROUND PATTERN - NoBG_Pattern.png */}
      <div
        className="opacity-50 absolute inset-0"
        style={{
          backgroundImage: `url(${NoBGPattern})`,
          backgroundRepeat: 'repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white/90 backdrop-blur-sm text-gray-800 p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white/90 backdrop-blur-sm text-gray-800 p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* CENTER WRAPPER */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6">
        {/* WHITE HERO CARD */}
        <div className="relative w-full max-w-[1200px] rounded-[28px] bg-white px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
          {/* Animated Content */}
          <div
            key={currentSlide}
            className="animate-fadeIn"
          >
            {/* GRID - 3 COLUMNS: TEXT | IMAGE | NUTRITIONAL INFO */}
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.3fr_0.8fr] items-center gap-8 lg:gap-12 xl:gap-16">
              {/* LEFT COLUMN - TEXT CONTENT */}
              <div className="space-y-4 sm:space-y-5 md:space-y-6 order-1 lg:order-1">
                <h1 className="text-4xl sm:text-5xl md:text-[56px] font-extrabold leading-[1.05] tracking-tight text-black">
                  {currentSlideData.title[0]}
                  <br />
                  {currentSlideData.title[1]}
                </h1>

                <p className="max-w-md text-sm sm:text-[15px] leading-relaxed text-gray-600">
                  {currentSlideData.subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                  <button className="rounded-lg bg-[#ff9500] px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md transition hover:shadow-lg hover:bg-[#e68600]">
                    {currentSlideData.buttonText}
                  </button>
                  <button className="rounded-lg border-2 border-black bg-white px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold text-black transition hover:bg-gray-50">
                    View Menu
                  </button>
                </div>
              </div>

              {/* CENTER COLUMN - HERO IMAGE */}
              <div className="relative flex items-center justify-center order-2 lg:order-2">
                <img
                  src={currentSlideData.image}
                  alt={currentSlideData.imageAlt}
                  className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[380px] xl:max-w-[420px] drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)] transition-opacity duration-500"
                />
              </div>

              {/* RIGHT COLUMN - NUTRITIONAL INFO */}
              <div className="order-3 lg:order-3">
                <div className="w-full max-w-[280px] mx-auto lg:mx-0 rounded-xl bg-white p-4 sm:p-5">
                  <h3 className="mb-2 text-base sm:text-lg font-bold text-black">
                    {currentSlideData.nutritionalTitle}
                  </h3>

                  <p className="mb-3 text-xs sm:text-[13px] leading-relaxed text-gray-500">
                    {currentSlideData.nutritionalDescription}
                  </p>

                  {/* NUTRITIONAL BADGES - 2x2 GRID */}
                  <div className="grid grid-cols-2 gap-2">
                    {currentSlideData.badges.map((badge, index) => {
                      const bgColorClasses = {
                        'yellow-400': 'bg-yellow-400',
                        'red-500': 'bg-red-500',
                        'blue-600': 'bg-blue-600',
                        'green-500': 'bg-green-500',
                      };
                      const textColorClasses = {
                        'black': 'text-black',
                        'white': 'text-white',
                      };
                      return (
                        <span
                          key={index}
                          className={`rounded-lg ${bgColorClasses[badge.color]} px-3 py-1.5 text-[11px] font-semibold ${textColorClasses[badge.textColor]} text-center`}
                        >
                          {badge.text}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              index === currentSlide
                ? 'bg-gray-800 scale-125'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      
    </section>
  );
};

export default HeroSection;