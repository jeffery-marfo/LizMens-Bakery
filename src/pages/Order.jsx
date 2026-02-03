
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Plus, Minus, X, ArrowLeft, CreditCard, ShoppingBag, Loader2, Truck, MapPin } from 'lucide-react';

// const Order = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [customerInfo, setCustomerInfo] = useState({
//     name: '',
//     phone: '',
//     orderNotes: '',
//   });
//   const [deliveryEnabled, setDeliveryEnabled] = useState(false);
//   const [deliveryAddress, setDeliveryAddress] = useState({
//     address: '',
//     lat: null,
//     lng: null,
//   });
//   const [deliveryQuotes, setDeliveryQuotes] = useState([]);
//   const [selectedQuote, setSelectedQuote] = useState(null);
//   const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);
//   const [deliveryBooking, setDeliveryBooking] = useState(null);
//   const [paystackReady, setPaystackReady] = useState(false);

//   // Business pickup location (Teshie-Aboma, Accra, Ghana)
//   const PICKUP_LOCATION = {
//     lat: 5.5846,
//     lng: -0.1135,
//     address: 'KAE DABI HOUSE, Teshie, Aboma, Accra, Ghana',
//   };

//   useEffect(() => {
//     // Load cart from localStorage
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }

//     // Check if Paystack script is loaded
//     const checkPaystack = () => {
//       if (typeof window !== 'undefined' && typeof window.PaystackPop !== 'undefined') {
//         setPaystackReady(true);
//         console.log('Paystack is ready');
//       } else {
//         setPaystackReady(false);
//         setTimeout(checkPaystack, 500);
//       }
//     };

//     checkPaystack();

//     const script = document.querySelector('script[src*="paystack"]');
//     if (script) {
//       script.addEventListener('load', checkPaystack);
//       script.addEventListener('error', () => {
//         console.error('Failed to load Paystack script');
//         setPaystackReady(false);
//       });
//     }
//   }, []);

//   const updateCartQuantity = (itemId, delta) => {
//     const updatedCart = cart.map((item) =>
//       item.id === itemId
//         ? { ...item, quantity: Math.max(1, item.quantity + delta) }
//         : item
//     );
//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const removeFromCart = (itemId) => {
//     const updatedCart = cart.filter((item) => item.id !== itemId);
//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const getTotalPrice = () => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const getTotalItems = () => {
//     return cart.reduce((total, item) => total + item.quantity, 0);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleDeliveryAddressChange = (e) => {
//     setDeliveryAddress({
//       ...deliveryAddress,
//       address: e.target.value,
//     });
//   };

//   const getDeliveryQuotes = async () => {
//     if (!deliveryAddress.address.trim()) {
//       alert('Please enter a delivery address');
//       return;
//     }

//     setIsLoadingQuotes(true);
//     setDeliveryQuotes([]);
//     setSelectedQuote(null);

//     try {
//       const SAIL_API_KEY = import.meta.env.VITE_SAIL_API_KEY || '';
      
//       if (!SAIL_API_KEY) {
//         alert('Sail API key not configured. Please set VITE_SAIL_API_KEY in your .env file');
//         setIsLoadingQuotes(false);
//         return;
//       }

//       const destinationCoords = await geocodeAddress(deliveryAddress.address);
      
//       if (!destinationCoords) {
//         alert('Could not find location. Please enter a valid address. You can also try "current location" to use your GPS location.');
//         setIsLoadingQuotes(false);
//         return;
//       }

//       const response = await fetch('https://api.sailrides.co/v1/deliveries/quotes', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `ApiKey ${SAIL_API_KEY}`,
//         },
//         body: JSON.stringify({
//           pickup: {
//             lat: PICKUP_LOCATION.lat,
//             lng: PICKUP_LOCATION.lng,
//             address: PICKUP_LOCATION.address,
//           },
//           destination: {
//             lat: destinationCoords.lat,
//             lng: destinationCoords.lng,
//             address: deliveryAddress.address,
//           },
//         }),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.error?.message || 'Failed to get delivery quotes');
//       }

//       const data = await response.json();
//       setDeliveryQuotes(data.quotes || []);
//       setDeliveryAddress({
//         ...deliveryAddress,
//         lat: destinationCoords.lat,
//         lng: destinationCoords.lng,
//       });
//     } catch (error) {
//       console.error('Error getting delivery quotes:', error);
//       alert(`Error: ${error.message}`);
//     } finally {
//       setIsLoadingQuotes(false);
//     }
//   };

//   const geocodeAddress = async (address) => {
//     try {
//       const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
//       if (GOOGLE_MAPS_API_KEY) {
//         const response = await fetch(
//           `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
//         );
//         const data = await response.json();
        
//         if (data.results && data.results.length > 0) {
//           const location = data.results[0].geometry.location;
//           return {
//             lat: location.lat,
//             lng: location.lng,
//           };
//         }
//       }

