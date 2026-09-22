const fs=require("fs");
/* 1) 데이터 — 새 파일로, 창틀 제목은 더 안 쓴다 */
let d=fs.readFileSync("components/portfolio-data.ts","utf8");
const ds=(a,b)=>{if(!d.includes(a))throw new Error("데이터 못 찾음: "+a.slice(0,60));d=d.replace(a,b);};
ds(`  arch?: {
    /** 구조도 그림 */
    src: string;
    /** 창 제목 줄 */
    label: string;
    /** 그림을 못 보는 사람을 위한 한 줄 */
    caption: string;
  };`,
`  arch?: {
    /** 구조도 그림 */
    src: string;
    /** 그림을 못 보는 사람을 위한 한 줄 */
    caption: string;
  };`);
ds(`        arch: {
          label: "wilson — architecture",
          caption:`,
`        arch: {
          caption:`);
ds(`          src: "/uploads/wilson-arch.png",`, `          src: "/uploads/wilson-arch.webp",`);
fs.writeFileSync("components/portfolio-data.ts",d);

/* 2) 왼쪽 판 — 맥 창틀을 걷고 그림만 남긴다 */
let s=fs.readFileSync("components/project-scenes.tsx","utf8");
const a=s.indexOf(`/** 구조도 한 장. 창틀에 얹어야`);
const b=s.indexOf(`/** 한글은 두 칸, 나머지는 한 칸`);
if(a<0||b<0) throw new Error("ArchShot 못 찾음");
s = s.slice(0,a) + `/** 구조도 한 장. 그림 자체가 이미 한 장의 도면이라 창틀을 씌우지 않는다 */
function ArchShot({ arch }: { arch: NonNullable<CategoryItem["arch"]> }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className="pw-arch pw-arch-ph">architecture</span>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="pw-arch"
      src={arch.src}
      alt={arch.caption}
      /* 하이드레이션 전에 이미 실패한 그림은 onError 가 오지 않는다 */
      ref={(el) => {
        if (el?.complete && el.naturalWidth === 0) setFailed(true);
      }}
      onError={() => setFailed(true)}
    />
  );
}

` + s.slice(b);

/* 3) 위에서 아래로 차례차례 — 겹치지 않게 간격을 벌린다 */
s = s.split("CODE_HOLD + 0.1 * step++").join("CODE_HOLD + 0.26 * step++");
s = s.replace("const DUR = 1000 + chars.length * 12;", "const DUR = 800 + chars.length * 9;");
fs.writeFileSync("components/project-scenes.tsx",s);
console.log("ok");
