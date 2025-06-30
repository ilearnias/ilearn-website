import Container from "@/components/common/Container";
import { Fade } from "react-awesome-reveal";
import { useRouter } from "next/navigation";

const BeginJourneySection = () => {
  const router = useRouter();

  return (
    <div className="begin-journey-section">
      <Container>
        <div className="text-center">
          <Fade cascade damping={0.2}>
            <h1 className="main-title">
              Ready to Begin Your <span className="text-red">UPSC Journey</span> With Us?
            </h1>
            <p className="description">
              Join the thousands of students who have transformed their dream of<br />
              becoming a civil servant into reality with iLearn IAS Academy's guidance.
            </p>
            <div className="button-group">
              <button 
                className="primary-btn"
                onClick={() => router.push("/programs")}
              >
                Explore Programs
              </button>
              <button 
                className="secondary-btn"
                onClick={() => router.push("/contact")}
              >
                Contact Us
              </button>
            </div>
          </Fade>
        </div>
      </Container>
    </div>
  );
};

export default BeginJourneySection; 