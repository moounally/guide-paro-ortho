import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/lib/i18n";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-display" 
});
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-body" 
});
const jetbrains = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-clinical" 
});
const notoSansArabic = Noto_Sans_Arabic({ 
  subsets: ["arabic"], 
  variable: "--font-arabic",
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "Guide Parodonto-Orthodontique | Zeineb Ounally & Pr. Ines Dallel",
  description: "Impact des dispositifs orthodontiques sur la santé parodontale : aligneurs transparents versus systèmes multi-attaches. Revue systématique PRISMA.",
  openGraph: {
    title: "Guide Parodonto-Orthodontique | Tunisie 2026",
    description: "Plateforme clinique d'évaluation et de décision en parodontologie orthodontique.",
    url: "https://guide-paro-ortho.tn",
    siteName: "Guide Paro-Ortho",
    locale: "fr_TN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guide Paro-Ortho",
    description: "Revue systématique et décision clinique parodontale.",
  },
  manifest: '/manifest.ts',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn(
      playfair.variable, 
      inter.variable, 
      jetbrains.variable, 
      notoSansArabic.variable
    )}>
      <body className="antialiased min-h-screen bg-background text-foreground font-body flex flex-col">
        <I18nProvider>
          <Header />
          <main className="flex-1 flex flex-col w-full">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
