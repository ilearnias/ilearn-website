"use client";

import Image from "next/image";
import "./LoadingSpinner.scss";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner">
        <Image
          src="/vertical-logo.png"
          alt="iLearn Loading"
          width={120}
          height={120}
          className="loading-logo"
          priority
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
