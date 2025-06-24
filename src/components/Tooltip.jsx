const Tooltip = ({ tooltip }) => {
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
        <div className="bg-slate-900/95 backdrop-blur-sm text-white text-sm font-medium px-4 py-3 rounded-xl shadow-2xl border border-slate-700/50 max-w-xs min-w-max">
          <div className="whitespace-pre-line leading-relaxed">
            {tooltip.content}
          </div>
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-slate-900/95"></div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
