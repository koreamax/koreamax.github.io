import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "이민형 · 멀티플레이어 개발자",
  description:
    "Web/App부터 AI, Cloud, Embedded까지 모두를 아우를 수 있는 이 시대의 멀티플레이어 개발자 이민형의 포트폴리오",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Black+Han+Sans:400"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding:400,700"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Nanum+Myeongjo:400"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
