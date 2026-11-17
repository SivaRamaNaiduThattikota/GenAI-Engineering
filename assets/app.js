// Course manifest. To add a lesson: add an entry here and create the file.
const STAGES = {
  0: { name: 'Preview', icon: 'bg-teal' },
  1: { name: 'Stage 1 · Foundations', icon: 'bg-blue' },
  2: { name: 'Stage 2 · How LLMs work', icon: 'bg-indigo' },
  3: { name: 'Stage 3 · Working with models', icon: 'bg-purple' },
  4: { name: 'Stage 4 · Working with your data', icon: 'bg-teal' },
  5: { name: 'Stage 5 · Agents and workflows', icon: 'bg-orange' },
  6: { name: 'Stage 6 · Advanced development', icon: 'bg-red' },
};

const COURSE = [
  { id: 'preview', stage: 0, num: 'P', file: 'lessons/p-preview.html', mins: 15,
    title: 'Prompts, tokens and context',
    desc: 'The first quick tour: what GenAI is, what a prompt becomes, context windows and a first look at RAG.',
    keys: 'token context window chunking retrieval rag prompt budget lost in the middle' },
  { id: 'l1-1', stage: 1, num: '1.1', file: 'lessons/1-1-ai-landscape.html', mins: 20,
    title: 'How AI, ML, DL and GenAI fit together',
    desc: 'The hierarchy, training vs inference, the GenAI application stack, and when not to use an LLM.',
    keys: 'ai machine learning deep learning llm foundation model rules training inference stack' },
  { id: 'l1-2', stage: 1, num: '1.2', file: 'lessons/1-2-prediction-to-generation.html', mins: 35,
    title: 'From prediction models to generative models',
    desc: 'Next-token prediction, the chain rule, the training loss, logits and temperature, and why fluent is not true.',
    keys: 'autoregressive chain rule cross entropy logits softmax temperature greedy sampling hallucination prefill decode base instruct' },
  { id: 'l1-3', stage: 1, num: '1.3', file: 'lessons/1-3-models-vs-applications.html', mins: 30,
    title: 'Models vs applications',
    desc: 'The model is stateless: chat memory, context construction, trimming history, why outputs vary and how to test them.',
    keys: 'stateless memory history messages roles system user assistant context construction prompt caching sliding window summarisation state nondeterminism testing evaluation llm judge test set' },
  { id: 'l1-4', stage: 1, num: '1.4', file: 'lessons/1-4-model-landscape.html', mins: 35,
    title: 'The model landscape and how models are made',
    desc: 'Encoders, decoders, embedding and diffusion models, the training pipeline, the prompt-RAG-fine-tune ladder, size, open weights and licences.',
    keys: 'encoder decoder bert t5 embedding model diffusion multimodal sft rlhf dpo reward model reasoning fine-tuning lora parameters quantisation mixture of experts open weights licence model card' },
  { id: 'l1-5', stage: 1, num: '1.5', file: 'lessons/1-5-history-and-measurement.html', mins: 30,
    title: 'How language models got here, and how they are measured',
    desc: 'A bigram model in Python, from counting to Transformers, scaling laws, perplexity and the limits of benchmarks.',
    keys: 'n-gram bigram sparsity smoothing rnn lstm attention transformer gpt bert scaling laws chinchilla perplexity benchmark mmlu arena contamination history' },
  { id: 'l2-1', stage: 2, num: '2.1', file: 'lessons/2-1-tokenization.html', mins: 40,
    title: 'Tokens and tokenization',
    desc: 'How text becomes token IDs, how BPE learns a vocabulary, and what token counts mean for cost, context and accuracy.',
    keys: 'token tokenizer bpe byte pair encoding wordpiece unigram sentencepiece vocabulary token id embedding table utf-8 code point tiktoken special tokens chat template' },
  { id: 'l2-2', stage: 2, num: '2.2', soon: true, title: 'Embeddings',
    desc: 'How a token ID becomes a vector, how those vectors are learned, and token vs document embeddings.' },
];

