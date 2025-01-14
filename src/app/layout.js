import { Inter } from "next/font/google";

import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className} bg-[#0B0B50]`}>{children}</body>
      </AuthProvider>
    </html>
  );
}
