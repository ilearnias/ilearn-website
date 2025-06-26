"use client";
import { useCallback, useEffect, useState } from "react";
import "./styles.scss";
import { Container } from "react-bootstrap";
import { CiGlobe } from "react-icons/ci";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CgMenuRight } from "react-icons/cg";
import SideDrawer from "./sideDrawer";
import { Popover } from "antd";
import languages from "./language.json";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import Logo from "../../app/assets/images/logo.png";

export default function Header() {
  const router = useRouter();
  const [lastScrollY, setLastScrollY] = useState<any>(0);
  const [dawerOpen, setDawerOpen] = useState<any>(false);
  const { t } = useTranslation();

  var selectedLanguage: any;

  if (typeof window !== "undefined") {
    selectedLanguage = localStorage.getItem("i18nextLng") || "en";
  }
  // const [selected, setselected] = useState(selectedLanguage.toUpperCase());
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [languageColor, setlanguageColor] = useState(null);

  const handleNavigation = useCallback(
    (e: any) => {
      const window = e.currentTarget;
      if (lastScrollY > window.scrollY) {
        setLastScrollY(false);
      } else if (lastScrollY + 50 < window.scrollY) {
        setLastScrollY(true);
      }
    },
    [lastScrollY]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleNavigation);
      return () => {
        window.removeEventListener("scroll", handleNavigation);
      };
    }
    console.log("lastScrollY", lastScrollY);
  }, [handleNavigation, lastScrollY]);

  const handleLanguageSwitch = (language: any) => {
    localStorage.setItem("i18nextLng", language);
    i18n.changeLanguage(language);
    setPopoverVisible(false);
  };

  const content = (
    <div>
      {languages?.map((item: any, i: any) => (
        <div
          key={i}
          className={`Header-popoverContent ${
            languageColor === item.code ? "selected" : ""
          }`}
          onClick={() => {
            setlanguageColor(item?.code);
            handleLanguageSwitch(item?.code);
          }}
        >
          <div className="Header-popoverTxt1">{item?.code}</div>
          <div className="Header-popoverTxt2">{item?.name}</div>
        </div>
      ))}
    </div>
  );

  const company = (
    <div className="header-popover">
      <div className="header-popoverItem" onClick={() => router.push("/about")}>
        {t("About Us")}
      </div>
      <div className="header-popoverItem" onClick={() => router.push("/team")}>
        {t("OurTeam")}
      </div>
      <div
        className="header-popoverItem"
        onClick={() => router.push("/awards")}
      >
        {t("Awards")}
      </div>
    </div>
  );

  const products = (
    <div className="header-popover">
      <div className="header-item" onClick={() => router.push("/about")}>
        Active Networking
      </div>
      <div className="header-item" onClick={() => router.push("/team")}>
        Power Solution
      </div>
      <div className="header-item" onClick={() => router.push("/awards")}>
        Data Center Solution
      </div>
      <div className="header-item" onClick={() => router.push("/awards")}>
        Copper Products
      </div>
      <div className="header-item" onClick={() => router.push("/awards")}>
        Optical Fiber Products
      </div>
      <div className="header-item" onClick={() => router.push("/awards")}>
        Racks & Cabinets
      </div>
      <div className="header-item" onClick={() => router.push("/awards")}>
        Tools & Testing
      </div>
    </div>
  );

  return (
    <div>
      <div className={lastScrollY ? "Header scrolled" : "Header"}>
        <Container>
          <div className="Header-Box">
            <div className="Header-LogoBox" onClick={() => router.push("/")}>
              <Image src={Logo} width={150} height={200} alt="LOGO" />
            </div>
            <div className="Header-MenuBox">
              <div onClick={() => router.push("/")} className="header-item">
                {t("Home")}
              </div>

              <Popover
                className="header-item"
                placement="bottomLeft"
                trigger="hover"
                content={company}
              >
                {t("Company")}
              </Popover>

              <div
                onClick={() => router.push("/products")}
                className="header-item"
              >
                {/* <Popover
                  className="header-item"
                  placement="bottomLeft"
                  content={products}
                >
                  {t("Products")}
                </Popover> */}
                {t("Products")}
              </div>

              <div
                onClick={() => router.push("/vendors")}
                className="header-item"
              >
                {t("Vendors")}
              </div>

              <div
                onClick={() => router.push("/customers")}
                className="header-item"
              >
                {t("Customers")}
              </div>

              <div
                onClick={() => router.push("/blogs")}
                className="header-item"
              >
                {t("News")}
              </div>

              <div onClick={() => router.push("/join")} className="header-item">
                {t("Careers")}
              </div>

              <div
                onClick={() => router.push("/contact")}
                className="header-item"
              >
                {t("Contact Us")}
              </div>
            </div>
            <div className="Header-MoreBox">
              <div
                className="Header-Button2"
                onClick={() => router.push("/quote")}
              >
                {t("requestQuote")}
              </div>
              <div className="Header-Button">{t("Store")}</div>
              <div className="header-icon">
                <Popover
                  content={content}
                  placement="bottom"
                  arrow={false}
                  open={popoverVisible}
                  onOpenChange={setPopoverVisible}
                  trigger="click"
                >
                  <CiGlobe size={25} />
                </Popover>{" "}
              </div>
              <div
                className="Header-menuIcon"
                onClick={() => setDawerOpen(!dawerOpen)}
              >
                <CgMenuRight size={25} />
              </div>
            </div>
          </div>
        </Container>
      </div>
      {dawerOpen ? (
        <SideDrawer open={dawerOpen} close={() => setDawerOpen(!dawerOpen)} />
      ) : null}
    </div>
  );
}
