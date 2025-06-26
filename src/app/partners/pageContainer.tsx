// "use client";
// import "./styles.scss";
// import Header from "@/components/header";
// import Footer from "@/components/footer";
// import { Fade } from "react-awesome-reveal";
// import { Logo } from "./components/image";

// import { Col, Container, Row } from "react-bootstrap";

// // import Acceltex from "../assets/partners/acceltex.png";
// import Acceltex from "../assets/partners/Acceltex@4x.png";
// import Afl from "../assets/partners/AFL@4x.png";
// import Apc from "../assets/partners/APC@4x.png";
// import Aruba from "../assets/partners/Aruba@4x.png";
// import Aten from "../assets/partners/ATEN@4x.png";
// import Avaya from "../assets/partners/Avaya@4x.png";
// import Belden from "../assets/partners/Belden@4x.png";
// import Brother from "../assets/partners/Brother@4x.png";
// import Casio from "../assets/partners/Casio@4x.png";

// import Cisco from "../assets/partners/cisco.png";
// import Corning from "../assets/partners/corning.png";
// import Dell from "../assets/partners/dell.png";
// import Dnspace from "../assets/partners/dnspace.png";
// import Eaton from "../assets/partners/eaton.png";
// import Exfo from "../assets/partners/exfo.png";
// import Fluke from "../assets/partners/fluke.png";
// import Fortinet from "../assets/partners/fortinet.png";
// import Fujikura from "../assets/partners/fujikura.png";
// import HewlettPackard from "../assets/partners/HewlettPackard.png";
// import Hirschmann from "../assets/partners/hirschmann.png";
// import Huawei from "../assets/partners/huawei.png";
// import Hubbell from "../assets/partners/hubbell.png";
// import Juniper from "../assets/partners/juniper.png";
// import Mefc from "../assets/partners/mefc.png";
// import Microsift from "../assets/partners/microsoft.png";
// import Paloalto from "../assets/partners/paloalto.png";
// import Panduit from "../assets/partners/panduit.png";
// import Rittal from "../assets/partners/rittal.png";
// import Sophos from "../assets/partners/sophos.png";
// import Superior from "../assets/partners/superior.png";
// import Ubiquiti from "../assets/partners/ubiquiti.png";
// import Vertiv from "../assets/partners/vertiv.png";
// import Finosel from "../assets/partners/finosel.png";
// import Commscope from "../assets/partners/commscope.png";
// import Chatsworth from "../assets/vendors/chatsworth.png";

// import { useTranslation } from "react-i18next";

// export default function PageContainer() {
//   const { t } = useTranslation();

//   return (
//     <div className="partners-Container">
//       <Header />
//       <div className="partners-box1 ">
//         <Container>
//           <Fade>
//             <div className="partners-text1">{t("Our Partners")}</div>
//           </Fade>

//           <Row>
//             <Col sm={2}></Col>
//             <Col sm={8}>
//               <Fade direction="up">
//                 <div className="partners-text2">
//                   {t("partners-HeaderSubTxt")}
//                 </div>
//               </Fade>
//             </Col>
//             <Col sm={2}></Col>
//           </Row>
//         </Container>
//       </div>
//       <br />
//       <br />
//       <Container>
//         <Row>
//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Finosel} />
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Commscope} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Acceltex} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Afl} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Apc} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Aruba} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Aten} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Avaya} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Belden} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Brother} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Casio} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Chatsworth} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Cisco} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Corning} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Dell} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Dnspace} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Eaton} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Exfo} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Fluke} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Fortinet} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Fujikura} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={HewlettPackard} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Hirschmann} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Huawei} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Hubbell} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Juniper} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Mefc} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Microsift} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Paloalto} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Panduit} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Rittal} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Sophos} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Superior} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Ubiquiti} />{" "}
//             </Fade>
//           </Col>

//           <Col md="2" xs={6}>
//             <Fade direction="up" style={{ height: "100%" }}>
//               <Logo img={Vertiv} />{" "}
//             </Fade>
//           </Col>
//         </Row>
//       </Container>
//       <Footer />
//     </div>
//   );
// }

import React from "react";

const PageContainer = () => {
  return <div>PageContainer</div>;
};

export default PageContainer;