//       if (address.toLowerCase().includes('current location') || address.toLowerCase().includes('my location')) {
//         return new Promise((resolve) => {
//           if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//               (position) => {
//                 resolve({
//                   lat: position.coords.latitude,
//                   lng: position.coords.longitude,
//                 });
//               },
//               () => resolve(null)
//             );
//           } else {
//             resolve(null);
//           }
//         });
//       }

//       try {
//         const response = await fetch(
//           `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', Ghana')}&limit=1`
//         );
//         const data = await response.json();
        
//         if (data && data.length > 0) {
//           return {
//             lat: parseFloat(data[0].lat),
//             lng: parseFloat(data[0].lon),
//           };
//         }
//       } catch (error) {
//         console.error('OpenStreetMap geocoding error:', error);
//       }

//       return null;
//     } catch (error) {
//       console.error('Geocoding error:', error);
//       return null;
//     }
//   };

//   const bookDelivery = async (quoteId) => {
//     if (!quoteId) return;

//     try {
//       const SAIL_API_KEY = import.meta.env.VITE_SAIL_API_KEY || '';
//       const cleanedPhone = customerInfo.phone.replace(/\s/g, '');

//       const response = await fetch('https://api.sailrides.co/v1/deliveries', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `ApiKey ${SAIL_API_KEY}`,
//         },
//         body: JSON.stringify({
//           quoteId: quoteId,
//           customerInfo: {
//             name: customerInfo.name,
//             phone: cleanedPhone,
//           },
//           notes: customerInfo.orderNotes || 'Food delivery order',
//         }),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.error?.message || 'Failed to book delivery');
//       }

//       const data = await response.json();
//       setDeliveryBooking(data);
//       return data;
//     } catch (error) {
//       console.error('Error booking delivery:', error);
//       alert(`Error booking delivery: ${error.message}`);
//       return null;
//     }
//   };

//   const handleProceedToPayment = () => {
//     if (!customerInfo.name || !customerInfo.phone) {
//       alert('Please fill in your name and phone number');
//       return;
//     }

//     const phoneRegex = /^(\+233|0|233)[0-9]{9}$/;
//     let cleanedPhone = customerInfo.phone.replace(/\s/g, '').replace(/-/g, '');
    
//     if (cleanedPhone.startsWith('0')) {
//       cleanedPhone = '+233' + cleanedPhone.substring(1);
//     } else if (cleanedPhone.startsWith('233') && !cleanedPhone.startsWith('+233')) {
//       cleanedPhone = '+' + cleanedPhone;
//     }
    
//     if (!phoneRegex.test(cleanedPhone)) {
//       alert('Please enter a valid Ghana phone number (e.g., 050xxxxxxx, +233xxxxxxxxx, or 233xxxxxxxxx)');
//       return;
//     }

//     const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    
//     if (!PAYSTACK_PUBLIC_KEY) {
//       alert('Payment gateway is not configured. Please contact support.');
//       console.error('Paystack public key is missing. Please set VITE_PAYSTACK_PUBLIC_KEY in your .env file');
//       return;
//     }

//     if (!PAYSTACK_PUBLIC_KEY.startsWith('pk_test_') && !PAYSTACK_PUBLIC_KEY.startsWith('pk_live_')) {
//       alert('Invalid Paystack API key format. Please check your configuration.');
//       console.error('Invalid Paystack key format. Key should start with pk_test_ or pk_live_');
//       return;
//     }

//     const totalAmount = getTotalPrice() * 100;
    
//     if (totalAmount < 100) {
//       alert('Minimum order amount is GHS 1.00');
//       return;
//     }

//     const reference = `EDUROM${Date.now()}`;
//     const sanitizedPhone = cleanedPhone.replace(/[^0-9]/g, '');
//     const paystackEmail = `customer${sanitizedPhone}@eduromonaa.com`;

//     if (typeof window.PaystackPop === 'undefined' || !paystackReady) {
//       alert('Payment gateway is loading. Please wait a moment and try again.');
//       console.warn('Paystack not ready');
//       setTimeout(() => {
//         if (typeof window.PaystackPop !== 'undefined') {
//           setPaystackReady(true);
//           handleProceedToPayment();
//         } else {
//           alert('Payment gateway failed to load. Please refresh the page and try again.');
//         }
//       }, 2000);
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       console.log('Setting up Paystack payment');

