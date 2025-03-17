// app/layout.js
import { Jacques_Francois } from 'next/font/google';
import './globals.css';
import React, { ReactNode } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google'


const jacquesFrancois = Jacques_Francois({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Regen Roots',
  description: 'Decentralized platform for regenerative agriculture',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={jacquesFrancois.className}>
        {children}
      </body>

      {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID &&
        process.env.NODE_ENV === "production" && (
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!}
          />
        )}
    </html>
  )
}