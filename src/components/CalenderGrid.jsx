import React from 'react';

const CalendarGrid = ({
  days,
  daysOfWeek,
  isToday,
  getEventsForDate,
  formatTime,
  handleMouseEnter,
  handleMouseLeave,
  hoveredDate
}) => (
  <div className="flex-1 p-4 sm:p-6 bg-white">
    {/* Weekday Headers */}
    <div className="grid grid-cols-7 mb-4 text-center text-s font-bold text-gray-700 uppercase tracking-wide">
      {daysOfWeek.map((day) => (
        <div key={day} className="py-2">
          {day}
        </div>
      ))}
    </div>

    {/* Calendar Grid */}
    <div className="grid grid-cols-7 border border-gray-400 rounded-lg overflow-hidden shadow-sm">
      {days.map((day, index) => {
        const dayEvents = getEventsForDate(day.fullDate);
        const isCurrentDay = isToday(day.fullDate);

        return (
          <div
            key={index}
            className={`
              min-h-[120px] p-2 border-t border-l border-gray-400 relative transition-colors
              ${day.isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400'}
              ${hoveredDate === index ? 'bg-blue-50' : ''}
            `}
            onMouseEnter={(e) => handleMouseEnter(index, dayEvents, e)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-col h-full">
              {/* Day Number */}
              <div
                className={`
                  text-sm mb-1 w-8 h-8 flex items-center justify-center rounded-full self-end
                  ${isCurrentDay ? 'bg-blue-600 text-white font-bold' : day.isCurrentMonth ? 'text-gray-1000' : 'text-gray-500'}
                `}
              >
                {day.fullDate.date()}
              </div>

              {/* Event List */}
              <div className="flex-1 space-y-1 mt-1">
                {dayEvents.slice(0, 3).map((event, i) => (
                  <div
                    key={i}
                    className="text-xs px-2 py-1 rounded font-medium truncate text-white shadow-sm"
                    style={{ backgroundColor: event.color }}
                    title={`${event.title} (${formatTime(event.startTime)} - ${formatTime(event.endTime)})`}
                  >
                    {formatTime(event.startTime)} {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-blue-600 px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded cursor-pointer font-medium">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default CalendarGrid;
// import React from 'react';

// const CalendarGrid = ({
//   days,
//   daysOfWeek,
//   isToday,
//   getEventsForDate,
//   formatTime,
//   handleMouseEnter,
//   handleMouseLeave,
//   hoveredDate
// }) => (
//   <div className="flex-1 p-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//     {/* Elevated Header with Glass Effect */}
//     <div className="mb-8">
//       <div className="grid grid-cols-7 backdrop-blur-md bg-white/80 rounded-2xl p-4 shadow-lg shadow-black/5 border border-white/20">
//         {daysOfWeek.map((day) => (
//           <div key={day} className="text-center">
//             <div className="text-sm font-bold text-slate-800 tracking-wider uppercase">
//               {day}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Premium Calendar Grid */}
//     <div className="grid grid-cols-7 gap-3 p-1">
//       {days.map((day, index) => {
//         const dayEvents = getEventsForDate(day.fullDate);
//         const isCurrentDay = isToday(day.fullDate);
//         const isHovered = hoveredDate === index;

//         return (
//           <div
//             key={index}
//             className={`
//               group relative min-h-[140px] rounded-2xl transition-all duration-300 ease-out cursor-pointer
//               ${day.isCurrentMonth 
//                 ? 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50/50 shadow-md hover:shadow-xl hover:shadow-blue-500/10' 
//                 : 'bg-slate-50/50 hover:bg-slate-100/70 shadow-sm'
//               }
//               ${isHovered ? 'scale-[1.02] shadow-2xl shadow-blue-500/20 bg-gradient-to-br from-white to-blue-50' : ''}
//               ${isCurrentDay ? 'ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/20' : ''}
//               border border-slate-200/50 hover:border-blue-200/50
//             `}
//             onMouseEnter={(e) => handleMouseEnter(index, dayEvents, e)}
//             onMouseLeave={handleMouseLeave}
//           >
//             {/* Gradient Overlay for Current Day */}
//             {isCurrentDay && (
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
//             )}

//             <div className="relative p-4 h-full flex flex-col">
//               {/* Day Number with Premium Styling */}
//               <div className="flex justify-end mb-3">
//                 <div
//                   className={`
//                     w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all duration-200
//                     ${isCurrentDay 
//                       ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30' 
//                       : day.isCurrentMonth 
//                         ? 'text-slate-700 hover:bg-slate-100 group-hover:bg-blue-50 group-hover:text-blue-700' 
//                         : 'text-slate-400 hover:bg-slate-100'
//                     }
//                   `}
//                 >
//                   {day.fullDate.date()}
//                 </div>
//               </div>

//               {/* Events with Premium Design */}
//               <div className="flex-1 space-y-2">
//                 {dayEvents.slice(0, 3).map((event, i) => (
//                   <div
//                     key={i}
//                     className={`
//                       text-xs font-semibold px-3 py-2 rounded-xl backdrop-blur-sm 
//                       transition-all duration-200 hover:scale-[1.02] cursor-pointer
//                       shadow-sm hover:shadow-md border border-white/20
//                       transform hover:-translate-y-0.5
//                     `}
//                     style={{ 
//                       backgroundColor: event.color,
//                       backgroundImage: `linear-gradient(135deg, ${event.color} 0%, ${event.color}dd 100%)`
//                     }}
//                     title={`${event.title} (${formatTime(event.startTime)} - ${formatTime(event.endTime)})`}
//                   >
//                     <div className="flex items-center space-x-2 text-white">
//                       <div className="w-1.5 h-1.5 bg-white/80 rounded-full"></div>
//                       <div className="truncate">
//                         <span className="opacity-90 text-[10px] font-medium">
//                           {formatTime(event.startTime)}
//                         </span>
//                         <span className="ml-1.5 font-semibold">
//                           {event.title}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
                
//                 {dayEvents.length > 3 && (
//                   <div className="group/more relative">
//                     <div className="text-xs font-bold px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white cursor-pointer transition-all duration-200 hover:scale-[1.02] shadow-md hover:shadow-lg border border-blue-400/20 hover:from-blue-600 hover:to-purple-700">
//                       <div className="flex items-center justify-between">
//                         <span>+{dayEvents.length - 3} more events</span>
//                         <svg className="w-3 h-3 ml-1 transform group-hover/more:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Subtle Activity Indicator */}
//               {dayEvents.length > 0 && (
//                 <div className="absolute top-2 left-2">
//                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
//                 </div>
//               )}

//               {/* Hover Glow Effect */}
//               {isHovered && (
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl pointer-events-none"></div>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>

//     {/* Bottom Gradient Fade */}
//     <div className="mt-8 h-4 bg-gradient-to-t from-slate-50/50 to-transparent rounded-b-2xl"></div>
//   </div>
// );

// export default CalendarGrid;