"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "@/components/Providers";
import { usePathname } from "next/navigation";
import React from "react";

export default function LayoutWithConditionalHeaderFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeaderFooter =
    pathname.startsWith("/admin") || pathname.startsWith("/adminlogin");
  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Providers>
        <main className="min-h-screen">{children}</main>
      </Providers>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
