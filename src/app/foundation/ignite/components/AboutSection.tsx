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
                            iLearn IAS Ignite is a dynamic, UPSC-aligned foundation program specially designed for
                            college students. It provides structured guidance, expert mentorship, and leadership-focused
                            engagement - helping you take your first serious step toward becoming a civil servant.
                            Whether you’re just entering college or already in your final year, Ignite ensures that your
                            UPSC journey begins with clarity, confidence, and a community that supports your growth.
                        </p>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};

export default AboutSection; 