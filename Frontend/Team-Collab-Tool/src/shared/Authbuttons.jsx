// import React from 'react'
import { Link } from "react-router-dom";
// renders login and signup buttons
function Authbuttons() {
  return (
    <div className="hidden md:flex gap-4 px-7">
      <Link to="/login">
        <button className="hover:opacity-80 transition-all duration-400 text-white cursor-pointer bg-[#12aef5] px-4 py-2 rounded-md text-lg">
          Login
        </button>
      </Link>
      <Link to="/signup">
        <button className="hover:opacity-80 transition-all duration-400 text-white cursor-pointer bg-[#12aef5] px-4 py-2 rounded-md text-lg">
          Register
        </button>
      </Link>
    </div>
  );
}

export default Authbuttons;
