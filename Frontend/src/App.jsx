import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
};

export default App;
