import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/entities/profile/model";
import { Container } from "@/shared/ui/Container";
import { Header } from "@/widgets/header/Header";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ibmPlexMono.variable}>
      <body className="bg-canvas text-ink antialiased font-mono min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Container>{children}</Container>
        </main>
      </body>
    </html>
  );
}
