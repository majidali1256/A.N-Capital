/**
 * ==========================================================================
 * A.N CAPITAL — LUXURY FINANCIAL DIGITAL PRESENCE
 * Global Minimal 3D Modern Scroll & Tilt Engine
 * ==========================================================================
 * Provides consistent, ultra-premium 3D scrolling animations across all pages:
 * 1. Scroll-Driven 3D Perspective Reveal on sections and cards
 * 2. Dynamic 3D Camera Parallax connection to existing Three.js canvases
 * 3. Interactive Luxury 3D Mouse Tilt on glassmorphic cards
 */

document.addEventListener('DOMContentLoaded', () => {
  initScroll3DReveal();
  initGlobal3DCardTilt();
  initScrollParallaxConnect();
});

/**
 * 1. Minimal 3D Scroll-Driven Perspective Reveal
 */
function initScroll3DReveal() {
  const targets = document.querySelectorAll(
    '.service-card, .glass-panel, section > div > h2, section > div > h1, article'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-3d-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  targets.forEach((el, index) => {
    // Avoid double animating items already visible on initial load
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      el.classList.add('scroll-3d-revealed');
    } else {
      el.classList.add('scroll-3d-hidden');
      el.style.transitionDelay = `${(index % 3) * 80}ms`;
      observer.observe(el);
    }
  });
}

/**
 * 2. Interactive Luxury 3D Mouse Card Tilt
 */
function initGlobal3DCardTilt() {
  const cards = document.querySelectorAll('.service-card, .glass-panel');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top;  // y position within element

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate subtle tilt angle (-6 to +6 degrees)
      const rotateX = ((y - centerY) / centerY) * -5.5;
      const rotateY = ((x - centerX) / centerX) * 5.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/**
 * 3. Dynamic Scroll Parallax Connection
 */
function initScrollParallaxConnect() {
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const deltaY = scrollY - lastScrollY;
    lastScrollY = scrollY;

    // Apply subtle scroll-based vertical offset to WebGL/Three containers
    const canvases = document.querySelectorAll('#threejs-hero-container, #threejs-services-container, #threejs-about-hero, #threejs-services-header');
    canvases.forEach((canvas, idx) => {
      const factor = idx % 2 === 0 ? 0.08 : -0.06;
      canvas.style.transform = `translate3d(0, ${(scrollY * factor).toFixed(1)}px, 0)`;
    });
  }, { passive: true });
}
