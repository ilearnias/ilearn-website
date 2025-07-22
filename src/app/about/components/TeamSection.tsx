import { useEffect, useState, useRef } from "react";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { teamService } from "@/services/team.service";
import { Card } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const TeamSection = () => {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState<{ [key: string]: boolean }>({});
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  const sliderRef = useRef<any>(null);

  const { Meta } = Card;

  // Responsive slidesToShow based on window width
  useEffect(() => {
    const calcSlidesToShow = () => {
      if (window.innerWidth < 480) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 600) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };
    calcSlidesToShow();
    window.addEventListener("resize", calcSlidesToShow);
    return () => window.removeEventListener("resize", calcSlidesToShow);
  }, []);

  // Fetch team members
  useEffect(() => {
    setLoading(true);
    setError(null);
    teamService
      .getAllTeamMembers(1, 10)
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

  const TeamName = (name: any) => <div className="_team_name_txt">{name}</div>;

  const TeamDesig = (name: any) => (
    <div className="_team_desig_txt">{name}</div>
  );

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: slidesToShow,
    initialSlide: 0,
    afterChange: (current: number) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  // For infinite slider, arrows never disable
  // Calculate total dot groups and active dot index
  const totalSlides = teamMembers.length;
  const numDots = Math.ceil(totalSlides / slidesToShow);
  const activeDotIndex = Math.floor(currentSlide / slidesToShow) % numDots;

  const slideStyle = { paddingLeft: "18px", paddingRight: "18px" };

  return (
    <section className="team-section" aria-labelledby="team-section-title">
      <Container>
        <Fade>
          <div className="_heading-box">
            <div className="_heading-box-title1">Our Leadership Team</div>
            <div className="_heading-box-sub-title1">
              Meet the experts who guide aspirants towards their UPSC dreams
            </div>
          </div>
        </Fade>

        {loading ? (
          <div className="text-center my-5">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 my-5">{error}</div>
        ) : (
          <>
            <Slider ref={sliderRef} {...sliderSettings}>
              {teamMembers.map((team, index) => (
                <div key={team.id} style={slideStyle}>
                  <Card
                    style={{ width: "95%" }}
                    cover={
                      !imgError[team.name] && team.image ? (
                        <Image
                          alt={team.name}
                          src={team.image}
                          width={300}
                          height={400}
                          onError={() => handleImageError(team.name)}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "400px",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "300px",
                            height: "400px",
                            backgroundColor: "#f0f0f0",
                          }}
                        />
                      )
                    }
                  >
                    <Meta
                      title={TeamName(team.name)}
                      description={TeamDesig(team.designation)}
                    />
                    <div className="social-links" style={{ marginTop: "10px" }}>
                      {team.linkedin && (
                        <a
                          href={team.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${team.name}'s LinkedIn profile`}
                          style={{ marginRight: "10px" }}
                        >
                          <FaLinkedin size={20} aria-hidden="true" />
                        </a>
                      )}
                      {team.email && (
                        <a
                          href={`mailto:${team.email}`}
                          aria-label={`Email ${team.name}`}
                        >
                          <FaEnvelope size={20} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </Card>
                </div>
              ))}
            </Slider>
            {teamMembers.length > 0 && (
              <>
                <style jsx>{`
                  .carousel-arrow {
                    background-color: #dc2626;
                    color: white;
                    border-radius: 50%;
                    width: 36px;
                    height: 36px;
                    border: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 24px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
                    transition: background-color 0.3s ease;
                    cursor: pointer;
                    margin: 0 8px;
                    user-select: none;
                  }
                  .carousel-arrow:hover {
                    background-color: #b91c1c;
                  }
                  .carousel-dots {
                    display: flex;
                    align-items: center;
                    list-style: none;
                    margin: 0 18px;
                    padding: 0;
                    user-select: none;
                  }
                  .carousel-dots li {
                    background: #dc2626;
                    border: 2px solid white;
                    width: 14px;
                    height: 14px;
                    margin: 0 6px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: background-color 0.3s, border-color 0.3s;
                  }
                  .carousel-dots li.active {
                    background: #dc2626;
                    border-color: #6d6d6c00;
                  }
                `}</style>

                <div
                  className="carousel-controls"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "24px",
                  }}
                >
                  <button
                    onClick={() => sliderRef.current.slickPrev()}
                    className="carousel-arrow left"
                    aria-label="Previous"
                  >
                    <IoIosArrowBack size={25} aria-hidden="true" />
                  </button>
                  <ul className="carousel-dots">
                    {Array.from({ length: numDots }).map((_, idx) => (
                      <li
                        key={idx}
                        className={idx === activeDotIndex ? "active" : ""}
                        onClick={() =>
                          sliderRef.current.slickGoTo(idx * slidesToShow)
                        }
                      />
                    ))}
                  </ul>
                  <button
                    onClick={() => sliderRef.current.slickNext()}
                    className="carousel-arrow right"
                    aria-label="Next"
                  >
                    <IoIosArrowForward size={25} aria-hidden="true" />
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default TeamSection;
