import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";  // Ensure you have your global styles here

// Apply custom fonts (Geist and Geist Mono)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Set metadata for your project
export const metadata: Metadata = {
  title: "Personal Finance Tracker",  // Update the title
  description: "Track and manage your personal finances effectively.",  // Update the description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}  // This will render the content of your pages
      </body>
    </html>
  );
}
