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
}

/* 프로젝트마다 한 장씩 — 어느 하나가 더 자주 나오지 않도록 */
export const corridorCards: CorridorCard[] = [
  {
    title: "Seagnal",
    shots: ["/uploads/seagnal-1.webp", "/uploads/seagnal-2.webp", "/uploads/seagnal-3.webp", "/uploads/seagnal-4.webp"],
  },
  {
    title: "VIAssist",
    shots: ["/uploads/viassist-1.webp", "/uploads/viassist-2.webp", "/uploads/viassist-3.webp", "/uploads/viassist-4.webp"],
  },
  { title: "Goliath Crane" },
  { title: "LLM ROUTER" },
  { title: "GSV Paper" },
  { title: "JeokjaeJeokso" },
  { title: "beautytalk" },
  {
    title: "Mission Pawss!ble",
    shots: ["/uploads/paws-1.webp", "/uploads/paws-2.webp", "/uploads/paws-3.webp", "/uploads/paws-4.webp"],
    shotColumns: 4,
  },
  {
    title: "Wilson",
    shots: ["/uploads/wilson-1.webp", "/uploads/wilson-2.webp", "/uploads/wilson-3.webp", "/uploads/wilson-4.webp"],
    shotColumns: 4,
  },
  { title: "Cloud Island" },
  {
    title: "WalkingCity",
    shots: ["/uploads/walk-1.webp", "/uploads/walk-2.webp", "/uploads/walk-3.webp", "/uploads/walk-4.webp"],
    shotColumns: 4,
  },
];

/* ───────────────────────── 분야별 프로젝트 ─────────────────────────
   같은 프로젝트라도 분야에 따라 맡은 역할과 풀어낸 문제가 다르므로
   설명 · 문제 · 해결을 분야별로 따로 적는다. */

