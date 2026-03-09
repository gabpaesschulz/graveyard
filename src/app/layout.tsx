import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { CommandPaletteDynamic as CommandPalette } from "@/components/command-palette-dynamic";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Graveyard — Projetos mortos. Lições vivas.",
    template: "%s | Graveyard",
  },
  description:
    "Um memorial digital para projetos que não chegaram lá. Documente o que morreu, preserve o que ensinou, identifique o que pode renascer.",
  keywords: [
    "projetos mortos",
    "side projects",
    "indie hacker",
    "memorial digital",
    "graveyard",
    "obituário",
    "projeto abandonado",
  ],
  authors: [{ name: "Graveyard" }],
  creator: "Graveyard",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://graveyard.app",
    title: "Graveyard — Projetos mortos. Lições vivas.",
    description:
      "Um memorial digital para projetos que não chegaram lá. Documente o que morreu, preserve o que ensinou, identifique o que pode renascer.",
    siteName: "Graveyard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Graveyard — Projetos mortos. Lições vivas.",
    description:
      "Um memorial digital para projetos que não chegaram lá. Documente o que morreu, preserve o que ensinou, identifique o que pode renascer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <SiteNav />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
          <CommandPalette />
          <Toaster
            theme="dark"
            toastOptions={{
              style: {
                background: "hsl(260, 16%, 8%)",
                border: "1px solid hsl(260, 12%, 18%)",
                color: "#f0ece3",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
