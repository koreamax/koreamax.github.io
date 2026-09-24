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
    logo: "/uploads/sm/pasted-1789520118922-0.png",
  },
  {
    date: "2026.09",
    title: "SKT FLY AI CHALLENGER 9기 프로젝트 부문",
    prize: "SK텔레콤 대표이사상",
    repo: "https://github.com/sktflyai9th5",
    logo: "/uploads/sm/pasted-1789520118922-0.png",
  },
  {
    date: "2025.12",
    title: "제15회 피우다 프로젝트 공모전",
    prize: "정보통신산업진흥원장상",
    repo: "https://github.com/koreamax/piudaback",
    logo: "/uploads/sm/pasted-1789520130431-0.png",
  },
  {
    date: "2025.08",
    title: "2025 K-HTML 해커톤",
    prize: "동대문구청장상",
    repo: "https://github.com/koreamax/walk_web",
    logo: "/uploads/sm/pasted-1789520173436-0.png",
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
    logo: "/uploads/sm/pasted-1789520722540-0.png",
  },
  {
    date: "2026.08",
    title: "AWS Certified Cloud Practitioner",
    org: "AWS Training and Certification",
    logo: "/uploads/sm/pasted-1789520776720-0.png",
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
  /** 무엇이 어떻게 깨졌는지 — 상황 · 원인 · 드러난 현상 순으로 한 줄씩, 번호가 붙어 그려진다 */
  problem: string[];
  /** 무엇을 바꿨고 그래서 무엇이 달라졌는지 — "방법 → 결과" 한 줄 */
  solution: string;
  /** 설명이 앉기 전에 깔려 있는 실제 코드 — 이 코드가 설명으로 바뀐다 */
  problemCode?: string;
  solutionCode?: string;
}

