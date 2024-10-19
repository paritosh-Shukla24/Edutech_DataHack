import React from 'react';
import { useNavigate } from 'react-router-dom';

const SlideThree = () => {
  const navigate = useNavigate();
  const blockyTextStyle = {
    fontFamily: "Nasalization",
  };

  const handleExplore = () => {
    navigate('/resources');
  };

  return (
    <div className='flex flex-col' style={blockyTextStyle}>
      <h1 className='text-6xl justify-start items-center mb-10'>Resources Library</h1>
      <h1 className='text-xl justify-start items-center animate-pulse mb-[10rem]'>
        Let us know how we can improve your learning experience!
      </h1>
      <button 
        className='justify-center items-center bg-gray-500 mx-auto rounded-lg py-3 hover:bg-gray-700 transition-transform duration-200 hover:scale-110'
        type='button'
        onClick={handleExplore}
      >
        <label className='cursor-pointer px-5 text-white'>Explore</label>
      </button>
    </div>
  );
};

export default SlideThree;