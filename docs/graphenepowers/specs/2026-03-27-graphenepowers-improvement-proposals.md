# GraphenePowers 개선 제안 메모

> Terminology note: this memo was written before the `Small Task` terminology update. Read grade references to `Task` as `Small Task` unless the passage is explicitly historical.

## 목적

이 문서는 [워크플로우 분석 메모](./2026-03-27-graphenepowers-workflow-analysis.md)에서 정리한 장점과 약점을 바탕으로, 현재 `graphenepowers` repo를 어떻게 개선하면 좋을지 제안하는 실행 지향 메모다.

핵심 질문은 하나다.

- 좋은 철학을 이미 가진 이 시스템을 어떻게 더 쉽게 쓰고, 더 덜 무겁게 느끼게 만들 것인가

이 문서는 특히 다음 약점들을 줄이는 방향으로 제안한다.

- 문서 오버헤드
- 오케스트레이터 병목 위험
- 계획 품질 의존성
- discovery보다 delivery에 치우친 구조
- 인간보다 에이전트에 더 최적화될 위험

## 현재 상태에 대한 짧은 진단

문서 기준으로 GraphenePowers의 강점은 분명하다.

- 작업 복잡도에 비례하는 절차를 정의한다.
- 계획과 실행을 하나의 운영 데이터로 연결하려 한다.
- 검증과 리뷰를 독립 상태로 둔다.
- 회고를 선택 사항이 아니라 종료 루프에 넣는다.

반면 repo 수준에서는 아직 다음 간극이 보인다.

- 핵심 개념은 강하게 문서화되어 있지만, 바로 실행 가능한 템플릿과 검증 자산은 적다.
- `plan-progress.md`, single-writer, rendered kanban 같은 개념이 규칙으로는 강하지만 도구로는 충분히 내려와 있지 않다.
- 처음 접하는 사람이 진입할 루트 문서와 빠른 시작 경로가 약하다.

즉, 현재의 문제는 "아이디어가 부족하다"보다 "운영 모델이 실체화된 자산으로 충분히 내려오지 않았다"에 가깝다.

## 개선 방향 요약

우선순위는 아래 다섯 가지가 적절하다.

1. 문서 개념을 템플릿, 예제, 검증기로 내린다.
2. `Micro` 경로를 더 명시적으로 만들어 작은 작업의 마찰을 줄인다.
3. single-writer 모델을 규칙이 아니라 도구 체인으로 보강한다.
4. delivery 앞단에 얇은 discovery/framing 레이어를 추가한다.
5. 인간 친화적인 진입 문서와 운영 가이드를 보강한다.

## 제안 1: `plan-progress`를 실제 운영 자산으로 내리기

가장 먼저 손대야 할 부분이다.

현재 문서들은 `plan-progress.md`를 이 시스템의 핵심 정본으로 다룬다. 하지만 repo 차원에서는 이를 바로 생성, 검증, 렌더링할 수 있는 자산이 거의 보이지 않는다. 이 상태에서는 좋은 설계가 있어도 사용자는 매번 문서를 해석해 손으로 맞춰 써야 한다.

### 제안

다음 자산을 repo에 추가한다.

- `docs/graphenepowers/templates/plan-progress.md`
- `docs/graphenepowers/templates/execution-plan.md`
- `docs/graphenepowers/examples/micro-change/`
- `docs/graphenepowers/examples/task-change/`
- `docs/graphenepowers/examples/feature-change/`
- `tools/validate-plan-progress`
- `tools/render-plan-progress`
- `schemas/plan-progress.schema.yaml` 또는 동등한 스키마 문서

### 기대 효과

- 계획 품질 편차를 줄인다.
- `writing-plans`와 `executing-plans`를 실제로 써보기 쉬워진다.
- "문서가 많다"는 인상을 "틀이 있으니 채우기 쉽다"로 바꿀 수 있다.

