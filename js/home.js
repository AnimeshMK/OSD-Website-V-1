/* OffSecDiary — home.js */

/* ---- Red Matrix Rain ---- */
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = '01アイウエオカキクケコサシスセソ<>[]{}|#@!%&ABCDEF';
  const fs = 13;
  let cols = Math.floor(canvas.width / fs);
  const drops = Array.from({ length: cols }, () => Math.random() * (canvas.height / fs));

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    cols = Math.floor(canvas.width / fs);
    while (drops.length < cols) drops.push(1);

    ctx.font = `${fs}px 'Share Tech Mono', monospace`;

    for (let i = 0; i < cols; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const bright = Math.random() > 0.92;
      ctx.fillStyle = bright ? '#cc2222' : (Math.random() > 0.5 ? '#7a1010' : '#3d0808');
      ctx.fillText(char, i * fs, drops[i] * fs);
      if (drops[i] * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  setInterval(draw, 55);
})();

/* ---- Mobile nav ---- */
(function () {
  const burger = document.getElementById('burger');
  const links  = document.getElementById('navLinks');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
})();

/* ---- Scroll reveal ---- */
(function () {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => obs.observe(el));

  // Trigger hero items on load
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero [data-reveal]').forEach(el => {
      el.classList.add('visible');
    });
  });
})();