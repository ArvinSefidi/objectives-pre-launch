import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-inter bg-black min-h-screen`}>{children}</body>
    </html>
  );
};

export const metadata: Metadata = {
  title: 'Objectives, never ship a bug again',
  description: 'Objectives is a comprehensive quality assurance tool that helps you catch bugs before your users do.',
  keywords: ['Objectives', 'quality assurance', 'QA testing', 'automation', 'ai code testing', 'visual regression testing', 'testing', 'selenium','frontend testing', 'backend testing', 'full stack testing', 'stably'],
  authors: [{ name: 'Objectives' }],
  category: "quality assurance",

  // Open Graph metadata
  openGraph: {
    title: 'Objectives: never ship a bug again',
    description: 'Objectives is a comprehensive quality assurance tool that helps you catch bugs before your users do.',
    type: 'website',
    url: 'https://objectives.tech', 
    images: [
      {
        url: 'https://objectives.tech/favicon.ico', 
        width: 800,
        height: 600,
        alt: 'Objectives Open Graph Image',
      },
    ],
  },
};
export default RootLayout;

