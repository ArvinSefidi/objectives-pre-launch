import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

/**
 * Loads the Inter font from Google with the Latin subset.
 */
const inter = Inter({ subsets: ['latin'] });

/**
 * Root layout component that wraps the entire application with necessary providers.
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child projects to be wrapped.
 * @returns {JSX.Element} The wrapped application structure.
 */
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
  title: 'Objectives, project management made manageable',
  description: 'Objectives helps startups manage objectives, assign issues and coordinate work.',
  keywords: ['Objectives', 'project management', 'issue management', 'agile project management', 'startup project management'],
  authors: [{ name: 'Objectives' }],
  category: "project management",

  // Open Graph metadata
  openGraph: {
    title: 'Objectives - Project Management Made Manageable',
    description: 'Objectives helps startups manage objectives, assign issues and coordinate work.',
    type: 'website',
    url: 'https://objectives.tech', // Add your website URL
    images: [
      {
        url: 'https://objectives.tech/favicon.ico', // may not work
        width: 800,
        height: 600,
        alt: 'Objectives Open Graph Image',
      },
    ],
  },
};

export default RootLayout;
