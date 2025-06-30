"use client";

import { Col, Row } from "react-bootstrap";
import Container from "@/components/common/Container";
import "./styles.scss";
import { useRouter } from "next/navigation";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { IoIosArrowDropupCircle } from "react-icons/io";
import Image from "next/image";
import Logo from "../../../public/new-logo.png";
import { useTranslation } from "react-i18next";
import { TbMailFilled, TbPlayerTrackNextFilled } from "react-icons/tb";
import { FaLinkedinIn } from "react-icons/fa";
import { MdStorefront } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

import Apple from "../../app/assets/images/apple-pay.png";
import Visa from "../../app/assets/images/visa.png";
import Mastercard from "../../app/assets/images/mastercard.png";
import Mada from "../../app/assets/images/mada.png";

export default function Footer() {
  const router = useRouter();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading state
  }

  return (
    <>
      <div className="footer">
        <Container>
          <Row>
            <Col lg="3" sm="6" className="footer-col">
              <div className="footer-logo">
                <Image src={Logo} width={200} height={200} alt="iLearn IAS Logo" />
              </div>
              <div className="footer-text">Kerala's most successful Civil Services Training Academy —delivering the state's highest success rate through results-driven Prelims-cum-Mains & classroom programs.</div>
              <div
                onClick={() => router.push("/about")}
                className="footer-text footer-txt2 d-flex align-items-center gap-1 text-white mt-2"
              >
                <TbPlayerTrackNextFilled color="rgb(255, 64, 0)" />
                <div className="footer-text4">{t("Read_More")}</div>
              </div>
            </Col>
            <Col lg={1} sm={0}></Col>
            <Col>
              <Row>
                <Col lg="4" className="footer-col">
                  <div className="footer-txt1">Quick Links</div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/home")}
                  >
                    Home
                  </div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/about")}
                  >
                    About
                  </div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/result")}
                  >
                    Results
                  </div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/programs")}
                  >
                    Programs
                  </div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/blog")}
                  >
                    Blog
                  </div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/ilearn-app")}
                  >
                    iLearn App
                  </div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/gallery")}
                  >
                    Gallery
                  </div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/contact")}
                  >
                    Contact Us
                  </div>
                </Col>
                <Col lg="4" className="footer-col">
                  <div className="footer-txt1">Our Programs</div>
                  <div className="footer-txt2">
                    Prelims-cum-Mains Program (PCM)
                  </div>
                  <div className="footer-txt2">
                    Integrated Prelims Test Series (iPTS)
                  </div>
                  <div className="footer-txt2">
                    Mains Test Series & Answer Writing (MTS/MAP)
                  </div>
                  <div className="footer-txt2">
                    Interview Guidance Program (iGP)
                  </div>
                  <div className="footer-txt2">
                    Current Affairs & News Analysis (CANA)
                  </div>
                  <div className="footer-txt2">
                    Restart Program
                  </div>
                  <div className="footer-txt2">
                    Geography Optional
                  </div>
                  <div className="footer-txt2">
                    Political Science & IR Optional
                  </div>
                  <div className="footer-txt2">
                    Sociology Optional
                  </div>
                  <div className="footer-txt2">
                    Malayalam Optional
                  </div>
                </Col>
                <Col lg="4" className="footer-col">
                  <div className="footer-txt1">Contact Us</div>
                  <div className="footer-icon-box">
                    <a
                      target="_blank"
                      href="#"
                    >
                      <FaFacebookF className="footer-icon" />
                    </a>
                    <a
                      target="_blank"
                      href="#"
                    >
                      <RiInstagramFill className="footer-icon" />
                    </a>
                    <a target="_blank" href="#">
                      <FaXTwitter className="footer-icon" />
                    </a>
                  </div>

                  <div>
                    <div className="box1 mt-4">
                      <div className="mb-2">
                        <FaPhoneAlt size={20} color="#fff" />
                      </div>
                      <div >
                        <a href="tel:8089166792">
                          <div className="footer-txt2">
                            8089166792
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="box1 mt-2">
                      <div className="mb-2">
                        <TbMailFilled size={22} color="#fff" />
                      </div>
                      <div className="">
                        <a href="mailto:ilearnoffc@gmail.com">
                          <div className="footer-txt2">ilearnoffc@gmail.com</div>
                        </a>
                      </div>
                    </div>
                    <div className="box1 mt-2">
                      <div className="mb-2">
                        <IoLocationSharp size={22} color="#fff" />
                      </div>
                      <div className="">
                        <div className="footer-txt2">iLearn IAS Academy, Minchin Road, Chakka, Thiruvananthapuram, Kerala 695011</div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="footer-divider"></div>
          <Row>
            <Col lg="4">
              <div className="txt1">
                Copyright © 2024 iLearn IAS Academy. All Rights Reserved.
              </div>
            </Col>
            <Col lg="4"></Col>
            <Col lg="4" sm="12" xs="12">
              <div className="footer-item2">
                <div
                  onClick={() => router.push("/privacypolicy")}
                  className="footer-txt4"
                >
                  Privacy Policy
                </div>
                <div
                  onClick={() => router.push("/termsofservice")}
                  className="footer-txt4"
                >
                  Terms of Service
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="3"></Col>
            <Col lg="6" sm="12" xs="12">
              <div className="txt2 mt-4">Kerala's most successful Civil Services Training Academy</div>
            </Col>
            <Col lg="3">
              <div className="scroll-btn mt-3">
                <IoIosArrowDropupCircle
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }
                  className="footer-icon"
                  size={40}
                  color="#ff4000"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

