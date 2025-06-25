import React from 'react';

const CalendarGrid = ({
  days,
  daysOfWeek,
  isToday,
  getEventsForDate,
  formatTime,
  handleMouseEnter,
  handleMouseLeave,
  hoveredDate,
  darkMode
}) => (
  <div className={`flex-1 p-4 sm:p-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
    
    <div className={`grid grid-cols-7 mb-4 text-center text-xs font-bold uppercase tracking-wide ${
      darkMode ? 'text-gray-400' : 'text-gray-500'
    }`}>
      {daysOfWeek.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>

    {/* Calendar Grid */}
    <div className={`grid grid-cols-7 border rounded-lg overflow-hidden shadow-sm ${
      darkMode ? 'border-gray-700' : 'border-gray-400'
    }`}>
      {days.map((day, index) => {
        const dayEvents = getEventsForDate(day.fullDate);
        const isCurrentDay = isToday(day.fullDate);

        return (
          <div
            key={index}
            className={`
              min-h-[120px] p-2 border-t border-l relative transition-colors
              ${darkMode ? 'border-gray-700' : 'border-gray-400'}
              ${day.isCurrentMonth ? darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50' : darkMode ? 'bg-gray-900 text-gray-500' : 'bg-gray-50 text-gray-400'}
              ${hoveredDate === index ? darkMode ? 'bg-gray-700' : 'bg-blue-50' : ''}
            `}
            onMouseEnter={(e) => handleMouseEnter(index, dayEvents, e)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-col h-full">
             
              <div
                className={`
                  text-sm mb-1 w-8 h-8 flex items-center justify-center rounded-full self-end
                  ${isCurrentDay 
                    ? 'bg-blue-600 text-white font-bold' 
                    : day.isCurrentMonth 
                      ? darkMode ? 'text-gray-200 font-bold' : 'text-gray-700 font-bold'
                      : darkMode ? 'text-gray-500' : 'text-gray-400'
                  }
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
                  <div className={`text-xs px-2 py-1 rounded cursor-pointer font-medium ${
                    darkMode ? 'text-blue-400 bg-blue-900 hover:bg-blue-800' : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                  }`}>
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