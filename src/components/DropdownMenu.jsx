import React from 'react';
import { ChevronRight, Check } from 'lucide-react';

const DropdownMenu = ({
  type,
  current,
  options,
  onChange,
  dropdownType,
  showDropdown,
  setDropdownType,
  setShowDropdown
}) => {
  const isActive = showDropdown && dropdownType === type;

  return (
    <div className="relative inline-block">
      {/* Toggle Button */}
      <button 
        onClick={() => {
          setDropdownType(type);
          setShowDropdown(!isActive);
        }}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 
                    bg-white border border-gray-300 rounded-full 
                    shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 
                    focus:ring-blue-500 transition-all duration-200`}
      >
        <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
        <ChevronRight
          className={`w-4 h-4 transform transition-transform duration-200 ${isActive ? 'rotate-90' : ''}`}
        />
      </button>

      {/* Dropdown Panel */}
      {isActive && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-y-auto max-h-64 animate-fade-in">
          {options.map((item, index) => {
            const value = type === 'month' ? index : item;
            const label = type === 'month' ? item : item;

            return (
              <button
  key={item}
  onClick={() => {
    onChange(value);         // Call the parent update function
    setShowDropdown(false);  // Close the dropdown
  }}
  className={`w-full px-4 py-2 text-sm text-left text-gray-700 
              hover:bg-blue-50 flex items-center justify-between transition-colors duration-150`}
>
  {label}
  {current === value && (
    <Check className="w-4 h-4 text-blue-600" />
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
