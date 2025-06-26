import React from "react";
import Image from "next/image";

export const Logo = (props: any) => {
  return (
    <div className="vendor-Img">
      <Image src={props?.img} width={200} height={200} alt="" />
    </div>
  );
};
