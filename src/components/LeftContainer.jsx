// components/LeftContainer.jsx
import React from 'react';
import dayjs from 'dayjs';

const LeftContainer = ({ currentDate, events }) => {
  const currentMonth = currentDate.month();
  const currentYear = currentDate.year();

  const getUpcomingEvents = () => {
    return events.filter(event => {
      const eventDate = dayjs(event.date);
      return eventDate.month() === currentMonth && eventDate.year() === currentYear;
    }).sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
  };

  const daysInMiniMonth = () => {
    const start = currentDate.startOf('month');
    const end = currentDate.endOf('month');
    const days = [];
    for (let d = 0; d < end.date(); d++) {
      days.push(start.add(d, 'day'));
    }
    return days;
  };

  return (
    <div className="w-full sm:w-64 bg-gray-50 border-r border-gray-200 p-4 space-y-6">
      {/* Mini Calendar Card */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Mini Calendar</h2>
        <div className="grid grid-cols-7 gap-1 text-sm text-gray-600">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="font-bold text-center">{d}</div>
          ))}
          {(() => {
            const start = currentDate.startOf('month');
            const padStart = start.day();
            const days = daysInMiniMonth();
            const total = padStart + days.length;
            const mini = [];

            for (let i = 0; i < padStart; i++) {
              mini.push(<div key={`empty-${i}`}></div>);
            }

            mini.push(...days.map((day, idx) => {
              const isToday = day.isSame(dayjs(), 'day');
              return (
                <div
                  key={`day-${idx}`}
                  className={`text-center py-1 rounded-full ${isToday ? 'bg-indigo-500 text-white font-bold' : 'hover:bg-gray-200'}`}
                >
                  {day.date()}
                </div>
              );
            }));
            return mini;
          })()}
        </div>
      </div>

      {/* Upcoming Events Card */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Upcoming Events</h2>
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {getUpcomingEvents().length === 0 ? (
            <li className="text-gray-500">No events this month</li>
          ) : (
            getUpcomingEvents().map((event, index) => (
              <li key={index} className="text-sm border-b border-gray-100 pb-2">
                <div className="font-medium text-gray-800">{event.title}</div>
                <div className="text-gray-500">{dayjs(event.date).format('MMM D')} — {event.startTime} to {event.endTime}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default LeftContainer;
