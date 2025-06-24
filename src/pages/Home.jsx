// Home.jsx
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import sampleEvents from '../data/events.json';
import Navbar from '../components/Navbar';
import CalendarGrid from '../components/CalenderGrid';
import Tooltip from '../components/Tooltip';
import LeftContainer from '../components/LeftContainer'; 

const Home = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownType, setDropdownType] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });

  useEffect(() => {
    setEvents(sampleEvents);
  }, []);

  const today = dayjs();
  const currentYear = currentDate.year();
  const currentMonth = currentDate.month();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const getDaysInMonth = (date) => {
    const startOfMonth = date.startOf('month');
    const endOfMonth = date.endOf('month');
    const startDayOfWeek = startOfMonth.day();
    const days = [];

    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const prevDay = startOfMonth.subtract(i + 1, 'day');
      days.push({ isCurrentMonth: false, fullDate: prevDay });
    }

    for (let day = 0; day < endOfMonth.date(); day++) {
      const currentDay = startOfMonth.add(day, 'day');
      days.push({ isCurrentMonth: true, fullDate: currentDay });
    }

    const totalCells = Math.ceil(days.length / 7) * 7;
    let nextDay = endOfMonth.add(1, 'day');
while (days.length < totalCells) {
  days.push({ isCurrentMonth: false, fullDate: nextDay });
  nextDay = nextDay.add(1, 'day');
}


    return days;
  };

  const navigateMonth = (dir) => setCurrentDate(currentDate.add(dir, 'month'));
  const goToToday = () => setCurrentDate(dayjs());
  const isToday = (date) => date.isSame(today, 'day');
  const getEventsForDate = (date) => events.filter(e => e.date === date.format('YYYY-MM-DD'));

  const formatTime = (time) => {
    const [h, m] = time.split(':');
    return dayjs().hour(h).minute(m).format('h:mm A');
  };

  const generateTooltipContent = (evts) => {
    if (!evts.length) return "No events";
    if (evts.length === 1) {
      const e = evts[0];
      return `1 event: ${e.title} (${formatTime(e.startTime)} - ${formatTime(e.endTime)})`;
    }
    return `${evts.length} events:\n` + evts.map(e => `• ${e.title} (${formatTime(e.startTime)} - ${formatTime(e.endTime)})`).join('\n');
  };

  const handleMouseEnter = (i, evts, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredDate(i);
    setTooltip({ show: true, content: generateTooltipContent(evts), x: rect.left + rect.width / 2, y: rect.top - 10 });
  };

  const handleMouseLeave = () => {
    setHoveredDate(null);
    setTooltip({ show: false, content: '', x: 0, y: 0 });
  };

  const days = getDaysInMonth(currentDate);
  const years = Array.from({ length: 20 }, (_, i) => 2020 + i);

  return (
    <div className="h-screen bg-white flex flex-col relative">
    <Navbar
      {...{
        goToToday,
        navigateMonth,
        currentMonth,
        currentYear,
        monthNames,
        years,
        handleMonthChange: (m) => setCurrentDate(currentDate.month(m)),
        handleYearChange: (y) => setCurrentDate(currentDate.year(y)),
        dropdownType,
        showDropdown,
        setDropdownType,
        setShowDropdown
      }}
    />
    <div className="flex flex-1 overflow-hidden">
      {/* Left Sidebar */}
      <LeftContainer currentDate={currentDate} events={events} />

      {/* Main Calendar Grid */}
      <div className="flex-1 overflow-auto">
        <CalendarGrid
          {...{
            days,
            daysOfWeek,
            isToday,
            getEventsForDate,
            formatTime,
            handleMouseEnter,
            handleMouseLeave,
            hoveredDate
          }}
        />
      </div>
    </div>
    <Tooltip tooltip={tooltip} />
  </div>
  );
};

export default Home;