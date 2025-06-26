// "use client";
// import "./styles.scss";
// import Header from "@/components/header";
// import Footer from "@/components/footer";
// import Image from "next/image";
// import { Fade } from "react-awesome-reveal";
// import { Card } from "antd";
// import { Pagination } from "antd";
// import { Col, Container, Row } from "react-bootstrap";
// import { useRouter } from "next/navigation";
// import News1 from "../assets/images/news1.webp";
// import News2 from "../assets/images/news2.webp";
// import News3 from "../assets/images/news3.webp";
// import News4 from "../assets/images/news4.webp";
// import { useTranslation } from "react-i18next";

// export default function Careers() {
//   const { t } = useTranslation();

//   return (
//     <div className="blog-container">
//       <Header />
//       <div className="blog-box1">
//         <Container>
//           <Fade>
//             <div className="blog-text1">{t("Blogs & News")}</div>
//           </Fade>
//           <Row>
//             <Col sm={2}></Col>
//             <Col sm={8}>
//               <Fade direction="up">
//                 <div className="blog-text2">{t("news-HeaderSubTxt")}</div>
//               </Fade>
//             </Col>
//             <Col sm={2}></Col>
//           </Row>
//         </Container>
//       </div>
//       <br />
//       <div className="blog-box2">
//         <Container>
//           <Row>
//             <Col sm={3} xs={12}>
//               <Fade>
//                 <Card
//                   cover={
//                     <Image
//                       src={News1}
//                       width={0}
//                       height={100}
//                       alt="Behind Gulf Commercial Center"
//                       className="blog-img"
//                     />
//                   }
//                 >
//                   <Card.Meta
//                     title="Europe Street beat"
//                     description="www.instagram.com"
//                   />
//                   <br />
//                   <p>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Ipsa pariatur aspernatur dignissimos quisquam! Dolores quis
//                     minima nostrum id.
//                   </p>
//                 </Card>
//                 <br />
//               </Fade>
//             </Col>
//             <Col sm={3} xs={12}>
//               <Fade delay={100}>
//                 <Card
//                   cover={
//                     <Image
//                       src={News2}
//                       width={0}
//                       height={100}
//                       alt="Behind Gulf Commercial Center"
//                       className="blog-img"
//                     />
//                   }
//                 >
//                   <Card.Meta
//                     title="Europe Street beat"
//                     description="www.instagram.com"
//                   />
//                   <br />
//                   <p>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Ipsa pariatur aspernatur dignissimos quisquam! Dolores quis
//                     minima nostrum id.
//                   </p>
//                 </Card>
//                 <br />
//               </Fade>
//             </Col>
//             <Col sm={3} xs={12}>
//               <Fade delay={200}>
//                 <Card
//                   cover={
//                     <Image
//                       src={News3}
//                       width={0}
//                       height={100}
//                       alt="Behind Gulf Commercial Center"
//                       className="blog-img"
//                     />
//                   }
//                 >
//                   <Card.Meta
//                     title="Europe Street beat"
//                     description="www.instagram.com"
//                   />
//                   <br />
//                   <p>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Ipsa pariatur aspernatur dignissimos quisquam! Dolores quis
//                     minima nostrum id.
//                   </p>
//                 </Card>
//                 <br />
//               </Fade>
//             </Col>
//             <Col sm={3} xs={12}>
//               <Fade delay={300}>
//                 <Card
//                   cover={
//                     <Image
//                       src={News4}
//                       width={0}
//                       height={100}
//                       alt="Behind Gulf Commercial Center"
//                       className="blog-img"
//                     />
//                   }
//                 >
//                   <Card.Meta
//                     title="Europe Street beat"
//                     description="www.instagram.com"
//                   />
//                   <br />
//                   <p>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Ipsa pariatur aspernatur dignissimos quisquam! Dolores quis
//                     minima nostrum id.
//                   </p>
//                 </Card>
//                 <br />
//               </Fade>
//             </Col>
//           </Row>
//           <br />
//           <div className="page-box">
//             <Pagination defaultCurrent={1} total={1} />
//           </div>
//           <br /> <br />
//         </Container>
//       </div>
//       <Footer />
//     </div>
//   );
// }

