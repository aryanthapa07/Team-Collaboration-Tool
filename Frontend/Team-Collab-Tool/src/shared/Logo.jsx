// import React from 'react'
import { Link } from "react-router-dom";
// renders the logo
function Logo() {
  return (
    <>
      <Link to="/" className="hover:scale-95 transition-all duration-500">
        <img src="/images/logo.png" className="w-60 object-cover ml-4" alt="" />
      </Link>
    </>
  );
}

export default Logo;
