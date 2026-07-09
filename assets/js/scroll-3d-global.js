/**
 * ==========================================================================
 * A.N CAPITAL — LUXURY FINANCIAL DIGITAL PRESENCE
 * Elegant Clean Scroll & Interactive Hover Engine
 * ==========================================================================
 * Cleaned for maximum readability and silkiness:
 * - Ultra-smooth subtle fade-in reveal (no harsh 3D flipping/tilting on scroll)
 * - Gentle luxury card shimmer on hover
 */

document.addEventListener('DOMContentLoaded', () => {
  initCleanScrollReveal();
  initSubtleCardHover();
});

/**
 * 1. Clean, Natural Scroll Reveal
 */
function initCleanScrollReveal() {
  const targets = document.querySelectorAll(
    '.service-card, .glass-panel, section > div > h2'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('clean-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  targets.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      el.classList.add('clean-revealed');
    } else {
      el.classList.add('clean-hidden');
      el.style.transitionDelay = `${(index % 3) * 60}ms`;
      observer.observe(el);
    }
  });
}

/**
 * 2. Subtle Card Hover Glow (No jarring 3D tilt)
 */
function initSubtleCardHover() {
  const cards = document.querySelectorAll('.service-card, .glass-panel');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
      card.style.boxShadow = '0 16px 40px rgba(0,0,0,0.65), 0 0 25px rgba(212, 175, 55, 0.22)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '';
    });
  });
}
