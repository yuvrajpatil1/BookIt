import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Header from "../components/Header";
import { Experience } from "../types";
import { experiencesApi } from "../services/api";

const HomePage = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await experiencesApi.getAll();
        setExperiences(data);
      } catch (err) {
        setError("Failed to load experiences. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const filteredExperiences = useMemo(() => {
    if (!searchQuery.trim()) {
      return experiences;
    }

    const query = searchQuery.toLowerCase();
    return experiences.filter((experience) => {
      return (
        experience.title.toLowerCase().includes(query) ||
        experience.location.toLowerCase().includes(query) ||
        experience.category.toLowerCase().includes(query) ||
        experience.description.toLowerCase().includes(query)
      );
    });
  }, [experiences, searchQuery]);

  if (loading) {
    return (
      <>
        <Header
          showSearch={true}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header
          showSearch={true}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header
        showSearch={true}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="max-w-[82rem] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-12 bg-[#F9F9F9]">
        {searchQuery && (
          <div className="mb-4 md:mb-6">
            <p className="text-sm md:text-base text-gray-600">
              Found{" "}
              <span className="font-semibold text-gray-900">
                {filteredExperiences.length}
              </span>{" "}
              experience{filteredExperiences.length !== 1 ? "s" : ""} matching "
              {searchQuery}"
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center">
          {filteredExperiences.map((experience) => (
            <div
              key={experience._id}
              onClick={() => navigate(`/experience/${experience._id}`)}
              className="bg-[#f0f0f0] rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer w-full sm:max-w-[18.4375rem] lg:max-h-[19.5rem] lg:max-w-[18.4375rem] mb-2"
            >
              <div className="relative h-[10.625rem] overflow-hidden ">
                <img
                  src={experience.images[0]}
                  alt={experience.title}
                  className="w-full h-[10.625rem] object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3 md:p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[0.875rem] md:text-[1rem] font-medium text-gray-900 mb-2 line-clamp-2 flex-1">
                    {experience.title}
                  </h3>
                  <span className="inline-block bg-[#D6D6D6] text-primary-700 text-xs font-semibold px-2 py-1 rounded-[0.25rem] flex-shrink-0">
                    <div className="font-normal text-[#161616] text-[0.625rem] md:text-[0.6875rem]">
                      <span>{experience.location}</span>
                    </div>
                  </span>
                </div>

                <div className="flex items-start justify-start border-gray-100">
                  <div className="flex items-start">
                    <span className="text-[#6C6C6C] text-[0.6875rem] md:text-xs py-[0.1875rem]">
                      {/* {experience.description} */}
                      Curated small-group experience. Certified guide. Safety
                      first with gear included.
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 md:pt-3">
                  <div className="flex items-center">
                    <span className="text-[0.6875rem] md:text-xs text-gray-900">
                      From
                    </span>
                    <span className="text-black font-medium text-[1.125rem] md:text-[1.25rem] ml-1">
                      ₹{experience.price}
                    </span>
                  </div>
                  <button className="text-[#161616] bg-[#ffd643] font-medium text-[0.75rem] md:text-[0.875rem] px-2 py-[0.25rem] rounded-[0.25rem]">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredExperiences.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchQuery
                ? `No experiences found matching "${searchQuery}". Try a different search term.`
                : "No experiences available at the moment."}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
