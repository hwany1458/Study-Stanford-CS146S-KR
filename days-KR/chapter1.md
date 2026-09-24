# 1장: LLM 프로그래밍과 AI 개발

## 강의 개요

대규모 언어 모델의 시대에 소프트웨어 개발은 혁명적인 변화를 겪고 있습니다. 이 강의는 현대 AI 프로그래밍 도구를 익히고 AI 보조 개발의 모범 사례를 이해하도록 돕습니다.

### 학습 목표
- 대규모 언어 모델(LLM)의 기본 원리 이해
- 효율적인 프롬프트 엔지니어링 기법 숙지
- Human-agent engineering(인간-에이전트 엔지니어링)의 핵심 역량 파악
- LLM 능력의 한계 이해

---

## 1. 왜 이 강의인가?

> "여러분은 AI에게 대체되지 않습니다. AI를 쓸 줄 아는 유능한 엔지니어에게 대체될 것입니다."

AI 프로그래밍은 미래 소프트웨어 엔지니어의 핵심 역량입니다. AI를 모르는 엔지니어는 AI를 아는 엔지니어에게 대체될 것입니다. 하지만 이 강의는 "바이브 코딩(vibe coding)" 강의가 **아닙니다**. AI의 출력을 맹목적으로 믿지 마세요. 핵심은 Human-agent engineering입니다.

> 프롬프트는 LLM이 우리가 원하는 일을 하게 만들고, 동시에 LLM을 효과적으로 프로그래밍하기 위한 공용어(lingua franca)다
>
> — Andrej Karpathy

### 나쁜 소식 vs 좋은 소식

| 소식 | 내용 |
|------|------|
| **나쁜 소식** | Windsurf 팀 (AI 코딩 회사 인수 사례) |
| **좋은 소식** | 개발자는 그 어느 때보다 생산적일 수 있으며, AI 엔지니어는 전례 없는 속도로 기술 스택과 도구를 익힐 수 있음 |

---

## 1.1 강의 정보

| 항목 | 내용 |
|------|------|
| 과목 코드 | CS146S |
| 학교 | Stanford University, 2025년 가을학기 |
| 강사 | Mihail Eric |
| 강의 웹사이트 | themodernsoftware.dev |

### 강의 일정
- **수업 시간**: 월/금 오전 8:30-9:20 (미국 태평양 시간)
- **제출물**: 과제 9개 (주 1회) + 기말 프로젝트 1개
- **평가**: 프로젝트 80% / 과제 15% / 참여 5%

### 강사 소개
Mihail Eric은 Stanford 학부/대학원 출신으로 다음과 같은 경력이 있습니다.
- 세일즈 분야 스텔스 스타트업에서 AI 총괄
- Amazon Alexa에서 초기 LLM 구축
- ML 교육 스타트업 창업 및 매각
- YC 투자를 받은 AI 코딩 회사 창업

### 조교
- Febie Lin

### 게스트 강연
이 강의에는 최고의 AI 개발자 도구 스타트업을 이끄는 창업자들의 게스트 강연이 포함됩니다.
- 수억 달러 투자 유치, 수십억 달러 가치 평가
- 이 강연들을 놓치지 마세요!

### Human-agent Engineering 핵심 역량
1. **많은 코드를 읽고 리뷰하기** - 좋은 코드와 나쁜 코드를 구별하는 법 익히기
2. **좋은 안목(taste) 갖추기** - 훌륭한 소프트웨어가 어떤 모습인지 이해하기
3. **과감하게 실험하기** - 누구도 정답을 갖고 있지 않으며, 모두가 탐색 중

### 핵심 통찰
- LLM은 딱 여러분 수준만큼만 잘한다 (좋은 컨텍스트가 좋은 코드로 이어진다)
- 여러분이 자신의 코드베이스를 이해하지 못한다면, LLM도 이해하지 못한다

---

## 2. LLM 기초

### LLM이란?
LLM(Large Language Models, 대규모 언어 모델)은 다음 토큰을 예측하는 **자기회귀(autoregressive) 모델**입니다.

```
입력 텍스트 → 토큰화 → 임베딩 → 트랜스포머 레이어 (12-96+) → 출력 예측
```

#### 트랜스포머 레이어
- 셀프 어텐션(self-attention) 메커니즘 사용 (Vaswani 외 논문 참고)
- 12-96개 이상의 트랜스포머 레이어
- 토큰을 고정 차원의 수치 벡터로 변환 (약 1-3K 차원)

#### 임베딩(Embedding)
텍스트 토큰을 고정 차원의 수치 벡터로 변환합니다.

---

## 3. LLM 학습 과정

### 세 단계의 학습

