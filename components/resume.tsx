/**
 * 이력서 — Claude Design 의 Resume.dc.html 틀(왼쪽 검은 칸 + 오른쪽 본문)에
 * 이력서_20261021.pdf 의 내용을 그대로 담았다.
 *
 * 화면에서도 A4 두 장(210 × 297mm)을 그대로 쌓아 보여 준다. 그래서 화면에서 보이는
 * 모습이 곧 인쇄(PDF 저장) 결과다. 어느 내용이 몇 쪽에 오는지는 아래 PAGES 에서 정한다 —
 * 항목을 늘려 한 쪽에서 넘치면 다음 쪽으로 옮기면 된다.
 */

const PROFILE = {
  name: "이민형",
  /** 두 줄로 — 의미가 끊기는 자리에서 줄을 바꾼다 */
  headline: ["여러 가지 일에 몰두할 수 있는", "이 시대의 멀티 플레이어 개발자"],
  personal: "남 · 2001년 (만 25세)",
  phone: "010-7421-8280",
  email: "koreamax012@gmail.com",
  address: "서울 용산구 용산동2가",
};

const LINKS = [
  {
    href: "https://www.linkedin.com/in/koreamax",
    label: "linkedin.com/in/koreamax",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/koreamax",
    label: "github.com/koreamax",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
  },
  {
    href: "https://velog.io/@koreamax01/posts",
    label: "velog.io/@koreamax01",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M7.2 8.4c.9-.3 1.7-.2 2 .9l1.5 5.6c1.9-2 3.4-4.5 3.4-6 0-.5-.2-.8-.5-1h2.6c.3.3.4.7.4 1.2 0 2.4-2.6 6-5.4 8.4H9.3L7.8 10c-.1-.5-.3-.7-.6-.8z" fill="#171719" />
      </svg>
    ),
  },
];

/** PDF 첫머리의 네 칸 요약 */
const SUMMARY = [
  { label: "학력", value: "동국대학교 (서울)", note: "대학교(4년) · 졸업예정" },
  { label: "경력", value: "신입", accent: true },
  { label: "인턴·대외활동", value: "AWS Student Builder Groups 운영진", note: "외 5" },
  { label: "자격증", value: "AWS Certified Cloud Practitioner", note: "외 3" },
];

const EDUCATION = {
  school: "동국대학교 (서울)",
  major: "정보통신공학전공",
  date: "2021.03 – 2027.02",
  status: "졸업예정",
  gpa: "3.8 / 4.5",
};

/** 한 항목 = 이름 · 기간 · 꼬리표 · 한두 줄 설명 */
type Entry = { title: string; org?: string; date: string; span?: string; tag?: string; desc: string };

const ACTIVITIES: Entry[] = [
  {
    title: "AWS Student Builder Groups 운영진(Core Member)",
    date: "2026.05 – 2026.09",
    span: "5개월",
    tag: "동아리",
    desc: "신규 멤버 모집·면접 및 온보딩 가이드 제작부터 AWS 클라우드 관련 세션 진행, K8s 스터디 리딩, 외부 네트워킹, 출석 및 수료 기준 관리까지 동아리 운영 전반을 총괄",
  },
  {
    title: "Computer Security & Distributed Computing 연구실",
    date: "2025.07 – 2026.09",
    span: "1년 3개월",
    tag: "교내활동",
    desc: "학부연구생으로서 Google Street View 이미지 기반 OCR 및 VLM(Vision-Language Model) 하이브리드 모델을 활용한 간판 인식·텍스트 추출 연구를 수행하며 관련 논문 작성 중",
  },
  {
    title: "IoT 마이크로프로세서 강의 조교",
    date: "2026.09 – 2026.09",
    span: "1개월",
    tag: "교내활동",
    desc: "ARM64 마이크로프로세서 아키텍처 이론 지도 및 실습을 진행하고, 실습 과제 출제와 시험·과제 채점을 담당하여 수강생들의 임베디드 시스템 이해도를 향상",
  },
  {
    title: "컴퓨터 구성 강의 조교",
    date: "2026.03 – 2026.06",
    span: "4개월",
    tag: "교내활동",
    desc: "컴퓨터 구조 이론 지도 및 회로 실습을 진행하고, 회로·CPU 설계 과제 및 실습 문제를 직접 출제·채점하여 수강생들의 실습 이해도 향상을 지원",
  },
  {
    title: "AWS Cloud Club 일반 부원(General Member)",
    date: "2025.07 – 2026.04",
    span: "10개월",
    tag: "동아리",
    desc: "AWS 기술 학습과 정기 세션 발표를 수행하고, 소그룹 스터디 및 현직자 네트워킹 행사 참여를 통해 클라우드 실무 역량과 기술 인사이트를 확충",
  },
  {
    title: "FARM SYSTEM 4기 웹/보안 트랙 일반 부원",
    date: "2025.03 – 2025.12",
    span: "10개월",
    tag: "동아리",
    desc: "백엔드 중심의 웹 개발 팀 프로젝트와 코딩테스트 스터디를 진행하고, 보안 기술 논문 분석을 병행하여 웹 개발 실무와 보안 지식을 함께 강화",
  },
];

