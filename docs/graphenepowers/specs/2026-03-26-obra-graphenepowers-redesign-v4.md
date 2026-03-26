# obra/graphenepowers 재설계 — 완결 설계 문서 v4

> v3의 구조는 유지한다. 이번 버전은 남아 있던 의미론 공백과 운영 규칙만 보강한다.

## 이번 보완의 범위

1. `triage`의 합산 규칙에 `hard override`를 추가한다.
2. `confidence`와 `profile asymmetry`를 분리한다.
3. 시간 추정을 `duration`과 `effort`로 분리한다.
4. `plan-progress.md`의 단일 writer 규칙을 명시한다.
5. `executing-plans`의 실패 복귀 경로를 닫는다.
6. Feature 경로에 사전 명세 검토를 복구한다.
7. `plan-progress.md`의 task node를 kanban-friendly schema로 확장하고, Markdown human view를 렌더링 뷰로 정의한다.

---

## 설계 원칙

1. 작업 복잡도에 비례하는 절차
2. 인간은 비동기 이벤트 소스, 흐름의 병목이 아님
3. 의존 관계 기반 병렬 실행 (CPM)
4. 시간 지표를 `duration`, `effort`, `wall-time`으로 분리해 일정과 비용을 혼동하지 않음
5. 완료 후 데이터가 다음 작업을 개선하는 루프
6. 인지 모드가 같은 스킬은 병합, 단독 호출 이유가 없는 스킬은 흡수

---

## 스킬 구성

| 스킬 | 역할 | 변경 내용 |
|------|------|-----------|
| `using-graphenepowers` | 메타. 스킬 사용 규칙 | 유지 |
| `writing-skills` | 스킬 생성 및 갱신 | 유지 |
| `triage` | 다차원 점수화 + 등급 하한 규칙 + confidence 산출 | 신규 |
| `brainstorming` | 설계 발산. Feature 전용 | 유지 |
| `writing-plans` | CPM + dual-PERT 계획, kanban-friendly task node를 포함한 `plan-progress.md` 생성, rolling re-plan 지원 | 유지 확장 |
| `executing-plans` | `prepare -> dispatch -> track -> unblock -> verify -> close` 상태 기계. 단일 오케스트레이터가 상태 기록, kanban 렌더링, 병렬 실행 제어를 담당 | 확장 |
| `test-driven-development` | 테스트 우선 구현. `executing-plans` 내부에서 호출 | 유지 |
| `systematic-debugging` | 원인 불명 실패를 다루는 별도 규율 | 유지 |
| `code-review` | 외부는 단일 스킬. 내부는 `Preflight Spec Review`, `Spec Delta Review`, `Quality Review`를 fresh 에이전트로 분리 | 병합 유지, 사전 검토 복구 |
| `retrospective` | 편차 분석, 개선 초안 생성, merge/PR/폐기 처리 | 확장 |

각 스킬은 단독 호출 이유가 있어야 한다. 보조 메커니즘은 상위 스킬에 흡수하되, 흡수된 규칙이 이름 없이 사라지지 않도록 상태와 전이 조건으로 남긴다.

---

## 작업 등급 (Triage)

### 차원 점수화

5개 차원을 각 1-3점으로 채점한다.

| 차원 | 1점 | 2점 | 3점 |
|------|-----|-----|-----|
| 범위 | 단일 파일 | 복수 파일, 단일 모듈 | 복수 모듈 |
| 불확실성 | 요구사항 명확 | 일부 불명확 | 핵심 스펙 불명확 |
| 결합도 | 독립적 | 내부 의존성 있음 | 공개 인터페이스 변경 |
| 외부 의존성 | 없음 | 기존 외부 시스템 사용 | 새 외부 의존성 추가 |
| 리스크/비용 비율 | 낮음 | 중간 | 롤백 어렵거나 비용 큼 |

기본 등급은 합산 점수로 산출한다.

$$\text{base grade} = \begin{cases}
\text{Micro} & \text{합산} \leq 7 \\
\text{Task} & 8 \leq \text{합산} \leq 11 \\
\text{Feature} & \text{합산} \geq 12
\end{cases}$$

### 등급 하한 (`hard override`)

합산 점수는 시작점일 뿐이다. 아래 규칙은 합산보다 우선한다.

