"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProgramHero from "../ProgramHero";

export default function FoundationProgram() {
  return (
    <div className="program-page">
      <Header />
      <ProgramHero
        title="Foundation Course for Civil Services"
        description="Comprehensive foundation program for beginners starting their civil services preparation journey with structured learning approach."
        duration="8 months"
        bgColor="#f0f8f8"
      />
      {/* Additional sections will be added here based on the details you provide */}
      <Footer />
    </div>
  );
} 