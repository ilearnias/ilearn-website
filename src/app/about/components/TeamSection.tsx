import { Row, Col } from "react-bootstrap";
import Container from "@/components/common/Container";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useState } from "react";

const teamMembers = [
  {
    name: "John Smith",
    role: "Founder & Director",
    image: "/About/team/dummy.jpg",
    description: "Former IAS officer with 15+ years of experience in civil services",
    linkedin: "https://linkedin.com",
    email: "director@ilearnias.com"
  },
  {
    name: "Emily Parker",
    role: "Academic Head",
    image: "/About/team/dummy.jpg",
    description: "Expert in UPSC curriculum development and strategy",
    linkedin: "https://linkedin.com",
    email: "academic@ilearnias.com"
  },
  {
    name: "Michael Chen",
    role: "Chief Mentor",
    image: "/About/team/dummy.jpg",
    description: "Specialized in General Studies and Current Affairs",
    linkedin: "https://linkedin.com",
    email: "mentor@ilearnias.com"
  },
  {
    name: "Lisa Anderson",
    role: "Research Head",
    image: "/About/team/dummy.jpg",
    description: "PhD in Public Policy and Administration",
    linkedin: "https://linkedin.com",
    email: "research@ilearnias.com"
  }
];

const TeamSection = () => {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState<{[key: string]: boolean}>({});

  const handleImageError = (memberName: string) => {
    setImgError(prev => ({...prev, [memberName]: true}));
  };

  return (
    <section className="team-section" aria-labelledby="team-section-title">
      <Container>
        <Fade>
          <h2 className="section-title" id="team-section-title">Our Leadership Team</h2>
          <p className="section-subtitle text-center mb-5">
            Meet the experts who guide aspirants towards their UPSC dreams
          </p>
        </Fade>
        <Row>
          {teamMembers.map((member, index) => (
            <Col md={6} lg={3} key={index}>
              <Fade direction="up" delay={index * 100}>
                <div className="team-member-card" role="article" aria-labelledby={`member-name-${index}`}>
                  <div className="member-image-container">
                    {!imgError[member.name] ? (
                      <Image
                        src={member.image}
                        alt={`${member.name} - ${member.role}`}
                        width={250}
                        height={250}
                        className="member-image"
                        loading="lazy"
                        onError={() => handleImageError(member.name)}
                      />
                    ) : (
                      <div className="fallback-image" aria-label={`${member.name}'s profile`}>
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <div className="social-links" role="group" aria-label={`${member.name}'s social links`}>
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`Visit ${member.name}'s LinkedIn profile`}
                      >
                        <FaLinkedin size={20} aria-hidden="true" />
                      </a>
                      <a 
                        href={`mailto:${member.email}`}
                        aria-label={`Email ${member.name}`}
                      >
                        <FaEnvelope size={20} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                  <div className="member-info">
                    <h3 className="member-name" id={`member-name-${index}`}>{member.name}</h3>
                    <div className="member-role">{member.role}</div>
                    <p className="member-description">{member.description}</p>
                  </div>
                </div>
              </Fade>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TeamSection; 