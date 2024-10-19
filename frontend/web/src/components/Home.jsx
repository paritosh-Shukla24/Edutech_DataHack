import React from "react";
import { ReactTyped } from "react-typed"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import AboutUs from "./AboutUs";

const Home = () => {
  const blockyTextStyle = {
    fontFamily: "Nasalization",
    textShadow: "2.25px 2.25px 0px rgba(0, 0, 0, 0.3)",
  };

  return (
    <div className="w-full h-screen relative">
      <video
        autoPlay
        muted
        loop
        className="fixed inset-0 w-full h-full object-cover brightness-[0.6]"
      >
        <source src="/src/assets/4760-179739327.mp4" type="video/mp4" />
      </video>

      <div
        className="relative z-10 flex justify-center items-center w-full h-full flex-col"
        style={blockyTextStyle}
      >
        <h1 className="text-9xl text-white">CURIOSITAS</h1>
        <h1 className="text-xl text-white mt-5 italic">{""}
        <ReactTyped strings={["A Novel Way To Feed Your Curiosity"]}  typeSpeed={50} cursorChar=""/>
        </h1>

        <button
          className="text-xl text-white mt-28 flex items-center space-x-2 animate-pulse"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <span>Check It Out!</span>
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>

      <div className="">
          <AboutUs />
      </div>

    </div>

  );
};

export default Home;
