import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import Portfolio from "@/components/portfolio";

// 얼굴 히어로 바로 아래에 오는 스크롤 확장 연출.
// 이 구간에 도달하면 스크롤(휠/터치)에 따라 가운데 미디어가 화면을 채우며 확장되고,
// 완전히 확장된 뒤부터 다시 아래 본문으로 스크롤이 이어진다.
const EXPAND = {
  // Unsplash 스톡 이미지 (원하는 사진으로 교체 가능: "/uploads/파일명" 도 됨)
  media:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
  background:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
  title: "Multiplayer Developer",
  date: "Web/App · AI · Cloud · Embedded",
  scrollToExpand: "Scroll to Expand",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Portfolio
        afterHero={
          <ScrollExpandMedia
            mediaType="image"
            mediaSrc={EXPAND.media}
            bgImageSrc={EXPAND.background}
            title={EXPAND.title}
            date={EXPAND.date}
            scrollToExpand={EXPAND.scrollToExpand}
            textBlend
          />
        }
      />
    </main>
  );
}
