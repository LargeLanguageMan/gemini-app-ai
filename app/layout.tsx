import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from 'next/script';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

//export const metadata: Metadata = {
//  title: "Sadbob",
//  description: "Meet Sadbob - A Google Gemini AI wrapper",
//};


export const metadata: Metadata = {
  title: 'Sadbob',
  description: 'Meet Sadbob - A Google Gemini AI wrapper',
  openGraph: {
    title: 'Sadbob',
    description: 'Meet Sadbob - A Google Gemini AI wrapper',
    url: 'https://sadbob.aiprojectlabs.com', // Replace with your actual domain
    siteName: 'Sadbob',
    images: [
      {
        url: '/images/background.webp', // Or use absolute URL
        width: 800,
        height: 600,
        alt: 'Sadbob Background',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sadbob',
    description: 'Meet Sadbob - A Google Gemini AI wrapper',
    images: ['/images/background.png'], // Or use absolute URL
  },
  icons: {
    icon: '/favicon.ico',
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

        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-29H3KSNVGS"></Script>
        
        <Script id="google-analytics">
          {
            `

          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-29H3KSNVGS');

          `
          }



        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
