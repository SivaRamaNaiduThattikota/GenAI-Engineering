// Runs in <head> before first paint: theme, transition direction, view-transition opt-in.
(function () {
  var h = document.documentElement;
  var v = localStorage.getItem('genai-notes-theme') || 'auto';
  var dark = v === 'dark' || (v === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  h.dataset.theme = dark ? 'dark' : 'light';
  h.classList.add('js');

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
