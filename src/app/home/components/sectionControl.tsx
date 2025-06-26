"use client";
import { Button } from "antd";
import React from "react";
import { IoBagOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function SectionControl() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div>
      <div className="Home-row">
        <Button
          size="large"
          className="Home-Btn1"
          icon={<IoBagOutline />}
        >
          {t("Buy_Now")}
        
        </Button>
        <div className="Home-Btn2" onClick={() => router.push("quote")}>
          {t("Request_Quote")}
           {">"}
        </div>
      </div>
    </div>
  );
}
