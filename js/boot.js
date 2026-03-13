/* OffSecDiary — boot.js */

/* ---- Red matrix rain ---- */
(function () {
  const canvas = document.getElementById('boot-matrix');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = '01アイウエオカキクケコサシスセソ<>[]{}|#@!%&ABCDEF';
  const fs    = 13;
  let cols    = Math.floor(canvas.width / fs);
  const drops = Array.from({ length: cols }, () => Math.random() * (canvas.height / fs));

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    cols = Math.floor(canvas.width / fs);
    while (drops.length < cols) drops.push(1);

    ctx.font = `${fs}px 'Share Tech Mono', monospace`;

    for (let i = 0; i < cols; i++) {
      const char   = chars[Math.floor(Math.random() * chars.length)];
      const bright = Math.random() > 0.92;
      ctx.fillStyle = bright ? '#cc2222' : (Math.random() > 0.5 ? '#7a1010' : '#3d0808');
      ctx.fillText(char, i * fs, drops[i] * fs);
      if (drops[i] * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  setInterval(draw, 55);
})();

/* ---- Boot sequence ---- */
(function () {
  const phases = [
    { text: 'BIOMETRIC SCAN INITIATED',            progress: 12 },
    { text: 'BIOMETRIC HASH VERIFIED',             progress: 28 },
    { text: 'LOADING NEURAL MODELS',               progress: 46 },
    { text: 'INTEGRITY VERIFICATION: HEARTKING',   progress: 62 },
    { text: 'SYSTEM INTEGRITY VERIFIED',           progress: 80 },
    { text: 'SYSTEM ARCHITECT: MR_SPICE',            progress: 92 },
  ];

  const screen      = document.getElementById('boot-screen');
  const statusLine  = document.getElementById('statusLine');
  const barFill     = document.getElementById('statusBarFill');
  const progCircle  = document.getElementById('progCircle');
  const progressTxt = document.getElementById('progressText');
  const phaseTxt    = document.getElementById('phaseText');

  /* SVG circumference for r=100: 2π×100 ≈ 628.3 */
  const CIRCUMFERENCE = 628.3;

  const cores       = navigator.hardwareConcurrency || 4;
  const speedFactor = Math.max(0.7, Math.min(1.3, cores / 8));
  const typeSpeed   = 10 / speedFactor;

  let phaseIdx = 0;
  let charIdx  = 0;

  function setProgress(p) {
    const progCircle = document.getElementById('progCircle');
    if (progCircle) {
      const offset = CIRCUMFERENCE - (p / 100) * CIRCUMFERENCE;
      progCircle.style.strokeDashoffset = offset;
    }
    progressTxt.textContent = p + '%';
    barFill.style.width     = p + '%';
  }

  function typePhase() {
    if (phaseIdx >= phases.length) {
      finalizeBoot();
      return;
    }

    const phase = phases[phaseIdx];
    phaseTxt.textContent = 'PROCESSING';

    if (charIdx < phase.text.length) {
      statusLine.textContent += phase.text[charIdx++];
      setTimeout(typePhase, typeSpeed + Math.random() * 20);
    } else {
      setTimeout(() => {
        statusLine.textContent = '';
        charIdx = 0;
        setProgress(phase.progress);
        phaseIdx++;
        setTimeout(typePhase, 80);
      }, 80);
    }
  }

  function finalizeBoot() {
    phaseTxt.textContent   = 'ACCESS GRANTED';
    statusLine.textContent = 'STATUS: SECURE — REDIRECTING';
    setProgress(100);

    setTimeout(() => screen.classList.add('fade-out'), 300);

    setTimeout(() => {
      const welcome = document.getElementById('welcome-screen');
      welcome.classList.add('active');
    }, 500);

    setTimeout(() => {
      window.location.href = 'home.html';
    }, 2000);
  }

  /* ---- Telemetry ---- */
  setInterval(() => {
    const cpu = document.getElementById('cpu');
    const mem = document.getElementById('mem');
    const lat = document.getElementById('lat');
    if (cpu) cpu.textContent = (40 + Math.random() * 6).toFixed(1);
    if (mem) mem.textContent = Math.floor(54 + Math.random() * 12);
    if (lat) lat.textContent = Math.floor(7 + Math.random() * 8);
  }, 900);

  /* ---- Start ---- */
  setTimeout(() => {
    screen.classList.add('visible');
    typePhase();
  }, 200);
})();