import React from "react";
import Image from "next/image";

export const Logo = (props: any) => {
  console.log(props, "propsssss");
  return (
    <div className="partners-Img">
      <Image src={props?.img} width={200} height={200} alt="" />
    </div>
  );
};