//       const handler = window.PaystackPop.setup({
//         key: PAYSTACK_PUBLIC_KEY,
//         email: paystackEmail,
//         amount: totalAmount,
//         currency: 'GHS',
//         ref: reference,
//         metadata: {
//           custom_fields: [
//             {
//               display_name: 'Customer Name',
//               variable_name: 'customer_name',
//               value: customerInfo.name,
//             },
//             {
//               display_name: 'Phone Number',
//               variable_name: 'phone_number',
//               value: cleanedPhone,
//             },
//             {
//               display_name: 'Order Notes',
//               variable_name: 'order_notes',
//               value: customerInfo.orderNotes || 'No notes',
//             },
//             {
//               display_name: 'Order Items',
//               variable_name: 'order_items',
//               value: JSON.stringify(cart),
//             },
//             {
//               display_name: 'Total Amount',
//               variable_name: 'total_amount',
//               value: `GHS ${(totalAmount / 100).toFixed(2)}`,
//             },
//           ],
//         },
//         callback: function (response) {
//           console.log('Payment successful:', response);
          
//           // Handle delivery booking and cleanup
//           const processOrder = async () => {
//             try {
//               if (deliveryEnabled && selectedQuote) {
//                 try {
//                   const delivery = await bookDelivery(selectedQuote.id);
//                   if (delivery) {
//                     localStorage.setItem('deliveryBooking', JSON.stringify(delivery));
//                     console.log('Delivery booked successfully:', delivery);
//                   }
//                 } catch (deliveryError) {
//                   console.error('Delivery booking failed:', deliveryError);
//                 }
//               }
              
//               localStorage.removeItem('cart');
              
//               localStorage.setItem('lastOrder', JSON.stringify({
//                 reference: response.reference,
//                 customerName: customerInfo.name,
//                 customerPhone: cleanedPhone,
//                 totalAmount: totalAmount / 100,
//                 items: cart,
//                 timestamp: new Date().toISOString(),
//                 deliveryBooked: deliveryEnabled && selectedQuote ? true : false,
//               }));
              
//               navigate('/', { 
//                 state: { 
//                   paymentSuccess: true, 
//                   reference: response.reference,
//                   customerName: customerInfo.name,
//                   deliveryBooked: deliveryEnabled && selectedQuote ? true : false,
//                 } 
//               });
//             } catch (error) {
//               console.error('Error processing order:', error);
//               alert(`Payment successful! Reference: ${response.reference}\nPlease contact support if you need assistance.`);
//               navigate('/');
//             } finally {
//               setIsProcessing(false);
//             }
//           };
          
//           processOrder();
//         },
//         onClose: function () {
//           setIsProcessing(false);
//         },
//       });

//       handler.openIframe();
//     } catch (error) {
//       console.error('Error setting up Paystack payment:', error);
//       setIsProcessing(false);
      
//       let errorMessage = 'An error occurred while setting up payment. ';
//       if (error.message) {
//         errorMessage += `Error: ${error.message}`;
//       } else {
//         errorMessage += 'Please try again or contact support.';
//       }
      
//       alert(errorMessage);
//     }
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="relative w-full min-h-screen py-16 sm:py-20">
//         <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
//           <div className="text-center py-20">
//             <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
//             <p className="text-gray-600 mb-6">Add some delicious items to your cart first!</p>
//             <button
//               onClick={() => navigate('/menu')}
//               className="inline-flex items-center gap-2 rounded-lg bg-[#ff9500] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e68600] hover:shadow-md"
//             >
//               <ArrowLeft size={18} />
//               <span>Back to Menu</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full min-h-screen py-16 sm:py-20 pb-32">
//       <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <button
//             onClick={() => navigate('/menu')}
//             className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
//           >
//             <ArrowLeft size={18} />
//             <span className="text-sm font-semibold">Back to Menu</span>
//           </button>
//           <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
//             Order Summary
//           </h1>
//           <p className="mt-2 text-sm text-gray-600">
//             Review your order and proceed to payment
//           </p>
//         </div>

//         {/* Order Items */}
//         <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-4 sm:p-6 mb-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-lg sm:text-xl font-bold text-gray-900">Your Items</h2>
//             <span className="text-sm text-gray-500">
//               {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
//             </span>
//           </div>

