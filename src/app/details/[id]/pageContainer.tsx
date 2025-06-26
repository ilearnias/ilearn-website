"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Fade } from "react-awesome-reveal";
import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "../styles.scss";
import { useTranslation } from "react-i18next";
import Brands from "./data.json";
import Image from "next/image";

import Acceltex from "../../assets/partners/Acceltex@4x.png";
import Afl from "../../assets/partners/AFL@4x.png";
import Apc from "../../assets/partners/APC@4x.png";
import Aruba from "../../assets/partners/Aruba@4x.png";
import Aten from "../../assets/partners/ATEN@4x.png";
import Avaya from "../../assets/partners/Avaya@4x.png";
import Belden from "../../assets/partners/Belden@4x.png";
import Brother from "../../assets/partners/Brother@4x.png";
import Casio from "../../assets/partners/Casio@4x.png";
import Cisco from "../../assets/partners/Cisco@4x.png";
import Corning from "../../assets/partners/Corning@4x.png";
import Dell from "../../assets/partners/Dell@4x.png";
import Dinspace from "../../assets/partners/Dinspace@4x.png";
import Eaton from "../../assets/partners/Eaton@4x.png";
import Exfo from "../../assets/partners/Exfo@4x.png";
import Fluke from "../../assets/partners/Fluke@4x.png";
import Fortinet from "../../assets/partners/Fortinet@4x.png";
import Fujikura from "../../assets/partners/Fujikura@4x.png";
import HewlettPackard from "../../assets/partners/Hewlett Packard@4x.png";
import Hirschmann from "../../assets/partners/Hirschmannn@4x.png";
import Huawei from "../../assets/partners/Huawei@4x.png";
import Hubbell from "../../assets/partners/Hubbel@4x.png";
import Juniper from "../../assets/partners/Juniper@4x.png";
import Mefc from "../../assets/partners/MEFC@4x.png";
import Microsoft from "../../assets/partners/Microsoft@4x.png";
import Paloalto from "../../assets/partners/Paloalto@4x.png";
import Panduit from "../../assets/partners/Panduit@4x.png";
import Rittal from "../../assets/partners/Rittal@4x.png";
import Sophos from "../../assets/partners/Sophos@4x.png";
import Superior from "../../assets/partners/Superior Essex@4x.png";
import Ubiquiti from "../../assets/partners/Ubiqu@4x.png";
import Vertiv from "../../assets/partners/Vertiv@4x.png";
import Finosel from "../../assets/partners/Finosel@4x.png";
import Commscope from "../../assets/partners/Commscope@4x.png";
import Greenly from "../../assets/partners/Greenly.png";
import Moxa from "../../assets/partners/Moxa.png";
import Techlogiks from "../../assets/partners/techlogiks.png";
import Fis from "../../assets/partners/fis.png";
import Optronics from "../../assets/partners/optronics.png";
import Miller from "../../assets/partners/miller.png";
import ThreeM from "../../assets/partners/3m.png";
import Chatsworth from "../../assets/partners/Chatsworth Products@4x.png";
import Kti from "../../assets/partners/kti.png";
import EandA from "../../assets/partners/Eaton@4x.png";

const imageMap: any = {
  acceltex: Acceltex,
  afl: Afl,
  apc: Apc,
  aruba: Aruba,
  aten: Aten,
  avaya: Avaya,
  belden: Belden,
  brother: Brother,
  casio: Casio,
  chatsworth: Chatsworth,
  cisco: Cisco,
  corning: Corning,
  dell: Dell,
  dnspace: Dinspace,
  eaton: Eaton,
  exfo: Exfo,
  fluke: Fluke,
  fortinet: Fortinet,
  fujikura: Fujikura,
  hewlettpackard: HewlettPackard,
  hirschmann: Hirschmann,
  huawei: Huawei,
  hubbell: Hubbell,
  juniper: Juniper,
  mefc: Mefc,
  microsoft: Microsoft,
  paloalto: Paloalto,
  panduit: Panduit,
  rittal: Rittal,
  sophos: Sophos,
  superior: Superior,
  ubiquity: Ubiquiti,
  vertiv: Vertiv,
  finosel: Finosel,
  commscope: Commscope,
  moxa: Moxa,
  techlogiks: Techlogiks,
  greenlee: Greenly,
  eanda: EandA,
  fis: Fis,
  threem: ThreeM,
  optronics: Optronics,
  miller: Miller,
  kti: Kti,
};

const PageContainer = (props: any) => {
  const { t } = useTranslation();
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  function getOb(id: any) {
    return Brands?.find((item: any) => item.id === id);
  }

  useEffect(() => {
    setData(getOb(Number(props?.id)));
    console.log(getOb(Number(props?.id)));

    setIsLoading(false);
  }, [props?.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="product-box1">
        <Container>
          <Fade direction="up">
            <div className="product-text1">{t(data?.name)}</div>
          </Fade>
        </Container>
      </div>
      <br />
      <br />
      <div className="" style={{ minHeight: "50vh" }}>
        <Container>
          <Row className="justify-content-center">
            {data?.images?.map((val: any, ind: any) => {
              return (
                <Col md={2} key={ind}>
                  <Fade direction="up" style={{ height: "100%" }}>
                    <div className="product-Img" key={val}>
                      <Image
                        src={imageMap[val.toLowerCase()]}
                        width={200}
                        height={200}
                        alt={val}
                      />
                    </div>
                  </Fade>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default PageContainer;
