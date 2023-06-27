import React from "react";

const Loading = () => {
  return (
    <div className="animate-pulse mx-auto text-center">
      <span className="sr-only">Loading...</span>
      <div className="flex items-center justify-center mt-4">
        <div className="w-20 h-2.5 bg-gray-200 rounded-full"></div>
        <div className="w-24 h-2 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-2.5 bg-gray-300 rounded-full max-w-[640px] mt-5 mb-2.5 mx-auto"></div>
      <div className="h-2.5 mx-auto bg-gray-300 rounded-full max-w-[540px]"></div>

      <div className="mx-auto mt-10 h-56 max-w-md bg-gray-300 rounded-lg animate-pulse">
      <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
