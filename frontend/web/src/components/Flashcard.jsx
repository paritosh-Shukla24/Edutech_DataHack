
// import React, { useState } from 'react';
// import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import ReactCardFlip from 'react-card-flip';
// import axios from 'axios';

// const blockyTextStyle = {
//   fontFamily: "Nasalization",
//   textShadow: "2.25px 2.25px 0px rgba(0, 0, 0, 0.3)",
// };

// const Flashcard = () => {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [quizData, setQuizData] = useState(null); // Store the quiz data from the API
//   const [fileUploaded, setFileUploaded] = useState(false);
//   const [file, setFile] = useState(null);
//   const [fileSelected, setFileSelected] = useState(false); // For managing the selected file
//   const [selectedAnswer, setSelectedAnswer] = useState(null); // To track selected answer
//   const [isCorrect, setIsCorrect] = useState(null); // To track if the answer is correct or not
//   const [answerSelectedTime, setAnswerSelectedTime] = useState(null); // To track when answer was selected
//   const [nextClickedTime, setNextClickedTime] = useState(null); // To track when next button was clicked
//   const [attemptTime, setAttemptTime] = useState(null); // Store the attempt duration

//   // Handle card flip
//   const handleCardFlip = () => {
//     if (quizData !== null) {
//       setIsFlipped(!isFlipped);
//     }
//   };

//   // Handle navigation (next question)
//   const handleNext = async () => {
//     // Track when next button is clicked
//     const nextClickTime = new Date();
//     setNextClickedTime(nextClickTime);

//     // Calculate attempt duration
//     if (answerSelectedTime) {
//       const duration = (nextClickTime - answerSelectedTime) / 1000; // Time in seconds
//       setAttemptTime(duration);
//       console.log(`Time taken to attempt the question: ${duration} seconds`);
//     }

//     try {
//       const response = await axios.post('http://localhost:8000/next_questions/', {
//         type: localStorage.getItem('fileExtension') // Or other file types, depending on your logic
//       });

//       const newQuestionData = response.data;
//       console.log(newQuestionData.link);
//       if (newQuestionData && newQuestionData.question && newQuestionData.options && newQuestionData.answer) {
//         setQuizData(newQuestionData); // Update quiz data with new question
//         setIsFlipped(false); // Reset flip state
//         setCurrentIndex(currentIndex + 1); // Move to the next question index
//         setSelectedAnswer(null); // Reset selected answer for new question
//         setIsCorrect(null); // Reset correctness
//         setAnswerSelectedTime(null); // Reset the answer selected time for the new question
//         setNextClickedTime(null); // Reset next clicked time for the new question
//       }
//     } catch (error) {
//       console.error('Failed to fetch the next question:', error);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   // Handle file selection
//   const handleFileSelect = (e) => {
//     const uploadedFile = e.target.files[0]; // Get the uploaded file
//     if (uploadedFile) {
//       setFile(uploadedFile);
//       setFileSelected(true); // Enable the Upload button

//       // Extract and store file extension in local storage
//       const fileExtension = uploadedFile.name.split('.').pop();
//       localStorage.setItem('fileExtension', fileExtension);

//       console.log(`File extension stored: ${fileExtension}`); // Optional: Log to check
//     }
//   };

//   // Handle file upload
//   const handleFileUpload = async () => {
//     if (file) {
//       const formData = new FormData();
//       formData.append('file', file);

//       try {
//         const response = await axios.post('http://localhost:8000/upload/', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         // Handle the response depending on the file type
//         const data = response.data;
//         console.log(data.link);
//         if (data.question && data.options && data.answer) {
//           setQuizData(data); // Store quiz data
//         } else {
//           alert('Invalid file type or data.');
//         }

//         setFileUploaded(true); // File has been uploaded
//       } catch (error) {
//         console.error('File upload failed:', error);
//       }
//     }
//   };

//   // Handle answer selection
//   const handleOptionSelect = (option) => {
//     setSelectedAnswer(option);

