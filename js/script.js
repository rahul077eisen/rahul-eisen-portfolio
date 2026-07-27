// =========================================================
// RAHUL EISEN — PORTFOLIO — SCRIPT
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Footer year ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Mobile nav toggle ----
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-open');
      navLinks.classList.toggle('is-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('is-open');
        navLinks.classList.remove('is-open');
      });
    });
  }

  // ---- Sticky navbar shadow on scroll ----
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 12) {
        navbar.style.boxShadow = '0 4px 0 0 rgba(17,17,17,0.15)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Custom cursor dot (desktop only) ----
  const cursorDot = document.getElementById('cursorDot');
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (cursorDot && isFinePointer) {
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });

    const interactiveEls = document.querySelectorAll('a, button, input, textarea');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => cursorDot.style.background = 'var(--coral)');
      el.addEventListener('mouseleave', () => cursorDot.style.background = 'var(--coral-soft)');
    });
  }

  // ---- Testimonial carousel ----
  const track = document.getElementById('testiTrack');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');

  if (track && prevBtn && nextBtn) {
    const scrollByCard = (dir) => {
      const card = track.querySelector('.testi-card');
      if (!card) return;
      const gap = 28;
      const distance = card.getBoundingClientRect().width + gap;
      track.scrollBy({ left: dir * distance, behavior: 'smooth' });
    };
    prevBtn.addEventListener('click', () => scrollByCard(-1));
    nextBtn.addEventListener('click', () => scrollByCard(1));
  }

  // ---- Contact form (static demo — no backend wired up) ----
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form && formNote) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formNote.textContent = "Thanks! This is a static form — connect it to an email service (e.g. Formspree) to receive real messages.";
      formNote.classList.add('success');
      form.reset();
    });
  }

  // ---- Scroll-reveal on section elements ----
  const revealTargets = document.querySelectorAll(
    '.about__grid, .experience__layout, .work-card, .timeline__item, .testi-card'
  );

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      io.observe(el);
    });
  }

});
