"use client";

import React from 'react';
import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import Button from '@/components/common/Button';
import { FiMail, FiPhone, FiCalendar } from 'react-icons/fi';

const ContactItem = ({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) => (
  <a 
    href={href}
    className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-gray-700 hover:text-blue-600 transition-colors"
  >
    <div className="text-blue-600 bg-blue-50 p-2 sm:p-3 rounded-lg">
      {icon}
    </div>
    <span className="text-base sm:text-lg">{text}</span>
  </a>
);

const EnrollmentSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
         
          <div className='_heading-box-title1 text-center'>Enrollment & Contact</div>
          
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-8 text-gray-700">
              <FiCalendar className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
              <p className="text-base sm:text-xl">
                New batches starting on <span className="font-semibold">July 26, 2025</span> — early registration encouraged!
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-12">
              <ContactItem 
                icon={<FiPhone className="w-5 h-5" />}
                text="75 111 00 567"
                href="tel:7511100567"
              />
              <ContactItem 
                icon={<FiMail className="w-5 h-5" />}
                text="ilearniasjunior@gmail.com"
                href="mailto:ilearniasjunior@gmail.com"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="primary"
                className="text-base sm:text-lg !font-semibold !bg-blue-600 !text-white hover:!bg-blue-700"
              >
                Apply Now
              </Button>
              <Button 
                variant="secondary"
                className="text-base sm:text-lg !font-semibold !text-blue-600 !bg-white hover:!bg-blue-50 border-2 !border-blue-600"
              >
                Speak with Our Team
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default EnrollmentSection; 