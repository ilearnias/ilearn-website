// ("use client");

import { Merriweather } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoadingProvider from "@/components/common/LoadingProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import LayoutWithConditionalHeaderFooter from "@/components/LayoutWithConditionalHeaderFooter";
// import { usePathname } from "next/navigation";
import Providers from "@/components/Providers";
import { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ClientLayout from "./ClientLayout";
import "./styles.scss";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "",
  description: "",
  alternates: {
    canonical: "",
  },
  openGraph: {
    type: "website",
    title: "",
    description: "",
    url: "",
    images: {
      url: "",
      alt: "",
      width: 575,
      height: 275,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "",
    description: "",
    creator: "",
    images: {
      url: "",
      alt: "",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "Montserrat, Arial, sans-serif" }}>
        <AntdRegistry>
          <ErrorBoundary>
            <LoadingProvider>
              <LayoutWithConditionalHeaderFooter>
                <Providers>
                  <ClientLayout>{children}</ClientLayout>
                </Providers>
              </LayoutWithConditionalHeaderFooter>
            </LoadingProvider>
          </ErrorBoundary>
        </AntdRegistry>
      </body>
    </html>
  );
}
