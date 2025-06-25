const Tooltip = ({ tooltip, darkMode }) => {
  if (!tooltip.show) return null;

  return (
    <div
      className="fixed z-[9999] animate-in fade-in-0 zoom-in-95 duration-200 ease-out"
      style={{
        left: tooltip.x,
        top: tooltip.y,
        transform: 'translateX(-50%) translateY(-100%)',
      }}
    >
      <div className="relative">
        <div className={`${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } text-sm font-medium px-4 py-3 rounded-xl shadow-2xl border max-w-xs min-w-max`}>
          <div className={`whitespace-pre-line leading-relaxed ${
            darkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            {tooltip.content}
          </div>
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
          <div className={`w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent ${
            darkMode ? 'border-t-gray-800' : 'border-t-white'
          }`}></div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;