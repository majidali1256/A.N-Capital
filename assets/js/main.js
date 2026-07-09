/**
 * ==========================================================================
 * A.N CAPITAL — LUXURY FINANCIAL DIGITAL PRESENCE
 * Core Application Logic, Interactive Navigation, Modals & Forms
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initActiveNavigation();
  initMobileDrawer();
  initConsultationModal();
  initForms();
  initSmoothScroll();
});

/**
 * 1. Sticky Header Enhancement
 */
function initStickyHeader() {
  const header = document.querySelector('header, nav');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-xl', 'border-b-primary/40');
      header.style.backgroundColor = 'rgba(19, 19, 19, 0.95)';
    } else {
      header.classList.remove('shadow-xl', 'border-b-primary/40');
      header.style.backgroundColor = '';
    }
  });
}

/**
 * 2. Active Navigation Highlighting
 */
function initActiveNavigation() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link, .mobile-nav-link');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * 3. Mobile Navigation Drawer
 */
function initMobileDrawer() {
  const toggleBtns = document.querySelectorAll('.mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const closeBtn = document.getElementById('close-mobile-drawer');

  if (!drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtns.forEach(btn => btn.addEventListener('click', openDrawer));
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Close when clicking a mobile link
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * 4. Global Confidential Consultation Modal
 */
function initConsultationModal() {
  // Inject modal markup if not already present
  if (!document.getElementById('consultation-modal')) {
    const modalHTML = `
      <div id="consultation-modal" class="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div class="modal-content glass-panel border border-primary/40 rounded-xl max-w-lg w-full p-8 relative shadow-[0_0_50px_rgba(212,175,55,0.25)]">
          <button id="close-consultation-modal" class="absolute top-5 right-5 text-on-surface-variant hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>
          
          <div class="flex items-center gap-2 mb-2">
            <span class="w-8 h-[2px] bg-primary"></span>
            <span class="text-primary font-label-caps uppercase tracking-widest text-xs">Private Advisory</span>
          </div>
          <h3 class="font-display text-2xl text-on-surface mb-2">Schedule Confidential Consultation</h3>
          <p class="text-sm text-on-surface-variant mb-6">
            Connect directly with an Executive Partner at A.N Capital to discuss your wealth structuring and portfolio goals.
          </p>

          <form id="modal-consultation-form" class="space-y-4">
            <div>
              <label class="block text-xs uppercase tracking-wider text-on-surface-variant mb-1">Full Name</label>
              <input type="text" required placeholder="Lord / Dr. / Mr. / Ms. Full Name"
                class="w-full bg-surface/80 border border-primary/30 rounded px-4 py-3 text-sm text-on-surface focus:border-primary focus:outline-none" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs uppercase tracking-wider text-on-surface-variant mb-1">Direct Phone</label>
                <input type="tel" required placeholder="+1 (555) 000-0000"
                  class="w-full bg-surface/80 border border-primary/30 rounded px-4 py-3 text-sm text-on-surface focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wider text-on-surface-variant mb-1">Corporate Email</label>
                <input type="email" required placeholder="client@enterprise.com"
                  class="w-full bg-surface/80 border border-primary/30 rounded px-4 py-3 text-sm text-on-surface focus:border-primary focus:outline-none" />
              </div>
            </div>

            <div>
              <label class="block text-xs uppercase tracking-wider text-on-surface-variant mb-1">Division of Interest</label>
              <select required class="w-full bg-surface/80 border border-primary/30 rounded px-4 py-3 text-sm text-on-surface focus:border-primary focus:outline-none">
                <option value="Real Estate">Real Estate Investments</option>
                <option value="Forex Trading">Forex & Multi-Asset Trading</option>
                <option value="Physical Commodities">Physical Commodities Trading</option>
                <option value="Wealth Preservation">Comprehensive Wealth Preservation</option>
              </select>
            </div>

            <div>
              <label class="block text-xs uppercase tracking-wider text-on-surface-variant mb-1">Estimated Portfolio Scope</label>
              <select class="w-full bg-surface/80 border border-primary/30 rounded px-4 py-3 text-sm text-on-surface focus:border-primary focus:outline-none">
                <option>$1M - $5M USD</option>
                <option>$5M - $25M USD</option>
                <option>$25M - $100M+ USD</option>
                <option>Institutional Mandate</option>
              </select>
            </div>

            <button type="submit" class="w-full btn-primary-metallic py-3 rounded text-sm font-bold tracking-widest mt-2">
              Request Confidential Briefing
            </button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Inject Toast Notification container if not present
  if (!document.getElementById('toast-notification')) {
    const toastHTML = `
      <div id="toast-notification" class="fixed bottom-6 right-6 z-[200] max-w-md w-full bg-surface-high border border-primary/60 rounded-xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-start gap-4">
        <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
          <span class="material-symbols-outlined">check_circle</span>
        </div>
        <div class="flex-grow">
          <h4 class="font-bold text-on-surface text-sm">Briefing Request Confirmed</h4>
          <p id="toast-message" class="text-xs text-on-surface-variant mt-1">Our Senior Advisory Desk will contact your secure channel within 2 business hours.</p>
        </div>
        <button onclick="document.getElementById('toast-notification').classList.remove('show')" class="text-on-surface-variant hover:text-on-surface">
          <span class="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', toastHTML);
  }

  const modal = document.getElementById('consultation-modal');
  const closeBtn = document.getElementById('close-consultation-modal');

  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.open-consultation-modal').forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/**
 * 5. Interactive Form Submission & Toast Display
 */
function initForms() {
  const showToast = (message) => {
    const toast = document.getElementById('toast-notification');
    const msgEl = document.getElementById('toast-message');
    if (msgEl && message) msgEl.textContent = message;
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 6000);
    }
  };

  // Modal form
  const modalForm = document.getElementById('modal-consultation-form');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('consultation-modal')?.classList.remove('open');
      document.body.style.overflow = '';
      showToast('Your confidential consultation request has been routed to our Executive Desk.');
      modalForm.reset();
    });
  }

  // Contact page form
  const contactForm = document.getElementById('contact-page-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Inquiry successfully registered. Our Senior Wealth Advisor will reach out shortly.');
      contactForm.reset();
    });
  }
}

/**
 * 6. Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
