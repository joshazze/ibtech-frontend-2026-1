/* ============================================================
   LÓGICA JS - REQUISITOS IBTECH (TEMA, CÓPIA, SCROLL, EXTRA)
   ============================================================ */

// 1. TEMA CLARO/ESCURO (Requisito 4.3)
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Persistência (Requisito 86)
});

// 2. COPIAR E-MAIL COM FEEDBACK (Requisito 4.3)
const emailBtn = document.getElementById('emailBtn');
emailBtn.addEventListener('click', () => {
    const email = "felipe.medeiros@exemplo.com"; 
    navigator.clipboard.writeText(email).then(() => {
        const val = emailBtn.querySelector('.clink-val');
        const originalText = val.innerText;
        val.innerText = "Copiado! ✓";
        setTimeout(() => { val.innerText = originalText; }, 2000); // Feedback por 2s (Requisito 88)
    });
});

// 3. ANIMAÇÃO DE ENTRADA (Requisito 4.3 - IntersectionObserver)
const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if(e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target); // Dispara apenas uma vez (Requisito 121)
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

// 4. INTERAÇÃO EXTRA: TYPEWRITER (Requisito 4.4 / 96)
const text = "Ciência de Dados & Inteligência Artificial";
let i = 0;
function type() {
    if (i < text.length) {
        document.getElementById("typewriter").innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 100);
    }
}
window.onload = type;