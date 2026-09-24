import { awards, events, quals, skills } from "@/components/portfolio-data";

/**
 * 이력서 한 장 — Claude Design 의 Resume.dc.html 틀에 이력서 작성 원칙을 얹었다.
 *
 *  - 이름 아래에서 바로 신입이라는 것과 한눈에 보이는 경력을 밝힌다.
 *  - 자기소개는 믿을 수 있는 사실(수상 · 활동 · 만든 것)과 링크로만 쓴다.
 *  - 프로필 바로 아래, 뜬금없는 자리에 깊게 쓴 블로그 글 하나를 건다.
 *  - 프로젝트는 세 개, 한 개에 예닐곱 줄. 위에서부터 "도메인 · 문제 · 해결 · 결과"가
 *    다 들어간 문제 해결 줄, 그다음 구현 줄(무엇을 해서 무엇이 좋아졌는지), 맨 아래 곁가지 역할.
 *  - 활동 · 수상 · 자격증은 맨 아래 한 띠에 가볍게 모은다.
 *
 * 학교 이름과 아르바이트 · 군 복무(Work, Military)는 푸터와 같은 규칙으로 싣지 않는다.
 */

const EMAIL = "koreamax012@gmail.com";

const LINKS = [
  {
    href: "https://www.linkedin.com/in/koreamax",
    label: "LinkedIn",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/koreamax",
    label: "GitHub",
    icon: (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
  },
  {
    href: "https://velog.io/@koreamax01/posts",
    label: "velog",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M7.2 8.4c.9-.3 1.7-.2 2 .9l1.5 5.6c1.9-2 3.4-4.5 3.4-6 0-.5-.2-.8-.5-1h2.6c.3.3.4.7.4 1.2 0 2.4-2.6 6-5.4 8.4H9.3L7.8 10c-.1-.5-.3-.7-.6-.8z" fill="#171719" />
      </svg>
    ),
  },
];

/** 프로필 바로 아래 거는 글 한 편 — 더 깊게 쓴 글이 생기면 이것만 바꾼다 */
const BLOG = {
  title: "외부에서 트래픽이 들어올 때 처리방법 (ALB, Auto Scaling)",
  href: "https://velog.io/@koreamax01/" + encodeURIComponent("외부에서-트래픽이-들어올-때-처리방법ALB-Auto-Scailing"),
  note: "요청이 몰릴 때 ALB가 트래픽을 나누고 Auto Scaling이 인스턴스를 늘리는 과정을 직접 구성하며 정리",
};

/** 한 줄 = 무엇에서(도메인) + 무엇이 깨졌고 어떻게 고쳤는지 + 그래서 무엇이 달라졌는지(결과).
 *  body 는 domain 바로 뒤에 붙는다 — 조사로 이어지면 그대로, 새 말이면 앞에 빈칸을 둔다. */
type Line = { domain: string; body: string; result: string };

