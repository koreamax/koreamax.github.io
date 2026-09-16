// Portfolio v2 디자인의 renderVals() 데이터를 그대로 옮긴 파일.
// 내용 수정은 여기서만 하면 된다.

export type SpreadCard =
  | { kind: "image"; src?: string; ph: string; w: number; h: number; z: number }
  | { kind: "label"; label: string; num: string; w: number; h: number; z: number };

export const spreadCards: SpreadCard[] = [
  // 활동 사진: public/uploads/ 에 아래 파일명으로 저장하면 표시된다. (파일이 없으면 플레이스홀더)
  { kind: "image", src: "/uploads/activity-khtml-aws.jpg", ph: "K-HTML 해커톤 · AWS", w: 17, h: 22, z: 2 },
  { kind: "label", label: "Web/App", num: "01", w: 16, h: 20, z: 3 },
  { kind: "image", src: "/uploads/activity-skt-best.jpg", ph: "SKT FLY AI 최우수상", w: 15, h: 26, z: 4 },
  { kind: "label", label: "AI", num: "02", w: 18, h: 22, z: 5 },
  { kind: "image", src: "/uploads/activity-skt-project.jpg", ph: "SKT FLY AI 프로젝트 우수상", w: 16, h: 24, z: 6 },
  { kind: "label", label: "Cloud", num: "03", w: 16, h: 20, z: 7 },
  { kind: "image", src: "/uploads/activity-piuda.jpg", ph: "피우다 프로젝트 장려상", w: 17, h: 22, z: 8 },
  { kind: "label", label: "Embedded", num: "04", w: 15, h: 20, z: 9 },
];

export interface Project {
  image?: string; // "/uploads/..." 경로. 비우면 플레이스홀더
  ph: string;
  tag: string;
  status: string;
  title: string;
  desc: string;
  repo: string;
}

export const projects: Project[] = [
  // 온 더 스크린 대표 3개 = 지금 진행 중인 프로젝트
  {
    ph: "Goliath Crane 사진",
    tag: "Embedded",
    status: "진행 중",
    title: "Goliath Crane",
    desc: "한화오션 골리앗 크레인용 LiDAR 기반 ROS2 상황 인식 시스템.",
    repo: "https://github.com/koreamax/Hanhwa-Ocean-Goliath-Crane",
  },
  {
    ph: "GSV Paper 사진",
    tag: "AI",
    status: "진행 중",
    title: "GSV Paper",
    desc: "구글 스트리트뷰 간판을 YOLO로 검출하고 OCR + VLM으로 텍스트를 추출하는 파이프라인.",
    repo: "https://github.com/koreamax/GSV_SIGNBOARD",
  },
  {
    ph: "JeokjaeJeokso 사진",
    tag: "Embedded",
    status: "진행 중",
    title: "JeokjaeJeokso",
    desc: "현대자동차 임베디드 SW 공모전 — 라즈베리파이 센서로 트럭 적재물을 측정하고 디지털 트윈으로 시각화.",
    repo: "https://github.com/koreamax/2026ESWContest_mobility_JeokjaeJeokso",
  },
];

export interface MoreProject {
  title: string;
  desc: string;
  tag: string;
  status: string;
  repo: string;
}

export const moreProjects: MoreProject[] = [
  {
    title: "VIAssist",
    desc: "한이음 프로젝트 — Jetson Orin Nano 기반 YOLO + Optical Flow + VLM + TTS 시각장애인 보행 보조 웨어러블",
    tag: "Embedded · AI",
    status: "종료",
    repo: "https://github.com/koreamax/VIAssist_Total",
  },
  {
    title: "LLM ROUTER",
    desc: "SKT Efficient LLM Routing Challenge — 질문에 맞는 모델로 라우팅해 비용과 품질을 동시에 잡는 라우터",
    tag: "AI",
    status: "종료",
    repo: "https://github.com/koreamax/SKTLLMROUTER0.710",
  },
  {
    title: "beautytalk",
    desc: "시각장애인·저시력 사용자를 위한 메이크업 도우미",
    tag: "AI · Web · App",
    status: "종료",
    repo: "https://github.com/koreamax/beautytalk-app",
  },
  {
    title: "Mission Pawss!ble",
    desc: "반려견 산책으로 도시 위험을 발견하고 지자체와 연결하는 시민참여 플랫폼",
    tag: "Cloud · AI · Web",
    status: "종료",
    repo: "https://github.com/koreamax/TECH4GOOD_OH",
  },
  {
    title: "Wilson",
    desc: "치매 노인을 위한 말벗 챗봇",
    tag: "Cloud · AI · Web",
    status: "종료",
    repo: "https://github.com/koreamax/wilson_chatbot",
  },
  {
    title: "Cloud Island",
    desc: "AWS CloudTrail 로그를 3D 행성과 우주 탐험 인터페이스로 시각화",
    tag: "Cloud · Web",
    status: "종료",
    repo: "https://github.com/koreamax/cloud-island",
  },
  {
    title: "Seagnal",
    desc: "해양 환경 정화 활동을 위한 통합 ICT 플랫폼",
    tag: "Cloud · Web",
    status: "종료",
    repo: "https://github.com/koreamax/piudaback",
  },
  {
    title: "WalkingCity",
    desc: "동대문구 주민 취향 맞춤 산책 경로 추천 서비스",
    tag: "Cloud · AI · Web",
    status: "종료",
    repo: "https://github.com/koreamax/walk_web",
  },
];

