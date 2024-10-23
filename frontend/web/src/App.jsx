import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import Flashcard from "./components/Flashcard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoadMap from "./components/RoadMap";
import ResourceLibrary from "./components/ResoureLibrary";
import PR from "./components/PR";
import Dashboard from "./components/Dashboard";
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
          <Route path="/road-map" element={<RoadMap />} />
          <Route path="/resources" element={<ResourceLibrary />} />
          <Route path="/profile" element={<PR />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}