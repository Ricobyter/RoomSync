import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/providers";
import { colors } from "@roomsync/design-tokens";
import { buildThemeCss } from "@/lib/theme";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RoomSync — Find your space. Find your people.",
  description:
    "Discover compatible roommates, explore available spaces, and build a home with people who fit your lifestyle.",
};

export const viewport: Viewport = {
  themeColor: colors.neutral.background,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: buildThemeCss() }} />
      </head>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
