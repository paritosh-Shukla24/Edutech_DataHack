import React from "react";
import { Link } from "react-scroll"; // Import Link from react-scroll

const Navbar = () => {
  const blockyTextStyle = {
    fontFamily: "Nasalization",
    textShadow: "2.25px 2.25px 0px rgba(0, 0, 0, 0.2)", // Keeps the 3D shadow effect
  };

  return (
    <nav className="flex justify-between items-center p-5 text-white fixed top-0 w-full z-20 bg-white bg-opacity-5">
      <div className="flex items-center" style={blockyTextStyle}>
        <button
          className="px-5 text-4xl transition-transform duration-200 hover:scale-110 cursor-pointer"
          style={blockyTextStyle}
          onClick={() =>
            window.scrollTo({ top: -window.innerHeight, behavior: "smooth" })
          }
        >
          <Link to="/"></Link>
          NOps
        </button>
        <a
          href="/login"
          className="px-5 text-xl transition-transform duration-200 hover:scale-110"
          style={blockyTextStyle}
        >
          Login
        </a>
      </div>
      <div className="inline-flex text-xl space-x-5" style={blockyTextStyle}>
        <a
          className="transition-transform duration-200 hover:scale-110 cursor-pointer"
          style={blockyTextStyle}
          href="/"
        >
          Home
        </a>
        <button
          style={blockyTextStyle}
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
          className="transition-transform duration-200 hover:scale-110 cursor-pointer"
        >
          <Link to="/"></Link>
          
          About Us
        </button>
        <a
          className="transition-transform duration-200 hover:scale-110 cursor-pointer"
          style={blockyTextStyle}
        >
          Contact Us
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
