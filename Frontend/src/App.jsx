import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="h-screen flex items-center justify-center">
            <h1 className="text-gray-500 text-5xl text-center">
              We are creating a smart lost and found system
            </h1>
          </div>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
};

export default App;
