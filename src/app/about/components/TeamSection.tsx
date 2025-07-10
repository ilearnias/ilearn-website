// Recommended team member image resolution: 300x250px (6:5 aspect ratio, optimized for web)
// For retina screens, 600x500px is ideal.
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { teamService } from "@/services/team.service";
const TeamSection = () => {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState<{ [key: string]: boolean }>({});
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    teamService
      .getAllTeamMembers({ order: "ASC", page: 1, limit: 10 })
      .then((res) => {
        if (res.status && Array.isArray(res.data)) {
          setTeamMembers(res.data);
        } else {
          setError(res.message || "Failed to load team members");
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to load team members");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleImageError = (memberName: string) => {
    setImgError((prev) => ({ ...prev, [memberName]: true }));
  };

  return (
    <section className="team-section" aria-labelledby="team-section-title">
      <Container>
        <Fade>
          <div id="team-section-title">
            <Heading
              color="tricolor"
              text="Our Leadership Team"
              className="!text-center !font-bold !mb-4"
              animate={true}
            />
          </div>
          <p className="section-subtitle text-center mb-5">
            Meet the experts who guide aspirants towards their UPSC dreams
          </p>
        </Fade>
        {loading ? (
          <div className="text-center my-5">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 my-5">{error}</div>
        ) : (
          <Row>
            {teamMembers.map((member, index) => (
              <Col md={6} lg={3} key={member.id || index}>
                <Fade direction="up" delay={index * 100}>
                  <div
                    className="team-member-card"
                    role="article"
                    aria-labelledby={`member-name-${index}`}
                  >
                    <div className="member-image-container">
                      {!imgError[member.name] &&
                      member.image &&
                      /^https?:\/\//.test(member.image) ? (
                        <Image
                          src={member.image}
                          alt={`${member.name} - ${
                            member.designation || member.role
                          }`}
                          width={250}
                          height={250}
                          className="member-image"
                          loading="lazy"
                          onError={() => handleImageError(member.name)}
                        />
                      ) : null}
                      <div
                        className="social-links"
                        role="group"
                        aria-label={`${member.name}'s social links`}
                      >
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${member.name}'s LinkedIn profile`}
                          >
                            <FaLinkedin size={20} aria-hidden="true" />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            aria-label={`Email ${member.name}`}
                          >
                            <FaEnvelope size={20} aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="member-info">
                      <div id={`member-name-${index}`}>
                        <Heading
                          text={member.name}
                          className="!text-lg !font-semibold !leading-normal"
                          animate={false}
                        />
                      </div>
                      <div className="member-role">
                        {member.designation || member.role}
                      </div>
                      <p className="member-description">
                        {member.description || member.bio}
                      </p>
                    </div>
                  </div>
                </Fade>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default TeamSection;
