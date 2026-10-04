/* =====================================================
   THE LAST COMMIT: script.js
   1. CONFIG  (edit this to change the event content)
   2. Render sections from CONFIG
   3. Behaviour: nav, reveal, counters, countdown,
      terminals, leaderboard, particles, easter egg
   ===================================================== */

/* ---------- 1. CONFIG ---------- */
const CONFIG = {
  eventDate: "2026-11-14T10:00:00+05:30", // change the hackathon date here
  stats: [[500, "+", "DEVELOPERS"], [24, "", "HOURS"], [10, "+", "CHALLENGES"], [1, "", "FINAL COMMIT"]],
  challenges: [
    ["01", "BUILD", "Turn an empty repo into a working product in 24 hours.", "</>"],
    ["02", "INNOVATE", "Find an idea nobody has shipped yet, then make it real.", "[*]"],
    ["03", "SOLVE", "Pick a real problem and fix it with code that works.", "{ }"],
    ["04", "DEPLOY", "Ship it live. A demo link beats a slide deck.", "^^^"]
  ],
  steps: [
    ["REGISTER", "Create your team of 1 to 4 and claim your branch."],
    ["RECEIVE THE BRIEF", "The challenge is revealed to everyone at the same moment."],
    ["BUILD", "Write the code. Mentors are on call all day."],
    ["TEST", "Break your own project before the judges do."],
    ["SUBMIT", "Push to your repo and send the link before the deadline."],
    ["FINAL COMMIT", "The repo locks. Demo to the judges."]
  ],
  schedule: [
    ["10:00 AM", "Opening Ceremony"], ["11:00 AM", "Challenge Reveal"], ["12:00 PM", "Hacking Begins"],
    ["06:00 PM", "Mentor Checkpoint"], ["10:00 PM", "Progress Review"], ["08:00 AM", "Final Testing (Day 2)"],
    ["10:00 AM", "Submission Deadline"], ["12:00 PM", "Final Commit"], ["02:00 PM", "Demo"], ["04:00 PM", "Winners"]
  ],
  rules: [
    ["Teams may contain 1 to 4 members.", "Solo hackers are welcome. You cannot change teams after the brief is revealed."],
    ["All code must be written during the hackathon.", "Start from an empty repository. Commit history is checked."],
    ["External libraries are allowed.", "Use any open-source library, framework or API. Credit it in your README."],
    ["Projects must solve the given challenge.", "Submissions that ignore the brief will not be scored."],
    ["Teams must submit before the deadline.", "Late submissions are not accepted. Push early and often."],
    ["Plagiarism results in disqualification.", "Copied projects are removed from the leaderboard."],
    ["Judges' decisions are final.", "Scores come from a panel using the published criteria."]
  ],
  prizes: [["🥈", "SECOND MERGE", "₹25,000"], ["🥇", "FIRST COMMIT", "₹50,000"], ["🥉", "THIRD PUSH", "₹10,000"]],
  special: ["BEST UI/UX", "BEST INNOVATION", "BEST TECHNICAL IMPLEMENTATION"],
  stack: [["</>", "HTML"], ["{ }", "CSS"], ["JS", "JavaScript"], ["Re", "React"], ["No", "Node.js"],
          ["Py", "Python"], ["Jv", "Java"], ["C++", "C++"], ["git", "Git"], ["GH", "GitHub"]],
  teams: [["NullPointers", 982], ["CodeBlooded", 941], ["SyntaxSquad", 917], ["RuntimeError", 884], ["ByteForce", 861]],
  faq: [
    ["What is The Last Commit?", "A 24-hour hackathon where teams build and deploy one project. When the timer ends, your last commit is what gets judged."],
    ["Who can participate?", "Students and developers of any level. You only need a laptop and curiosity."],
    ["How many members can be in a team?", "1 to 4 members."],
    ["Is the hackathon online or offline?", "Both. Join online from anywhere, or work from the Chennai hub."],
    ["What technologies can we use?", "Anything. Web, mobile, AI, games, hardware. Pick the stack you know best."],
    ["How will projects be judged?", "Innovation, technical depth, UI/UX, impact and demo quality."],
    ["What is the submission deadline?", "10:00 AM on day 2, two hours before the final commit."],
    ["Are beginners allowed?", "Yes. Mentors help beginners throughout, and there is a prize category for first-time hackers."]
  ]
};

