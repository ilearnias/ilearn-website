"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/common/HeroSection";
import { 
  FiUser, FiUsers, FiCheckCircle, FiClock,
  FiFileText, FiMessageSquare, FiAward, FiStar
} from "react-icons/fi";
import Image from 'next/image';

// Expert Faculty Section
interface FacultyMemberProps {
  name: string;
  qualification: string;
  description: string;
  gender: 'male' | 'female';
}

const FacultyMember: React.FC<FacultyMemberProps> = ({ name, qualification, description, gender }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
    <div className="mb-4">
      <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${gender === 'male' ? 'bg-blue-100' : 'bg-red-100'}`}>
        <FiUser className={`w-6 h-6 ${gender === 'male' ? 'text-blue-500' : 'text-red-500'}`} />
      </div>
    </div>
    <h3 className="text-lg font-semibold mb-2">{name}</h3>
    <p className="text-sm text-gray-500 mb-2">{qualification}</p>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const ExpertFaculty = () => {
  const faculty = [
    {
      name: "Nikhil Lohitakshan",
      qualification: "UPSC AIR 622 - History Optional",
      description: "Expert in Indian history and comprehensive geography coverage",
      gender: "male"
    },
    {
      name: "Rahul Raghavan",
      qualification: "UPSC AIR 825 - Public Administration",
      description: "Expert in public administration and selective test prep",
      gender: "male"
    },
    {
      name: "Vineeth Lohitakshan",
      qualification: "UPSC AIR 891 - Geography & Environment",
      description: "Expert in geography and environmental studies",
      gender: "male"
    },
    {
      name: "Ashil Shukoor",
      qualification: "UPSC AIR 522 - International Relations",
      description: "Expert in international relations and global affairs",
      gender: "male"
    },
    {
      name: "Aditya Narayan H",
      qualification: "UPSC AIR 350 - Society",
      description: "Specialist in social issues and contemporary studies",
      gender: "male"
    },
    {
      name: "Dr. Jayesh Khaddar",
      qualification: "Essay Writing Specialist",
      description: "Expert in essay writing, editing and text improvement",
      gender: "male"
    }
  ] as const;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Expert Faculty & UPSC Toppers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {faculty.map((member, index) => (
            <FacultyMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Program Highlights Section
interface HighlightProps {
  icon: React.ReactNode;
  text: string;
}

const Highlight: React.FC<HighlightProps> = ({ icon, text }) => (
  <div className="flex items-center gap-4 mb-4">
    <div className="text-red-500">
      {icon}
    </div>
    <p className="text-gray-700">{text}</p>
  </div>
);

const ProgramHighlights = () => {
  const highlights = [
    {
      icon: <FiFileText className="w-6 h-6" />,
      text: "Regular tests on GS and optional papers"
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      text: "Detailed evaluation"
    },
    {
      icon: <FiMessageSquare className="w-6 h-6" />,
      text: "Personalized feedback"
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      text: "Answer writing techniques"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Program Highlights</h2>
        <div className="max-w-2xl">
          {highlights.map((highlight, index) => (
            <Highlight key={index} {...highlight} />
          ))}
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Program Details</h3>
          <div className="flex items-center gap-2 text-gray-700">
            <FiClock className="w-5 h-5" />
            <span>Duration: 4 months</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
interface TestimonialProps {
  name: string;
  qualification: string;
  text: string;
  image: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, qualification, text, image }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center gap-4 mb-4">
      <Image src={image} alt={name} className="w-12 h-12 rounded-full object-cover" width={48} height={48} />
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-500">{qualification}</p>
      </div>
    </div>
    <p className="text-gray-600 italic">{text}</p>
  </div>
);

const StudentTestimonials = () => {
  const testimonials = [
    {
      name: "Rahul Raghavan",
      qualification: "UPSC AIR 825",
      text: "Having cleared mains 3 times with 2 selections in AIR 1 rank bracket, the MMP's systematic and focused approach focuses on systematically answer writing skills that are essential for success.",
      image: "/images/testimonials/rahul.jpg"
    },
    {
      name: "Vineeth Lohitakshan",
      qualification: "UPSC AIR 891",
      text: "MMP's comprehensive coverage of governance and social issues helped me immensely. The program's approach gave me the edge I needed. The faculty guidance was exceptional throughout.",
      image: "/images/testimonials/vineeth.jpg"
    },
    {
      name: "Aditya Narayan H",
      qualification: "UPSC AIR 350",
      text: "The answer paper preparation in MMP was thorough and well-structured. The personalized feedback system and immediate feedback helped me understand the nuances of mains writing.",
      image: "/images/testimonials/aditya.jpg"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">What Our Students Say about Mains Mastery Program (MMP)</h2>
        <p className="text-center text-gray-600 mb-12">Authentic success stories from our MMP alumni</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
interface FAQProps {
  question: string;
  answer: string;
}

const FAQ: React.FC<FAQProps> = ({ question, answer }) => (
  <div className="border-b border-gray-200 py-4">
    <button className="flex justify-between items-center w-full text-left">
      <span className="font-semibold text-gray-800">{question}</span>
      <FiStar className="w-5 h-5 text-gray-400" />
    </button>
    <p className="mt-2 text-gray-600">{answer}</p>
  </div>
);

const FAQSection = () => {
  const faqs = [
    {
      question: "How many tests are included?",
      answer: "The program includes regular tests covering both GS and optional papers, with detailed evaluation and personalized feedback."
    }
    // Add more FAQs as needed
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQ key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default function MMProgram() {
  const buttons = (
    <div className="flex justify-center gap-4">
      <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
        Join Mains Mastery
      </button>
      <button className="bg-white text-gray-800 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors">
        Learn More
      </button>
    </div>
  );

  return (
    <div className="program-page">
      <Header />
      <HeroSection
        title="Mains Mastery Program"
        description="Master UPSC Mains with our comprehensive program"
        buttons={buttons}
      />
      <ExpertFaculty />
      <ProgramHighlights />
      <StudentTestimonials />
      <FAQSection />
      <Footer />
    </div>
  );
} 