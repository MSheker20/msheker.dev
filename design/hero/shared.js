// msheker.dev · Phase 2 hero explorations · shared behaviour
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// one switch for every looping motion on the page (marquee, terminal loops, logs)
export const motion = { paused: false };
export function pauseButton(btn) {
  if (reduced) { btn.hidden = true; return; }
  const set = p => { motion.paused = p; btn.setAttribute('aria-pressed', String(p)); btn.querySelector('span').textContent = p ? 'Play motion' : 'Pause motion'; };
  btn.addEventListener('click', () => set(!motion.paused));
  addEventListener('keydown', e => { if (e.key === 'p' && !/input|textarea/i.test(e.target.tagName) && !e.metaKey && !e.ctrlKey) set(!motion.paused); });
  set(false);
}

// ---- terminal typing: <pre data-type> with lines [{cmd}|{out, cls}] in data-script (JSON)
export function typeTerminal(el, { speed = 38, linePause = 380, loop = false } = {}) {
  const script = JSON.parse(el.dataset.script);
  const render = (upto, partial = '') => {
    let html = '';
    script.slice(0, upto).forEach(l => { html += line(l) + '\n'; });
    if (partial !== null && upto < script.length) html += `<span class="p">$</span> ${esc(partial)}<span class="cursor"></span>`;
    else html += `<span class="p">$</span> <span class="cursor"></span>`;
    el.innerHTML = html;
  };
  const line = l => l.cmd !== undefined ? `<span class="p">$</span> ${esc(l.cmd)}` : `<span class="${l.cls || ''}">${esc(l.out)}</span>`;
  if (reduced) { render(script.length, null); return; }
  let i = 0;
  const step = () => {
    if (i >= script.length) {
      render(script.length, null);
      if (loop) { const again = () => motion.paused ? setTimeout(again, 400) : (i = 0, step()); setTimeout(again, 2600); }
      return;
    }
    const l = script[i];
    if (l.cmd === undefined) { i++; render(i, ''); setTimeout(step, 90); return; }
    let c = 0;
    const tick = () => {
      render(i, l.cmd.slice(0, c));
      if (c++ < l.cmd.length) setTimeout(tick, speed + Math.random() * 30);
      else { i++; setTimeout(step, linePause); }
    };
    tick();
  };
  render(0, '');
  setTimeout(step, 500);
}
const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

// ---- marquee that answers scroll direction (Dennis-style)
export function marquee(el, { speed = 60 } = {}) {
  const track = el.querySelector('.marquee-track');
  const unit = track.innerHTML;
  track.innerHTML = unit.repeat(4);
  if (reduced) return;
  let x = 0, dir = -1, last = performance.now(), lastY = scrollY, boost = 0;
  addEventListener('scroll', () => {
    const dy = scrollY - lastY; lastY = scrollY;
    if (dy) { dir = dy > 0 ? -1 : 1; boost = Math.min(6, boost + Math.abs(dy) / 20); }
  }, { passive: true });
  const frame = now => {
    const dt = (now - last) / 1000; last = now;
    const w = track.scrollWidth / 4;
    if (!motion.paused) x += dir * speed * (1 + boost) * dt;
    boost *= .92;
    if (x <= -w) x += w; if (x > 0) x -= w;
    track.style.transform = `translate3d(${x}px,0,0)`;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

// ---- decode: letters resolve from random glyphs (letters-assemble, terminal flavour)
export function decode(el, { duration = 1100, delay = 200 } = {}) {
  const final = el.textContent;
  el.setAttribute('aria-label', final);
  if (reduced) return;
  const glyphs = '#%@$&*+=-_/\\<>[]{}01';
  const start = performance.now() + delay;
  const order = [...final].map((ch, i) => ({ ch, at: (i / final.length) * duration * .7 + Math.random() * duration * .3 }));
  const frame = now => {
    const t = now - start;
    el.textContent = order.map(o => (o.ch === ' ' || t >= o.at) ? o.ch : glyphs[(Math.random() * glyphs.length) | 0]).join('');
    if (t < duration + 50) requestAnimationFrame(frame); else el.textContent = final;
  };
  requestAnimationFrame(frame);
}

// ---- pixel wordmark from a 5x7 bitmap font → inline SVG
const FONT = {
  m: ['00000','00000','11010','10101','10101','10101','10101'],
  s: ['00000','00000','01111','10000','01110','00001','11110'],
  h: ['10000','10000','10110','11001','10001','10001','10001'],
  e: ['00000','00000','01110','10001','11111','10000','01110'],
  k: ['10000','10000','10010','10100','11000','10100','10010'],
  r: ['00000','00000','10110','11001','10000','10000','10000'],
  '.': ['00000','00000','00000','00000','00000','01100','01100'],
  d: ['00001','00001','01101','10011','10001','10011','01101'],
  v: ['00000','00000','10001','10001','10001','01010','00100'],
};
export function pixelWord(el, word, { cell = 4, gap = 1 } = {}) {
  const w = word.length * 6 - 1, h = 7, u = cell;
  let rects = '';
  [...word].forEach((ch, i) => (FONT[ch] || FONT['.']).forEach((row, y) => [...row].forEach((b, x) => {
    if (b === '1') rects += `<rect x="${(i * 6 + x) * u}" y="${y * u}" width="${u - gap}" height="${u - gap}"/>`;
  })));
  el.innerHTML = `<svg viewBox="0 0 ${w * u} ${h * u}" width="${w * u}" height="${h * u}" fill="currentColor" aria-hidden="true">${rects}</svg>`;
}

// ---- keys 1–4 jump to nav items (opencode-style)
export function numberKeys() {
  const links = [...document.querySelectorAll('.navlink[data-key]')];
  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey || /input|textarea/i.test(e.target.tagName)) return;
    const a = links.find(l => l.dataset.key === e.key);
    if (!a) return;
    a.focus(); a.classList.add('flash'); setTimeout(() => a.classList.remove('flash'), 400);
  });
}

