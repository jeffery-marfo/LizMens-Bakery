
import { ChevronRight, ChevronLeft, X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HeroImg from '../assets/images/HeroImg.png';
import HeroImg2 from '../assets/images/HeroImg2.png';
import HeroImg3 from '../assets/images/HeroImg3.png';
import HeroImg4 from '../assets/images/HeroImg4.png';
import HeroDoodle from '../assets/images/HeroDoodle.png';

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedFilling, setSelectedFilling] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Map slides to menu items based on images
  const slideToProductMap = {
    0: { // Slide 1 - HeroImg - Spring Rolls
      id: 'spring-rolls',
      name: 'Spring Rolls',
      description: 'Crispy golden spring rolls filled with fresh vegetables and savory seasonings.',
      menuItemId: 'spring-rolls',
      fillings: [
        { type: 'Chicken', price: 25 },
        { type: 'Beef', price: 25 },
        { type: 'Veggie', price: 22 },
        { type: 'Beans', price: 20 },
        { type: 'Meat', price: 25 },
      ],
      packSize: 6,
    },
    1: { // Slide 2 - HeroImg3 - Chicken Samosas
      id: 'chicken-samosas',
      name: 'Chicken Samosas',
      description: 'Tender chicken with aromatic spices in a perfectly crispy shell.',
      menuItemId: 'samosas',
      fillings: [
        { type: 'Chicken', price: 30 },
        { type: 'Beef', price: 30 },
        { type: 'Veggie', price: 25 },
        { type: 'Beans', price: 22 },
        { type: 'Meat', price: 30 },
      ],
      packSize: 6,
    },
    2: { // Slide 3 - HeroImg2 - Beef Samosas
      id: 'beef-samosas',
      name: 'Beef Samosas',
      description: 'Deliciously spiced beef wrapped in crispy pastry. A family favorite.',
      menuItemId: 'samosas',
      fillings: [
        { type: 'Chicken', price: 30 },
        { type: 'Beef', price: 30 },
        { type: 'Veggie', price: 25 },
        { type: 'Beans', price: 22 },
        { type: 'Meat', price: 30 },
      ],
      packSize: 6,
    },
    3: { // Slide 4 - HeroImg4 - Veggie Spring Rolls
      id: 'veggie-spring-rolls',
      name: 'Veggie Spring Rolls',
      description: 'Light and healthy vegetable spring rolls, bursting with garden-fresh flavors.',
      menuItemId: 'spring-rolls',
      fillings: [
        { type: 'Chicken', price: 25 },
        { type: 'Beef', price: 25 },
        { type: 'Veggie', price: 22 },
        { type: 'Beans', price: 20 },
        { type: 'Meat', price: 25 },
      ],
      packSize: 6,
    },
  };

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

  const handleOrderNow = () => {
    const product = slideToProductMap[currentSlide];
    if (product) {
      setSelectedProduct({ ...product, image: slides[currentSlide].image });
      setSelectedFilling(null);
      setQuantity(1);
    }
  };

  const handleFillingSelect = (filling) => {
    setSelectedFilling(filling);
  };

  const updateQuantity = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    if (!selectedProduct || !selectedFilling) return;

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Create cart item
    const cartItem = {
      id: `${selectedProduct.menuItemId}-${selectedFilling.type}-${Date.now()}`,
      name: selectedProduct.name,
      filling: selectedFilling.type,
      price: selectedFilling.price,
      quantity: quantity,
      packSize: selectedProduct.packSize,
      description: selectedProduct.description,
    };

    // Add to cart
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Close modal and navigate to order page
    setSelectedProduct(null);
    setSelectedFilling(null);
    setQuantity(1);
    navigate('/order');
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
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
                  <button 
                    onClick={handleOrderNow}
                    className="rounded-lg bg-[#ff9500] px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md transition hover:shadow-lg hover:bg-[#e68600]"
                  >
                    {currentSlideData.buttonText}
                  </button>
                  <button 
                    onClick={() => navigate('/menu')}
                    className="rounded-lg border-2 border-black bg-white px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold text-black transition hover:bg-gray-50"
                  >
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

      {/* Order Selection Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedProduct(null);
                setSelectedFilling(null);
                setQuantity(1);
              }}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors z-10 bg-white/90 backdrop-blur-sm"
            >
              <X size={20} className="text-gray-600" />
            </button>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Product Image */}
              {selectedProduct.image && (
                <div className="mb-4 -mx-6 -mt-6 rounded-t-2xl overflow-hidden bg-gray-50">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              {/* Product Info */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {selectedProduct.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Filling Selection */}
              {selectedProduct.fillings && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Choose Filling:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProduct.fillings.map((filling) => (
                      <button
                        key={filling.type}
                        onClick={() => handleFillingSelect(filling)}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm font-semibold ${
                          selectedFilling?.type === filling.type
                            ? 'border-[#ff9500] bg-[#ff9500]/10 text-[#ff9500]'
                            : 'border-black/10 bg-white text-gray-700 hover:border-black/20'
                        }`}
                      >
                        <div className="font-bold">{filling.type}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          GH₵ {filling.price}.00
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Quantity:
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateQuantity(-1)}
                    className="p-2 rounded-lg border-2 border-black/10 hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-xl font-bold text-gray-900 w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(1)}
                    className="p-2 rounded-lg border-2 border-black/10 hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Price Display */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total:</span>
                  <span className="text-2xl font-bold text-gray-900">
                    GH₵ {selectedFilling ? selectedFilling.price * quantity : 0}.00
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedFilling}
                className={`w-full rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  !selectedFilling
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#ff9500] text-white hover:bg-[#e68600] hover:shadow-md'
                }`}
              >
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>
              {!selectedFilling && (
                <p className="text-xs text-red-500 mt-2 text-center">
                  Please select a filling above
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;