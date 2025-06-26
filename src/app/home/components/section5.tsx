"use client";
import Image from "next/image";
import { Container } from "react-bootstrap";
import Server from "../../assets/images/home_server_storage.png";
import { Fade } from "react-awesome-reveal";
import SectionControl from "./sectionControl";
import { useTranslation } from "react-i18next";

export default function Section5() {
  const { t } = useTranslation();
  return (
    <div className="Home-Section2">
      <Container>
        <div className="Home-Section2Box">
          <br /> <br />
          <br /> <br />
          <br /> <br />
          <Fade direction="up">
            <div className="Home-text1">{t("Server_Storage")}</div>
          {/* </Fade> */}
          <br />
          {/* <Fade direction="up"> */}
            <Image
              src={Server}
              width={0}
              height={0}
              className="Home-Section2Imag"
              alt="Logo"
              style={{ width: "500px" }}
            />
          {/* </Fade> */}
          <br />
          {/* <Fade direction="up"> */}
            <div className="Home-text2">{t("A_server_is")}</div>
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
