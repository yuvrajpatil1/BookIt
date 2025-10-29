import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import Header from "../components/Header";
import { Experience, Slot } from "../types";
import { bookingsApi, promoApi } from "../services/api";

interface CheckoutState {
  experience: Experience;
  slot: Slot;
  numberOfGuests: number;
}

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as CheckoutState;

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [loading, setLoading] = useState(false);
  const [validatingPromo, setValidatingPromo] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!state?.experience || !state?.slot) {
    navigate("/");
    return null;
  }

  const { experience, slot, numberOfGuests } = state;
  const subtotal = experience.price * numberOfGuests;
  const taxes = subtotal * 0.059; // 5.9% tax
  const discount = appliedPromo?.discount || 0;
  const total = subtotal + taxes - discount;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!emailRegex.test(formData.customerEmail)) {
      newErrors.customerEmail = "Invalid email format";
    }

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the terms and safety policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    setValidatingPromo(true);
    setPromoError("");

    try {
      const result = await promoApi.validate(promoCode, subtotal);
      setAppliedPromo({
        code: result.code,
        discount: result.discount,
      });
      setPromoCode("");
    } catch (err: any) {
      setPromoError(err.response?.data?.error || "Invalid promo code");
    } finally {
      setValidatingPromo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        experienceId: experience._id,
        slotId: slot._id,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone || "N/A",
        numberOfGuests,
        promoCode: appliedPromo?.code || "",
        discount,
        totalPrice: total,
      };

      const booking = await bookingsApi.create(bookingData);

      navigate("/result", {
        state: {
          booking,
          experience,
          slot,
          success: true,
        },
      });
    } catch (err: any) {
      navigate("/result", {
        state: {
          success: false,
          error:
            err.response?.data?.error || "Booking failed. Please try again.",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="max-w-[80.625rem] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-900 mb-4 md:mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          <span className="text-sm md:text-base">Checkout</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Left Column - Form */}
          <div className="bg-[#EFEFEF] p-4 md:p-7 max-h-full lg:max-h-[15.625rem] w-full lg:w-2/3 rounded-md">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-xs md:text-sm text-gray-700 mb-1 md:mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    className={`w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-[#DDDDDD] border-0 rounded-lg focus:ring-2 focus:ring-gray-300 focus:bg-white ${
                      errors.customerName ? "ring-2 ring-red-500" : ""
                    }`}
                    placeholder="Your name"
                  />
                  {errors.customerName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.customerName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs md:text-sm text-gray-700 mb-1 md:mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customerEmail: e.target.value,
                      })
                    }
                    className={`w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-[#DDDDDD] border-0 rounded-lg focus:ring-2 focus:ring-gray-300 focus:bg-white ${
                      errors.customerEmail ? "ring-2 ring-red-500" : ""
                    }`}
                    placeholder="Your email"
                  />
                  {errors.customerEmail && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.customerEmail}
                    </p>
                  )}
                </div>
              </div>

              {/* Promo Code */}
              <div>
                <div className="flex gap-2 md:gap-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value.toUpperCase());
                      setPromoError("");
                    }}
                    placeholder="Promo Code"
                    disabled={!!appliedPromo}
                    className="flex-1 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-[#DDDDDD] border-0 rounded-lg focus:ring-2 focus:ring-gray-300 focus:bg-white disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    disabled={validatingPromo || !!appliedPromo}
                    className="px-5 md:px-8 py-2 md:py-3 text-sm md:text-base bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {validatingPromo ? (
                      <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                    ) : (
                      "Apply"
                    )}
                  </button>
                </div>
                {promoError && (
                  <p className="text-red-500 text-xs mt-1">{promoError}</p>
                )}
                {appliedPromo && (
                  <div className="mt-2 flex items-center justify-between text-sm text-green-600">
                    <span>Promo code "{appliedPromo.code}" applied!</span>
                    <button
                      type="button"
                      onClick={() => setAppliedPromo(null)}
                      className="text-red-600 hover:text-red-700 "
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the terms and safety policy
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-xs -mt-4">{errors.terms}</p>
              )}
            </form>
          </div>

          {/* Right Column - Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-[#EFEFEF] rounded-2xl p-4 md:p-6 max-h-full">
              {/* Experience Details */}
              <div className="mb-4 md:mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-xs md:text-sm">Experience</span>
                  <span className="text-xs md:text-base text-gray-900">{experience.title}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-xs md:text-sm">Date</span>
                  <span className="text-xs md:text-base text-gray-900">
                    {new Date(slot.date).toLocaleDateString("en-CA")}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-xs md:text-sm">Time</span>
                  <span className="text-xs md:text-base text-gray-900">{slot.time}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-xs md:text-sm">Qty</span>
                  <span className="text-xs md:text-base text-gray-900">{numberOfGuests}</span>
                </div>

                {/* Pricing */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-xs md:text-sm">Subtotal</span>
                  <span className="text-xs md:text-base text-gray-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between items-center mb-4 md:mb-6 pb-4 md:pb-6 border-b border-gray-300">
                  <span className="text-gray-600 text-xs md:text-sm">Taxes</span>
                  <span className="text-xs md:text-base text-gray-900">₹{Math.round(taxes)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-600 text-xs md:text-sm">Discount</span>
                    <span className="font-semibold text-green-600 text-xs md:text-base">
                      -₹{Math.round(discount)}
                    </span>
                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <span className="text-base md:text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg md:text-xl font-bold text-gray-900">
                    ₹{Math.round(total)}
                  </span>
                </div>
                {/* Pay Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-yellow-400 text-gray-900 py-2 md:py-3 text-sm md:text-base rounded-lg font-semibold hover:bg-yellow-500 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Pay and Confirm"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
