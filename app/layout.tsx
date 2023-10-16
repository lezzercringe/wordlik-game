import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Wordlik game",
  description: "Simple word guessing game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " text-white bg-gray-700"}>
        <div className="px-5 ">{children}</div>
      </body>
    </html>
  );
}
