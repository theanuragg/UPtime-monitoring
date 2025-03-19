import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs'
import { Appbar } from "../components/Appbar";
import { ThemeProvider } from "../components/ThemeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});


export const metadata: Metadata = {
  title: "uptime monitring",
  description: "uptime monitoring let's show your statics of your website "
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <ClerkProvider>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider defaultTheme="light" attribute="class" forcedTheme="light">
        <Appbar/>
        {children}
        </ThemeProvider>
      </body>
      </ClerkProvider>
    </html>
  );
}
