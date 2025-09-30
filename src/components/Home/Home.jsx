import React, { useEffect } from "react";
import Style from "./Home.module.css";
import HeroSection from "../HeroSection/HeroSection";
import Features from "../Features/Features";
import HowItWorks from "../HowItworks/HowItworks";
import ContactUs from "../ContactUs/ContactUs";
import { useVoice } from "../../Context/AllContext";
import pageDescriptions from "../../utils/voiceTexts";
import { useLocation } from "react-router-dom";

export default function Home() {
  const { speakResponse } = useVoice();

  const location = useLocation();

  useEffect(() => {
    const description = pageDescriptions[location.pathname];
    if (description) {
      speakResponse(description);
    }
  }, [location.pathname, speakResponse]);

  return (
    <main>
      <HeroSection />
      <Features />
      <HowItWorks />
      <ContactUs />
    </main>
  );
}