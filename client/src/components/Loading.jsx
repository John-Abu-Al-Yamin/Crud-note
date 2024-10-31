import React from "react";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="p-6 bg-white rounded-lg shadow-md border border-gray-200 animate-pulse"
        >
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
          <div className="h-40 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
