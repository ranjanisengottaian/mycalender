import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import DropdownMenu from './DropdownMenu';

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
  setShowDropdown
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-gray-200 gap-2 sm:gap-0">
      <div className="flex flex-wrap sm:flex-nowrap items-center space-x-2 sm:space-x-4">
        {/* Icon + Title */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm ">
          <img src="calender_icon.png" alt="" className='w-full h-full rounded-full object-cover' />
          </div>
          <span className="text-xl font-semibold text-gray-700">EventCalender</span>
        </div>

        {/* Today Button */}
        <button 
  onClick={goToToday}
  className="px-5 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 transition-all duration-200"
>
  Today
</button>

        {/* Month navigation */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
        </div>

        {/* Current Month Label */}
<h1 className="text-2xl sm:text-3xl font-semibold text-gray-700 tracking-tight drop-shadow-sm">
  {monthNames[currentMonth]} {currentYear}
</h1>


        <button 
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
      </div>
      

      {/* Dropdowns (visible only on sm and above) */}
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
        />
      </div>
    </div>
  );
};

export default Navbar;
