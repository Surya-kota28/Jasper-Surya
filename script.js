// Matrix rain background
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = "アイウエオカキクケコサシスセソタチツテトABCDEF0123456789";
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(10,14,10,0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff41";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 40);

window.addEventListener('resize', () => {
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
});

// Typing effect in terminal hero
const typedEl = document.getElementById('typed');
const phrases = [
  "cat mission_statement.txt",
  "nmap -sV target_career --scan",
  "./deploy_pipeline.sh --secure",
  "grep -r 'AI-driven threat detection' ."
];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1500);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

document.getElementById('year').textContent = new Date().getFullYear();

// Boot sequence
const bootLines = [
  "booting security kernel...",
  "loading modules: devops, infosec, ml...",
  "mounting /home/jasper...",
  "verifying credentials: eJPT [OK]",
  "establishing secure connection...",
  "welcome, root."
];
const bootEl = document.getElementById('boot-text');
const bootScreen = document.getElementById('boot-screen');
let bootLineIndex = 0;
let bootCharIndex = 0;

function bootType() {
  if (bootLineIndex >= bootLines.length) {
    setTimeout(() => {
      bootScreen.classList.add('hidden');
      setTimeout(() => bootScreen.remove(), 600);
    }, 300);
    return;
  }
  const line = bootLines[bootLineIndex];
  bootEl.textContent += line[bootCharIndex];
  bootCharIndex++;
  if (bootCharIndex === line.length) {
    bootEl.textContent += "\n";
    bootLineIndex++;
    bootCharIndex = 0;
    setTimeout(bootType, 150);
  } else {
    setTimeout(bootType, 18);
  }
}
bootType();

// Scroll progress bar
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + "%";
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Custom cursor
const cursor = document.getElementById('custom-cursor');
if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, input, textarea, .card, .cert-flip').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// Animated counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || "0");
    const suffix = el.dataset.suffix || "";
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = target * progress;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// Copy to clipboard
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.copy).then(() => {
      const original = btn.textContent;
      btn.textContent = 'copied!';
      setTimeout(() => btn.textContent = original, 1500);
    });
  });
});

// Command palette
const palette = document.getElementById('command-palette');
const paletteInput = document.getElementById('palette-input');
const paletteOutput = document.getElementById('palette-output');
const routes = {
  about: '#about', whoami: '#about',
  skills: '#skills', capabilities: '#skills',
  experience: '#experience',
  projects: '#projects', case_files: '#projects',
  certs: '#certs', credentials: '#certs',
  beyond: '#beyond',
  contact: '#contact', connect: '#contact'
};

function openPalette() {
  palette.classList.add('open');
  paletteInput.value = '';
  paletteOutput.textContent = 'type "help" for commands';
  setTimeout(() => paletteInput.focus(), 50);
}
function closePalette() { palette.classList.remove('open'); }

document.addEventListener('keydown', (e) => {
  if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    e.preventDefault();
    openPalette();
  }
  if (e.key === 'Escape') closePalette();
});
palette.addEventListener('click', (e) => { if (e.target === palette) closePalette(); });

paletteInput.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const raw = paletteInput.value.trim().toLowerCase();
  const parts = raw.split(/\s+/);
  const cmd = parts[0];
  const arg = parts.slice(1).join('_');

  if (raw === 'help') {
    paletteOutput.textContent = 'commands: goto [section], whoami, clear, help\nsections: about, skills, experience, projects, certs, beyond, contact';
  } else if (cmd === 'goto' && routes[arg]) {
    document.querySelector(routes[arg]).scrollIntoView({ behavior: 'smooth' });
    closePalette();
  } else if (routes[raw]) {
    document.querySelector(routes[raw]).scrollIntoView({ behavior: 'smooth' });
    closePalette();
  } else if (raw === 'whoami') {
    paletteOutput.textContent = 'Jasper Surya Chowdary Kota — DevOps & InfoSec Intern @ Cloverleaf';
  } else if (raw === 'clear') {
    paletteOutput.textContent = '';
  } else {
    paletteOutput.textContent = `command not found: ${raw}\ntype "help" for a list of commands`;
  }
});

// Interactive terminal in hero
const termLog = document.getElementById('terminal-log');
const termInput = document.getElementById('terminal-input');
const termCommands = {
  whoami: "Jasper Surya Chowdary Kota — DevOps & InfoSec Intern @ Cloverleaf",
  "ls skills/": "security/  devops-cicd/  cloud/  programming/  os-tools/  languages/",
  "cat contact.txt": "kotajy@mail.uc.edu | linkedin.com/in/jasper-surya-chowdary-kota9494 | github.com/Surya-kota28",
  help: "try: whoami, ls skills/, cat contact.txt, ls projects/, clear",
  "ls projects/": "malicious-url-classification.ieee  ucta-treasury-mgmt",
  sudo: "nice try. access denied.",
};
if (termInput) {
  termInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const raw = termInput.value.trim();
    const echoLine = document.createElement('div');
    echoLine.className = 'echo';
    echoLine.textContent = `root@security:~$ ${raw}`;
    termLog.appendChild(echoLine);

    if (raw.toLowerCase() === 'clear') {
      termLog.innerHTML = '';
    } else {
      const out = document.createElement('div');
      out.textContent = termCommands[raw.toLowerCase()] || `command not found: ${raw} (try "help")`;
      termLog.appendChild(out);
    }
    termInput.value = '';
    termLog.scrollTop = termLog.scrollHeight;
  });
}