/** 한 프로젝트에서 짚은 문제 하나. 문제와 해결을 짝으로 붙여 둔다. */
export interface CategoryIssue {
  /** 무엇에 관한 이야기인지 — 카드에서 번호 옆에 붙는 짧은 제목 */
  tag: string;
  /** 무엇이 왜 문제였는지. 이 프로젝트를 처음 보는 사람도 알아듣게 적는다 */
  problem: string;
  /** 어떻게 풀었고 그래서 무엇이 달라졌는지 */
  solution: string;
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
    name: "Backend",
    color: "#60a5fa",
    stack: ["Spring Boot", "FastAPI", "Node.js", "MySQL", "PostgreSQL", "Redis"],
    items: [
      {
        title: "beautytalk",
        summary: "시각장애인·저시력 사용자를 위한 메이크업 도우미 API",
        problem:
          "얼굴 이미지 업로드와 분석, 추천 생성이 한 요청 안에서 동기로 처리돼 사용자가 몰리면 요청이 줄줄이 밀리고 타임아웃이 났다.",
        solution:
          "업로드와 분석을 분리해 분석은 작업 큐로 넘기고 결과만 따로 받아가도록 바꿨다. 이미지 전처리는 백그라운드 워커로 옮겨 API 스레드를 비웠고, 같은 사진에 대한 재분석은 캐시로 건너뛰게 했다.",
        repo: "https://github.com/koreamax/beautytalk-app",
        status: "종료",
      },
      {
        title: "Mission Pawss!ble",
        summary: "반려견 산책으로 도시 위험을 제보하고 지자체와 연결하는 플랫폼",
        problem:
          "같은 위험 지점을 여러 사람이 제보해 중복 데이터가 쌓였고, 처리 상태를 동시에 바꾸면 값이 덮어써지는 충돌이 생겼다.",
        solution:
          "위경도 근접 제보를 하나의 그룹 키로 묶어 중복을 합치고, 상태 변경에는 버전을 둔 낙관적 잠금을 적용했다. 사진 원본은 오브젝트 스토리지에 두고 데이터베이스에는 참조만 남겨 테이블을 가볍게 유지했다.",
        repo: "https://github.com/koreamax/TECH4GOOD_OH",
        status: "종료",
      },
      {
        title: "Wilson",
        summary: "치매 노인을 위한 말벗 챗봇의 서비스 간 통신 설계",
        issues: [
          {
            tag: "말을 걸면 첫 턴이 실패",
            problem:
              "백엔드와 AI 서버를 gRPC 장기 연결로 묶었는데 대화가 뜸한 사이 중간 장비가 유휴 연결을 말없이 끊어, 다음 발화에서야 끊긴 것을 알고 첫 턴이 실패함",
            solution:
              "유휴 구간에도 연결 상태를 확인하도록 gRPC keep-alive ping을 켜고 끊긴 채널은 즉시 다시 맺게 해, 말을 걸었을 때 첫 턴이 실패하는 일이 사라짐",
          },
          {
            tag: "아침 첫 요청만 터지던 DB",
            problem:
              "새벽에는 요청이 없어 커넥션 풀의 연결이 오래 놀았는데 DB가 먼저 그 연결을 닫아, 아침 첫 요청이 이미 죽은 연결을 집어 들고 실패함",
            solution:
              "풀이 유휴 연결을 주기적으로 확인하게 하고 연결 수명을 DB가 끊는 시간보다 짧게 잡아 미리 교체되도록 해, 아침 첫 요청이 끊기는 일이 없어짐",
          },
        ],
        repo: "https://github.com/koreamax/wilson_chatbot",
        status: "종료",
      },
      {
        title: "Seagnal",
        summary: "해양 환경 정화 활동을 모으는 통합 ICT 플랫폼",
        issues: [
          {
            tag: "지도 한 번에 쿼리 수천 번",
            problem:
              "핀 목록을 불러온 뒤 핀마다 후기를, 후기마다 사진을 다시 조회하는 구조여서, 핀 200개 기준 한 화면에 쿼리가 천 번 넘게 발생하고 지도 첫 로딩이 그만큼 지연됨",
            solution:
              "핀·후기·사진을 조인 한 번으로 묶고 누적 수거량은 집계 쿼리로 넘겨, 핀이 늘어도 요청당 쿼리 수가 고정되도록 개선함",
          },
          {
            tag: "매번 처음부터 훑던 조회",
            problem:
              "로그인마다 이메일로 회원을 찾고 대시보드마다 전체 후기를 합산하는데 조회 기준에 인덱스가 없어, 매번 테이블을 끝까지 읽고 행이 쌓인 만큼 그대로 느려짐",
            solution:
              "자주 쓰는 조회 기준에 인덱스를 걸어 전체 스캔을 없애고, 자주 읽히지만 잘 바뀌지 않는 누적 통계는 Redis에 캐시해 같은 집계의 반복을 제거함",
          },
        ],
        repo: "https://github.com/koreamax/piudaback",
        status: "종료",
      },
    ],
  },
  {
    num: "02",
    name: "AI",
    color: "#a78bfa",
    stack: ["PyTorch", "OpenCV", "OCR", "LLM", "VLM", "LangChain", "RAG"],
    items: [
      {
        title: "GSV Paper",
        summary: "구글 스트리트뷰 간판을 검출하고 텍스트를 뽑아내는 파이프라인",
        problem:
          "거리 사진 속 간판은 기울고 작고 일부가 가려져 있어 OCR만으로는 글자를 놓쳤고, 한 장에 간판이 여러 개라 엉뚱한 영역까지 읽어 들였다.",
        solution:
          "YOLO로 간판 영역을 먼저 검출해 잘라낸 뒤 해상도를 키워 OCR에 넘기는 2단 구조로 바꿨다. OCR 신뢰도가 기준 아래일 때만 VLM에게 이미지를 넘겨 문자열을 보정하게 해서, 비용이 큰 모델은 어려운 간판에만 쓰이도록 했다.",
        repo: "https://github.com/koreamax/GSV_SIGNBOARD",
        status: "진행 중",
      },
      {
        title: "beautytalk",
        summary: "메이크업 설명을 말로 풀어주는 생성 모델 튜닝",
        problem:
          "설명의 말투와 단계 순서를 맞추려고 QLoRA로 파인튜닝했지만, 확보한 학습 데이터가 적어 금세 과적합됐다. 학습에 없던 요청에는 지시를 놓치고 엉뚱한 형식으로 답했다.",
        solution:
          "파인튜닝을 접고 few-shot 프롬프트로 방향을 바꿨다. 대표 예시 몇 개를 고정 블록으로 넣어 말투와 단계 구조를 잡고, 출력 형식을 강제해 응답이 흔들리지 않게 했다. 데이터가 적을 때는 학습보다 프롬프트 설계가 더 빨리 안정된다는 걸 확인했다.",
        repo: "https://github.com/koreamax/beautytalk-app",
        status: "종료",
      },
      {
        title: "VIAssist",
        summary: "시각장애인 보행 보조 웨어러블의 온디바이스 추론",
        problem:
          "YOLO 검출, Optical Flow, VLM, TTS를 한 기기에서 동시에 돌리자 프레임이 밀렸다. 보행 안내는 늦으면 쓸모가 없는데 지연이 체감될 만큼 커졌다.",
        solution:
          "모델을 양자화해 메모리와 연산량을 줄이고 추론 엔진에 맞게 변환해 지연을 낮췄다. 무거운 VLM은 매 프레임이 아니라 장면이 바뀌었을 때만 호출하도록 트리거를 나눠, 실시간으로 돌아야 하는 검출과 흐름 추정에 자원을 몰아줬다.",
        repo: "https://github.com/koreamax/VIAssist_Total",
        status: "종료",
      },
      {
        title: "LLM ROUTER",
        summary: "질문에 맞는 모델로 보내 비용과 품질을 함께 잡는 라우터",
        problem:
          "쉬운 질문까지 큰 모델로 보내면 비용이 불어나고, 반대로 작은 모델로 몰면 어려운 질문에서 정답률이 떨어졌다. 둘 중 하나를 고르는 문제가 아니었다.",
        solution:
          "질문 임베딩과 길이·형식 같은 난이도 특징으로 라우팅 분류기를 학습시켜 모델을 고르게 했다. 분류기의 확신도에 임계값을 두고 애매한 질문만 큰 모델로 올려보내, 비용과 정확도가 만나는 지점을 찾아 조정했다.",
        repo: "https://github.com/koreamax/SKTLLMROUTER0.710",
        status: "종료",
      },
    ],
  },
  {
    num: "03",
    name: "Cloud",
    color: "#fbbf24",
    stack: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"],
    items: [
      {
        title: "Mission Pawss!ble",
        summary: "제보 이미지가 몰리는 시민참여 서비스의 인프라",
        problem:
          "제보 사진이 애플리케이션 서버를 거쳐 업로드되다 보니 트래픽이 몰릴 때 서버가 함께 흔들렸고, 배포할 때마다 서비스가 잠깐씩 끊겼다.",
        solution:
          "프리사인드 URL을 발급해 사진을 오브젝트 스토리지로 직접 올리게 하여 서버에서 업로드 부하를 걷어냈다. 애플리케이션은 컨테이너로 올리고 새 버전이 준비된 뒤 전환하는 방식으로 배포해 중단을 없앴다.",
        repo: "https://github.com/koreamax/TECH4GOOD_OH",
        status: "종료",
      },
      {
        title: "Wilson",
        summary: "무거운 추론 서비스를 감당하기 위한 쿠버네티스 운영",
        problem:
          "대화 생성 서비스가 요청마다 자원을 크게 먹어 한 대로는 동시 사용자를 감당하지 못했다. 같은 인스턴스에 있던 가벼운 API까지 덩달아 느려졌다.",
        solution:
          "추론 서비스와 일반 API를 별도 디플로이먼트로 나눠 쿠버네티스에 올리고, 추론 쪽만 리소스 요청과 상한을 크게 잡아 따로 오토스케일되게 했다. 노드 선택으로 추론 파드를 전용 노드에 배치해 두 워크로드가 서로를 밀어내지 않도록 격리했다.",
        repo: "https://github.com/koreamax/wilson_chatbot",
        status: "종료",
      },
      {
        title: "Cloud Island",
        summary: "AWS CloudTrail 로그를 탐험하듯 읽는 시각화",
        problem:
          "CloudTrail 이벤트는 JSON으로 끝없이 쌓이는데, 누가 어떤 자원에 무엇을 했는지 사람이 읽어 내려가서는 흐름이 잡히지 않았다.",
        solution:
          "로그를 수집해 주체·행동·자원 축으로 정규화한 뒤, 계정과 서비스를 행성과 궤도로 매핑해 3D 공간에 배치했다. 시간축을 따라 이동하며 이벤트가 어디서 발생했는지 한눈에 따라갈 수 있게 만들었다.",
        repo: "https://github.com/koreamax/cloud-island",
        status: "종료",
      },
      {
        title: "WalkingCity",
        summary: "취향에 맞는 산책 경로를 추천하고 이유까지 설명하는 서비스",
        issues: [
          {
            tag: "추천 한 건이 서버 전체를 붙잡음",
            problem:
              "추천 한 번에 생성 모델 응답을 수십 초 기다려야 하는데 이를 EC2 위 애플리케이션이 직접 호출해, 기다리는 동안 스레드를 붙잡아 지도·로그인 같은 일반 요청까지 밀림",
            solution:
              "AI 추천만 Lambda로 떼어 내 요청마다 따로 뜨고 끝나면 사라지게 하고 EC2는 일반 트래픽만 맡게 해, 추천이 몰려도 나머지 화면이 느려지지 않게 됨",
          },
          {
            tag: "공공데이터만큼 불어나던 토큰",
            problem:
              "산책로·공원 공공데이터를 프롬프트에 통째로 실어, 호출 한 번에 드는 토큰이 데이터 양을 그대로 따라가 자료를 더할수록 비용과 응답 시간이 같이 늘어남",
            solution:
              "S3에 올린 공공데이터를 임베딩해 OpenSearch에 담고 질문과 가까운 조각만 꺼내 넣도록 바꿔, 자료가 늘어도 호출당 토큰이 일정하게 유지됨",
          },
        ],
        repo: "https://github.com/koreamax/walk_web",
        status: "종료",
      },
    ],
  },
  {
    num: "04",
    name: "Embedded",
    color: "#34d399",
    stack: ["C/C++", "Raspberry Pi", "NVIDIA Jetson", "ROS2", "LiDAR"],
    items: [
      {
        title: "Goliath Crane",
        summary: "한화오션 골리앗 크레인용 LiDAR 상황 인식 시스템",
        problem:
          "크레인 아래 작업자와 장애물을 카메라만으로 보면 거리와 높이를 정확히 잡지 못했고, 역광이나 야간에는 인식 자체가 흔들렸다.",
        solution:
          "LiDAR 포인트 클라우드를 받아 거리 기반으로 인식하도록 바꾸고, 지면을 걷어낸 뒤 남은 점들을 묶어 작업자와 장애물을 분리했다. 센서 수집, 인지, 경보를 ROS2 노드로 나눠 한 단계가 밀려도 다른 단계가 멈추지 않게 했다.",
        repo: "https://github.com/koreamax/Hanhwa-Ocean-Goliath-Crane",
        status: "진행 중",
      },
      {
        title: "JeokjaeJeokso",
        summary: "트럭 적재물을 측정해 디지털 트윈으로 보여주는 장치",
        problem:
          "센서 수집과 적재물 계산, 시각화 전송을 보드 한 대에서 모두 처리하자 처리량이 부족해 측정 주기가 들쭉날쭉해졌다.",
        solution:
          "라즈베리파이 5 두 대로 역할을 나눠 한 대는 센서 수집과 적재물 계산만, 다른 한 대는 통신과 디지털 트윈 전송을 맡게 했다. 두 보드는 네트워크로 메시지를 주고받게 해서 시각화가 밀려도 측정 주기는 일정하게 유지되도록 했다.",
        repo: "https://github.com/koreamax/2026ESWContest_mobility_JeokjaeJeokso",
        status: "진행 중",
      },
      {
        title: "VIAssist",
        summary: "Jetson Orin Nano Super 한 대로 돌아가는 보행 보조 웨어러블",
        problem:
          "몸에 걸치는 장치라 전력과 발열에 여유가 없는데, 검출과 흐름 추정, 언어 모델, 음성 합성을 한 보드에 모두 올려야 했다.",
        solution:
          "Jetson Orin Nano Super를 기준으로 전력 모드와 클럭을 맞추고, 카메라 입력부터 음성 출력까지를 보드 한 대 안에서 끝내는 파이프라인으로 구성했다. 처리 주기를 상황에 따라 조절해 발열이 올라가도 안내가 끊기지 않게 했다.",
        repo: "https://github.com/koreamax/VIAssist_Total",
        status: "종료",
      },
    ],
  },
];
