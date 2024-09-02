// import React from 'react'
import { Link } from "react-router-dom";
import AuthButton from "../buttons/AuthButton";
// renders login and signup buttons wrapped inside Link to navigate to respective pages
function Authbuttons() {
  return (
    <>
      <Link to="/login">
        <AuthButton text="Login" />
      </Link>
      <Link to="/signup">
        <AuthButton text="Register" />
      </Link>
    </>
  );
}

export default Authbuttons;
