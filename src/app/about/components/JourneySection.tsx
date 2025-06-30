import Container from "@/components/common/Container";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const milestones = [
  {
    year: "2015",
    title: "Foundation of Core Values",
    description: "Established with two fundamental principles: Pursuit of Excellence in academic programs and Hospitality as a home away from home for aspirants",
    videoUrl: "" // Will be updated with actual video URL
  },
  {
    year: "2017",
    title: "Excellence in Action",
    description: "Our commitment to excellence resulted in our first batch of successful civil service officers",
    videoUrl: "" // Will be updated with actual video URL
  },
  {
    year: "2018",
    title: "Building a Supportive Community",
    description: "Strengthened our hospitality initiatives to provide emotional support and a welcoming environment for aspirants",
    videoUrl: "" // Will be updated with actual video URL
  },
  {
    year: "2019",
    title: "Academic Innovation",
    description: "Enhanced our academic programs to ensure every student can confidently pursue their civil service dreams",
    videoUrl: "" // Will be updated with actual video URL
  },
  {
    year: "2020",
    title: "Resilience Through Support",
    description: "Demonstrated our commitment to hospitality by maintaining strong student support during challenging times",
    videoUrl: "" // Will be updated with actual video URL
  },
  {
    year: "2021",
    title: "Expanding Excellence",
    description: "Broadened our academic programs while maintaining our core value of continuous improvement",
    videoUrl: "" // Will be updated with actual video URL
  },
  {
    year: "2022",
    title: "Community Growth",
    description: "Strengthened our role as a nurturing second home for civil service aspirants",
    videoUrl: "" // Will be updated with actual video URL
  },
  {
    year: "2023",
    title: "Excellence Redefined",
    description: "Set new standards in civil service preparation while maintaining our welcoming, supportive environment",
    videoUrl: "" // Will be updated with actual video URL
  },
  {
    year: "2024",
    title: "Future-Ready Support",
    description: "Evolving our support systems to meet the changing needs of tomorrow's civil servants",
    videoUrl: "" // Will be updated with actual video URL
  },
  {
    year: "2025",
    title: "Vision Forward",
    description: "Continuing our journey of excellence and hospitality in shaping India's future civil servants",
    videoUrl: "" // Will be updated with actual video URL
  }
].reverse(); // Reverse to show 2025 first

const JourneySection = () => {
  const { t } = useTranslation();
  const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentMilestoneIndex((prev) => 
      prev === 0 ? milestones.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentMilestoneIndex((prev) => 
      prev === milestones.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="journey-section py-5">
      <Container>
        <div className="text-center mb-4">
          <h2 className="section-title">
            <span className="text-primary">Our </span>
            <span className="text-danger position-relative">
              Journey
              <span className="position-absolute bottom-0 start-0 w-100" style={{ 
                height: '3px', 
                background: 'red',
                display: 'block',
                marginTop: '5px'
              }}></span>
            </span>
          </h2>
          <p className="text-muted mt-3">
            Explore the milestones that have shaped our evolution
          </p>
        </div>

        <div className="years-navigation d-flex justify-content-center flex-wrap gap-2 mb-4">
          {milestones.map((milestone, index) => (
            <button
              key={milestone.year}
              onClick={() => setCurrentMilestoneIndex(index)}
              className={`btn rounded-pill px-3 py-1 ${
                index === currentMilestoneIndex 
                  ? 'btn-primary' 
                  : 'btn-outline-secondary'
              }`}
              style={{ minWidth: '70px', fontSize: '0.9rem' }}
            >
              {milestone.year}
            </button>
          ))}
        </div>

        <div className="timeline-progress mb-4">
          <div className="position-relative" style={{ height: '2px' }}>
            <div className="w-100 bg-light"></div>
            <div 
              className="position-absolute top-0 start-0 bg-gradient" 
              style={{ 
                width: `${((milestones.length - currentMilestoneIndex) / milestones.length) * 100}%`,
                height: '100%',
                background: 'linear-gradient(to right, #dc3545, #0d6efd)'
              }}
            ></div>
            <div className="d-flex justify-content-between position-absolute w-100" style={{ top: '-10px' }}>
              <span className="small">2025</span>
              <span className="small">2015</span>
            </div>
          </div>
        </div>

        <div className="milestone-content bg-white rounded-4 shadow-sm overflow-hidden mx-auto" style={{ maxWidth: '800px' }}>
          <div className="position-relative">
            <div className="video-container" style={{ height: '400px' }}>
              {milestones[currentMilestoneIndex].videoUrl ? (
                <video 
                  controls
                  className="w-100 h-100 object-fit-cover"
                  src={milestones[currentMilestoneIndex].videoUrl}
                />
              ) : (
                <div className="d-flex align-items-center justify-content-center bg-light h-100">
                  <p>Video coming soon</p>
                </div>
              )}
            </div>
            <div className="position-absolute start-0 bottom-0 p-3 text-white" style={{ 
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              width: '100%'
            }}>
              <div className="d-flex flex-column gap-1">
                <div className="d-flex align-items-center gap-2">
                  <span className="h5 mb-0">{milestones[currentMilestoneIndex].year}</span>
                  <h3 className="h6 mb-0">{milestones[currentMilestoneIndex].title}</h3>
                </div>
                <p className="small mb-0">{milestones[currentMilestoneIndex].description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="navigation-buttons d-flex justify-content-center gap-3 mt-3">
          <button 
            className="btn btn-outline-primary px-3 py-1"
            onClick={handlePrevious}
            style={{ fontSize: '0.9rem' }}
          >
            Prev
          </button>
          <button 
            className="btn btn-primary px-3 py-1"
            onClick={handleNext}
            style={{ fontSize: '0.9rem' }}
          >
            Next
          </button>
        </div>
      </Container>
    </div>
  );
};

export default JourneySection; 