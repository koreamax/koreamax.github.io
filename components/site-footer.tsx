import { Cpu, Layers, ShieldCheck } from "lucide-react";
import { events, quals, type TimelineEvent } from "@/components/portfolio-data";

/**
 * 맨 아래 — 지나온 활동을 갈래별로 한 칸씩 모아 둔다.
 * 칸 안은 events 에 적힌 순서(최근 것부터) 그대로 둔다.
 * 개발과 닿아 있는 것만 싣는다 — 아르바이트·군 복무(Work, Military)는 데이터에만 둔다.
 * 학교 이름은 적지 않는다. 마지막 칸은 자격증 — 발급처 로고를 곁들인다.
 *
 * 모든 줄은 [로고 칸][글] 한 모양이다. 연구실·조교는 학교가 드러나지 않게 로고 대신
 * 과목을 나타내는 그림을 색 칸에 넣는다 — 옆 칸 로고처럼 색이 있어 튀지 않고,
 * 무엇을 했는지도 한눈에 읽힌다. 칸 크기가 같아 네 칸의 글이 한 선에서 시작한다.
 */

/** 로고 대신 넣는 과목 그림과 칸 색 */
const GLYPH: Record<string, { Icon: typeof Cpu; color: string }> = {
  "IoT Microprocessor 강의 조교": { Icon: Cpu, color: "#10b981" },
  "Computer Architecture 강의 조교": { Icon: Layers, color: "#3b82f6" },
  "CSDC LAB 학부연구생": { Icon: ShieldCheck, color: "#8b5cf6" },
};
const COLUMNS: { label: string; kinds: string[] }[] = [
  { label: "Program", kinds: ["Program"] },
  { label: "Community", kinds: ["Community"] },
  { label: "Research · TA", kinds: ["Research", "TA"] },
];

const SOCIALS = [
  {
    href: "https://github.com/koreamax",
    label: "GitHub",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    href: "https://velog.io/@koreamax01/posts",
    label: "Velog",
    icon: <b className="ft-v">V</b>,
  },
  {
    href: "https://www.linkedin.com/in/koreamax",
    label: "LinkedIn",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

/** 로고 칸 — 오른쪽 아래 점이 진행 중(초록)·종료(빨강)를 알린다 */
function Mark({ e }: { e: TimelineEvent }) {
  const glyph = GLYPH[e.title];
  return (
    <span className={`ft-logo ${e.logo ? "is-fill" : "is-glyph"}`} style={glyph && { background: glyph.color }}>
      {e.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={e.logo} alt="" />
      ) : (
        glyph && <glyph.Icon size={20} strokeWidth={1.8} aria-hidden />
      )}
      <i className={`ft-dot ${e.ongoing ? "is-on" : ""}`} aria-label={e.ongoing ? "진행 중" : "종료"} />
    </span>
  );
}

function Entry({ e }: { e: TimelineEvent }) {
  return (
    <li className="ft-row">
      <Mark e={e} />
      <span className="ft-item">
        <span className="ft-title">{e.title}</span>
        {e.sub && <span className="ft-sub">{e.sub}</span>}
        <span className="ft-date">{e.date}</span>
      </span>
    </li>
  );
}

export default function SiteFooter() {
  return (
    <footer id="contact" className="ft">
      <div className="ft-in">
        <div className="ft-cols">
          {COLUMNS.map((col) => (
            <div key={col.label}>
              <p className="ft-label">{col.label}</p>
              <ul className="ft-list">
                {events
                  .filter((e) => col.kinds.includes(e.kind))
                  .map((e) => (
                    <Entry key={e.title} e={e} />
                  ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="ft-label">Certification</p>
            <ul className="ft-list">
              {quals.map((q) => (
                <li key={q.title} className="ft-row">
                  <span className="ft-logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={q.logo} alt="" />
                  </span>
                  <span className="ft-item">
                    <span className="ft-title">{q.title}</span>
                    <span className="ft-sub">{q.org}</span>
                    <span className="ft-date">{q.date}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ft-bar">
          <div className="ft-socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="ft-social" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
          <span className="ft-copy">
            <b className="ft-name">
              이민형<span>.</span>
            </b>
            © 2026 Minhyung Lee. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
