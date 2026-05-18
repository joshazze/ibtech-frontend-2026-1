const pages = [
  document.getElementById('p1'),
  document.getElementById('p2'),
  document.getElementById('p3'),
  document.getElementById('p4'),
  document.getElementById('p5'),
  document.getElementById('p6'),
  document.getElementById('p7'),
  document.getElementById('p8'),
];

const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const dots    = document.querySelectorAll('.dot');

let current   = 0;
let animating = false;
const DURATION = 750;

// z-index inicial: p1 = topo (último no DOM = maior z natural, mas definimos explicitamente)
pages.forEach((p, i) => {
  p.style.zIndex = pages.length - i;
});

function goTo(next) {
  if (animating || next === current || next < 0 || next >= pages.length) return;
  animating = true;

  if (next > current) {
    // Virar para frente
    const page = pages[current];
    page.style.zIndex = pages.length + 1;
    page.classList.add('flipped');
    setTimeout(() => {
      page.style.zIndex = 0;
      current = next;
      animating = false;
      updateUI();
    }, DURATION);
  } else {
    // Voltar
    const page = pages[next];
    page.style.zIndex = pages.length + 1;
    page.classList.remove('flipped');
    setTimeout(() => {
      page.style.zIndex = pages.length - next;
      current = next;
      animating = false;
      updateUI();
    }, DURATION);
  }

  updateUI();
}

function updateUI() {
  btnPrev.disabled = current === 0;
  btnNext.disabled = current === pages.length - 1;
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

btnPrev.addEventListener('click', () => goTo(current - 1));
btnNext.addEventListener('click', () => goTo(current + 1));

// Swipe (trackpad macOS e mobile)
let touchStartX = 0;
const book = document.getElementById('book');

let wheelCooldown = false;
document.addEventListener('wheel', e => {
  if (wheelCooldown || animating) return;
  if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return; // ignora scroll vertical
  if (Math.abs(e.deltaX) < 30) return;                  // ignora micro-movimentos
  wheelCooldown = true;
  e.deltaX > 0 ? goTo(current + 1) : goTo(current - 1);
  setTimeout(() => { wheelCooldown = false; }, DURATION + 100);
}, { passive: true });

book.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

book.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) {
    dx < 0 ? goTo(current + 1) : goTo(current - 1);
  }
}, { passive: true });

updateUI();
