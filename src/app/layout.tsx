import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pet-care-guides.vercel.app"),
  title: { default: "Pet Care Guides | Happy Pets, Happy Life 2026", template: "%s | Pet Care Guides" },
  description: "Expert pet care guides: nutrition, training, health, grooming for dogs, cats, fish, and small pets.",
  keywords: ["pet care","dog care","cat care","pet nutrition","pet health","pet training"],
  openGraph: { type: "website", siteName: "Pet Care Guides", title: "Pet Care Guides | Expert Pet Advice", description: "Care for your best friend with expert guides." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6600381860016497" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#1A0F14]/90 border-b border-rose-900/20">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">🐾</span>
              <span className="text-xl font-extrabold text-rose-100">PetCare</span>
            </a>
            <nav className="flex gap-8 text-sm font-semibold">
              <a href="/" className="text-rose-300/60 hover:text-rose-300 transition-colors">Home</a>
              <a href="/articles" className="text-rose-300/60 hover:text-rose-300 transition-colors">Guides</a>
              <a href="/#categories" className="text-rose-300/60 hover:text-rose-300 transition-colors">Topics</a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-rose-900/20 bg-[#12080D] py-12 mt-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-rose-200 font-extrabold text-lg mb-1">🐾 PetCare Guides</p>
            <p className="text-rose-700 text-sm mb-4">Because they deserve the best.</p>
            <div className="flex justify-center gap-6 text-sm text-rose-700">
              <a href="/privacy" className="hover:text-rose-400">Privacy</a>
              <a href="/terms" className="hover:text-rose-400">Terms</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