//     // Track the time when the answer is selected
//     const selectTime = new Date();
//     setAnswerSelectedTime(selectTime);

//     if (option === quizData.answer) {
//       setIsCorrect(true); // Correct answer
//     } else {
//       setIsCorrect(false); // Incorrect answer
//     }
//   };

//   // Set card color based on answer correctness
//   const cardColor = () => {
//     if (selectedAnswer) {
//       return isCorrect ? 'bg-green-500' : 'bg-red-500';
//     }
//     return 'bg-blue-500'; // Default card color
//   };

//   return (
//     <div className="h-screen flex relative"
//       style={blockyTextStyle}
//     >
//       <video src="/src/assets/152204-802330889.mp4"
//         autoPlay
//         loop
//         muted
//         className='fixed inset-0 w-full h-full object-cover -z-50'
//       />

//       <div className="w-full flex flex-col justify-center items-center">
//         {!fileUploaded ? (
//           <div className="bg-white bg-opacity-30 p-10 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold mb-20 text-center text-white">
//               Upload a File to Proceed
//             </h2>
//             <input
//               type="file"
//               onChange={handleFileSelect}
//               className="text-sm mb-5 text-black border flex rounded-sm cursor-pointer focus:outline-none"
//             />
//             <button
//               onClick={handleFileUpload}
//               disabled={!fileSelected} // Disable if no file selected
//               className={`mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg ${!fileSelected ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
//             >
//               Upload
//             </button>
//           </div>
//         ) : (
//           <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
//             {/* Front (Question) */}
//             <motion.div
//               className={`relative w-full h-96 ${cardColor()} text-white flex flex-col justify-center items-center rounded-lg shadow-xl transition-transform duration-700 ease-in-out cursor-pointer p-4`}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleCardFlip}
//             >
//               <h2 className="text-2xl font-bold mb-4 text-center">{quizData.question}</h2>

//               <div className="mt-6 grid grid-cols-1 gap-3 px-4 w-full">
//                 {quizData.options.map((option, index) => (
//                   <motion.div
//                     key={index}
//                     className={`p-3 rounded-lg cursor-pointer text-black bg-gray-100 ${selectedAnswer === option ? 'border-2 border-blue-500' : ''}`}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => handleOptionSelect(option)}
//                   >
//                     {option}
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Back (Answer) */}
//             <motion.div
//               className="relative w-full h-96 bg-green-500 text-white flex flex-col justify-center items-center rounded-lg shadow-xl cursor-pointer p-4"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleCardFlip}
//             >
//               <h2 className="text-2xl font-bold mb-4">Solution</h2>
//               <p className="text-lg overflow-y-auto">Correct answer: {quizData.answer}</p>
//               <p className="mt-4 text-sm">{quizData.solution}</p>

//               {/* Conditionally render the link if available */}
//               {quizData.link && (
//                 <div className="mt-4 flex flex-col items-center">
//                   <p className="text-sm mb-2">Related Link:</p>
//                   <div className="bg-white text-black p-2 rounded-lg cursor-pointer">
//                     <a
//                       href={quizData.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 underline"
//                     >
//                       {quizData.link}
//                     </a>
//                   </div>
//                   {/* Copy button */}
//                   <button
//                     onClick={() => navigator.clipboard.writeText(quizData.link)}
//                     className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
//                   >
//                     Copy Link
//                   </button>
//                 </div>
//               )}
//             </motion.div>
//           </ReactCardFlip>
//         )}

//         {/* Navigation buttons (only show if file is uploaded) */}
//         {fileUploaded && (
//           <div className="flex justify-between items-center mt-6">
//             <button
//               onClick={handlePrevious}
//               disabled={currentIndex === 0}
//               className="bg-gray-300 p-3 rounded-full hover:bg-gray-400 transition-transform duration-200 ease-in-out disabled:opacity-50"
//             >
//               <FaArrowLeft />
//             </button>

//             <span className="text-white text-lg">
//               {currentIndex + 1} / {quizData.options.length}
//             </span>