// ---- preview-only theme switch: system → light → dark
export function themeSwitch() {
  const b = document.createElement('button');
  b.className = 'theme-switch';
  const modes = ['system', 'light', 'dark'];
  let i = 0;
  const set = () => {
    const m = modes[i];
    if (m === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.dataset.theme = m;
    b.textContent = `theme: ${m}`;
  };
  b.onclick = () => { i = (i + 1) % 3; set(); };
  set();
  document.body.append(b);
}

// ---- preview-only style panel: try fonts and accent colours (?font=…&accent=…)
const FONTS = {
  geist: ['Geist Mono', 'Geist+Mono:wght@400;500'],
  jetbrains: ['JetBrains Mono', 'JetBrains+Mono:wght@400;500'],
  plex: ['IBM Plex Mono', 'IBM+Plex+Mono:wght@400;500'],
  martian: ['Martian Mono', 'Martian+Mono:wght@400;500'],
  fragment: ['Fragment Mono', 'Fragment+Mono'],
  dm: ['DM Mono', 'DM+Mono:wght@400;500'],
};
// accent, ink on light ground, accent on dark ground, text on an accent button
const ACCENTS = {
  cobalt: ['#2f5bff', '#2f5bff', '#6f8bff', '#ffffff'],
  orange: ['#ff5a1f', '#c43d0c', '#ff6a33', '#ffffff'],
  lime:   ['#c6f432', '#4d6400', '#d4ff3a', '#0e0e10'],
  green:  ['#19c37d', '#0b7a4b', '#2ee59d', '#0e0e10'],
  amber:  ['#ffb000', '#8a5a00', '#ffc233', '#0e0e10'],
};
export function stylePanel() {
  const q = new URLSearchParams(location.search);
  let font = q.get('font') in FONTS ? q.get('font') : 'geist';
  let accent = q.get('accent') in ACCENTS ? q.get('accent') : 'cobalt';
  const css = document.createElement('style');
  document.head.append(css);
  const apply = () => {
    const [fam, spec] = FONTS[font];
    if (!document.querySelector(`link[data-font="${font}"]`)) {
      const l = document.createElement('link'); l.rel = 'stylesheet'; l.dataset.font = font;
      l.href = `https://fonts.googleapis.com/css2?family=${spec}&display=swap`; document.head.append(l);
    }
    const [a, ink, dark, on] = ACCENTS[accent];
    css.textContent = `
      :root { --mono: "${fam}", ui-monospace, SFMono-Regular, Menlo, monospace !important; --accent: ${a}; --accent-ink: ${ink}; --on-accent: ${on}; }
      @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --accent: ${dark}; --accent-ink: ${dark}; } }
      :root[data-theme="dark"] { --accent: ${dark}; --accent-ink: ${dark}; }`;
    const u = new URL(location); u.searchParams.set('font', font); u.searchParams.set('accent', accent); history.replaceState(null, '', u);
    panel.querySelectorAll('[data-f]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.f === font)));
    panel.querySelectorAll('[data-a]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.a === accent)));
  };
  const panel = document.createElement('div');
  panel.className = 'style-panel';
  panel.innerHTML = `<span>font</span>${Object.keys(FONTS).map(k => `<button data-f="${k}">${k}</button>`).join('')}
    <span>accent</span>${Object.entries(ACCENTS).map(([k, v]) => `<button data-a="${k}" aria-label="${k}" title="${k}"><i style="background:${v[0]}"></i></button>`).join('')}`;
  panel.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.f) font = b.dataset.f; if (b.dataset.a) accent = b.dataset.a; apply();
  });
  document.body.append(panel);
  apply();
}