/* ---------- helpers ---------- */
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const pad = (n) => String(n).padStart(2, "0");

/* ---------- 2. Render sections ---------- */
$("#stats").innerHTML = CONFIG.stats.map(([n, s, l]) =>
  `<div class="stat reveal"><b data-count="${n}" data-suffix="${s}">0</b><span>${l}</span></div>`).join("");

$("#challenge-grid").innerHTML = CONFIG.challenges.map(([n, t, d, i]) =>
  `<article class="card reveal"><span class="icon" aria-hidden="true">${i}</span><small>${n}</small><h3>${t}</h3><p>${d}</p></article>`).join("");

$("#steps").innerHTML = CONFIG.steps.map(([t, d], i) =>
  `<li data-n="${pad(i + 1)}"><h3>${t}</h3><p>${d}</p></li>`).join("");

$("#schedule").innerHTML = CONFIG.schedule.map(([t, e]) =>
  `<li class="reveal"><time>${t}</time><span>${e}</span></li>`).join("");

$("#rules-list").innerHTML = CONFIG.rules.map(([r, d], i) =>
  `<details class="reveal"><summary><b>${pad(i + 1)}</b>${r}</summary><p>${d}</p></details>`).join("");

$("#prize-grid").innerHTML = CONFIG.prizes.map(([e, t, a], i) =>
  `<div class="prize reveal ${i === 1 ? "first" : ""}"><em>${e}</em><h3>${t}</h3><strong>${a}</strong></div>`).join("");
$("#special").innerHTML = CONFIG.special.map((s) => `<span>${s}</span>`).join("");

$("#stack-grid").innerHTML = CONFIG.stack.map(([i, n]) =>
  `<div class="tech reveal"><b aria-hidden="true">${i}</b><span>${n}</span></div>`).join("");

$("#faq-list").innerHTML = CONFIG.faq.map(([q, a]) =>
  `<div class="faq-item reveal"><button aria-expanded="false">${q}<span aria-hidden="true">+</span></button><div class="faq-a"><div><p>${a}</p></div></div></div>`).join("");

/* ---------- 3a. Nav ---------- */
const nav = $("#nav"), burger = $(".burger"), menu = $("#menu");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 30), { passive: true });
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); }
});

/* ---------- 3b. FAQ accordion ---------- */
$("#faq-list").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const item = btn.parentElement, open = item.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
});

/* ---------- 3c. Scroll reveal + animated counters ---------- */
function animateCount(el) {
  const target = +el.dataset.count, suffix = el.dataset.suffix, start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / 1400, 1);
    el.textContent = pad(Math.round(target * (1 - Math.pow(1 - t, 3)))).replace(/^0(\d{2,})/, "$1") + suffix;
    if (t < 1) requestAnimationFrame(tick);
  };
  reduced ? (el.textContent = pad(target) + suffix) : requestAnimationFrame(tick);
}
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in");
    const c = en.target.querySelector("[data-count]");
    if (c) animateCount(c);
    io.unobserve(en.target);
  });
}, { threshold: 0.15 });
$$(".reveal, .steps li").forEach((el) => io.observe(el));

/* steps progress line follows scroll */
const stepsEl = $("#steps");
function stepsProgress() {
  const r = stepsEl.getBoundingClientRect();
  const p = (innerHeight * 0.6 - r.top) / r.height;
  stepsEl.style.setProperty("--p", Math.max(0, Math.min(1, p)));
}
addEventListener("scroll", stepsProgress, { passive: true });
stepsProgress();

/* ---------- 3d. Countdown ---------- */
const target = new Date(CONFIG.eventDate).getTime();
function updateCountdown() {
  const diff = target - Date.now();
  if (diff <= 0) {
    $("#countdown").className = "count done";
    $("#countdown").textContent = "THE COMMIT WINDOW IS OPEN.";
    $("#count-label").textContent = "STATUS";
    clearInterval(cdTimer);
    return;
  }
  $("#cd-d").textContent = pad(Math.floor(diff / 864e5));
  $("#cd-h").textContent = pad(Math.floor(diff / 36e5) % 24);
  $("#cd-m").textContent = pad(Math.floor(diff / 6e4) % 60);
  $("#cd-s").textContent = pad(Math.floor(diff / 1e3) % 60);
}
const cdTimer = setInterval(updateCountdown, 1000);
updateCountdown();

