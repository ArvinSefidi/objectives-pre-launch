import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-night text-marble`}>
          {children}
      </body>
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
