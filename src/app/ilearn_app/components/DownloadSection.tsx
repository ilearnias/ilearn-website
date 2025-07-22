import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const DownloadSection = () => (
  <section className="download-section app-landing-container" id="download">
    <Container>
      <Heading
        color="tricolor"
        text="Download the App Today"
        className=" text-center md:leading-[0.5] leading-[1.1] font-bold !mb-3"
      ></Heading>
      <p className="section-subtitle text-center">
        Take your IAS learning preparation to the next level with our
        comprehensive mobile learning platform.
      </p>
      <div className="app-store-buttons">
        <a href="#" className="store-button google-play">
          <span className="store-icon">
            <FaGooglePlay />
          </span>
          <span className="button-text">
            <span>GET IT ON</span>
            <strong>Google Play</strong>
          </span>
        </a>
        <a href="#" className="store-button app-store">
          <span className="store-icon">
            <FaApple />
          </span>
          <span className="button-text">
            <span>Download on the</span>
            <strong>App Store</strong>
          </span>
        </a>
      </div>
      <div className="download-count text-center">
        <span>50,000+ downloads</span>
      </div>
    </Container>
  </section>
);

export default DownloadSection;
