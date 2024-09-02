// import React from 'react';
// render the login and register buttons
const AuthButton = ({ text, onClick, additionalClasses }) => {
  return (
    <button
      className={`hover:opacity-80 transition-all duration-400 text-white cursor-pointer bg-[#12aef5] w-full px-4 py-2 rounded-md text-lg ${additionalClasses}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default AuthButton;