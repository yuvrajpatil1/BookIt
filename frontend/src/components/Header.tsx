import { useNavigate } from "react-router-dom";
import logo from "../public/image.png";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showSearch?: boolean;
}

const Header = ({
  searchQuery = "",
  onSearchChange,
  showSearch = false,
}: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-[#F9F9F9] shadow-md sticky top-0 z-50">
      <div className="max-w-[80.625rem] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:h-[5.4375rem] py-3 md:py-0 gap-3 md:gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-2xl font-bold text-black transition-colors flex-shrink-0"
          >
            <img
              src={logo}
              alt="hd-logo"
              className="h-[2.8125rem] md:h-[3.4375rem]"
            />
          </button>

          {showSearch && (
            <div className="w-full md:flex-1 md:max-w-md">
              <div className="flex gap-2 md:gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search experiences"
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    className="bg-[#EDEDED] w-full px-3 md:px-4 py-2 rounded-[0.25rem] text-sm md:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button className="px-4 md:px-5 py-2 bg-[#ffd643] text-black rounded-lg font-semibold hover:bg-yellow-500 transition-colors whitespace-nowrap">
                  Search
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
