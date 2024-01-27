import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import SignUP from "./pages/SignUP";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