/* ---------- 3e. Typing helper + hero terminal ---------- */
async function typeInto(el, html, speed = 18) {
  // html may contain <span> tags; they are inserted whole, text is typed
  const parts = html.split(/(<[^>]+>)/).filter(Boolean);
  for (const p of parts) {
    if (p.startsWith("<")) { el.insertAdjacentHTML("beforeend", p); continue; }
    for (const ch of p) { el.insertAdjacentHTML("beforeend", ch === "<" ? "&lt;" : ch); if (!reduced) await sleep(speed); }
  }
}
async function runHeroTerminal() {
  const el = $("#hero-term");
  const lines = [
    `<span class="g">$</span> git status\n`,
    `branch: <span class="c">final-attempt</span>\n`,
    `commits remaining: <span class="g">01</span>\n`,
    `system_status: <span class="g">READY</span>\n`,
    `challenge: THE_LAST_COMMIT\n`,
    `deployment: <span class="p">PENDING</span>\n\n`,
    `<span class="g">$</span> git commit -m "ship it"\n`
  ];
  for (const l of lines) { await typeInto(el, l, 16); await sleep(reduced ? 0 : 250); }
  el.classList.add("cursor");
}

/* ---------- 3f. Interactive terminal ---------- */
const out = $("#term-out"), input = $("#term-input");
const commits = [];
const print = (html) => { out.insertAdjacentHTML("beforeend", html + "\n"); out.scrollTop = out.scrollHeight; };
const COMMANDS = {
  help: () => `Commands: <span class="c">whoami, git status, git branch, git log, git commit -m "msg", date, ls, clear</span>`,
  whoami: () => `<span class="g">hacker</span>`,
  "git status": () => `On branch <span class="c">final-attempt</span>\nEverything looks ready.`,
  "git branch": () => `  main\n* <span class="g">feature/final-commit</span>\n  experimental`,
  "git log": () => commits.length
    ? commits.map((c, i) => `<span class="p">${(Math.random() * 1e7 | 0).toString(16).padStart(7, "0")}</span> ${c}`).reverse().join("\n")
    : `<span class="p">a1b2c3d</span> Initial commit\n<span class="p">e4f5a6b</span> Add idea\nTip: make your own with git commit -m "msg"`,
  date: () => new Date().toString(),
  ls: () => `README.md  src/  package.json  <span class="p">final.js</span>`,
  clear: () => { out.innerHTML = ""; return null; },
  sudo: () => `<span class="r">Nice try. Guests cannot sudo.</span>`
};
function runCommand(raw) {
  const cmd = raw.trim().replace(/\s+/g, " ");
  if (!cmd) return;
  print(`<span class="g">$</span> ${cmd.replace(/</g, "&lt;")}`);
  const m = cmd.match(/^git commit -m ["']?(.+?)["']?$/);
  let res;
  if (m) {
    commits.push(m[1].replace(/</g, "&lt;"));
    res = `<span class="accepted">COMMIT SUCCESSFUL</span>`;
    if (m[1].toLowerCase().includes("the last commit")) toast("Commit accepted. See you on the leaderboard.");
  } else if (COMMANDS[cmd]) res = COMMANDS[cmd]();
  else if (cmd.startsWith("sudo")) res = COMMANDS.sudo();
  else res = `<span class="r">command not found:</span> ${cmd.replace(/</g, "&lt;")}. Type <span class="c">help</span>.`;
  if (res) print(res);
}
$("#term-form").addEventListener("submit", (e) => { e.preventDefault(); runCommand(input.value); input.value = ""; });
[["whoami", "whoami"], ["git status", "git status"], ["git branch", "git branch"], ["git log", "git log"],
 ['git commit -m "The Last Commit"', "commit"]].forEach(([cmd, label]) => {
  const b = document.createElement("button");
  b.textContent = label === cmd ? cmd : "git commit";
  b.addEventListener("click", () => runCommand(cmd));
  $("#quick").appendChild(b);
});
print(`Welcome, guest. Type <span class="c">help</span> to begin.`);

/* ---------- 3g. Leaderboard (fake live data) ---------- */
let teams = CONFIG.teams.map(([name, score]) => ({ name, score }));
function drawBoard(flashName) {
  teams.sort((a, b) => b.score - a.score);
  $("#board").innerHTML = teams.map((t, i) =>
    `<tr class="${t.name === flashName ? "flash" : ""}"><td>${pad(i + 1)}</td><td>${t.name}</td><td>${t.score}</td><td class="on">ONLINE</td></tr>`).join("");
}
drawBoard();
setInterval(() => {
  const t = teams[Math.floor(Math.random() * teams.length)];
  t.score += Math.floor(Math.random() * 12) + 1;
  drawBoard(t.name);
  setTimeout(() => $$("tbody tr.flash").forEach((r) => r.classList.remove("flash")), 700);
}, 3500);
setInterval(() => ($("#ping").textContent = 8 + Math.floor(Math.random() * 14)), 2500);

/* ---------- 3h. Final CTA: commit animation ---------- */
$("#commit-btn").addEventListener("click", async function () {
  this.disabled = true;
  const el = $("#cta-term");
  el.classList.add("show"); el.innerHTML = "";
  const lines = [`<span class="g">$</span> git add .\n`, `<span class="g">$</span> git commit -m "my last commit"\n`,
    `[final-attempt 7f3a9c2] my last commit\n`, `<span class="g">$</span> git push origin final-attempt\n`,
    `Writing objects: 100% done.\n`, `<span class="accepted">COMMIT ACCEPTED. Welcome to the arena.</span>\n`];
  for (const l of lines) { await typeInto(el, l, 14); await sleep(reduced ? 0 : 300); }
  toast("Registration opens soon. Add your real form link in script.js.");
  this.disabled = false;
});

/* ---------- 3i. Toast ---------- */
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toast.id); toast.id = setTimeout(() => t.classList.remove("show"), 3500);
}

