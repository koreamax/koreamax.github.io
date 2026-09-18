import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "이민형 · BACE",
  description:
    "Backend · AI · Cloud · Embedded — 네 영역을 모두 아우르는 멀티플레이어 개발자 이민형의 포트폴리오",
  metadataBase: new URL("https://koreamax.github.io"),
  openGraph: {
    title: "BACE — 이민형",
    description: "Backend · AI · Cloud · Embedded. 멀티플레이어 개발자 이민형의 포트폴리오",
    url: "https://koreamax.github.io",
    siteName: "BACE",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BACE" }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BACE — 이민형",
    description: "Backend · AI · Cloud · Embedded. 멀티플레이어 개발자 이민형의 포트폴리오",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css?family=Black+Han+Sans:400" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding:400,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Nanum+Myeongjo:400" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
