import React from "react";

const LoadingBubble = () => {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-4 max-w-[100px] shadow-sm">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_1s_infinite_0ms]" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_1s_infinite_200ms]" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_1s_infinite_400ms]" />
      </div>
    </div>
  );
};

export default LoadingBubble;
