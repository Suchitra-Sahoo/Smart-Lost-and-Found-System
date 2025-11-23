import React from "react";
import '../signin/SigninLeft.css'

function LeftSection({ images, currentImage }) {
  return (
    <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
      {/* Blob background */}
      <div className="container absolute inset-0" />
    </div>
  );
}

export default LeftSection;
