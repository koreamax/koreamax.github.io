import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { DESIGN_H, DESIGN_W, FLOW_BELOW } from "@/components/fixed-canvas";

/**
 * 첫 페인트 전에 배율을 잡아 둔다. 늦게 잡으면 한 프레임 동안 도면이
 * 창 밖으로 삐져나온 모습이 보인다. 설명은 components/fixed-canvas.ts 참고.
 */
const FIT_SCRIPT = `(function(){var W=${DESIGN_W},H=${DESIGN_H},F=${FLOW_BELOW},d=document.documentElement;
function fit(){var w=d.clientWidth||window.innerWidth;
if(F&&w<F){d.classList.add('flow');d.classList.remove('fixed-canvas');d.style.removeProperty('--z');return;}
var z=w/W;d.classList.add('fixed-canvas');d.classList.remove('flow');
d.style.setProperty('--z',String(z));
d.style.setProperty('--dw',W+'px');
d.style.setProperty('--vw',W/100+'px');
d.style.setProperty('--ch',H/100+'px');
d.style.setProperty('--vh',window.innerHeight/z/100+'px');}
fit();addEventListener('resize',fit);addEventListener('orientationchange',fit);
try{new ResizeObserver(fit).observe(d)}catch(e){}})();`;

export const metadata: Metadata = {
  title: "ABCDE.",
  description: "A부터 E까지 모두 가능한 멀티플레이어 개발자",
  metadataBase: new URL("https://koreamax.github.io"),
  openGraph: {
    title: "ABCDE.",
    description: "A부터 E까지 모두 가능한 멀티플레이어 개발자",
    url: "https://koreamax.github.io",
    siteName: "ABCDE.",
    images: [{ url: "/og-abcde.png", width: 1200, height: 630, alt: "ABCDE." }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ABCDE.",
    description: "A부터 E까지 모두 가능한 멀티플레이어 개발자",
    images: ["/og-abcde.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // 배율 스크립트가 첫 페인트 전에 html 을 건드리므로 경고를 끈다
    <html lang="ko" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css?family=Black+Han+Sans:400" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding:400,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Nanum+Myeongjo:400" rel="stylesheet" />
        <Script id="fit-canvas" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: FIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
