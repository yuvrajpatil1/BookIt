import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, Minus, Plus } from "lucide-react";
import Header from "../components/Header";
import { Experience, Slot } from "../types";
import { experiencesApi } from "../services/api";

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await experiencesApi.getById(id!);
        setExperience(data);

        if (data.slots && data.slots.length > 0) {
          const uniqueDates = Array.from(
            new Set(data.slots.map((slot) => slot.date))
          );
          setSelectedDate(uniqueDates[0]);
        }
      } catch (err) {
        setError("Failed to load experience details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  const availableDates = experience?.slots
    ? Array.from(new Set(experience.slots.map((slot) => slot.date)))
    : [];

  const availableSlots =
    experience?.slots?.filter((slot) => slot.date === selectedDate) || [];

  const handleBooking = () => {
    if (!selectedSlot || !experience) {
      alert("Please select a time slot");
      return;
    }

    if (numberOfGuests > selectedSlot.availableSpots) {
      alert("Not enough spots available for the selected number of guests");
      return;
    }

    navigate("/checkout", {
      state: {
        experience,
        slot: selectedSlot,
        numberOfGuests,
      },
    });
  };

  const subtotal = experience ? experience.price * numberOfGuests : 0;
  const taxes = subtotal * 0.059; // 5.9% tax
  const total = subtotal + taxes;

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
        </div>
      </>
    );
  }

  if (error || !experience) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">{error || "Experience not found"}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="max-w-[80.625rem] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-800 hover:text-gray-900 mb-4 md:mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          <span className="font-medium text-sm md:text-base">Details</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative h-[15.625rem] md:h-[23.8125rem] rounded-xl overflow-hidden mb-4 md:mb-6">
              <img
                src={experience.images[0]}
                alt={experience.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <h1 className="text-xl md:text-2xl font-medium text-gray-900 mb-3 md:mb-4">
              {experience.title}
            </h1>

            {/* Description */}
            <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
              {experience.description}
            </p>

            {/* Choose Date */}
            <div className="mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">
                Choose date
              </h3>
              <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedSlot(null);
                    }}
                    className={`px-3 md:px-4 py-2 text-xs md:text-sm rounded-md whitespace-nowrap transition-colors border  ${
                      selectedDate === date
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-[#F9F9F9] text-gray-500 hover:bg-gray-200 border-gray-300"
                    }`}
                  >
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Time */}
            <div className="mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">
                Choose time
              </h3>
              <div className="flex gap-2 md:gap-4 flex-wrap">
                {availableSlots.map((slot) => (
                  <button
                    key={slot._id}
                    onClick={() => setSelectedSlot(slot)}
                    disabled={slot.availableSpots === 0}
                    className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm transition-colors ${
                      selectedSlot?._id === slot._id
                        ? "bg-yellow-400 text-gray-900"
                        : slot.availableSpots === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span>{slot.time}</span>
                    <span className="ml-1 md:ml-2 text-xs md:text-sm">
                      {slot.availableSpots === 0 ? (
                        <span className="text-red-600 font-semibold">
                          Sold out
                        </span>
                      ) : (
                        <span className="text-red-500">
                          {slot.availableSpots} left
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-[0.625rem] md:text-xs text-gray-500 mt-2">
                All times are in IST (GMT +5:30)
              </p>
            </div>

            {/* About */}
            <div className="mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">
                About
              </h3>
              <div className="bg-[#EEEEEE] rounded-lg p-2">
                <p className="text-gray-600 text-[0.75rem]">
                  Scenic routes, trained guides, and safety briefing. Minimum
                  age 10.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#efefef] rounded-2xl p-4 md:p-6 lg:sticky lg:top-24">
              {/* Starts At */}
              <div className="flex justify-between items-center py-2 border-gray-200">
                <span className="text-sm md:text-base text-gray-600">Starts at</span>
                <span className="text-base md:text-[1.125rem] text-gray-900">
                  ₹{experience.price}
                </span>
              </div>

              {/* Quantity */}
              <div className="flex justify-between items-center py-2">
                <span className="text-sm md:text-base text-gray-600">Quantity</span>
                <div className="flex items-center gap-[0.125rem]">
                  <button
                    onClick={() =>
                      setNumberOfGuests(Math.max(1, numberOfGuests - 1))
                    }
                    disabled={numberOfGuests <= 1}
                    className="w-6 h-6 md:w-4 md:h-4 border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm w-8 text-center">
                    {numberOfGuests}
                  </span>
                  <button
                    onClick={() => setNumberOfGuests(numberOfGuests + 1)}
                    disabled={
                      selectedSlot
                        ? numberOfGuests >= selectedSlot.availableSpots
                        : false
                    }
                    className="w-6 h-6 md:w-4 md:h-4 border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-center py-2">
                <span className="text-sm md:text-base text-gray-600">Subtotal</span>
                <span className="text-gray-900 text-sm">₹{subtotal}</span>
              </div>

              {/* Taxes */}
              <div className="flex justify-between items-center mb-3 md:mb-4 py-2 border-b border-gray-300">
                <span className="text-sm md:text-base text-gray-600">Taxes</span>
                <span className="text-gray-900 text-sm">
                  ₹{Math.round(taxes)}
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <span className="text-base md:text-lg font-bold text-gray-900">Total</span>
                <span className="text-lg md:text-xl font-bold text-gray-900">
                  ₹{Math.round(total)}
                </span>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleBooking}
                disabled={!selectedSlot}
                className="w-full bg-[#FFD643] disabled:text-gray-600 text-black py-3 rounded-lg text-sm md:text-base font-semibold hover:bg-yellow-500 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Confirm
              </button>

              {!selectedSlot && (
                <p className="text-center text-xs md:text-sm text-red-500 mt-2 md:mt-3">
                  Please select a date and time
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
