// Runs in <head> before first paint: theme, transition direction, view-transition opt-in.
(function () {
  var h = document.documentElement;
  var v = localStorage.getItem('genai-notes-theme') || 'auto';
  // 'glass' (Liquid Glass) comes in light and dark too: genai-glass-mode is auto, light or dark
  var gm = localStorage.getItem('genai-glass-mode') || 'auto';
  var sys = matchMedia('(prefers-color-scheme: dark)').matches;
  var dark = v === 'dark' || (v === 'auto' && sys) || (v === 'glass' && (gm === 'dark' || (gm === 'auto' && sys)));
  h.dataset.theme = dark ? 'dark' : 'light';
  h.classList.add('js');

  // Custom lightness. genai-light (light mode) and genai-dark (dark mode) go from 0 to 100;
  // 100 is Apple's standard (iOS light: #F2F2F7 page, white cards; iOS dark: true black, #1C1C1E cards).
  // genai-glass-body sets how see-through the glass content panels are.
  window.genaiLook = function () {
    var dk = h.dataset.theme === 'dark', s = h.style;
    var t = +(localStorage.getItem(dk ? 'genai-dark' : 'genai-light') || 100) / 100;
    var P = dk
      ? { bg: [[42, 42, 42], [0, 0, 0]], card: [[58, 58, 60], [28, 28, 30]], card2: [[64, 64, 66], [35, 35, 37]], code: [[34, 34, 36], [18, 18, 20]] }
      : { bg: [[208, 208, 214], [242, 242, 247]], card: [[232, 232, 236], [255, 255, 255]], card2: [[226, 226, 231], [251, 251, 253]], code: [[222, 222, 228], [247, 247, 250]] };
    var hex = function (c) { return '#' + c.map(function (x) { return (x < 16 ? '0' : '') + x.toString(16); }).join('').toUpperCase(); };
    var o = {};
    for (var k in P) o[k] = P[k][0].map(function (x, i) { return Math.round(x + (P[k][1][i] - x) * t); });
    s.setProperty('--bg', hex(o.bg)); s.setProperty('--card', hex(o.card));
    s.setProperty('--card2', hex(o.card2)); s.setProperty('--code-bg', hex(o.code));
    s.setProperty('--card-rgb', o.card.join(','));
    var gb = localStorage.getItem('genai-glass-body');
    s.setProperty('--gc', ((gb === null ? (dk ? 60 : 40) : +gb) / 100).toFixed(2));
    return { bg: hex(o.bg), card: hex(o.card) };
  };
  window.genaiLook();
  if (v === 'glass') h.classList.add('glass');
  if (localStorage.getItem('genai-side-collapsed') === '1') h.classList.add('side-collapsed');
  var tint = localStorage.getItem('genai-glass-tint-l1');
  if (tint !== null && !matchMedia('(prefers-contrast: more)').matches) h.style.setProperty('--tint', tint);

  var dir = sessionStorage.getItem('genai-nav-dir') || 'none';
  sessionStorage.removeItem('genai-nav-dir');
  h.dataset.dir = dir;

  // Cross-document view transitions only work over http(s). On file:// app.js
  // falls back to its own enter/leave animation.
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (/^https?:$/.test(location.protocol) && 'onpagereveal' in window && !reduce) {
    h.classList.add('vt');
    var s = document.createElement('style');
    s.textContent = '@view-transition{navigation:auto}';
    document.head.appendChild(s);
    addEventListener('pagereveal', function (e) {
      if (!e.viewTransition) return;
      var t = dir === 'back' ? 'back' : 'forward';
      // browser back / forward buttons
      var act = window.navigation && navigation.activation;
      if (act && act.navigationType === 'traverse' && act.from) t = act.from.index > act.entry.index ? 'back' : 'forward';
      e.viewTransition.types.add(t);
    });
  }
})();