/* ---------- 3j. Mouse glow ---------- */
const glow = $(".glow");
if (!reduced) addEventListener("mousemove", (e) => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; }, { passive: true });

/* ---------- 3k. Particle background ---------- */
const canvas = $("#bg"), ctx = canvas.getContext("2d");
let dots = [];
function sizeCanvas() {
  canvas.width = innerWidth; canvas.height = innerHeight;
  dots = Array.from({ length: Math.min(60, Math.floor(innerWidth / 22)) }, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35
  }));
}
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach((d, i) => {
    d.x = (d.x + d.vx + canvas.width) % canvas.width;
    d.y = (d.y + d.vy + canvas.height) % canvas.height;
    ctx.fillStyle = "rgba(57,255,136,.6)"; ctx.fillRect(d.x, d.y, 2, 2);
    for (let j = i + 1; j < dots.length; j++) {
      const dist = Math.hypot(d.x - dots[j].x, d.y - dots[j].y);
      if (dist < 120) {
        ctx.strokeStyle = `rgba(139,92,246,${0.25 * (1 - dist / 120)})`;
        ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(dots[j].x, dots[j].y); ctx.stroke();
      }
    }
  });
  if (!document.hidden) requestAnimationFrame(drawParticles);
}
sizeCanvas();
addEventListener("resize", sizeCanvas);
document.addEventListener("visibilitychange", () => !document.hidden && !reduced && drawParticles());
if (!reduced) drawParticles();

/* ---------- 3l. Easter egg: Konami code ---------- */
const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let pos = 0;
addEventListener("keydown", (e) => {
  pos = e.key === konami[pos] ? pos + 1 : (e.key === konami[0] ? 1 : 0);
  if (pos === konami.length) {
    pos = 0;
    document.body.classList.toggle("hacker");
    toast("Secret branch unlocked: origin/easter-egg");
  }
});
console.log("%cTHE LAST COMMIT", "color:#39ff88;font:700 20px monospace", "\nPsst. Try the Konami code.");

/* ---------- 3m. Page load ---------- */
(async function boot() {
  const lt = $("#loader-text");
  for (const l of ["> booting last-commit.os", "> loading challenge...", "> branch: final-attempt", "> READY"]) {
    lt.textContent += l + "\n"; if (!reduced) await sleep(280);
  }
  $("#loader").classList.add("hide");
  runHeroTerminal();
})();