| 단계 | 이름 | 데이터 규모 | 목표 |
|------|------|-------------|------|
| 1단계 | 자기지도 사전학습 (Self-supervised Pretraining) | 100B - 1T+ 토큰 | 언어 개념 학습 |
| 2단계 | 지도 미세조정 (Supervised Finetuning) | 10K - 100K 쌍 | 지시 따르기 |
| 3단계 | 선호도 튜닝 (Preference Tuning) | 10K - 100K 비교쌍 | 인간 선호에 정렬 |

### 1단계: 사전학습 (Pretraining)
- 대규모 공개 데이터 사용 (Common Crawl, Wikipedia, StackExchange, GitHub)
- 언어의 기본 개념과 패턴 학습
- **예시**: "Write a for loop" → "that could be used in a piece of code"

### 2단계: 지도 미세조정 (SFT)
- 고품질 지시-응답 쌍 사용
- 모델이 인간의 지시를 따르도록 학습
- **예시**: "what is the capital of Croatia" → "Zagreb is the capital"

### 3단계: 선호도 튜닝 (Preference Tuning)
- 같은 프롬프트에 대한 출력 쌍 수집
- 선호되는 출력을 예측하는 보상 모델 학습
- 인간 선호(유용성, 정확성, 가독성)에 정렬
- **예시**: "Write a for loop" → "for idx in range(10):"

#### 추론 모델 (Reasoning Models)
- 사고의 사슬(chain-of-thought) 추론 과정으로 학습 확장
- 도구 사용 능력 통합
- 강화학습을 통해 추론 과정을 평가하는 법 학습
- 되돌아가기(backtracking) 등 추론 단계 학습

#### 모델 크기 참고
- GPT-3 / Claude 3.5 Sonnet: 약 175B 파라미터
- LLaMA 3.1: 405B 파라미터
- GPT-4: 약 1.8T 파라미터

---

## 4. LLM의 능력과 한계

### 강점
- **전문가 수준의 코드 완성** (Expert-level code completion)
- **코드 이해** (Code understanding)
- **코드 수정** (Code fixing)

### 한계
| 한계 | 설명 | 해결책 |
|------|------|--------|
| 환각 (Hallucinations) | 존재하지 않거나 오래된 API 생성 | 탄탄한 컨텍스트 엔지니어링 |
| 컨텍스트 윈도우 제한 | 약 100-200K 토큰이지만, 모든 토큰이 똑같이 다뤄지지는 않음 | 선택적 컨텍스트 제공 |
| 지연 시간 (Latency) | 요청당 수 초에서 수 분 | 그에 맞게 계획하고 위임 |
| 비용 | 입력 100만 토큰당 $1-3, 출력 100만 토큰당 $10 이상 | 프롬프트 길이 최적화 |

---

## 5. 프롬프트 엔지니어링 기법

### 프롬프트 엔지니어링 배경
프롬프팅은 예술이자 과학입니다. LLM의 블랙박스 특성상 어느 정도 "LLM 달래기(LLM whispering)"가 필요하지만, 경험적으로 LLM 성능을 향상시킨 것으로 확인된 기법들이 있습니다.

### Zero-shot 프롬프팅
예시 없이 LLM에게 작업을 요청합니다.

**예시**:
```
Write me a Rust for-loop that iterates over a list of strings for every, printing every value in an even index
```

### K-shot 프롬프팅
k개(1, 3, 5개)의 예시를 제공하는 방식으로, "문맥 내 학습(in-context learning)"이라고도 합니다. 특정 형식이 필요한 작업에 적합합니다.

**예시**:
```
Write a for-loop iterating over a list of strings using the naming convention in our repo. Here are some examples of how we typically format variable names.

<example>var StRaRrAy = ['cat', 'dog', 'wombat']</example>
<example>def func CaPiTaLiZeStR = () => {}</example>
```

### 사고의 사슬 (Chain-of-Thought, CoT)
- **Multi-shot CoT**: 추론 단계의 예시를 보여줌
- **Zero-shot CoT**: "Let's think step-by-step(단계별로 생각해 보자)"을 추가하거나, 명시적인 <reasoning> 태그 안에 추론하도록 요청
- 여러 단계의 논리가 필요한 작업(프로그래밍, 수학)에 가장 효과적

### 역할 프롬프팅 (Role Prompting)
모델의 역할을 지정하여 출력 품질을 높입니다.

**역할 프롬프팅 예시**:
```
You are a helpful assistant that loves programming at the level of a senior software developer and is very detailed and pedantic in your answers.
```
```
You are a Gen Z digital bestie. Always sound like you're texting on Snapchat at 2am.
```

### 시스템 프롬프트 vs 사용자 프롬프트

| 유형 | 설명 |
|------|------|
| **시스템 프롬프트** | LLM의 전반적인 행동과 규칙을 정의하는 첫 메시지 (보통 최종 사용자에게는 보이지 않음) |
| **사용자 프롬프트** | 사용자의 실제 요청/지시 |
| **어시스턴트** | LLM이 실제로 생성한 내용 |

