// src/components/EducationGame.js
import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

const EducationGame = () => {
  const [showQuiz, setShowQuiz] = useState(false);  // Show or hide quiz
  const [question, setQuestion] = useState(null);   // Store question data
  const [score, setScore] = useState(0);            // Track score
  const [feedback, setFeedback] = useState("");     // Feedback for the answer
  const [stars, setStars] = useState(0);            // Star rating for correct answers
  const [timer, setTimer] = useState(60);           // Timer set to 60 seconds
  const [badge, setBadge] = useState("");           // Badge earned after quiz
  
  // Sample quiz questions
  const quizData = [
    { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2"], answer: "H2O" },
    { question: "What planet is known as the Red Planet?", options: ["Mars", "Venus", "Earth"], answer: "Mars" },
    { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide"], answer: "Carbon Dioxide" },
  ];

  const cubeRef = useRef();

  // Timer logic
  useEffect(() => {
    let interval;
    if (showQuiz && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    if (timer === 0) {
      setShowQuiz(false);  // Hide quiz when time runs out
      setFeedback("Time's up!");
    }
    return () => clearInterval(interval);
  }, [showQuiz, timer]);

  // Function to handle cube click (to trigger quiz)
  const handleCubeClick = () => {
    setShowQuiz(true);
    setQuestion(quizData[Math.floor(Math.random() * quizData.length)]);  // Pick random question
    setTimer(60);  // Reset timer to 1 minute
  };

  // Handle answer submission
  const handleAnswer = (option) => {
    if (option === question.answer) {
      setScore(score + 1);
      setStars(stars < 5 ? stars + 1 : 5);  // Increment stars up to 5
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect!");
    }

    // Assign badge based on score after quiz completion
    if (stars >= 5) {
      setBadge("Gold Badge");
    } else if (stars >= 3) {
      setBadge("Silver Badge");
    } else {
      setBadge("Bronze Badge");
    }

    // Hide quiz after a delay
    setTimeout(() => {
      setShowQuiz(false);
      setFeedback("");
    }, 2000);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Cube object (clickable) */}
        <mesh
          ref={cubeRef}
          position={[0, 0, 0]}
          onClick={handleCubeClick}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>

        {/* Quiz question rendered as HTML overlay (flashcard style) */}
        {showQuiz && question && (
          <Html center>
            <div style={{ padding: "20px", background: "white", borderRadius: "8px", perspective: "1000px" }}>
              <div style={{
                width: "200px",
                height: "150px",
                transformStyle: "preserve-3d",
                transition: "transform 0.8s",
                transform: feedback ? "rotateY(180deg)" : "rotateY(0deg)"
              }}>
                {/* Front of the flashcard (question) */}
                <div style={{ backfaceVisibility: "hidden", position: "absolute", width: "100%", height: "100%" }}>
                  <h3>{question.question}</h3>
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      style={{ display: "block", margin: "10px" }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {/* Back of the flashcard (feedback) */}
                <div style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  padding: "10px",
                  backgroundColor: feedback === "Correct!" ? "lightgreen" : "lightcoral"
                }}>
                  <p>{feedback}</p>
                </div>
              </div>
            </div>
          </Html>
        )}

        {/* OrbitControls allow user to rotate the scene */}
        <OrbitControls />
      </Canvas>

      {/* Timer */}
      <div style={{ position: "absolute", top: "10px", right: "10px", color: "white", fontSize: "20px" }}>
        Time Left: {timer}s
      </div>

      {/* Display Stars */}
      <div style={{ position: "absolute", top: "50px", right: "10px", color: "white", fontSize: "20px" }}>
        Stars: {"★".repeat(stars)}{"☆".repeat(5 - stars)}
      </div>

      {/* Display Score */}
      <div style={{ position: "absolute", top: "10px", left: "10px", color: "white", fontSize: "20px" }}>
        Score: {score}
      </div>

      {/* Display Badge */}
      {badge && (
        <div style={{ position: "absolute", bottom: "10px", left: "10px", color: "gold", fontSize: "20px" }}>
          Badge Earned: {badge}
        </div>
      )}
    </div>
  );
};

export default EducationGame;
