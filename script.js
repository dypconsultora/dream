/* =========================================================
   DREAM MARKETING DIGITAL — Scripts
   Bilingüe ES/EN · Scrollspy · Fade-in · Form
   ========================================================= */

/* ---------- Cambio de idioma ES / EN ---------- */
function setLang(lang, btn){
  // Botones activos
  document.querySelectorAll('.lang-switch button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Actualiza atributo del <html>
  document.documentElement.lang = lang;

  // Reemplaza textos con data-es / data-en
  document.querySelectorAll('[data-es]').forEach(el => {
    const txt = el.getAttribute('data-' + lang);
    if (txt !== null) el.textContent = txt;
  });

  // Placeholders (inputs / textareas)
  document.querySelectorAll('input[data-placeholder-es], textarea[data-placeholder-es]').forEach(el => {
    const p = el.getAttribute('data-placeholder-' + lang);
    if (p !== null) el.placeholder = p;
  });
}

/* ---------- Scrollspy: resalta el link del menú ---------- */
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id], header[id]');
  const scroll = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector('.nav-menu a[href="#' + id + '"]');

    if (link) {
      if (scroll >= top && scroll < top + height) {
        document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

/* ---------- Fade-in al hacer scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.service-card, .process-step, .why-item, .case, .test, .stat, .pillar, .faq-item, .channel'
).forEach(el => {
  el.classList.add('reveal');
  io.observe(el);
});

/* ---------- Formulario de contacto ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const nombre = (data.get('nombre') || '').toString().trim();
    const empresa = (data.get('empresa') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const telefono = (data.get('telefono') || '').toString().trim();
    const servicio = (data.get('servicio') || '').toString().trim();
    const mensaje = (data.get('mensaje') || '').toString().trim();

    // Arma mensaje de WhatsApp con los datos del formulario
    const texto =
      'Hola Dream Marketing Digital, te escribo desde la web.%0A%0A' +
      '*Nombre:* ' + encodeURIComponent(nombre) + '%0A' +
      (empresa ? '*Empresa:* ' + encodeURIComponent(empresa) + '%0A' : '') +
      '*Email:* ' + encodeURIComponent(email) + '%0A' +
      (telefono ? '*Teléfono:* ' + encodeURIComponent(telefono) + '%0A' : '') +
      (servicio ? '*Servicio:* ' + encodeURIComponent(servicio) + '%0A' : '') +
      (mensaje ? '%0A' + encodeURIComponent(mensaje) : '');

    // Abre WhatsApp con el mensaje prellenado
    window.open('https://wa.me/5491100000000?text=' + texto, '_blank');

    // Mensaje de éxito visual
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const original = btn.textContent;
      btn.textContent = '✓ ¡Gracias! Te contactamos a la brevedad.';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 3500);
    }
  });
});

/* ---------- Menú activo al cargar ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash || '#hero';
  const link = document.querySelector('.nav-menu a[href="' + hash + '"]');
  if (link) {
    document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
  }
});

/* ---------- Animación de entrada del hero (GSAP) ---------- */
if (typeof gsap !== 'undefined') {
  const mmHero = gsap.matchMedia();
  mmHero.add({
    reduce: '(prefers-reduced-motion: reduce)',
    motion: '(prefers-reduced-motion: no-preference)'
  }, (ctx) => {
    const reduce = ctx.conditions.reduce;
    gsap.from('.hero-tag, .hero h1 span, .hero-lead, .hero-ctas', {
      y: reduce ? 0 : 30,
      autoAlpha: 0,
      duration: reduce ? 0.001 : 0.9,
      ease: 'power3.out',
      stagger: reduce ? 0 : 0.12,
      delay: 0.1
    });
  });
}
