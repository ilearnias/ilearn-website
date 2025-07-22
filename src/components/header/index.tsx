"use client";
import { useCallback, useEffect, useState } from "react";
import "./styles.scss";
import Container from "@/components/common/Container";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { CgMenuRight } from "react-icons/cg";
import SideDrawer from "./sideDrawer";
import SubText from "../common/SubText";
import Menu from "./menu.json";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [lastScrollY, setLastScrollY] = useState<any>(0);
  const [dawerOpen, setDawerOpen] = useState<any>(false);

  // Function to get the current active menu based on pathname
  const getCurrentActiveMenu = () => {
    // Handle root path
    if (pathname === "/") {
      return "Home";
    }

    // Check for exact matches first
    const exactMatch = Menu.find((menu: any) => menu.path === pathname);
    if (exactMatch) {
      return exactMatch.name;
    }

    // Check for partial matches (for nested routes)
    const partialMatch = Menu.find(
      (menu: any) => menu.path !== "/" && pathname.startsWith(menu.path)
    );
    if (partialMatch) {
      return partialMatch.name;
    }

    return "Home"; // Default fallback
  };

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
        } w-full bg-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.10)]`}
      >
        <Container className="w-full h-full  ">
          <div className="flex justify-between w-full h-full">
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
            <div className="_nav_bar_items">
              <div className="Header-MenuBox flex justify-center items-center gap-10 h-full">
                <div className="!flex !items-center !justify-center  pt-3">
                  {Menu?.map((menu: any, index: any) => {
                    const isActive = getCurrentActiveMenu() === menu?.name;
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setTimeout(() => {
                            router.push(menu?.path);
                          }, 100);
                        }}
                      >
                        <div
                          className={`_header_menu_text ${
                            isActive ? "selected" : ""
                          }`}
                        >
                          {menu?.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 h-full">
              <div
                className="!text-[16px] !font-semibold !text-white bg-red-500  hover:bg-red-600 transition-all duration-300 ease-in-out rounded-md px-4 py-2 cursor-pointer md:block hidden"
                onClick={() => router.push("/contact")}
              >
                Join Now
              </div>
              <div
                className="Header-menuIcon"
                onClick={() => setDawerOpen(!dawerOpen)}
              >
                <CgMenuRight color={"#20468d"} size={25} />
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
