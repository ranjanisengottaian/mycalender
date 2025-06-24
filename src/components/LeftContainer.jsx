import React, { useState } from 'react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

const LeftContainer = ({ currentDate: initialDate, events }) => {
  const [currentDate, setCurrentDate] = useState(dayjs(initialDate));
  const currentMonth = currentDate.month();
  const currentYear = currentDate.year();

  // Navigation functions
  const prevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  // Get unique events by title and date
  const getUniqueEvents = () => {
    const uniqueEvents = [];
    const seenEvents = new Set();
    
    events.forEach(event => {
      const eventKey = `${event.title}-${event.date}`;
      if (!seenEvents.has(eventKey)) {
        seenEvents.add(eventKey);
        uniqueEvents.push(event);
      }
    });
    
    return uniqueEvents;
  };

  const getUpcomingEvents = () => {
    return getUniqueEvents().filter(event => {
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="w-1/4 h-screen overflow-y-auto flex flex-col"
      style={{
        background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
        scrollbarWidth: 'thin'
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Content container with padding */}
      <div className="p-4 space-y-4">
        {/* Mini Calendar Card */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-4 border border-gray-100"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-3">
            <button 
              onClick={prevMonth}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous month"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex flex-col items-center">
              <h2 className="text-base font-medium text-gray-700">
                {currentDate.format('MMMM YYYY')}
              </h2>
              <hr className="w-full border-t border-gray-200 mt-1" />
            </div>
            
            <button 
              onClick={nextMonth}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next month"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-xs text-gray-600">
            {/* Monday-first week headers */}
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d, i) => (
              <div key={i} className="font-medium text-center pb-1">{d}</div>
            ))}

            {(() => {
              const start = currentDate.startOf('month');
              const firstDayOfWeek = start.day() === 0 ? 6 : start.day() - 1; // Monday-first
              const days = daysInMiniMonth();
              const weeks = [];
              let week = [];

              // Add empty cells for days before the 1st of the month
              for (let i = 0; i < firstDayOfWeek; i++) {
                week.push(<div key={`empty-${i}`} className="h-6"></div>);
              }

              // Add the days of the month
              days.forEach((day, idx) => {
                const isToday = day.isSame(dayjs(), 'day');
                const isCurrentMonth = day.month() === currentMonth;
                
                week.push(
                  <motion.div
                    key={`day-${idx}`}
                    className={`text-center py-1 rounded-full text-sm ${
                      isToday 
                        ? 'bg-indigo-600 text-white font-bold' 
                        : isCurrentMonth 
                          ? 'text-gray-800 hover:bg-gray-100' 
                          : 'text-gray-400 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {day.date()}
                  </motion.div>
                );

                // Start new week after Sunday
                if ((idx + firstDayOfWeek) % 7 === 6 || idx === days.length - 1) {
                  weeks.push(<div key={`week-${weeks.length}`} className="contents">{week}</div>);
                  week = [];
                }
              });

              // Add empty cells for days after the last day of the month
              while (week.length < 7) {
                week.push(<div key={`empty-end-${week.length}`} className="h-6"></div>);
              }
              if (week.length > 0 && weeks.length < 6) {
                weeks.push(<div key={`week-${weeks.length}`} className="contents">{week}</div>);
              }

              return weeks;
            })()}
          </div>
        </motion.div>

        {/* Upcoming Events Card */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg flex flex-col border border-gray-100"
          variants={itemVariants}
        >
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
            <p className="text-sm text-gray-500">Don't miss scheduled events</p>
          </div>
          
          {/* Events List */}
          <div className="divide-y divide-gray-100">
            {getUpcomingEvents().length === 0 ? (
              <motion.div 
                className="text-gray-500 py-4 text-center"
                variants={itemVariants}
              >
                No events this month
              </motion.div>
            ) : (
              getUpcomingEvents().map((event, index) => (
                <motion.div 
                  key={`${event.title}-${event.date}-${index}`}
                  className="flex gap-3 items-start p-4 hover:bg-gray-50 transition-colors"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="w-12 h-12 flex flex-col items-center justify-center rounded-md text-xs border border-gray-200 shrink-0 shadow-sm"
                    style={{ 
                      background: event.color 
                        ? `linear-gradient(135deg, ${event.color} 0%, ${event.color}80 100%)`
                        : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-[10px] font-medium leading-3 text-white">
                      {dayjs(event.date).format('MMM')}
                    </div>
                    <div className="text-sm font-bold leading-4 mt-[2px] text-white">
                      {dayjs(event.date).format('D')}
                    </div>
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 truncate">
                      {event.startTime} - {event.endTime}
                    </div>
                    <div className="text-sm font-medium text-gray-800 mt-0.5 truncate">
                      {event.title}
                    </div>
                    {event.location && (
                      <div className="text-xs text-gray-400 mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LeftContainer;