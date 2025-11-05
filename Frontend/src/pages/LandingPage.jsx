import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import HeroSection from "../components/Landing-page/HeroSection";
import About from "../components/Landing-page/About";
import Contact from "../components/Landing-page/Contact";

function LandingPage() {
  return (
    <>
      <Navbar />
      {/* <div className="h-[500px] "></div> */}
      <HeroSection />
      <About />
      {/* <Footer /> */}
      <Contact />
    </>
  );
}

export default LandingPage;
