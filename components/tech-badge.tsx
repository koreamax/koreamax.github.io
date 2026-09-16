import type { ComponentType, CSSProperties } from "react";
import {
  BookOpen,
  Boxes,
  Brain,
  Cloud,
  CloudCog,
  CloudUpload,
  Database,
  Eye,
  MessageSquare,
  Radar,
  ScanText,
} from "lucide-react";
import {
  siBlender,
  siCplusplus,
  siDocker,
  siFastapi,
  siFigma,
  siFlutter,
  siGit,
  siGithub,
  siGithubactions,
  siGooglecloud,
  siKubernetes,
  siLangchain,
  siMysql,
  siNodedotjs,
  siNotion,
  siNvidia,
  siOpencv,
  siOpensearch,
  siPostgresql,
  siPytorch,
  siRaspberrypi,
  siReact,
  siRedis,
  siRos,
  siSpringboot,
  siTerraform,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";

/* 기술 이름 → 브랜드 색 + 아이콘. simple-icons 에 있는 것은 공식 로고/색,
   없는 것은 lucide 아이콘 + 어울리는 색으로 대체. */
type Brand = { hex: string; si?: SimpleIcon; lucide?: ComponentType<{ size?: number; strokeWidth?: number }> };

const BRANDS: Record<string, Brand> = {
  "Spring Boot": { hex: siSpringboot.hex, si: siSpringboot },
  FastAPI: { hex: siFastapi.hex, si: siFastapi },
  "Node.js": { hex: siNodedotjs.hex, si: siNodedotjs },
  MySQL: { hex: siMysql.hex, si: siMysql },
  PostgreSQL: { hex: siPostgresql.hex, si: siPostgresql },
  Redis: { hex: siRedis.hex, si: siRedis },
  React: { hex: siReact.hex, si: siReact },
  "Vue.js": { hex: siVuedotjs.hex, si: siVuedotjs },
  Flutter: { hex: siFlutter.hex, si: siFlutter },
  PyTorch: { hex: siPytorch.hex, si: siPytorch },
  OpenCV: { hex: siOpencv.hex, si: siOpencv },
  OCR: { hex: "1F6FEB", lucide: ScanText },
  LLM: { hex: "8B5CF6", lucide: Brain },
  VLM: { hex: "DB2777", lucide: Eye },
  LangChain: { hex: "1C3C3C", si: siLangchain },
  RAG: { hex: "0891B2", lucide: BookOpen },
  ChromaDB: { hex: "F97316", lucide: Database },
  OpenSearch: { hex: siOpensearch.hex, si: siOpensearch },
  AWS: { hex: "FF9900", lucide: Cloud },
  Azure: { hex: "0078D4", lucide: CloudCog },
  GCP: { hex: siGooglecloud.hex, si: siGooglecloud },
  "NHN Cloud": { hex: "1E53E5", lucide: CloudUpload },
  Terraform: { hex: siTerraform.hex, si: siTerraform },
  Docker: { hex: siDocker.hex, si: siDocker },
  Kubernetes: { hex: siKubernetes.hex, si: siKubernetes },
  "GitHub Actions": { hex: siGithubactions.hex, si: siGithubactions },
  "C/C++": { hex: siCplusplus.hex, si: siCplusplus },
  "Raspberry Pi": { hex: siRaspberrypi.hex, si: siRaspberrypi },
  "NVIDIA Jetson": { hex: siNvidia.hex, si: siNvidia },
  ROS2: { hex: siRos.hex, si: siRos },
  LiDAR: { hex: "0F766E", lucide: Radar },
  "Digital Twin": { hex: "6D28D9", lucide: Boxes },
  Git: { hex: siGit.hex, si: siGit },
  GitHub: { hex: "24292F", si: siGithub },
  Notion: { hex: "000000", si: siNotion },
  Slack: { hex: "4A154B", lucide: MessageSquare },
  Figma: { hex: siFigma.hex, si: siFigma },
  Blender: { hex: siBlender.hex, si: siBlender },
};

/** 배경색 밝기에 따라 글자색을 흰색/검정으로 고른다 */
function textOn(hex: string): string {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.62 ? "#111111" : "#ffffff";
}

export default function TechBadge({ name }: { name: string }) {
  const brand = BRANDS[name];
  const hex = brand?.hex ?? "3F3F46";
  const fg = textOn(hex);
  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 28,
    padding: "0 10px",
    borderRadius: 6,
    background: `#${hex}`,
    color: fg,
    fontSize: 11.5,
    fontWeight: 700,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    boxShadow: "0 1px 0 rgba(255,255,255,0.08) inset, 0 2px 8px rgba(0,0,0,0.35)",
  };
  return (
    <span style={style} title={name}>
      {brand?.si ? (
        <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" aria-hidden>
          <path d={brand.si.path} />
        </svg>
      ) : brand?.lucide ? (
        <brand.lucide size={14} strokeWidth={2.5} />
      ) : null}
      {name}
    </span>
  );
}
