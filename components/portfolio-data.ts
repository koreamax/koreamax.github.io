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
            problemCode: "ManagedChannel ch = NettyChannelBuilder.forAddress(AI_HOST, 50051).usePlaintext().build();  // keepAlive unset - an idle hop drops the socket and nobody finds out until the next turn",
            solutionCode: "NettyChannelBuilder.forAddress(AI_HOST, 50051).keepAliveTime(30, SECONDS).keepAliveTimeout(10, SECONDS).keepAliveWithoutCalls(true).idleTimeout(5, MINUTES).usePlaintext().build();",
            problem:
              "Spring Boot와 AI 오케스트레이터를 gRPC 장기 연결로 묶었는데 대화가 뜸한 사이 중간 장비가 유휴 연결을 말없이 끊어, 다음 발화에서야 끊긴 것을 알고 첫 턴이 실패함",
            solution:
              "유휴 구간에도 연결 상태를 확인하도록 gRPC keep-alive ping을 켜고 끊긴 채널은 즉시 다시 맺게 해, 말을 걸었을 때 첫 턴이 실패하는 일이 사라짐",
          },
          {
            lens: "백엔드",
            tag: "아침 첫 요청만 터지던 DB",
            problemCode: "spring.datasource.hikari.max-lifetime=1800000   # rds wait_timeout=600 - the pool keeps sockets the server closed 20 minutes ago and hands one to the first morning request",
            solutionCode: "spring.datasource.hikari.max-lifetime=540000 ; hikari.keepalive-time=120000 ; hikari.connection-test-query=SELECT 1 ; hikari.validation-timeout=3000 ; hikari.minimum-idle=2",
            problem:
              "새벽에는 요청이 없어 커넥션 풀의 연결이 오래 놀았는데 RDS가 먼저 그 연결을 닫아, 아침 첫 요청이 이미 죽은 연결을 집어 들고 실패함",
            solution:
              "풀이 유휴 연결을 주기적으로 확인하게 하고 연결 수명을 DB가 끊는 시간보다 짧게 잡아 미리 교체되도록 해, 아침 첫 요청이 끊기는 일이 없어짐",
          },
          {
            lens: "클라우드",
            tag: "NAT를 거쳐 나가던 음성",
            problemCode: "s3.put_object(Bucket=AUDIO, Key=key, Body=wav)  # stt/tts sit in a private subnet, so every clip is billed out through the NAT gateway and pays for the extra hop both ways",
            solutionCode: "resource \"aws_vpc_endpoint\" \"s3\" { service_name = \"com.amazonaws.ap-northeast-2.s3\" ; vpc_endpoint_type = \"Gateway\" ; route_table_ids = aws_route_table.private[*].id }",
            problem:
              "STT·TTS 파드가 프라이빗 서브넷에 있어 S3에 음성을 넣고 꺼낼 때마다 NAT 게이트웨이를 통과했는데, 한 마디마다 오디오가 오가는 서비스라 사용자가 늘수록 NAT 처리 요금과 구간 지연이 같이 불어남",
            solution:
              "S3를 VPC 게이트웨이 엔드포인트로 붙여 오디오를 VPC 안에서 바로 주고받게 바꿔, NAT를 타는 구간과 거기서 나오던 전송 비용을 함께 걷어냄",
          },
          {
            lens: "클라우드",
            tag: "분석이 대답을 붙잡음",
            problemCode: "dementia = hubert.analyze(wav) ; return Converse(reply=tts(text), risk=dementia)  # the turn cannot return until the analysis finishes, so the elder waits on a model, not on us",
            solutionCode: "sqs.send_message(QueueUrl=HUBERT_Q, MessageBody=key) ; return Converse(reply=tts(text))  # analysis leaves the dialogue path and lands on the guardian side a moment later",
            problem:
              "치매 의심 신호를 찾는 HuBERT 음성 분석이 대화 응답과 한 요청에 묶여 있어, 분석이 끝나야 답이 나가는 탓에 정작 말벗으로 쓰기 어려운 대기가 생김",
            solution:
              "분석을 SQS로 떼어 내 대화 흐름 밖에서 처리하고 결과는 뒤따라 보호자 쪽에 쌓이게 해, 응답은 바로 나가면서 분석은 빠짐없이 남는 구조로 정리함",
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
            problem:
              "화장품을 비추면 모델이 본 것을 문장으로 길게 풀어 쓰는데, 화면을 훑을 수 없는 사용자는 정작 필요한 색과 제형이 나올 때까지 그 문장을 끝까지 들어야 함",
            problemCode:
              'prompt = "Describe this cosmetic product."   # free-form answer: the shade turns up somewhere in the fourth sentence, forty seconds into the speech',
            solution:
              "무엇을 어떤 순서로 말할지 칸을 정해 모델이 그 칸만 채우게 하고 색부터 읽도록 바꿔, 첫 마디만 들어도 무엇인지 알 수 있게 정리함",
            solutionCode:
              'schema = {"category": str, "shade": str, "finish": str, "how_to": str} ; prompt = "Fill every field in under twelve words, shade first."',
          },
          {
            lens: "AI",
            tag: "빛에 따라 달라지던 색 판정",
            problem:
              "화장품 색을 찍힌 픽셀에서 곧바로 읽어, 전구가 노랗거나 그늘이 지면 같은 제품이 볼 때마다 다른 색으로 나와 추천이 흔들림",
            problemCode:
              "rgb = frame[cy, cx]   # the shade is read straight off the pixel, so a warm bulb pushes every product half a tone to the right",
            solution:
              "사진 안의 흰 기준면으로 색을 먼저 맞춘 뒤 읽게 해, 조명이 달라도 같은 제품이 같은 색으로 나오도록 고정함",
            solutionCode:
              "gain = TARGET_WHITE / white_patch(frame) ; rgb = (frame * gain)[cy, cx]   # normalise the frame before anything reads a colour out of it",
          },
          {
            lens: "백엔드",
            tag: "한 요청에 묶여 있던 업로드와 분석",
            problem:
              "사진 업로드와 전처리, 모델 호출, 추천 생성이 한 요청 안에서 차례로 돌아, 사람이 몰리면 앞 요청이 끝날 때까지 뒤가 통째로 밀리고 결국 타임아웃으로 끊김",
            problemCode:
              '@app.post("/analyze") def analyze(f): img = preprocess(f.read()) ; return recommend(vlm(img))   # upload, inference and recommendation all inside one request',
            solution:
              "업로드와 분석을 갈라 분석은 작업 큐로 넘기고 결과만 따로 받아 가게 하고, 같은 사진의 재분석은 캐시로 건너뛰게 해 API 가 붙잡히지 않도록 정리함",
            solutionCode:
              'key = sha1(blob) ; job = queue.enqueue(analyze_task, key) ; return {"job": job.id}   # the worker preprocesses and infers, the same photo never runs twice',
          },
          {
            lens: "백엔드",
            tag: "같은 안내를 매번 다시 읽던 음성",
            problem:
              "화면마다 나오는 같은 안내 문구를 그때그때 음성으로 새로 만들어, 말이 나오기까지 매번 같은 시간을 기다리고 호출 비용도 그만큼 반복됨",
            problemCode:
              "speech = tts.synthesize(text) ; return StreamingResponse(speech)   # the same sentence is synthesised again on every screen that happens to say it",
            solution:
              "문구와 목소리가 같으면 만들어 둔 음성을 다시 쓰도록 해시로 캐시해, 반복되는 안내는 기다림 없이 나오고 호출은 새 문구에만 들어가게 함",
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
            problem:
              "추천 한 번에 생성 모델 응답을 수십 초 기다려야 하는데 이를 EC2 위 애플리케이션이 직접 호출해, 기다리는 동안 스레드를 붙잡아 지도·로그인 같은 일반 요청까지 밀림",
            problemCode:
              "answer = bedrock.invoke_model(modelId=CLAUDE, body=prompt)   # the request thread sits on this for the better part of a minute while the map and the login queue up behind it",
            solution:
              "AI 추천만 Lambda 로 떼어 내 요청마다 따로 뜨고 끝나면 사라지게 하고 EC2 는 일반 트래픽만 맡게 해, 추천이 몰려도 나머지 화면이 느려지지 않게 됨",
            solutionCode:
              'lambda_client.invoke(FunctionName="walk-recommend", InvocationType="Event", Payload=body)   # EC2 hands it off and goes back to serving pages',
          },
          {
            lens: "클라우드",
            tag: "손으로 올리던 배포",
            problem:
              "서버에 직접 들어가 받아 빌드하고 띄우다 보니 내 컴퓨터에서 되던 것이 서버에서 안 되는 일이 되풀이되고, 빌드가 도는 동안에는 서비스가 멈춰 있음",
            problemCode:
              "ssh ec2 'git pull && ./gradlew build && pkill -f app.jar && nohup java -jar app.jar &'   # the build runs on the box, so its jdk and env decide whether today's deploy works, and the site is down while it does",
            solution:
              "GitHub Actions 가 이미지를 미리 구워 두고 EC2 는 컨테이너만 갈아끼우게 바꿔, 어디서 돌려도 같은 환경이 되고 배포가 교체 한 번으로 끝남",
            solutionCode:
              "docker build -t app:$SHA . ; docker push $ECR/app:$SHA ; ssh ec2 'docker pull $ECR/app:$SHA && docker run -d app:$SHA && docker rm -f old'   # the image is already built, the box only swaps what is running",
          },
          {
            lens: "AI",
            tag: "공공데이터만큼 불어나던 토큰",
            problem:
              "산책로·공원 공공데이터를 프롬프트에 통째로 실어, 호출 한 번에 드는 토큰이 데이터 양을 그대로 따라가 자료를 더할수록 비용과 응답 시간이 같이 늘어남",
            problemCode:
              "prompt = SYSTEM + json.dumps(load_all_trails())   # every call carries the whole dataset, so adding a district adds tokens to every single request",
            solution:
              "공공데이터를 미리 임베딩해 검색으로 올려 두고 질문과 가까운 몇 건만 프롬프트에 실어, 자료가 늘어도 한 호출에 들어가는 토큰은 그대로이게 만듦",
            solutionCode:
              "hits = opensearch.knn(embed(query), k=5) ; prompt = SYSTEM + render(hits)   # the dataset can grow all it likes, the prompt stays the size of five trails",
          },
          {
            lens: "AI",
            tag: "그날 날씨를 모르는 추천",
            problem:
              "모델은 오늘 날씨를 알 수 없어 비 오는 날에도 강변 코스를 권했는데, 그렇다고 예보를 프롬프트에 미리 실으면 쓰지도 않을 값이 호출마다 따라가고 읽힐 즈음엔 이미 지난 값이 됨",
            problemCode:
              'prompt = SYSTEM + trails + f"today: {forecast}"   # the forecast rides along on every call whether the answer needs it or not, and it is already stale by the time the model reads it',
            solution:
              "날씨 조회를 Bedrock 에이전트의 액션 그룹에 Lambda 로 붙여, 권하려는 길이 날씨를 타는 경우에만 모델이 그 자리에서 불러 쓰게 함",
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
            problem:
              "몸에 걸치는 장치라 전력과 발열에 여유가 없는데 검출·흐름 추정·언어 모델·음성 합성을 한 보드에 다 올려, 오래 걸으면 온도가 올라가며 클럭이 내려가 안내가 끊김",
            problemCode:
              "while True: detect(frame) ; flow(frame) ; describe(frame) ; speak(text)   # every stage runs at camera rate, the board throttles about ten minutes into a walk",
            solution:
              "전력 모드와 클럭을 보드에 맞춰 잡고 처리 주기를 상황에 따라 늦추도록 해, 온도가 올라가도 안내가 끊기지 않게 정리함",
            solutionCode:
              "budget = thermal_budget(read_temp()) ; run_at(detect, 15) ; run_at(describe, budget)   # the heavy stages back off first, the guidance never stops",
          },
          {
            lens: "임베디드",
            tag: "안내가 늘 한 박자 늦음",
            problem:
              "카메라 한 장을 받아 모든 단계를 끝낸 뒤에야 다음 장을 받아, 가장 느린 단계가 전체 주기를 정하고 그만큼 안내가 실제 상황보다 늦게 나옴",
            problemCode:
              "frame = cam.read() ; boxes = detect(frame) ; text = describe(frame, boxes) ; speak(text)   # one lane: the slowest stage sets the pace for everything",
            solution:
              "단계를 갈라 각자 자기 속도로 돌게 하고 사이를 최신 한 장만 남는 버퍼로 이어, 느린 단계가 빠른 단계를 붙잡지 않도록 바꿈",
            solutionCode:
              "cam >> Latest(1) >> detect >> Latest(1) >> describe >> speak   # each stage keeps its own rate, a slow describe drops stale frames instead of queueing them",
          },
          {
            lens: "AI",
            tag: "본 것을 다 읽어 주던 안내",
            problem:
              "검출된 물체를 보이는 대로 다 말해, 걷는 사람에게 정작 중요한 앞을 막은 것과 그냥 지나가는 것이 같은 무게로 들려 판단이 늦어짐",
            problemCode:
              'speak(", ".join(labels))   # "person, bicycle, pole, sign, car, tree" — everything in view, in whatever order the detector returned it',
            solution:
              "진행 방향과 거리로 걸림이 되는 것만 남기고 가까운 것부터 읽도록 바꿔, 한 마디로 무엇을 피해야 하는지 알 수 있게 정리함",
            solutionCode:
              "blocking = [o for o in objs if in_path(o, heading) and o.dist < 4.0] ; speak(nearest_first(blocking))   # only what is actually in the way, closest first",
          },
          {
            lens: "AI",
            tag: "멈춰 있는 것과 다가오는 것을 못 가름",
            problem:
              "한 장씩만 보고 판단해 세워 둔 자전거와 다가오는 자전거가 똑같이 들리고, 정작 비켜야 할 때와 그냥 지나가도 될 때를 구분해 주지 못함",
            problemCode:
              "label = detect(frame)   # a single still frame cannot tell a parked bicycle from one closing on you at walking speed",
            solution:
              "장면 흐름을 함께 읽어 물체가 다가오는지 멀어지는지 가려내고 다가오는 것만 먼저 알리도록 해, 비켜야 할 순간에만 말이 나오게 함",
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
