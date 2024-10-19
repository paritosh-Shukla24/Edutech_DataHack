import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const blockyTextStyle = {
    fontFamily: "Nasalization",
    textShadow: "2.25px 2.25px 0px rgba(0, 0, 0, 0.3)",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();  // Create form data
    formData.append('username', email);  // FastAPI expects `username`
    formData.append('password', password);  // FastAPI expects `password`
    
    try {
      const response = await axios.post("http://localhost:8000/login", formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',  // Set content type
        },
      });
      
      const token = response.data.access_token;
      // Store the JWT token in localStorage for further requests
      localStorage.setItem("token", token);

      // Fetch user data and check if they exist
      const userResponse = await axios.get("http://localhost:8000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (userResponse.data) {
        // Redirect to the flashcards page if the user exists
        navigate("/flashcard");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If the user is not found, redirect to the register page
        navigate("/register");
      } else {
        console.error("An error occurred during login:", error);
      }
    }
  };

  return (
    <div className="w-full h-screen relative" style={blockyTextStyle}>
      <video
        autoPlay
        muted
        loop
        className="fixed inset-0 w-full h-full object-cover brightness-50"
      >
        <source src="/src/assets/18327-291012897.mp4" type="video/mp4" />
      </video>
      <div className="flex justify-center items-center h-screen relative">
        <div className="flex w-auto shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gray-500 bg-opacity-65 px-28 py-10">
            <h1 className="text-white text-2xl font-bold mb-2">Welcome back</h1>
            <p className="text-gray-300 mb-8 animate-pulse">It's great to have you back!</p>

            <form onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="mb-4">
                <label className="block text-gray-300 text-md mb-2 italic">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg text-sm transition-transform duration-200 hover:scale-105"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label className="block text-gray-300 text-md mb-2 italic">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg text-sm transition-transform duration-200 hover:scale-105"
                  placeholder="Enter your password"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-center mb-6">
                <button
                  type="submit"
                  className="border border-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none transition-transform duration-200 hover:scale-110"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