"use client";
import "./styles.scss";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button, Pagination } from "antd";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";
import News1 from "../assets/images/news1.jpg";
import News2 from "../assets/images/news3.jpg";
import News3 from "../assets/images/news2.jpg";
import News4 from "../assets/images/news4.jpg";

export default function Careers() {
  const contens = [
    {
      img: News1,
      title: "Huawei Enterprise BG Partner ",
      date: "June 2024",
      location: "Saudi Arabia",
      desc: `We are thrilled to announce that  Prism International Solutions WLL has been awarded the Huawei Enterprise BG Sales Partner Program! A heartfelt thank you to our dedicated team and loyal customers for their continuous support. Together, we are paving the way for a more connected future.`,
      link: `https://www.linkedin.com/posts/connectnetwrks_connectnetwrks-finosel-huawei-activity-7212112732257497090-Z6Xy?utm_source=share&utm_medium=member_desktop`,
    },
    {
      img: News2,
      title: "Diamond level in VERTIV",
      date: "June 2024",
      location: "Saudi Arabia",
      desc: `We are thrilled to announce that  Prism International Solutions WLL has obtained Diamond level in VERTIV. A heartfelt thank you to our dedicated team and loyal customers for their continuous support. Together, we are paving the way for a more connected future.`,
      link: `https://www.linkedin.com/posts/connectnetwrks_connectnetwrks-finosel-vertiv-activity-7220777915020394496-YUg4?utm_source=share&utm_medium=member_desktop`,
    },
    {
      img: News3,
      title: `TREND Network's Distributor`,
      date: "June 2024",
      location: "Saudi Arabia",
      desc: `We are excited to announce that  Prism International Solutions WLL has been appointed as TREND Network's Distributor in Saudi Arabia A Heartfelt thank you to our dedicated team and loyal customers for their continuous support. Together, we are paving the way for a more connected future.`,
      link: `https://www.linkedin.com/posts/connectnetwrks_celebratory-announcement-with-a-touch-of-activity-7222235966818689024-AE-x?utm_source=share&utm_medium=member_desktop`,
    },
    {
      img: News4,
      title: `Certificate of Authorization`,
      date: "June 2024",
      location: "Saudi Arabia",
      desc: `We are excited to announce that  Prism International Solutions WLL has been appointed as  Finosel inteligent Network's  Distributor in Saudi Arabia A Heartfelt thank you to our dedicated team and loyal customers for their continuous support. Together, we are paving the way for a more connected future.`,
      link: `https://www.linkedin.com/in/connectnetwrks/`,
    },
  ];
  const { t } = useTranslation();

  return (
    <div className="blog-container">
      <Header />
      <div className="blog-box1">
        <Container>
          <Fade>
            <div className="blog-text1">{t("Blogs & News")}</div>
          </Fade>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              <Fade direction="up">
                <div className="blog-text2">{t("news-HeaderSubTxt")}</div>
              </Fade>
            </Col>
            <Col sm={2}></Col>
          </Row>
        </Container>
      </div>
      <br />
      <br />
      <br />
      <div className="blog-box2">
        <Container>
          <Row>
            {contens.map((item, index) => (
              <Col md={3} sm={6} xs={12} key={index}>
                <Fade delay={index * 100}>
                  <div className="card1">
                    <Image
                      src={item.img}
                      alt="Behind Gulf Commercial Center"
                      style={{ width: "100%", height: 150, objectFit: "cover" }}
                    />
                    <div className="card-title">{item.title}</div>
                    <div className="card-date">
                      {item.date}
                      <br />
                      {item.location}
                    </div>
                    <div className="card-desc">
                      {item?.desc?.length > 200
                        ? `${item?.desc?.slice(0, 190)}...`
                        : item?.desc}
                    </div>
                    <a target="_blank" href={item?.link}>
                      <Button className="read-more">Read more</Button>
                    </a>
                  </div>
                  <br />
                </Fade>
              </Col>
            ))}
          </Row>
          <br />
          <div className="page-box">
            <Pagination defaultCurrent={1} total={1} />
          </div>
          <br /> <br />
        </Container>
      </div>
      <Footer />
    </div>
  );
}
