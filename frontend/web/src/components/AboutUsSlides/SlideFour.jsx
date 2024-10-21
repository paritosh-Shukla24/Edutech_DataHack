import React from 'react';
import { useNavigate } from 'react-router-dom';

const SlideFour = () => {
  const navigate = useNavigate();
  const blockyTextStyle = {
    fontFamily: "Nasalization",
  };

  const handleCodeEditor = () => {
    navigate('/profile');  // Navigate to the CodeEditor component
  };

  return (
    <div className='flex flex-col' style={blockyTextStyle}>
      <h1 className='text-5xl justify-start items-center mb-8'>Personalized Recommendation</h1>
      <h1 className='text-xl justify-start items-center animate-pulse mb-[26vh]'>
        With real-time feedback!
      </h1>
      <button 
        className='justify-center items-center bg-gray-500 mx-auto rounded-lg py-3 hover:bg-gray-700 transition-transform duration-200 hover:scale-110'
        type='button'
        onClick={handleCodeEditor}
      >
        <label className='cursor-pointer px-5 text-white'>Start Coding</label>
      </button>
    </div>
  );
};

export default SlideFour;
