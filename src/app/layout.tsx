import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Inter, Open_Sans } from 'next/font/google'
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Header } from "./_components/Header";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-opensans',
})

export const metadata: Metadata = {
  title: "Jupiter Draft",
  description: "A simple note-taking app", 
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${inter.variable} ${openSans.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body>
        <TRPCReactProvider>
          <Header />
          {children}</TRPCReactProvider>
      </body>
    </html>
  );
}