(function () {
  const root = document.body.dataset.root || '';
  const pageId = document.body.dataset.id || 'home';
  const KEY = 'genai-notes-done';
  let done = JSON.parse(localStorage.getItem(KEY) || '[]');
  const lesson = COURSE.find(c => c.id === pageId);
  if (lesson) document.body.dataset.stage = lesson.stage;

  const svg = {
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r=".6"/><circle cx="4.5" cy="12" r=".6"/><circle cx="4.5" cy="18" r=".6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
    print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    sidebar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="15" rx="3.5"/><path d="M9.5 4.5v15M5.6 8.5h1.6M5.6 11.5h1.6"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  };

  // ---------- shell: sidebar + navbar ----------
  const shell = document.querySelector('.shell');
  const main = shell.querySelector('.main');
  const side = document.createElement('aside');
  side.className = 'sidebar'; side.id = 'sidebar'; side.setAttribute('aria-label', 'Contents');
  side.innerHTML = `
    <div class="brand-row"><a class="brand" href="${root}index.html"><span class="logo">AI</span><span><b>GenAI Engineering</b><small>Basics to production</small></span></a>
    <button class="side-toggle in-side" type="button" aria-label="Hide sidebar" title="Hide sidebar (Ctrl + B)">${svg.sidebar}</button></div>
    <label class="search">${svg.search}<input id="q" type="search" placeholder="Search lessons" autocomplete="off"></label>
    <div id="side-groups"></div><p class="side-empty" id="side-empty">No lessons match.</p>
    <button class="side-settings" type="button" id="side-settings">${svg.gear}<span><b>Settings</b><small>Theme, lightness, progress</small></span></button>
    <p class="side-foot">Progress is saved in this browser.<br>Ctrl / ⌘ + K to search.</p>`;
  shell.insertBefore(side, main);

  const nav = document.createElement('header');
  nav.className = 'navbar'; nav.id = 'navbar';
  const title = lesson ? `${lesson.num} ${lesson.title}` : (document.body.dataset.title || 'GenAI Engineering');
  nav.innerHTML = `
    <button class="nav-btn menu-btn" id="menu-btn" aria-label="Open contents">${svg.menu}</button>
    <button class="nav-btn side-toggle in-nav" type="button" aria-label="Show sidebar" title="Show sidebar (Ctrl + B)">${svg.sidebar}</button>
    ${pageId !== 'home' ? `<a class="nav-btn" href="${root}index.html" aria-label="Home">${svg.home}</a>` : ''}
    <div class="small-title">${title}</div>
    <button class="nav-btn" id="settings-btn" type="button" aria-label="Settings" aria-expanded="false" aria-controls="settings" title="Settings">${svg.gear}</button>
    <button class="nav-btn" id="print-btn" aria-label="Print or save as PDF" title="Print / save as PDF">${svg.print}</button>
    <div class="progress" id="read-progress"></div>`;
  main.insertBefore(nav, main.firstChild);

  const groups = side.querySelector('#side-groups');
  function buildSide(filter = '') {
    const f = filter.trim().toLowerCase();
    const match = c => !f || (c.title + ' ' + (c.keys || '') + ' ' + (c.desc || '') + ' ' + c.num).toLowerCase().includes(f);
    let html = '';
    if (!f) html += `<div class="side-group"><h4>Course</h4><ul class="side-list">
      <li><a href="${root}index.html" class="${pageId === 'home' ? 'active' : ''}"><span class="ico bg-blue">★</span>Overview and roadmap</a></li>
      <li><a href="${root}glossary.html" class="${pageId === 'glossary' ? 'active' : ''}"><span class="ico bg-purple">Aa</span>Glossary</a></li></ul></div>`;
    let any = false;
    Object.keys(STAGES).forEach(s => {
      const items = COURSE.filter(c => String(c.stage) === s && match(c));
      if (!items.length) return;
      any = true;
      html += `<div class="side-group" data-stage="${s}"><h4><i></i>${STAGES[s].name}</h4><ul class="side-list">` +
        items.map(c => `<li><a href="${c.soon ? '#' : root + c.file}" class="${c.id === pageId ? 'active' : ''} ${c.soon ? 'soon' : ''}">
          <span class="dot ${done.includes(c.id) ? 'done' : ''} ${c.soon ? 'soon' : ''}"></span><span class="num">${c.num}</span><span>${c.title}${c.soon ? ' · soon' : ''}</span></a></li>`).join('') +
        '</ul></div>';
    });
    groups.innerHTML = html;
    side.querySelector('#side-empty').style.display = any || !f ? 'none' : 'block';
  }
  buildSide();
  const q = side.querySelector('#q');
  q.addEventListener('input', () => buildSide(q.value));

  // keep sidebar scroll position across pages
  side.scrollTop = +sessionStorage.getItem('genai-side-scroll') || 0;
  addEventListener('beforeunload', () => sessionStorage.setItem('genai-side-scroll', side.scrollTop));

  // ---------- collapsible sidebar (desktop) ----------
  function setCollapsed(c) {
    document.documentElement.classList.toggle('side-collapsed', c);
    localStorage.setItem('genai-side-collapsed', c ? '1' : '0');
  }
  document.querySelectorAll('.side-toggle').forEach(b => b.addEventListener('click', () =>
    setCollapsed(!document.documentElement.classList.contains('side-collapsed'))));
  addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b' && innerWidth > 1000) {
      e.preventDefault(); setCollapsed(!document.documentElement.classList.contains('side-collapsed'));
    }
  });

  // ---------- settings panel: theme, lightness, glass, progress ----------
  const panel = document.createElement('div');
  panel.className = 'settings'; panel.id = 'settings'; panel.hidden = true;
  panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Settings');
  const slider = (id, label, lo, hi, info) => `<div class="st-group st-${id}"><div class="st-label">${label}<span class="st-active">in use now</span></div>
      <input type="range" id="st-${id}" min="0" max="100" step="1" aria-label="${label}">
      <div class="st-ends"><span>${lo}</span><b class="st-val" id="st-${id}-val"></b><span>${hi}</span></div>
      <p class="st-info">${info}</p><p class="st-now" id="st-${id}-now"></p></div>`;
  panel.innerHTML = `<div class="st-head"><b>Settings</b><button class="st-reset" type="button" id="st-reset" title="Put every slider back to the standard value">Reset to standard</button></div>
    <div class="st-group"><div class="st-label">Theme</div>
      <div class="seg" id="theme-seg"><span class="thumb"></span><button data-v="auto">Auto</button><button data-v="light">Light</button><button data-v="dark">Dark</button><button data-v="glass" title="Liquid Glass">Glass</button></div>
      <p class="st-info">Auto follows your system setting.</p></div>
    <div class="st-group st-glass"><div class="st-label">Liquid Glass</div>
      <div class="gm" id="glass-mode" role="group" aria-label="Liquid Glass light or dark"><button type="button" data-m="auto">Auto</button><button type="button" data-m="light">Light</button><button type="button" data-m="dark">Dark</button></div>
      <div class="st-sub">Bars and buttons</div>
      <input type="range" id="glass-tint" min="0" max="100" step="1" aria-label="Glass bars, from clear to tinted">
      <div class="st-ends"><span>Clear</span><b class="st-val" id="glass-tint-val"></b><span>Tinted</span></div>
      <div class="st-sub">Content panels</div>
      <input type="range" id="st-body" min="10" max="100" step="1" aria-label="Glass content panels, from see-through to solid">
      <div class="st-ends"><span>See-through</span><b class="st-val" id="st-body-val"></b><span>Solid</span></div>
      <p class="st-info">Standard: bars <b>0</b>, Apple's clear glass. Panels <b>40</b> in light and <b>60</b> in dark. <b>100</b> makes panels fully solid, the way Apple keeps content.</p></div>
    ${slider('light', 'Light mode brightness', 'Soft', 'Bright', 'Standard is <b>100</b>: Apple iOS light, a <code>#F2F2F7</code> page with white cards. Go lower to cut glare on a bright screen. Around 50 is a calm grey.')}
    ${slider('dark', 'Dark mode depth', 'Dim grey', 'True black', 'Standard is <b>100</b>: Apple iOS dark, a true black <code>#000000</code> page with <code>#1C1C1E</code> cards. <b>57</b> gives <code>#121212</code>, the Material Design dark grey. Lower is easier on the eyes on screens that are not OLED.')}
    <div class="st-group"><div class="st-label">Progress</div><div id="st-progress"></div>
      <p class="st-info">Lessons you mark as done are saved in this browser only. Export to keep a copy or to move to another browser.</p></div>`;
  document.body.appendChild(panel);

  // ---------- theme ----------
  const seg = panel.querySelector('#theme-seg'), thumb = seg.querySelector('.thumb');
  const mq = matchMedia('(prefers-color-scheme: dark)');
  function applyTheme(v) {
    localStorage.setItem('genai-notes-theme', v);
    const gm = localStorage.getItem('genai-glass-mode') || 'auto';
    const dark = v === 'dark' || (v === 'auto' && mq.matches) || (v === 'glass' && (gm === 'dark' || (gm === 'auto' && mq.matches)));
    panel.querySelectorAll('#glass-mode button').forEach(b => b.classList.toggle('on', b.dataset.m === gm));
    const h = document.documentElement;
    h.dataset.theme = dark ? 'dark' : 'light';
    h.classList.toggle('glass', v === 'glass');
    showLook();
    placeThumb();
    dispatchEvent(new Event('genai-theme'));
  }
  // measure the selected button each time: widths change when the web font finishes
  // loading or the sidebar resizes, which used to leave the pill off-centre
  function placeThumb() {
    const v = localStorage.getItem('genai-notes-theme') || 'auto';
    const btn = seg.querySelector(`button[data-v="${v}"]`) || seg.querySelector('button');
    thumb.style.left = '0';
    thumb.style.width = btn.offsetWidth + 'px';
    thumb.style.transform = `translateX(${btn.offsetLeft}px)`;
  }
  if (document.fonts) document.fonts.ready.then(placeThumb);
  new ResizeObserver(placeThumb).observe(seg);
  // iOS 27 style slider: from ultra-clear to fully tinted glass
  // lightness sliders. The colour maths lives in boot.js (genaiLook) so it also runs before the first paint.
  const STD = { light: 100, dark: 100 };
  function showLook() {
    const now = window.genaiLook();
    const dk = document.documentElement.dataset.theme === 'dark';
    ['light', 'dark'].forEach(m => {
      const v = +(localStorage.getItem('genai-' + m) || STD[m]);
      const inp = panel.querySelector('#st-' + m);
      if (document.activeElement !== inp) inp.value = v;
      panel.querySelector(`#st-${m}-val`).textContent = v === STD[m] ? v + ' · standard' : v;
      const on = (m === 'dark') === dk;
      panel.querySelector('.st-' + m).classList.toggle('active', on);
      panel.querySelector(`#st-${m}-now`).innerHTML = on ? `Now: page <code>${now.bg}</code>, cards <code>${now.card}</code>` : 'Drag it to switch to this mode and see it.';
    });
    const gb = localStorage.getItem('genai-glass-body'), gstd = dk ? 60 : 40;
    const gv = gb === null ? gstd : +gb, body = panel.querySelector('#st-body');
    if (document.activeElement !== body) body.value = gv;
    panel.querySelector('#st-body-val').textContent = gv === gstd ? gv + ' · standard' : gv;
    const tv = Math.round(+(localStorage.getItem('genai-glass-tint-l1') || 0) * 100);
    panel.querySelector('#glass-tint-val').textContent = tv === 0 ? '0 · standard' : tv;
  }
  ['light', 'dark'].forEach(m => panel.querySelector('#st-' + m).addEventListener('input', e => {
    localStorage.setItem('genai-' + m, e.target.value);
    // dragging one mode's slider switches to that mode, so you see what you change
    const dk = document.documentElement.dataset.theme === 'dark';
    if ((m === 'dark') !== dk) {
      if ((localStorage.getItem('genai-notes-theme') || 'auto') === 'glass') localStorage.setItem('genai-glass-mode', m);
      else localStorage.setItem('genai-notes-theme', m);
      applyTheme(localStorage.getItem('genai-notes-theme'));
    } else showLook();
  }));
  panel.querySelector('#st-body').addEventListener('input', e => { localStorage.setItem('genai-glass-body', e.target.value); showLook(); });
  panel.querySelector('#st-reset').addEventListener('click', () => {
    ['genai-light', 'genai-dark', 'genai-glass-body', 'genai-glass-tint-l1'].forEach(k => localStorage.removeItem(k));
    document.documentElement.style.setProperty('--tint', '0'); tintInput.value = 0;
    showLook();
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
      panel.querySelectorAll('input[type=range]').forEach(i => i.animate([{ scale: '1' }, { scale: '1.04 .9' }, { scale: '1' }], { duration: 520, easing: 'cubic-bezier(.3,1.6,.5,1)' }));
  });
  const tintInput = panel.querySelector('#glass-tint');
  const savedTint = localStorage.getItem('genai-glass-tint-l1');
  const defaultTint = 0;
  tintInput.value = Math.round((savedTint === null ? defaultTint : +savedTint) * 100);
  tintInput.addEventListener('input', () => {
    const t = (tintInput.value / 100).toFixed(2);
    document.documentElement.style.setProperty('--tint', t);
    localStorage.setItem('genai-glass-tint-l1', t);
    showLook();
  });
  seg.addEventListener('click', e => { if (e.target.dataset.v) applyTheme(e.target.dataset.v); });
  panel.querySelector('#glass-mode').addEventListener('click', e => {
    const m = e.target.dataset.m;
    if (!m) return;
    localStorage.setItem('genai-glass-mode', m);
    applyTheme('glass');
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
      e.target.animate([{ scale: '1' }, { scale: '.86' }, { scale: '1.06' }, { scale: '1' }], { duration: 520, easing: 'cubic-bezier(.3,1.6,.5,1)' });
  });
  mq.addEventListener('change', () => applyTheme(localStorage.getItem('genai-notes-theme') || 'auto'));
  applyTheme(localStorage.getItem('genai-notes-theme') || 'auto');

  // ---------- mobile sheet ----------
  const scrim = document.createElement('div'); scrim.className = 'scrim'; document.body.appendChild(scrim);
  const openSheet = o => { side.classList.toggle('open', o); scrim.classList.toggle('on', o); };
  nav.querySelector('#menu-btn').onclick = () => openSheet(true);
  scrim.onclick = () => openSheet(false);
  addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (innerWidth <= 1000) openSheet(true); q.focus(); }
    if (e.key === 'Escape') openSheet(false);
  });

  // ---------- page transitions ----------
  // Direction follows course order, like an iOS navigation stack:
  // home < preview < 1.1 < 1.2 < ... < glossary. Deeper = push, shallower = pop.
  function depth(path) {
    const f = decodeURIComponent(path).replace(/\\/g, '/');
    if (/\/index\.html$/.test(f) || /\/$/.test(f)) return 0;
    if (/\/glossary\.html$/.test(f)) return 999;
    const i = COURSE.findIndex(c => c.file && f.endsWith('/' + c.file));
    return i < 0 ? 500 : i + 1;
  }
  const vt = document.documentElement.classList.contains('vt');
  if (!vt) requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('ready')));
  else document.body.classList.add('ready');
  addEventListener('pageshow', e => {
    if (e.persisted) { document.body.classList.remove('leaving', 'go-forward', 'go-back'); document.body.classList.add('ready'); }
  });
  let navigating = false;
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    if (a.getAttribute('href') === '#') { e.preventDefault(); return; }
    const url = new URL(a.href, location.href);
    if (url.protocol !== location.protocol || url.host !== location.host) return;
    if (url.pathname === location.pathname) return; // in-page anchor: CSS smooth scroll
    const dir = depth(url.pathname) < depth(location.pathname) ? 'back' : 'forward';
    sessionStorage.setItem('genai-nav-dir', dir);
    openSheet(false);
    if (vt) return; // the browser runs the view transition
    e.preventDefault();
    if (navigating) return;
    navigating = true;
    document.body.classList.add('leaving', 'go-' + dir);
    setTimeout(() => { location.href = url.href; }, 180);
  });

  // drag the mobile sheet down to dismiss it, like an iOS sheet
  let dragY = null, dragStart = 0;
  side.addEventListener('touchstart', e => {
    if (!side.classList.contains('open') || side.scrollTop > 0) return;
    dragY = dragStart = e.touches[0].clientY;
  }, { passive: true });
  side.addEventListener('touchmove', e => {
    if (dragY === null) return;
    dragY = e.touches[0].clientY;
    const d = Math.max(0, dragY - dragStart);
    if (d > 0) { side.classList.add('dragging'); side.style.setProperty('--drag', d + 'px'); }
  }, { passive: true });
  side.addEventListener('touchend', () => {
    if (dragY === null) return;
    const d = dragY - dragStart;
    side.classList.remove('dragging'); side.style.removeProperty('--drag');
    if (d > 110) openSheet(false);
    dragY = null;
  });

  // ---------- scroll effects ----------
  const prog = nav.querySelector('#read-progress');
  const topBtn = document.createElement('button');
  topBtn.className = 'top-btn'; topBtn.setAttribute('aria-label', 'Back to top'); topBtn.innerHTML = svg.up;
  document.body.appendChild(topBtn);
  topBtn.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
  let ticking = false;
  function onScroll() {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    const big = document.querySelector('.hero h1, .l-hero h1');
    nav.classList.toggle('scrolled', big ? big.getBoundingClientRect().bottom < 60 : y > 70);
    prog.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`;
    topBtn.classList.toggle('on', y > 900);
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // reveal on scroll
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    en.target.querySelectorAll('.bar .fl[data-w]').forEach(b => b.style.width = b.dataset.w);
    io.unobserve(en.target);
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
  function watch(sel) {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = Math.min(i % 4, 3) * 50 + 'ms';
      io.observe(el);
    });
  }

  // ---------- home page ----------
  const real = COURSE.filter(c => !c.soon);
  function updateHome() {
    const ring = document.getElementById('ring');
    if (!ring) return;
    const d = real.filter(c => done.includes(c.id)).length, pct = real.length ? Math.round(d / real.length * 100) : 0;
    ring.style.strokeDashoffset = 163.4 * (1 - pct / 100);
    document.getElementById('pct').textContent = pct + '%';
    document.getElementById('n-lessons').textContent = real.length;
    document.getElementById('n-done').textContent = d;
    const nextUp = real.find(c => !done.includes(c.id)) || real[real.length - 1];
    const cta = document.getElementById('cta');
    if (cta && nextUp) { cta.href = root + nextUp.file; cta.querySelector('span').textContent = (done.length ? 'Continue: ' : 'Start: ') + (nextUp.stage === 0 ? '' : nextUp.num + ' ') + nextUp.title; }
  }
  const cards = document.getElementById('lesson-cards');
  if (cards) {
    cards.innerHTML = COURSE.map(c => `<a class="lcard ${c.soon ? 'soon' : ''}" data-stage="${c.stage}" href="${c.soon ? '#' : root + c.file}">
      <span class="n">${c.stage === 0 ? 'Preview' : 'Lesson ' + c.num}</span><span class="t">${c.title}</span><span class="d">${c.desc}</span>
      <span class="f"><span>${c.soon ? 'Coming next' : '~' + c.mins + ' min'}</span>${done.includes(c.id) ? '<span class="ok">✓ Done</span>' : ''}</span></a>`).join('');
  }
  updateHome();

  // ---------- lesson page ----------
  if (lesson) {
    // table of contents + scrollspy
    const secs = [...document.querySelectorAll('.sec[id]')];
    const toc = document.getElementById('toc');
    if (toc && secs.length) {
      toc.innerHTML = `<summary>On this page<span class="muted" style="font-weight:500">· ${secs.length} sections</span><span class="c"></span></summary><ol>` +
        secs.map(s => { const h = s.querySelector('h2'); const n = h.querySelector('.n')?.textContent || '•';
          const t = h.cloneNode(true); t.querySelector('.n')?.remove(); t.querySelector('.tag-extra')?.remove();
          return `<li><a href="#${s.id}"><span>${n}</span>${t.textContent.trim()}</a></li>`; }).join('') + '</ol>';
      if (innerWidth > 640) toc.open = true;
      const links = [...toc.querySelectorAll('a')];
      const spy = new IntersectionObserver(es => es.forEach(en => {
        if (en.isIntersecting) links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + en.target.id));
      }), { rootMargin: '-30% 0px -60% 0px' });
      secs.forEach(s => spy.observe(s));
    }
    // done toggle
    const t = document.getElementById('done-toggle');
    if (t) {
      t.checked = done.includes(lesson.id);
      const msg = document.getElementById('done-msg');
      const setMsg = () => msg.textContent = t.checked ? 'Nice. Marked as completed.' : 'Finished reading and tried the code? Mark it done.';
      setMsg();
      t.addEventListener('change', () => {
        done = t.checked ? [...new Set([...done, lesson.id])] : done.filter(x => x !== lesson.id);
        localStorage.setItem(KEY, JSON.stringify(done));
        buildSide(q.value); setMsg();
      });
    }
    // prev / next
    const pager = document.getElementById('pager');
    if (pager) {
      const i = COURSE.indexOf(lesson), prev = COURSE[i - 1], next = COURSE[i + 1];
      pager.innerHTML =
        (prev ? `<a href="${root + prev.file}"><small>← Previous</small><b>${prev.num} ${prev.title}</b></a>` : `<a href="${root}index.html"><small>← Back</small><b>Overview</b></a>`) +
        (next ? `<a class="nx ${next.soon ? 'soon' : ''}" href="${next.soon ? '#' : root + next.file}"><small>${next.soon ? 'Coming next' : 'Next →'}</small><b>${next.num} ${next.title}</b></a>` : '');
    }
  }

  // temperature tabs
  document.querySelectorAll('[data-temps]').forEach(box => {
    const sets = JSON.parse(box.dataset.temps);
    const fills = box.querySelectorAll('.fl'), pcs = box.querySelectorAll('.pc');
    box.querySelectorAll('.tabs button').forEach(b => b.addEventListener('click', () => {
      box.querySelectorAll('.tabs button').forEach(x => x.classList.toggle('on', x === b));
      sets[b.dataset.t].forEach((p, i) => { fills[i].style.width = (p * 100) + '%'; fills[i].dataset.w = (p * 100) + '%'; pcs[i].textContent = p.toFixed(3); });
    }));
  });

  // copy buttons
  document.querySelectorAll('.copy').forEach(b => b.addEventListener('click', async () => {
    const code = b.closest('.code').querySelector('pre code').innerText;
    try { await navigator.clipboard.writeText(code); } catch (_) {
      const ta = document.createElement('textarea'); ta.value = code; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    b.textContent = 'Copied'; b.classList.add('ok');
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) b.animate([{ scale: '.7' }, { scale: '1.08', offset: .5 }, { scale: '1' }], { duration: 520, easing: 'cubic-bezier(.3,1.6,.5,1)' });
    setTimeout(() => { b.textContent = 'Copy'; b.classList.remove('ok'); }, 1400);
  }));

  nav.querySelector('#print-btn').onclick = () => {
    document.querySelectorAll('details').forEach(d => d.open = true);
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    document.querySelectorAll('.bar .fl[data-w]').forEach(b => b.style.width = b.dataset.w);
    print();
  };

  watch('.sec, .recap, .done-bar, .pager, .tile, .lcard, .content > .list, .term');

  // ---------- springs: panels open with a slow, soft bounce ----------
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  const BOUNCE = 'linear(0,.04,.143,.285,.445,.606,.756,.886,.991,1.069,1.122,1.152,1.163,1.158,1.143,1.12,1.095,1.068,1.043,1.022,1.004,.99,.981,.976,.974,.974,.976,.98,.984,.988,.992,.996,.999,1.001,1.003,1.004,1.004,1.003,1.002,1.001,1)';
  const SETTLE = 'linear(0,.048,.166,.32,.483,.637,.772,.882,.965,1.023,1.06,1.078,1.084,1.079,1.07,1.057,1.043,1.03,1.019,1.01,1.003,.998,.995,.993,.993,.993,.994,.995,.996,.997,.998,.999,1)';
  function popIn(el, origin) {
    if (still.matches) return;
    el.style.transformOrigin = origin;
    el.animate([{ opacity: 0, scale: '.82' }, { opacity: 1, offset: .3 }, { opacity: 1, scale: '1' }], { duration: 760, easing: BOUNCE });
  }
  function popOut(el) {
    if (still.matches) { el.hidden = true; return; }
    el.animate([{ opacity: 1, scale: '1' }, { opacity: 0, scale: '.92' }], { duration: 170, easing: 'ease-in' }).onfinish = () => { el.hidden = true; };
  }

  // Exercises and the contents box. Chrome keeps a closed <details> laid out, so a CSS
  // animation on [open] only ever runs once. Animating the height here runs every time.
  document.querySelectorAll('details.disc, details.toc').forEach(d => {
    const sum = d.querySelector('summary');
    sum.addEventListener('click', e => {
      if (still.matches) return;
      e.preventDefault();
      const opening = !d.open || d.dataset.closing;
      const from = d.offsetHeight;
      d.anim?.cancel(); delete d.dataset.closing;
      d.style.overflow = 'hidden';
      if (opening) {
        [...d.children].forEach(c => c.getAnimations().forEach(a => a.cancel()));
        d.open = true;
        const to = d.offsetHeight;
        d.anim = d.animate({ height: [from + 'px', to + 'px'] }, { duration: 900, easing: BOUNCE });
        [...d.children].filter(c => c !== sum).forEach(c =>
          c.animate([{ opacity: 0, translate: '0 -10px', scale: '.97', filter: 'blur(3px)' }, { opacity: 1, translate: '0 0', scale: '1', filter: 'blur(0)' }], { duration: 620, easing: SETTLE }));
        sum.animate([{ scale: '1' }, { scale: '1.012' }, { scale: '1' }], { duration: 520, easing: SETTLE });
      } else {
        d.open = false; const to = d.offsetHeight; d.open = true;
        d.dataset.closing = '1';
        d.anim = d.animate({ height: [from + 'px', to + 'px'] }, { duration: 560, easing: SETTLE });
        [...d.children].filter(c => c !== sum).forEach(c => c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: 'forwards' }));
      }
      d.anim.onfinish = () => {
        if (d.dataset.closing) { d.open = false; delete d.dataset.closing; [...d.children].forEach(c => c.getAnimations().forEach(a => a.cancel())); }
        d.style.overflow = ''; d.anim = null;
      };
    });
  });

  // ---------- contents menu in the nav bar (lesson pages) ----------
  const tocEl = document.getElementById('toc');
  if (lesson && tocEl && tocEl.querySelector('ol')) {
    const btn = document.createElement('button');
    btn.className = 'nav-btn'; btn.id = 'contents-btn'; btn.type = 'button'; btn.title = 'On this page';
    btn.setAttribute('aria-label', 'On this page'); btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'nav-menu');
    btn.innerHTML = svg.list;
    nav.querySelector('.small-title').before(btn);
    const menu = document.createElement('nav');
    menu.className = 'nav-menu'; menu.id = 'nav-menu'; menu.hidden = true; menu.setAttribute('aria-label', 'On this page');
    menu.innerHTML = '<b>On this page</b>' + tocEl.querySelector('ol').outerHTML;
    document.body.appendChild(menu);
    const toggle = open => {
      if (open === !menu.hidden && !menu.getAnimations().length) return;
      btn.setAttribute('aria-expanded', open);
      if (!open) { popOut(menu); return; }
      menu.getAnimations().forEach(a => a.cancel());
      menu.querySelectorAll('a').forEach(a => a.classList.toggle('on', !!tocEl.querySelector(`a.on[href="${a.getAttribute('href')}"]`)));
      menu.hidden = false;
      const r = btn.getBoundingClientRect(), nb = nav.getBoundingClientRect();
      const left = Math.max(8, Math.min(r.left - 6, innerWidth - menu.offsetWidth - 8));
      menu.style.top = nb.bottom + 8 + 'px'; menu.style.left = left + 'px';
      popIn(menu, `${r.left + r.width / 2 - left}px 0`);
      if (glassOn()) materialise(menu, 560);
      menu.querySelector('a.on')?.scrollIntoView({ block: 'nearest' });
    };
    btn.addEventListener('click', () => toggle(menu.hidden));
    menu.addEventListener('click', e => { if (e.target.closest('a')) toggle(false); });
    document.addEventListener('pointerdown', e => { if (!menu.hidden && !menu.contains(e.target) && !btn.contains(e.target)) toggle(false); });
    addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { toggle(false); btn.focus(); } });
    addEventListener('resize', () => { if (!menu.hidden) toggle(false); });
  }

  // progress: how many lessons are done, plus export / import of everything this site saves
  const stp = panel.querySelector('#st-progress');
  const showProgress = () => {
    let d = []; try { d = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (_) {}
    const real_ = COURSE.filter(c => !c.soon);
    stp.querySelector('.st-count').textContent = `${real_.filter(c => d.includes(c.id)).length} of ${real_.length} lessons marked done`;
  };
  stp.innerHTML = `<p class="st-now st-count"></p><div class="io-row"><button class="copy" type="button" id="st-exp">Export progress</button>
    <label class="copy" tabindex="0">Import<input type="file" accept="application/json" id="st-imp" hidden></label></div>`;
  stp.querySelector('#st-exp').onclick = () => {
    const data = {};
    Object.keys(localStorage).filter(k => k.startsWith('genai-')).forEach(k => data[k] = localStorage.getItem(k));
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 1)], { type: 'application/json' }));
    a.download = 'genai-course-progress.json'; a.click();
  };
  stp.querySelector('#st-imp').onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      Object.entries(data).forEach(([k, v]) => { if (k.startsWith('genai-')) localStorage.setItem(k, v); });
      location.reload();
    } catch (_) { alert('That file is not a progress export.'); }
  };
  // ---------- settings: opens from the gear in the nav bar or from the sidebar ----------
  const setBtn = nav.querySelector('#settings-btn');
  function toggleSettings(open, from) {
    if (open === !panel.hidden) return;
    setBtn.setAttribute('aria-expanded', open);
    if (!open) { popOut(panel); return; }
    panel.getAnimations().forEach(a => a.cancel());
    panel.hidden = false;
    placeThumb(); showLook(); showProgress();
    if (innerWidth > 640) {
      const side_ = from && from !== setBtn;
      const r = (from || setBtn).getBoundingClientRect(), nb = nav.getBoundingClientRect();
      const left = side_ ? r.right + 10 : Math.max(8, Math.min(r.right - panel.offsetWidth, innerWidth - panel.offsetWidth - 8));
      panel.style.left = left + 'px';
      panel.style.top = (side_ ? Math.max(8, innerHeight - panel.offsetHeight - 16) : nb.bottom + 8) + 'px';
      popIn(panel, side_ ? '0 100%' : `${r.left + r.width / 2 - left}px 0`);
    } else { panel.style.top = panel.style.left = ''; popIn(panel, '50% 100%'); }
    if (glassOn()) materialise(panel, 600);
    if (!still.matches) [...panel.children].forEach((c, i) => c.animate([{ opacity: 0, translate: '0 12px' }, { opacity: 1, translate: '0 0' }],
      { duration: 560, delay: 40 + i * 50, easing: SETTLE, fill: 'backwards' }));
  }
  setBtn.addEventListener('click', () => toggleSettings(panel.hidden));
  side.querySelector('#side-settings').addEventListener('click', e => {
    const desk = innerWidth > 1000;
    if (!desk) openSheet(false);
    toggleSettings(panel.hidden, desk ? e.currentTarget : null);
  });
  document.addEventListener('pointerdown', e => { if (!panel.hidden && !panel.contains(e.target) && !e.target.closest('#settings-btn, #side-settings')) toggleSettings(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { toggleSettings(false); setBtn.focus(); } });

  // ---------- tap a word: glossary terms in lessons show their definition ----------
  if (lesson) {
    const tag = document.createElement('script');
    tag.src = root + 'assets/terms.js';
    tag.onload = () => linkTerms(typeof TERMS !== 'undefined' ? TERMS : []);
    document.head.appendChild(tag);
  }
  // too common to underline every lesson; they stay in the glossary
  const PLAIN = new Set(['Context', 'Training', 'Inference', 'Decoding', 'Sampling', 'Streaming', 'Retrieval', 'Decode (phase)',
    'Attention', 'Parameters', 'Stateless', 'Token', 'Generative AI', 'Machine learning', 'Artificial intelligence', 'Test set (eval set)']);
  function linkTerms(terms) {
    const esc = t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const alts = [];   // [text, term index]
    terms.forEach(([name], i) => {
      if (PLAIN.has(name)) return;
      const acr = name.match(/\(([A-Z][A-Za-z]{1,5})\)/);
      const base = name.replace(/\s*\(.*?\)/g, '');
      base.split(' / ').concat(acr ? [acr[1]] : []).forEach(t => { if (t.trim().length > 2) alts.push([t.trim(), i]); });
    });
    alts.sort((a, b) => b[0].length - a[0].length);
    const left = new Set(alts.map(a => a[1]));
    const skip = 'code, pre, a, h1, h2, h3, h4, summary, button, svg, .tag, .code, .def-word, .chip, .kbd';
    const walker = document.createTreeWalker(document.querySelector('.content') || document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (n.parentElement.closest('.sec') && !n.parentElement.closest(skip) && n.data.trim().length > 2) ? 1 : 2 });
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    const regex = () => {
      const live = alts.filter(a => left.has(a[1]));
      return live.length ? new RegExp('\\b(' + live.map(a => esc(a[0])).join('|') + ')(s|es)?\\b', 'i') : null;
    };
    let re = regex();
    for (let node of nodes) {
      while (re && node) {
        const m = re.exec(node.data);
        if (!m) break;
        const hit = alts.find(a => left.has(a[1]) && a[0].toLowerCase() === m[1].toLowerCase());
        // short all-caps names (LLM, RAG, MoE) only match in the same case
        // short names in capitals (LLM, RAG, MoE) only match in the same case
        if (!hit || (!/\s/.test(hit[0]) && /[A-Z].*[A-Z]/.test(hit[0]) && m[1] !== hit[0])) { node = node.splitText(m.index + m[0].length); continue; }
        const word = node.splitText(m.index);
        const rest = word.splitText(m[0].length);
        const span = document.createElement('span');
        span.className = 'def-word'; span.tabIndex = 0; span.setAttribute('role', 'button'); span.dataset.i = hit[1];
        span.textContent = word.data; word.replaceWith(span);
        left.delete(hit[1]); re = regex(); node = rest;
      }
    }
  }
  const tip = document.createElement('div');
  tip.className = 'def-tip'; tip.hidden = true; tip.setAttribute('role', 'dialog'); tip.setAttribute('aria-live', 'polite');
  document.body.appendChild(tip);
  let tipFor = null, tipY = 0;
  function showTip(w) {
    const [name, def, id] = TERMS[w.dataset.i];
    const c = COURSE.find(x => x.id === id);
    const from = c && c.id !== lesson.id ? `<a href="${root + c.file}">${c.stage === 0 ? 'From the preview' : 'From lesson ' + c.num} →</a>` : `<a href="${root}glossary.html">All terms →</a>`;
    tip.innerHTML = `<b>${name}</b><span>${def}</span>${from}`;
    tip.setAttribute('aria-label', name);
    tipFor?.classList.remove('on'); tipFor = w; w.classList.add('on');
    tip.getAnimations().forEach(a => a.cancel());
    tip.hidden = false;
    const r = w.getBoundingClientRect(), h = tip.offsetHeight, wd = tip.offsetWidth;
    const below = r.bottom + 10 + h < innerHeight - 90;
    const left = Math.max(8, Math.min(r.left + r.width / 2 - wd / 2, innerWidth - wd - 8));
    tip.style.left = left + 'px';
    tip.style.top = (below ? r.bottom + 10 : r.top - 10 - h) + 'px';
    popIn(tip, `${r.left + r.width / 2 - left}px ${below ? 0 : h}px`);
    if (glassOn()) materialise(tip, 520);
    tipY = scrollY;
  }
  function hideTip() { if (tip.hidden) return; tipFor?.classList.remove('on'); tipFor = null; popOut(tip); }
  document.addEventListener('click', e => {
    const w = e.target.closest('.def-word');
    if (w) { w === tipFor ? hideTip() : showTip(w); return; }
    if (!tip.contains(e.target)) hideTip();
  });
  document.addEventListener('keydown', e => {
    const w = e.target.closest?.('.def-word');
    if (w && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); w === tipFor ? hideTip() : showTip(w); }
    if (e.key === 'Escape' && tipFor) { const t = tipFor; hideTip(); t.focus(); }
  });
  addEventListener('scroll', () => { if (tipFor && Math.abs(scrollY - tipY) > 60) hideTip(); }, { passive: true });

  // ---------- Liquid Glass extras (only visible in the Glass theme) ----------
  // 1. Refraction. An SVG displacement map bends whatever is behind a glass
  //    control, strongest at the edges like a real lens. Chromium applies it via
  //    backdrop-filter: url(#...); other browsers keep the plain blur.
  const lensMap = 'data:image/svg+xml,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="x" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#f00"/><stop offset=".22" stop-color="#800000"/><stop offset=".78" stop-color="#800000"/><stop offset="1" stop-color="#000"/></linearGradient>
        <linearGradient id="y" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#0f0"/><stop offset=".3" stop-color="#008000"/><stop offset=".7" stop-color="#008000"/><stop offset="1" stop-color="#000"/></linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#x)"/><rect width="100" height="100" fill="url(#y)" style="mix-blend-mode:screen"/>
    </svg>`);
  const lens = (id, scale, blur) => `
    <filter id="${id}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feImage href="${lensMap}" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="${blur}" result="soft"/>
      <feDisplacementMap in="soft" in2="map" scale="${scale}" xChannelSelector="R" yChannelSelector="G" result="bent"/>
      <feColorMatrix in="bent" type="saturate" values="1.5"/>
    </filter>`;
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  defs.setAttribute('width', '0'); defs.setAttribute('height', '0'); defs.setAttribute('aria-hidden', 'true');
  defs.style.position = 'absolute';
  defs.innerHTML = lens('lg-lens', 48, 0.8) + lens('lg-lens-soft', 30, 2);
  document.body.appendChild(defs);

  // 1b. "Look 1" (picked in the glass lab): every glass piece gets its own lens, drawn
  //     for its exact size and rounded shape. In an 18px band at the rim the backdrop is
  //     pulled inward, strongest right at the edge (a convex profile), so corners bend
  //     diagonally like a drop of water. Red, green and blue bend by slightly different
  //     amounts for a faint colour split.
  const LENS = { scale: 34, bezel: 18, chroma: 0.03, soft: 0.3 };
  const lensSel = '.settings, .navbar, .sidebar, .tabbar, .top-btn, .toc, .nav-menu, .def-tip, .pager a, .gl-search, .gl-filter button';
  const glassOn = () => document.documentElement.classList.contains('glass');
  function shapeMap(w, h, r) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const ctx = c.getContext('2d'), img = ctx.createImageData(w, h), d = img.data;
    const hx = w / 2, hy = h / 2, b = Math.min(LENS.bezel, Math.min(w, h) * .28); r = Math.min(r, hx, hy);  // thin bars get a thin rim
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const px = x + .5 - hx, py = y + .5 - hy;
      const qx = Math.abs(px) - (hx - r), qy = Math.abs(py) - (hy - r);
      let dist, nx = 0, ny = 0;               // dist: how far inside the shape; n: outward direction
      if (qx > 0 && qy > 0) { const l = Math.hypot(qx, qy); dist = r - l; nx = qx / l; ny = qy / l; }
      else if (qx > qy) { dist = r - qx; nx = 1; } else { dist = r - qy; ny = 1; }
      let m = 0;
      if (dist < b) { const t = 1 - Math.max(dist, 0) / b; m = 1 - Math.sqrt(1 - t * t); }
      const i = (y * w + x) * 4;
      d[i] = 128 - Math.sign(px || 1) * nx * m * 127; d[i + 1] = 128 - Math.sign(py || 1) * ny * m * 127;
      d[i + 2] = 128; d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    return c.toDataURL();
  }
  let lensCount = 0;
  function buildLens(el, amount = 1) {
    const w = Math.round(el.offsetWidth), h = Math.round(el.offsetHeight);
    if (w < 2 || h < 2) return;
    const id = el.dataset.lens || (el.dataset.lens = 'lg-l' + (++lensCount));
    const r = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
    const s = LENS.scale * amount * Math.min(1, Math.min(w, h) / 64), k = LENS.chroma;  // and bend less
    const ch = (scale, row, name) => `<feDisplacementMap in="soft" in2="m" scale="${scale}" xChannelSelector="R" yChannelSelector="G" result="d${name}"/>
      <feColorMatrix in="d${name}" type="matrix" values="${row} 0 0 0 1 0" result="${name}"/>`;
    defs.querySelector('#' + id)?.remove();
    defs.insertAdjacentHTML('beforeend', `<filter id="${id}" x="0" y="0" width="${w}" height="${h}" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feImage href="${shapeMap(w, h, r)}" x="0" y="0" width="${w}" height="${h}" result="m"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="${LENS.soft}" result="soft"/>
      ${ch(s * (1 + k), '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0 ', 'r')}
      ${ch(s, '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0 ', 'g')}
      ${ch(s * (1 - k), '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0 ', 'b')}
      <feComposite in="r" in2="g" operator="arithmetic" k2="1" k3="1" result="rg"/>
      <feComposite in="rg" in2="b" operator="arithmetic" k2="1" k3="1"/></filter>`);
    el.style.setProperty('--lens', `url(#${id})`);
  }
  const lensDirty = new Set(); let lensRaf = 0;
  const lensRO = new ResizeObserver(entries => {
    entries.forEach(en => lensDirty.add(en.target));
    if (!lensRaf) lensRaf = requestAnimationFrame(() => {
      lensRaf = 0;
      if (glassOn()) lensDirty.forEach(el => buildLens(el));
      lensDirty.clear();
    });
  });
  function watchLenses() {
    document.querySelectorAll(lensSel).forEach(el => {
      if (el.dataset.lensWatched) { if (glassOn()) buildLens(el); return; }
      el.dataset.lensWatched = '1'; lensRO.observe(el);
    });
  }
  addEventListener('genai-theme', () => { if (glassOn()) watchLenses(); });

  // Materialise: glass forms by bending light more and more instead of fading in.
  function materialise(el, dur = 620) {
    if (!el || !glassOn() || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    buildLens(el, 0);
    el.classList.remove('lg-form'); void el.offsetWidth; el.classList.add('lg-form');
    el.addEventListener('animationend', () => el.classList.remove('lg-form'), { once: true });
    const t0 = performance.now();
    const ramp = now => {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      const f = defs.querySelector('#' + el.dataset.lens);
      if (f) f.querySelectorAll('feDisplacementMap').forEach((d, i) =>
        d.setAttribute('scale', (LENS.scale * [1 + LENS.chroma, 1, 1 - LENS.chroma][i] * e).toFixed(2)));
      if (k < 1) requestAnimationFrame(ramp);
    };
    requestAnimationFrame(ramp);
  }

  // 2. Specular highlights that follow the pointer, like light moving over glass.
  const shiny = () => document.querySelectorAll('html.glass .navbar, html.glass .gl-search, html.glass .gl-filter button, html.glass .top-btn, html.glass .tabbar, html.glass .seg, html.glass .search, html.glass .pager a, html.glass .toc, html.glass .sidebar, html.glass .glass-slider');
  let px = innerWidth * 0.3, py = -200, lightQueued = false;
  function moveLight() {
    lightQueued = false;
    shiny().forEach(el => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((px - r.left) / r.width * 100).toFixed(1) + '%');
      el.style.setProperty('--my', ((py - r.top) / r.height * 100).toFixed(1) + '%');
      // the bright arc on the rim turns to face the light
      el.style.setProperty('--ang', (Math.atan2(py - (r.top + r.height / 2), px - (r.left + r.width / 2)) * 180 / Math.PI + 55).toFixed(1) + 'deg');
    });
  }
  addEventListener('pointermove', e => {
    px = e.clientX; py = e.clientY;
    if (!lightQueued && document.documentElement.classList.contains('glass')) { lightQueued = true; requestAnimationFrame(moveLight); }
  }, { passive: true });
  addEventListener('scroll', () => {
    if (!lightQueued && document.documentElement.classList.contains('glass')) { lightQueued = true; requestAnimationFrame(moveLight); }
  }, { passive: true });

  // 3. Floating tab bar on lesson pages that minimises while you scroll down
  //    and grows back when you scroll up (iOS 26 tab bar behaviour).
  if (lesson) {
    const i = COURSE.indexOf(lesson), prev = COURSE[i - 1], next = COURSE[i + 1];
    const bar = document.createElement('nav');
    bar.className = 'tabbar'; bar.setAttribute('aria-label', 'Lesson navigation');
    bar.innerHTML =
      `<a class="tb" href="${prev ? root + prev.file : root + 'index.html'}" aria-label="Previous"><span class="ic">‹</span><span class="tl">${prev ? prev.num : 'Home'}</span></a>
       <a class="tb" href="#toc" aria-label="On this page"><span class="ic">☰</span><span class="tl">Contents</span></a>
       <button class="tb" type="button" aria-label="Back to top"><span class="ic">↑</span><span class="tl">Top</span></button>
       ${next && !next.soon ? `<a class="tb primary" href="${root + next.file}" aria-label="Next"><span class="tl">${next.num}</span><span class="ic">›</span></a>` : ''}`;
    document.body.appendChild(bar);
    bar.querySelector('button').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
    bar.querySelector('a[href="#toc"]').addEventListener('click', () => { const t = document.getElementById('toc'); if (t) t.open = true; });
    let lastY = scrollY;
    addEventListener('scroll', () => {
      const y = scrollY;
      if (Math.abs(y - lastY) > 6) { bar.classList.toggle('min', y > lastY && y > 300); lastY = y; }
    }, { passive: true });
  }

  // 4. The segmented control's thumb stretches while it slides, like a drop of liquid.
  seg.addEventListener('click', e => {
    if (!e.target.dataset.v) return;
    thumb.classList.remove('stretch'); void thumb.offsetWidth; thumb.classList.add('stretch');
  });
  thumb.addEventListener('animationend', () => thumb.classList.remove('stretch'));

  const isGlass = () => document.documentElement.classList.contains('glass');
  const calm = matchMedia('(prefers-reduced-motion: reduce)');

  // 5. Lenses for every glass piece (the tab bar exists by now), then materialise:
  //    the bars form one after another on the first page of a visit (not on every
  //    page change, motion on frequent actions gets tiring), and the contents menu
  //    forms each time it opens.
  watchLenses();
  if (isGlass() && !sessionStorage.getItem('genai-formed')) {
    sessionStorage.setItem('genai-formed', '1');
    ['.navbar', '.sidebar', '.tabbar'].forEach((sel, i) => setTimeout(() => materialise(document.querySelector(sel)), 60 + i * 110));
  }
  const tocBox = document.getElementById('toc');
  if (tocBox) tocBox.addEventListener('toggle', () => { if (tocBox.open) materialise(tocBox, 480); });

  // 6. Illuminate from within: a glow starts under the pointer and spreads through the glass.
  const glowSel = '.tabbar, .navbar .nav-btn, .top-btn, .pager a, .toc, .gl-filter button';
  document.addEventListener('pointerdown', e => {
    if (!isGlass() || calm.matches) return;
    const el = e.target.closest(glowSel);
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--gx', (e.clientX - r.left) + 'px');
    el.style.setProperty('--gy', (e.clientY - r.top) + 'px');
    el.classList.remove('lg-glow'); void el.offsetWidth; el.classList.add('lg-glow');
    setTimeout(() => el.classList.remove('lg-glow'), 950);
  });

  // 7. Adaptive glass: look at what is underneath each floating control. Over text the
  //    shadow deepens; over dark content (code blocks, the hero) it flips to dark glass.
  const floating = () => [...document.querySelectorAll('.tabbar, .top-btn.on, .navbar .nav-btn')];
  function bgUnder(node) {
    for (let n = node; n && n !== document.documentElement; n = n.parentElement) {
      const bg = getComputedStyle(n).backgroundColor;
      const c = bg.match(/[\d.]+/g);
      // color-mix() resolves to color(srgb r g b / a) with 0-1 channels, rgb() uses 0-255
      const unit = bg.startsWith('color(') ? 255 : 1;
      if (c && (bg.startsWith('rgb') || bg.startsWith('color(srgb')) && (c[3] === undefined || +c[3] > 0.5))
        return c.slice(0, 3).map(v => +v * unit);
      const img = getComputedStyle(n).backgroundImage;
      if (img && img.includes('gradient') && n.matches('.hero, .l-hero')) return [70, 70, 160];
    }
    return null;
  }
  let adaptQueued = false;
  function adapt() {
    adaptQueued = false;
    if (!isGlass()) return;
    floating().forEach(el => {
      const r = el.getBoundingClientRect();
      const hit = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2)
        .find(n => !el.contains(n) && !n.closest('.tabbar, .navbar, .top-btn, .scrim'));
      if (!hit) return;
      el.classList.toggle('over-text', !!hit.closest('p, li, td, th, pre, h1, h2, h3, .code, .point'));
      const rgb = bgUnder(hit);
      const lum = rgb ? (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255 : null;
      el.classList.toggle('on-dark', lum !== null && lum < 0.4);
      el.classList.toggle('on-light', lum !== null && lum > 0.75);
    });
  }
  const queueAdapt = () => { if (!adaptQueued) { adaptQueued = true; requestAnimationFrame(adapt); } };
  addEventListener('scroll', queueAdapt, { passive: true });
  addEventListener('resize', queueAdapt);
  setTimeout(queueAdapt, 400);

  // 8. Light that follows device tilt on phones, like the highlights on iOS.
  addEventListener('deviceorientation', e => {
    if (!isGlass() || e.gamma == null) return;
    px = innerWidth * (0.5 + Math.max(-45, Math.min(45, e.gamma)) / 90);
    py = innerHeight * (0.5 + Math.max(-45, Math.min(45, e.beta - 45)) / 90) - innerHeight * 0.6;
    if (!lightQueued) { lightQueued = true; requestAnimationFrame(moveLight); }
  });

  // 9. Water-smooth wheel scrolling with a rubber band at the ends (Glass theme only).
  //    Trackpads already scroll smoothly, so only notched mouse wheels are eased.
  const content = document.querySelector('.content');
  let target = scrollY, current = scrollY, gliding = false, overshoot = 0, releaseTimer = 0;
  const maxY = () => document.documentElement.scrollHeight - innerHeight;
  let lastSet = 0, lastT = 0;
  function stopGlide() { gliding = false; document.documentElement.style.scrollBehavior = ''; }
  function glide(now) {
    // someone else moved the page (keyboard, scrollbar, a link): let them win
    if (lastT && Math.abs(scrollY - lastSet) > 3) { stopGlide(); target = current = scrollY; return; }
    const dt = lastT ? Math.min(64, now - lastT) : 16.7;
    lastT = now;
    current += (target - current) * (1 - Math.pow(1 - 0.14, dt / 16.7));   // same feel at any frame rate
    if (Math.abs(target - current) < 0.5) current = target;
    scrollTo(0, current);
    lastSet = scrollY;
    if (current !== target) requestAnimationFrame(glide); else stopGlide();
  }
  addEventListener('wheel', e => {
    if (!isGlass() || calm.matches || e.ctrlKey || e.defaultPrevented) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    if (e.target.closest('.sidebar, pre, .tbl, textarea, input, select')) return;
    const step = e.deltaY * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? innerHeight : 1);
    const wheelLike = e.deltaMode !== 0 || Math.abs(e.deltaY) >= 50;
    const atTop = scrollY <= 0 && step < 0, atBottom = scrollY >= maxY() - 1 && step > 0;
    if (atTop || atBottom) {
      // rubber band: pull the content a little past the edge, then spring back
      overshoot = Math.max(-90, Math.min(90, overshoot - step * 0.18));
      content.classList.add('pulling');
      content.style.setProperty('--ob', overshoot.toFixed(1) + 'px');
      clearTimeout(releaseTimer);
      releaseTimer = setTimeout(() => {
        content.classList.remove('pulling'); overshoot = 0; content.style.setProperty('--ob', '0px');
      }, 120);
      return;
    }
    if (!wheelLike) return;
    e.preventDefault();
    if (!gliding) { target = current = scrollY; }
    target = Math.max(0, Math.min(maxY(), target + step));
    // CSS smooth scrolling would fight the per-frame scrollTo calls, so pause it while gliding
    if (!gliding) { gliding = true; lastT = 0; document.documentElement.style.scrollBehavior = 'auto'; requestAnimationFrame(glide); }
  }, { passive: false });
  addEventListener('scroll', () => { if (!gliding) target = current = scrollY; }, { passive: true });

  // ---------- scroll reveals (the motion itself is CSS scroll timelines) ----------
  // Section headings: each word gets its own span so the words can rise one after another.
  document.querySelectorAll('.sec > h2').forEach(h => {
    let i = 0;
    [...h.childNodes].forEach(n => {
      if (n.nodeType !== 3 || !n.data.trim()) return;
      // one wrapper, so a flex heading sees a single item and keeps normal word spacing
      const frag = document.createElement('span');
      frag.className = 'ws';
      n.data.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.append(part); return; }
        const w = document.createElement('span');
        w.className = 'w'; w.style.setProperty('--i', Math.min(i++, 10)); w.textContent = part;
        frag.append(w);
      });
      n.replaceWith(frag);
    });
  });
  // Diagrams: strokes are drawn in (pathLength 1 makes the dash maths the same for every
  // shape), filled shapes pop, labels fade. Dashed lines keep their dashes and just pop.
  document.querySelectorAll('.fig svg').forEach(svgEl => {
    let k = 0;
    svgEl.querySelectorAll('line, path, polyline, rect, circle, ellipse, polygon, text').forEach(el => {
      if (el.closest('defs, marker, clipPath, mask') || el.matches('.grow, .grow-x')) return;
      const cs = getComputedStyle(el), tag = el.tagName.toLowerCase();
      el.style.setProperty('--k', Math.min(k++, 16));
      const strokeOnly = cs.stroke !== 'none' && (tag === 'line' || cs.fill === 'none') && cs.strokeDasharray === 'none';
      if (tag === 'text') el.classList.add('fd');
      else if (strokeOnly && /^(line|path|polyline)$/.test(tag)) { el.setAttribute('pathLength', '1'); el.classList.add('dr'); }
      else el.classList.add('pp');
    });
  });
})();
