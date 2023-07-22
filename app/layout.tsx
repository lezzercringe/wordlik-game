import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
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
      <body className={roboto.className + " text-white"}>
        <div className="px-5 ">{children}</div>
      </body>
    </html>
  );
}
