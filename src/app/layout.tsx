import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "شيف فرجاني | سلطان البط البلدي ومتبلات المشاوي الفاخرة",
  description: "سر تتبيلة زمان.. جاهز على نارك في دقايق! دكر بط بلدي متبل روستو ومحشي، كفتة حاتي، طرب بلدي، وشيش طاووق بتغليف فاكيوم معقم وتوصيل مبرد لباب بيتك.",
  keywords: ["شيف فرجاني", "بط بلدي متبل", "كفتة حاتي", "طرب بلدي", "مشاوي جاهزة", "لحوم متبلة", "توصيل لحوم القاهرة", "عزومات"],
  openGraph: {
    title: "شيف فرجاني - متبلات اللحوم والبط البلدي الفاخر",
    description: "سر تتبيلة زمان.. جاهز على نارك في دقايق! تذوق أشهى بط بلدي متبل روستو ومشاوي جاهزة للتسوية الفورية.",
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-stone-900 font-sans selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