### 왜 우선순위가 높은가

이 작업은 분석 메모가 지적한 세 문제를 한 번에 줄인다.

- 문서 오버헤드
- 계획 품질 의존성
- `plan-progress.md`가 의식이 되는 실패 모드

## 제안 2: `Micro` fast path를 별도 운영 경로로 명확화하기

현재 시스템의 가장 큰 adoption 리스크는 작은 작업에도 전체 프로세스가 무겁게 느껴지는 것이다. 문서상으로는 `triage -> Micro: execute directly`가 존재하지만, 실제로 어떤 경우에 어디까지 생략 가능한지 감각적으로 바로 잡히지는 않는다.

### 제안

`using-graphenepowers` 또는 별도 짧은 가이드에 아래를 추가한다.

- `Micro`의 대표 예시 5개
- `Micro`에서 반드시 남겨야 할 최소 증거
- `Micro`에서 생략 가능한 문서와 생략하면 안 되는 검증
- `Micro -> Task`로 승격해야 하는 신호

예를 들면 다음 정도까지는 fast path로 명확하게 둘 수 있다.

- 단일 파일 수정
- 동작 변경 범위가 작고 롤백이 쉬운 변경
- 공개 인터페이스와 외부 의존성이 없는 변경
- 검증 명령이 분명한 변경

### 기대 효과

- 작은 작업에서 GraphenePowers가 과하게 느껴지는 문제를 줄인다.
- 사용자에게 "이 시스템은 무조건 무겁다"는 인상을 주지 않는다.
- `triage`가 지나치게 보수적으로 작동하는 실패 모드를 완화한다.

## 제안 3: single-writer 모델을 자동화 가능한 이벤트 흐름으로 구체화하기

single-writer 규칙 자체는 좋다. 문제는 이 규칙이 강할수록 오케스트레이터가 병목이 될 수 있다는 점이다. 따라서 해결책은 규칙을 약하게 만드는 것이 아니라, 오케스트레이터가 다루는 입력과 출력을 더 구조화하는 것이다.

### 제안

worker가 직접 `plan-progress.md`를 수정하지 않고 다음과 같은 구조화 이벤트를 내도록 표준을 만든다.

```yaml
task_event:
  task_id: T2
  kind: task_completed
  status: review
  active_agent_time: 0.6h
  elapsed_active_time: 0.3h
  verification:
    commands:
      - npm test -- api
    evidence:
      - tests green
  artifacts:
    - src/api/routes.ts
```

그리고 오케스트레이터는 이 이벤트만 받아서 다음을 수행한다.

- YAML machine record 갱신
- human summary 재렌더링
- kanban 재렌더링
- 시간 초과 및 blocker 경고 표준화

### 추가 제안

가능하다면 아래 둘 중 하나를 고른다.

- 최소 버전: 문서로 event schema만 먼저 고정
- 실용 버전: event schema + render/validate script까지 같이 제공

### 기대 효과

- 오케스트레이터 병목을 줄인다.
- 상태 기록 품질을 높인다.
- 사람이 수동으로 Markdown과 YAML을 같이 맞추는 실수를 줄인다.

## 제안 4: delivery 전 discovery/framing 레이어 추가

현재 구조는 "정해진 일을 통제 가능하게 끝내기"에는 강하지만, "무엇을 왜 지금 하는가"를 정리하는 얇은 프레임은 약하다. 분석 메모가 지적한 delivery bias는 실제로 맞는 진단이다.

### 제안

Feature 또는 `confidence = low` 상황에 들어가기 전에 매우 짧은 framing 블록을 표준화한다.

권장 필드:

- 문제 정의
- 비목표
- 성공 기준
- 왜 지금 하는가
- 실패해도 괜찮은 범위

이 레이어는 별도 무거운 스킬이 아니라 `brainstorming`의 진입 전 섹션이나 짧은 companion doc이면 충분하다.

### 기대 효과

