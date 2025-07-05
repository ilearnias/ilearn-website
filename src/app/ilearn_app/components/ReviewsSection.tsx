import { Col, Row } from "react-bootstrap";
import ScreenshotsSection from "./ScreenshotsSection";
import Container from "@/components/common/Container";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Heading from "@/components/common/Heading";

type Review = {
  name: string;
  rating: number;
  review: string;
};

const ReviewCard = ({ review, index }: { review: Review; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  return (
    <Col md={4}>
      <motion.div
        ref={ref}
        className="review-card"
        initial={{ opacity: 0, y: 160, scale: 0.95 }}
        animate={
          inView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 160, scale: 0.95 }
        }
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
          delay: index * 0.15,
        }}
      >
        <div
          className="review-header"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <div
            className="review-avatar-wrapper"
            style={{
              paddingLeft: "10px",
              paddingRight: "16px",
              position: "relative",
              width: 60,
              height: 60,
            }}
          >
            <Image
              src="/About/team/dummy.jpg"
              alt="User Avatar"
              fill
              className="rounded-full object-cover"
              style={{
                border: "2px solid #eee",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div className="reviewer-name">{review.name}</div>
            <div className="review-rating">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>
          </div>
        </div>
        <p className="review-content">{review.review}</p>
      </motion.div>
    </Col>
  );
};

const ReviewsSection = ({ reviews }: { reviews: Review[] }) => (
  <section className="reviews-section">
    <Container>
      <Heading
        color="tricolor"
        text="User Reviews"
        className="!text-center  !font-bold !mb-8"
        animate={true}
      />
      <Row>
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} index={index} />
        ))}
      </Row>
      <div className="review-summary text-center">
        <div className="rating">4.8/5</div>
        <div className="total-reviews">(5000+ reviews)</div>
      </div>
    </Container>
  </section>
);

export default ReviewsSection;