//           <div className="space-y-4">
//             {cart.map((item) => (
//               <div
//                 key={item.id}
//                 className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-black/5"
//               >
//                 {/* Mobile Layout */}
//                 <div className="block sm:hidden">
//                   <div className="flex items-start justify-between mb-3">
//                     <div className="flex-1 min-w-0 pr-2">
//                       <div className="font-semibold text-sm text-gray-900 mb-1 break-words">
//                         {item.name}
//                         {item.filling && (
//                           <span className="text-gray-500 ml-2 font-normal text-xs">({item.filling})</span>
//                         )}
//                       </div>
//                       {item.description && (
//                         <p className="text-xs text-gray-500 mb-2 break-words">{item.description}</p>
//                       )}
//                       <div className="flex flex-wrap items-center gap-2 text-xs">
//                         <span className="font-semibold text-gray-700">
//                           GH₵ {item.price}.00 each
//                         </span>
//                         {item.packSize && (
//                           <span className="text-gray-500">
//                             Pack of {item.packSize}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => removeFromCart(item.id)}
//                       className="p-1.5 rounded-lg hover:bg-red-100 transition-colors flex-shrink-0"
//                       aria-label="Remove item"
//                     >
//                       <X size={16} className="text-red-600" />
//                     </button>
//                   </div>
//                   <div className="flex items-center justify-between pt-3 border-t border-gray-200">
//                     <div className="flex items-center gap-2 bg-white rounded-lg border border-black/10 p-1">
//                       <button
//                         onClick={() => updateCartQuantity(item.id, -1)}
//                         className="p-1 rounded hover:bg-gray-100 transition-colors"
//                         aria-label="Decrease quantity"
//                       >
//                         <Minus size={14} />
//                       </button>
//                       <span className="text-sm font-semibold w-8 text-center">
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() => updateCartQuantity(item.id, 1)}
//                         className="p-1 rounded hover:bg-gray-100 transition-colors"
//                         aria-label="Increase quantity"
//                       >
//                         <Plus size={14} />
//                       </button>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-lg font-bold text-gray-900">
//                         GH₵ {(item.price * item.quantity).toFixed(2)}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Desktop Layout */}
//                 <div className="hidden sm:flex items-start justify-between">
//                   <div className="flex-1 min-w-0 pr-4">
//                     <div className="font-semibold text-base text-gray-900 mb-1 break-words">
//                       {item.name}
//                       {item.filling && (
//                         <span className="text-gray-500 ml-2 font-normal">({item.filling})</span>
//                       )}
//                     </div>
//                     {item.description && (
//                       <p className="text-xs text-gray-500 mb-2 break-words">{item.description}</p>
//                     )}
//                     <div className="flex flex-wrap items-center gap-4">
//                       <div className="text-sm font-semibold text-gray-700">
//                         GH₵ {item.price}.00 each
//                       </div>
//                       {item.packSize && (
//                         <div className="text-xs text-gray-500">
//                           Pack of {item.packSize}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3 flex-shrink-0">
//                     <div className="flex items-center gap-2 bg-white rounded-lg border border-black/10 p-1">
//                       <button
//                         onClick={() => updateCartQuantity(item.id, -1)}
//                         className="p-1.5 rounded hover:bg-gray-100 transition-colors"
//                         aria-label="Decrease quantity"
//                       >
//                         <Minus size={14} />
//                       </button>
//                       <span className="text-sm font-semibold w-8 text-center">
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() => updateCartQuantity(item.id, 1)}
//                         className="p-1.5 rounded hover:bg-gray-100 transition-colors"
//                         aria-label="Increase quantity"
//                       >
//                         <Plus size={14} />
//                       </button>
//                     </div>
//                     <div className="text-right w-24">
//                       <div className="text-lg font-bold text-gray-900">
//                         GH₵ {(item.price * item.quantity).toFixed(2)}
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => removeFromCart(item.id)}
//                       className="p-2 rounded-lg hover:bg-red-100 transition-colors"
//                       aria-label="Remove item"
//                     >
//                       <X size={18} className="text-red-600" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Delivery Section */}
//         <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-4 sm:p-6 mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-3">
//               <Truck className="text-[#ff9500]" size={24} />
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900">Delivery</h2>
//             </div>
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={deliveryEnabled}
//                 onChange={(e) => {
//                   setDeliveryEnabled(e.target.checked);
//                   if (!e.target.checked) {
//                     setDeliveryQuotes([]);
//                     setSelectedQuote(null);
//                   }
//                 }}
//                 className="w-5 h-5 rounded border-black/20 text-[#ff9500] focus:ring-2 focus:ring-[#ff9500]"
//               />
//               <span className="text-sm font-semibold text-gray-700">Enable Delivery</span>
//             </label>
//           </div>

//           {deliveryEnabled && (
//             <div className="space-y-4 mt-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                   Delivery Address *
//                 </label>
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={deliveryAddress.address}
//                     onChange={handleDeliveryAddressChange}
//                     placeholder="Enter your delivery address"
//                     className="flex-1 rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent"
//                   />
//                   <button
//                     onClick={getDeliveryQuotes}
//                     disabled={isLoadingQuotes || !deliveryAddress.address.trim()}
//                     className="px-4 py-2.5 rounded-lg bg-[#ff9500] text-white text-sm font-semibold hover:bg-[#e68600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                   >
//                     {isLoadingQuotes ? (
//                       <>
//                         <Loader2 size={16} className="animate-spin" />
//                         <span>Loading...</span>
//                       </>
//                     ) : (
//                       <>
//                         <MapPin size={16} />
//                         <span>Get Quotes</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Pickup from: {PICKUP_LOCATION.address}
//                 </p>
//               </div>

