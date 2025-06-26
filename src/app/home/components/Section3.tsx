"use client";
import { Container } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Section3() {
  const { t } = useTranslation();

  return (
    <div className="Home-Section3">
      <Container>
        <Fade direction="up">
          <div className="Home-text2">{t("Our_active_networking")}</div>
        </Fade>
      </Container>
    </div>
  );
}
