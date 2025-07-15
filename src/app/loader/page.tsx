import React from "react";
import Image from "next/image";
import "./styles.scss";

function Page() {
  return (
    <div className="loader-component">
      <div className="loader">
        <div className="spinner-container">
          <div className="spinner"></div>
          <div className="spinner-inner"></div>
          <div className="logo-container">
            <Image
              src="/vertical-logo.png"
              alt="iLearn Logo"
              width={150}
              height={50}
              priority
              className="logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
