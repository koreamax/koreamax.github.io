// Portfolio v2 디자인의 renderVals() 데이터를 그대로 옮긴 파일.
// 내용 수정은 여기서만 하면 된다.

export type SpreadCard =
  | { kind: "image"; src?: string; ph: string; w: number; h: number; z: number }
  | { kind: "label"; label: string; num: string; items: string[]; w: number; h: number; z: number };

export const spreadCards: SpreadCard[] = [
  // 활동 사진: public/uploads/ 에 아래 파일명으로 저장하면 표시된다. (파일이 없으면 플레이스홀더)
  { kind: "image", src: "/uploads/activity-khtml-aws.jpg", ph: "K-HTML 해커톤 · AWS", w: 14, h: 18, z: 2 },
  { kind: "label", label: "Backend", num: "01", items: ["Spring Boot", "FastAPI", "Node.js", "MySQL", "PostgreSQL", "Redis"], w: 15, h: 21, z: 3 },
  { kind: "image", src: "/uploads/activity-skt-best.jpg", ph: "SKT FLY AI 최우수상", w: 13, h: 20, z: 4 },
  { kind: "label", label: "AI", num: "02", items: ["PyTorch", "OpenCV", "OCR", "LLM", "VLM", "LangChain", "RAG"], w: 15, h: 21, z: 5 },
  { kind: "image", src: "/uploads/activity-skt-project.jpg", ph: "SKT FLY AI 프로젝트 우수상", w: 14, h: 19, z: 6 },
  { kind: "label", label: "Cloud", num: "03", items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"], w: 15, h: 21, z: 7 },
  { kind: "image", src: "/uploads/activity-piuda.jpg", ph: "피우다 프로젝트 장려상", w: 14, h: 18, z: 8 },
  { kind: "label", label: "Embedded", num: "04", items: ["C/C++", "Raspberry Pi", "NVIDIA Jetson", "ROS2", "LiDAR"], w: 15, h: 21, z: 9 },
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
  /** 제목 아래 한 줄 — 맡은 자리, 또는 줄여 쓴 이름의 풀네임 */
  sub?: string;
  /** 단체 로고 — 없으면 갈래를 나타내는 그림으로 대신한다 */
  logo?: string;
  /** true = 아직 하고 있는 활동, false = 끝난 활동 */
  ongoing: boolean;
}

export const events: TimelineEvent[] = [
  {
    date: "2026.09 ~",
    title: "IoT Microprocessor 강의 조교",
    sub: "Teaching Assistant",
    desc: "동국대학교 IoT 마이크로프로세서 강의 Teaching Assistant.",
    kind: "TA",
    ongoing: true,
  },
  {
    date: "2026.06 – 09",
    title: "SKT FLY AI CHALLENGER 9기",
    logo: "/uploads/logo-fly-ai.webp",
    sub: "AI & Cloud Developer",
    desc: "AI & Cloud Developer — 개인 최우수상·프로젝트 부문 SK텔레콤 대표이사상 수상.",
    kind: "Program",
    ongoing: false,
  },
  {
    date: "2026.05 ~",
    title: "AWS Student Builder Groups 1기",
    logo: "/uploads/logo-asbg.webp",
    sub: "Core Member",
    desc: "Core Member(운영진)로 커뮤니티 운영.",
    kind: "Community",
    ongoing: true,
  },
  {
    date: "2026.03 – 06",
    title: "Computer Architecture 강의 조교",
    sub: "Teaching Assistant",
    desc: "컴퓨터 구조 강의 Teaching Assistant.",
    kind: "TA",
    ongoing: false,
  },
  {
    date: "2025.07 ~",
    title: "CSDC LAB 학부연구생",
    sub: "Computer Security & Distributed Computing LAB",
    desc: "학부연구생 — 보안·분산 컴퓨팅 연구.",
    kind: "Research",
    ongoing: true,
  },
  {
    date: "2025.07 – 2026.04",
    title: "AWS Cloud Club 1기",
    logo: "/uploads/logo-cloud-club.webp",
    sub: "General Member",
    desc: "General Member로 클라우드 커뮤니티 활동.",
    kind: "Community",
    ongoing: false,
  },
  {
    date: "2025.03 – 12",
    title: "FARM SYSTEM 4기 웹/보안 트랙",
    logo: "/uploads/logo-farm-system.webp",
    sub: "Backend Developer",
    desc: "Backend Developer.",
    kind: "Community",
    ongoing: false,
  },
  {
    date: "2023.08 – 2025.02",
    title: "네트워크 관리병",
    desc: "부대 전산망과 네트워크 장비를 맡아 운용하고 관리.",
    kind: "Military",
    ongoing: false,
  },
  {
    date: "2023.01 – 06",
    title: "코리아 IT 아카데미 JSP & Spring Boot 백엔드 과정",
    logo: "/uploads/logo-korea-it.webp",
    sub: "Backend Developer",
    desc: "Backend Developer 과정 수료.",
    kind: "Program",
    ongoing: false,
  },
  {
    date: "2021.12 – 2023.07",
    title: "CU 편의점",
    desc: "발주와 진열, 매대 정리, 응대까지 매장에서 하는 일 전반.",
    kind: "Work",
    ongoing: false,
  },
  {
    date: "2019.12 – 2021.07",
    title: "돈까스 전문점",
    desc: "홀 서빙과 주방 보조, 설거지.",
    kind: "Work",
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
    area: "Backend",
    items: ["Spring Boot", "FastAPI", "Node.js", "MySQL", "PostgreSQL", "Redis"],
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

/** 복도를 지나가는 카드 한 장 — 프로젝트 하나에 카드 하나다 */
export interface CorridorCard {
  title: string;
  /** 직접 찍은 화면들. 한 카드 안에 모아 보여 준다 (없으면 이름만 흘러간다) */
  shots?: string[];
  /** 화면을 몇 칸으로 깔지. 가로 화면은 2칸(기본), 세로 폰 화면은 4칸으로 눕힌다 */
  shotColumns?: number;
  /** 카드 자체 크기(cqw). 화면 비율이 유별날 때만 손으로 잡는다 */
  cardW?: number;
  cardH?: number;
}

/* 프로젝트마다 한 장씩 — 어느 하나가 더 자주 나오지 않도록.
   보여 줄 화면이 아직 없는 프로젝트(Goliath Crane · LLM ROUTER · JeokjaeJeokso)는 빼 두었다. */
export const corridorCards: CorridorCard[] = [
  {
    title: "Seagnal",
    shots: ["/uploads/seagnal-1.webp", "/uploads/seagnal-2.webp", "/uploads/seagnal-3.webp", "/uploads/seagnal-4.webp"],
    cardH: 17,
  },
  {
    title: "VIAssist",
    shots: ["/uploads/viassist-1.webp", "/uploads/viassist-2.webp", "/uploads/viassist-3.webp", "/uploads/viassist-4.webp"],
    cardH: 17,
  },
  {
    title: "GSV Paper",
    shots: ["/uploads/gsv-1.webp", "/uploads/gsv-2.webp", "/uploads/gsv-3.webp"],
    shotColumns: 1,
    cardH: 17,
  },
  {
    title: "beautytalk",
    shots: ["/uploads/beauty-1.webp", "/uploads/beauty-2.webp", "/uploads/beauty-4.webp", "/uploads/beauty-3.webp"],
    shotColumns: 4,
    cardH: 17,
  },
  {
    title: "Mission Pawss!ble",
    shots: ["/uploads/paws-1.webp", "/uploads/paws-2.webp", "/uploads/paws-3.webp", "/uploads/paws-4.webp"],
    shotColumns: 4,
    cardH: 17,
  },
  {
    title: "Wilson",
    shots: ["/uploads/wilson-1.webp", "/uploads/wilson-2.webp", "/uploads/wilson-3.webp", "/uploads/wilson-4.webp"],
    shotColumns: 4,
    cardH: 17,
  },
  {
    title: "Cloud Island",
    shots: ["/uploads/island-1.webp", "/uploads/island-2.webp", "/uploads/island-3.webp", "/uploads/island-4.webp"],
    cardH: 17,
  },
  {
    title: "WalkingCity",
    shots: ["/uploads/walk-1.webp", "/uploads/walk-2.webp", "/uploads/walk-3.webp", "/uploads/walk-4.webp"],
    shotColumns: 4,
    cardH: 17,
  },
];

/* ───────────────────────── 분야별 프로젝트 ─────────────────────────
   같은 프로젝트라도 분야에 따라 맡은 역할과 풀어낸 문제가 다르므로
   설명 · 문제 · 해결을 분야별로 따로 적는다. */

/** 한 프로젝트에서 짚은 문제 하나. 문제와 해결을 짝으로 붙여 둔다. */
export interface CategoryIssue {
  /** 어느 관점에서 본 이야기인지 — "백엔드" · "클라우드" 처럼. 같은 값이 이어지면 한 묶음으로 그려진다 */
  lens?: string;
  /** 무엇에 관한 이야기인지 — 카드에서 번호 옆에 붙는 짧은 제목 */
  tag: string;
  /** 어떤 상황이었는지 — 구조와 조건. 이 프로젝트를 처음 보는 사람도 문제를 따라올 수 있게 */
  situation?: string;
  /** 무엇이 왜 문제였는지. 이 프로젝트를 처음 보는 사람도 알아듣게 적는다 */
  problem: string;
  /** 어떻게 풀었고 그래서 무엇이 달라졌는지 */
  solution: string;
  /** 설명이 앉기 전에 깔려 있는 실제 코드 — 이 코드가 설명으로 바뀐다 */
  problemCode?: string;
  solutionCode?: string;
}

export interface CategoryItem {
  title: string;
  /** 어떤 프로젝트인지 한 줄 */
  summary: string;
  /** 짚은 문제가 하나뿐일 때 — 여럿이면 issues 로 나눠 적는다 */
  problem?: string;
  solution?: string;
  /** 문제마다 따로 적고 싶을 때. 있으면 problem/solution 대신 이쪽이 그려진다 */
  issues?: CategoryIssue[];
  /** 아키텍처. 있으면 카드가 장면을 통째로 차지하고 왼쪽 그림 · 오른쪽 글로 놓인다 */
  arch?: {
    /** 구조도 그림 */
    src: string;
    /** 그림을 못 보는 사람을 위한 한 줄 */
    caption: string;
  };
  repo: string;
  status: string;
}

export interface Category {
  num: string;
  name: string;
  color: string;
  stack: string[];
  items: CategoryItem[];
}

export const categories: Category[] = [
  {
    num: "01",
    name: "Backend & Cloud",
    color: "#60a5fa",
    stack: ["Spring Boot", "gRPC", "PostgreSQL", "Redis", "AWS", "EKS", "Docker", "GitHub Actions"],
    items: [
      {
        title: "Wilson",
        summary:
          "치매 노인을 위한 말벗 챗봇. React Native 앱이 ALB를 지나 Spring Boot에 닿고, Spring Boot는 gRPC로 EKS 위의 AI 서비스(오케스트레이터 · RAG · Ollama · STT/TTS · Chroma)를 부른다. 상태를 가진 것만 RDS · Redis · Chroma에 남기고 음성은 S3, 분석 요청은 SQS로 흘린다.",
        arch: {
          caption:
            "React Native 앱이 ALB를 지나 EC2의 Spring Boot에 닿고, Spring Boot는 gRPC로 EKS 위의 오케스트레이터 · RAG · Ollama · STT/TTS · Chroma를 부른다. 상태는 RDS와 Redis에, 음성은 S3에, 분석 요청은 SQS에 둔다.",
          src: "/uploads/wilson-arch.webp",
        },
        issues: [
          {
            lens: "백엔드",
            tag: "말을 걸면 첫 턴이 실패",
            situation:
              "어르신이 말을 걸면 Spring Boot가 EKS 위 AI 오케스트레이터를 gRPC로 불러 답을 만드는 구조. 채널은 호출마다 새로 맺지 않고 서버가 뜰 때 한 번 연 ManagedChannel을 계속 재사용하며, 어르신 대화는 몇 분씩 끊겼다가 다시 이어지는 일이 잦음",
            problemCode: "ManagedChannel ch = NettyChannelBuilder.forAddress(AI_HOST, 50051).usePlaintext().build();  // keepAlive unset - an idle hop drops the socket and nobody finds out until the next turn",
            solutionCode: "NettyChannelBuilder.forAddress(AI_HOST, 50051).keepAliveTime(30, SECONDS).keepAliveTimeout(10, SECONDS).keepAliveWithoutCalls(true).idleTimeout(5, MINUTES).usePlaintext().build();",
            problem:
              "대화가 뜸한 사이 중간 장비가 유휴 TCP 연결을 말없이 정리했지만 keepAlive가 꺼져 있어 채널은 연결이 살아 있다고 판단함. 다음 발화의 RPC가 이미 끊긴 소켓 위로 나가 실패하고, 사용자에게는 오랜만에 건넨 첫마디에 대답이 없는 장애로 보임",
            solution:
              "NettyChannelBuilder에 keepAliveTime 30초 · keepAliveTimeout 10초 · keepAliveWithoutCalls를 켜 호출이 없을 때도 HTTP/2 PING으로 연결을 확인하고, 응답이 없으면 채널이 스스로 끊고 다시 맺게 함. idleTimeout 5분으로 오래 쉰 채널도 미리 정리해, 한참 쉬었다 건넨 첫마디도 바로 응답이 나가고 첫 턴 실패가 재현되지 않음",
          },
          {
            lens: "백엔드",
            tag: "아침 첫 요청만 터지던 DB",
            situation:
              "Spring Boot는 HikariCP 커넥션 풀로 RDS에 붙어 대화 기록과 사용자 정보를 읽고 씀. 사용자가 어르신이라 새벽에는 요청이 거의 없어, 풀 안의 연결이 몇 시간씩 쓰이지 않고 쉬는 구간이 매일 생김",
            problemCode: "spring.datasource.hikari.max-lifetime=1800000   # rds wait_timeout=600 - the pool keeps sockets the server closed 20 minutes ago and hands one to the first morning request",
            solutionCode: "spring.datasource.hikari.max-lifetime=540000 ; hikari.keepalive-time=120000 ; hikari.connection-test-query=SELECT 1 ; hikari.validation-timeout=3000 ; hikari.minimum-idle=2",
            problem:
              "DB가 유휴 연결을 끊는 시간은 600초인데 풀의 max-lifetime은 30분이라, 서버가 이미 닫은 연결을 풀은 살아 있다고 믿고 들고 있음. 아침 첫 요청이 이 죽은 연결을 받아 쿼리를 보내다 통신 오류로 실패하고 다음 요청부터는 정상이라, 재현이 어려운 간헐 장애로 나타남",
            solution:
              "max-lifetime을 9분으로 DB보다 짧게 잡아 서버가 끊기 전에 풀이 먼저 연결을 교체하고, keepalive-time 2분마다 유휴 연결에 검증 쿼리를 보내 끊긴 연결을 미리 걸러냄. minimum-idle 2개를 유지해 아침 첫 요청도 검증된 연결을 바로 받게 되면서 첫 요청 실패가 사라짐",
          },
          {
            lens: "클라우드",
            tag: "NAT를 거쳐 나가던 음성",
            situation:
              "대화 한 턴마다 어르신 음성을 S3에 올리고 TTS로 만든 음성을 다시 S3에서 꺼내는 구조. STT · TTS 파드는 외부에 노출되지 않도록 EKS 프라이빗 서브넷에 두고, 바깥으로 나가는 트래픽은 NAT 게이트웨이를 거치게 구성함",
            problemCode: "s3.put_object(Bucket=AUDIO, Key=key, Body=wav)  # stt/tts sit in a private subnet, so every clip is billed out through the NAT gateway and pays for the extra hop both ways",
            solutionCode: "resource \"aws_vpc_endpoint\" \"s3\" { service_name = \"com.amazonaws.ap-northeast-2.s3\" ; vpc_endpoint_type = \"Gateway\" ; route_table_ids = aws_route_table.private[*].id }",
            problem:
              "S3는 VPC 밖의 퍼블릭 엔드포인트라, 파드가 오디오를 넣고 꺼낼 때마다 NAT 게이트웨이를 통과함. NAT는 처리한 데이터 양만큼 요금이 붙어, 발화마다 오디오가 오가는 이 서비스는 대화량이 늘수록 NAT 비용과 구간 하나만큼의 지연이 함께 커지는 구조였음",
            solution:
              "S3용 VPC 게이트웨이 엔드포인트를 만들어 프라이빗 서브넷 라우팅 테이블에 연결함. S3로 가는 트래픽이 NAT를 거치지 않고 VPC 안에서 바로 오가게 되어, 오디오 전송에 붙던 NAT 데이터 처리 요금이 빠지고(게이트웨이 엔드포인트는 추가 요금 없음) 음성 경로에서 NAT 구간이 사라짐",
          },
          {
            lens: "클라우드",
            tag: "분석이 대답을 붙잡음",
            situation:
              "대화 음성을 HuBERT 모델로 분석해 치매 의심 신호를 찾고 보호자에게 전달하는 것이 서비스의 핵심 기능. 처음에는 대화 응답을 만드는 같은 요청 안에서 음성 분석까지 함께 수행함",
            problemCode: "dementia = hubert.analyze(wav) ; return Converse(reply=tts(text), risk=dementia)  # the turn cannot return until the analysis finishes, so the elder waits on a model, not on us",
            solutionCode: "sqs.send_message(QueueUrl=HUBERT_Q, MessageBody=key) ; return Converse(reply=tts(text))  # analysis leaves the dialogue path and lands on the guardian side a moment later",
            problem:
              "한 턴의 응답이 STT → LLM → TTS에 더해 HuBERT 분석까지 끝나야 반환되어, 대화와 무관한 분석 시간이 그대로 어르신의 대기 시간이 됨. 분석이 늦거나 실패하면 대답까지 함께 늦거나 실패하는 강한 결합도 있었음",
            solution:
              "응답 경로에서는 음성 키만 SQS에 넣고 TTS 응답을 바로 반환하고, 별도 워커가 큐를 소비해 분석 결과를 보호자 쪽에 쌓게 분리함. 응답 시간에서 분석 시간이 빠지고, 분석이 느리거나 실패해도 대화는 영향을 받지 않으며, 처리되지 못한 메시지는 큐에 남아 다시 처리되므로 분석이 누락되지 않음",
          },
        ],
        repo: "https://github.com/koreamax/wilson_chatbot",
        status: "종료",
      },
    ],
  },
  {
    num: "02",
    name: "AI & Backend",
    color: "#a78bfa",
    stack: ["Flutter", "FastAPI", "VLM", "STT", "TTS", "Redis", "Celery"],
    items: [
      {
        title: "beautytalk",
        summary:
          "시각장애인·저시력 사용자를 위한 메이크업 도우미. 앱이 찍은 화면을 백엔드가 받아 전처리하고, 화장품·메이크업 판정을 모델에 맡긴 뒤 결과를 음성으로 돌려준다.",
        arch: {
          src: "/uploads/beauty-arch.webp",
          caption: "Flutter 앱 → FastAPI → 전처리 · VLM 판정 → TTS. 무거운 일은 작업 큐로 넘기고 결과만 따로 받아 간다.",
        },
        issues: [
          {
            lens: "AI",
            tag: "설명이 길어 끝까지 못 듣는다",
            situation:
              "사용자가 화장품을 카메라에 비추면 VLM이 제품을 인식해 설명하고 그 문장을 TTS로 읽어 주는 흐름. 사용자는 화면을 볼 수 없어 음성으로만 정보를 얻고, 긴 설명 중 필요한 부분만 골라 들을 수도 없음",
            problem:
              "자유 형식 프롬프트라 모델이 제품 소개부터 길게 풀어 써, 정작 필요한 색상과 제형은 문장 뒷부분에 나옴. 출력 순서와 길이가 호출마다 달라 음성 안내 시간도 들쭉날쭉하고, 사용자는 원하는 정보가 나올 때까지 설명 전체를 들어야 했음",
            problemCode:
              'prompt = "Describe this cosmetic product."   # free-form answer: the shade turns up somewhere in the fourth sentence, forty seconds into the speech',
            solution:
              "응답을 category · shade · finish · how_to 필드의 JSON 스키마로 고정하고 필드마다 12단어 이내, 색상 필드부터 채우도록 프롬프트를 바꿈. 앱이 필드 순서대로 읽어 첫 마디에 색상이 나오고, 출력 길이가 일정해져 안내 음성이 짧고 예측 가능하게 정리됨",
            solutionCode:
              'schema = {"category": str, "shade": str, "finish": str, "how_to": str} ; prompt = "Fill every field in under twelve words, shade first."',
          },
          {
            lens: "AI",
            tag: "빛에 따라 달라지던 색 판정",
            situation:
              "파운데이션 · 립처럼 색이 핵심인 제품은 사진에서 색을 뽑아 추천에 사용함. 사용자는 대부분 집 안 조명 아래에서 직접 촬영하므로 조명 조건을 통제할 수 없음",
            problem:
              "제품 영역의 픽셀 RGB를 그대로 읽어, 따뜻한 전구 아래나 그늘에서는 같은 제품이 촬영할 때마다 다른 색으로 판정됨. 화이트밸런스가 틀어진 값이 그대로 추천 로직에 들어가, 같은 제품의 추천 결과가 촬영 환경에 따라 흔들림",
            problemCode:
              "rgb = frame[cy, cx]   # the shade is read straight off the pixel, so a warm bulb pushes every product half a tone to the right",
            solution:
              "프레임 안의 흰 기준면을 찾아 목표 흰색과의 비율(gain)을 구하고, 프레임 전체를 먼저 보정한 뒤 색을 읽도록 전처리 순서를 바꿈. 조명의 색온도가 달라도 같은 제품이 같은 색으로 판정되어, 추천 결과가 촬영 환경에 흔들리지 않게 고정됨",
            solutionCode:
              "gain = TARGET_WHITE / white_patch(frame) ; rgb = (frame * gain)[cy, cx]   # normalise the frame before anything reads a colour out of it",
          },
          {
            lens: "백엔드",
            tag: "한 요청에 묶여 있던 업로드와 분석",
            situation:
              "FastAPI의 /analyze 엔드포인트 하나가 사진 업로드부터 전처리, VLM 추론, 추천 생성까지 모두 처리하고 결과를 응답으로 돌려주는 동기 구조",
            problem:
              "추론이 끝날 때까지 요청이 워커를 계속 점유해, 사용자가 몰리면 뒤 요청이 앞 요청을 기다리며 줄줄이 밀리고 결국 클라이언트 타임아웃으로 끊김. 같은 사진으로 다시 시도하면 같은 추론이 처음부터 다시 돌아 부하가 더 커지는 악순환이 있었음",
            problemCode:
              '@app.post("/analyze") def analyze(f): img = preprocess(f.read()) ; return recommend(vlm(img))   # upload, inference and recommendation all inside one request',
            solution:
              "업로드 API는 이미지 해시를 키로 작업을 Redis 기반 Celery 큐에 넣고 job id만 바로 돌려주게 바꾸고, 전처리 · 추론은 워커가 맡아 앱이 결과를 따로 조회하게 함. 같은 해시는 캐시된 결과를 돌려줘, API는 추론 시간과 무관하게 즉시 응답하고 몰린 요청은 큐에서 차례로 처리됨",
            solutionCode:
              'key = sha1(blob) ; job = queue.enqueue(analyze_task, key) ; return {"job": job.id}   # the worker preprocesses and infers, the same photo never runs twice',
          },
          {
            lens: "백엔드",
            tag: "같은 안내를 매번 다시 읽던 음성",
            situation:
              "앱의 화면 전환과 안내 문구를 모두 음성으로 읽어 주기 때문에 TTS 호출이 매우 잦음. 촬영 안내처럼 정해진 문구가 여러 화면에서 반복해서 나옴",
            problem:
              "같은 문장도 나올 때마다 TTS API로 새로 합성해, 사용자는 이미 익숙한 안내에도 합성 시간만큼 매번 기다려야 했음. 호출 비용도 같은 문장이 반복되는 횟수만큼 그대로 쌓임",
            problemCode:
              "speech = tts.synthesize(text) ; return StreamingResponse(speech)   # the same sentence is synthesised again on every screen that happens to say it",
            solution:
              "문구와 목소리 설정을 합친 해시를 키로 합성된 음성을 저장해 두고, 같은 키가 오면 저장본을 바로 스트리밍하게 함. 반복되는 안내는 합성 대기 없이 즉시 재생되고, TTS 호출은 처음 나오는 문장에만 발생하게 됨",
            solutionCode:
              "key = sha1(text + voice) ; return cached(key) or store(key, tts.synthesize(text))   # repeats come back off disk, only new sentences reach the API",
          },
        ],
        repo: "https://github.com/koreamax/beautytalk-app",
        status: "종료",
      },
    ],
  },
  {
    num: "03",
    name: "AI & Cloud",
    color: "#34d399",
    stack: ["Spring Boot", "AWS Bedrock", "Lambda", "EC2", "RDS", "OpenSearch", "GitHub Actions"],
    items: [
      {
        title: "WalkingCity",
        summary:
          "동대문구 주민 취향에 맞는 산책 경로를 추천하고 왜 그 길인지까지 설명하는 서비스. 추천은 따로 떼어 Lambda 에서 돌고, 공공데이터는 임베딩해 검색으로 꺼내 쓴다.",
        arch: {
          src: "/uploads/walk-arch.webp",
          caption:
            "Spring Boot 는 GitHub Actions 를 거쳐 EC2 위 컨테이너로 올라가고 RDS 를 쓴다. AI 루트추천만 Lambda 가 맡아 Bedrock 에이전트(Claude Sonnet)와 JSON 을 주고받고, 공공데이터는 S3 → OpenSearch 벡터 DB → Titan 임베딩으로 만든 지식 베이스에서 꺼낸다. 날씨는 액션 그룹에 붙인 Lambda 가 따로 가져온다.",
        },
        issues: [
          {
            lens: "클라우드",
            tag: "추천 한 건이 서버 전체를 붙잡음",
            situation:
              "사용자의 취향과 위치를 받아 Bedrock의 Claude 모델이 산책 경로와 추천 이유를 생성하는 것이 핵심 기능. 처음에는 EC2의 Spring Boot가 지도 · 로그인 같은 일반 API와 함께 Bedrock 호출까지 직접 처리함",
            problem:
              "추천 한 건에 모델 응답을 수십 초 기다리는 동안 요청 스레드가 블로킹되어, 추천이 몰리면 스레드 풀이 바닥나고 지도 · 로그인 같은 가벼운 요청까지 대기열에서 밀림. 무거운 호출 하나가 서비스 전체의 응답성을 결정하는 구조였음",
            problemCode:
              "answer = bedrock.invoke_model(modelId=CLAUDE, body=prompt)   # the request thread sits on this for the better part of a minute while the map and the login queue up behind it",
            solution:
              "AI 추천을 Lambda로 분리해 요청마다 독립적으로 실행되게 하고, EC2는 일반 API만 처리하도록 역할을 나눔. 추천 부하는 Lambda의 동시 실행이 흡수하고 EC2 스레드는 모델 응답을 기다리지 않게 되어, 추천이 몰려도 지도 · 로그인 응답이 느려지지 않음",
            solutionCode:
              'lambda_client.invoke(FunctionName="walk-recommend", InvocationType="Event", Payload=body)   # EC2 hands it off and goes back to serving pages',
          },
          {
            lens: "클라우드",
            tag: "손으로 올리던 배포",
            situation:
              "초기에는 EC2에 SSH로 접속해 git pull → gradle build → 기존 프로세스 종료 → jar 재실행 순서로 직접 배포함. 빌드와 실행이 모두 같은 서버 위에서 이루어짐",
            problem:
              "빌드가 서버에서 돌아 서버의 JDK와 환경 변수에 따라 로컬에서 되던 빌드가 실패하는 일이 반복되고, 빌드 · 재기동 동안 서비스가 내려가 매 배포마다 중단이 생김. 절차가 사람 손에 달려 있어 순서를 하나만 놓쳐도 장애로 이어짐",
            problemCode:
              "ssh ec2 'git pull && ./gradlew build && pkill -f app.jar && nohup java -jar app.jar &'   # the build runs on the box, so its jdk and env decide whether today's deploy works, and the site is down while it does",
            solution:
              "GitHub Actions가 푸시마다 Docker 이미지를 빌드해 커밋 SHA 태그로 ECR에 올리고, EC2는 이미지를 받아 새 컨테이너를 띄운 뒤 기존 컨테이너를 내리게 파이프라인을 구성함. 빌드 환경이 이미지로 고정되어 환경 차이로 인한 실패가 사라지고, 배포가 컨테이너 교체 한 번으로 끝나며 SHA 태그로 이전 버전 롤백도 가능해짐",
            solutionCode:
              "docker build -t app:$SHA . ; docker push $ECR/app:$SHA ; ssh ec2 'docker pull $ECR/app:$SHA && docker run -d app:$SHA && docker rm -f old'   # the image is already built, the box only swaps what is running",
          },
          {
            lens: "AI",
            tag: "공공데이터만큼 불어나던 토큰",
            situation:
              "동대문구 산책로 · 공원 공공데이터를 근거로 모델이 경로를 추천해야 해서, 처음에는 전체 데이터를 JSON으로 직렬화해 시스템 프롬프트에 함께 실어 보냄",
            problem:
              "호출마다 전체 데이터셋이 입력 토큰으로 들어가, 데이터를 추가할수록 모든 요청의 토큰 비용과 응답 지연이 비례해 늘어남. 질문과 무관한 데이터가 대부분이라 모델이 참고해야 할 근거도 오히려 묻힘",
            problemCode:
              "prompt = SYSTEM + json.dumps(load_all_trails())   # every call carries the whole dataset, so adding a district adds tokens to every single request",
            solution:
              "공공데이터를 S3에 올리고 Titan 임베딩으로 벡터화해 OpenSearch 기반 Bedrock 지식 베이스를 구성하고, 질문과 가까운 상위 5건만 검색해 프롬프트에 넣는 RAG 구조로 바꿈. 데이터가 늘어도 호출당 입력 토큰이 일정하게 유지되고, 질문과 관련된 근거만 모델에 전달됨",
            solutionCode:
              "hits = opensearch.knn(embed(query), k=5) ; prompt = SYSTEM + render(hits)   # the dataset can grow all it likes, the prompt stays the size of five trails",
          },
          {
            lens: "AI",
            tag: "그날 날씨를 모르는 추천",
            situation:
              "산책 경로는 날씨의 영향을 크게 받지만, 모델은 호출 시점의 실시간 정보를 알 수 없음. 추천은 Bedrock 에이전트가 지식 베이스를 참고해 생성하는 구조",
            problem:
              "비 오는 날에도 강변 · 공원 코스를 추천하는 문제가 생김. 예보를 매 호출 프롬프트에 미리 넣으면 날씨가 필요 없는 요청에도 토큰이 들고, 프롬프트를 만든 시점의 값이라 최신성도 보장되지 않음",
            problemCode:
              'prompt = SYSTEM + trails + f"today: {forecast}"   # the forecast rides along on every call whether the answer needs it or not, and it is already stale by the time the model reads it',
            solution:
              "좌표로 기상 예보를 조회하는 Lambda를 Bedrock 에이전트의 액션 그룹(getForecast)으로 등록해, 모델이 날씨가 판단에 필요할 때만 도구로 불러 쓰게 함. 날씨를 타는 경로를 추천할 때는 그 자리에서 받은 예보가 반영되고, 날씨와 무관한 요청은 추가 토큰 없이 처리됨",
            solutionCode:
              'actionGroups=[{"name": "weather", "lambda": FORECAST_ARN, "schema": "getForecast(lat, lon)"}]   # the agent reaches for it only when the route it is about to suggest depends on the sky',
          },
        ],
        repo: "https://github.com/koreamax/walk_web",
        status: "종료",
      },
    ],
  },
  {
    num: "04",
    name: "Embedded & AI",
    color: "#fbbf24",
    stack: ["NVIDIA Jetson", "YOLO", "Optical Flow", "VLM", "TTS", "C/C++"],
    items: [
      {
        title: "VIAssist",
        summary:
          "시각장애인 보행 보조 웨어러블. 카메라 입력부터 음성 안내까지 Jetson Orin Nano Super 한 대 안에서 끝난다 — 검출, 흐름 추정, 장면 해석, 음성 합성이 모두 보드 위에 올라간다.",
        arch: {
          src: "/uploads/viassist-arch.webp",
          caption: "착용 장치와 보행 안내 화면 — 직접 찍은 네 장",
        },
        issues: [
          {
            lens: "임베디드",
            tag: "다 올리니 보드가 먼저 뜨거워짐",
            situation:
              "착용형 장치라 외부 서버 없이 Jetson Orin Nano Super 한 대에서 YOLO 검출 · 광학 흐름 · VLM 장면 해석 · TTS를 모두 처리함. 배터리로 구동되고 몸에 걸치는 케이스라 방열 여유도 거의 없음",
            problem:
              "모든 단계를 카메라 프레임 속도로 돌려 GPU · CPU가 쉬지 않고 최대 부하에 있었고, 보행 약 10분 뒤부터 온도가 오르며 서멀 스로틀링으로 클럭이 떨어짐. 추론 주기가 함께 늘어나 보행 중 음성 안내가 끊김",
            problemCode:
              "while True: detect(frame) ; flow(frame) ; describe(frame) ; speak(text)   # every stage runs at camera rate, the board throttles about ten minutes into a walk",
            solution:
              "보드의 전력 모드와 클럭을 장치에 맞게 고정하고, 온도에 따라 단계별 처리 주기를 조정하는 스케줄러를 둠. 검출은 15fps로 유지하되 무거운 VLM 해석부터 주기를 늦추게 해, 온도가 올라가도 안전에 직결되는 검출과 안내는 끊기지 않고 유지됨",
            solutionCode:
              "budget = thermal_budget(read_temp()) ; run_at(detect, 15) ; run_at(describe, budget)   # the heavy stages back off first, the guidance never stops",
          },
          {
            lens: "임베디드",
            tag: "안내가 늘 한 박자 늦음",
            situation:
              "카메라 입력 → 검출 → 장면 해석 → 음성 안내가 하나의 루프에서 차례로 실행되는 구조. 단계마다 처리 시간이 크게 다르고 VLM 장면 해석이 가장 느림",
            problem:
              "한 프레임의 모든 단계가 끝나야 다음 프레임을 읽어, 전체 주기가 가장 느린 VLM 단계에 묶임. 그사이 카메라에 들어온 새 장면은 반영되지 못해, 안내가 실제 보행 상황보다 늦게 나오는 지연이 계속 생김",
            problemCode:
              "frame = cam.read() ; boxes = detect(frame) ; text = describe(frame, boxes) ; speak(text)   # one lane: the slowest stage sets the pace for everything",
            solution:
              "각 단계를 독립된 루프로 분리해 자기 속도로 돌게 하고, 단계 사이를 최신 한 프레임만 남기는 버퍼로 연결해 느린 단계는 밀린 프레임을 쌓지 않고 버리게 함. 검출은 카메라 속도로 돌며 VLM에 붙잡히지 않고, 안내는 항상 가장 최근 프레임을 기준으로 나감",
            solutionCode:
              "cam >> Latest(1) >> detect >> Latest(1) >> describe >> speak   # each stage keeps its own rate, a slow describe drops stale frames instead of queueing them",
          },
          {
            lens: "AI",
            tag: "본 것을 다 읽어 주던 안내",
            situation:
              "YOLO가 한 프레임에서 사람 · 자전거 · 기둥 · 표지판 등 여러 객체를 동시에 검출하고 이를 음성으로 전달함. 사용자는 걸으면서 짧은 시간 안에 피할지 말지를 판단해야 함",
            problem:
              "검출된 라벨을 검출기가 돌려준 순서대로 모두 읽어, 진행 방향을 막는 장애물과 옆을 지나가는 물체가 같은 비중으로 전달됨. 안내가 길어질수록 정작 피해야 할 대상이 늦게 나와 판단이 늦어짐",
            problemCode:
              'speak(", ".join(labels))   # "person, bicycle, pole, sign, car, tree" — everything in view, in whatever order the detector returned it',
            solution:
              "진행 방향 경로 안에 있고 4m 이내인 객체만 남기고 가까운 순서로 정렬해 안내하도록 필터를 둠. 한 번의 안내에 실제로 피해야 할 대상만 가까운 것부터 전달되어, 짧은 안내만 듣고 바로 판단할 수 있게 됨",
            solutionCode:
              "blocking = [o for o in objs if in_path(o, heading) and o.dist < 4.0] ; speak(nearest_first(blocking))   # only what is actually in the way, closest first",
          },
          {
            lens: "AI",
            tag: "멈춰 있는 것과 다가오는 것을 못 가름",
            situation:
              "보행 중에는 세워 둔 자전거처럼 멈춰 있는 물체와 사용자 쪽으로 다가오는 물체가 섞여 있고, 위험도는 물체의 움직임에 따라 크게 달라짐",
            problem:
              "한 장씩만 보는 검출로는 물체의 움직임을 알 수 없어, 멈춰 있는 자전거와 다가오는 자전거가 똑같이 안내됨. 비켜야 할 순간과 그냥 지나가도 되는 순간을 구분하지 못해 경고의 신뢰도가 떨어짐",
            problemCode:
              "label = detect(frame)   # a single still frame cannot tell a parked bicycle from one closing on you at walking speed",
            solution:
              "이전 프레임과의 광학 흐름으로 검출 박스 안의 움직임을 구해 접근 속도를 추정하고, 기준 이상으로 다가오는 물체만 충돌 예상 시간(TTC)과 함께 먼저 경고하게 함. 멈춰 있는 물체에 대한 경고는 줄고, 다가오는 물체만 골라 비켜야 할 순간에 안내가 나옴",
            solutionCode:
              "v = flow_toward(prev, frame, box) ; if v > CLOSING: warn(label, ttc(v, dist))   # motion decides whether it is worth saying at all",
          },
        ],
        repo: "https://github.com/koreamax/VIAssist_Total",
        status: "종료",
      },
    ],
  },
];

/* ───────────────────────── 일하는 방식 ─────────────────────────
   만든 것 말고, 만드는 동안 하는 일. 세 가지가 한 화면씩을 통째로 쓴다.
   글은 제목 한 줄이 전부다 — 사진이 말하게 두고 이름만 붙인다.
   shots 는 public/uploads/ 아래 파일 경로. 장수가 늘면 화면을 가르는 줄이 늘고
   칸이 작아진다 (몇 장에 몇 줄인지는 components/strengths.tsx 의 GEO 참고). */
export interface Strength {
  num: string;
  /** 제목 — 이 화면이 무엇인지 */
  title: string;
  /** 사진이 깨졌을 때 그 자리에 적히는 말 */
  ph: string;
  shots: string[];
  /** 아직 사진이 덜 모인 화면 — 데이터는 두되 페이지에는 싣지 않는다 */
  draft?: boolean;
}

export const strengths: Strength[] = [
  {
    num: '01',
    title: '업무, 회의, 일정 등을 Notion에 기록하는 습관',
    ph: '노션 기록',
    shots: [
      '/uploads/note-esw-home.webp',
      '/uploads/note-esw-schedule.webp',
      '/uploads/note-piuda-meetings.webp',
      '/uploads/note-capstone.webp',
      '/uploads/note-viassist-progress.webp',
      '/uploads/note-viassist-board.webp',
      '/uploads/note-aws-sbg.webp',
      '/uploads/note-esw-todo.webp',
      '/uploads/note-skt-routing.webp',
      '/uploads/note-esw-review.webp',
      '/uploads/note-skt-schedule.webp',
      '/uploads/note-capstone-crane.webp',
    ],
  },
  /* 스터디 자체와 거기서 정리한 글을 한 화면에 — 줄마다 섞이도록 번갈아 놓는다 */
  {
    num: '02',
    title: '꾸준히 학습하는 스터디와 GitHub와 Velog 등에 학습 내용 정리',
    ph: '스터디 · 정리',
    shots: [
      '/uploads/study-velog-3tier.webp',
      '/uploads/ovs-study-cover.webp',
      '/uploads/study-velog-hypervisor.webp',
      '/uploads/os-study-readme.webp',
      '/uploads/study-gh-os-note.webp',
      '/uploads/devops-study-weeks.webp',
      '/uploads/study-gh-network.webp',
      '/uploads/k8s-study-readme.webp',
      '/uploads/study-velog-vpc.webp',
      '/uploads/os-study-weeks.webp',
      '/uploads/study-velog-sktfly.webp',
      '/uploads/coding-test-study.webp',
      '/uploads/study-gh-k8s-note.webp',
      '/uploads/study-ovs-sdn.webp',
      '/uploads/study-velog-hypervisor2.webp',
      '/uploads/study-velog-eip.webp',
      '/uploads/study-velog-3tier-diagram.webp',
      '/uploads/study-gh-rancher.webp',
    ],
  },
  /* 세로로 긴 휴대폰 화면 셋은 맨 앞에 — 앞에서부터 줄마다 하나씩 돌아가 흩어진다 */
  {
    num: '03',
    draft: true,
    title: 'AWS SBG Core Member와 대학교 조교로서 발표와 공지 및 알림',
    ph: '발표 · 공지',
    shots: [
      '/uploads/notice-devconf-poster.webp',
      '/uploads/notice-asbg-recruit.webp',
      '/uploads/notice-devconf-post.webp',
      '/uploads/notice-lunch-start.webp',
      '/uploads/notice-ai901.webp',
      '/uploads/notice-course.webp',
      '/uploads/notice-lunch-last.webp',
      '/uploads/notice-assignment.webp',
      '/uploads/notice-devops-recruit.webp',
      '/uploads/notice-bedrock-talk.webp',
      '/uploads/notice-asbg-intro.webp',
      '/uploads/notice-skt-qna.webp',
      '/uploads/notice-asbg-session.webp',
    ],
  },
];