//             <button
//               onClick={handleNext}
//               disabled={currentIndex === quizData.options.length - 1}
//               className="bg-gray-300 p-3 rounded-full hover:bg-gray-400 transition-transform duration-200 ease-in-out disabled:opacity-50"
//             >
//               <FaArrowRight />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Flashcard;
import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ReactCardFlip from 'react-card-flip';
import axios from 'axios';

const blockyTextStyle = {
  fontFamily: "Nasalization",
  textShadow: "2.25px 2.25px 0px rgba(0, 0, 0, 0.3)",
};

const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizData, setQuizData] = useState(null); // Store the quiz data from the API
  const [fileUploaded, setFileUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false); // For managing the selected file
  const [selectedAnswer, setSelectedAnswer] = useState(null); // To track selected answer
  const [isCorrect, setIsCorrect] = useState(null); // To track if the answer is correct or not
  const [answerSelectedTime, setAnswerSelectedTime] = useState(null); // To track when answer was selected
  const [attemptTime, setAttemptTime] = useState(null); // Store the attempt duration
  const [startTime, setStartTime] = useState(null); // To track when the question was loaded
  const [difficulty, setDifficulty] = useState('medium'); // Set default difficulty

  // Assume we have the user's Gmail stored in localStorage or prompt the user to enter it
  const [gmail, setGmail] = useState(localStorage.getItem('gmail') || '');

  // Handle card flip
  const handleCardFlip = () => {
    if (quizData !== null) {
      setIsFlipped(!isFlipped);
    }
  };

  // Handle navigation (next question)
  const handleNext = async () => {
    // Calculate attempt duration
    if (answerSelectedTime && startTime) {
      var duration = (answerSelectedTime - startTime) / 1000; // Time in seconds
      setAttemptTime(duration);
      console.log(`Time taken to attempt the question: ${duration} seconds`);
    }

    // Send data to backend to update Gmail score
    if (gmail) {
      try {
        const response = await axios.post('http://localhost:8000/update_gmail_score/', {
          gmail: gmail,
          result: isCorrect,
          difficulty: difficulty,
          response_time: duration,
        });
        console.log(response);
      } catch (error) {
        console.error('Error response data:', error.response.data);
      }
    }
    

    // Fetch the next question
    try {
      const response = await axios.post('http://localhost:8000/next_questions/', {
        type: localStorage.getItem('fileExtension'), // Or other file types, depending on your logic
      });

      const newQuestionData = response.data;
      console.log(newQuestionData.link);
      if (newQuestionData && newQuestionData.question && newQuestionData.options && newQuestionData.answer) {
        setQuizData(newQuestionData); // Update quiz data with new question
        setIsFlipped(false); // Reset flip state
        setCurrentIndex(currentIndex + 1); // Move to the next question index
        setSelectedAnswer(null); // Reset selected answer for new question
        setIsCorrect(null); // Reset correctness
        setAnswerSelectedTime(null); // Reset the answer selected time for the new question
        setAttemptTime(null); // Reset attempt time
        setStartTime(new Date()); // Set the start time for the new question
      }
    } catch (error) {
      console.error('Failed to fetch the next question:', error);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const uploadedFile = e.target.files[0]; // Get the uploaded file
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileSelected(true); // Enable the Upload button

      // Extract and store file extension in local storage
      const fileExtension = uploadedFile.name.split('.').pop();
      localStorage.setItem('fileExtension', fileExtension);

      console.log(`File extension stored: ${fileExtension}`); // Optional: Log to check
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:8000/upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle the response depending on the file type
        const data = response.data;
        console.log(data.link);
        if (data.question && data.options && data.answer) {
          setQuizData(data); // Store quiz data
          setStartTime(new Date()); // Set the start time when the first question is loaded
        } else {
          alert('Invalid file type or data.');
        }

        setFileUploaded(true); // File has been uploaded
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }
  };

  // Handle answer selection
  const handleOptionSelect = (option) => {
    setSelectedAnswer(option);

    // Track the time when the answer is selected
    const selectTime = new Date();
    setAnswerSelectedTime(selectTime);

    if (option === quizData.answer) {
      setIsCorrect(true); // Correct answer
    } else {
      setIsCorrect(false); // Incorrect answer
    }
  };

  // Set card color based on answer correctness
  const cardColor = () => {
    if (selectedAnswer) {
      return isCorrect ? 'bg-green-500' : 'bg-red-500';
    }
    return 'bg-blue-500'; // Default card color
  };

  // Prompt user for Gmail if not already set
  useEffect(() => {
    if (!gmail) {
      const userGmail = prompt('Please enter your Gmail:');
      if (userGmail) {
        setGmail(userGmail);
        localStorage.setItem('gmail', userGmail);
      }
    }
  }, [gmail]);

  return (
    <div className="h-screen flex relative"
      style={blockyTextStyle}
    >
      <video src="/src/assets/152204-802330889.mp4"
        autoPlay
        loop
        muted
        className='fixed inset-0 w-full h-full object-cover -z-50'
      />

      <div className="w-full flex flex-col justify-center items-center">
        {!fileUploaded ? (
          <div className="bg-white bg-opacity-30 p-10 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-20 text-center text-white">
              Upload a File to Proceed
            </h2>
            <input
              type="file"
              onChange={handleFileSelect}
              className="text-sm mb-5 text-black border flex rounded-sm cursor-pointer focus:outline-none"
            />
            <button
              onClick={handleFileUpload}
              disabled={!fileSelected} // Disable if no file selected
              className={`mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg ${!fileSelected ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            >
              Upload
            </button>
          </div>
        ) : (
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            {/* Front (Question) */}
            <motion.div
              className={`relative w-full h-96 ${cardColor()} text-white flex flex-col justify-center items-center rounded-lg shadow-xl transition-transform duration-700 ease-in-out cursor-pointer p-4`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCardFlip}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">{quizData.question}</h2>

              <div className="mt-6 grid grid-cols-1 gap-3 px-4 w-full">
                {quizData.options.map((option, index) => (
                  <motion.div
                    key={index}
                    className={`p-3 rounded-lg cursor-pointer text-black bg-gray-100 ${selectedAnswer === option ? 'border-2 border-blue-500' : ''}`}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Back (Answer) */}
            <motion.div
              className="relative w-full h-96 bg-green-500 text-white flex flex-col justify-center items-center rounded-lg shadow-xl cursor-pointer p-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCardFlip}
            >
              <h2 className="text-2xl font-bold mb-4">Solution</h2>
              <p className="text-lg overflow-y-auto">Correct answer: {quizData.answer}</p>
              <p className="mt-4 text-sm">{quizData.solution}</p>

              {/* Conditionally render the link if available */}
              {quizData.link && (
                <div className="mt-4 flex flex-col items-center">
                  <p className="text-sm mb-2">Related Link:</p>
                  <div className="bg-white text-black p-2 rounded-lg cursor-pointer">
                    <a
                      href={quizData.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {quizData.link}
                    </a>
                  </div>
                  {/* Copy button */}
                  <button
                    onClick={() => navigator.clipboard.writeText(quizData.link)}
                    className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    Copy Link
                  </button>
                </div>
              )}
            </motion.div>
          </ReactCardFlip>
        )}

        {/* Navigation buttons (only show if file is uploaded) */}
        {fileUploaded && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="bg-gray-300 p-3 rounded-full hover:bg-gray-400 transition-transform duration-200 ease-in-out disabled:opacity-50"
            >
              <FaArrowLeft />
            </button>

            <span className="text-white text-lg">
              {currentIndex + 1}
            </span>

            <button
              onClick={handleNext}
              // Disabled if answer not selected
              disabled={selectedAnswer === null}
              className={`bg-gray-300 p-3 rounded-full hover:bg-gray-400 transition-transform duration-200 ease-in-out ${selectedAnswer === null ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcard;


