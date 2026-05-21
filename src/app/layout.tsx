import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { gamesList } from "@/data/games";
import type { ReactNode } from "react";
import "./globals.css"

const description =
  "DolphinSpooferV1 is the best free skin changer and spoofer for roblox rivals!";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: {
    default: "DolphinV1",
    template: "%s | DolphinV1",
  },
  description: description,
  openGraph: {
    description: description,
    images: "https://ibb.co/Fbr0FVty",
  },
  keywords: [
    "DolphinV1",
    "roblox",
    "rivals skin change script",
    "rivals best script",
    "working script rivals",
    "2025",
    "2026",
    "roblox rivals",
    ...gamesList,
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>

      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
          <Analytics />
        </ThemeProvider>
      </body>
      <head>
  <link rel="icon" href="/icon.png" type="image/png" />
  <link rel="shortcut icon" href="/icon.png" type="image/png" />
  <link rel="apple-touch-icon" href="/icon.png" />
</head>
    </html>
  );
}