import { Col, Container, Row } from "react-bootstrap";
import "./styles.scss";
import { useRouter } from "next/navigation";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { IoIosArrowDropupCircle } from "react-icons/io";
import Image from "next/image";
import Logo from "../../app/assets/images/logo.png";
import { useTranslation } from "react-i18next";
import { TbMailFilled, TbPlayerTrackNextFilled } from "react-icons/tb";
import { FaLinkedinIn } from "react-icons/fa";
import { MdStorefront } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

import Apple from "../../app/assets/images/apple-pay.png";
import Visa from "../../app/assets/images/visa.png";
import Mastercard from "../../app/assets/images/mastercard.png";
import Mada from "../../app/assets/images/mada.png";

export default function Footer() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <>
      <div className="footer">
        <Container>
          <Row>
            <Col lg="3" sm="6" className="footer-col">
              <div className="footer-logo">
                <Image src={Logo} width={200} height={200} alt="LOGO" />
              </div>
              <div className="footer-text">{t("Connect_Networkss")}</div>
              <div
                onClick={() => router.push("/about")}
                className="footer-text footer-txt2 d-flex align-items-center gap-1 text-white mt-2"
              >
                <TbPlayerTrackNextFilled color="rgb(255, 64, 0)" />
                <div className="footer-text4">{t("Read_More")}</div>
              </div>
              <div className="mt-5 d-flex align-items-center gap-2">
                <Image src={Mada} width={40} height={50} alt="LOGO" />
                <Image src={Mastercard} width={28} height={50} alt="LOGO" />
                <Image src={Visa} width={40} height={50} alt="LOGO" />
                <Image src={Apple} width={50} height={50} alt="LOGO" />
              </div>
            </Col>
            <Col lg={1} sm={0}></Col>
            <Col>
              <Row>
                <Col lg="4" className="footer-col">
                  <div className="footer-txt1">{t("Quick Link")}</div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/about")}
                  >
                    {t("About Us")}
                  </div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/vendors")}
                  >
                    {t("Vendors")}
                  </div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/products")}
                  >
                    {t("Products")}
                  </div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/join")}
                  >
                    {t("Careers")}
                  </div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/contact")}
                  >
                    {t("Contact Us")}
                  </div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/FAQs")}
                  >
                    {t("FAQs")}
                  </div>
                </Col>
                <Col lg="4" className="footer-col">
                  <div className="footer-txt1">{t("Need_help")}</div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/return")}
                  >
                    {t("Return_Exchange")}
                  </div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/warranty")}
                  >
                    {t("Warranty")}
                  </div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/awards")}
                  >
                    {t("Awards")}
                  </div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/team")}
                  >
                    {t("OurTeam")}
                  </div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/quote")}
                  >
                    {t("requestQuote")}
                  </div>
                  <div
                    className="footer-txt2"
                    onClick={() => router.push("/shipping")}
                  >
                    {t("Shipping_Delivery")}
                  </div>
                </Col>
                <Col lg="4" className="footer-col">
                  <div className="footer-txt1">{t("Contact Us")}</div>
                  <div className="footer-icon-box">
                    <a
                      target="_blank"
                      href="https://www.facebook.com/prismnetwrks"
                    >
                      <FaFacebookF className="footer-icon" />
                    </a>
                    <a
                      target="_blank"
                      href="https://www.instagram.com/prismnetwrks/"
                    >
                      <RiInstagramFill className="footer-icon" />
                    </a>
                    <a target="_blank" href="https://x.com/prismnetwrks">

                      <FaXTwitter className="footer-icon" />
                    </a>
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/prismnetwrks/"
                    >
                      <FaLinkedinIn className="footer-icon" />
                    </a>
                  </div>

                  <div>
                    <div className="box1 mt-4">
                      <div className="mb-2">
                        <FaPhoneAlt size={20} color="#fff" />
                      </div>
                      <div className="">
                        <a href="tel:+966 9200 11 990">
                          <div className="footer-txt2">
                            +973 1750 0105 x 1555
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="box1 mt-2">
                      <div className="mb-2">
                        <TbMailFilled size={22} color="#fff" />
                      </div>
                      <div className="">
                        <a href="mailto:info@prismwll.com">
                          <div className="footer-txt2">info@prismwll.com</div>
                        </a>
                      </div>
                    </div>
                    <div className="box1 mt-2">
                      <div className="mb-2">
                        <IoLocationSharp size={22} color="#fff" />
                      </div>
                      <div className="">
                        <div className="footer-txt2"> Gudaibiya , Bahrain</div>
                      </div>
                    </div>
                  </div>
                  <div className="footer-text2 mt-1"></div>
                  <div className="footer-txt5 mt-3 mb-2">
                    {t("PRISM_stores")}
                  </div>
                  <div
                    onClick={() => router.push("/contact")}
                    className="footer-txt2 d-flex align-items-center gap-3"
                  >
                    <MdStorefront size={22} color="#fff" />
                    <div className="footer-text4">{t("See_our_stores")}</div>
                    <IoIosArrowForward size={16} color="#fff" />
                  </div>
                  <div className="footer-text3 mt-4">
                    {t("Sunday_Thursday")}
                  </div>
                  <div className="footer-text2 mt-2">
                    * {t("Working_hours")}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="footer-divider"></div>
          <Row>
            <Col lg="4">
              <div className="txt1">
                Copyright © 2024 PRISM.&nbsp; {t("Rights")}
              </div>
            </Col>
            <Col lg="4"></Col>
            <Col lg="4" sm="12" xs="12">
              <div className="footer-item2">
                <div
                  onClick={() => router.push("/privacypolicy")}
                  className="footer-txt4"
                >
                  {t("Privacy Policy")}
                </div>
                <div
                  onClick={() => router.push("/termsofservice")}
                  className="footer-txt4"
                >
                  {t("Terms of Service")}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="3"></Col>
            <Col lg="6" sm="12" xs="12">
              <div className="txt2 mt-4">{t("PRISM_Networks")}</div>
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
