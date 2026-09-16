import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages(koreamax.github.io)용 정적 내보내기 → `out/` 폴더
  output: "export",
  images: {
    // 정적 내보내기에서는 next/image 최적화 서버가 없으므로 원본 URL 그대로 사용
    unoptimized: true,
  },
};

export default nextConfig;