type Project = {
  num: string;
  title: string;
  what: string;
  field: string;
  badge?: string;
  stack: string[];
  repo: string;
  solved: Line[];
  built: Line[];
  side?: string;
};

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "Wilson",
    what: "치매 노인을 위한 말벗 챗봇",
    field: "Backend & Cloud",
    stack: ["Spring Boot", "gRPC", "EKS", "RDS", "Redis", "SQS", "S3"],
    repo: "https://github.com/koreamax/wilson_chatbot",
    solved: [
      { domain: "AI 대화 gRPC 채널", body: " 유휴 끊김으로 첫 발화 실패 문제 발생 및 keepAlive PING 30s · idleTimeout 5분 적용으로", result: "첫 턴 실패 제거" },
      { domain: "DB 커넥션 풀", body: " 새벽 유휴 뒤 닫힌 연결로 아침 첫 요청 실패 발생 및 max-lifetime 9분 · 2분 주기 keepalive 검증으로", result: "첫 요청 실패 제거" },
      { domain: "치매 음성 분석", body: "이 대화 응답을 붙잡는 문제 발생 및 SQS 비동기 워커 분리로", result: "응답 즉시 반환, 분석 누락 없이 처리" },
      { domain: "STT · TTS 오디오 전송", body: "의 NAT 경유 비용 증가 문제 발생 및 S3 게이트웨이 엔드포인트 적용으로", result: "NAT 처리 요금 · 경유 구간 제거" },
    ],
    built: [
      { domain: "gRPC 기반 AI 서비스 연동", body: "(오케스트레이터 · RAG · Ollama · STT/TTS) 구현 및", result: "앱 서버와 AI 추론 분리" },
    ],
    side: "인프라 — EKS · RDS · Redis · S3 · SQS 구성",
  },
  {
    num: "02",
    title: "WalkingCity",
    what: "동대문구 주민 취향 맞춤 산책 경로 추천",
    field: "AI & Cloud",
    badge: "2025 K-HTML 해커톤 동대문구청장상",
    stack: ["Spring Boot", "AWS Bedrock", "Lambda", "OpenSearch", "EC2", "GitHub Actions"],
    repo: "https://github.com/koreamax/walk_web",
    solved: [
      { domain: "경로 추천 API", body: "의 Bedrock 동기 호출로 지도 · 로그인까지 지연 발생 및 추천 Lambda 분리로", result: "추천 부하와 무관하게 일반 API 응답 유지" },
      { domain: "추천 프롬프트", body: "에 공공데이터 전체를 넣어 토큰 · 지연 증가 발생 및 Titan 임베딩 + OpenSearch 상위 5건 검색 적용으로", result: "호출당 토큰 일정" },
      { domain: "날씨 반영", body: " 부재로 비 오는 날 강변 코스 추천 발생 및 예보 Lambda를 에이전트 액션 그룹으로 등록해", result: "필요할 때만 실시간 조회" },
      { domain: "배포", body: " 시 SSH 수동 빌드로 환경 차이 실패 · 서비스 중단 발생 및 GitHub Actions → ECR → EC2 컨테이너 교체로", result: "빌드 환경 고정, SHA 태그 롤백" },
    ],
    built: [
      { domain: "Bedrock 에이전트(Claude Sonnet) 추천", body: " 구현 및", result: "추천 경로와 그 이유까지 함께 제시" },
    ],
  },
  {
    num: "03",
    title: "VIAssist",
    what: "시각장애인 보행 보조 웨어러블 (한이음)",
    field: "Embedded & AI",
    stack: ["NVIDIA Jetson", "YOLO", "Optical Flow", "VLM", "TTS", "C/C++"],
    repo: "https://github.com/koreamax/VIAssist_Total",
    solved: [
      { domain: "온디바이스 추론", body: " 보행 10분 뒤 발열 스로틀링으로 안내 끊김 발생 및 전력 모드 고정 · 온도 기반 주기 조절로", result: "검출 15fps 유지, 안내 지속" },
      { domain: "안내 파이프라인", body: "이 가장 느린 VLM에 묶여 지연 발생 및 단계별 독립 루프 + 최신 1프레임 버퍼로", result: "검출은 카메라 속도, 안내는 최신 장면 기준" },
      { domain: "음성 안내 문장", body: "이 검출 결과 전부를 나열하는 문제 발생 및 진행 경로 · 4m 이내 가까운 순 정렬로", result: "피할 대상만 한 마디로 안내" },
      { domain: "접근 물체 경고", body: " 시 정지 · 접근 물체 미구분 발생 및 광학 흐름 접근 속도 + TTC 추정으로", result: "필요한 순간에만 경고" },
    ],
    built: [
      { domain: "Jetson Orin Nano Super 한 대에", body: " 검출 · 흐름 추정 · VLM · TTS 탑재 구현 및", result: "서버 없이 보드 안에서 안내 완결" },
    ],
  },
];

/** 맨 아래 띠 — 날짜 · 이름 · 자리 한 줄씩 */
type Mini = { date: string; title: string; sub?: string };

const activities: Mini[] = events
  .filter((e) => ["Program", "Community", "Research", "TA"].includes(e.kind))
  .map((e) => ({ date: e.date, title: e.title, sub: e.sub }));
const awardList: Mini[] = awards.map((a) => ({ date: a.date, title: a.prize, sub: a.title }));
const certList: Mini[] = quals.map((q) => ({ date: q.date, title: q.title, sub: q.org }));

/** 이름 아래 한눈에 보이는 경력 — 전부 데이터에서 센다 */
const research = events.find((e) => e.kind === "Research");
const taCount = events.filter((e) => e.kind === "TA").length;
const AT_A_GLANCE = [
  "신입",
  research && `학부연구생 ${research.date}`,
  `강의 조교 ${taCount}회`,
  `수상 ${awards.length}회`,
  `자격증 ${quals.length}개`,
].filter(Boolean) as string[];

