import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ReactCardFlip from 'react-card-flip';
import axios from 'axios';

const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizData, setQuizData] = useState(null); // Store the quiz data from the API
  const [fileUploaded, setFileUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false); // For managing the selected file

  // Handle card flip
  const handleCardFlip = () => {
    if (quizData !== null) {
      setIsFlipped(!isFlipped);
    }
  };

  // Handle navigation (next question)
  const handleNext = async () => {
    try {
      const response = await axios.post('http://localhost:8000/next_questions/', {
        type: localStorage.getItem('fileExtension') // Or other file types, depending on your logic
      
      });

      const newQuestionData = response.data;
      
      if (newQuestionData && newQuestionData.question && newQuestionData.options && newQuestionData.answer) {
        setQuizData(newQuestionData); // Update quiz data with new question
        setIsFlipped(false); // Reset flip state
        setCurrentIndex(currentIndex + 1); // Move to the next question index
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

        if (data.question && data.options && data.answer) {
          setQuizData(data); // Store quiz data
        } else {
          alert('Invalid file type or data.');
        }

        setFileUploaded(true); // File has been uploaded
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 flex justify-center items-center">
      <div className="w-full max-w-lg mx-auto">
        {!fileUploaded ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
              Upload a File to Proceed
            </h2>
            <input
              type="file"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
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
              className="relative w-full h-96 bg-blue-500 text-white flex flex-col justify-center items-center rounded-lg shadow-xl transition-transform duration-700 ease-in-out cursor-pointer p-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCardFlip}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">{quizData.question}</h2>

              <div className="mt-6 grid grid-cols-1 gap-3 px-4 w-full">
                {quizData.options.map((option, index) => (
                  <motion.div
                    key={index}
                    className="p-3 rounded-lg cursor-pointer text-black bg-gray-100"
                    whileTap={{ scale: 0.95 }}
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
              {currentIndex + 1} / {quizData.options.length}
            </span>

            <button
              onClick={handleNext}
              disabled={currentIndex === quizData.options.length - 1}
              className="bg-gray-300 p-3 rounded-full hover:bg-gray-400 transition-transform duration-200 ease-in-out disabled:opacity-50"
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
