import React from "react";
import { ReactTyped } from "react-typed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import AboutUs from "./AboutUs";

export default function Home() {
  const blockyTextStyle = {
    fontFamily: "Nasalization",
    textShadow: "2.25px 2.25px 0px rgba(0, 0, 0, 0.3)",
  };

  return (
    <div className="w-full">
      <div className="relative h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover brightness-[0.6]"
        >
          <source src="/src/assets/4760-179739327.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full" style={blockyTextStyle}>
          <h1 className="text-6xl sm:text-9xl text-white">CURIOSITAS</h1>
          <h2 className="text-lg sm:text-xl text-white mt-5 italic">
            <ReactTyped strings={["A Novel Way To Feed Your Curiosity"]} typeSpeed={50} cursorChar="" />
          </h2>

          <button
            className="text-lg sm:text-xl text-white mt-16 sm:mt-28 flex items-center space-x-2 animate-pulse"
            onClick={() => {
              const aboutUsSection = document.getElementById('about-us-section');
              if (aboutUsSection) {
                aboutUsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span>Check It Out!</span>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
      </div>

      <div id="about-us-section">
        <AboutUs />
      </div>
    </div>
  );
}