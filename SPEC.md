# CS146S Korean Edition - Technical Specification

## 프로젝트 개요

Stanford CS146S "The Modern Software Developer" 강좌의 한국어 버전 웹사이트.

- **URL**: kr.themodernsoftware.dev
- **원본**: https://themodernsoftware.dev/
- **목적**: 한국 개발자를 위한 AI 개발 교육 콘텐츠

---

## Tech Stack

| 레이어 | 기술 | 버전 | 선택 이유 |
|--------|------|------|-----------|
| **Build** | Vite | 6.x | 원본과 동일, 빠른 HMR |
| **UI** | React | 19.x | 컴포넌트 기반 UI |
| **Language** | TypeScript | 5.x | 타입 안정성 |
| **Styling** | Tailwind CSS | 4.x | 빠른 스타일링, 원본 디자인 재현 |
| **Content** | MDX | 3.x | Reading 번역 콘텐츠 관리 |
| **Routing** | React Router | 7.x | SPA 라우팅 |
| **Deploy** | Vercel | - | 자동 배포 |

---

## 디렉토리 구조

```
stanford-cs146s-kr/
├── public/
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── main.tsx                 # 앱 엔트리
│   ├── App.tsx                  # 라우터 설정
│   ├── index.css                # Tailwind 임포트
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Stanford red 헤더
│   │   │   ├── Footer.tsx       # 푸터
│   │   │   ├── TabNav.tsx       # 탭 네비게이션
│   │   │   └── Layout.tsx       # 공통 레이아웃
│   │   │
│   │   ├── home/
│   │   │   ├── CourseDescription.tsx
│   │   │   ├── InfoGrid.tsx
│   │   │   ├── TeamGrid.tsx
│   │   │   └── KrSpecialBox.tsx # Korean Edition 특별 섹션
│   │   │
│   │   ├── syllabus/
│   │   │   ├── WeekCard.tsx     # 주차별 카드
│   │   │   ├── ReadingList.tsx  # Reading 목록 + 한국어 링크
│   │   │   ├── LectureItem.tsx  # 강의 항목
│   │   │   └── GradingTable.tsx # 평가 기준
│   │   │
│   │   ├── faq/
│   │   │   ├── FaqAccordion.tsx # FAQ 아코디언
│   │   │   └── ContactBox.tsx   # 연락처
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Link.tsx
│   │
│   ├── pages/
│   │   ├── HomePage.tsx         # Overview 탭
│   │   ├── SyllabusPage.tsx     # 강의계획 탭
│   │   ├── FaqPage.tsx          # FAQ 탭
│   │   └── ReadingPage.tsx      # Reading 상세 (동적 라우트)
│   │
│   ├── content/
│   │   ├── syllabus.ts          # 10주차 커리큘럼 데이터
│   │   ├── faq.ts               # FAQ 데이터
│   │   └── readings/
│   │       ├── week1/
│   │       │   ├── deep-dive-llms.mdx
│   │       │   └── prompt-engineering.mdx
│   │       ├── week2/
│   │       └── ...
│   │
│   ├── lib/
│   │   └── utils.ts             # 유틸리티 함수
│   │
│   └── types/
│       └── syllabus.ts          # 커리큘럼 타입
│
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── vercel.json
```

---

## 페이지 구조

### 1. 메인 페이지 (`/`)

3개 탭으로 구성 (URL 해시로 탭 상태 유지):
- `/#overview` - 강좌 소개 (기본)
- `/#syllabus` - 강의계획
- `/#faq` - FAQ

### 2. Reading 상세 페이지 (`/readings/:week/:slug`)

예: `/readings/week1/deep-dive-llms`
- MDX 콘텐츠 렌더링
- 원본 링크 + 한국어 번역
- 이전/다음 네비게이션

---

## 주요 기능

### 1. 탭 네비게이션

```tsx
// TabNav.tsx
const tabs = [
  { id: 'overview', label: '개요' },
  { id: 'syllabus', label: '강의계획' },
  { id: 'faq', label: 'FAQ' },
];
```

- URL 해시 기반 (`/#syllabus`)
- 브라우저 뒤로가기 지원
- 활성 탭 하이라이트

### 2. 강의계획 (Syllabus)

```tsx
// syllabus.ts 데이터 구조
interface Week {
  number: number;
  title: string;
  titleKr: string;
  topics: string[];
  readings: Reading[];
  assignments: Assignment[];
  lectures: Lecture[];
}

interface Reading {
  title: string;
  url: string;
  krSlug?: string;  // 한국어 번역이 있으면 slug
}

interface Lecture {
  date: string;
  title: string;
  slidesUrl?: string;
  krSlidesSlug?: string;
  guest?: {
    name: string;
    role: string;
    company: string;
  };
}
```

### 3. 한국어 번역 링크

Reading/Slides 옆에 `[한국어]` 링크:

```tsx
// ReadingList.tsx
{reading.krSlug ? (
  <Link to={`/readings/${week}/${reading.krSlug}`} className="kr-link">
    [한국어]
  </Link>
) : (
  <span className="kr-link-pending">[번역 예정]</span>
)}
```

### 4. FAQ 아코디언

- 클릭으로 열기/닫기
- 다중 열기 지원
- 애니메이션 트랜지션

---

## 디자인 시스템

### 컬러

```ts
// tailwind.config.ts
colors: {
  stanford: {
    red: '#8C1515',
    'red-dark': '#6B0F0F',
  },
  kr: {
    accent: '#0066CC',  // 한국어 링크 색상
  },
  text: {
    primary: '#2E2D29',
    secondary: '#585754',
  },
  bg: {
    light: '#F4F4F4',
    card: '#F9F9F9',
  },
}
```

### 타이포그래피

```ts
fontFamily: {
  sans: ['Noto Sans KR', 'system-ui', 'sans-serif'],
}
```

### 컴포넌트 스타일

```tsx
// 주요 클래스
.section-title    // 섹션 제목 (빨간 밑줄)
.week-card        // 주차별 카드
.kr-link          // [한국어] 링크 (파란색)
.faq-item         // FAQ 아코디언 아이템
```

---

## 배포 설정

### vercel.json

```json
{
  "buildCommand": "vite build",
  "outputDirectory": "dist",
  "framework": "vite",
  "regions": ["icn1"]
}
```

### 도메인 설정

1. Vercel 프로젝트에 `kr.themodernsoftware.dev` 연결
2. DNS에 CNAME 레코드 추가

---

## 개발 워크플로우

### 로컬 개발

```bash
# 의존성 설치
pnpm install

# 개발 서버
pnpm dev

# 빌드
pnpm build

# 프리뷰
pnpm preview
```

### 배포

```bash
# main 브랜치 push → 자동 배포
git push origin main

# 프리뷰 배포 (PR)
# PR 생성 시 자동으로 프리뷰 URL 생성
```

---

## 마일스톤

### Phase 1: 기본 사이트 (1주)
- [ ] Vite + React 프로젝트 셋업
- [ ] 메인 페이지 3탭 구현
- [ ] 10주차 커리큘럼 데이터 입력
- [ ] Vercel 배포

### Phase 2: 콘텐츠 (2주)
- [ ] Week 1-2 Reading 한국어 번역
- [ ] MDX 렌더링 구현
- [ ] Reading 상세 페이지

### Phase 3: 확장 (ongoing)
- [ ] 나머지 Reading 번역
- [ ] YouTube 강의 연동
- [ ] 커뮤니티 기능 (Discord 연결)

---

## 참고 자료

- [Vite 공식 문서](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [원본 강좌](https://themodernsoftware.dev/)
