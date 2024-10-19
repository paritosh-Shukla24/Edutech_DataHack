import React, { useState } from "react";
import User from '/backend/models/user.js';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First, try to register the user
      const resRegister = await axios.post('http://localhost:5001/api/auth/register', { email, password });
  
      if (resRegister.data.token) {
        console.log('Registered and logged in successfully:', resRegister.data.token);
        localStorage.setItem('token', resRegister.data.token);
      } else {
        console.error('Registration failed.');
      }
  
    } catch (err) {
      // If registration fails, assume the user exists and proceed to login
      if (err.response?.status === 400) {  // Assuming 400 means the user already exists
        try {
          const resLogin = await axios.post('http://localhost:5001/api/auth/login', { email, password });
          if (resLogin.data.token) {
            console.log('Logged in successfully:', resLogin.data.token);
            localStorage.setItem('token', resLogin.data.token);
          }
        } catch (loginErr) {
          console.error('Login failed:', loginErr.response?.data?.msg || loginErr.message);
        }
      } else {
        // If it's a different error, log it
        console.error('Error:', err.response?.data?.msg || err.message);
      }
    }
  };    

  const blockyTextStyle = {
    fontFamily: "Nasalization",
    textShadow: "2.25px 2.25px 0px rgba(0, 0, 0, 0.3)",
  };

  return (
    <div className="w-full h-screen relative" style={blockyTextStyle}>
      <video autoPlay muted loop className="fixed inset-0 w-full h-full object-cover brightness-50">
        <source src="/src/assets/18327-291012897.mp4" type="video/mp4" />
      </video>
      <div className="flex justify-center items-center h-screen relative">
        <div className="flex w-auto shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gray-500 bg-opacity-65 px-28 py-10">
            <h1 className="text-white text-2xl font-bold mb-2">Welcome back</h1>
            <p className="text-gray-300 mb-8 animate-pulse">It's great to have you back!</p>

            <form onSubmit={handleSubmit}>
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
                  onSubmit={handleSubmit}
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
