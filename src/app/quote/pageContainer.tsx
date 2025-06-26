"use client";
import "./styles.scss";
import React from "react";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, message, Upload } from "antd";
import { Fade } from "react-awesome-reveal";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import emailjs from "emailjs-com";

const PageContainer = () => {
  const props: UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onSubmit = async (values: any) => {
    try {
      const templateParams = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        description: values.description,
      };

      const userId = "KPuAPCkmf6RmM2ctp";
      const serviceId = "service_a7srfw9";
      const templateId = "template_l9jj4sc";

      await emailjs.send(serviceId, templateId, templateParams, userId);
      message.success("Form submitted successfully!");
    } catch (error) {
      console.log(error);
      message.error("Form submission failed.");
    }
  };

  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <div>
      <Header />

      <div className="quote-container">
        <div className="quote-box1">
          <Container>
            <div className="quote-text1">{t("requestQuote")}</div>
            <div className="quote-text2">
              {t("Our_clients_are")}&nbsp;
              <a style={{ color: "#ff4000" }} href="mailto:info@prismwll.com">
                info@prismwll.com
              </a>
              &nbsp;{t("and_we_will_respond")}
            </div>
          </Container>
        </div>
        <div className="quote-box2">
          <Container>
            <Row>
              <Col md="3"></Col>
              <Col md="6">
                <div className="quote-text4" style={{ textAlign: "center" }}>
                  {t("Fill_the_Form")}
                </div>
                <div className="quote-box3" style={{ textAlign: "center" }}>
                  {t("Please_fill")}
                </div>
                <br />

                <Form onFinish={onSubmit} layout="vertical" form={form}>
                  <Fade direction="up" delay={100}>
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your name",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder={t("Name_Person_Company")}
                        style={{ borderRadius: 4, padding: 10 }}
                      />
                    </Form.Item>
                  </Fade>

                  <Fade direction="up" delay={100}>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your email",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder={t("Email_Address")}
                        style={{ borderRadius: 4, padding: 10 }}
                      />
                    </Form.Item>
                  </Fade>

                  <Fade direction="up" delay={100}>
                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your phone",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder={t("Phone_Number")}
                        style={{ borderRadius: 4, padding: 10 }}
                      />
                    </Form.Item>
                  </Fade>

                  <Fade direction="up" delay={100}>
                    <Form.Item
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the description",
                        },
                      ]}
                    >
                      <Input.TextArea
                        rows={6}
                        size="large"
                        placeholder={t("Description")}
                        style={{ borderRadius: 4 }}
                      />
                    </Form.Item>
                  </Fade>

                  <Fade direction="up" delay={100}>
                    <Form.Item name="file">
                      <Upload {...props}>
                        <Button icon={<UploadOutlined />}>
                          {t("Upload_file")}
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Fade>

                  <Fade direction="up" delay={100}>
                    <Row>
                      <Col sm={2} xs={0} />

                      <Col sm={8} xs={12}>
                        <Form.Item>
                          <Button
                            htmlType="submit"
                            block
                            size="large"
                            type="primary"
                            style={{ height: 55, backgroundColor: "#f04c24" }}
                          >
                            {t("Submit")}
                          </Button>
                        </Form.Item>
                      </Col>

                      <Col sm={2} xs={0} />
                    </Row>
                  </Fade>
                </Form>
              </Col>
              <Col md="3"></Col>
            </Row>
          </Container>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PageContainer;
