function Loader({ size = "md", text = "Loading...", fullScreen = false }) {
  const sizes = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-4",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`
          ${sizes[size]}
          rounded-full
          border-gray-700
          border-t-red-400
          animate-spin
        `}
      />
      {text && <p className="text-gray-400 text-sm animate-pulse">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }
  return <div className="flex items-center justify-center py-16">{spinner}</div>;
}

export default Loader;