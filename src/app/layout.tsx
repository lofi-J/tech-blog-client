import { Footer } from "@/shared/components/footer";
import { HeaderNavbar } from "@/shared/components/header-banner/header-navbar";
import { ThemeProvider } from "@/shared/context/theme-provider";
import { ApolloWrapper } from "@/shared/providers/apollo-provider";
import "@/styles/fonts.css";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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
            <HeaderNavbar />
            {children}
            <Footer />
          </ThemeProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