//               {deliveryQuotes.length > 0 && (
//                 <div className="mt-4">
//                   <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Delivery Option:</h3>
//                   <div className="space-y-2">
//                     {deliveryQuotes.map((quote) => (
//                       <button
//                         key={quote.id}
//                         onClick={() => setSelectedQuote(quote)}
//                         className={`w-full p-3 rounded-lg border-2 transition-all duration-300 text-left ${
//                           selectedQuote?.id === quote.id
//                             ? 'border-[#ff9500] bg-[#ff9500]/10'
//                             : 'border-black/10 bg-white hover:border-black/20'
//                         }`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <div className="font-semibold text-sm text-gray-900">
//                               {quote.service_name}
//                             </div>
//                             <div className="text-xs text-gray-500 mt-1">
//                               ETA: {quote.eta_minutes} minutes
//                             </div>
//                           </div>
//                           <div className="text-right">
//                             <div className="font-bold text-lg text-gray-900">
//                               GH₵ {quote.price.amount.toFixed(2)}
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               {quote.price.currency}
//                             </div>
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {deliveryQuotes.length === 0 && !isLoadingQuotes && deliveryAddress.address && (
//                 <p className="text-sm text-gray-500 text-center py-4">
//                   Click "Get Quotes" to see available delivery options
//                 </p>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//           {/* Customer Information */}
//           <div className="lg:col-span-1">
//             <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-4 sm:p-6">
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Customer Information</h2>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={customerInfo.name}
//                     onChange={handleInputChange}
//                     placeholder="Enter your full name"
//                     className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                     Order Notes
//                   </label>
//                   <textarea
//                     name="orderNotes"
//                     value={customerInfo.orderNotes}
//                     onChange={handleInputChange}
//                     placeholder="Any special instructions or notes for your order (optional)"
//                     rows={4}
//                     className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent resize-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                     Phone Number *
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={customerInfo.phone}
//                     onChange={handleInputChange}
//                     placeholder="050 123 4567"
//                     className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent"
//                     required
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     Format: 0501234567 or +233501234567
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Order Summary Card */}
//           <div className="lg:col-span-2">
//             <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-4 sm:p-6">
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
//               <div className="space-y-3 mb-4">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
//                   <span className="text-gray-900 font-semibold">GH₵ {getTotalPrice().toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Delivery Fee</span>
//                   <span className="text-gray-900 font-semibold">
//                     {selectedQuote 
//                       ? `GH₵ ${selectedQuote.price.amount.toFixed(2)}` 
//                       : 'GH₵ 0.00'}
//                   </span>
//                 </div>
//                 <div className="border-t border-gray-200 pt-3 mt-3">
//                   <div className="flex justify-between items-center">
//                     <span className="text-base sm:text-lg font-bold text-gray-900">Total</span>
//                     <span className="text-xl sm:text-2xl font-bold text-[#ff9500]">
//                       GH₵ {(getTotalPrice() + (selectedQuote ? selectedQuote.price.amount : 0)).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Payment Button - Fixed at bottom */}
//         <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-black/10 p-4 shadow-lg z-10">
//           <div className="max-w-4xl mx-auto">
//             <button
//               onClick={handleProceedToPayment}
//               disabled={isProcessing}
//               className={`w-full rounded-lg bg-[#ff9500] px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:bg-[#e68600] hover:shadow-lg flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${
//                 isProcessing ? 'cursor-wait' : ''
//               }`}
//             >
//               {isProcessing ? (
//                 <>
//                   <Loader2 size={18} className="sm:w-5 sm:h-5 animate-spin" />
//                   <span>Processing...</span>
//                 </>
//               ) : (
//                 <>
//                   <CreditCard size={18} className="sm:w-5 sm:h-5" />
//                   <span>Proceed to Payment</span>
//                 </>
//               )}
//             </button>
//             <p className="text-xs text-center text-gray-500 mt-2">
//               Secure payment powered by Paystack
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Order;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, X, ArrowLeft, CreditCard, ShoppingBag, Loader2, Truck, MapPin } from 'lucide-react';

