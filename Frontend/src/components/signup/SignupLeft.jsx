import React from "react";

function SignupLeft({ images, currentImage }) {
  return (
    <div
      className="hidden md:flex md:w-1/2 flex-col items-center justify-center 
        bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-gray-100 p-8 md:p-12 shadow-xl relative"
    >
      {/* Direct image carousel without box */}
      <div className="w-80 md:w-96 h-80 md:h-96 relative flex items-center justify-center">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Signup Illustration ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <h2 className="text-4xl md:text-5xl font-extrabold mt-8 md:mt-10 tracking-tight text-center text-orange-500 drop-shadow-lg">
        Join Us Today
      </h2>

      <p className="mt-4 text-center max-w-sm leading-relaxed text-base md:text-lg text-gray-400">
        Create your{" "}
        <span className="font-semibold text-orange-400">CampusFind</span>{" "}
        account and start your journey with us.
      </p>
    </div>
  );
}

export default SignupLeft;
