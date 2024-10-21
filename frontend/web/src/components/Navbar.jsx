// import React, { useState, useEffect } from "react";
// import { Link } from "react-scroll"; // Import Link from react-scroll

// const Navbar = () => {
//   const blockyTextStyle = {
//     fontFamily: "Nasalization"
//   };

//   const [isVisible, setIsVisible] = useState(true);

//   // Effect to handle navbar visibility on mouse movement
//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       // Show the navbar when the cursor is near the top of the screen
//       if (event.clientY < 120) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return (
//     <nav className={`flex justify-between items-center p-5 text-white fixed top-0 w-full z-20 bg-black transition-transform duration-300 ${
//       isVisible ? "translate-y-0" : "-translate-y-full"
//     }`}>
//       <div className="flex items-center" style={blockyTextStyle}>
//         <button
//           className="px-5 text-4xl transition-transform duration-200 hover:scale-110 cursor-pointer"
//           style={blockyTextStyle}
//           onClick={() =>
//             window.scrollTo({ top: -window.innerHeight, behavior: "smooth" })
//           }
//         >
//           <Link to="/"></Link>
//           NOps
//         </button>
//         <a
//           href="/login"
//           className="px-5 text-xl transition-transform duration-200 hover:scale-110"
//           style={blockyTextStyle}
//         >
//           Login
//         </a>
//       </div>
//       <div className="inline-flex text-xl space-x-5" style={blockyTextStyle}>
//         <a
//           className="transition-transform duration-200 hover:scale-110 cursor-pointer"
//           style={blockyTextStyle}
//           href="/"
//         >
//           Home
//         </a>
//         <button
//           style={blockyTextStyle}
//           onClick={() =>
//             window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
//           }
//           className="transition-transform duration-200 hover:scale-110 cursor-pointer"
//         >
//           <Link to="/"></Link>
          
//           About Us
//         </button>
//         <a
//           className="transition-transform duration-200 hover:scale-110 cursor-pointer"
//           style={blockyTextStyle}
//         >
//           Contact Us
//         </a>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link } from "react-scroll"; // Import Link from react-scroll

const Navbar = () => {
  const blockyTextStyle = {
    fontFamily: "Nasalization"
  };

  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  // Effect to handle navbar visibility on mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Show the navbar when the cursor is near the top of the screen
      if (event.clientY < 120) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <nav
      className={`flex justify-between items-center p-5 text-white fixed top-0 w-full z-20 bg-black transition-transform duration-300 
        ${isVisible ? "translate-y-0" : "-translate-y-full"} 
        ${isHovered ? "box-shadow" : ""}`} // Add box-shadow class based on hover
      onMouseEnter={() => setIsHovered(true)}   // Set hovered state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)}  // Set hovered state to false on mouse leave
    >
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

