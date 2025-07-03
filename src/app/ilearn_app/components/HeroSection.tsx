import { Col, Row } from "react-bootstrap";
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useLoading } from '@/components/common/LoadingProvider';
import Container from "@/components/common/Container";

const HeroSection = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { isLoading } = useLoading();
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (isLoading) return;
    const card = cardRef.current;
    if (!card) return;
    const onScroll = () => {
      if (!card || triggeredRef.current) return;
      const rect = card.getBoundingClientRect();
      if (rect.bottom <= window.innerHeight && rect.top > 0) {
        card.classList.add('visible');
        triggeredRef.current = true;
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isLoading]);

  return (
    <section className="hero-section app-landing-container">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <div className="app-content">
              <h1>Learn Anytime, Anywhere</h1>
              <p>Download the iLearn IAS app and start your UPSC preparation journey today.</p>
              <div className="app-store-buttons">
                <a href="#" className="store-button google-play">
                  <span className="store-icon"><FaGooglePlay /></span>
                  <span className="button-text">
                    <span>GET IT ON</span>
                    <strong>Google Play</strong>
                  </span>
                </a>
                <a href="#" className="store-button app-store">
                  <span className="store-icon"><FaApple /></span>
                  <span className="button-text">
                    <span>Download on the</span>
                    <strong>App Store</strong>
                  </span>
                </a>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="hero-image">
              <div className="app-image-card animate-on-scroll" ref={cardRef}>
                <Image src="/ilearn/appcard.png" alt="iLearn App Screenshot" width={400} height={400} className="app-image-hover" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection; 