import "./styles.scss";
import Image from "next/image";
import { Drawer } from "antd";
import menuItems from "./menu.json";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import SubText from "../common/SubText";

export default function SideDrawer(props: any) {
  const router = useRouter();

  return (
    <Drawer
      title={
        <div className="Drawer-header">
          <div>
            <Image
              src="/new-logo.png"
              width={150}
              height={50}
              alt="iLearn Logo"
              priority
              className="header-logo"
            />
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
          <a target="_blank" href="">
            <FaFacebookF className="Drawer-footerIcon" />
          </a>
          <a target="_blank" href="">
            <RiInstagramFill className="Drawer-footerIcon" />
          </a>
          <a target="_blank" href="">
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
              onClick={() => {
                router.push(item?.path);
                props?.close();
              }}
            >
              <div className="Drawer-itemsTxt">
                <SubText text={item.name} color="white" />
              </div>
              <IoMdArrowForward className="Drawer-itemsIcon" />
            </div>
          );
        })}
        <div
          className="Drawer-items join-now-mobile"
          onClick={() => {
            router.push("/quote");
            props?.close();
          }}
        >
          <div className="Drawer-itemsTxt">
            <SubText text="Join Now" color="white" />
          </div>
          <IoMdArrowForward className="Drawer-itemsIcon" />
        </div>
      </div>
    </Drawer>
  );
}
