import React from "react";

function SigninLeft({ images, currentImage }) {
  return (
    <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center 
        bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 text-gray-800 p-8 md:p-12 -3xl shadow-xl relative"
    >
      <div className="w-96 md:w-[28rem] h-96 md:h-[28rem] relative backdrop-blur-md rounded-2xl flex items-center justify-center">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Signin Illustration ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <h2 className="text-4xl md:text-5xl font-extrabold mt-8 md:mt-10 tracking-tight text-center text-orange-600 drop-shadow-lg">
        Welcome Back
      </h2>

      <p className="mt-4 text-center max-w-sm leading-relaxed text-base md:text-lg text-gray-700">
        Sign in to your{" "}
        <span className="font-semibold text-orange-600">Smart Lost & Found</span>{" "}
        account and continue your journey with us.
      </p>
    </div>
  );
}

export default SigninLeft;
