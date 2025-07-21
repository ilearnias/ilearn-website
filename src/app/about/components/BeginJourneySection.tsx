import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { Fade } from "react-awesome-reveal";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./styles/begin-journey.scss";

const BeginJourneySection = () => {
  const router = useRouter();

  // useEffect(() => {
  //   const buttons = document.querySelectorAll(".animated-btn");

  //   const handleMouseMove = (e: MouseEvent, element: Element) => {
  //     const rect = (element as HTMLElement).getBoundingClientRect();
  //     const x = e.clientX - rect.left;
  //     const y = e.clientY - rect.top;

  //     (element as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
  //     (element as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
  //   };

  //   const mouseHandlers = new Map<Element, (e: Event) => void>();

  //   const addMouseHandler = (element: Element) => {
  //     const handler = (e: Event) => handleMouseMove(e as MouseEvent, element);
  //     mouseHandlers.set(element, handler);
  //     element.addEventListener("mousemove", handler);
  //   };

  //   buttons.forEach(addMouseHandler);

  //   return () => {
  //     mouseHandlers.forEach((handler, element) => {
  //       element.removeEventListener("mousemove", handler);
  //     });
  //   };
  // }, []);

  return (
    <section className="begin-journey-section" aria-labelledby="journey-title">
      <Container>
        <div className="text-center">
          <Fade cascade damping={0.2}>
            <Fade direction="up" duration={1000}>
              <div className="_heading-box">
                <div className="_heading-box-title1">
                  Ready to Begin Your UPSC Journey With Us?
                </div>
                <div className="_heading-box-sub-title1">
                  Join the thousands of students who have transformed their
                  dream of becoming a civil servant into reality with iLearn IAS
                  Academy&apos;s guidance.
                </div>
              </div>
            </Fade>

            <div className="_button_box">
              <button
                onClick={() => router.push("/programs")}
                className="_button_box_btn1"
              >
                <span>Explore Programs &nbsp;</span>
                <i className="fas fa-arrow-right"></i>
              </button>

              <button
                onClick={() => router.push("/contact")}
                className="_button_box_btn2"
              >
                <span>Contact Us &nbsp;</span>
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
