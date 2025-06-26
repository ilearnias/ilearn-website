"use client";
import Image from "next/image";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Fade } from "react-awesome-reveal";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { IoArrowForward } from "react-icons/io5";

import img1 from "../assets/images/home_active_networking.webp";
import img2 from "../assets/images/home_server_storage.png";
import img3 from "../assets/images/home_cyber_security.webp";
import img4 from "../assets/images/home_data_center.png";
import img5 from "../assets/images/Cable Management System_2.png";
import img6 from "../assets/images/home_copper_product.png";
import img7 from "../assets/images/home_fiber_products.webp";
import img8 from "../assets/images/home_din_rail.png";
import img9 from "../assets/images/home_pre_terminated_cables.png";
import img10 from "../assets/images/home_racks_cabinets.png";
import img11 from "../assets/images/home_ip_rated_cabinets.webp";
import img12 from "../assets/images/home_ac_cabinets.webp";
import img13 from "../assets/images/home_tools_testing.png";
import img14 from "../assets/images/home_power_solution.webp";
import img15 from "../assets/images/home_osp_system.webp";

const PageContainer = () => {
  const router = useRouter();

  const { t } = useTranslation();
  const products = [
    {
      id: 1,
      img: img1,
      name: t("Active_Networking"),
    },
    {
      id: 2,
      img: img6,
      name: t("Copper_Products"),
    },
    {
      id: 3,
      img: img7,
      name: t("Optical_Fiber_Products"),
    },
    {
      id: 4,
      img: img10,
      name: t("Racks_Cabinets"),
    },
    {
      id: 5,
      img: img9,
      name: t("Pre_Terminated_Copper"),
    },
    {
      id: 6,
      img: img8,
      name: t("Din_Rail_Solutions"),
    },
    {
      id: 7,
      img: img12,
      name: t("Air-Conditioned_Cabinets"),
    },
    {
      id: 8,
      img: img14,
      name: t("Power_Solution"),
    },
    {
      id: 9,
      img: img13,
      name: t("Tools_Testing"),
    },
    {
      id: 10,
      img: img15,
      name: t("Outside_Plant"),
    },
    {
      id: 11,
      img: img11,
      name: t("IP_Patch_Panel"),
    },
    {
      id: 12,
      img: img2,
      name: t("Server_Storage"),
    },
    {
      id: 13,
      img: img3,
      name: t("Cyber_Security_System"),
    },
    {
      id: 14,
      img: img4,
      name: t("Data_Center_Solutions"),
    },
    {
      id: 15,
      img: img5,
      name: t("Cable_Management_System"),
    },
  ];

  const onSelect = async (val: any) => {
    try {
      console.log(val);
      router.push(`/details/${val}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="product-box1">
        <Container>
          <Fade direction="up">
            <div className="product-text1">{t("Products")}</div>
          </Fade>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              <Fade direction="up">
                <div className="product-text2">{t("Welcome_to_our")}</div>
              </Fade>
            </Col>
            <Col sm={2}></Col>
          </Row>
        </Container>
      </div>
      <br />
      <br />
      <Container>
        <Row className="gy-4">
          {products.map((item, index) => (
            <Col key={index} lg={3} md={4} sm={6} xs={12}>
              <Fade direction="up" className="h-100">
                <div
                  className="product-item1"
                  onClick={() => onSelect(item.id)}
                >
                  <div className="product-item2">
                    <Image
                      src={item?.img}
                      className="product-img"
                      alt="img"
                      layout="responsive"
                    />
                  </div>
                  <div className="Product-TxtBox">
                    <div className="product-cardTxt">{item.name}</div>
                    <IoArrowForward size={20} color="#ff4000" />
                  </div>
                </div>
              </Fade>
            </Col>
          ))}
        </Row>
      </Container>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default PageContainer;
