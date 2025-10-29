import { useLocation, useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import Header from "../components/Header";
import { Booking, Experience, Slot } from "../types";

interface ResultState {
  success: boolean;
  booking?: Booking;
  experience?: Experience;
  slot?: Slot;
  error?: string;
}

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultState;

  if (!state) {
    navigate("/");
    return null;
  }

  const { success, booking, error } = state;

  if (success && booking) {
    return (
      <>
        <Header />

        <div className="min-h-[calc(100vh-80px)] flex items-start justify-center px-3 md:px-4 pt-12 md:pt-20">
          <div className="text-center">
            {/* Green Check Icon */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-green-500 rounded-full flex items-center justify-center">
                <Check
                  className="w-12 h-12 md:w-14 md:h-14 text-white"
                  strokeWidth={3}
                />
              </div>
            </div>

            {/* Booking Confirmed Text */}
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Booking Confirmed
            </h1>

            {/* Reference ID */}
            <p className="text-gray-500 text-base md:text-lg mb-6 md:mb-8">
              Ref ID: {booking._id?.substring(0, 8).toUpperCase() || "HUF56&SO"}
            </p>

            {/* Back to Home Button */}
            <button
              onClick={() => navigate("/")}
              className="px-6 md:px-4 py-2 text-sm md:text-base bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </>
    );
  }

  // Error State
  return (
    <>
      <Header />

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-3 md:px-4">
        <div className="text-center">
          {/* Red X Icon */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-red-500 rounded-full flex items-center justify-center">
              <X
                className="w-12 h-12 md:w-14 md:h-14 text-white"
                strokeWidth={3}
              />
            </div>
          </div>

          {/* Booking Failed Text */}
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Booking Failed
          </h1>

          {/* Error Message */}
          <p className="text-gray-500 text-base md:text-lg mb-6 md:mb-8 px-4">
            {error ||
              "We encountered an issue processing your booking. Please try again."}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-base bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-base bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
