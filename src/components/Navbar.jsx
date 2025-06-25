
import { ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";
import DropdownMenu from "./DropdownMenu";

const Navbar = ({
  goToToday,
  navigateMonth,
  currentMonth,
  currentYear,
  monthNames,
  years,
  handleMonthChange,
  handleYearChange,
  dropdownType,
  showDropdown,
  setDropdownType,
  setShowDropdown,
  darkMode,
  toggleDarkMode
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b ${
      darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
    } gap-2 sm:gap-0`}>
      <div className="flex flex-wrap sm:flex-nowrap items-center space-x-2 sm:space-x-4">
       
        <div className="flex items-center space-x-2">
          <div className={`w-10 h-10 ${
            darkMode ? 'bg-gray-700' : 'bg-white'
          } rounded-lg flex items-center justify-center shadow-sm`}>
            <img
              src="calender_icon.png"
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className={`text-xl font-semibold ${
            darkMode ? 'text-white' : 'text-gray-700'
          }`}>
            EventCalender
          </span>
        </div>

        {/* Today Btn */}
        <button
          onClick={goToToday}
          className={`px-5 py-2 text-sm font-semibold ${
            darkMode 
              ? 'text-white bg-gray-700 border-gray-600 hover:bg-gray-600' 
              : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100'
          } border rounded-full shadow hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 transition-all duration-200`}
        >
          Today
        </button>

        {/* Month navigation */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth(-1)}
            className={`p-2 ${
              darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            } rounded-full transition-colors`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Current Month  */}
        <h1 className={`text-2xl sm:text-3xl font-semibold tracking-tight drop-shadow-sm ${
          darkMode ? 'text-white' : 'text-gray-700'
        }`}>
          {monthNames[currentMonth]} {currentYear}
        </h1>

        <button
          onClick={() => navigateMonth(1)}
          className={`p-2 ${
            darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
          } rounded-full transition-colors`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Right side of navbar*/}
      <div className="flex items-center space-x-4">
        {/* Toggle Btn*/}
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${
            darkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          } transition-colors`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="hidden sm:flex items-center space-x-2">
          <DropdownMenu
            type="month"
            current={currentMonth}
            options={monthNames}
            onChange={handleMonthChange}
            dropdownType={dropdownType}
            showDropdown={showDropdown}
            setDropdownType={setDropdownType}
            setShowDropdown={setShowDropdown}
            darkMode={darkMode}
          />
          <DropdownMenu
            type="year"
            current={currentYear}
            options={years}
            onChange={handleYearChange}
            dropdownType={dropdownType}
            showDropdown={showDropdown}
            setDropdownType={setDropdownType}
            setShowDropdown={setShowDropdown}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;