"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Form, Input, message } from "antd";
import emailjs from "emailjs-com";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { AiOutlineSend } from "react-icons/ai";
import { GoLocation, GoMail } from "react-icons/go";
import { PiBuildingOffice, PiChatsTeardrop } from "react-icons/pi";
import { SlCallOut } from "react-icons/sl";
import Riyadh from "../assets/branch/Riyadh.png";
import "./styles.scss";

const PageContainer = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const onSubmit = async (values: any) => {
    try {
      const templateParams = {
        first: values.first_name,
        last: values.last_name,
        email: values.email,
        number: values.number,
        message: values.message,
      };

      const userId = "KPuAPCkmf6RmM2ctp";
      const serviceId = "service_a7srfw9";
      const templateId = "template_tuav5jt";

      await emailjs.send(serviceId, templateId, templateParams, userId);
      message.success("Form submitted successfully!");
    } catch (error) {
      console.log(error);
      message.error("Form submission failed.");
    }
  };
  return (
    <>
      <Header />
      <div className="contact-Container">
        <div className="contact-box1">
          <Container>
            <Fade>
              <div className="contact-text1">{t("Get In Touch")}</div>
            </Fade>
            <Fade direction="up" delay={0}>
              <div className="contact-text2">{t("Tell_us_what")}</div>
            </Fade>
            <br />
            <br />
            <Row>
              <Col md={2} xs={12}></Col>
              <Col md={2} xs={6}>
                <Fade direction="up" delay={100}>
                  <div className="contact-box4">
                    <div className="contact-box5">
                      <SlCallOut />
                    </div>
                    <div className="contact-text6">{t("Call Us")}</div>
                    <div style={{ marginLeft: 2 }}>{t("Sun_Thu_8am_6Pm")}</div>
                    <a href="tel:+973 1750 0105 ">
                      <div className="contact-box6">
                        {t("contactUs-HeaderBox1Txt3")}
                      </div>
                    </a>
                  </div>
                </Fade>
              </Col>

              <Col md={2} xs={6}>
                <Fade direction="up" delay={500}>
                  <div className="contact-box4">
                    <div className="contact-box5">
                      <GoMail />
                    </div>
                    <div className="contact-text6">{t("Send_Mail")}</div>
                    <div style={{ marginLeft: 2 }}>{t("Any_Time")}</div>
                    <a href="mailto:info@prismwll.com">
                      <div className="contact-box6">{t("Send_Mail")}</div>
                    </a>
                  </div>
                </Fade>
              </Col>

              <Col md={2} xs={6}>
                <Fade direction="up" delay={600}>
                  <div className="contact-box4">
                    <div className="contact-box5">
                      <GoLocation />
                    </div>
                    <div className="contact-text6">{t("Vist_Us")}</div>
                    <div style={{ marginLeft: 2 }}>
                      {t("Visit_out_Office_HQ")}
                    </div>
                    <a
                      href="https://maps.app.goo.gl/jN7SJpkbhjA6v8Lh9"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="contact-box6">{t("Get_Direction")}</div>
                    </a>
                  </div>
                </Fade>
              </Col>

              <Col md={2} xs={6}>
                <Fade direction="up" delay={700}>
                  <div className="contact-box4">
                    <div className="contact-box5">
                      <PiChatsTeardrop />
                    </div>
                    <div className="contact-text6">{t("Chat_Support")}</div>
                    <div style={{ marginLeft: 2 }}>
                      {t("Where_here_to_help")}
                    </div>
                    <div className="contact-box6">{t("Chat_Now")}</div>
                  </div>
                </Fade>
              </Col>
              <Col md={2} xs={12}></Col>
            </Row>
          </Container>
        </div>
        <a
          href="https://maps.app.goo.gl/wQrKZtJcZp8e1Jvc9"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="contact-box2">
            <Container>
              <Row>
                <Col md={3} xs={12}>
                  <Fade direction="up">
                    <div className="contact-text3">{t("Showroom")}</div>
                    <br />
                    <div className="contact-row contact-box10">
                      <div>
                        <PiBuildingOffice size={30} />
                      </div>
                      <div>
                        <div className="contact-text9">Gudaibiya, Manama</div>
                        Shop 707A, Building No 374,
                        <br />
                        Road 820 Block No 308
                        <br />
                        +973 1750 0105
                        <br />
                        <a href="mailto:sales@prismwll.com">
                          sales@prismwll.com
                        </a>
                      </div>
                    </div>
                  </Fade>
                </Col>
                <Col md={8} xs={12}></Col>
              </Row>
            </Container>
          </div>
        </a>
        <div className="contact-box7">
          <Container>
            <div className="contact-text3" style={{ textAlign: "center" }}>
              {t("Warehouses")}
            </div>
            <br />
            <Row>
              <Col md={4} sm={6} xs={12}></Col>
              <Col md={4} sm={6} xs={12}>
                <Fade direction="up" delay={100}>
                  <div className="contact-box10">
                    <div className="contact-box9">
                      <div>
                        <PiBuildingOffice size={30} />
                      </div>
                      <div className="contact-box3">
                        <div>
                          <div className="contact-text9">
                            {" "}
                            {t("HeadquarterssubTxt1")}
                          </div>
                          {t("Istanbul_Street_Sulai")}
                          <br />
                          {t("HeadquarterssubTxt2")}
                          <br />
                          {t("HeadquarterssubTxt3")}
                          <br />
                          +973 1750 0105 x 1570
                          <br />
                          <a href="warehouse@prismwll.com">
                            warehouse@prismwll.com
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* <a
                      href="https://maps.app.goo.gl/n1v44AcVsBMnhmxx6"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={Riyadh}
                        width={0}
                        height={150}
                        alt="Behind Gulf Commercial Center"
                        className="contact-img"
                      />
                    </a> */}
                  </div>
                </Fade>
              </Col>
              <Col md={4} sm={6} xs={12}></Col>
            </Row>
            <br /> <br /> <br />
            <div className="contact-text3" style={{ textAlign: "center" }}>
              {t("Headquarters")}
            </div>
            <br />
            <Row>
              <Col md={4} xs={12}></Col>
              <Col md={4} sm={6} xs={12}>
                <Fade direction="up" delay={100}>
                  <div className="contact-box10">
                    <div className="contact-box9">
                      <div>
                        <GoLocation color="#000" size={30} />
                      </div>
                      <div>
                        <strong style={{ fontSize: 22 }}>
                          {t("HeadquarterssubTxt1")}
                        </strong>
                        <br />
                        {t("HeadquarterssubTxt2")}
                        <br />
                        {t("HeadquarterssubTxt3")}
                        <br />
                        +973 1750 0105 x 1555
                        <br />
                        <a href="info@prismwll.com">info@prismwll.com</a>
                      </div>
                    </div>
                  </div>
                </Fade>
              </Col>

              <Col md={4} xs={12}></Col>
            </Row>
            <br /> <br /> <br />
            <Row>
              <Col md={3} xs={12}></Col>
              <Col md={6} xs={12}>
                <div className="contact-text3" style={{ textAlign: "center" }}>
                  {t("Let_Chat_Reach_Out")}
                </div>
                <div className="contact-box3" style={{ textAlign: "center" }}>
                  {t("Got_questions")}
                </div>
                <br />
                <Form onFinish={onSubmit} form={form}>
                  <Fade direction="up" delay={100}>
                    <Row>
                      <Col sm={6} xs={12}>
                        <Form.Item name={"first_name"}>
                          <Input
                            size="large"
                            placeholder={t("First_Name")}
                            style={{ borderRadius: 4, padding: 10 }}
                          />
                        </Form.Item>
                      </Col>
                      <Col sm={6} xs={12}>
                        <Form.Item name={"last_name"}>
                          <Input
                            size="large"
                            placeholder={t("Last_Name")}
                            style={{ borderRadius: 4, padding: 10 }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Fade>
                  <Fade direction="up" delay={100}>
                    <Form.Item name={"email"}>
                      <Input
                        size="large"
                        placeholder={t("Email_Address")}
                        style={{ borderRadius: 4, padding: 10 }}
                      />
                    </Form.Item>
                  </Fade>
                  <Fade direction="up" delay={100}>
                    <Form.Item name={"number"}>
                      <Input
                        size="large"
                        placeholder={t("Phone_Number")}
                        style={{ borderRadius: 4, padding: 10 }}
                      />
                    </Form.Item>
                  </Fade>
                  <Fade direction="up" delay={100}>
                    <Form.Item name={"message"}>
                      <Input.TextArea
                        rows={4}
                        size="large"
                        placeholder={t("Write_Something")}
                        style={{ borderRadius: 4 }}
                      />
                    </Form.Item>
                  </Fade>
                  <Fade direction="up" delay={100}>
                    <div className="contact-text10">{t("By_clicking")}</div>
                    <Row>
                      <Col sm={2} xs={0} />
                      <Col sm={8} xs={12}>
                        <Button
                          block
                          htmlType="submit"
                          size="large"
                          type="primary"
                          style={{ height: 55, backgroundColor: "#f04c24" }}
                          icon={<AiOutlineSend />}
                        >
                          {t("Send")}
                        </Button>
                      </Col>
                      <Col sm={2} xs={0} />
                    </Row>
                  </Fade>
                </Form>
              </Col>
              <Col md={3} xs={12}></Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default PageContainer;
