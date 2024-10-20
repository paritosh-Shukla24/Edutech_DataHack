import React from "react";
import { ReactTyped } from "react-typed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import AboutUs from "./AboutUs";
import VoiceflowBot from "./VoiceflowBot";
import { motion } from "framer-motion"; 
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa"; 

const Home = () => {
  const blockyTextStyle = {
    fontFamily: "Nasalization",
    textShadow: "2.25px 2.25px 0px rgba(0, 0, 0, 0.3)",
  };

  return (
    <div className="w-full min-h-screen relative">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        className="fixed inset-0 w-full h-full object-cover brightness-[0.6] z-0"
      >
        <source src="/src/assets/4760-179739327.mp4" type="video/mp4" />
      </video>

      {/* Main content */}
      <div className="relative z-10 flex justify-center items-center w-full h-screen flex-col" style={blockyTextStyle}>
        <h1 className="text-9xl text-white">CURIOSITAS</h1>
        <h1 className="text-xl text-white mt-5 italic">
          <ReactTyped strings={["A Novel Way To Feed Your Curiosity"]} typeSpeed={50} cursorChar="" />
        </h1>

        <button
          className="text-xl text-white mt-28 flex items-center space-x-2 animate-pulse"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          <span>Check It Out!</span>
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>

      {/* AboutUs Section */}
      <div className="relative z-10">
        <AboutUs />
      </div>

      {/* VoiceflowBot Section */}
      <div className="relative z-10" style={{ marginBottom: '2rem' }}>
        <VoiceflowBot />
      </div>

      {/* Footer Section */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-gradient-to-r from-black to-gray-900 text-white py-8 relative z-10"
        style={{ position: 'relative', bottom: 0 }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-2xl mb-4">About CURIOSITAS</h2>
          <p className="mb-4">
            CURIOSITAS is your go-to platform for technology education and resources. We provide
            courses, tutorials, and a community for learners of all levels.
          </p>
          <p className="mb-4">
            Our mission is to empower individuals with the skills and knowledge needed to thrive
            in a rapidly evolving tech landscape.
          </p>
          <h3 className="text-xl mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn size={24} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </a>
          </div>
          <p className="mt-4">© 2024 CURIOSITAS. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;