const TRAINING: Entry[] = [
  {
    title: "SKT FLY AI CHALLENGER 9기",
    org: "SK텔레콤",
    date: "2026.06 – 2026.09",
    desc: "AI 모델링·생성형 AI 서비스 개발, Cloud·컨테이너 기반 AI 시스템 운영, 프로젝트 기반 실무 협업 역량을 바탕으로 '사회적 가치 창출 AI 서비스 개발 프로젝트'를 완수",
  },
  {
    title: "JSP & Spring Boot 웹개발 백엔드 과정",
    org: "코리아 IT 아카데미",
    date: "2023.01 – 2023.06",
    desc: "Java 객체지향 파악 및 RDBMS 설계를 바탕으로, JSP/Servlet 구조 이해부터 Spring Boot 기반의 RESTful API 구축까지 백엔드 개발 전반의 기술을 이수",
  },
];

const CERTS = [
  { date: "2026.08", title: "AWS Certified Cloud Practitioner", org: "AWS" },
  { date: "2026.08", title: "Azure AI Fundamentals", org: "Microsoft" },
  { date: "2025.04", title: "네트워크관리사 2급", org: "한국정보통신자격협회" },
  { date: "2023.07", title: "2종보통운전면허", org: "경찰청(운전면허시험관리단)" },
];

const AWARDS: Entry[] = [
  {
    title: "SKT FLY AI CHALLENGER 9기 개인 최우수상",
    org: "SK텔레콤 대표이사상",
    date: "2026",
    desc: "SKT FLY AI CHALLENGER 9기 과정 전반에서 교육 성적, 역량 실습, 프로젝트 기여도 및 기술 리더십을 인정받아 최고 성적자로서 개인 최우수상(SK텔레콤 대표이사상)을 수상",
  },
  {
    title: "SKT FLY AI CHALLENGER 9기 프로젝트 우수상",
    org: "SK텔레콤 대표이사상",
    date: "2026",
    desc: "AI 모델링 및 Cloud·컨테이너 인프라를 결합한 '사회적 가치 창출 AI 서비스' 프로젝트의 기술적 완성도와 높은 실무 가치를 인정받아 프로젝트 우수상(SK텔레콤 대표이사상)을 수상",
  },
  {
    title: "제15회 피우다 프로젝트 공모전 장려상",
    org: "정보통신산업진흥원장상",
    date: "2025",
    desc: "ICT·AI 기반의 창의적인 사회 문제 해결형 프로젝트를 완성도 높게 기획 및 구현하여 혁신성과 실용성을 인정받아 장려상(정보통신산업진흥원장상)을 입상",
  },
  {
    title: "2025 K-HTML 해커톤 우수상",
    org: "동대문구청장상 · 동대문구청 & 교육혁신사업단",
    date: "2025",
    desc: "해커톤 제한 시간 내에 웹 및 IT 기술 기반의 완성도 높은 프로토타입을 구현하여 서비스 완성도와 기획력을 바탕으로 우수상(동대문구청장상)을 수상",
  },
];

function Heading({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`rs-heading${dark ? " is-dark" : ""}`}>
      <h2>{children}</h2>
      <div className="rs-bar" />
    </div>
  );
}

