document.addEventListener("DOMContentLoaded", async () => {
  const output = document.getElementById("telemetryOutput");
  if (!output) return;

  // SESSION START
  let sessionStart = sessionStorage.getItem("sessionStart");
  if (!sessionStart) {
    sessionStart = Date.now().toString();
    sessionStorage.setItem("sessionStart", sessionStart);
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function formatUptime(ms) {
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }

  function getTime() {
    const d = new Date();
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${Math.floor(d.getMilliseconds() / 10)}`;
  }

  function getLatency() {
    return Math.floor(25 + Math.random() * 40);
  }

  /* ================================
     NETWORK / IP LOOKUP
  ================================= */
  let netInfo = {
    ip: "RESOLVING",
    city: "UNKNOWN",
    country: "UNKNOWN",
    isp: "UNKNOWN",
    asn: "N/A"
  };

  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    netInfo = {
      ip: data.ip || "UNKNOWN",
      city: data.city || "UNKNOWN",
      country: data.country_name || "UNKNOWN",
      isp: data.org || "UNKNOWN",
      asn: data.asn || "N/A"
    };
  } catch (e) {
    netInfo.ip = "BLOCKED";
  }

  function renderTelemetry() {
    const start = Number(sessionStart);

    const lines = [
      "USER TELEMETRY",
      "────────────────────────",
      `TIME            ${getTime()}`,
      `TIMEZONE        ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
      `SESSION_UPTIME  ${formatUptime(Date.now() - start)}`,
      `LANGUAGE        ${navigator.language}`,
      `PLATFORM        ${navigator.platform || "Unknown"}`,
      `CPU CORES       ${navigator.hardwareConcurrency || "N/A"}`,
      `MEMORY          ${navigator.deviceMemory ? navigator.deviceMemory + " GB" : "N/A"}`,
      `SCREEN          ${screen.width}x${screen.height}`,
      `CONNECTION      ${navigator.connection?.effectiveType || "unknown"}`,
      `LATENCY         ${getLatency()} ms`,
      "",
      "NETWORK PROFILE",
      "────────────────────────",
      `PUBLIC IP       ${netInfo.ip}`,
      `CITY            ${netInfo.city}`,
      `COUNTRY         ${netInfo.country}`,
      `ISP             ${netInfo.isp}`,
      `ASN             ${netInfo.asn}`,
      "",
      "STATUS          ACTIVE",
      "────────────────────────",
      "> telemetry synchronized"
    ];

    output.textContent = lines.join("\n");
  }

  renderTelemetry();
  setInterval(renderTelemetry, 1000);
});
