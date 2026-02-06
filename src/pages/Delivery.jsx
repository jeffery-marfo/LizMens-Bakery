import React, { useState, useEffect } from "react";
import {
  Truck,
  MapPin,
  Clock,
  Phone,
  CheckCircle,
  Package,
  Navigation,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Delivery = () => {
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if there's a saved delivery booking
  useEffect(() => {
    const savedDelivery = localStorage.getItem("deliveryBooking");
    if (savedDelivery) {
      const delivery = JSON.parse(savedDelivery);
      setTrackingId(delivery.id);
    }
  }, []);

  const trackDelivery = async () => {
    if (!trackingId.trim()) {
      alert("Please enter a delivery tracking ID");
      return;
    }

    setIsLoading(true);
    try {
      const SAIL_API_KEY = import.meta.env.VITE_SAIL_API_KEY || "";

      if (!SAIL_API_KEY) {
        alert("Sail API key not configured");
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `https://api.sailrides.co/v1/deliveries/${trackingId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `ApiKey ${SAIL_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Delivery not found");
      }

      const data = await response.json();
      setDeliveryStatus(data);
    } catch (error) {
      console.error("Error tracking delivery:", error);
      alert(`Error: ${error.message}`);
      setDeliveryStatus(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-blue-100 text-blue-800",
      arriving: "bg-purple-100 text-purple-800",
      in_progress: "bg-indigo-100 text-indigo-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      failed: "bg-red-100 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    if (status === "completed") return <CheckCircle size={20} />;
    if (status === "in_progress" || status === "arriving")
      return <Truck size={20} />;
    return <Package size={20} />;
  };

  return (
    <div className="relative w-full min-h-screen py-16 sm:py-20 overflow-x-hidden">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#ff9500]/10 mb-6">
            <Truck className="text-[#ff9500]" size={40} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Delivery Information
          </h1>
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base max-w-2xl mx-auto px-4">
            Fast, reliable delivery to your doorstep. Track your order in
            real-time.
          </p>
        </div>

        {/* Main Content - Fixed Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8 w-full">
          {/* Delivery Tracking */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-4 sm:p-6 mb-6 w-full">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="text-[#ff9500] flex-shrink-0" size={24} />
                <span>Track Your Delivery</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Tracking ID
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      placeholder="Enter your delivery ID (e.g., delivery_1234567890)"
                      className="flex-1 w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent"
                    />
                    <button
                      onClick={trackDelivery}
                      disabled={isLoading || !trackingId.trim()}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#ff9500] text-white text-sm font-semibold hover:bg-[#e68600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Tracking...</span>
                        </>
                      ) : (
                        <>
                          <Navigation size={16} />
                          <span>Track</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Your tracking ID was sent to you after placing your order
                  </p>
                </div>

                {/* Delivery Status Display */}
                {deliveryStatus && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-black/5 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(deliveryStatus.status)}
                        <div>
                          <div className="font-semibold text-gray-900">
                            Delivery Status
                          </div>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${getStatusColor(
                              deliveryStatus.status
                            )}`}
                          >
                            {deliveryStatus.status
                              .replace("_", " ")
                              .toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {deliveryStatus.driver && (
                      <div className="mt-4 p-3 bg-white rounded-lg border border-black/5 w-full">
                        <div className="text-sm font-semibold text-gray-900 mb-2">
                          Driver Information
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="break-words">
                            Name: {deliveryStatus.driver.name}
                          </div>
                          <div className="break-words">
                            Phone: {deliveryStatus.driver.phone}
                          </div>
                          {deliveryStatus.driver.vehicle && (
                            <div className="break-words">
                              Vehicle: {deliveryStatus.driver.vehicle}
                            </div>
                          )}
                          {deliveryStatus.driver.plateNumber && (
                            <div className="break-words">
                              Plate: {deliveryStatus.driver.plateNumber}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {deliveryStatus.trackingUrl && (
                      <a
                        href={deliveryStatus.trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#ff9500] hover:text-[#e68600] transition-colors break-all"
                      >
                        <Navigation size={16} className="flex-shrink-0" />
                        <span>View Live Tracking</span>
                      </a>
                    )}

                    <div className="mt-4 text-xs text-gray-500 break-words">
                      <div>
                        Created:{" "}
                        {new Date(deliveryStatus.createdAt).toLocaleString()}
                      </div>
                      {deliveryStatus.updatedAt && (
                        <div>
                          Last Updated:{" "}
                          {new Date(deliveryStatus.updatedAt).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Delivery Information Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Delivery Zones */}
            <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-4 sm:p-6 w-full">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="text-[#ff9500] flex-shrink-0" size={20} />
                <span>Delivery Zones</span>
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <CheckCircle
                    className="text-green-500 mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900">
                      Accra Metro
                    </div>
                    <div className="text-xs text-gray-500">
                      Greater Accra Region
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    className="text-green-500 mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900">Kumasi</div>
                    <div className="text-xs text-gray-500">Ashanti Region</div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                  Delivery available through Bolt, Uber, and Yango
                </p>
              </div>
            </div>

            {/* Delivery Partners */}
            <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-4 sm:p-6 w-full">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                Delivery Partners
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-semibold text-gray-900">
                    Bolt
                  </span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    Available
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-semibold text-gray-900">
                    Uber
                  </span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    Available
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-semibold text-gray-900">
                    Yango
                  </span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    Available
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-4 sm:p-6 w-full">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Phone className="text-[#ff9500] flex-shrink-0" size={20} />
                <span>Need Help?</span>
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">
                    Contact Us
                  </div>
                  <div className="text-gray-600 break-words">0244 097 094</div>
                  <div className="text-gray-600 break-words">020 572 1817</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">
                    Location
                  </div>
                  <div className="text-gray-600 break-words">
                    KAE DABI HOUSE
                  </div>
                  <div className="text-gray-600 break-words">
                    Teshie, Aboma, Accra
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 w-full">
          <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-4 sm:p-6 w-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#ff9500]/10 rounded-lg flex-shrink-0">
                <Clock className="text-[#ff9500]" size={24} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Fast Delivery
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Get your order delivered quickly. Average delivery time: 15-30
              minutes depending on location.
            </p>
          </div>

          <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-4 sm:p-6 w-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#ff9500]/10 rounded-lg flex-shrink-0">
                <MapPin className="text-[#ff9500]" size={24} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Real-Time Tracking
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Track your delivery in real-time. See exactly where your order is
              and when it will arrive.
            </p>
          </div>

          <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-4 sm:p-6 w-full sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#ff9500]/10 rounded-lg flex-shrink-0">
                <CheckCircle className="text-[#ff9500]" size={24} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Multiple Providers
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              We work with Bolt, Uber, and Yango to ensure the best delivery
              options and prices for you.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-6 text-center w-full">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Ready to Order?
          </h3>
          <p className="text-sm text-gray-600 mb-4 px-4">
            Browse our menu and place an order with delivery
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="inline-flex items-center gap-2 rounded-lg bg-[#ff9500] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e68600] hover:shadow-md"
          >
            <Truck size={18} />
            <span>Order Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
