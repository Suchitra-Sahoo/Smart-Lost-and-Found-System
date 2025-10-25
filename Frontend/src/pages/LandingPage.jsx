import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { Hero } from '../components/landing-page/Hero'
import { Stats } from '../components/landing-page/Stats'

function LandingPage() {
  return (
    <>
    <Navbar />
    <Hero />
    <Stats />
    <Footer />
    </>
  )
}

export default LandingPage