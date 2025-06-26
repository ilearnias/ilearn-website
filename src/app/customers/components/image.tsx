import React from "react";
import { Col } from "react-bootstrap";
import Image from "next/image";

export const Logo = (props: any) => {
  return (
    <div className="customers-Img">
      <Image src={props?.img} width={200} height={200} alt="" />
    </div>
  );
};
