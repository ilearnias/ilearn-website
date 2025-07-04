import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import LoadingProvider from "@/components/common/LoadingProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iLearn - Your Path to UPSC Success",
  description:
    "iLearn offers comprehensive UPSC preparation programs including Foundation Course, Optional Subjects, and Interview Guidance. Join us to achieve your IAS dream.",
  alternates: {
    canonical: "https://ilearn.edu",
  },
  openGraph: {
    type: "website",
    title: "iLearn - Your Path to UPSC Success",
    description:
      "iLearn offers comprehensive UPSC preparation programs including Foundation Course, Optional Subjects, and Interview Guidance. Join us to achieve your IAS dream.",
    url: "https://ilearn.edu",
    images: {
      url: "https://ilearn.edu/logo.png",
      alt: "iLearn - Leading UPSC Coaching Institute",
      width: 575,
      height: 275,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "iLearn - Your Path to UPSC Success",
    description:
      "iLearn offers comprehensive UPSC preparation programs including Foundation Course, Optional Subjects, and Interview Guidance. Join us to achieve your IAS dream.",
    creator: "@iLearn",
    images: {
      url: "https://ilearn.edu/logo.png",
      alt: "iLearn - Leading UPSC Coaching Institute",
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
          <LoadingProvider>
            <Header />
            <Providers>
              <main className="min-h-screen">{children}</main>
            </Providers>
            <Footer />
          </LoadingProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
