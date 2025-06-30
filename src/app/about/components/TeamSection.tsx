import { Row, Col } from "react-bootstrap";
import Container from "@/components/common/Container";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

const teamMembers = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Founder & Director",
    image: "/team/director.jpg",
    description: "Former IAS officer with 15+ years of experience in civil services",
    linkedin: "https://linkedin.com",
    email: "director@ilearnias.com"
  },
  {
    name: "Prof. Sarah Thomas",
    role: "Academic Head",
    image: "/team/academic-head.jpg",
    description: "Expert in UPSC curriculum development and strategy",
    linkedin: "https://linkedin.com",
    email: "academic@ilearnias.com"
  },
  {
    name: "Mr. Arun Menon",
    role: "Chief Mentor",
    image: "/team/mentor.jpg",
    description: "Specialized in General Studies and Current Affairs",
    linkedin: "https://linkedin.com",
    email: "mentor@ilearnias.com"
  },
  {
    name: "Dr. Priya Singh",
    role: "Research Head",
    image: "/team/research-head.jpg",
    description: "PhD in Public Policy and Administration",
    linkedin: "https://linkedin.com",
    email: "research@ilearnias.com"
  }
];

const TeamSection = () => {
  const { t } = useTranslation();

  return (
    <div className="team-section">
      <Container>
        <Fade>
          <h2 className="section-title">Our Leadership Team</h2>
          <p className="section-subtitle text-center mb-5">
            Meet the experts who guide aspirants towards their UPSC dreams
          </p>
        </Fade>
        <Row>
          {teamMembers.map((member, index) => (
            <Col md={6} lg={3} key={index}>
              <Fade direction="up" delay={index * 100}>
                <div className="team-member-card">
                  <div className="member-image-container">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={250}
                      height={250}
                      className="member-image"
                    />
                    <div className="social-links">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={20} />
                      </a>
                      <a href={`mailto:${member.email}`}>
                        <FaEnvelope size={20} />
                      </a>
                    </div>
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <div className="member-role">{member.role}</div>
                    <p className="member-description">{member.description}</p>
                  </div>
                </div>
              </Fade>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default TeamSection; 