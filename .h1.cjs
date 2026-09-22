const fs=require("fs"),p="components/portfolio-data.ts";let s=fs.readFileSync(p,"utf8");

/* 02 — beautytalk 한 장으로 */
const a2=s.indexOf(`    num: "02",\n    name: "AI & Backend",`);
const b2=s.indexOf(`    num: "03",\n    name: "AI & Cloud",`);
if(a2<0||b2<0||b2<a2) throw new Error("02/03 못 찾음");
const two = `    num: "02",
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
            problemCode: `prompt = "Describe this cosmetic product."  # free-form answer: the shade shows up somewhere in the fourth sentence, forty seconds into the speech`,
            solution:
              "무엇을 어떤 순서로 말할지 칸을 정해 모델이 그 칸만 채우게 하고 색부터 읽도록 바꿔, 첫 마디만 들어도 무엇인지 알 수 있게 정리함",
            solutionCode: `schema = {"category": str, "shade": str, "finish": str, "how_to": str} ; prompt = "Fill each field in under twelve words, shade first."`,
          },
          {
            lens: "AI",
            tag: "빛에 따라 달라지던 색 판정",
            problem:
              "화장품 색을 찍힌 픽셀에서 곧바로 읽어, 전구가 노랗거나 그늘이 지면 같은 제품이 볼 때마다 다른 색으로 나와 추천이 흔들림",
            problemCode: `rgb = frame[cy, cx]  # read the shade straight off the pixel - a warm bulb pushes every product half a tone to the right`,
            solution:
              "사진 안의 흰 기준면으로 색을 먼저 맞춘 뒤 읽게 해, 조명이 달라도 같은 제품이 같은 색으로 나오도록 고정함",
            solutionCode: `gain = TARGET_WHITE / white_patch(frame) ; rgb = (frame * gain)[cy, cx]  # normalise the frame before anything reads a colour out of it`,
          },
          {
            lens: "백엔드",
            tag: "한 요청에 묶여 있던 업로드와 분석",
            problem:
              "사진 업로드와 전처리, 모델 호출, 추천 생성이 한 요청 안에서 차례로 돌아, 사람이 몰리면 앞 요청이 끝날 때까지 뒤가 통째로 밀리고 결국 타임아웃으로 끊김",
            problemCode: `@app.post("/analyze") def analyze(f): img = preprocess(f.read()) ; return recommend(vlm(img))  # upload, inference and recommendation all inside one request`,
            solution:
              "업로드와 분석을 갈라 분석은 작업 큐로 넘기고 결과만 따로 받아 가게 하고, 같은 사진의 재분석은 캐시로 건너뛰게 해 API 가 붙잡히지 않도록 정리함",
            solutionCode: `key = sha1(blob) ; job = queue.enqueue(analyze_task, key) ; return {"job": job.id}  # the worker preprocesses and infers, a repeat of the same photo never runs twice`,
          },
          {
            lens: "백엔드",
            tag: "같은 안내를 매번 다시 읽던 음성",
            problem:
              "화면마다 나오는 같은 안내 문구를 그때그때 음성으로 새로 만들어, 말이 나오기까지 매번 같은 시간을 기다리고 호출 비용도 그만큼 반복됨",
            problemCode: `speech = tts.synthesize(text) ; return StreamingResponse(speech)  # the same sentence is synthesised again on every screen that says it`,
            solution:
              "문구와 목소리가 같으면 만들어 둔 음성을 다시 쓰도록 해시로 캐시해, 반복되는 안내는 기다림 없이 나오고 호출은 새 문구에만 들어가게 함",
            solutionCode: `key = sha1(text + voice) ; return cached(key) or store(key, tts.synthesize(text))  # repeats come back off disk, only new sentences reach the API`,
          },
        ],
        repo: "https://github.com/koreamax/beautytalk-app",
        status: "종료",
      },
    ],
  },
  {
`;
s = s.slice(0,a2) + two + s.slice(b2);
fs.writeFileSync(p,s);
console.log("02 교체 완료");
