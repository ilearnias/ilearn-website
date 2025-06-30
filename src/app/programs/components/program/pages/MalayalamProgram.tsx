"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProgramHero from "../ProgramHero";

export default function MalayalamProgram() {
  return (
    <div className="program-page">
      <Header />
      <ProgramHero
        title="Malayalam Literature Optional"
        description="Specialized coaching for Malayalam literature optional covering classical and modern literature, poetry, drama, and literary criticism."
        duration="6 months"
        bgColor="#f0f2f8"
      />
      {/* Additional sections will be added here based on the details you provide */}
      <Footer />
    </div>
  );
} 