| 조건 | 최소 등급 | 추가 조치 |
|------|-----------|-----------|
| 결합도 = 3 | `Task` | 인간 게이트 후보 |
| 외부 의존성 = 3 | `Task` | 인간 게이트 필수 |
| 리스크/비용 = 3 | `Task` | 인간 게이트 필수 |
| 불확실성 = 3 and 범위 >= 2 | `Feature` | `brainstorming` 경로 강제 |
| 3점 차원이 2개 이상 | `Feature` | 사전 검토 필수 |

최종 등급은 `max(base grade, hard override floor)`로 결정한다.

### `confidence`와 `profile asymmetry`의 분리

v3의 `score 표준편차 = confidence`는 폐기한다. 표준편차는 분류 확신도가 아니라 점수 프로파일의 비대칭성을 보여준다.

- `confidence`는 "현재 등급이 경계 근처인가, 점수가 추측에 의존하는가"를 본다.
- `profile_asymmetry`는 "특정 위험 차원이 유난히 튀는가"를 본다.

#### `confidence`

`distance_to_regrade`를 사용한다.

- 정의: 현재 등급이 다른 등급으로 바뀌기 위해 필요한 최소 점수 변화량
- `low`: `distance_to_regrade <= 1` 또는 임시/추정 점수가 1개 이상 있음
- `medium`: `distance_to_regrade = 2` and 모든 차원이 명시 근거를 가짐
- `high`: `distance_to_regrade >= 3` and 모든 차원이 명시 근거를 가짐

#### `profile_asymmetry`

5개 차원 점수의 표준편차로 측정한다. 이 값은 `confidence`가 아니라 "비대칭 위험 신호"다.

- `profile_asymmetry > 0.8`이면 특정 차원이 튀는 것으로 본다.
- 이 경우 등급을 올리지는 않지만, `hard override`와 함께 검토 우선순위를 높인다.

### 재분류 규칙

- rolling re-plan 시점마다 후속 작업을 다시 `triage`한다.
- 재분류 결과 등급이 상승하면 인간 게이트를 발동한다.
- 재분류 결과 `confidence = low`이면 인간 게이트를 발동한다.
- 재분류는 새 문서를 만들지 않는다. 같은 `plan-progress.md` 안에서 `plan_version`을 증가시키고 이전 계획을 `superseded`로 표시한다.

---

## 전체 흐름

```text
[TRIAGE]
  -> hard override 적용
  -> confidence 낮으면 상위 절차 또는 인간 게이트

  Micro:
    EXECUTE
    -> VERIFY
    -> DONE

  Task:
    writing-plans (CPM + dual-PERT)
    -> plan-progress.md 생성
    -> executing-plans (상태 기계)
    -> code-review (Spec Delta Review -> Quality Review)
    -> retrospective
    -> DONE

  Feature:
    brainstorming
    -> [인간 확인]
    -> writing-plans (크리티컬 패스 선행 작업 중심 초기 계획)
    -> plan-progress.md 생성
    -> code-review (Preflight Spec Review)
    -> executing-plans (상태 기계)
         선행 작업 완료 시 -> rolling re-plan
         rolling re-plan -> re-triage
         confidence 낮음 / 등급 상승 -> [인간 확인]
    -> code-review (Spec Delta Review -> Quality Review)
    -> retrospective
    -> [인간 확인]
    -> DONE
```

### 인간 게이트 자동 발동 조건

| 조건 | 성격 |
|------|------|
| 모듈 경계 변경 | 영향 범위 재평가 필요 |
| 공개 인터페이스 변경 | 하위 호환성 판단 필요 |
| 새 외부 의존성 추가 | 보안/라이선스/운영 리스크 검토 필요 |
| `triage` 재산출 결과 등급 상승 | 절차 재분류 필요 |
| `confidence = low` | 분류 불안정 |
| `elapsed_active_time > E_duration + 2σ_duration` | 일정 이상 징후 |
| `active_agent_time > E_effort + 2σ_effort` | 비용/노력 이상 징후 |
| `systematic-debugging` 후에도 미해결 | 에이전트 자율 해결 한계 |
| Feature 완료 시 | 정상 종료 게이트 |

