import type { Metadata } from "next";
import Link from "next/link";
import { Great_Vibes, Spectral } from "next/font/google";
import "../app/globals.css";
import LenisScroll from "../components/LenisScroll";

const brandFont = Great_Vibes({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

const editorial = Spectral({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  variable: "--font-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arey Studio — креативное агентство",
  description:
    "Визуальный идентитет, фестивальный брендинг, афиши и иммерсивный дизайн",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={editorial.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <LenisScroll />

        {/* Header */}
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.04] bg-[#050505]/80 backdrop-blur-2xl">
          <div className="mx-auto flex h-14 md:h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
            <Link
              href="/"
              className={`font-brand text-2xl md:text-3xl text-white hover:text-white/80 transition-colors duration-500 ${brandFont.className}`}
            >
              Arey
            </Link>

            <nav className="flex items-center gap-6 md:gap-10">
              <Link href="/works" className="nav-link">
                Работы
              </Link>
              <Link href="/team" className="nav-link">
                Команда
              </Link>
              <Link href="/contact" className="nav-link">
                Контакты
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="relative z-10 pt-14 md:pt-16">{children}</main>

        {/* Footer */}
        <footer className="relative border-t border-white/[0.04]">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10 md:py-14">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <Link
                  href="/"
                  className={`font-brand text-2xl text-white/60 hover:text-white transition-colors duration-500 ${brandFont.className}`}
                >
                  Arey
                </Link>
                <p className="text-[11px] text-white/15 mt-2 tracking-wide">
                  Креативное агентство · Москва
                </p>
              </div>

              <div className="flex items-center gap-8">
                <Link
                  href="/works"
                  className="text-[11px] uppercase tracking-[0.15em] text-white/20 hover:text-white/50 transition-colors duration-500"
                >
                  Работы
                </Link>
                <Link
                  href="/team"
                  className="text-[11px] uppercase tracking-[0.15em] text-white/20 hover:text-white/50 transition-colors duration-500"
                >
                  Команда
                </Link>
                <Link
                  href="/contact"
                  className="text-[11px] uppercase tracking-[0.15em] text-white/20 hover:text-white/50 transition-colors duration-500"
                >
                  Контакты
                </Link>
              </div>
            </div>

            <div className="mt-8 md:mt-10 pt-6 border-t border-white/[0.03] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="text-[10px] text-white/10 tracking-wide">
                © {new Date().getFullYear()} Arey Studio. Все права защищены.
              </p>
              <a
                href="mailto:annaarey22@yandex.ru"
                className="text-[10px] text-white/15 hover:text-white/30 transition-colors duration-500 tracking-wide"
              >
                annaarey22@yandex.ru
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
