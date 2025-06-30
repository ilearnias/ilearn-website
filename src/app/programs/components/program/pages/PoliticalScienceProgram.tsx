"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProgramHero from "../ProgramHero";

export default function PoliticalScienceProgram() {
  return (
    <div className="program-page">
      <Header />
      <ProgramHero
        title="Political Science & International Relations"
        shortName="PSIR"
        description="Expert coaching for Political Science & IR optional covering Indian politics, comparative politics, international relations, and public administration."
        duration="6 months"
        bgColor="#f0f0f8"
      />
      {/* Additional sections will be added here based on the details you provide */}
      <Footer />
    </div>
  );
} 