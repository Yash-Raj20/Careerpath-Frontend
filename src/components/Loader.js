import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid mb-4"></div>
      <p className="text-lg font-medium animate-pulse">🧠 CareerPath AI is thinking...</p>
    </div>
  );
};

export default Loader;