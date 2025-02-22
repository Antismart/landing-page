// app/layout.js
import { Jacques_Francois } from 'next/font/google';
import './globals.css';

const jacquesFrancois = Jacques_Francois({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Regen Roots',
  description: 'Decentralized platform for regenerative agriculture',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jacquesFrancois.className}>
      <body>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}