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
    <div className="grid grid-cols-7 mb-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wide">
      {daysOfWeek.map((day) => (
        <div key={day} >
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
                  ${isCurrentDay ? 'bg-blue-600 text-white font-bold' : day.isCurrentMonth ? 'text-gray-700 font-bold ' : 'text-gray-500'}
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