function Entries({ items }: { items: Entry[] }) {
  return (
    <div className="rs-entries">
      {items.map((e) => (
        <article key={e.title} className="rs-entry">
          <div className="rs-entry-head">
            <h3>{e.title}</h3>
            {e.tag && <span className={`rs-tag${e.tag === "동아리" ? " is-club" : ""}`}>{e.tag}</span>}
          </div>
          <div className="rs-entry-meta">
            <span className="rs-date">{e.date}</span>
            {e.span && <span>{e.span}</span>}
            {e.org && <span>{e.org}</span>}
          </div>
          <p>{e.desc}</p>
        </article>
      ))}
    </div>
  );
}

function Contact({ label, children, icon }: { label: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <div className="rs-contact">
      {icon}
      <div>
        <span className="rs-contact-label">{label}</span>
        <span className="rs-contact-value">{children}</span>
      </div>
    </div>
  );
}

const ICON = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export default function Resume() {
  return (
    <div className="rs">
      {/* ───────── 1쪽 ───────── */}
      <section className="rs-page" aria-label="이력서 1쪽">
        <aside className="rs-aside">
          <div className="rs-aside-block rs-aside-top">
            <h1 className="rs-name">{PROFILE.name}</h1>
            <p className="rs-personal">{PROFILE.personal}</p>
            <p className="rs-headline">
              {PROFILE.headline[0]}
              <br />
              {PROFILE.headline[1]}
            </p>
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

          <div className="rs-aside-block">
            <Heading dark>Contact</Heading>
            <Contact
              label="휴대폰"
              icon={
                <svg {...ICON}>
                  <rect x="6" y="2" width="12" height="20" rx="2.5" />
                  <path d="M11 18h2" />
                </svg>
              }
            >
              <a href={`tel:${PROFILE.phone}`}>{PROFILE.phone}</a>
            </Contact>
            <Contact
              label="Email"
              icon={
                <svg {...ICON}>
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              }
            >
              {/* 칸이 좁으면 @ 앞에서만 줄을 바꾼다 */}
              <a href={`mailto:${PROFILE.email}`}>
                {PROFILE.email.split("@")[0]}
                <wbr />@{PROFILE.email.split("@")[1]}
              </a>
            </Contact>
            <Contact
              label="주소"
              icon={
                <svg {...ICON}>
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
            >
              {PROFILE.address}
            </Contact>
          </div>
        </aside>

        <main className="rs-main">
          <ul className="rs-summary">
            {SUMMARY.map((s) => (
              <li key={s.label}>
                <span className="rs-summary-label">{s.label}</span>
                <span className={`rs-summary-value${s.accent ? " is-accent" : ""}`}>{s.value}</span>
                {s.note && <span className="rs-summary-note">{s.note}</span>}
              </li>
            ))}
          </ul>

          <section className="rs-section">
            <Heading>학력</Heading>
            <article className="rs-entry">
              <div className="rs-entry-head">
                <h3>{EDUCATION.school}</h3>
                <span className="rs-entry-sub">{EDUCATION.major}</span>
              </div>
              <div className="rs-entry-meta">
                <span className="rs-date">{EDUCATION.date}</span>
                <span>{EDUCATION.status}</span>
                <span>
                  학점 <b>{EDUCATION.gpa}</b>
                </span>
              </div>
            </article>
          </section>

          <section className="rs-section">
            <Heading>인턴·대외활동</Heading>
            <Entries items={ACTIVITIES} />
          </section>
        </main>
      </section>

      {/* ───────── 2쪽 ───────── */}
      <section className="rs-page" aria-label="이력서 2쪽">
        <aside className="rs-aside">
          <div className="rs-aside-block rs-aside-top rs-aside-p2">
            <span className="rs-name-sm">{PROFILE.name}</span>
            <span className="rs-running">
              {PROFILE.phone}
              <br />
              {PROFILE.email}
            </span>
            <div className="rs-bar rs-bar-48" />
          </div>
          <div className="rs-aside-block">
            <Heading dark>자격증</Heading>
            <ul className="rs-certs">
              {CERTS.map((c) => (
                <li key={c.title}>
                  <span className="rs-date">{c.date}</span>
                  <span className="rs-cert-title">{c.title}</span>
                  <span className="rs-cert-org">{c.org}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="rs-main">
          <section className="rs-section">
            <Heading>교육</Heading>
            <Entries items={TRAINING} />
          </section>

          <section className="rs-section">
            <Heading>수상</Heading>
            <Entries items={AWARDS} />
          </section>
        </main>
      </section>
    </div>
  );
}
