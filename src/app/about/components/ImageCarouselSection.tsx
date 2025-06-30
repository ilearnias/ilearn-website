import Container from "@/components/common/Container";
import { Fade } from "react-awesome-reveal";
import { Carousel } from "react-bootstrap";
import Image from "next/image";

const academyImages = [
  {
    src: "/academy/campus1.jpg",
    alt: "iLearn IAS Academy Main Building",
    caption: "Our Modern Campus"
  },
  {
    src: "/academy/library.jpg",
    alt: "iLearn IAS Academy Library",
    caption: "Well-Equipped Library"
  },
  {
    src: "/academy/classroom.jpg",
    alt: "iLearn IAS Academy Classroom",
    caption: "Smart Classrooms"
  },
  {
    src: "/academy/studyroom.jpg",
    alt: "iLearn IAS Academy Study Room",
    caption: "Dedicated Study Areas"
  },
  {
    src: "/academy/computerlab.jpg",
    alt: "iLearn IAS Academy Computer Lab",
    caption: "Modern Computer Lab"
  }
];

const ImageCarouselSection = () => {
  return (
    <div className="image-carousel-section">
      <Container>
        <Fade>
          <h2 className="section-title">Our Academy</h2>
          <p className="section-subtitle text-center mb-5">
            Take a virtual tour of our state-of-the-art facilities
          </p>
        </Fade>
        <Fade>
          <div className="carousel-container">
            <Carousel 
              interval={3000} 
              fade={true}
              indicators={true}
              controls={true}
            >
              {academyImages.map((image, index) => (
                <Carousel.Item key={index}>
                  <div className="carousel-image-container">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1200}
                      height={600}
                      className="carousel-image"
                    />
                    <Carousel.Caption>
                      <h3>{image.caption}</h3>
                    </Carousel.Caption>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </Fade>
      </Container>
    </div>
  );
};

export default ImageCarouselSection; 