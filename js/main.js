/* ==========================================================
   GRAPHIC DESIGNER PORTFOLIO — MAIN APPLICATION LOGIC
   ----------------------------------------------------------
   • Pure Vanilla JavaScript (ES6+).
   • Renders cards dynamically from js/projects.js.
   • Handles full glassmorphism modal, high-res artwork display,
     keyboard navigation, focus trap, and URL hash routing.
   ========================================================== */

(function () {
  'use strict';

  /* ==========================================================
     STATE MANAGEMENT
     ========================================================== */
  const state = {
    currentProjectId: null,
    lastActiveElement: null,
  };

  /* ==========================================================
     DOM ELEMENTS CACHE
     ========================================================== */
  const DOM = {
    yearSpan: document.getElementById('year'),
    projectsContainer: document.getElementById('projects'),
    modal: document.getElementById('modal'),
    modalBackdrop: document.getElementById('modal-backdrop'),
    modalClose: document.getElementById('modal-close'),
    galleryViewer: document.getElementById('gallery-viewer'),
    mainImg: document.getElementById('modal-main-img'),
    skeleton: document.getElementById('gallery-skeleton'),
    modalCategory: document.getElementById('modal-category'),
    modalYear: document.getElementById('modal-year'),
    modalTitle: document.getElementById('modal-title'),
    modalDesc: document.getElementById('modal-desc'),
    modalClient: document.getElementById('modal-client'),
    modalRole: document.getElementById('modal-role'),
    modalTools: document.getElementById('modal-tools'),
    modalCaption: document.getElementById('modal-caption'),
  };

  /* ==========================================================
     INITIALIZATION
     ========================================================== */
  function init() {
    // 1. Set current copyright year
    if (DOM.yearSpan) {
      DOM.yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Render cards from PROJECTS array
    renderCards();

    // 3. Setup IntersectionObserver for stagger reveal
    observeReveal();

    // 4. Bind interactive events
    bindEvents();

    // 5. Check URL hash on page load (e.g. #project-2)
    handleInitialHash();
  }

  /* ==========================================================
     1. renderCards()
     Builds the 5 project cards dynamically from PROJECTS
     (Image count badge removed per design specification)
     ========================================================== */
  function renderCards() {
    if (!DOM.projectsContainer || !Array.isArray(PROJECTS)) return;

    DOM.projectsContainer.innerHTML = '';

    PROJECTS.forEach((project) => {
      const card = document.createElement('article');
      card.className = 'project-card glass';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('data-id', project.id);
      card.setAttribute('aria-label', `View project: ${project.title}`);

      card.innerHTML = `
        <div class="card-media-wrapper">
          <img 
            class="card-cover-img" 
            src="${project.cover}" 
            alt="${project.title} cover"
            loading="lazy" 
            decoding="async"
          />
        </div>
        <div class="card-info-bar glass">
          <div class="card-info-left">
            <span class="card-category">${escapeHtml(project.category)}</span>
            <h3 class="card-title">${escapeHtml(project.title)}</h3>
          </div>
          <div class="card-hint">
            <span>View project</span>
            <span class="card-hint-arrow" aria-hidden="true">→</span>
          </div>
        </div>
      `;

      DOM.projectsContainer.appendChild(card);

      // Attach 3D tilt effect on desktop pointer devices
      setupCardTilt(card);
    });
  }

  /* ==========================================================
     2. observeReveal()
     Stagger reveal cards on scroll using IntersectionObserver
     ========================================================== */
  function observeReveal() {
    const cards = DOM.projectsContainer.querySelectorAll('.project-card');
    if (!cards.length) return;

    if (!('IntersectionObserver' in window)) {
      cards.forEach(card => card.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = Array.from(cards).indexOf(card);
          // 80ms stagger delay
          card.style.transitionDelay = `${index * 80}ms`;
          card.classList.add('is-revealed');
          obs.unobserve(card);

          // Reset delay after animation finishes so hover is snappy
          setTimeout(() => {
            card.style.transitionDelay = '0ms';
          }, (index * 80) + 600);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
    });

    cards.forEach(card => observer.observe(card));
  }

  /* ==========================================================
     CARD 3D TILT EFFECT
     Subtle 3D tilt (max 4°) following mouse on desktop devices
     ========================================================== */
  function setupCardTilt(card) {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    card.addEventListener('mouseenter', () => {
      card.classList.add('has-tilt');
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max 4 degrees tilt
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('has-tilt');
      card.style.transform = '';
    });
  }

  /* ==========================================================
     3. openModal(id)
     Fills modal content with project metadata and high-res artwork
     ========================================================== */
  function openModal(projectId) {
    const project = PROJECTS.find(p => p.id === projectId);
    if (!project) return;

    state.currentProjectId = projectId;
    state.lastActiveElement = document.activeElement;

    // Fill metadata
    if (DOM.modalTitle) DOM.modalTitle.textContent = project.title || '';
    if (DOM.modalCategory) DOM.modalCategory.textContent = project.category || '';
    if (DOM.modalYear) DOM.modalYear.textContent = project.year || '';
    if (DOM.modalDesc) DOM.modalDesc.textContent = project.description || '';

    if (DOM.modalClient) DOM.modalClient.textContent = (project.details && project.details.client) || '—';
    if (DOM.modalRole) DOM.modalRole.textContent = (project.details && project.details.role) || '—';
    if (DOM.modalTools) DOM.modalTools.textContent = (project.details && project.details.tools) || '—';

    // Caption note
    const captionText =
      (project.images && project.images[0] && project.images[0].caption) ||
      project.caption ||
      '';
    if (DOM.modalCaption) {
      DOM.modalCaption.textContent = captionText;
    }

    // Determine artwork image source
    const artworkSrc =
      (project.images && project.images[0] && project.images[0].src) ||
      project.image ||
      project.cover;

    const artworkAlt =
      (project.images && project.images[0] && project.images[0].alt) ||
      `${project.title} artwork`;

    // Skeleton shimmer loading for artwork
    if (DOM.skeleton) {
      DOM.skeleton.classList.add('is-loading');
    }

    DOM.mainImg.src = '';
    DOM.mainImg.alt = artworkAlt;

    const tempImg = new Image();
    tempImg.src = artworkSrc;
    tempImg.onload = () => {
      DOM.mainImg.src = artworkSrc;
      if (DOM.skeleton) {
        DOM.skeleton.classList.remove('is-loading');
      }
    };
    tempImg.onerror = () => {
      // Fallback to cover if image fails
      DOM.mainImg.src = project.cover;
      if (DOM.skeleton) {
        DOM.skeleton.classList.remove('is-loading');
      }
    };

    // Show modal
    DOM.modal.removeAttribute('hidden');
    // Force layout recalculation before adding active class for smooth transition
    void DOM.modal.offsetWidth;
    DOM.modal.classList.add('is-active');
    document.body.classList.add('modal-open');

    // Update URL hash without jitter
    if (window.location.hash !== `#${projectId}`) {
      try {
        history.pushState(null, '', `#${projectId}`);
      } catch (err) {
        window.location.hash = projectId;
      }
    }

    // Focus management: move focus into close button
    setTimeout(() => {
      if (DOM.modalClose) {
        DOM.modalClose.focus();
      }
    }, 50);
  }

  /* ==========================================================
     4. closeModal()
     Cleanup, restore focus, restore body scroll, clear hash
     ========================================================== */
  function closeModal() {
    if (!DOM.modal.classList.contains('is-active')) return;

    DOM.modal.classList.remove('is-active');
    document.body.classList.remove('modal-open');

    // Wait for fade transition before hiding
    setTimeout(() => {
      DOM.modal.setAttribute('hidden', '');
      DOM.mainImg.src = '';
    }, 450);

    // Clear URL hash cleanly without page jump
    if (window.location.hash) {
      try {
        history.pushState(null, '', window.location.pathname + window.location.search);
      } catch (err) {
        window.location.hash = '';
      }
    }

    // Restore focus to card that opened it
    if (state.lastActiveElement && typeof state.lastActiveElement.focus === 'function') {
      state.lastActiveElement.focus();
    }

    state.currentProjectId = null;
  }

  /* ==========================================================
     5. bindEvents()
     Clicks, keyboard, hash change, and focus trap
     ========================================================== */
  function bindEvents() {
    // Card clicks and keyboard activation (Enter / Space)
    DOM.projectsContainer.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (card && card.dataset.id) {
        openModal(card.dataset.id);
      }
    });

    DOM.projectsContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.project-card');
        if (card && card.dataset.id) {
          e.preventDefault();
          openModal(card.dataset.id);
        }
      }
    });

    // Close button click
    DOM.modalClose.addEventListener('click', closeModal);

    // Backdrop click outside panel
    DOM.modalBackdrop.addEventListener('click', closeModal);

    // Global Keyboard Navigation
    window.addEventListener('keydown', (e) => {
      if (!DOM.modal.classList.contains('is-active')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      } else if (e.key === 'Tab') {
        trapFocus(e);
      }
    });

    // URL Hash Change Listener (Back / Forward browser buttons)
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        if (state.currentProjectId !== hash) {
          openModal(hash);
        }
      } else {
        if (DOM.modal.classList.contains('is-active')) {
          closeModal();
        }
      }
    });
  }

  /* ==========================================================
     FOCUS TRAP
     Maintains accessibility focus within modal while open
     ========================================================== */
  function trapFocus(e) {
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = Array.from(DOM.modal.querySelectorAll(focusableSelectors))
      .filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);

    if (!focusableElements.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  /* ==========================================================
     HANDLE INITIAL HASH
     Opens modal if URL has #project-X on first load
     ========================================================== */
  function handleInitialHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash && PROJECTS.some(p => p.id === hash)) {
      // Delay slightly so layout is ready and cards are painted
      setTimeout(() => {
        openModal(hash);
      }, 100);
    }
  }

  /* ==========================================================
     HELPER: ESCAPE HTML
     Prevents potential injection in text interpolation
     ========================================================== */
  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Run on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
