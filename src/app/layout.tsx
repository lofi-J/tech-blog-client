import { Footer } from "@/shared/components/footer";
import { HeaderNavbar } from "@/shared/components/header-navbar/header-navbar";
import { SearchModal } from "@/shared/components/search-modal/search-modal";
import { ApolloWrapper } from "@/shared/context/apollo-provider";
import { ColorProvider } from "@/shared/context/color-provider";
import { KeymapProvider } from "@/shared/context/keymap-provider";
import { SearchModalProvider } from "@/shared/context/search-modal-provider";
import { ThemeProvider } from "@/shared/context/theme-provider";
import { ZenModeProvider } from "@/shared/context/zen-mode-provider";
import "@/styles/fonts.css";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "lofi-J Tech Blog",
  description: "frontend developer lofi-J's Tech Blog",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ApolloWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ZenModeProvider>
              <ColorProvider>
                <SearchModalProvider>
                  <KeymapProvider>
                    <HeaderNavbar />
                    {children}
                    <Footer />
                    <SearchModal />
                  </KeymapProvider>
                </SearchModalProvider>
              </ColorProvider>
            </ZenModeProvider>
          </ThemeProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
