import React from "react";

const Tooltip = ({ children, text, position = "top" }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={`absolute z-50 hidden group-hover:flex px-2 py-1 text-xs font-medium transition-opacity duration-300 rounded-md
          bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900
          ${position === "top" ? "bottom-full mb-2" : ""}
          ${position === "bottom" ? "top-full mt-2" : ""}
          ${position === "left" ? "right-full mr-2 top-1/2 -translate-y-1/2" : ""}
          ${position === "right" ? "left-full ml-2 top-1/2 -translate-y-1/2" : ""}
        `}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;