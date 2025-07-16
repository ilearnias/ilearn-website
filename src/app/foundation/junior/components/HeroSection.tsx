"use client";

import React from 'react';
import '../../../styles.scss'
import { Fade } from 'react-awesome-reveal';
import TextLabel from '@/components/common/TextLabel';

const JuniorHeroSection = () => {



  return (
    // <HeroSection className='border-2 border-red-500 '
    //   title="iLearn IAS Junior"
    //   titleClassName="font-bold "
    //   description="A Flagship IAS Skill Development Program for School Students"
    //   buttons={buttons}
    // />

    <div className="_banner-box1 ">
      <Fade direction="up" duration={900}>
        <div className="_banner-header-txt1 pt-10">
          {/* <span style={{ color: "#dc2626" }}>About</span> Us */}
          iLearn IAS Junior
        </div>
      </Fade>

      <Fade direction="up" duration={1000}>
        <div className="_banner-sub-header-txt1">
          {`A Flagship IAS Skill Development Program for School Students`}
        </div>
      </Fade>
      {/* the other component starts here  */}
      <div className="flex flex-col items-center gap-3 pt-3">

        <div className="text-center pt-2 ">
          <p className="text-gray-700 font-medium">OPEN FOR STUDENTS IN CLASSES</p>
          <p className="text-blue-900 font-medium ">8, 9 & 10</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center  w-full">
          <button className="w-full  bg-blue-600 text-white sm:px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-base  font-semibold">
            <TextLabel color="white" text="Enroll Now" />
          </button>

        </div>
      </div>
    </div>
  );
};

export default JuniorHeroSection; 