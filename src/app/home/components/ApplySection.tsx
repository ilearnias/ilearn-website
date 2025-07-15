"use client";
import React from "react";
import "./styles.scss";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { FaPhone } from "react-icons/fa6";
import { HiDownload } from "react-icons/hi";

const ApplySection = () => {
  return (
    <Container className="w-full px-4 md:px-6 ">
      <div className="apply-section w-full mx-0 bg-[#e31837] rounded-3xl relative min-h-[400px]">
        <div className="absolute top-4 right-4 bg-white text-[#e31837] px-4 py-2 rounded-full text-sm font-medium z-10">
          Free Counselling
        </div>
        <div className="flex flex-col md:flex-row h-full">
          {/* Left content */}
          <div className="w-full md:w-[60%] p-8 md:p-12">
            <div className="apply-text text-white">
              <Heading
                text={
                  <>
                    Ready to Begin Your{" "}
                    <span className="underline">Civil Service</span> Journey?
                  </>
                }
                size="2xl"
                className="!mb-4 !text-white"
                animate={true}
              />
              <p className="text-base md:text-lg mb-6">
                Join Kerala&apos;s most trusted civil service coaching institute.
                Schedule a free counseling session with our experts to discuss
                your preparation strategy.
              </p>
              <div className="cta-buttons flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  className="bg-white !text-[#e31837] !py-3 !px-6 !rounded-full !text-base hover:!bg-gray-100 transition-colors w-full sm:w-auto"
                  icon={<FaPhone size={16} />}
                >
                  Book a Counselling Call
                </Button>
                <Button
                  variant="secondary"
                  className="!bg-[#26428b] !text-white !py-3 !px-6 !rounded-full !text-base hover:!bg-[#1e3670] transition-colors w-full sm:w-auto"
                  icon={<HiDownload size={18} />}
                >
                  Download iLearn IAS App
                </Button>
              </div>
            </div>
            {/* Stats for mobile */}
            <div className="stats flex flex-row gap-3 mt-6 md:hidden">
              <div className="bg-white rounded-full px-4 py-2">
                <span className="text-sm font-medium text-[#e31837]">
                  343+ Selections
                </span>
              </div>
              <div className="bg-white rounded-full px-4 py-2">
                <span className="text-sm font-medium text-[#e31837]">
                  10+ Years Experience
                </span>
              </div>
            </div>
          </div>

          {/* Right content with image */}
          <div className="hidden md:block w-[40%] absolute right-0 top-0 h-full">
            <img 
              src="/About/team/dummy.jpg" 
              alt="Handshake" 
              className="w-full h-full object-cover rounded-r-3xl"
            />
            {/* Stats for desktop */}
            <div className="stats absolute top-12 right-8 flex flex-col gap-3">
              <div className="bg-white rounded-full px-4 py-2">
                <span className="text-sm md:text-base font-medium text-[#e31837]">
                  343+ Selections
                </span>
              </div>
              <div className="bg-white rounded-full px-4 py-2">
                <span className="text-sm md:text-base font-medium text-[#e31837]">
                  10+ Years Experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ApplySection;