### 모범 사례

#### 프롬프트 개선
- [Claude Prompt Improver](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-improver) 활용
- 배경 지식이 거의 없는 사람에게 프롬프트를 보여 주세요. 그 사람이 헷갈려 한다면 LLM도 헷갈려 합니다

#### 구조화된 프롬프팅
```
Here are the logs:
<log>LOG MESSAGE</log> and the stack trace:
<error>STACK TRACE</error>
```

#### 명시적으로 작성하기
- 언어, 기술 스택, 라이브러리, 제약 조건을 명시

#### 작업 분해하기
- 복잡한 작업은 단순한 단계로 쪼개기

---

## 6. 실습 과제

### 실습 1: 다양한 프롬프팅 기법 시도하기
Claude 또는 다른 LLM을 사용하여:
1. Zero-shot: "Write a function to check if a number is prime (숫자가 소수인지 판별하는 함수를 작성해줘)"
2. K-shot: 예시를 제공한 후 LLM이 같은 형식으로 출력하게 하기
3. CoT: "Let's think step-by-step"을 추가하고 출력이 어떻게 달라지는지 관찰하기

### 실습 2: 역할 프롬프팅
여러 역할 프롬프트를 시도하고 출력 품질을 비교해 보세요.
- "You are a junior developer... (당신은 주니어 개발자입니다...)"
- "You are a senior software architect... (당신은 시니어 소프트웨어 아키텍트입니다...)"
- "You are a Gen Z digital bestie... (당신은 Z세대 디지털 절친입니다...)"

### 실습 3: 구조화된 프롬프팅
로그와 오류 메시지를 제공하고, LLM이 이를 어떻게 해석하고 응답하는지 관찰하세요.

### 실습 4: Prompt Improver 사용하기
Claude Prompt Improver로 프롬프트를 최적화하고 개선점을 관찰하세요.

---

## 7. 강의 학습 경로

| 장 | 주제 |
|----|------|
| 1장 | LLM 기초 + 프롬프트 엔지니어링 |
| 2장 | 코딩 에이전트 + MCP |
| 3장 | AI IDE + 동기/비동기 |
| 4장 | 에이전트 관리 + Claude Code |
| 5장 | AI 개발자 제품 설계 |
| 6장 | 테스트 + 보안 |
| 7장 | 코드 리뷰 |
| 8장 | AI 앱 빌드 |
| 9장 | AI DevOps |
| 10장 | 미래 전망 |

---

## 강의 자료

### 강의 1: 소개 및 LLM은 어떻게 만들어지는가
- [슬라이드 (PDF)](../../slides/week1-lecture1-introduction.pdf)
- **강사**: Mihail Eric

### 강의 2: LLM을 위한 파워 프롬프팅
- [슬라이드 (PDF)](../../slides/week1-lecture2-power-prompting.pdf)
- **참고**: Andrej Karpathy의 프롬프팅 배경 설명

---

## 읽기 자료

### 필수
1. **[Prompt Engineering Guide](https://www.promptingguide.ai/techniques)** - 프롬프트 엔지니어링 기법 종합 가이드
2. **[Deep Dive into LLMs (YouTube)](https://www.youtube.com/watch?v=7xTGNNLPyMI)** - LLM 심층 해설

### 선택
3. **[Prompt Engineering Overview](https://cloud.google.com/discover/what-is-prompt-engineering)** - Google Cloud의 프롬프트 엔지니어링 개요

---

## 과제

### LLM 프롬프팅 놀이터 (Playground)
**[1장 과제](https://github.com/mihail911/modern-software-dev-assignments/tree/master/week1)**

실습을 통해 LLM 프롬프팅 기법을 익힙니다.

---

## 핵심 개념

| 용어 | 의미 |
|------|------|
| **Tokenization (토큰화)** | 텍스트를 토큰으로 나누는 방식 |
| **Context Window (컨텍스트 윈도우)** | 모델이 처리할 수 있는 컨텍스트의 길이 |
| **Temperature** | 출력의 무작위성을 조절하는 파라미터 |
| **Embedding (임베딩)** | 토큰을 고정 차원의 수치 벡터로 변환하는 것 |
| **Human-agent Engineering** | 인간 엔지니어가 AI의 관리자이자 의사결정자가 되는 방식 |
| **Autoregressive Models (자기회귀 모델)** | 다음 토큰을 예측하는 모델 |
| **Self-attention (셀프 어텐션)** | 자기 주의 메커니즘 |
| **In-context Learning (문맥 내 학습)** | 컨텍스트 기반 학습, 즉 K-shot 프롬프팅 |

---

## 다음 장

[다음 장: 2장](./chapter2.md)

---
