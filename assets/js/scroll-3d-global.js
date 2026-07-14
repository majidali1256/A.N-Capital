/**
 * ==========================================================================
 * A.N CAPITAL — LUXURY FINANCIAL DIGITAL PRESENCE
 * Top-Class Modern Animation & Scroll Engine
 * ==========================================================================
 * Features:
 * - Native CSS View-Timeline animations (with silky IntersectionObserver fallbacks)
 * - Interactive Mouse Spotlight coordinates tracking (--mouse-x, --mouse-y)
 * - Subtle Spring Parallax & luxury card elevation
 */

document.addEventListener('DOMContentLoaded', () => {
  initCleanScrollReveal();
  initCardSpotlightHover();
  initSmoothScrollParallax();
});

/**
 * 1. Clean, Natural Scroll Reveal with Progressive Enhancement
 */
function initCleanScrollReveal() {
  const targets = document.querySelectorAll(
    '.service-card, .glass-panel, .timeline-step-card, section > div > h2'
  );

  // If browser supports native CSS View Timelines (`(animation-timeline: view()) and (animation-range: entry)`),
  // CSS handles the high-performance GPU reveal automatically.
  const supportsNativeViewTimeline = CSS.supports && CSS.supports('(animation-timeline: view()) and (animation-range: entry)');
  if (supportsNativeViewTimeline) {
    targets.forEach(el => el.classList.add('clean-hidden'));
    return;
  }

  // Fallback: High-precision IntersectionObserver with cubic-bezier easing
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.12
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
    if (rect.top < window.innerHeight * 0.94) {
      el.classList.add('clean-revealed');
    } else {
      el.classList.add('clean-hidden');
      el.style.transitionDelay = `${(index % 3) * 75}ms`;
      observer.observe(el);
    }
  });
}

/**
 * 2. Top-Class Interactive Mouse Spotlight Tracking on Cards
 */
function initCardSpotlightHover() {
  const cards = document.querySelectorAll('.service-card, .glass-panel, .timeline-step-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * 3. Subtle Parallax Depth on Scroll
 */
function initSmoothScrollParallax() {
  const badges = document.querySelectorAll('.step-number-badge, .timeline-icon-glow');
  if (!badges.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        badges.forEach((badge, idx) => {
          const speed = (idx % 2 === 0) ? 0.04 : -0.03;
          const offset = Math.sin(scrollY * 0.002 + idx) * 4;
          badge.style.transform = `translateY(${offset}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