게이트는 기본적으로 "영향받는 작업만 정지하고 무관한 작업은 계속"을 원칙으로 한다. 전체 정지는 공개 인터페이스 변경, 새 외부 의존성 추가, 설계 무효화 수준의 재분류에서만 쓴다.

---

## executing-plans 상태 기계

외부에서는 단일 스킬이지만, 내부는 명시적 상태 기계다. 상태명만이 아니라 실패 복귀 경로까지 닫혀 있어야 한다.

| 상태 | 책임 | 성공 전이 | 실패/예외 전이 |
|------|------|-----------|----------------|
| `prepare` | 격리 필요 여부 판단, write-set 예약, 실행 환경 준비 | `dispatch` | 환경 이슈 -> `unblock(Environment)` |
| `dispatch` | `depends_on` 해소된 작업 선택, 병렬 가능 작업 디스패치 | `track` | runnable task 없음 -> `unblock` |
| `track` | 오케스트레이터가 worker 이벤트 수집, 상태 기록, kanban-friendly task 속성과 렌더링 뷰 갱신, 시간 계측 | 산출물 준비 -> `verify` | blocker 발견 -> `unblock` |
| `unblock` | blocker 분류, 게이트 발동, 대체 작업 선택 | blocker 해소 -> `dispatch` | 원인 불명 -> `systematic-debugging` |
| `verify` | 테스트, 검증 명령, artifact/evidence 첨부, review 대기 전이 | 남은 작업 있음 -> `dispatch`, 모두 review-ready면 -> `close` | 검증 실패 -> `dispatch`로 재작업, 원인 불명 -> `systematic-debugging` |
| `close` | 문서 최종 갱신, review 결과 반영, 결과 요약, 다음 스킬로 handoff | 종료 | review 실패 -> `dispatch`로 복귀 |

### 디버깅 개입 규칙

- `verify` 또는 `unblock`에서 실패 원인이 불명확하면 `systematic-debugging`을 호출한다.
- `systematic-debugging`이 원인을 식별하면:
  - 코드 수정이 필요하면 `dispatch`
  - 환경 수정이 필요하면 `prepare`
  - 스펙 확인이 필요하면 `unblock(SpecAmbiguity)`
- `systematic-debugging` 후에도 미해결이면 인간 게이트를 발동한다.

### 단일 writer 규칙

`plan-progress.md`는 오직 `executing-plans` 오케스트레이터만 쓴다.

- worker/subagent는 파일을 직접 수정하지 않는다.
- worker는 구조화된 상태 이벤트만 반환한다.
- 오케스트레이터가 그 이벤트를 직렬화해 `plan-progress.md`를 갱신한다.

예시 이벤트:

```yaml
task_event:
  task_id: T2
  kind: task_completed
  active_agent_time: 0.6h
  elapsed_active_time: 0.3h
  outputs:
    - modified: api/routes.ts
    - verified_by: npm test -- api
```

### task card / kanban 전이 규칙

task node는 DAG의 노드이자 kanban 카드의 정본이다. kanban 컬럼은 별도 저장소가 아니라 task 상태의 렌더링 결과다.

- planner는 `depends_on`이 모두 해소된 task를 `ready`, 그렇지 않으면 `backlog`로 seed 한다.
- `dispatch`는 `ready -> in_progress`로 이동시키고 `owner`를 할당한다.
- blocker가 열리면 `ready` 또는 `in_progress -> blocked`로 이동시키고 `blocker_ids`를 기록한다.
- blocker가 해소되면 `blocked -> ready` 또는 `blocked -> backlog`로 되돌린다.
- `verify`가 통과하면 `in_progress -> review`로 이동시키고 `verification`, `artifacts`, `review_state: pending`을 채운다.
- `code-review`가 통과하면 `review -> done`, `review_state: passed`로 갱신한다.
- `code-review`가 수정 요청을 내리면 영향받은 카드를 `ready` 또는 `backlog`로 되돌리고 `review_state: changes_requested`를 기록한다.
- rolling re-plan으로 대체된 task는 삭제하지 않고 `superseded`로 남긴다.

### 환경 격리(worktree) 자동 생성 조건

다음 중 하나라도 참이면 worktree를 강제한다.

