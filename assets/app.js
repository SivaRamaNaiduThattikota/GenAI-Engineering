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
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
    print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  };

  // ---------- shell: sidebar + navbar ----------
  const shell = document.querySelector('.shell');
  const main = shell.querySelector('.main');
  const side = document.createElement('aside');
  side.className = 'sidebar'; side.id = 'sidebar'; side.setAttribute('aria-label', 'Contents');
  side.innerHTML = `
    <a class="brand" href="${root}index.html"><span class="logo">AI</span><span><b>GenAI Engineering</b><small>Basics to production</small></span></a>
    <label class="search">${svg.search}<input id="q" type="search" placeholder="Search lessons" autocomplete="off"></label>
    <div id="side-groups"></div><p class="side-empty" id="side-empty">No lessons match.</p>
    <div class="side-group" style="margin-top:20px"><h4>Appearance</h4></div>
    <div class="seg" id="theme-seg"><span class="thumb"></span><button data-v="auto">Auto</button><button data-v="light">Light</button><button data-v="dark">Dark</button><button data-v="glass" title="Liquid Glass">Glass</button></div>
    <div class="glass-slider"><div class="gs-top"><span>Clear</span><span>Liquid Glass</span><span>Tinted</span></div>
      <input type="range" id="glass-tint" min="0" max="100" step="1" aria-label="Liquid Glass look, from clear to tinted">
      <div class="gs-cap">Follows your system light or dark mode.</div></div>
    <p class="side-foot">Progress is saved in this browser.<br>Ctrl / ⌘ + K to search.</p>`;
  shell.insertBefore(side, main);

  const nav = document.createElement('header');
  nav.className = 'navbar'; nav.id = 'navbar';
  const title = lesson ? `${lesson.num} ${lesson.title}` : (document.body.dataset.title || 'GenAI Engineering');
  nav.innerHTML = `
    <button class="nav-btn menu-btn" id="menu-btn" aria-label="Open contents">${svg.menu}</button>
    ${pageId !== 'home' ? `<a class="nav-btn" href="${root}index.html" aria-label="Home">${svg.home}</a>` : ''}
    <div class="small-title">${title}</div>
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

  // ---------- theme ----------
  const seg = side.querySelector('#theme-seg'), thumb = seg.querySelector('.thumb');
  const mq = matchMedia('(prefers-color-scheme: dark)');
  function applyTheme(v) {
    localStorage.setItem('genai-notes-theme', v);
    const dark = v === 'dark' || ((v === 'auto' || v === 'glass') && mq.matches);
    const h = document.documentElement;
    h.dataset.theme = dark ? 'dark' : 'light';
    h.classList.toggle('glass', v === 'glass');
    const btn = seg.querySelector(`button[data-v="${v}"]`) || seg.querySelector('button');
    thumb.style.left = '0';
    thumb.style.width = btn.offsetWidth + 'px';
    thumb.style.transform = `translateX(${btn.offsetLeft}px)`;
  }
  // iOS 27 style slider: from ultra-clear to fully tinted glass
  const tintInput = side.querySelector('#glass-tint');
  const savedTint = localStorage.getItem('genai-glass-tint');
  const defaultTint = matchMedia('(prefers-reduced-transparency: reduce)').matches ? 0.7 : 0.35;
  tintInput.value = Math.round((savedTint === null ? defaultTint : +savedTint) * 100);
  tintInput.addEventListener('input', () => {
    const t = (tintInput.value / 100).toFixed(2);
    document.documentElement.style.setProperty('--tint', t);
    localStorage.setItem('genai-glass-tint', t);
  });
  seg.addEventListener('click', e => { if (e.target.dataset.v) applyTheme(e.target.dataset.v); });
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
    setTimeout(() => { b.textContent = 'Copy'; b.classList.remove('ok'); }, 1400);
  }));

  nav.querySelector('#print-btn').onclick = () => {
    document.querySelectorAll('details').forEach(d => d.open = true);
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    document.querySelectorAll('.bar .fl[data-w]').forEach(b => b.style.width = b.dataset.w);
    print();
  };

  watch('.sec, .recap, .done-bar, .pager, .tile, .lcard, .content > .list, .term');

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

  // 2. Specular highlights that follow the pointer, like light moving over glass.
  const shiny = () => document.querySelectorAll('html.glass .nav-btn, html.glass .top-btn, html.glass .tabbar, html.glass .seg, html.glass .search, html.glass .pager a, html.glass .toc, html.glass .sidebar, html.glass .glass-slider');
  let px = innerWidth * 0.3, py = -200, lightQueued = false;
  function moveLight() {
    lightQueued = false;
    shiny().forEach(el => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((px - r.left) / r.width * 100).toFixed(1) + '%');
      el.style.setProperty('--my', ((py - r.top) / r.height * 100).toFixed(1) + '%');
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

  // 5. Materialise: the tab bar grows in as a lens, and its refraction ramps up with it.
  const tabbar = document.querySelector('.tabbar');
  if (tabbar && isGlass() && !calm.matches) {
    tabbar.classList.add('materialise');
    tabbar.addEventListener('animationend', () => tabbar.classList.remove('materialise'), { once: true });
    const disp = document.querySelector('#lg-lens feDisplacementMap');
    const t0 = performance.now(), full = +disp.getAttribute('scale');
    const ramp = now => {
      const k = Math.min(1, (now - t0) / 700);
      disp.setAttribute('scale', (full * (1 - Math.pow(1 - k, 3))).toFixed(1));
      if (k < 1) requestAnimationFrame(ramp);
    };
    disp.setAttribute('scale', '0'); requestAnimationFrame(ramp);
  }

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
})();