- 설계 논의가 구현 솔루션 중심으로 너무 빨리 수렴하는 것을 막는다.
- 초기 discovery 작업에도 GraphenePowers를 덜 어색하게 적용할 수 있다.
- Feature 경로의 spec 품질이 좋아진다.

## 제안 5: 인간 친화적인 진입 문서 보강

현재 구조는 에이전트 관점에서는 읽을 수 있지만, 인간 관점에서는 처음 진입하기가 쉽지 않다. 특히 루트 수준 안내 문서와 "언제 무엇을 쓰는가" 요약이 약하면, 시스템은 강력해도 입문 장벽이 높아진다.

### 제안

루트 또는 상위 문서 계층에 다음을 추가한다.

- `README.md`
- `docs/graphenepowers/quickstart.md`
- `docs/graphenepowers/which-skill-when.md`
- `docs/graphenepowers/operator-cards.md`

각 문서는 다음 역할로 분리한다.

- `README.md`: 시스템 목적, 핵심 흐름, 문서 위치
- `quickstart.md`: 오늘 바로 한 번 써보는 절차
- `which-skill-when.md`: 어떤 요청에 어떤 스킬을 쓰는지 표로 정리
- `operator-cards.md`: triage, planning, execution, review의 핵심 규칙만 1페이지로 요약

### 기대 효과

- 인간 사용자의 진입 비용이 줄어든다.
- agent-optimized 문서 구조와 human-usable 안내 문서의 균형이 좋아진다.
- 내부 설계 문서를 모두 읽지 않아도 시작할 수 있다.

## 권장 실행 순서

아래 순서가 가장 실용적이다.

### 1단계: adoption 마찰 줄이기

- `README.md`
- `quickstart.md`
- `Micro` fast path 가이드
- worked example 1개

이 단계의 목표는 "써볼 수 있게 만들기"다.

### 2단계: 운영 자산 고정하기

- `plan-progress` 템플릿
- execution plan 템플릿
- event schema
- validate/render 도구

이 단계의 목표는 "문서 철학을 반복 가능한 운영 구조로 바꾸기"다.

### 3단계: 품질 루프 강화하기

- discovery/framing 보강
- retrospective 출력이 실제 개선 백로그로 이어지는 규칙 추가
- 예제 확장

이 단계의 목표는 "회고가 장식이 아니라 다음 개선 입력이 되게 만들기"다.

## 바로 할 만한 구체 작업

가장 먼저 착수할 5개만 고르면 아래가 적절하다.

1. 루트 `README.md` 작성
2. `docs/graphenepowers/quickstart.md` 작성
3. `docs/graphenepowers/templates/plan-progress.md` 추가
4. `docs/graphenepowers/examples/task-change/` 예시 추가
5. `plan-progress` validate script 또는 최소 스키마 문서 추가

이 다섯 가지는 문서를 늘리기 위한 문서가 아니라, 현재의 개념적 강점을 실제 사용성과 반복 가능성으로 번역하는 최소 세트다.

## 결론

GraphenePowers의 가장 큰 장점은 이미 충분히 좋은 운영 철학을 갖고 있다는 점이다. 개선의 핵심은 새로운 철학을 더하는 것이 아니라, 기존 철학을 더 작게 시작할 수 있고 더 쉽게 반복할 수 있는 형태로 내리는 것이다.

따라서 이 repo의 다음 단계는 아래처럼 정리할 수 있다.

- 더 많은 규칙을 추가하는 것보다 더 좋은 템플릿과 예제를 추가한다.
- 더 강한 통제를 선언하는 것보다 더 나은 이벤트 흐름과 검증기를 만든다.
- 더 많은 문서를 쓰는 것보다 더 좋은 진입 문서와 fast path를 만든다.

이 방향이면 분석 메모가 지적한 약점을 줄이면서도, GraphenePowers의 본래 강점은 유지할 수 있다.