export interface CategoryItem {
  title: string;
  /** 문제 해결 판 맨 위 주석 — 어떤 서비스인지 한 줄 */
  brief?: string;
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
        brief: "치매 노인 말벗 챗봇 · Spring Boot가 gRPC로 EKS 위 AI 서비스 호출",
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
            tag: "gRPC 장기 연결의 첫 턴 실패",
            problemCode: "ManagedChannel ch = NettyChannelBuilder.forAddress(AI_HOST, 50051).usePlaintext().build();  // keepAlive unset - an idle hop drops the socket and nobody finds out until the next turn",
            solutionCode: "NettyChannelBuilder.forAddress(AI_HOST, 50051).keepAliveTime(30, SECONDS).keepAliveTimeout(10, SECONDS).keepAliveWithoutCalls(true).idleTimeout(5, MINUTES).usePlaintext().build();",
            problem: [
              "대화 공백 동안 중간 장비가 유휴 TCP 연결을 끊음",
              "keepAlive 미설정으로 채널이 끊김을 감지 못함",
              "다음 발화의 첫 RPC가 죽은 소켓으로 나가 실패",
            ],
            solution:
              "keepAlive PING 30s · idleTimeout 5분 → 끊긴 채널 자동 재연결, 첫 턴 실패 제거",
          },
          {
            lens: "백엔드",
            tag: "새벽 유휴 뒤 아침 첫 DB 요청 실패",
            problemCode: "spring.datasource.hikari.max-lifetime=1800000   # rds wait_timeout=600 - the pool keeps sockets the server closed 20 minutes ago and hands one to the first morning request",
            solutionCode: "spring.datasource.hikari.max-lifetime=540000 ; hikari.keepalive-time=120000 ; hikari.connection-test-query=SELECT 1 ; hikari.validation-timeout=3000 ; hikari.minimum-idle=2",
            problem: [
              "새벽에 요청이 없어 커넥션 풀의 연결이 장시간 유휴",
              "DB 유휴 종료 600s < 풀 max-lifetime 30분",
              "이미 닫힌 연결을 받은 아침 첫 쿼리가 실패",
            ],
            solution:
              "max-lifetime 9분 · 2분 주기 keepalive 검증 → DB보다 먼저 교체, 첫 요청 실패 제거",
          },
          {
            lens: "클라우드",
            tag: "음성 트래픽의 NAT 경유 비용",
            problemCode: "s3.put_object(Bucket=AUDIO, Key=key, Body=wav)  # stt/tts sit in a private subnet, so every clip is billed out through the NAT gateway and pays for the extra hop both ways",
            solutionCode: "resource \"aws_vpc_endpoint\" \"s3\" { service_name = \"com.amazonaws.ap-northeast-2.s3\" ; vpc_endpoint_type = \"Gateway\" ; route_table_ids = aws_route_table.private[*].id }",
            problem: [
              "프라이빗 서브넷의 STT · TTS 파드가 턴마다 S3와 오디오 송수신",
              "S3 트래픽 전부가 NAT 게이트웨이 경유",
              "대화량에 비례해 NAT 처리 요금 · 지연 증가",
            ],
            solution:
              "S3 게이트웨이 엔드포인트 연결 → VPC 내부 경로로 전환, NAT 요금 · 구간 제거",
          },
          {
            lens: "클라우드",
            tag: "음성 분석에 묶인 대화 응답",
            problemCode: "dementia = hubert.analyze(wav) ; return Converse(reply=tts(text), risk=dementia)  # the turn cannot return until the analysis finishes, so the elder waits on a model, not on us",
            solutionCode: "sqs.send_message(QueueUrl=HUBERT_Q, MessageBody=key) ; return Converse(reply=tts(text))  # analysis leaves the dialogue path and lands on the guardian side a moment later",
            problem: [
              "HuBERT 치매 분석이 대화 응답과 같은 요청에서 실행",
              "분석 시간이 그대로 어르신의 대기 시간",
              "분석 실패 시 응답까지 함께 실패",
            ],
            solution:
              "분석을 SQS 비동기 워커로 분리 → 응답 즉시 반환, 분석은 큐에서 누락 없이 처리",
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
        brief: "시각장애인 메이크업 도우미 · 화장품 촬영 → VLM 판정 → 음성 안내",
        summary:
          "시각장애인·저시력 사용자를 위한 메이크업 도우미. 앱이 찍은 화면을 백엔드가 받아 전처리하고, 화장품·메이크업 판정을 모델에 맡긴 뒤 결과를 음성으로 돌려준다.",
        arch: {
          src: "/uploads/beauty-arch.webp",
          caption: "Flutter 앱 → FastAPI → 전처리 · VLM 판정 → TTS. 무거운 일은 작업 큐로 넘기고 결과만 따로 받아 간다.",
        },
        issues: [
          {
            lens: "AI",
            tag: "핵심이 늦게 나오는 음성 설명",
            problem: [
              "자유 형식 프롬프트로 제품 소개부터 장황하게 생성",
              "필요한 색상 · 제형이 문장 뒷부분에 위치",
              "화면을 못 보는 사용자는 설명 전체를 들어야 함",
            ],
            problemCode:
              'prompt = "Describe this cosmetic product."   # free-form answer: the shade turns up somewhere in the fourth sentence, forty seconds into the speech',
            solution:
              "JSON 스키마 고정(색상 우선 · 필드당 12단어) → 첫 마디에 색상, 안내 길이 일정",
            solutionCode:
              'schema = {"category": str, "shade": str, "finish": str, "how_to": str} ; prompt = "Fill every field in under twelve words, shade first."',
          },
          {
            lens: "AI",
            tag: "조명에 흔들리는 색 판정",
            problem: [
              "촬영 픽셀의 RGB를 보정 없이 그대로 사용",
              "전구색 · 그늘에서 같은 제품이 다른 색으로 판정",
              "촬영 환경마다 추천 결과가 달라짐",
            ],
            problemCode:
              "rgb = frame[cy, cx]   # the shade is read straight off the pixel, so a warm bulb pushes every product half a tone to the right",
            solution:
              "흰 기준면으로 화이트밸런스 보정 후 색 추출 → 조명과 무관하게 같은 색 판정",
            solutionCode:
              "gain = TARGET_WHITE / white_patch(frame) ; rgb = (frame * gain)[cy, cx]   # normalise the frame before anything reads a colour out of it",
          },
          {
            lens: "백엔드",
            tag: "동기 API의 요청 적체와 타임아웃",
            problem: [
              "업로드 · 전처리 · VLM 추론 · 추천이 한 요청에서 순차 실행",
              "추론 동안 워커 점유로 동시 요청이 대기열에 적체",
              "재시도마다 같은 추론이 반복되어 부하 가중",
            ],
            problemCode:
              '@app.post("/analyze") def analyze(f): img = preprocess(f.read()) ; return recommend(vlm(img))   # upload, inference and recommendation all inside one request',
            solution:
              "Celery 작업 큐 + 이미지 해시 캐시 → API 즉시 응답, 중복 추론 제거",
            solutionCode:
              'key = sha1(blob) ; job = queue.enqueue(analyze_task, key) ; return {"job": job.id}   # the worker preprocesses and infers, the same photo never runs twice',
          },
          {
            lens: "백엔드",
            tag: "반복 안내 문구의 TTS 재합성",
            problem: [
              "화면마다 같은 안내 문구를 매번 새로 합성",
              "익숙한 안내에도 합성 대기 반복",
              "같은 문장 횟수만큼 TTS 호출 비용 누적",
            ],
            problemCode:
              "speech = tts.synthesize(text) ; return StreamingResponse(speech)   # the same sentence is synthesised again on every screen that happens to say it",
            solution:
              "문구 + 목소리 해시로 음성 캐시 → 반복 안내 즉시 재생, 새 문장만 호출",
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
        brief: "동대문구 주민 맞춤 산책 경로 추천 · Bedrock 에이전트 + RAG",
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
            tag: "모델 호출에 막힌 일반 API",
            problem: [
              "EC2의 Spring Boot가 Bedrock을 직접 동기 호출",
              "수십 초 응답 대기 동안 요청 스레드 점유",
              "추천이 몰리면 지도 · 로그인 요청까지 지연",
            ],
            problemCode:
              "answer = bedrock.invoke_model(modelId=CLAUDE, body=prompt)   # the request thread sits on this for the better part of a minute while the map and the login queue up behind it",
            solution:
              "추천을 Lambda로 분리 → EC2는 일반 API 전담, 추천 부하와 무관하게 응답 유지",
            solutionCode:
              'lambda_client.invoke(FunctionName="walk-recommend", InvocationType="Event", Payload=body)   # EC2 hands it off and goes back to serving pages',
          },
          {
            lens: "클라우드",
            tag: "수동 배포의 환경 차이와 서비스 중단",
            problem: [
              "SSH 접속 후 서버에서 직접 빌드 · 재기동",
              "서버 JDK · 환경 차이로 빌드 실패 반복",
              "빌드 · 재기동 동안 서비스 중단",
            ],
            problemCode:
              "ssh ec2 'git pull && ./gradlew build && pkill -f app.jar && nohup java -jar app.jar &'   # the build runs on the box, so its jdk and env decide whether today's deploy works, and the site is down while it does",
            solution:
              "GitHub Actions → ECR 이미지 → EC2 컨테이너 교체 → 빌드 환경 고정, SHA 태그 롤백",
            solutionCode:
              "docker build -t app:$SHA . ; docker push $ECR/app:$SHA ; ssh ec2 'docker pull $ECR/app:$SHA && docker run -d app:$SHA && docker rm -f old'   # the image is already built, the box only swaps what is running",
          },
          {
            lens: "AI",
            tag: "데이터 양에 비례하는 토큰 비용",
            problem: [
              "공공데이터 전체를 매 호출 프롬프트에 포함",
              "데이터 추가 시 모든 요청의 토큰 · 지연 증가",
              "질문과 무관한 데이터가 근거를 흐림",
            ],
            problemCode:
              "prompt = SYSTEM + json.dumps(load_all_trails())   # every call carries the whole dataset, so adding a district adds tokens to every single request",
            solution:
              "Titan 임베딩 + OpenSearch 지식 베이스, 상위 5건만 검색 → 호출당 토큰 일정",
            solutionCode:
              "hits = opensearch.knn(embed(query), k=5) ; prompt = SYSTEM + render(hits)   # the dataset can grow all it likes, the prompt stays the size of five trails",
          },
          {
            lens: "AI",
            tag: "실시간 날씨를 모르는 추천",
            problem: [
              "모델이 호출 시점의 날씨를 알 수 없음",
              "비 오는 날에도 강변 코스 추천",
              "예보를 미리 넣으면 불필요한 토큰 · 오래된 값",
            ],
            problemCode:
              'prompt = SYSTEM + trails + f"today: {forecast}"   # the forecast rides along on every call whether the answer needs it or not, and it is already stale by the time the model reads it',
            solution:
              "예보 Lambda를 에이전트 액션 그룹으로 등록 → 필요할 때만 실시간 조회",
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
        brief: "시각장애인 보행 보조 웨어러블 · Jetson 한 대에서 검출부터 음성까지",
        summary:
          "시각장애인 보행 보조 웨어러블. 카메라 입력부터 음성 안내까지 Jetson Orin Nano Super 한 대 안에서 끝난다 — 검출, 흐름 추정, 장면 해석, 음성 합성이 모두 보드 위에 올라간다.",
        arch: {
          src: "/uploads/viassist-arch.webp",
          caption: "착용 장치와 보행 안내 화면 — 직접 찍은 네 장",
        },
        issues: [
          {
            lens: "임베디드",
            tag: "발열 스로틀링으로 끊기는 안내",
            problem: [
              "검출 · 광학 흐름 · VLM · TTS를 한 보드에서 프레임마다 실행",
              "보행 약 10분 뒤 온도 상승으로 클럭 저하",
              "추론 주기가 늘어 음성 안내 끊김",
            ],
            problemCode:
              "while True: detect(frame) ; flow(frame) ; describe(frame) ; speak(text)   # every stage runs at camera rate, the board throttles about ten minutes into a walk",
            solution:
              "전력 모드 고정 + 온도 기반 주기 조절(검출 15fps 유지, VLM부터 감속) → 안내 유지",
            solutionCode:
              "budget = thermal_budget(read_temp()) ; run_at(detect, 15) ; run_at(describe, budget)   # the heavy stages back off first, the guidance never stops",
          },
          {
            lens: "임베디드",
            tag: "순차 파이프라인의 안내 지연",
            problem: [
              "입력 → 검출 → 해석 → 음성이 한 루프에서 순차 실행",
              "전체 주기가 가장 느린 VLM에 묶임",
              "새 장면 반영이 늦어 안내가 실제보다 늦음",
            ],
            problemCode:
              "frame = cam.read() ; boxes = detect(frame) ; text = describe(frame, boxes) ; speak(text)   # one lane: the slowest stage sets the pace for everything",
            solution:
              "단계별 독립 루프 + 최신 1프레임 버퍼 → 검출은 카메라 속도, 안내는 최신 프레임 기준",
            solutionCode:
              "cam >> Latest(1) >> detect >> Latest(1) >> describe >> speak   # each stage keeps its own rate, a slow describe drops stale frames instead of queueing them",
          },
          {
            lens: "AI",
            tag: "검출 결과를 전부 나열하는 안내",
            problem: [
              "검출 라벨을 반환 순서대로 전부 읽음",
              "장애물과 지나가는 물체가 같은 비중",
              "피해야 할 대상이 늦게 전달",
            ],
            problemCode:
              'speak(", ".join(labels))   # "person, bicycle, pole, sign, car, tree" — everything in view, in whatever order the detector returned it',
            solution:
              "진행 경로 · 4m 이내만 남기고 가까운 순 정렬 → 피할 대상만 한 마디로 안내",
            solutionCode:
              "blocking = [o for o in objs if in_path(o, heading) and o.dist < 4.0] ; speak(nearest_first(blocking))   # only what is actually in the way, closest first",
          },
          {
            lens: "AI",
            tag: "정지 물체와 접근 물체 미구분",
            problem: [
              "단일 프레임 검출이라 움직임 정보 없음",
              "세워 둔 자전거와 다가오는 자전거가 같은 안내",
              "경고 신뢰도 저하",
            ],
            problemCode:
              "label = detect(frame)   # a single still frame cannot tell a parked bicycle from one closing on you at walking speed",
            solution:
              "광학 흐름으로 접근 속도 추정, 접근 물체만 TTC와 함께 경고 → 필요한 순간에만 경고",
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
