import React from "react";

const LeftNavMenuItem = ({ text, icon, className, action }) => {
  const iconStyle = {
    paddingRight: "1.5rem",
  };
  return (
    <div
      className={
        "text-white text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15] " +
        className
      }
      onClick={action}
    >
      <span className="nav-text" style={iconStyle}>
        {icon}
      </span>
      {text}
    </div>
  );
};

export default LeftNavMenuItem;
