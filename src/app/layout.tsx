import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoadingProvider from "@/components/common/LoadingProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "@/components/Providers"; 
import { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prism International Solutions WLL",
  description:
    "Prism Networks Trading Company I Best networking solution in Riyadh, Saudi Arabia I Networking Solutions in Saudi Arabia I Wireless Solutions Riyadh, Saudi Arabia I Cybersecurity Solutions Provider In Saudi Arabia",
  alternates: {
    canonical: "https://connect.com.sa",
  },
  openGraph: {
    type: "website",
    title: "Prism International Solutions WLL",
    description:
      "Prism Networks Trading Company I Best networking solution in Riyadh, Saudi Arabia I Networking Solutions in Saudi Arabia I Wireless Solutions Riyadh, Saudi Arabia I Cybersecurity Solutions Provider In Saudi Arabia",
    url: "https://connect.com.sa",
    images: {
      url: "https://connect.com.sa/logo.png",
      alt: "Prism - Leading technology distributor of data and telecommunication products",
      width: 575,
      height: 275,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Prism International Solutions WLL",
    description:
      "Prism Networks Trading Company I Best networking solution in Riyadh, Saudi Arabia I Networking Solutions in Saudi Arabia I Wireless Solutions Riyadh, Saudi Arabia I Cybersecurity Solutions Provider In Saudi Arabia",
    creator: "@Suprabhaatham",
    images: {
      url: "https://connect.com.sa/logo.png",
      alt: "Prism - Leading technology distributor of data and telecommunication products",
      width: 575,
      height: 275,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
        <AntdRegistry>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
