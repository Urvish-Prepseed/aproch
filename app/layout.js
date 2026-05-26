import { Inter, Lora } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata = {
  title: {
    default: "APROCH — A Protagonist in Every Child",
    template: "%s | APROCH",
  },
  description:
    "Connects donors, institutions, and communities through a clean, accessible platform showcasing child-friendly initiatives, events, and impact stories.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
