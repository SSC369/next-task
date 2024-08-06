import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], preload: "false" });

export const metadata = {
  title: "Task App",
  description: "A Task manager app developed with NextJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster reverseOrder={false} position="top-center" />
      </body>
    </html>
  );
}
