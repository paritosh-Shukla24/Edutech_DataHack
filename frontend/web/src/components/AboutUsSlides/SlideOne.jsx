import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

const SlideOne = () => {
  const blockyTextStyle = {
    fontFamily: "Nasalization",
  };

  const navigate = useNavigate(); // Hook for navigation

  const handleExploreClick = () => {
    const token = localStorage.getItem('token');

    if (token) {
      // If token exists, navigate to the flashcards page
      navigate('/flashcards');
    } else {
      // If token doesn't exist, navigate to the login page
      navigate('/login');
    }
  };

  return (
    <div className='flex flex-col' style={blockyTextStyle}>
      <h1 className='text-6xl justify-start items-center mb-5'>Quiz</h1>
      <h1 className='text-xl justify-start items-center animate-pulse mb-44'>
        A personalized testing system which dynamically adjusts the difficulty of questions based on your performance.
      </h1>
      <button
        className='justify-center items-center bg-gray-500 mx-auto rounded-lg py-3 hover:bg-gray-700 transition-transform duration-200 hover:scale-110'
        type='button'
        onClick={handleExploreClick} // On click, check for token
      >
        <label className='cursor-pointer px-5 text-white'>Explore</label>
      </button>
    </div>
  );
};

export default SlideOne;