function Heading({ children, size = 28 }: { children: React.ReactNode; size?: number }) {
  return (
    <div className="rs-heading">
      <h2 style={{ fontSize: size }}>{children}</h2>
      <div className="rs-bar" />
    </div>
  );
}

function LineItem({ l }: { l: Line }) {
  return (
    <li>
      <b>{l.domain}</b>
      {l.body} <em>{l.result}</em>
    </li>
  );
}

function MiniList({ title, items }: { title: string; items: Mini[] }) {
  return (
    <div className="rs-band-col">
      <Heading size={22}>{title}</Heading>
      <ul className="rs-mini">
        {items.map((m) => (
          <li key={m.title + m.date}>
            <span className="rs-date">{m.date}</span>
            <span className="rs-mini-title">{m.title}</span>
            {m.sub && <span className="rs-sub">{m.sub}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Resume() {
  return (
    <div className="rs">
      <div className="rs-sheet" data-screen-label="Resume">
        <aside className="rs-aside">
          <div className="rs-aside-top">
            <h1 className="rs-name">이민형</h1>
            <p className="rs-role">신입 개발자<br />AI & Cloud · Backend</p>
            <div className="rs-bar rs-bar-48" />
            <div className="rs-links">
              {LINKS.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.icon}
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div className="rs-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/uploads/profile.webp" alt="이민형 프로필 사진" />
          </div>

          <div className="rs-aside-bottom">
            <Heading size={24}>Contact</Heading>
            <div className="rs-contact">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <div>
                <span className="rs-contact-label">Email</span>
                <a className="rs-contact-value" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </div>
          </div>

          <div className="rs-aside-bottom rs-skills">
            <Heading size={24}>Skills</Heading>
            {skills.map((s) => (
              <div key={s.area} className="rs-skill">
                <span className="rs-skill-area">{s.area}</span>
                <span className="rs-skill-items">{s.items.join(" · ")}</span>
              </div>
            ))}
          </div>
        </aside>

        <main className="rs-main">
          <section className="rs-section rs-section-tight">
            <Heading>Profile</Heading>
            <ul className="rs-glance">
              {AT_A_GLANCE.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <p className="rs-lead">
              AI · Backend · Cloud · Embedded 네 분야에서 직접 만든 프로젝트가 있습니다 — EKS 위 AI 말벗 챗봇,
              Bedrock 산책 경로 추천, Jetson 보행 보조 웨어러블. SKT FLY AI CHALLENGER 9기에서 개인 최우수상과
              프로젝트 부문 SK텔레콤 대표이사상을 받았고, AWS Student Builder Groups 1기 Core Member로 커뮤니티를
              운영하고 있습니다. 코드는{" "}
              <a className="rs-inline" href="https://github.com/koreamax" target="_blank" rel="noopener noreferrer">GitHub</a>
              에, 공부한 내용은{" "}
              <a className="rs-inline" href="https://velog.io/@koreamax01/posts" target="_blank" rel="noopener noreferrer">Velog</a>
              에 남깁니다.
            </p>
          </section>

          <a className="rs-blog" href={BLOG.href} target="_blank" rel="noopener noreferrer">
            <span className="rs-blog-label">Blog</span>
            <span className="rs-blog-title">{BLOG.title}</span>
            <span className="rs-blog-note">{BLOG.note}</span>
            <span className="rs-blog-go" aria-hidden>→</span>
          </a>

          <section className="rs-section">
            <Heading>Projects</Heading>
            {PROJECTS.map((p) => (
              <article key={p.title} className="rs-project">
                <div className="rs-project-head">
                  <span className="rs-card-num">{p.num}</span>
                  <a className="rs-card-title" href={p.repo} target="_blank" rel="noopener noreferrer">
                    {p.title}
                  </a>
                  <span className="rs-sub">{p.what} · {p.field}</span>
                  {p.badge && <span className="rs-badge">{p.badge}</span>}
                </div>
                <ul className="rs-lines">
                  {p.solved.map((l) => (
                    <LineItem key={l.domain} l={l} />
                  ))}
                  {p.built.map((l) => (
                    <LineItem key={l.domain} l={l} />
                  ))}
                  {p.side && <li className="rs-side">{p.side}</li>}
                </ul>
                <div className="rs-tags">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </article>
            ))}
          </section>
        </main>

        <section className="rs-band">
          <MiniList title="Activities" items={activities} />
          <MiniList title="Awards" items={awardList} />
          <MiniList title="Certification" items={certList} />
        </section>
      </div>
    </div>
  );
}
