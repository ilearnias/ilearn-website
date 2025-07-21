import "./styles.scss";
import Image from "next/image";
import { Button, Drawer } from "antd";
import menuItems from "./menu.json";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";

export default function SideDrawer(props: any) {
  const router = useRouter();

  const handleClick = (link: string) => {
    router.push(link);
    props?.close();
  };

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
        background: "#fff",
        background: "#fff",
        padding: 0,
      }}
      footer={
        <div className="Drawer-footer">
          <a target="_blank" href="https://www.facebook.com/iLearnIAS/">
            <FaFacebookF className="Drawer-footerIcon" />
          </a>
          <a target="_blank" href="https://www.instagram.com/ilearnias/">
            <RiInstagramFill className="Drawer-footerIcon" />
          </a>
          <a target="_blank" href="https://www.youtube.com/@ilearnias">
            <FaYoutube className="Drawer-footerIcon" />
          </a>
        </div>
      }
    >
      <div style={{}}>
        {menuItems.map((item: any, index: any) => {
          return (
            <div
              onClick={() => handleClick(item.link)}
              className="_drawer_box"
              key={index}
            >
              <div className="_drawer_text">{item.name}</div>
              <IoMdArrowForward color="#000000" size={18} />
            </div>
          );
        })}
        <br />
        <Button
          onClick={() => {
            router.push("/contact");
            props?.close();
          }}
          className="_drawer_button"
          type="primary"
        >
          Join Now
        </Button>
      </div>
    </Drawer>
  );
}
