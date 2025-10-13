import React, { useState, useEffect } from "react";
import signup from "../assets/signup/signup.jpg";
import signup1 from "../assets/signup/signup1.jpg";
import signup2 from "../assets/signup/signup2.jpg";
import SignupLeft from "../components/signup/SignupLeft";
import SignupForm from "../components/signup/SignupForm";

function Signup() {
  const images = [signup, signup1, signup2];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 h-screen">
        <SignupLeft images={images} currentImage={currentImage} />
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 relative">
        {/* subtle pattern */}
        <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/memphis-mini.png')] opacity-10"></div>
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;