1. 병렬 실행될 작업들의 예측 write-set이 겹친다.
2. 2명 이상 writer가 같은 모듈 또는 같은 공개 인터페이스를 수정한다.
3. 리팩터 범위가 여러 모듈에 걸치고 통합 충돌 가능성이 높다.

단순 변경 파일 수는 보조 신호일 뿐 1차 조건이 아니다.

---

## plan-progress.md 명세

YAML 블록이 정본이고, Markdown summary/kanban은 렌더링 뷰다. 에이전트는 YAML만 읽고 쓰며, 인간은 summary와 kanban을 본다.

### task node 규칙

각 task node는 계획 그래프의 노드이자 kanban 카드의 원천 데이터다.

| 필드 | 역할 |
|------|------|
| `status` | lane source. `backlog`, `ready`, `in_progress`, `blocked`, `review`, `done`, `superseded` 중 하나 |
| `owner` | 현재 writer 또는 `unassigned` |
| `write_set` | 충돌 탐지와 worktree 격리 판단 |
| `acceptance` | 완료 조건. 카드의 "done definition" |
| `verification` | 명령과 evidence 경로. 검증 계약 |
| `artifacts` | 산출물 위치와 종류 |
| `review_state` | `none`, `pending`, `changes_requested`, `passed` |
| `blocker_ids` | 카드와 blocker의 연결 |

Markdown kanban은 이 필드들의 파생 뷰다. 직접 편집하지 않는다.

````markdown
# plan-progress.md

## Machine Record
```yaml
meta:
  plan_version: 3
  grade: Feature
  confidence: medium
  profile_asymmetry: 0.89
  critical_path: [T2, T4, T6]
  estimated_duration: 4.5h
  estimated_effort: 7.0h
  started_at: 2026-03-26T09:00:00+09:00
  completed_at: null
  writer: executing-plans-orchestrator

tasks:
  - id: T1
    name: DB 스키마 수정
    depends_on: []
    duration_pert: {o: 0.4, m: 0.8, p: 1.5}
    effort_pert: {o: 0.5, m: 1.0, p: 1.8}
    status: done
    active_agent_time: 0.8h
    elapsed_active_time: 0.7h
    owner: worker-db
    write_set:
      - db/schema.sql
      - tests/db/schema.test.ts
    acceptance:
      - migration applies cleanly
      - schema tests pass
    verification:
      commands:
        - npm test -- tests/db/schema.test.ts
      evidence:
        - artifacts/logs/T1-schema-test.txt
    artifacts:
      - kind: source
        path: db/schema.sql
      - kind: test
        path: tests/db/schema.test.ts
      - kind: log
        path: artifacts/logs/T1-schema-test.txt
    review_state: passed
    blocker_ids: []

  - id: T2
    name: API 엔드포인트
    depends_on: [T1]
    duration_pert: {o: 0.8, m: 1.5, p: 3.0}
    effort_pert: {o: 1.0, m: 2.0, p: 3.5}
    status: blocked
    active_agent_time: 0.6h
    elapsed_active_time: 0.4h
    owner: worker-api
    write_set:
      - api/routes.ts
      - tests/api/routes.test.ts
    acceptance:
      - order API matches approved payload shape
      - unauthorized requests return 401
    verification:
      commands:
        - npm test -- tests/api/routes.test.ts
      evidence: []
    artifacts:
      - kind: source
        path: api/routes.ts
    review_state: none
    blocker_ids: [B1]

  - id: T3
    name: 롤백 테스트 보강
    depends_on: [T1]
    duration_pert: {o: 0.3, m: 0.5, p: 1.0}
    effort_pert: {o: 0.3, m: 0.6, p: 1.2}
    status: ready
    active_agent_time: null
    elapsed_active_time: null
    owner: unassigned
    write_set:
      - tests/db/rollback.test.ts
    acceptance:
      - rollback path is covered by an automated test
    verification:
      commands:
        - npm test -- tests/db/rollback.test.ts
      evidence: []
    artifacts: []
    review_state: none
    blocker_ids: []

blockers:
  - id: B1
    blocker_type: SpecAmbiguity   # Human | Environment | External | SpecAmbiguity | TestFlake
    affects: [T2]
    status: waiting
    triggered_at: 2026-03-26T11:30:00+09:00
    resolved_at: null
    gate_scope: affected_only

events:
  - at: 2026-03-26T10:10:00+09:00
    kind: task_transition
    task_id: T1
    from: review
    to: done
  - at: 2026-03-26T11:30:00+09:00
    kind: blocker_opened
    blocker_id: B1
    affects: [T2]
```

