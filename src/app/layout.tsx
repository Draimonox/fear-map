import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export const metadata: Metadata = {
  title: "Fear map",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider forceColorScheme="dark">{children}</MantineProvider>
      </body>
    </html>
  );
}
