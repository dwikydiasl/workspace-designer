import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
const font = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-main" });
export const metadata: Metadata = {
  title: "Design your workspace",
  description: "Pick a desk, a chair and the extras. See your Bali setup come to life, then rent it.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className={`${font.variable} font-sans antialiased`}>{children}</body></html>);
}
