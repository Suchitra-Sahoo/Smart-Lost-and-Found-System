// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Signup from "./pages/Signup";
// import Signin from "./pages/Signin";

// const App = () => {
//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <div className="h-screen flex items-center justify-center">
//             <h1 className="text-gray-500 text-5xl text-center">
//               We are creating a smart lost and found system
//             </h1>
//           </div>
//         }
//       />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/signin" element={<Signin />} />
//     </Routes>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ReportPage from "./pages/ReportPage";
import FoundItemsPage from "./pages/FoundItemsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/found" element={<FoundItemsPage />} />
      </Routes>
    </Router>
  );
}
