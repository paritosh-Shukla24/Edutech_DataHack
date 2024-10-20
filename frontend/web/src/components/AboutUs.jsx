// // import React from 'react';

// // const AboutUs = () => {

// //   return (
// //     <div className='relative w-full h-screen'>
// //       <video
// //         src="/src/assets/43661-436237700.mp4"
// //         autoPlay
// //         muted
// //         loop
// //         className="absolute inset-0 w-full h-full object-cover"
// //       ></video>

// //       <div className="relative flex items-center justify-center h-full">
// //       </div>
// //     </div>
// //   );
// // };

// // export default AboutUs;

// import React, { useState, useEffect } from 'react';
// import SlideOne from './AboutUsSlides/SlideOne';
// import SlideTwo from './AboutUsSlides/SlideTwo';
// import SlideThree from './AboutUsSlides/SlideThree';

// const AboutUs = () => {
//   // Slide components array
//   const slides = [<SlideOne />, <SlideTwo />, <SlideThree />];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [autoPlay, setAutoPlay] = useState(true);

//   // Auto-scroll functionality
//   useEffect(() => {
//     if (autoPlay) {
//       const interval = setInterval(() => {
//         goToNextSlide();
//       }, 3000); // Change slides every 5 seconds
//       return () => clearInterval(interval);
//     }
//   }, [currentIndex, autoPlay]);

//   // Navigate to the next slide
//   const goToNextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
//   };

//   // Navigate to the previous slide
//   const goToPrevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? slides.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className="relative w-full h-screen">
//       {/* Video Background */}
//       <video
//         src="/src/assets/43661-436237700.mp4"
//         autoPlay
//         muted
//         loop
//         className="absolute inset-0 w-full h-full object-cover"
//       ></video>

//       {/* Slideshow Content */}
//       <div className="relative flex items-center justify-center h-full z-10">
//         {/* Slide */}
//         <div
//           className="transition-opacity duration-1000 absolute w-4/5 md:w-3/5 lg:w-2/5 h-auto bg-white p-8 rounded-lg shadow-lg"
//         >
//           {slides[currentIndex]}
//         </div>
//       </div>

//       {/* Navigation Buttons */}
//       <button
//         onClick={goToPrevSlide}
//         className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white bg-gray-500 px-4 py-2 rounded-full hover:bg-gray-700 z-20"
//       >
//         Previous
//       </button>
//       <button
//         onClick={goToNextSlide}
//         className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white bg-gray-500 px-4 py-2 rounded-full hover:bg-gray-700 z-20"
//       >
//         Next
//       </button>

//       {/* Pause/Play Button */}
//       <button
//         onClick={() => setAutoPlay(!autoPlay)}
//         className="absolute bottom-10 right-10 bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-200 z-20"
//       >
//         {autoPlay ? 'Pause' : 'Play'}
//       </button>

//       {/* Dot Indicators */}
//       <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`h-3 w-3 rounded-full ${
//               index === currentIndex ? 'bg-blue-500' : 'bg-white'
//             }`}
//             onClick={() => setCurrentIndex(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AboutUs;

import React, { useState, useEffect } from 'react';
import SlideOne from './AboutUsSlides/SlideOne';
import SlideTwo from './AboutUsSlides/SlideTwo';
import SlideThree from './AboutUsSlides/SlideThree';
import SlideFour from './AboutUsSlides/SlideFour'; // Import SlideFour

const AboutUs = () => {
  // Slide components array
  const slides = [<SlideOne />, <SlideTwo />, <SlideThree />, <SlideFour />]; // Add SlideFour to the array

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        goToNextSlide();
      }, 3000); // Change slides every 3 seconds
      return () => clearInterval(interval);
    }
  }, [currentIndex, autoPlay]);

  // Navigate to the next slide
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Navigate to the previous slide
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-screen">
      {/* Video Background */}
      <video
        src="/src/assets/43661-436237700.mp4"
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      ></video>

      {/* Slideshow Content */}
      <div className="relative flex items-center justify-center h-full z-10">
        {/* Slide */}
        <div
          className="transition-opacity duration-1000 absolute w-[50vw] h-3/5 p-8 bg-white bg-opacity-95 rounded-lg shadow-2xl"
        >
          {slides[currentIndex]}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-40 top-1/2 transform -translate-y-1/2 text-white bg-gray-500 px-4 py-2 rounded-full hover:bg-gray-700 z-20 transition-transform duration-200 hover:scale-110"
      >
        Previous
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-40 top-1/2 transform -translate-y-1/2 text-white bg-gray-500 px-4 py-2 rounded-full hover:bg-gray-700 z-20 transition-transform duration-200 hover:scale-110"
      >
        Next
      </button>

      {/* Pause/Play Button */}
      <button
        onClick={() => setAutoPlay(!autoPlay)}
        className="absolute bottom-20 right-10 bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-200 z-20"
      >
        {autoPlay ? 'Pause' : 'Play'}
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-white'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
