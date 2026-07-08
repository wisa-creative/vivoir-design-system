// VIVOIR Design System — App
// 1) 조각 파일(sections/*.html)을 fetch로 불러와 조립
// 2) 다크모드 토글
// 3) 사이드바 active 상태 처리
//
// 주의: fetch는 file:// 프로토콜에서 CORS로 막힙니다.
// 반드시 로컬 서버로 열어야 합니다. (README 참고)
//   python3 -m http.server 8080
//   또는 npx serve

async function loadFragment(url, targetId) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    const html = await res.text();
    const el = document.getElementById(targetId);
    if (el) el.outerHTML = html;
  } catch (err) {
    console.error('Failed to load', url, err);
    const el = document.getElementById(targetId);
    if (el) el.innerHTML = `<p style="color:#D8323A;font-family:monospace;font-size:12px">
      ⚠ ${url} 로드 실패 — 로컬 서버로 열었는지 확인하세요 (file://는 지원 안 됨)</p>`;
  }
}

async function init() {
  // 로고 심볼 defs 삽입
  const svgRes = await fetch('assets/logo-symbols.svg');
  document.getElementById('logo-defs').innerHTML = await svgRes.text();

  // 사이드바
  await loadFragment('sections/_sidebar.html', 'sidebar-slot');

  // 콘텐츠 섹션 (순서대로)
  await Promise.all([
    loadFragment('sections/hero.html',          'section-hero'),
    loadFragment('sections/brand-concept.html', 'section-brand-concept'),
    loadFragment('sections/logo.html',          'section-logo'),
    loadFragment('sections/dont.html',       'section-dont'),
    loadFragment('sections/color.html',      'section-color'),
    loadFragment('sections/typography.html', 'section-typography'),
    loadFragment('sections/spacing.html',    'section-spacing'),
    loadFragment('sections/icon.html',       'section-icon'),
    loadFragment('sections/button.html',     'section-button'),
    loadFragment('sections/badge.html',      'section-badge'),
    loadFragment('sections/form.html',       'section-form'),
    loadFragment('sections/voice.html',         'section-voice'),
    loadFragment('sections/photography.html',   'section-photography'),
    loadFragment('sections/footnote.html',      'section-footnote'),
  ]);

  bindThemeToggle();
  bindSidebarActive();
}

function bindThemeToggle() {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const dark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', dark ? 'light' : 'dark');
    btn.textContent = dark ? '◐ 다크 모드' : '◑ 라이트 모드';
  });
}

function bindSidebarActive() {
  document.querySelectorAll('.sb-group a.jump').forEach((a) => {
    a.addEventListener('click', () => {
      document.querySelectorAll('.sb-group a').forEach((x) => x.classList.remove('active'));
      a.classList.add('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
