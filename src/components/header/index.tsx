"use client";
import { useCallback, useEffect, useState } from "react";
import "./styles.scss";
import Container from "@/components/common/Container";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CgMenuRight } from "react-icons/cg";
import SideDrawer from "./sideDrawer";
import SubText from "../common/SubText";

export default function Header() {
  const router = useRouter();
  const [lastScrollY, setLastScrollY] = useState<any>(0);
  const [dawerOpen, setDawerOpen] = useState<any>(false);

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

  return (
    <div className="w-full ">
      <div
        className={`${
          lastScrollY ? "Header scrolled" : "Header"
        } w-full bg-gray-900  `}
      >
        <Container className="w-full h-full  ">
          <div className="flex  justify-between w-full h-full">
            <div
              className="Header-LogoBox h-full flex items-center"
              onClick={() => router.push("/")}
            >
              <Image
                src="/new-logo.png"
                width={150}
                height={50}
                alt="iLearn Logo"
                priority
                className="header-logo"
              />
            </div>
            <div className="flex-1 flex justify-center h-full">
              <div className="Header-MenuBox flex justify-center items-center gap-10 h-full">
                <div className="!flex !items-center !justify-center !gap-7 pt-3">
                  <div
                    onClick={() => router.push("/")}
                    className="header-hover"
                  >
                    <SubText
                      size="small"
                      className="!font-semibold"
                      text="Home"
                      color="white"
                    />
                  </div>

                  <div
                    onClick={() => router.push("/about")}
                    className="header-hover"
                  >
                    <SubText
                      size="small"
                      className="!font-semibold"
                      text="About"
                      color="white"
                    />
                  </div>

                  <div
                    onClick={() => router.push("/result")}
                    className="header-hover"
                  >
                    <SubText
                      size="small"
                      className="!font-semibold"
                      text="Results"
                      color="white"
                    />
                  </div>

                  <div
                    onClick={() => router.push("/programs")}
                    className="header-hover"
                  >
                    <SubText
                      size="small"
                      className="!font-semibold"
                      text="Programs"
                      color="white"
                    />
                  </div>

                  <div
                    onClick={() => router.push("/blogs")}
                    className="header-hover"
                  >
                    <SubText
                      size="small"
                      className="!font-semibold"
                      text="Blog"
                      color="white"
                    />
                  </div>

                  <div
                    onClick={() => router.push("/ilearn_app")}
                    className="header-hover"
                  >
                    <SubText
                      size="small"
                      className="!font-semibold"
                      text="iLearn App"
                      color="white"
                    />
                  </div>

                  <div
                    onClick={() => router.push("/gallery")}
                    className="header-hover"
                  >
                    <SubText
                      size="small"
                      className="!font-semibold"
                      text="Gallery"
                      color="white"
                    />
                  </div>

                  <div
                    onClick={() => router.push("/contact")}
                    className="header-hover"
                  >
                    <SubText
                      size="small"
                      className="!font-semibold"
                      text="Contact Us"
                      color="white"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 h-full">
              <div
                className="!text-[16px] !font-semibold !text-white bg-red-500  hover:bg-red-600 transition-all duration-300 ease-in-out rounded-md px-4 py-2 cursor-pointer md:block hidden"
                onClick={() => router.push("/quote")}
              >
                Join Now
              </div>
              <div
                className="Header-menuIcon md:hidden"
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
