import "./styles.scss";
import Image from "next/image";
import { Drawer } from "antd";
import menuItems from "./menu.json";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";

export default function SideDrawer(props: any) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Drawer
      title={
        <div className="Drawer-header">
          <div>
            <Image src={"./logo.svg"} width={100} height={100} alt="Logo" />
          </div>
          <div onClick={() => props?.close()}>
            <IoClose size={30} />
          </div>
        </div>
      }
      placement="right"
      closable={false}
      onClose={() => props?.close()}
      open={props.open}
      key="headerdrwer"
      width={280}
      style={{
        background: "linear-gradient(to right,#1b2730, #1b2730)",
        padding: 0,
      }}
      footer={
        <div className="Drawer-footer">
          <a target="_blank" href="https://www.facebook.com/prismnetwrks">
            <FaFacebookF className="Drawer-footerIcon" />
          </a>
          <a target="_blank" href="https://www.instagram.com/prismnetwrks/">
            <RiInstagramFill className="Drawer-footerIcon" />
          </a>
          <a target="_blank" href="https://x.com/prismnetwrks">
            <FaXTwitter className="Drawer-footerIcon" />
          </a>
        </div>
      }
    >
      <div style={{ marginTop: -20 }}>
        {menuItems.map((item: any, index: any) => {
          return (
            <div
              className="Drawer-items"
              key={index}
              onClick={() => router.push(item?.path)}
            >
              <div className="Drawer-itemsTxt">{t(item.name)}</div>

              <IoMdArrowForward className="Drawer-itemsIcon" />
            </div>
          );
        })}
      </div>
    </Drawer>
  );
}
