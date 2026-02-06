import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import HeroImg from "../assets/images/HeroImg.png";
import HeroImg2 from "../assets/images/HeroImg2.png";
import HeroImg3 from "../assets/images/HeroImg3.png";
import HeroImg4 from "../assets/images/HeroImg4.png";

const Menu = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("individual");

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Menu items with filling options - ALL items now require selection
  const menuItems = {
    individual: [
      {
        id: "spring-rolls",
        name: "Spring Rolls",
        description: "Crispy golden spring rolls",
        basePrice: 1,
        image: HeroImg,
        fillings: [
          { type: "Chicken", price: 1 },
          { type: "Beef", price: 25 },
          { type: "Veggie", price: 22 },
          { type: "Beans", price: 20 },
          { type: "Meat", price: 25 },
        ],
        packSize: 6,
      },
      {
        id: "samosas",
        name: "Samosas",
        description: "Deliciously spiced pastry",
        basePrice: 30,
        image: HeroImg2,
        fillings: [
          { type: "Chicken", price: 30 },
          { type: "Beef", price: 30 },
          { type: "Veggie", price: 25 },
          { type: "Beans", price: 22 },
          { type: "Meat", price: 30 },
        ],
        packSize: 6,
      },
      {
        id: "mosa",
        name: "Mosa",
        description: "Traditional fried snack",
        basePrice: 15,
        image: HeroImg3,
        fillings: [
          { type: "Regular", price: 15 },
          { type: "Spicy", price: 17 },
          { type: "Extra Spicy", price: 18 },
        ],
        packSize: 5,
      },
      {
        id: "peppered-beef",
        name: "Peppered Beef",
        description: "Spicy seasoned beef",
        basePrice: 20,
        image: HeroImg4,
        fillings: [
          { type: "Mild", price: 20 },
          { type: "Medium", price: 20 },
          { type: "Hot", price: 22 },
          { type: "Extra Hot", price: 24 },
        ],
        packSize: 5,
      },
      {
        id: "peppered-chicken",
        name: "Peppered Chicken",
        description: "Spicy seasoned chicken",
        basePrice: 22,
        image: HeroImg,
        fillings: [
          { type: "Mild", price: 22 },
          { type: "Medium", price: 22 },
          { type: "Hot", price: 24 },
          { type: "Extra Hot", price: 26 },
        ],
        packSize: 5,
      },
      {
        id: "sausage",
        name: "Sausage",
        description: "Grilled sausages",
        basePrice: 15,
        image: HeroImg2,
        fillings: [
          { type: "Beef", price: 15 },
          { type: "Chicken", price: 15 },
          { type: "Pork", price: 17 },
          { type: "Mixed", price: 16 },
        ],
        packSize: 5,
      },
      {
        id: "puff-puff",
        name: "Puff-Puff",
        description: "Sweet fried dough balls",
        basePrice: 10,
        image: HeroImg3,
        fillings: [
          { type: "Regular", price: 10 },
          { type: "Vanilla", price: 12 },
          { type: "Chocolate", price: 12 },
          { type: "Cinnamon", price: 11 },
        ],
        packSize: 10,
      },
    ],
    platters: [
      {
        id: "platter-8k",
        name: "8K Platter",
        description:
          "5 Samosa, 5 Spring Rolls, 5 Mosa, 5 Peppered Beef, 10 Puff-Puff, Pepper Sauce",
        basePrice: 80,
        image: HeroImg4,
        fillings: [
          { type: "Standard", price: 80 },
          { type: "With Extra Sauce", price: 85 },
          { type: "Spicy Version", price: 85 },
        ],
      },
      {
        id: "platter-15k",
        name: "15K Platter",
        description:
          "10 Samosa, 10 Spring Rolls, 10 Mosa, 10 Peppered Beef, 25 Puff-Puff, Pepper Sauce",
        basePrice: 150,
        image: HeroImg,
        fillings: [
          { type: "Standard", price: 150 },
          { type: "With Extra Sauce", price: 155 },
          { type: "Spicy Version", price: 155 },
        ],
      },
      {
        id: "platter-22k",
        name: "22K Platter",
        description:
          "20 Samosa, 20 Spring Rolls, 10 Mosa, 5 Peppered Chicken, 5 Peppered Beef, 5 Sausage, 40 Puff-Puff, Pepper Sauce",
        basePrice: 220,
        image: HeroImg2,
        fillings: [
          { type: "Standard", price: 220 },
          { type: "With Extra Sauce", price: 225 },
          { type: "Spicy Version", price: 225 },
        ],
      },
      {
        id: "platter-28k",
        name: "28K Platter",
        description:
          "20 Samosa, 20 Spring Rolls, 10 Peppered Beef, 10 Peppered Chicken, 10 Sausage, 10 Mosa, 50 Puff-Puff, Pepper Sauce",
        basePrice: 280,
        image: HeroImg3,
        fillings: [
          { type: "Standard", price: 280 },
          { type: "With Extra Sauce", price: 285 },
          { type: "Spicy Version", price: 285 },
        ],
      },
    ],
    packs: [
      {
        id: "pack-1200",
        name: "1200 Pack",
        description:
          "1 Samosa, 1 Spring Roll, 2 Mosa, 1 Peppered Beef, 3 Puff-Puff, Pepper Sauce",
        basePrice: 12,
        image: HeroImg4,
        fillings: [
          { type: "Standard", price: 12 },
          { type: "Spicy", price: 13 },
        ],
      },
      {
        id: "pack-1500",
        name: "1500 Pack",
        description:
          "1 Samosa, 1 Spring Roll, 2 Mosa, 1 Peppered Chicken, 3 Puff-Puff, Pepper Sauce",
        basePrice: 15,
        image: HeroImg,
        fillings: [
          { type: "Standard", price: 15 },
          { type: "Spicy", price: 16 },
        ],
      },
    ],
    unfried: [
      {
        id: "unfried-beef-samosa",
        name: "Unfried Beef Samosa",
        description: "Pack of 10 pieces (uncooked)",
        basePrice: 20,
        image: HeroImg2,
        fillings: [
          { type: "Pack of 10", price: 20 },
          { type: "Pack of 20", price: 38 },
          { type: "Pack of 30", price: 55 },
        ],
      },
      {
        id: "unfried-beef-spring-rolls",
        name: "Unfried Beef Spring Rolls",
        description: "Pack of 10 pieces (uncooked)",
        basePrice: 20,
        image: HeroImg3,
        fillings: [
          { type: "Pack of 10", price: 20 },
          { type: "Pack of 20", price: 38 },
          { type: "Pack of 30", price: 55 },
        ],
      },
      {
        id: "unfried-chicken-samosa",
        name: "Unfried Chicken Samosa",
        description: "Pack of 10 pieces (uncooked)",
        basePrice: 30,
        image: HeroImg4,
        fillings: [
          { type: "Pack of 10", price: 30 },
          { type: "Pack of 20", price: 58 },
          { type: "Pack of 30", price: 85 },
        ],
      },
      {
        id: "unfried-chicken-spring-rolls",
        name: "Unfried Chicken Spring Rolls",
        description: "Pack of 10 pieces (uncooked)",
        basePrice: 25,
        image: HeroImg,
        fillings: [
          { type: "Pack of 10", price: 25 },
          { type: "Pack of 20", price: 48 },
          { type: "Pack of 30", price: 70 },
        ],
      },
      {
        id: "money-bag",
        name: "Money Bag",
        description: "Pack of 10 pieces",
        basePrice: 50,
        image: HeroImg2,
        fillings: [
          { type: "Pack of 10", price: 50 },
          { type: "Pack of 20", price: 95 },
          { type: "Pack of 30", price: 140 },
        ],
      },
      {
        id: "puff-puff-mix",
        name: "Puff Puff Mix",
        description: "500g of mix",
        basePrice: 20,
        image: HeroImg3,
        fillings: [
          { type: "500g", price: 20 },
          { type: "1kg", price: 38 },
          { type: "2kg", price: 75 },
        ],
      },
    ],
  };

  const handleItemClick = (item) => {
    // All items now require filling/option selection
    setSelectedItem({ ...item, quantity: 1, selectedFilling: null });
  };

  const handleFillingSelect = (filling) => {
    setSelectedItem({ ...selectedItem, selectedFilling: filling });
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;

    const cartItem = {
      id: `${selectedItem.id}-${
        selectedItem.selectedFilling?.type || "default"
      }-${Date.now()}`,
      name: selectedItem.name,
      filling: selectedItem.selectedFilling?.type,
      price:
        selectedItem.selectedFilling?.price ||
        selectedItem.price ||
        selectedItem.basePrice,
      quantity: selectedItem.quantity,
      packSize: selectedItem.packSize,
      description: selectedItem.description,
    };

    const updatedCart = [...cart, cartItem];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setSelectedItem(null);

    // Redirect to order page
    navigate("/order");
  };

  const updateQuantity = (delta) => {
    setSelectedItem({
      ...selectedItem,
      quantity: Math.max(1, selectedItem.quantity + delta),
    });
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateCartQuantity = (itemId, delta) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const currentItems = menuItems[selectedCategory] || [];

  return (
    <div className="relative w-full min-h-screen py-16 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
            Our Menu
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Choose Your Favorites
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            Select items and customize your order with your preferred fillings.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {Object.keys(menuItems).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 capitalize ${
                selectedCategory === category
                  ? "bg-[#ff9500] text-white shadow-md"
                  : "bg-white/85 border border-black/10 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {category === "individual" ? "Individual Items" : category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {currentItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="group rounded-2xl border border-black/10 bg-white/85 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
            >
              {/* Product Image */}
              {item.image && (
                <div className="mb-4 -mx-6 -mt-6 rounded-t-2xl overflow-hidden bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Product Info */}
              <div>
                <h3 className="text-lg font-bold tracking-tight text-gray-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 mb-4 min-h-[48px]">
                  {item.description}
                </p>

                {/* Price */}
                <div className="mb-4">
                  {item.basePrice ? (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          GH₵ {item.basePrice}.00
                        </span>
                      </div>
                      {item.packSize && (
                        <span className="text-xs text-gray-500">
                          per pack of {item.packSize}
                        </span>
                      )}
                    </>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        GH₵ {item.price}.00
                      </span>
                    </div>
                  )}
                </div>

                {/* Select Button */}
                <button className="w-full rounded-lg border-2 border-black bg-white px-4 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-gray-50 hover:shadow-sm">
                  Select & Choose Options
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Selection Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors bg-white/90 backdrop-blur-sm"
              >
                <X size={20} />
              </button>

              {/* Modal Content */}
              <div className="overflow-y-auto flex-1">
                <div className="p-6">
                  {/* Item Image */}
                  {selectedItem.image && (
                    <div className="mb-4 -mx-6 -mt-6 rounded-t-2xl overflow-hidden bg-gray-50">
                      <img
                        src={selectedItem.image}
                        alt={selectedItem.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}

                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedItem.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    {selectedItem.description}
                  </p>

                  {/* Filling/Options Selection - Required for ALL items */}
                  {selectedItem.fillings && (
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        {selectedItem.id.includes("spring-rolls") ||
                        selectedItem.id.includes("samosas")
                          ? "Choose Filling:"
                          : selectedItem.id.includes("platter") ||
                            selectedItem.id.includes("pack")
                          ? "Choose Option:"
                          : selectedItem.id.includes("unfried")
                          ? "Choose Pack Size:"
                          : "Choose Option:"}
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedItem.fillings.map((filling) => (
                          <button
                            key={filling.type}
                            onClick={() => handleFillingSelect(filling)}
                            className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm font-semibold ${
                              selectedItem.selectedFilling?.type ===
                              filling.type
                                ? "border-[#ff9500] bg-[#ff9500]/10 text-[#ff9500]"
                                : "border-black/10 bg-white text-gray-700 hover:border-black/20"
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
                        {selectedItem.quantity}
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
                        GH₵{" "}
                        {selectedItem.selectedFilling
                          ? selectedItem.selectedFilling.price *
                            selectedItem.quantity
                          : (selectedItem.price ||
                              selectedItem.basePrice ||
                              0) * selectedItem.quantity}
                        .00
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button - Disabled until option is selected */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedItem.selectedFilling}
                    className={`w-full rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      !selectedItem.selectedFilling
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#ff9500] text-white hover:bg-[#e68600] hover:shadow-md"
                    }`}
                  >
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                  </button>
                  {!selectedItem.selectedFilling && (
                    <p className="text-xs text-red-500 mt-2 text-center">
                      Please select an option above
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cart Sidebar */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <div className="bg-white rounded-2xl shadow-2xl border border-black/10 p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Your Order</h3>
                <span className="text-sm text-gray-500">
                  ({cart.length} items)
                </span>
              </div>

              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-900">
                        {item.name}
                        {item.filling && (
                          <span className="text-gray-500 ml-1">
                            ({item.filling})
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        GH₵ {item.price}.00 × {item.quantity}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="p-1 rounded hover:bg-gray-200"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="p-1 rounded hover:bg-gray-200"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 rounded hover:bg-red-100 ml-2"
                      >
                        <X size={14} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-gray-900">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-[#ff9500]">
                    GH₵ {getTotalPrice()}.00
                  </span>
                </div>
                <button
                  onClick={() => navigate("/order")}
                  className="w-full rounded-lg bg-[#ff9500] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e68600] hover:shadow-md"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