export interface TimelineEvent {
  date: string;
  title: string;
  desc: string;
  kind: string;
  /** true = 아직 하고 있는 활동, false = 끝난 활동 */
  ongoing: boolean;
}

export const events: TimelineEvent[] = [
  {
    date: "2026.09 ~",
    title: "IoT Microprocessor 강의 조교",
    desc: "동국대학교 IoT 마이크로프로세서 강의 Teaching Assistant.",
    kind: "TA",
    ongoing: true,
  },
  {
    date: "2026.06 – 09",
    title: "SKT FLY AI CHALLENGER 9기",
    desc: "AI & Cloud Developer — 개인 최우수상·프로젝트 부문 SK텔레콤 대표이사상 수상.",
    kind: "Program",
    ongoing: false,
  },
  {
    date: "2026.05 ~",
    title: "AWS Student Builder Groups at DGU 1기",
    desc: "Core Member(운영진)로 커뮤니티 운영.",
    kind: "Community",
    ongoing: true,
  },
  {
    date: "2026.03 – 06",
    title: "Computer Architecture 강의 조교",
    desc: "컴퓨터 구조 강의 Teaching Assistant.",
    kind: "TA",
    ongoing: false,
  },
  {
    date: "2025.07 ~",
    title: "Computer Security & Distributed Computing LAB",
    desc: "학부연구생 — 보안·분산 컴퓨팅 연구.",
    kind: "Research",
    ongoing: true,
  },
  {
    date: "2025.07 – 2026.04",
    title: "AWS Cloud Club at DGU 1기",
    desc: "General Member로 클라우드 커뮤니티 활동.",
    kind: "Community",
    ongoing: false,
  },
  {
    date: "2025.03 – 12",
    title: "FARM SYSTEM 4기 웹/보안 트랙",
    desc: "Backend Developer.",
    kind: "Program",
    ongoing: false,
  },
  {
    date: "2023.01 – 06",
    title: "코리아 IT 아카데미 JSP & Spring Boot 백엔드 과정",
    desc: "Backend Developer 과정 수료.",
    kind: "Program",
    ongoing: false,
  },
];

export interface Award {
  date: string;
  title: string;
  prize: string;
  repo: string;
  logo: string;
}

export const awards: Award[] = [
  {
    date: "2026.09",
    title: "SKT FLY AI CHALLENGER 9기 개인 최우수상",
    prize: "SK텔레콤 대표이사상",
    repo: "https://github.com/sktflyai9th5",
    logo: "/uploads/pasted-1789520118922-0.png",
  },
  {
    date: "2026.09",
    title: "SKT FLY AI CHALLENGER 9기 프로젝트 부문",
    prize: "SK텔레콤 대표이사상",
    repo: "https://github.com/sktflyai9th5",
    logo: "/uploads/pasted-1789520118922-0.png",
  },
  {
    date: "2025.12",
    title: "제15회 피우다 프로젝트 공모전",
    prize: "정보통신산업진흥원장상",
    repo: "https://github.com/koreamax/piudaback",
    logo: "/uploads/pasted-1789520130431-0.png",
  },
  {
    date: "2025.08",
    title: "2025 K-HTML 해커톤",
    prize: "동대문구청장상",
    repo: "https://github.com/koreamax/walk_web",
    logo: "/uploads/pasted-1789520173436-0.png",
  },
];

export interface Qualification {
  date: string;
  title: string;
  org: string;
  logo: string;
}

export const quals: Qualification[] = [
  {
    date: "2026.08",
    title: "Microsoft Azure AI Fundamentals",
    org: "Microsoft Learn",
    logo: "/uploads/pasted-1789520722540-0.png",
  },
  {
    date: "2026.08",
    title: "AWS Certified Cloud Practitioner",
    org: "AWS Training and Certification",
    logo: "/uploads/pasted-1789520776720-0.png",
  },
  {
    date: "2025.04",
    title: "네트워크관리사 2급",
    org: "한국정보통신자격협회",
    logo: "/assets/icqa-logo3.png",
  },
];

export interface SkillGroup {
  num: string;
  area: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    num: "01",
    area: "Web/App",
    items: ["Spring Boot", "FastAPI", "Node.js", "MySQL", "PostgreSQL", "Redis", "React", "Vue.js", "Flutter"],
  },
  {
    num: "02",
    area: "AI",
    items: ["PyTorch", "OpenCV", "OCR", "LLM", "VLM", "LangChain", "RAG", "ChromaDB", "OpenSearch"],
  },
  {
    num: "03",
    area: "Cloud / Infra",
    items: ["AWS", "Azure", "GCP", "NHN Cloud", "Terraform", "Docker", "Kubernetes", "GitHub Actions"],
  },
  {
    num: "04",
    area: "Embedded",
    items: ["C/C++", "Raspberry Pi", "NVIDIA Jetson", "ROS2", "LiDAR", "Digital Twin"],
  },
  {
    num: "05",
    area: "Collaboration",
    items: ["Git", "GitHub", "Notion", "Slack", "Figma", "Blender"],
  },
];

export const corridorTitles = [
  "VIAssist",
  "Goliath Crane",
  "LLM ROUTER",
  "GSV Paper",
  "JeokjaeJeokso",
  "beautytalk",
  "Mission Pawss!ble",
  "Cloud Island",
  "WalkingCity",
];
