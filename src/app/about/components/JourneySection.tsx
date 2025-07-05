import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { useTranslation } from "react-i18next";
import EmblaCarousel from "./carousel/Journey/EmblaCarousel";
import "./carousel/Journey/embla-journey.scss";

const JourneySection = () => {
  const { t } = useTranslation();

  return (
    <section
      className="journey-section py-5"
      aria-labelledby="journey-section-title"
    >
      <Container>
        <div className="text-center ">
          <div id="journey-section-title">
            <Heading
              color="tricolor"
              text={
                <>
                  <span>Our Journey</span>
                  <span className=" position-relative"></span>
                </>
              }
              className="!text-center !mb-4 font-bold"
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
