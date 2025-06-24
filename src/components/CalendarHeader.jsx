import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import DropdownMenu from './DropdownMenu';

const CalendarHeader = ({
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
          <span className="text-xl font-semibold text-gray-700">Calendar</span>
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
<h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 tracking-tight drop-shadow-sm">
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

export default CalendarHeader;
// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight, Calendar, Sparkles, Zap, Star, ChevronDown } from 'lucide-react';

// // Mock DropdownMenu component for demonstration
// const DropdownMenu = ({ type, current, options, onChange, dropdownType, showDropdown, setDropdownType, setShowDropdown }) => {
//   const isOpen = showDropdown && dropdownType === type;
//   const currentValue = type === 'month' ? options[current] : current;

//   const handleToggle = () => {
//     if (isOpen) {
//       setShowDropdown(false);
//       setDropdownType(null);
//     } else {
//       setShowDropdown(true);
//       setDropdownType(type);
//     }
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={handleToggle}
//         className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white/80 hover:bg-white rounded-xl border border-slate-200/50 hover:border-slate-300 transition-all duration-200 hover:shadow-md"
//       >
//         <span>{currentValue}</span>
//         <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
//       </button>
      
//       {isOpen && (
//         <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-xl border border-slate-200/50 backdrop-blur-md z-50 max-h-64 overflow-y-auto">
//           {options.map((option, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 onChange(type === 'month' ? index : option);
//                 setShowDropdown(false);
//                 setDropdownType(null);
//               }}
//               className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 first:rounded-t-xl last:rounded-b-xl transition-colors"
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const CalendarHeader = ({
//   goToToday = () => console.log('Go to today'),
//   navigateMonth = (direction) => console.log('Navigate month:', direction),
//   currentMonth = 5, // June (0-indexed)
//   currentYear = 2024,
//   monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//   years = Array.from({length: 10}, (_, i) => 2020 + i),
//   handleMonthChange = (month) => console.log('Month changed:', month),
//   handleYearChange = (year) => console.log('Year changed:', year),
//   dropdownType,
//   showDropdown = false,
//   setDropdownType = () => {},
//   setShowDropdown = () => {}
// }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [localDropdownType, setLocalDropdownType] = useState(dropdownType);
//   const [localShowDropdown, setLocalShowDropdown] = useState(showDropdown);

//   // Use local state if props are not provided
//   const currentDropdownType = dropdownType !== undefined ? dropdownType : localDropdownType;
//   const currentShowDropdown = showDropdown !== undefined ? showDropdown : localShowDropdown;
//   const currentSetDropdownType = setDropdownType !== (() => {}) ? setDropdownType : setLocalDropdownType;
//   const currentSetShowDropdown = setShowDropdown !== (() => {}) ? setShowDropdown : setLocalShowDropdown;

//   return (
//     <div className="relative overflow-hidden">
//       {/* Dynamic Background with Animated Gradients */}
//       <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-white to-blue-50/30">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse -translate-x-1/2 -translate-y-1/2"></div>
//         <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-400/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000 translate-x-1/2 -translate-y-1/2"></div>
//       </div>

//       {/* Glass Morphism Container */}
//       <div className="relative backdrop-blur-md bg-white/70 border-b border-white/20 shadow-lg shadow-black/5">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between px-8 py-6 gap-4 sm:gap-0">
          
//           {/* Left Section - Brand & Navigation */}
//           <div className="flex flex-wrap sm:flex-nowrap items-center space-x-3 sm:space-x-6">
            
//             {/* Premium Brand Identity */}
//             <div 
//               className="flex items-center space-x-4 group cursor-pointer"
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//             >
//               <div className="relative">
//                 <div className={`
//                   w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3
//                   bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 
//                   ${isHovered ? 'shadow-blue-500/50' : 'shadow-blue-500/20'}
//                 `}>
//                   <Calendar className="w-7 h-7 text-white" />
                  
//                   {/* Floating Sparkles */}
//                   <div className={`absolute -top-2 -right-2 transition-all duration-300 ${isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
//                     <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
//                       <Sparkles className="w-3 h-3 text-white" />
//                     </div>
//                   </div>
                  
//                   <div className={`absolute -bottom-1 -left-1 transition-all duration-500 delay-100 ${isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
//                     <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center animate-bounce">
//                       <Star className="w-2 h-2 text-white" />
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Premium Glow Effect */}
//                 <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${isHovered ? 'bg-gradient-to-br from-blue-400/30 to-purple-600/30 blur-xl scale-150' : 'scale-100 opacity-0'}`}></div>
//               </div>
              
//               <div className="flex flex-col">
//                 <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
//                   Calendar
//                 </h2>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                   <span className="text-xs font-medium text-slate-500">Premium Pro</span>
//                 </div>
//               </div>
//             </div>

//             {/* Enhanced Action Controls */}
//             <div className="flex items-center space-x-4">
              
//               {/* Premium Today Button */}
//               <button
//                 onClick={goToToday}
//                 className="group relative px-6 py-3 font-semibold text-sm rounded-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
//                 <span className="relative text-white font-bold flex items-center space-x-2">
//                   <Zap className="w-4 h-4" />
//                   <span>Today</span>
//                 </span>
//                 <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping rounded-2xl"></div>
//               </button>

//               {/* Sleek Navigation Controls */}
//               <div className="flex items-center space-x-2 p-1 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
//                 <button
//                   onClick={() => navigateMonth(-1)}
//                   className="group p-3 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:shadow-lg hover:scale-110"
//                 >
//                   <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors group-hover:-translate-x-1 transform duration-300" />
//                 </button>
                
//                 <div className="w-px h-6 bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
                
//                 <button
//                   onClick={() => navigateMonth(1)}
//                   className="group p-3 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:shadow-lg hover:scale-110"
//                 >
//                   <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors group-hover:translate-x-1 transform duration-300" />
//                 </button>
//               </div>
//             </div>

//             {/* Elegant Month Display */}
//             <div className="flex items-center space-x-3 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 shadow-md">
//               <div className="flex flex-col items-center">
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
//                   {monthNames[currentMonth]}
//                 </h1>
//                 <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
//               </div>
//               <div className="text-2xl font-light text-slate-500">
//                 {currentYear}
//               </div>
//             </div>
//           </div>

//           {/* Right Section - Premium Dropdowns */}
//           <div className="hidden sm:flex items-center space-x-4">
//             <div className="flex items-center space-x-3 p-2 bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg">
//               <div className="relative group">
//                 <DropdownMenu
//                   type="month"
//                   current={currentMonth}
//                   options={monthNames}
//                   onChange={handleMonthChange}
//                   dropdownType={currentDropdownType}
//                   showDropdown={currentShowDropdown}
//                   setDropdownType={currentSetDropdownType}
//                   setShowDropdown={currentSetShowDropdown}
//                 />
//                 <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity blur-sm"></div>
//               </div>
              
//               <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
              
//               <div className="relative group">
//                 <DropdownMenu
//                   type="year"
//                   current={currentYear}
//                   options={years}
//                   onChange={handleYearChange}
//                   dropdownType={currentDropdownType}
//                   showDropdown={currentShowDropdown}
//                   setDropdownType={currentSetDropdownType}
//                   setShowDropdown={currentSetShowDropdown}
//                 />
//                 <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity blur-sm"></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Premium Bottom Border Effect */}
//         <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        
//         {/* Animated Shine Effect */}
//         <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent animate-pulse"></div>
//       </div>
//     </div>
//   );
// };

// export default CalendarHeader;