## Human View Summary
| ID | 작업 | depends_on | Duration E ± σ | Effort E ± σ | 상태 | review | owner |
|----|------|------------|----------------|--------------|------|--------|-------|
| T1 | DB 스키마 수정 | - | 0.85 ± 0.18h | 1.05 ± 0.22h | ✅ done | passed | worker-db |
| T2 | API 엔드포인트 | T1 | 1.63 ± 0.37h | 2.08 ± 0.42h | ⏸ blocked | none | worker-api |
| T3 | 롤백 테스트 보강 | T1 | 0.55 ± 0.12h | 0.65 ± 0.15h | 🟡 ready | none | unassigned |
| B1 | 스펙 확인 요청 | T2 | - | - | ⏸ SpecAmbiguity | - | orchestrator |

## Human View Kanban
### Ready
- `T3 롤백 테스트 보강`
  - owner: `unassigned`
  - acceptance: rollback path is covered by an automated test
  - verification: `npm test -- tests/db/rollback.test.ts`

### Blocked
- `T2 API 엔드포인트`
  - owner: `worker-api`
  - blockers: `B1`
  - artifacts: `source:api/routes.ts`

### Done
- `T1 DB 스키마 수정`
  - review: `passed`
  - artifacts: `source:db/schema.sql`, `test:tests/db/schema.test.ts`, `log:artifacts/logs/T1-schema-test.txt`
````

### Markdown 렌더링 규칙

- summary와 kanban은 YAML task node를 읽어 자동 렌더링한다.
- kanban lane은 `status`에서 파생한다.
- 카드에는 기본적으로 `name`, `owner`, `depends_on`, `acceptance`, `blocker_ids`, `artifacts`, `review_state`를 노출한다.
- `blocked` 카드는 연결된 blocker id와 타입을 함께 보여준다.
- `review` 카드는 `verification` evidence와 `review_state`를 함께 보여준다.
- 사람이 Markdown을 직접 고치지 않는다. 오케스트레이터가 YAML을 수정한 뒤 렌더링 뷰를 갱신한다.

### 계산 규칙

- `E_duration = (O_d + 4M_d + P_d) / 6`
- `σ_duration = (P_d - O_d) / 6`
- `E_effort = (O_e + 4M_e + P_e) / 6`
- `σ_effort = (P_e - O_e) / 6`

`critical_path`는 `duration`으로 계산한다. 비용/용량 분석은 `effort`로 계산한다. 두 지표를 섞지 않는다.

---

## 시간 지표

| 지표 | 정의 | 용도 |
|------|------|------|
| `elapsed_active_time` | 작업이 실제 진행 상태였던 경과 시간 | 스케줄링, CPM, 일정 편차 분석 |
| `active_agent_time` | 모든 에이전트 투입 시간의 합 | 비용 추적, 용량 계획, effort 편차 분석 |
| `wall_time` | 작업 시작부터 종료까지 실제 경과 시간 | 외부 커뮤니케이션, 기대치 관리 |

### 주의

- `elapsed_active_time`와 `active_agent_time`은 병렬 실행에서 다를 수 있다.
- 프로젝트 레벨에서 `wall_time - elapsed_active_time`로 대기를 계산하지 않는다.
- 프로젝트 레벨 대기 시간은 blocker interval의 합집합으로 계산한다.
- 단일 작업 단위에서는 `task_wait_time = wall_time - elapsed_active_time`를 참고값으로 쓸 수 있다.

---

## 인간 게이트 조건

예상 외 파일 수정 같은 저수준 신호 대신 의미 단위로 정의한다.

| 조건 | 기본 동작 |
|------|-----------|
| 모듈 경계 변경 | 영향받는 작업 정지 + 재계획 |
| 공개 인터페이스 변경 | 관련 작업 정지 + 인간 승인 필수 |
| 새 외부 의존성 추가 | 관련 작업 정지 + 인간 승인 필수 |
| re-triage 결과 등급 상승 | 상위 절차로 승격 |
| `confidence = low` | 인간 확인 요청 |
| `elapsed_active_time > E_duration + 2σ_duration` | 일정 이상 경고 + 회고 후보 |
| `active_agent_time > E_effort + 2σ_effort` | 비용 이상 경고 + 회고 후보 |
| `systematic-debugging` 후에도 미해결 | 인간 게이트 |
| Feature 완료 | 정상 게이트 |

