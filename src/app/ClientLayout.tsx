"use client";

import { usePathname } from "next/navigation";
import LoadingProvider from "@/components/common/LoadingProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "@/components/Providers";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeaderFooter =
    pathname?.includes("/adminlogin") || pathname?.includes("/admin");

  return (
    <Providers>
      <LoadingProvider>
        {!hideHeaderFooter && <Header />}
        {children}
      </LoadingProvider>
    </Providers>
  );
}
