import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import Portfolio from "@/components/portfolio";

// 최상단 인트로: 스크롤(휠/터치)하면 가운데 미디어가 화면을 채우며 확장되고,
// 완전히 확장된 뒤부터 아래 포트폴리오 본문으로 스크롤이 이어진다.
const INTRO = {
  // Unsplash 스톡 이미지 (원하는 사진으로 교체 가능: /public 경로도 됨)
  media:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
  background:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
  title: "이민형 멀티플레이어 개발자",
  date: "Web/App · AI · Cloud · Embedded",
  scrollToExpand: "Scroll to Expand",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={INTRO.media}
        bgImageSrc={INTRO.background}
        title={INTRO.title}
        date={INTRO.date}
        scrollToExpand={INTRO.scrollToExpand}
        textBlend
      />
      <Portfolio />
    </main>
  );
}
