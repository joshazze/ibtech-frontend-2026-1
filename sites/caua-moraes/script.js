/* 1. TOGGLE DE TEMA */
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

function setTheme(theme) {
  htmlElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) { setTheme(savedTheme); } 
else if (systemPrefersDark) { setTheme('dark'); }

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

/* 2. MENU MOBILE */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navItems = navLinks.querySelectorAll('a');

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  const isActive = navLinks.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isActive);
});

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && e.target !== hamburger) {
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
  }
});

/* 3. COPIAR E-MAIL */
const btnCopy = document.getElementById('btn-copy');
const copyFeedback = document.getElementById('copy-feedback');
const emailToCopy = "ocauamoraes@gmail.com";

btnCopy.addEventListener('click', () => {
  const tempInput = document.createElement("input");
  tempInput.value = emailToCopy;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  copyFeedback.style.display = 'inline-block';
  setTimeout(() => { copyFeedback.style.display = 'none'; }, 2000);
});

/* 4. INTERSECTION OBSERVER */
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); }
  });
}, { root: null, rootMargin: '0px', threshold: 0.15 });

document.querySelectorAll('.fade-section').forEach(el => sectionObserver.observe(el));

/* 5. C4 EASTER EGG (Integração Keypad DOM) */
const avatarTrigger = document.getElementById('avatar-trigger');
const c4Overlay = document.getElementById('c4-overlay');
const c4TimerDisplay = document.getElementById('c4-timer');
const c4Input = document.getElementById('c4-input');
const c4Status = document.getElementById('c4-status');
const c4LedLight = document.getElementById('c4-led-light');
const keypadKeys = document.querySelectorAll('.c4-key');

let cliques = 0;
let bombaPlantada = false;
let tempoRestante = 10.00;
let intervaloTimer;
let ledPiscando;
const CODIGO_DESARME = "7355608";

avatarTrigger.addEventListener('click', function() {
  if (bombaPlantada) return; 
  cliques++;
  if (cliques >= 5) { plantarBomba(); }
  setTimeout(() => { if(!bombaPlantada) cliques = 0; }, 3000);
});

function plantarBomba() {
  bombaPlantada = true;
  tempoRestante = 10.00;
  c4Overlay.style.display = 'flex';
  c4Input.value = '';
  c4Status.innerText = 'Bomb has been planted.';
  
  c4TimerDisplay.style.color = '#ff3333';
  c4TimerDisplay.style.textShadow = '0 0 10px rgba(255, 51, 51, 0.8)';
  
  let ledOn = false;
  ledPiscando = setInterval(() => {
    ledOn = !ledOn;
    if(ledOn) c4LedLight.classList.add('active');
    else c4LedLight.classList.remove('active');
  }, 500); 
  
  intervaloTimer = setInterval(() => {
    tempoRestante -= 0.01;
    if (tempoRestante <= 0) {
      tempoRestante = 0;
      explodirBomba();
    }
    c4TimerDisplay.innerText = tempoRestante.toFixed(2);
    
    if (tempoRestante < 3.00) {
        c4LedLight.classList.add('active');
    }
  }, 10);
}

keypadKeys.forEach(key => {
  key.addEventListener('click', () => {
    if (!bombaPlantada) return;
    const valorTecla = key.innerText;
    
    if (c4Input.value.length < 7) {
      c4Input.value += valorTecla; 
      if (c4Input.value === CODIGO_DESARME) {
        desarmarBomba();
      }
    }
  });
});

document.addEventListener('keydown', (e) => {
    if (!bombaPlantada) return;
    if (e.key >= '0' && e.key <= '9') {
        if (c4Input.value.length < 7) {
            c4Input.value += e.key;
            if (c4Input.value === CODIGO_DESARME) {
                desarmarBomba();
            }
        }
    }
});

function desarmarBomba() {
  clearInterval(intervaloTimer);
  clearInterval(ledPiscando);
  bombaPlantada = false;
  cliques = 0;
  
  c4LedLight.classList.remove('active');
  c4TimerDisplay.style.color = '#92b02e';
  c4TimerDisplay.style.textShadow = '0 0 5px rgba(146, 176, 46, 0.5)';
  c4Status.innerText = 'Bomb defused. Counter-Terrorists Win.';
  c4Status.style.color = '#92b02e';
  c4Input.value = "DEFUSED";

  setTimeout(() => {
    c4Overlay.style.display = 'none';
    c4Status.style.color = '#888';
  }, 3000);
}

function explodirBomba() {
  clearInterval(intervaloTimer);
  clearInterval(ledPiscando);
  bombaPlantada = false;
  cliques = 0;

  c4TimerDisplay.innerText = '0.00';
  c4Status.innerText = 'Terrorists Win.';
  
  c4Overlay.classList.add('flashbang');
  c4Overlay.innerHTML = ''; 

  setTimeout(() => { location.reload(); }, 2500);
}