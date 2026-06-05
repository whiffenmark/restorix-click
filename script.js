/**
 * ============================================================
 * Restorix — script.js
 * Plain vanilla JS — no dependencies, no build step needed.
 * ============================================================
 */

(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ════════════════════════════════════════════════════════════
     Footer year — auto-updates so you never need to edit HTML
     ════════════════════════════════════════════════════════════ */
  const yearEl = $('#footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ════════════════════════════════════════════════════════════
     Mobile nav toggle
     ════════════════════════════════════════════════════════════ */
  const navToggle = $('#nav-toggle');
  const navMenu   = $('#nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      // Prevent body scroll while menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close nav when a link inside it is clicked
    $$('a', navMenu).forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close nav on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }


  /* ════════════════════════════════════════════════════════════
     Header scroll shadow
     ════════════════════════════════════════════════════════════ */
  const header = $('#site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }


  /* ════════════════════════════════════════════════════════════
     Active nav link highlight (scroll-based)
     ════════════════════════════════════════════════════════════ */
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link[href^="#"]');

  if (sections.length && navLinks.length) {
    const highlightNav = () => {
      const scrollY = window.scrollY + 100; // offset for header

      sections.forEach(section => {
        const top    = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
          const id = section.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();
  }


  /* ════════════════════════════════════════════════════════════
     FAQ accordion
     ════════════════════════════════════════════════════════════ */
  const faqItems = $$('.faq-item');

  faqItems.forEach(item => {
    const btn    = $('.faq-question', item);
    const answer = $('.faq-answer',   item);

    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other items (accordion behavior)
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('is-open');
          const otherBtn    = $('.faq-question', other);
          const otherAnswer = $('.faq-answer',   other);
          if (otherBtn)    otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current item
      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen);
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
    });
  });


  /* ════════════════════════════════════════════════════════════
     Contact form — placeholder handler
     (Wire up to Formspree / EmailJS / serverless before launch)
     ════════════════════════════════════════════════════════════ */
  const contactForm  = $('#contact-form');
  const formSuccess  = $('#form-success');
  const formError    = $('#form-error');
  const formSubmitBtn = $('#form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Hide any previous alerts
      if (formSuccess) formSuccess.hidden = true;
      if (formError)   formError.hidden   = true;

      // Basic validation — check required fields are filled
      const name    = $('#cf-name',    contactForm)?.value.trim();
      const email   = $('#cf-email',   contactForm)?.value.trim();
      const message = $('#cf-message', contactForm)?.value.trim();

      if (!name || !email || !message) {
        if (formError) formError.hidden = false;
        return;
      }

      // ── PLACEHOLDER: Replace the block below with your real form handler ──
      // Example using Formspree:
      //   const res = await fetch('https://formspree.io/f/YOUR_ID', {
      //     method: 'POST',
      //     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ name, email, message })
      //   });
      //   if (res.ok) { /* show success */ } else { /* show error */ }
      // ── END PLACEHOLDER ────────────────────────────────────────────────────

      // Simulate success for now (remove when real handler is wired up)
      if (formSubmitBtn) {
        formSubmitBtn.disabled = true;
        formSubmitBtn.textContent = 'Sending…';
      }

      setTimeout(() => {
        if (formSuccess) formSuccess.hidden = false;
        contactForm.reset();
        if (formSubmitBtn) {
          formSubmitBtn.disabled = false;
          formSubmitBtn.textContent = 'Send Message';
        }
        formSuccess?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 800);
    });
  }


  /* ════════════════════════════════════════════════════════════
     Scroll-reveal animation (IntersectionObserver)
     Cards and sections fade up on enter
     ════════════════════════════════════════════════════════════ */
  if ('IntersectionObserver' in window) {
    const revealTargets = $$(
      '.problem-card, .service-card, .step-card, .why-item, .hero-card, .faq-item, .local-examples'
    );

    revealTargets.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach(el => observer.observe(el));
  }

})();
