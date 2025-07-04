import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { useTranslation } from "react-i18next";
import EmblaCarousel from "./carousel/Journey/EmblaCarousel";
import "./carousel/Journey/embla-journey.scss";

const JourneySection = () => {
  const { t } = useTranslation();

  return (
    <section className="journey-section py-5" aria-labelledby="journey-section-title">
      <Container>
        <div className="text-center ">
          <div id="journey-section-title">
            <Heading 
              text={<>
                <span className="text-primary">Our </span>
                <span className="text-danger position-relative">
                  Journey
                  <span className="position-absolute bottom-0 start-0 w-100 journey-underline"></span>
                </span>
              </>}
              className="!text-center !mb-4"
              animate={true}
            />
          </div>
          <p className="text-muted ">
            Explore the milestones that have shaped our evolution
          </p>
        </div>

        <EmblaCarousel options={{ loop: true }} />
      </Container>
    </section>
  );
};

export default JourneySection; 