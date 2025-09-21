// import React from "react";

// function SignupLeft({ images, currentImage }) {
//   return (
//     <div className="hidden md:flex flex-col items-center justify-center 
//         bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 text-gray-800 p-8 md:p-12 -3xl shadow-xl relative"
//     >
//       <div className="w-80 md:w-96 h-80 md:h-96 relative backdrop-blur-md rounded-2xl flex items-center justify-center">
//         {images.map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             alt={`Signup Illustration ${index + 1}`}
//             className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000 ${
//               index === currentImage ? "opacity-100" : "opacity-0"
//             }`}
//           />
//         ))}
//       </div>

//       <h2 className="text-4xl md:text-5xl font-extrabold mt-8 md:mt-10 tracking-tight text-center text-orange-600 drop-shadow-lg">
//         Join Us Today
//       </h2>

//       <p className="mt-4 text-center max-w-sm leading-relaxed text-base md:text-lg text-gray-700">
//         Create your <span className="font-semibold text-orange-600">CampusFind</span>{" "}
//         account and become a part of our community.
//       </p>
//     </div>
//   );
// }

// export default SignupLeft;

import React from "react";

function SignupLeft({ images, currentImage }) {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 text-gray-800 p-10 relative">
      {/* Image carousel */}
      <div className="w-80 md:w-96 h-80 md:h-96 relative backdrop-blur-md rounded-3xl overflow-hidden shadow-xl">
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

      {/* Heading */}
      <h2 className="text-5xl font-extrabold mt-10 tracking-tight text-center text-orange-600 drop-shadow-lg">
        Join Us Today
      </h2>

      {/* Paragraph */}
      <p className="mt-6 text-center max-w-sm leading-relaxed text-lg text-gray-700">
        Create your{" "}
        <span className="font-semibold text-orange-600">CampusFind</span> account
        and become a part of our vibrant community.
      </p>
    </div>
  );
}

export default SignupLeft;

