# VIVOIR Design System — V1 Draft

비브아(VIVOIR) 리브랜딩 스타일가이드. Claude.ai 채팅에서 단일 HTML로 작업하다 여러 파일로 분리했습니다.

## 실행 방법

`fetch()`로 섹션 조각을 불러오는 구조라 **반드시 로컬 서버로 열어야 합니다.** `file://`로 직접 열면 브라우저 CORS 정책 때문에 섹션이 로드되지 않습니다.

```bash
cd vivoir-design-system
python3 -m http.server 8080
# 또는: npx serve
```

브라우저에서 `http://localhost:8080` 접속.

## 폴더 구조

```
vivoir-design-system/
├── index.html              페이지 셸 (헤드, 토글 버튼, 섹션 slot, JS 로드)
├── css/
│   ├── tokens.css          컬러 변수(Core/Event), 폰트 변수, 다크모드 변수, 리셋
│   ├── layout.css          사이드바, 다크모드 토글, 메인 레이아웃, 히어로, 섹션 제목 공통 스타일
│   └── components.css      콜아웃, 로고 패널, 컬러칩, 버튼, 배지, 폼, 타입스케일 등 콘텐츠별 스타일
├── js/
│   └── app.js              섹션 fetch 로더 + 다크모드 토글 + 사이드바 active 처리
├── assets/
│   ├── logo-symbols.svg    <symbol id="vivoir">, <symbol id="vivoir-outline"> (재사용 심볼, index.html이 fetch)
│   └── vivoir-logo.svg     단색 사파이어 단독 로고 파일 (파비콘/외부용, 참고용)
└── sections/                콘텐츠 조각 (fetch로 조립됨)
    ├── _sidebar.html        좌측 내비게이션
    ├── hero.html            상단 타이틀 + 리드 카피 + 로고 요약 콜아웃
    ├── logo.html            01 Logo
    ├── dont.html            02 Do/Don't
    ├── color.html           03 Color (Core/Event)
    ├── typography.html      04 Typography
    ├── spacing.html         05 Spacing
    ├── icon.html            06 Iconography
    ├── button.html          07 Components — Button
    ├── badge.html           07 Components — Badge & Label
    ├── form.html            07 Components — Form & Input
    ├── voice.html           08 Voice & Tone
    └── footnote.html        하단 진행상황 표기
```

## 설계 결정 로그 (왜 이렇게 만들었는지)

### 핵심 원칙 — Core / Event 이원 구조
비브아는 "연구소(신뢰) + 놀이(반전)"라는 두 얼굴을 가진 브랜드입니다. 이 문서 전체가 하나의 규칙을 반복 적용합니다:

> **기본은 연구소의 신뢰감. Play Lab의 장난기는 이벤트에서만, 아주 작게.**

- **색**: Core(White/Ice Blue/Soft Powder Blue/Sapphire/Deep Navy)는 상시, Event(Neon Orange/Yellow)는 프로모션·캠페인 전용. PDP에서 Orange 노출은 0~3%, 이벤트에서만 5~10%.
- **폰트**: Pretendard(Core, 한글 전용 — 정보 전달 100%), Space Grotesk(Accent, 영문 브랜드 요소 전용 — "VIVOIR PLAY LAB", LP코드 등). 한글에 Space Grotesk를 쓰면 글리프가 없어 깨지므로 절대 섞지 않음.
- **Voice&Tone**: 90% Lab(상시, 진지) / 10% Play(이벤트, 위트).
- **컴포넌트**: CTA 버튼은 항상 Sapphire. Orange는 배지·점·아이콘 상태표시 등 "작은 신호"로만.

### 로고
원본 SVG(`viewBox 0 0 2235 395`, 비율 5.66:1)를 그대로 심볼화. 두 개의 뾰족한 `∨`을 "비커/이완의 방향"으로 해석해 브랜드 스토리와 연결. 배경별 반전(Sapphire/White 2색만), 보호여백(로고 높이의 50%), 최소크기(웹 88px/인쇄 20mm) 확정.

### 아직 확정 안 된 것 (Code에서 검토 필요)
- **타입스케일 px값**: Display 40/H1 30/H2 22/H3 17/Body 15/Caption 12 (데스크톱), 모바일은 각각 한 단계씩 축소 — 전부 제안치이며 실측 검증 필요.
- **Spacing 페이지 구조 기준값**: 섹션 여백 96px(desktop)/64px(mobile) 등도 제안치.
- **예시 카피/스펙 수치**: "KC 인증 완료 모터", "15분이면 리셋" 등은 전부 placeholder. 실제 제품 스펙으로 교체 필요.
- **기능색(Error/Success)**: #E5484D / #1FAA59로 임시 지정. 브랜드 Core/Event와 별개로 관리하기로 결정했으나 최종 색상은 미확정.

### 아직 안 만든 것 (사이드바에 "개발중" 배지 표시)
- Brand Concept (Overview 탭)
- Photography (제품 촬영 가이드)

## Claude Code에서 진행할 때 참고할 것

1. **섹션 추가/수정 시**: `sections/*.html`만 건드리면 됩니다. `index.html`은 손댈 일이 거의 없고, 새 섹션을 추가할 때만 `index.html`에 `<div id="section-xxx"></div>` slot과 `js/app.js`의 `loadFragment` 호출을 한 줄씩 추가하면 됩니다.
2. **스타일 수정 시**: 레이아웃/사이드바/전역 타이포는 `css/layout.css`, 색상 변수는 `css/tokens.css`, 특정 컴포넌트(버튼·배지·폼 등) 모양은 `css/components.css`.
3. **다음으로 만들 것 제안**: Brand Concept, Photography 순서로 채우면 사이드바의 "개발중" 배지가 모두 사라집니다.
4. **폰트 CDN 403 관련**: 로컬 개발 중 Google Fonts/jsDelivr가 네트워크 정책상 막힐 수 있습니다(placeholder 폰트로 폴백). 실제 배포 환경에서는 정상 로드됩니다.
5. **원본 단일 파일**: 이 분리 작업 전 원본은 `vivoir-styleguide.html` 한 파일이었습니다. 혹시 분리 과정에서 내용 유실이 의심되면 그 파일과 diff해서 확인 가능합니다(같이 첨부되어 있다면).