시간 기반 게이트는 즉시 전체 정지를 의미하지 않는다. 기본 동작은 "경고 + 회고 후보 등록 + 무관한 작업 계속"이다. 전체 정지는 설계 무효화나 외부 리스크가 생겼을 때만 쓴다.

---

## code-review 규칙

외부 이름은 하나의 `code-review` 스킬로 유지한다. 내부 역할은 분리한다.

| 리뷰 타입 | 시점 | 담당자 | 목적 |
|-----------|------|--------|------|
| `Preflight Spec Review` | Feature의 `writing-plans` 직후 | fresh reviewer A | 초기 계획과 설계의 정합성 확인 |
| `Spec Delta Review` | 실행 후, rolling re-plan이나 예외 변경이 있었을 때 | fresh reviewer B | 구현이 승인된 계획/변경사항을 따르는지 확인 |
| `Quality Review` | 실행 후 최종 | fresh reviewer C | 버그, 회귀, 테스트 누락 확인 |

### 리뷰 실패 복귀 경로

- `Preflight Spec Review` 실패 -> `writing-plans`
- `Spec Delta Review` 실패 -> `executing-plans.dispatch`
- `Quality Review` 실패 -> `executing-plans.dispatch`

동일 에이전트가 둘 이상의 리뷰 타입을 맡지 않는다.

---

## rolling re-plan 규칙

rolling re-plan은 항상 허용하지 않는다. 다음 중 하나일 때만 발동한다.

1. 크리티컬 패스 선행 작업이 완료되었다.
2. blocker 해소로 후속 작업 구조가 실질적으로 바뀌었다.
3. re-triage로 등급 상승 가능성이 생겼다.

### thrash 방지 규칙

- 같은 작업 집합에 대해 연속 두 번 이상 re-plan 하지 않는다.
- re-plan은 남은 작업 중 크리티컬 패스와 직접 연결된 부분에 우선 적용한다.
- 사소한 순서 조정만 필요한 경우 `plan_version`을 올리지 않고 이벤트 로그에만 남긴다.

---

## 회고 (Retrospective)

### 트리거 조건

| 유형 | 조건 |
|------|------|
| 빈도 기반 | Feature 완료, 동일 유형 작업 5회 누적 |
| 이벤트 기반 | `active_agent_time > E_effort + 2σ_effort` 1회, `elapsed_active_time > E_duration + 2σ_duration` 1회, 동일 blocker 패턴 3회, `code-review` 연속 실패 2회 |

### 분석 항목

| 지표 | 해석 | 조치 대상 |
|------|------|-----------|
| effort 편차 지속 | 작업량 추정 오류 | `writing-plans`의 effort PERT 기본값 |
| duration 편차 지속 | 순서/의존성/병렬화 설계 오류 | `writing-plans`의 CPM 구조 |
| blocker 유형 분포 편향 | 병목이 구조적임 | `triage`, `writing-plans`, 또는 외부 프로세스 |
| blocker가 크리티컬 패스 위에 반복 | 먼저 해결해야 할 문제를 뒤로 미룸 | `writing-plans` 순서 |
| 게이트 발동 과다 | 분류 기준 또는 임계값이 과민함 | `triage` |
| rolling re-plan 후 대규모 변경 반복 | 초기 설계 범위가 너무 좁음 | `brainstorming` |

### 과학습 방지 규칙

- 단발 outlier는 즉시 스킬 변경으로 이어지지 않는다.
- 단발 사건은 먼저 `원인 가설`과 `재현 가능성`을 기록한다.
- 스킬 변경은 반복 패턴이 있거나, 단발 사건이라도 구조적 원인이 확인된 경우에만 제안한다.

분석 결과는 개선 초안으로 저장한다. 인간이 채택/거부하고, 채택된 초안만 `writing-skills`로 반영한다. 마지막으로 merge/PR/폐기를 처리하고 완료한다.
