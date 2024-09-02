// import React from 'react';

const HamburgerButton = ({ Icon, label, onClick, additionalClasses }) => {
  return (
    <button
      className={`w-full rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2 ${additionalClasses}`}
      onClick={onClick}
    >
      <Icon className="my-1" />
      <span>{label}</span>
    </button>
  );
};

export default HamburgerButton;