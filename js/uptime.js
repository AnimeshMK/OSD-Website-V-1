(function () {
  // Create shared session start ONCE
  if (!sessionStorage.getItem("sessionStart")) {
    sessionStorage.setItem("sessionStart", Date.now().toString());
  }

  const start = Number(sessionStorage.getItem("sessionStart"));
  const uptimeEl = document.getElementById("sys-uptime");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function format(ms) {
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }

  function update() {
    if (!uptimeEl) return;
    uptimeEl.textContent = format(Date.now() - start);
  }

  update();
  setInterval(update, 1000);
})();
