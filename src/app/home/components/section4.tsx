"use client";
import Image from "next/image";
import { Container } from "react-bootstrap";
import ActiveNetwork from "../../assets/images/home_active_networking.webp";
import { Fade } from "react-awesome-reveal";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import SectionControl from "./sectionControl";

export default function Section4() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="Home-Section2">
      <Container>
        <div className="Home-Section2Box">
          <br /> <br />
          <br /> <br />
          <br /> <br />
          <Fade direction="up">
            <div className="Home-text1">{t("Active_Networking")}</div>
          {/* </Fade> */}
          <br />
          {/* <Fade direction="up"> */}
            <Image
              src={ActiveNetwork}
              width={0}
              height={0}
              className="Home-Section2Imag"
              alt="Logo"
            />
          {/* </Fade> */}
          <br />
          {/* <Fade direction="up"> */}
            <div className="Home-text2">{t("Our_active_networking")}</div>
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
