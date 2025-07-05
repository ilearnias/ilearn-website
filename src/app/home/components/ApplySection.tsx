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
      <div className="apply-section w-full mx-0 border-2 border-green-200 p-4 md:p-8">
        <div className="apply-content flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="apply-text w-full md:w-2/3">
            <Heading
              text={
                <>
                  Ready to Begin Your{" "}
                  <span className="underline">Civil Service</span> Journey?
                </>
              }
              className="!text-2xl md:!text-3xl lg:!text-4xl !mb-4"
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
                className="bg-white !text-[#e31837] border-none font-medium !py-3 !px-6 !rounded-full !text-base whitespace-nowrap w-full sm:w-auto"
                icon={<FaPhone size={16} />}
              >
                Book Counselling
              </Button>
              <Button
                variant="secondary"
                className="!bg-white/10 !text-white border !border-white/20 font-medium !py-3 !px-6 !rounded-full !text-base whitespace-nowrap w-full sm:w-auto"
                icon={<HiDownload size={18} />}
              >
                Download App
              </Button>
            </div>
          </div>
          <div className="stats w-full md:w-1/3 flex flex-row md:flex-col justify-center gap-4 md:gap-6">
            <div className="stat-item text-center md:text-left">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                343+ Selections
              </span>
            </div>
            <div className="stat-item text-center md:text-left">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                10+ Years Experience
              </span>
            </div>
          </div>
        </div>
        <div className="  free-counselling-tag absolute top-4 right-4 md:top-8 md:right-8 bg-green-500 md:block hidden px-4 py-2 rounded-full text-sm md:text-base">
          Free Counselling
        </div>
      </div>
    </Container>
  );
};

export default ApplySection;
