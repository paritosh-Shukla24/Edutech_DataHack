import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import Flashcard from "./components/Flashcard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EducationGame from "./components/EducationGame";

export default function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />}/>
          <Route path="/" element={<AboutUs />} />
          <Route path="/flashcards" element={<Flashcard />} />
          <Route path="/education-game" element={<EducationGame />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}