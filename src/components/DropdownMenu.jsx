import { ChevronRight, Check } from 'lucide-react';

const DropdownMenu = ({
  type,
  current,
  options,
  onChange,
  dropdownType,
  showDropdown,
  setDropdownType,
  setShowDropdown,
  darkMode
}) => {
  const isActive = showDropdown && dropdownType === type;
  const isYearDropdown = type === 'year';
  const dropdownWidth = isYearDropdown ? 'w-32' : 'w-48';

  return (
    <div className="relative inline-block mr-5">
      
      <button 
        onClick={() => {
          setDropdownType(type);
          setShowDropdown(!isActive);
        }}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${
          darkMode ? 'text-gray-200 bg-gray-700 border-gray-600 hover:bg-gray-600' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100'
        } border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
      >
        <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
        <ChevronRight
          className={`w-4 h-4 transform transition-transform duration-200 ${isActive ? 'rotate-90' : ''} ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        />
      </button>

      {/* Dropdown Panel */}
      {isActive && (
        <div className={`absolute left-0 mt-2 ${dropdownWidth} ${
          darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
        } border rounded-xl shadow-lg z-20 overflow-y-auto max-h-64 animate-fade-in`}>
          {options.map((item, index) => {
            const value = type === 'month' ? index : item;
            const label = type === 'month' ? item : item;

            return (
              <button
                key={item}
                onClick={() => {
                  onChange(value);
                  setShowDropdown(false);
                }}
                className={`w-full px-4 py-2 text-sm text-left ${
                  darkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-blue-50'
                } flex items-center justify-between transition-colors duration-150`}
              >
                {label}
                {current === value && (
                  <Check className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