const Order = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    orderNotes: '',
  });
  const [deliveryEnabled, setDeliveryEnabled] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    address: '',
    lat: null,
    lng: null,
  });
  const [deliveryQuotes, setDeliveryQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);
  const [deliveryBooking, setDeliveryBooking] = useState(null);
  const [paystackReady, setPaystackReady] = useState(false);

  // Business pickup location (Teshie-Aboma, Accra, Ghana)
  const PICKUP_LOCATION = {
    lat: 5.5846,
    lng: -0.1135,
    address: 'KAE DABI HOUSE, Teshie, Aboma, Accra, Ghana',
  };

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Check if Paystack script is loaded
    const checkPaystack = () => {
      if (typeof window !== 'undefined' && typeof window.PaystackPop !== 'undefined') {
        setPaystackReady(true);
        console.log('Paystack is ready');
      } else {
        setPaystackReady(false);
        setTimeout(checkPaystack, 500);
      }
    };

    checkPaystack();

    const script = document.querySelector('script[src*="paystack"]');
    if (script) {
      script.addEventListener('load', checkPaystack);
      script.addEventListener('error', () => {
        console.error('Failed to load Paystack script');
        setPaystackReady(false);
      });
    }
  }, []);

  const updateCartQuantity = (itemId, delta) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeliveryAddressChange = (e) => {
    setDeliveryAddress({
      ...deliveryAddress,
      address: e.target.value,
    });
  };

  const getDeliveryQuotes = async () => {
    if (!deliveryAddress.address.trim()) {
      alert('Please enter a delivery address');
      return;
    }

    setIsLoadingQuotes(true);
    setDeliveryQuotes([]);
    setSelectedQuote(null);

    try {
      const SAIL_API_KEY = import.meta.env.VITE_SAIL_API_KEY || '';
      
      if (!SAIL_API_KEY) {
        alert('Sail API key not configured. Please set VITE_SAIL_API_KEY in your .env file');
        setIsLoadingQuotes(false);
        return;
      }

      const destinationCoords = await geocodeAddress(deliveryAddress.address);
      
      if (!destinationCoords) {
        alert('Could not find location. Please enter a valid address. You can also try "current location" to use your GPS location.');
        setIsLoadingQuotes(false);
        return;
      }

      const response = await fetch('https://api.sailrides.co/v1/deliveries/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `ApiKey ${SAIL_API_KEY}`,
        },
        body: JSON.stringify({
          pickup: {
            lat: PICKUP_LOCATION.lat,
            lng: PICKUP_LOCATION.lng,
            address: PICKUP_LOCATION.address,
          },
          destination: {
            lat: destinationCoords.lat,
            lng: destinationCoords.lng,
            address: deliveryAddress.address,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to get delivery quotes');
      }

      const data = await response.json();
      setDeliveryQuotes(data.quotes || []);
      setDeliveryAddress({
        ...deliveryAddress,
        lat: destinationCoords.lat,
        lng: destinationCoords.lng,
      });
    } catch (error) {
      console.error('Error getting delivery quotes:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoadingQuotes(false);
    }
  };

  const geocodeAddress = async (address) => {
    try {
      const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      if (GOOGLE_MAPS_API_KEY) {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          return {
            lat: location.lat,
            lng: location.lng,
          };
        }
      }

      if (address.toLowerCase().includes('current location') || address.toLowerCase().includes('my location')) {
        return new Promise((resolve) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                resolve({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
              },
              () => resolve(null)
            );
          } else {
            resolve(null);
          }
        });
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', Ghana')}&limit=1`
        );
        const data = await response.json();
        
        if (data && data.length > 0) {
          return {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          };
        }
      } catch (error) {
        console.error('OpenStreetMap geocoding error:', error);
      }

      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  const bookDelivery = async (quoteId) => {
    if (!quoteId) return;

    try {
      const SAIL_API_KEY = import.meta.env.VITE_SAIL_API_KEY || '';
      const cleanedPhone = customerInfo.phone.replace(/\s/g, '');

      const response = await fetch('https://api.sailrides.co/v1/deliveries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `ApiKey ${SAIL_API_KEY}`,
        },
        body: JSON.stringify({
          quoteId: quoteId,
          customerInfo: {
            name: customerInfo.name,
            phone: cleanedPhone,
          },
          notes: customerInfo.orderNotes || 'Food delivery order',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to book delivery');
      }

      const data = await response.json();
      setDeliveryBooking(data);
      return data;
    } catch (error) {
      console.error('Error booking delivery:', error);
      alert(`Error booking delivery: ${error.message}`);
      return null;
    }
  };

  const handleProceedToPayment = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    const phoneRegex = /^(\+233|0|233)[0-9]{9}$/;
    let cleanedPhone = customerInfo.phone.replace(/\s/g, '').replace(/-/g, '');
    
    if (cleanedPhone.startsWith('0')) {
      cleanedPhone = '+233' + cleanedPhone.substring(1);
    } else if (cleanedPhone.startsWith('233') && !cleanedPhone.startsWith('+233')) {
      cleanedPhone = '+' + cleanedPhone;
    }
    
    if (!phoneRegex.test(cleanedPhone)) {
      alert('Please enter a valid Ghana phone number (e.g., 050xxxxxxx, +233xxxxxxxxx, or 233xxxxxxxxx)');
      return;
    }

    const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    
    if (!PAYSTACK_PUBLIC_KEY) {
      alert('Payment gateway is not configured. Please contact support.');
      console.error('Paystack public key is missing. Please set VITE_PAYSTACK_PUBLIC_KEY in your .env file');
      return;
    }

    if (!PAYSTACK_PUBLIC_KEY.startsWith('pk_test_') && !PAYSTACK_PUBLIC_KEY.startsWith('pk_live_')) {
      alert('Invalid Paystack API key format. Please check your configuration.');
      console.error('Invalid Paystack key format. Key should start with pk_test_ or pk_live_');
      return;
    }

    const totalAmount = getTotalPrice() * 100;
    
    if (totalAmount < 100) {
      alert('Minimum order amount is GHS 1.00');
      return;
    }

    const reference = `EDUROM${Date.now()}`;
    const sanitizedPhone = cleanedPhone.replace(/[^0-9]/g, '');
    const paystackEmail = `customer${sanitizedPhone}@eduromonaa.com`;

    if (typeof window.PaystackPop === 'undefined' || !paystackReady) {
      alert('Payment gateway is loading. Please wait a moment and try again.');
      console.warn('Paystack not ready');
      setTimeout(() => {
        if (typeof window.PaystackPop !== 'undefined') {
          setPaystackReady(true);
          handleProceedToPayment();
        } else {
          alert('Payment gateway failed to load. Please refresh the page and try again.');
        }
      }, 2000);
      return;
    }

    setIsProcessing(true);

    try {
      console.log('Setting up Paystack payment');

      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: paystackEmail,
        amount: totalAmount,
        currency: 'GHS',
        ref: reference,
        metadata: {
          custom_fields: [
            {
              display_name: 'Customer Name',
              variable_name: 'customer_name',
              value: customerInfo.name,
            },
            {
              display_name: 'Phone Number',
              variable_name: 'phone_number',
              value: cleanedPhone,
            },
            {
              display_name: 'Order Notes',
              variable_name: 'order_notes',
              value: customerInfo.orderNotes || 'No notes',
            },
            {
              display_name: 'Order Items',
              variable_name: 'order_items',
              value: JSON.stringify(cart),
            },
            {
              display_name: 'Total Amount',
              variable_name: 'total_amount',
              value: `GHS ${(totalAmount / 100).toFixed(2)}`,
            },
          ],
        },
        callback: function (response) {
          console.log('Payment successful:', response);
          
          // Handle delivery booking and cleanup
          const processOrder = async () => {
            try {
              if (deliveryEnabled && selectedQuote) {
                try {
                  const delivery = await bookDelivery(selectedQuote.id);
                  if (delivery) {
                    localStorage.setItem('deliveryBooking', JSON.stringify(delivery));
                    console.log('Delivery booked successfully:', delivery);
                  }
                } catch (deliveryError) {
                  console.error('Delivery booking failed:', deliveryError);
                }
              }
              
              localStorage.removeItem('cart');
              
              localStorage.setItem('lastOrder', JSON.stringify({
                reference: response.reference,
                customerName: customerInfo.name,
                customerPhone: cleanedPhone,
                totalAmount: totalAmount / 100,
                items: cart,
                timestamp: new Date().toISOString(),
                deliveryBooked: deliveryEnabled && selectedQuote ? true : false,
              }));
              
              navigate('/', { 
                state: { 
                  paymentSuccess: true, 
                  reference: response.reference,
                  customerName: customerInfo.name,
                  deliveryBooked: deliveryEnabled && selectedQuote ? true : false,
                } 
              });
            } catch (error) {
              console.error('Error processing order:', error);
              alert(`Payment successful! Reference: ${response.reference}\nPlease contact support if you need assistance.`);
              navigate('/');
            } finally {
              setIsProcessing(false);
            }
          };
          
          processOrder();
        },
        onClose: function () {
          setIsProcessing(false);
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error('Error setting up Paystack payment:', error);
      setIsProcessing(false);
      
      let errorMessage = 'An error occurred while setting up payment. ';
      if (error.message) {
        errorMessage += `Error: ${error.message}`;
      } else {
        errorMessage += 'Please try again or contact support.';
      }
      
      alert(errorMessage);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="relative w-full min-h-screen py-16 sm:py-20 overflow-x-hidden">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious items to your cart first!</p>
            <button
              onClick={() => navigate('/menu')}
              className="inline-flex items-center gap-2 rounded-lg bg-[#ff9500] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e68600] hover:shadow-md"
            >
              <ArrowLeft size={18} />
              <span>Back to Menu</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen py-16 sm:py-20 pb-32 overflow-x-hidden">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/menu')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-semibold">Back to Menu</span>
          </button>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Order Summary
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Review your order and proceed to payment
          </p>
        </div>

        {/* Order Items */}
        <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-4 sm:p-6 mb-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Your Items</h2>
            <span className="text-sm text-gray-500 whitespace-nowrap">
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
            </span>
          </div>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-black/5 w-full"
              >
                {/* Mobile Layout */}
                <div className="block sm:hidden">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="font-semibold text-sm text-gray-900 mb-1 break-words">
                        {item.name}
                        {item.filling && (
                          <span className="text-gray-500 ml-2 font-normal text-xs">({item.filling})</span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-gray-500 mb-2 break-words">{item.description}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-semibold text-gray-700 whitespace-nowrap">
                          GH₵ {item.price}.00 each
                        </span>
                        {item.packSize && (
                          <span className="text-gray-500 whitespace-nowrap">
                            Pack of {item.packSize}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 rounded-lg hover:bg-red-100 transition-colors flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <X size={16} className="text-red-600" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-black/10 p-1">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 whitespace-nowrap">
                        GH₵ {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="font-semibold text-base text-gray-900 mb-1 break-words">
                      {item.name}
                      {item.filling && (
                        <span className="text-gray-500 ml-2 font-normal">({item.filling})</span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-xs text-gray-500 mb-2 break-words">{item.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                        GH₵ {item.price}.00 each
                      </div>
                      {item.packSize && (
                        <div className="text-xs text-gray-500 whitespace-nowrap">
                          Pack of {item.packSize}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-black/10 p-1">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right min-w-[6rem]">
                      <div className="text-lg font-bold text-gray-900 whitespace-nowrap">
                        GH₵ {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 rounded-lg hover:bg-red-100 transition-colors"
                      aria-label="Remove item"
                    >
                      <X size={18} className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Section */}
        <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-4 sm:p-6 mb-6 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
            <div className="flex items-center gap-3">
              <Truck className="text-[#ff9500] flex-shrink-0" size={24} />
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Delivery</h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={deliveryEnabled}
                onChange={(e) => {
                  setDeliveryEnabled(e.target.checked);
                  if (!e.target.checked) {
                    setDeliveryQuotes([]);
                    setSelectedQuote(null);
                  }
                }}
                className="w-5 h-5 rounded border-black/20 text-[#ff9500] focus:ring-2 focus:ring-[#ff9500]"
              />
              <span className="text-sm font-semibold text-gray-700">Enable Delivery</span>
            </label>
          </div>

          {deliveryEnabled && (
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Delivery Address *
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={deliveryAddress.address}
                    onChange={handleDeliveryAddressChange}
                    placeholder="Enter your delivery address"
                    className="flex-1 w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent"
                  />
                  <button
                    onClick={getDeliveryQuotes}
                    disabled={isLoadingQuotes || !deliveryAddress.address.trim()}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#ff9500] text-white text-sm font-semibold hover:bg-[#e68600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {isLoadingQuotes ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <MapPin size={16} />
                        <span>Get Quotes</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1 break-words">
                  Pickup from: {PICKUP_LOCATION.address}
                </p>
              </div>

              {deliveryQuotes.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Delivery Option:</h3>
                  <div className="space-y-2">
                    {deliveryQuotes.map((quote) => (
                      <button
                        key={quote.id}
                        onClick={() => setSelectedQuote(quote)}
                        className={`w-full p-3 rounded-lg border-2 transition-all duration-300 text-left ${
                          selectedQuote?.id === quote.id
                            ? 'border-[#ff9500] bg-[#ff9500]/10'
                            : 'border-black/10 bg-white hover:border-black/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0 pr-3">
                            <div className="font-semibold text-sm text-gray-900 break-words">
                              {quote.service_name}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              ETA: {quote.eta_minutes} minutes
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="font-bold text-lg text-gray-900 whitespace-nowrap">
                              GH₵ {quote.price.amount.toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {quote.price.currency}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {deliveryQuotes.length === 0 && !isLoadingQuotes && deliveryAddress.address && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Click "Get Quotes" to see available delivery options
                </p>
              )}
            </div>
          )}
        </div>

        {/* Customer Information and Order Summary - FIXED LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6 w-full">
          {/* Customer Information */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-4 sm:p-6 w-full">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Customer Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Order Notes
                  </label>
                  <textarea
                    name="orderNotes"
                    value={customerInfo.orderNotes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions or notes for your order (optional)"
                    rows={4}
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    placeholder="050 123 4567"
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format: 0501234567 or +233501234567
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-4 sm:p-6 w-full">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                  <span className="text-gray-900 font-semibold whitespace-nowrap">GH₵ {getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900 font-semibold whitespace-nowrap">
                    {selectedQuote 
                      ? `GH₵ ${selectedQuote.price.amount.toFixed(2)}` 
                      : 'GH₵ 0.00'}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-bold text-gray-900">Total</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#ff9500] whitespace-nowrap">
                      GH₵ {(getTotalPrice() + (selectedQuote ? selectedQuote.price.amount : 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Button - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-black/10 p-4 shadow-lg z-10">
          <div className="max-w-4xl mx-auto px-4">
            <button
              onClick={handleProceedToPayment}
              disabled={isProcessing}
              className={`w-full rounded-lg bg-[#ff9500] px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:bg-[#e68600] hover:shadow-lg flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${
                isProcessing ? 'cursor-wait' : ''
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className="sm:w-5 sm:h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard size={18} className="sm:w-5 sm:h-5" />
                  <span>Proceed to Payment</span>
                </>
              )}
            </button>
            <p className="text-xs text-center text-gray-500 mt-2">
              Secure payment powered by Paystack
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;