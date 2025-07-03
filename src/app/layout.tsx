import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Provider } from 'react-redux';
import store from '@/redux/store';

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
      <body className={inter.className}>
        <Provider store={store}>
          <AntdRegistry>{children}</AntdRegistry>
        </Provider>
      </body>
    </html>
  );
}
