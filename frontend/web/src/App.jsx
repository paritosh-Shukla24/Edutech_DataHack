import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />}/>
          <Route path="/" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}