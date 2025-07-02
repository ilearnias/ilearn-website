import Container from "@/components/common/Container";
import { Fade } from "react-awesome-reveal";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./styles/begin-journey.scss";

const BeginJourneySection = () => {
  const router = useRouter();

  useEffect(() => {
    const buttons = document.querySelectorAll('.animated-btn');

    const handleMouseMove = (e: MouseEvent, element: Element) => {
      const rect = (element as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      (element as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (element as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    };

    const mouseHandlers = new Map<Element, (e: Event) => void>();

    const addMouseHandler = (element: Element) => {
      const handler = (e: Event) => handleMouseMove(e as MouseEvent, element);
      mouseHandlers.set(element, handler);
      element.addEventListener('mousemove', handler);
    };

    buttons.forEach(addMouseHandler);

    return () => {
      mouseHandlers.forEach((handler, element) => {
        element.removeEventListener('mousemove', handler);
      });
    };
  }, []);

  return (
    <section className="begin-journey-section" aria-labelledby="journey-title">
      <Container>
        <div className="text-center">
          <Fade cascade damping={0.2}>
            <h1 className="main-title" id="journey-title">
              Ready to Begin Your <span className="text-red">UPSC Journey</span> With Us?
            </h1>
            <p className="description">
              Join the thousands of students who have transformed their dream of
              becoming a civil servant into reality with iLearn IAS Academy&apos;s guidance.
            </p>
            <div className="button-group" role="group" aria-label="Journey actions">
              <button 
                className="animated-btn primary-btn"
                onClick={() => router.push("/programs")}
                aria-label="Explore our programs"
              >
                <span>Explore Programs</span>
                <i className="fas fa-arrow-right"></i>
              </button>
              <button 
                className="animated-btn secondary-btn"
                onClick={() => router.push("/contact")}
                aria-label="Contact our team"
              >
                <span>Contact Us</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </Fade>
        </div>
      </Container>
    </section>
  );
};

export default BeginJourneySection; 