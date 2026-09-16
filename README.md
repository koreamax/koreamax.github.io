# koreamax.github.io

포트폴리오 URL: https://koreamax.github.io

Next.js(App Router) + TypeScript + Tailwind CSS v4 + shadcn 구조로 만든 정적 사이트.
`main` 브랜치에 push 하면 GitHub Actions 가 `next build`(정적 내보내기) 후 GitHub Pages 로 배포한다.

## 개발

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # out/ 에 정적 파일 생성
```

## 구조

- `app/page.tsx` — 최상단 스크롤 확장 인트로(`ScrollExpandMedia`) + 포트폴리오 본문
- `components/ui/scroll-expansion-hero.tsx` — 21st.dev 스크롤 확장 히어로 컴포넌트
- `components/portfolio.tsx` — Claude Design "Portfolio v2" 를 React 로 옮긴 본문
- `components/portfolio-data.ts` — 프로젝트·타임라인·수상·자격증·스킬 데이터 (내용 수정은 여기서)
- `public/uploads`, `public/assets` — 이미지 자산

## 이미지 슬롯 채우기

활동 사진 4장은 `public/uploads/` 에 아래 파일명으로 저장하면 바로 표시된다 (파일이 없으면 플레이스홀더).

| 파일명 | 사진 |
| --- | --- |
| `activity-khtml-aws.jpg` | K-HTML 해커톤 우수상 (AWS 벽 앞 단체) |
| `activity-skt-best.jpg` | SKT FLY AI 9기 개인 최우수상 (무대 시상) |
| `activity-skt-project.jpg` | SKT FLY AI 9기 프로젝트 우수상 (팀 단체) |
| `activity-piuda.jpg` | 제15회 피우다 프로젝트 장려상 (단체) |

대표 프로젝트 3장은 `components/portfolio-data.ts` 의 `projects[].image` 에 `/uploads/파일명` 을 적으면 된다.
