import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle, X } from 'lucide-react'
import Hero from '../components/Hero'
import ValueProposition from '../components/ValueProposition'
import ProductsSection from '../components/ProductsSection'

const Landing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (location.state?.paymentSuccess) {
      setOrderDetails(location.state);
      setShowSuccessModal(true);
      // Clear the state so it doesn't show again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="relative">
      <Hero />
      <ProductsSection />
      <ValueProposition />

      {/* Payment Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>

            <div className="text-center pt-4 pb-2">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h2>
              <p className="text-gray-600 mb-6">
                Thank you, <span className="font-semibold">{orderDetails?.customerName}</span>.
                Your order has been received.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Order Reference</p>
                <p className="text-lg font-mono font-bold text-gray-800 break-all select-all">
                  {orderDetails?.reference}
                </p>
              </div>

              <div className="space-y-3">
                {/* WhatsApp button — always shown so customer can notify provider */}
                {orderDetails?.whatsappUrl && (
                  <a
                    href={orderDetails.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-[#1ebe5d] transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Send Order to Provider via WhatsApp
                  </a>
                )}
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    // Optional: Navigate to tracking page if you have one
                  }}
                  className="w-full py-3 bg-[#ff9500] text-white rounded-lg font-semibold hover:bg-[#e68600] transition-colors"
                >
                  Continue Shopping
                </button>
                {orderDetails?.deliveryBooked && (
                  <p className="text-xs text-blue-600">
                    Delivery has been booked automatically.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Landing