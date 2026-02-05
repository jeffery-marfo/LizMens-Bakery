import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, X, Plus, Minus, ShoppingCart } from 'lucide-react';
import HeroImg from '../assets/images/HeroImg.png';
import HeroImg2 from '../assets/images/HeroImg2.png';
import HeroImg3 from '../assets/images/HeroImg3.png';
import HeroImg4 from '../assets/images/HeroImg4.png';

const ProductsSection = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedFilling, setSelectedFilling] = useState(null);
  const [quantity, setQuantity] = useState(1);
  // Product data with menu item mappings
  const products = [
    {
      id: 1,
      name: 'Classic Spring Rolls',
      description: 'Crispy golden spring rolls filled with fresh vegetables and savory seasonings.',
      price: 25,
      pricePerPiece: 'per pack of 6',
      badge: 'Popular',
      image: HeroImg,
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
    {
      id: 2,
      name: 'Beef Samosas',
      description: 'Deliciously spiced beef wrapped in crispy pastry. A family favorite.',
      price: 30,
      pricePerPiece: 'per pack of 6',
      badge: 'Best Seller',
      image: HeroImg2,
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
    {
      id: 3,
      name: 'Chicken Samosas',
      description: 'Tender chicken with aromatic spices in a perfectly crispy shell.',
      price: 28,
      pricePerPiece: 'per pack of 6',
      badge: 'New',
      image: HeroImg3,
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
    {
      id: 4,
      name: 'Veggie Spring Rolls',
      description: 'Light and healthy vegetable spring rolls, bursting with garden-fresh flavors.',
      price: 22,
      pricePerPiece: 'per pack of 6',
      badge: 'Healthy',
      image: HeroImg4,
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
    {
      id: 5,
      name: 'Mixed Platter',
      description: 'The best of both worlds with our assorted spring rolls and samosas.',
      price: 50,
      pricePerPiece: '12 pieces mixed',
      badge: 'Value Pack',
      image: HeroImg,
      menuItemId: 'mixed-platter',
      fillings: [
        { type: '12 pieces', price: 50 },
        { type: '18 pieces', price: 75 },
        { type: '24 pieces', price: 95 },
      ],
      packSize: 12,
    },
    {
      id: 6,
      name: 'Party Pack',
      description: 'Perfect for gatherings! A generous selection of spring rolls and samosas.',
      price: 120,
      pricePerPiece: '30 pieces mixed',
      badge: 'Party Size',
      image: HeroImg2,
      menuItemId: 'party-pack',
      fillings: [
        { type: '30 pieces', price: 120 },
        { type: '40 pieces', price: 155 },
        { type: '50 pieces', price: 190 },
      ],
      packSize: 30,
    },
  ];

  const handleOrderNow = (product) => {
    setSelectedProduct(product);
    setSelectedFilling(null);
    setQuantity(1);
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

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
            Our Products
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Fresh spring rolls &amp; samosas
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            Handcrafted with love and the finest ingredients. Every bite is a taste of home-cooked perfection.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl border border-black/10 bg-white/85 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Product Image */}
              {product.image && (
                <div className="mb-4 -mx-6 -mt-6 rounded-t-2xl overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Badge */}
              {product.badge && (
                <div className="mb-4">
                  <span className="inline-block rounded-lg bg-[#ff9500]/10 px-3 py-1 text-xs font-semibold text-[#ff9500]">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Product Info */}
              <div>
                <h3 className="text-lg font-bold tracking-tight text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 mb-4 min-h-[48px]">
                  {product.description}
                </p>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      GH₵ {product.price}.00
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {product.pricePerPiece}
                  </span>
                </div>

                {/* Order Button */}
                <button 
                  onClick={() => handleOrderNow(product)}
                  className="w-full rounded-lg border-2 border-black bg-white px-4 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-gray-50 hover:shadow-sm flex items-center justify-center gap-2 group/btn"
                >
                  <span>Order Now</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

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

export default ProductsSection;
