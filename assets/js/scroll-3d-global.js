/**
 * ==========================================================================
 * A.N CAPITAL — LUXURY FINANCIAL DIGITAL PRESENCE
 * Framer Motion & UI UX Pro Max Animation Suite
 * ==========================================================================
 * Features implemented per ui-ux-pro-max guidelines:
 * - Framer Motion (`Motion.inView`, `Motion.stagger`, `Motion.spring`) for staggered card reveals
 * - UI Pro Max Magnetic Cursor Pull (`stiffness: 450, damping: 18`) on CTA buttons
 * - Interactive Mouse Spotlight coordinates tracking (--mouse-x, --mouse-y)
 */

document.addEventListener('DOMContentLoaded', () => {
  initFramerMotionReveals();
  initMagneticButtons();
  initCardSpotlightHover();
  initSmoothScrollParallax();
});

/**
 * 1. Framer Motion Spring Staggered Reveals (UI Pro Max Standard/Complex Tier)
 */
function initFramerMotionReveals() {
  const isFramerAvailable = typeof window.Motion !== 'undefined' && window.Motion.inView && window.Motion.animate;
  
  // If Framer Motion is loaded via CDN, use spring physics reveal
  if (isFramerAvailable) {
    const { inView, animate, stagger } = window.Motion;
    
    // Group animate sections or cards entering view
    const cardGroups = document.querySelectorAll('.grid, .space-y-36, main');
    cardGroups.forEach(group => {
      inView(group, ({ target }) => {
        const cards = target.querySelectorAll('.service-card, .glass-panel, .timeline-step-card');
        if (cards.length > 0) {
          animate(
            cards,
            { y: [38, 0], scale: [0.94, 1], opacity: [0, 1] },
            {
              delay: stagger(0.08),
              duration: 0.65,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)"
            }
          );
        }
      }, { margin: "-40px 0px -40px 0px" });
    });
    return;
  }

  // Graceful Fallback if offline/Framer not present: Native View-Timeline or IntersectionObserver
  const targets = document.querySelectorAll(
    '.service-card, .glass-panel, .timeline-step-card, section > div > h2'
  );

  const supportsNativeViewTimeline = CSS.supports && CSS.supports('(animation-timeline: view()) and (animation-range: entry)');
  if (supportsNativeViewTimeline) {
    targets.forEach(el => el.classList.add('clean-hidden'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('clean-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

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
 * 2. UI Pro Max Magnetic Button Physics (Framer Motion Elastic Snap)
 * When cursor enters button area, button smoothly pulls toward cursor (clamped * 0.28).
 * On leave, spring physics snap it back to (0,0).
 */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-primary-metallic, .btn-secondary-glass, .open-consultation-modal');
  const isFramerAvailable = typeof window.Motion !== 'undefined' && window.Motion.animate;

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Pull distance clamped to * 0.28 per UI Pro Max guidelines so it never leaves its hit box
      const deltaX = (e.clientX - centerX) * 0.28;
      const deltaY = (e.clientY - centerY) * 0.28;

      if (isFramerAvailable) {
        window.Motion.animate(btn, { x: deltaX, y: deltaY }, { type: "spring", stiffness: 350, damping: 20 });
      } else {
        btn.style.transform = `translate(${deltaX}px, ${deltaY - 2}px)`;
      }
    });

    btn.addEventListener('mouseleave', () => {
      if (isFramerAvailable) {
        window.Motion.animate(btn, { x: 0, y: 0 }, { type: "spring", stiffness: 450, damping: 18 });
      } else {
        btn.style.transform = 'translate(0px, 0px)';
      }
    });
  });
}

/**
 * 3. Top-Class Interactive Mouse Spotlight Tracking on Cards
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
 * 4. Subtle Parallax Depth on Scroll
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
          const offset = Math.sin(scrollY * 0.002 + idx) * 4.5;
          badge.style.transform = `translateY(${offset}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
