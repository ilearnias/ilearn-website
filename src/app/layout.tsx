'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import LoadingProvider from "@/components/common/LoadingProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "@/components/Providers";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname?.includes('/adminlogin') || pathname?.includes('/admin');

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
            {!hideHeaderFooter && <Header />}
            <Providers>
              <main className="min-h-screen">{children}</main>
            </Providers>
            {!hideHeaderFooter && <Footer />}
          </LoadingProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
