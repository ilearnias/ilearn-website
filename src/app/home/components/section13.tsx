"use client";
import Image from "next/image";
import { Container } from "react-bootstrap";
import BgImage from "../../assets/images/home_racks_cabinets.png";
import { Fade } from "react-awesome-reveal";
import SectionControl from "./sectionControl";
import { useTranslation } from "react-i18next";

export default function Section13() {
  const { t } = useTranslation();
  return (
    <div className="Home-Section2">
      <Container>
        <div className="Home-Section2Box">
          <br /> <br />
          <br /> <br />
          <br /> <br />
          <Fade direction="up">
            <div className="Home-text1">{t("Racks_Cabinets")}</div>
          {/* </Fade> */}
          <br />
          {/* <Fade direction="up"> */}
            <Image
              src={BgImage}
              width={0}
              height={0}
              className="Home-Section2Imag"
              alt="Logo"
            />
          {/* </Fade> */}
          <br />
          {/* <Fade direction="up"> */}
            <div className="Home-text2">{t("Racks_and_cabinets")}</div>
          {/* </Fade> */}
          <br />
          {/* <Fade direction="up"> */}
            <SectionControl />
          </Fade>
        </div>
        <br /> <br /> <br />
      </Container>
    </div>
  );
}
