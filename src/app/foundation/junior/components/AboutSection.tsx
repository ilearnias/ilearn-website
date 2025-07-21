"use client";

import React from 'react';
import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-20 bg-gray-50">
      <Container>
        <div className="max-w-4xl mx-auto">

          <div className='_heading-box-title1 text-center'>About the Program</div>
          <motion.div
            className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              iLearn IAS Junior is a foundation-building program crafted for school students in classes 8,
              9 and 10. It introduces children to the values, concepts, and skills needed for a future in
              public service — through engaging classes, simplified UPSC concepts, and skill oriented
              activities. It&apos;s more than a class — it&apos;s a space where children grow in confidence, curiosity,
              and character.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection; 