// src/pages/HomePage.jsx
import React from 'react'
import Slider from '../component/Slider'
import PaiementCard from '../component/PaiementCard'
import Services from '../component/Services'
import Footer from '../component/Footer'
import GetStarted from '../component/getStarted'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Your carousel/slider */}
      <header><Slider /></header>

      {/* 2. Payment card */}
      <section className="mt-8 px-4 mx-auto max-w-4xl">
        <GetStarted />
        <h2 className="text-center text-2xl font-bold mb-4">Nos Services</h2>
        <Services />
      </section>


      {/* 4. Spacer */}
      <div className="flex-grow" />

      {/* 5. Footer */}
      <Footer />
    </div>

  )
}
