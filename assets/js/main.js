/**
 * SHASHWAT ASHAPURA WOODS — MAIN INTERACTIVE JAVASCRIPT
 * Features:
 * - 13-Slide Civil Construction Hero Carousel with Ken Burns, Progress Bar, & Auto-rotation
 * - Pinewood Species Carousel with 6 Species, Counters (01/06), Touch/Drag & Autoplay
 * - IntersectionObserver Animated Stat Counters
 * - Interactive Plywood Layer Hotspot Inspector
 * - Interactive Material Estimator Calculator (Sheets, Area, Weight, Volume)
 * - Gallery Category Filtering & Fullscreen Lightbox Modal
 * - Quick Quote Modal & Species Detail Technical Modal
 * - Form Validation & Toast Notification System
 * - Sticky Navigation & Responsive Mobile Drawer
 * - Complete Bulletproof Button & Interaction Engine (Zero Dead Buttons)
 */

/* ==========================================================================
   SPECIES TECHNICAL SPECIFICATION DATA
   ========================================================================== */
const SPECIES_DATA = {
  'uruguay': {
    title: 'Uruguay Pine',
    sub: 'Pinus Taeda / Elliottii',
    image: 'assets/images/species-uruguay.jpg',
    origin: 'South America (Uruguay)',
    density: '480 – 540 kg/m³',
    moisture: '10% – 14% Kiln Dried',
    color: 'Warm Pale Golden Amber with Straight Clear Grain',
    workability: 'Excellent sawing, planing, nail & screw retention',
    applications: 'Heavy Concrete Formwork Runners, Scaffolding Battens, Packaging Pallets, Industrial Framing',
    summary: 'Uruguayan pine is celebrated across international construction markets for its remarkable straight grain, structural uniformity, and resilient cell structure that resists warping even under damp casting conditions.'
  },
  'austral': {
    title: 'Austral Pine',
    sub: 'Southern Hemisphere Pine',
    image: 'assets/images/species-austral.jpg',
    origin: 'Oceania / South Pacific',
    density: '510 – 560 kg/m³',
    moisture: '12% – 14% Kiln Dried',
    color: 'Light Honey Amber with Fine Uniform Grain',
    workability: 'High mechanical strength, clean edge cut, smooth finish',
    applications: 'Civil Infrastructure Shuttering, Core Battens, Structural Joists, Heavy Decking',
    summary: 'Austral Pine yields superior modulus of elasticity and high bending strength, making it the preferred species for heavy civil works, highway piers, and high-rise core columns.'
  },
  'syp': {
    title: 'USA — SYP Pine',
    sub: 'Southern Yellow Pine',
    image: 'assets/images/species-syp.jpg',
    origin: 'Southeastern United States',
    density: '570 – 660 kg/m³',
    moisture: '10% – 12% Kiln Dried',
    color: 'Bold Yellow with Pronounced Dense Growth Rings',
    workability: 'Highest density pine, extreme fastener holding capacity',
    applications: 'Heavy Formwork Bearers, High-Load Falsework, Industrial Scaffolding, Treated Timber',
    summary: 'Southern Yellow Pine is the benchmark of structural softwoods worldwide. With exceptional load-carrying capacity and high natural density, it outlasts standard softwoods under severe site pressures.'
  },
  'nz': {
    title: 'New Zealand Pine',
    sub: 'Premium Radiata Pine',
    image: 'assets/images/species-nz.jpg',
    origin: 'New Zealand (Sustainably Farmed)',
    density: '460 – 520 kg/m³',
    moisture: '10% – 12% Kiln Dried',
    color: 'Silky Creamy Straw, Virtually Knot-Free Grade',
    workability: 'Superior machining, smooth planed face, optimal gluing',
    applications: 'Architectural Formwork, Precision Mouldings, High-End Joinery, Structural Plywood Cores',
    summary: 'Famed for its remarkably consistent texture and low resin pockets, New Zealand Radiata pine machines cleanly and offers an impeccable surface for smooth architectural concrete.'
  },
  'spruce': {
    title: 'Spruce Pine',
    sub: 'Nordic / European Spruce Softwood',
    image: 'assets/images/species-spruce.jpg',
    origin: 'Northern Europe & North America',
    density: '420 – 470 kg/m³',
    moisture: '12% – 15% Kiln Dried',
    color: 'Pale Whitish Yellow with Fine Lustrous Grain',
    workability: 'Lightweight, easy handling, straight split-resistant grain',
    applications: 'Overhead Slab Formwork, Framing Studs, Temporary Staging, Light Truss Battens',
    summary: 'Spruce Pine combines lightweight handling with dependable fiber tensile strength. It drastically reduces labor fatigue on massive casting floors without sacrificing dimensional integrity.'
  },
  'silk': {
    title: 'Silk Pine',
    sub: 'Refined Satiny Softwood',
    image: 'assets/images/species-silk.jpg',
    origin: 'Selected Global Pine Forests',
    density: '450 – 500 kg/m³',
    moisture: '10% – 12% Kiln Dried',
    color: 'Silky Warm Golden Sand with Subtle Sheen',
    workability: 'Smooth mirror planed face, exceptional dimensional stability',
    applications: 'Fair-Faced Concrete Shuttering, Edge Paneling, Furniture Framework, Architectural Woodwork',
    summary: 'Silk Pine is chosen for high-spec projects demanding a pristine satiny finish. Its dense fiber structure guarantees an unblemished imprint when stripped from curing concrete.'
  }
};

/* ==========================================================================
   GLOBAL ACTIONS EXPOSED ON WINDOW FOR 100% RELIABLE BUTTON RESPONSE
   ========================================================================== */

// 1. Hero Slide Navigation
window.sawNextSlide = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  if (typeof window._sawNextSlideImpl === 'function') {
    window._sawNextSlideImpl();
  }
};

window.sawPrevSlide = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  if (typeof window._sawPrevSlideImpl === 'function') {
    window._sawPrevSlideImpl();
  }
};

// 2. Quote Modal Controls
window.sawOpenQuoteModal = function (preferredProduct = '', e) {
  if (preferredProduct && typeof preferredProduct === 'object' && preferredProduct.target) {
    e = preferredProduct;
    preferredProduct = '';
  }
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }

  const quoteModal = document.getElementById('quoteModal');
  const quoteModalProduct = document.getElementById('quoteModalProduct');

  if (quoteModalProduct && preferredProduct && typeof preferredProduct === 'string') {
    if (preferredProduct === 'Shutter Plywood') preferredProduct = 'Shuttering Film Faced Plywood';
    if (preferredProduct === 'Shutter Pinewood') preferredProduct = 'Shuttering Pine Wood';

    const hasOption = Array.from(quoteModalProduct.options).some(o => o.value === preferredProduct);
    if (hasOption) {
      quoteModalProduct.value = preferredProduct;
    } else {
      quoteModalProduct.value = 'Other';
    }
  }

  quoteModal?.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.sawCloseQuoteModal = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  const quoteModal = document.getElementById('quoteModal');
  quoteModal?.classList.remove('active');
  document.body.style.overflow = '';
};

// 3. Floating Popovers & Backdrops
window.sawCloseAllPops = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  const call = document.getElementById('callPopCard');
  const wa = document.getElementById('waChatPopcard');
  const backdrop = document.getElementById('sawPopoverBackdrop');
  call?.classList.remove('active');
  wa?.classList.remove('active');
  call?.setAttribute('aria-hidden', 'true');
  wa?.setAttribute('aria-hidden', 'true');
  backdrop?.classList.remove('active');
};

window.sawToggleCallPop = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  const wa = document.getElementById('waChatPopcard');
  const call = document.getElementById('callPopCard');
  const backdrop = document.getElementById('sawPopoverBackdrop');
  wa?.classList.remove('active');
  wa?.setAttribute('aria-hidden', 'true');
  const isOpening = !call?.classList.contains('active');
  if (isOpening) {
    call?.classList.add('active');
    call?.setAttribute('aria-hidden', 'false');
    backdrop?.classList.add('active');
  } else {
    call?.classList.remove('active');
    call?.setAttribute('aria-hidden', 'true');
    backdrop?.classList.remove('active');
  }
};

window.sawOpenCallPop = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  const wa = document.getElementById('waChatPopcard');
  const call = document.getElementById('callPopCard');
  const backdrop = document.getElementById('sawPopoverBackdrop');
  wa?.classList.remove('active');
  wa?.setAttribute('aria-hidden', 'true');
  call?.classList.add('active');
  call?.setAttribute('aria-hidden', 'false');
  backdrop?.classList.add('active');
};

window.sawCloseCallPop = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  const call = document.getElementById('callPopCard');
  const backdrop = document.getElementById('sawPopoverBackdrop');
  call?.classList.remove('active');
  call?.setAttribute('aria-hidden', 'true');
  backdrop?.classList.remove('active');
};

window.sawToggleWaPop = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  const call = document.getElementById('callPopCard');
  const wa = document.getElementById('waChatPopcard');
  const backdrop = document.getElementById('sawPopoverBackdrop');
  call?.classList.remove('active');
  call?.setAttribute('aria-hidden', 'true');
  const isOpening = !wa?.classList.contains('active');
  if (isOpening) {
    wa?.classList.add('active');
    wa?.setAttribute('aria-hidden', 'false');
    backdrop?.classList.add('active');
  } else {
    wa?.classList.remove('active');
    wa?.setAttribute('aria-hidden', 'true');
    backdrop?.classList.remove('active');
  }
};

window.sawOpenWaPop = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  const call = document.getElementById('callPopCard');
  const wa = document.getElementById('waChatPopcard');
  const backdrop = document.getElementById('sawPopoverBackdrop');
  call?.classList.remove('active');
  call?.setAttribute('aria-hidden', 'true');
  wa?.classList.add('active');
  wa?.setAttribute('aria-hidden', 'false');
  backdrop?.classList.add('active');
};

window.sawCloseWaPop = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  const wa = document.getElementById('waChatPopcard');
  const backdrop = document.getElementById('sawPopoverBackdrop');
  wa?.classList.remove('active');
  wa?.setAttribute('aria-hidden', 'true');
  backdrop?.classList.remove('active');
};

// 4. Mobile Navigation Drawer
window.sawToggleMobileMenu = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  const navMenu = document.getElementById('navMenu');
  const mobileToggle = document.getElementById('mobileToggle');
  const isOpen = navMenu?.classList.toggle('open');
  if (isOpen) {
    navMenu?.classList.add('active');
    mobileToggle?.classList.add('open', 'active');
    mobileToggle?.setAttribute('aria-expanded', 'true');
  } else {
    navMenu?.classList.remove('active');
    mobileToggle?.classList.remove('open', 'active');
    mobileToggle?.setAttribute('aria-expanded', 'false');
  }
};

// 5. Species Technical Modal Controls
window.sawOpenSpeciesModal = function (key, e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  const item = SPECIES_DATA[key];
  if (!item) return;

  const speciesModal = document.getElementById('speciesModal');
  const speciesModalTitle = document.getElementById('speciesModalTitle');
  const speciesModalSub = document.getElementById('speciesModalSub');
  const speciesModalImg = document.getElementById('speciesModalImg');
  const speciesModalOrigin = document.getElementById('speciesModalOrigin');
  const speciesModalDensity = document.getElementById('speciesModalDensity');
  const speciesModalMoisture = document.getElementById('speciesModalMoisture');
  const speciesModalColor = document.getElementById('speciesModalColor');
  const speciesModalApp = document.getElementById('speciesModalApp');
  const speciesModalSummary = document.getElementById('speciesModalSummary');
  const speciesModalQuoteBtn = document.getElementById('speciesModalQuoteBtn');

  if (speciesModalTitle) speciesModalTitle.textContent = item.title;
  if (speciesModalSub) speciesModalSub.textContent = item.sub;
  if (speciesModalImg) {
    speciesModalImg.src = item.image;
    speciesModalImg.alt = item.title;
  }
  if (speciesModalOrigin) speciesModalOrigin.textContent = item.origin;
  if (speciesModalDensity) speciesModalDensity.textContent = item.density;
  if (speciesModalMoisture) speciesModalMoisture.textContent = item.moisture;
  if (speciesModalColor) speciesModalColor.textContent = item.color;
  if (speciesModalApp) speciesModalApp.textContent = item.applications;
  if (speciesModalSummary) speciesModalSummary.textContent = item.summary;

  speciesModalQuoteBtn?.setAttribute('data-preselect', item.title);

  speciesModal?.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.sawCloseSpeciesModal = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  const speciesModal = document.getElementById('speciesModal');
  speciesModal?.classList.remove('active');
  document.body.style.overflow = '';
};

window.sawSpeciesQuote = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  const speciesModalQuoteBtn = document.getElementById('speciesModalQuoteBtn');
  const preselect = speciesModalQuoteBtn?.getAttribute('data-preselect') || '';
  window.sawCloseSpeciesModal();
  window.sawOpenQuoteModal(preselect);
};

// 6. Species Carousel Controls
window.sawNextSpecies = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  if (typeof window._sawNextSpeciesImpl === 'function') {
    window._sawNextSpeciesImpl();
  }
};

window.sawPrevSpecies = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  if (typeof window._sawPrevSpeciesImpl === 'function') {
    window._sawPrevSpeciesImpl();
  }
};

// 7. Gallery Category Filter & Fullscreen Lightbox Controls
window.sawFilterGallery = function (filter, e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  if (typeof window._sawFilterGalleryImpl === 'function') {
    window._sawFilterGalleryImpl(filter);
  }
};

window.sawOpenLightbox = function (index, e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  if (typeof window._sawOpenLightboxImpl === 'function') {
    window._sawOpenLightboxImpl(index);
  }
};

window.sawCloseLightbox = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  lightboxOverlay?.classList.remove('active');
  document.body.style.overflow = '';
};

window.sawPrevLightbox = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  if (typeof window._sawPrevLightboxImpl === 'function') {
    window._sawPrevLightboxImpl();
  }
};

window.sawNextLightbox = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  if (typeof window._sawNextLightboxImpl === 'function') {
    window._sawNextLightboxImpl();
  }
};

// 8. Back to Top Smooth Scroll
window.sawScrollToTop = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 9. Brand Philosophy Intro Slab Slider Controls
window.sawNextIntroSlide = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  if (typeof window._sawNextIntroSlideImpl === 'function') {
    window._sawNextIntroSlideImpl();
  }
};

window.sawPrevIntroSlide = function (e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  if (typeof window._sawPrevIntroSlideImpl === 'function') {
    window._sawPrevIntroSlideImpl();
  }
};

window.sawGoToIntroSlide = function (index, e) {
  if (e && e.preventDefault) { e.preventDefault(); e.stopPropagation(); }
  if (typeof window._sawGoToIntroSlideImpl === 'function') {
    window._sawGoToIntroSlideImpl(index);
  }
};

// 10. Global Toast Message
window.sawShowToast = function (msg) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C69255" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${msg}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
};

/* ==========================================================================
   MAIN APPLICATION LOGIC & COMPONENT INITIALIZATION
   ========================================================================== */
function initSawApp() {
  /* ==========================================================================
     1. STICKY NAVBAR & NAVIGATION
     ========================================================================== */
  const header = document.querySelector('.site-header');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
      backToTopBtn?.classList.add('visible');
    } else {
      header?.classList.remove('scrolled');
      backToTopBtn?.classList.remove('visible');
    }
  }, { passive: true });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('open', 'active');
      const mobileToggle = document.getElementById('mobileToggle');
      mobileToggle?.classList.remove('open', 'active');
      mobileToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  backToTopBtn?.addEventListener('click', (e) => {
    window.sawScrollToTop(e);
  });

  /* ==========================================================================
     2. HERO CONSTRUCTION SLIDESHOW CAROUSEL (13 SLIDES)
     ========================================================================== */
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroCounter = document.getElementById('heroCounter');
  const heroDotsContainer = document.getElementById('heroDotsContainer');
  let heroDots = document.querySelectorAll('.hero-dot');

  let currentSlide = 0;
  const totalSlides = heroSlides.length;
  let slideInterval = null;
  const slideDuration = 4500;

  function showSlide(index) {
    if (totalSlides === 0) return;
    currentSlide = (index + totalSlides) % totalSlides;

    heroSlides.forEach((slide, i) => {
      const isActive = i === currentSlide;
      slide.classList.toggle('active', isActive);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });

    heroDots = document.querySelectorAll('.hero-dot');
    heroDots.forEach((dot, i) => {
      const isActive = i === currentSlide;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');

      const progressBar = dot.querySelector('.hero-dot-progress');
      if (progressBar) {
        progressBar.style.animation = 'none';
        void progressBar.offsetWidth;
        if (isActive) {
          progressBar.style.animation = `progressBar ${slideDuration}ms linear forwards`;
        }
      }
      if (isActive && heroDotsContainer) {
        const scrollTarget = dot.offsetLeft - (heroDotsContainer.clientWidth / 2) + (dot.clientWidth / 2);
        heroDotsContainer.scrollTo({ left: scrollTarget, behavior: 'smooth' });
      }
    });

    if (heroCounter) {
      heroCounter.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;
    }
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  function stopAutoPlay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  function handleUserNavigation(action) {
    action();
    startAutoPlay();
  }

  // Wire up global slide navigation handlers
  window._sawNextSlideImpl = () => handleUserNavigation(nextSlide);
  window._sawPrevSlideImpl = () => handleUserNavigation(prevSlide);

  // Dots click handler
  heroDotsContainer?.addEventListener('click', (e) => {
    const dot = e.target.closest('.hero-dot');
    if (!dot) return;
    const slideIdx = parseInt(dot.getAttribute('data-slide'), 10);
    if (!isNaN(slideIdx)) {
      handleUserNavigation(() => showSlide(slideIdx));
    }
  });

  // Keyboard arrow navigation
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight') {
      const heroRect = document.querySelector('.hero-section')?.getBoundingClientRect();
      if (heroRect && heroRect.top < window.innerHeight && heroRect.bottom > 0) {
        handleUserNavigation(nextSlide);
      }
    } else if (e.key === 'ArrowLeft') {
      const heroRect = document.querySelector('.hero-section')?.getBoundingClientRect();
      if (heroRect && heroRect.top < window.innerHeight && heroRect.bottom > 0) {
        handleUserNavigation(prevSlide);
      }
    }
  });

  // Control hover pause
  const heroControls = document.querySelector('.hero-controls');
  heroControls?.addEventListener('mouseenter', stopAutoPlay);
  heroControls?.addEventListener('mouseleave', startAutoPlay);

  // Mobile Touch Swipe support
  let heroTouchStartX = 0;
  let heroTouchStartY = 0;
  const heroSection = document.querySelector('.hero-section');

  heroSection?.addEventListener('touchstart', (e) => {
    heroTouchStartX = e.touches[0].clientX;
    heroTouchStartY = e.touches[0].clientY;
  }, { passive: true });

  heroSection?.addEventListener('touchend', (e) => {
    const diffX = heroTouchStartX - e.changedTouches[0].clientX;
    const diffY = heroTouchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleUserNavigation(nextSlide);
      } else {
        handleUserNavigation(prevSlide);
      }
    }
  }, { passive: true });

  showSlide(0);
  startAutoPlay();

  /* ==========================================================================
     3. PINEWOOD SPECIES CAROUSEL (6 SPECIES)
     ========================================================================== */
  const speciesTrack = document.getElementById('speciesTrack');
  const speciesCards = document.querySelectorAll('.species-card');
  const speciesCounter = document.getElementById('speciesCounter');

  let currentSpeciesIdx = 0;
  const totalSpecies = speciesCards.length;
  let speciesInterval = null;

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w < 768) return 1;
    if (w < 1024) return 2;
    return 3;
  }

  function updateSpeciesCarousel() {
    const visible = getVisibleCount();
    const maxIndex = Math.max(0, totalSpecies - visible);
    if (currentSpeciesIdx > maxIndex) currentSpeciesIdx = 0;
    if (currentSpeciesIdx < 0) currentSpeciesIdx = maxIndex;

    const firstCard = speciesCards[0];
    if (firstCard && speciesTrack) {
      const cardWidth = firstCard.getBoundingClientRect().width;
      const gap = 32;
      const offset = currentSpeciesIdx * (cardWidth + gap);
      speciesTrack.style.transform = `translateX(-${offset}px)`;
    }

    if (speciesCounter) {
      speciesCounter.textContent = `${String(currentSpeciesIdx + 1).padStart(2, '0')} / ${String(totalSpecies).padStart(2, '0')}`;
    }
  }

  function nextSpecies() {
    const visible = getVisibleCount();
    const maxIndex = Math.max(0, totalSpecies - visible);
    if (currentSpeciesIdx >= maxIndex) {
      currentSpeciesIdx = 0;
    } else {
      currentSpeciesIdx++;
    }
    updateSpeciesCarousel();
  }

  function prevSpecies() {
    const visible = getVisibleCount();
    const maxIndex = Math.max(0, totalSpecies - visible);
    if (currentSpeciesIdx <= 0) {
      currentSpeciesIdx = maxIndex;
    } else {
      currentSpeciesIdx--;
    }
    updateSpeciesCarousel();
  }

  function startSpeciesAuto() {
    stopSpeciesAuto();
    speciesInterval = setInterval(nextSpecies, 4500);
  }

  function stopSpeciesAuto() {
    if (speciesInterval) clearInterval(speciesInterval);
  }

  // Wire global implementations for species navigation
  window._sawNextSpeciesImpl = () => {
    nextSpecies();
    startSpeciesAuto();
  };

  window._sawPrevSpeciesImpl = () => {
    prevSpecies();
    startSpeciesAuto();
  };

  const speciesContainer = document.querySelector('.species-carousel-container');
  speciesContainer?.addEventListener('mouseenter', stopSpeciesAuto);
  speciesContainer?.addEventListener('mouseleave', startSpeciesAuto);

  window.addEventListener('resize', updateSpeciesCarousel);
  startSpeciesAuto();
  updateSpeciesCarousel();

  /* ==========================================================================
     4. ANIMATED STATS NUMBER COUNTERS
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(numEl => {
          const target = parseInt(numEl.getAttribute('data-target') || '0', 10);
          const duration = 2000;
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          let currentStep = 0;

          const counter = setInterval(() => {
            currentStep++;
            const progress = currentStep / totalSteps;
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(target * easeOut);
            numEl.textContent = currentVal;

            if (currentStep >= totalSteps) {
              numEl.textContent = target;
              clearInterval(counter);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.35 });

  const qualitySection = document.querySelector('.quality-section');
  if (qualitySection) statsObserver.observe(qualitySection);

  /* ==========================================================================
     5. INTERACTIVE PLYWOOD LAYER HOTSPOTS
     ========================================================================== */
  const hotspots = document.querySelectorAll('.layer-hotspot');
  hotspots.forEach(spot => {
    spot.addEventListener('click', () => {
      const info = spot.getAttribute('data-info');
      if (info) {
        window.sawShowToast(info);
      }
    });
  });

  /* ==========================================================================
     6. MATERIAL ESTIMATOR CALCULATOR
     ========================================================================== */
  const calcProduct = document.getElementById('calcProduct');
  const calcThickness = document.getElementById('calcThickness');
  const calcArea = document.getElementById('calcArea');
  const calcReuse = document.getElementById('calcReuse');
  const calcForm = document.getElementById('calculatorForm');

  const resSheets = document.getElementById('resSheets');
  const resWeight = document.getElementById('resWeight');
  const resVolume = document.getElementById('resVolume');
  const resReuseCost = document.getElementById('resReuseCost');

  function calculateMaterials() {
    const areaSqFt = parseFloat(calcArea?.value || '1000');
    const thicknessMm = parseFloat(calcThickness?.value || '12');
    const reuseCycles = parseFloat(calcReuse?.value || '20');

    const sheetArea = 32;
    const rawSheets = (areaSqFt / sheetArea) * 1.08;
    const totalSheets = Math.ceil(rawSheets);

    const singleSheetAreaM2 = 2.977;
    const thicknessM = thicknessMm / 1000;
    const singleSheetVolM3 = singleSheetAreaM2 * thicknessM;
    const totalVolM3 = (totalSheets * singleSheetVolM3).toFixed(2);

    const totalWeightKg = Math.round(totalSheets * (singleSheetVolM3 * 750));
    const effectiveSheetDemand = Math.ceil(totalSheets / (reuseCycles > 1 ? (reuseCycles * 0.75) : 1));

    if (resSheets) resSheets.textContent = `${totalSheets} Sheets`;
    if (resWeight) resWeight.textContent = `${totalWeightKg} kg (~${(totalWeightKg / 1000).toFixed(2)} Tons)`;
    if (resVolume) resVolume.textContent = `${totalVolM3} m³`;
    if (resReuseCost) resReuseCost.textContent = `${effectiveSheetDemand} Effective Sets`;
  }

  calcForm?.addEventListener('input', calculateMaterials);
  calculateMaterials();

  /* ==========================================================================
     7. GALLERY FILTER & LIGHTBOX MODAL
     ========================================================================== */
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  let currentGalleryIndex = 0;
  const visibleGalleryList = [];

  function updateGalleryFilter(filter) {
    visibleGalleryList.length = 0;
    galleryTabs.forEach(t => {
      const match = (t.getAttribute('data-filter') || 'all') === filter;
      t.classList.toggle('active', match);
    });

    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        item.style.display = 'block';
        visibleGalleryList.push(item);
      } else {
        item.style.display = 'none';
      }
    });
  }

  function openLightbox(index) {
    if (visibleGalleryList.length === 0) return;
    currentGalleryIndex = (index + visibleGalleryList.length) % visibleGalleryList.length;
    const activeItem = visibleGalleryList[currentGalleryIndex];
    const imgEl = activeItem.querySelector('.gallery-img');
    const titleEl = activeItem.querySelector('.gallery-caption-title');

    if (lightboxImg && imgEl) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt;
    }
    if (lightboxCaption && titleEl) {
      lightboxCaption.textContent = titleEl.textContent;
    }

    lightboxOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Wire global gallery & lightbox implementations
  window._sawFilterGalleryImpl = (filter) => updateGalleryFilter(filter);
  window._sawOpenLightboxImpl = (idx) => openLightbox(idx);
  window._sawPrevLightboxImpl = () => openLightbox(currentGalleryIndex - 1);
  window._sawNextLightboxImpl = () => openLightbox(currentGalleryIndex + 1);

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const filter = tab.getAttribute('data-filter') || 'all';
      window.sawFilterGallery(filter, e);
    });
  });

  updateGalleryFilter('all');

  galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const idx = visibleGalleryList.indexOf(item);
      if (idx !== -1) window.sawOpenLightbox(idx, e);
    });
  });

  lightboxOverlay?.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) window.sawCloseLightbox(e);
  });

  document.addEventListener('keydown', (e) => {
    if (!lightboxOverlay?.classList.contains('active')) return;
    if (e.key === 'Escape') window.sawCloseLightbox(e);
    if (e.key === 'ArrowLeft') window.sawPrevLightbox(e);
    if (e.key === 'ArrowRight') window.sawNextLightbox(e);
  });

  /* ==========================================================================
     8. SPECIES DETAIL MODAL
     ========================================================================== */
  const speciesModal = document.getElementById('speciesModal');
  speciesModal?.addEventListener('click', (e) => {
    if (e.target === speciesModal) {
      window.sawCloseSpeciesModal(e);
    }
  });

  document.querySelectorAll('.species-explore-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = btn.getAttribute('data-species') || 'uruguay';
      window.sawOpenSpeciesModal(key, e);
    });
  });

  /* ==========================================================================
     9. GET A QUOTE MODAL DIALOG
     ========================================================================== */
  const quoteModal = document.getElementById('quoteModal');
  quoteModal?.addEventListener('click', (e) => {
    if (e.target === quoteModal) window.sawCloseQuoteModal(e);
  });

  /* ==========================================================================
     10. FORMS SUBMISSION & TOAST NOTIFICATION
     ========================================================================== */
  const mainEnquiryForm = document.getElementById('mainEnquiryForm');
  const quoteModalForm = document.getElementById('quoteModalForm');
  const newsletterForm = document.getElementById('newsletterForm');

  function handleFormSubmit(e, formType) {
    e.preventDefault();
    const form = e.target;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Submitting...';

    if (submitBtn) {
      submitBtn.innerHTML = '<span>Forwarding to WhatsApp...</span>';
      submitBtn.disabled = true;
    }

    let waText = '';
    const salesDeskNumber = '919099514179';
    const targetDeskNumber = salesDeskNumber;

    if (formType === 'quote') {
      const name = document.getElementById('quoteName')?.value.trim() || 'Valued Client';
      const company = document.getElementById('quoteCompany')?.value.trim() || 'Individual / Builder';
      const phone = document.getElementById('quotePhone')?.value.trim() || 'Not Provided';
      const email = document.getElementById('quoteEmail')?.value.trim() || 'Not Provided';
      const product = document.getElementById('quoteModalProduct')?.value || 'Timber / Plywood';
      const requirements = document.getElementById('quoteRequirements')?.value.trim() || 'Direct Project Pricing Request';

      waText =
        `🌲 *NEW PROJECT QUOTE INQUIRY* 🌲
*Shashwat Ashapura Woods*
━━━━━━━━━━━━━━━━━━━━━━
👤 *Contact Person:* ${name}
🏢 *Company / Firm:* ${company}
📞 *Phone / WhatsApp:* ${phone}
✉️ *Email Address:* ${email}
🪵 *Product Interested:* ${product}
📋 *Quantity & Specifications:*
${requirements}
━━━━━━━━━━━━━━━━━━━━━━
🌐 *Source: Website Instant Quote Form*`;

    } else if (formType === 'enquiry') {
      const name = document.getElementById('contactName')?.value.trim() || 'Valued Client';
      const company = document.getElementById('contactCompany')?.value.trim() || 'Individual / Builder';
      const phone = document.getElementById('contactPhone')?.value.trim() || 'Not Provided';
      const email = document.getElementById('contactEmail')?.value.trim() || 'Not Provided';
      const product = document.getElementById('contactProduct')?.value || 'Timber / Plywood';
      const qty = document.getElementById('contactQty')?.value.trim() || 'Bulk Requirement';
      const message = document.getElementById('contactMessage')?.value.trim() || 'Please share product rates and delivery schedule.';

      waText =
        `🌲 *NEW TIMBER SUPPLY ENQUIRY* 🌲
*Shashwat Ashapura Woods*
━━━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${name}
🏢 *Company:* ${company}
📞 *Phone:* ${phone}
✉️ *Email:* ${email}
🪵 *Product:* ${product}
📦 *Est. Quantity / Size:* ${qty}
📝 *Requirements:*
${message}
━━━━━━━━━━━━━━━━━━━━━━
🌐 *Source: Website Contact Form*`;
    }

    setTimeout(() => {
      if (waText) {
        const waUrl = `https://wa.me/${targetDeskNumber}?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, '_blank');
      }

      form.reset();
      if (submitBtn) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }

      if (formType === 'quote') {
        window.sawCloseQuoteModal();
        window.sawShowToast('Quote details submitted! WhatsApp chat has opened with our sales desk.');
      } else if (formType === 'enquiry') {
        window.sawShowToast('Enquiry details forwarded! WhatsApp chat has opened with our sales desk.');
      } else if (formType === 'newsletter') {
        window.sawShowToast('Subscribed! Thank you for requesting our wood catalog and supply updates.');
      }
    }, 700);
  }

  mainEnquiryForm?.addEventListener('submit', (e) => handleFormSubmit(e, 'enquiry'));
  quoteModalForm?.addEventListener('submit', (e) => handleFormSubmit(e, 'quote'));
  newsletterForm?.addEventListener('submit', (e) => handleFormSubmit(e, 'newsletter'));

  /* ==========================================================================
     11. FLOATING CALL & WHATSAPP INTERACTIVE DESK POPUPS
     ========================================================================== */
  document.addEventListener('click', (e) => {
    const call = document.getElementById('callPopCard');
    const wa = document.getElementById('waChatPopcard');
    const isCallActive = call?.classList.contains('active');
    const isWaActive = wa?.classList.contains('active');
    if (!isCallActive && !isWaActive) return;

    const clickedInsideCall = call?.contains(e.target) || e.target.closest('#callTriggerBtn') || e.target.closest('.phone-cta');
    const clickedInsideWa = wa?.contains(e.target) || e.target.closest('#waTriggerBtn') || e.target.closest('.whatsapp-banner-card');
    if (!clickedInsideCall && !clickedInsideWa) {
      window.sawCloseAllPops();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.sawCloseAllPops();
      window.sawCloseQuoteModal();
      window.sawCloseSpeciesModal();
      window.sawCloseLightbox();
    }
  });

  document.querySelectorAll('.saw-desk-option').forEach((opt) => {
    opt.addEventListener('click', () => {
      setTimeout(() => {
        window.sawCloseAllPops();
      }, 350);
    });
  });

  /* ==========================================================================
     12. SECTION 18: CINEMATIC VIDEO THEATER & ANIMATED MASCOT STORY ENGINE
     ========================================================================== */
  const videoEl = document.getElementById('spotlightVideo');
  if (videoEl) {
    videoEl.addEventListener('play', () => updatePlayButtonState(true));
    videoEl.addEventListener('pause', () => updatePlayButtonState(false));

    // Sequential Continuous Playlist Auto-Loop:
    // When the current video ends, automatically advance to the next video,
    // and loop back to the first video when reaching the end!
    videoEl.addEventListener('ended', () => {
      const nextIndex = (sawActiveVideoIndex + 1) % SAW_VIDEOS.length;
      window.sawSelectVideo(nextIndex);
    });
  }

  // Auto-play muted video and trigger cinematic soundtrack when video section enters viewport
  const videoSection = document.getElementById('videos') || document.getElementById('modeCinemaContent');
  if (videoSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (videoEl && videoEl.paused) {
            videoEl.play().catch(() => {});
          }
          window.sawStartBgmAuto();
        }
      });
    }, { threshold: 0.25 });
    observer.observe(videoSection);
  }
}

// Auto-run initialization immediately or when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSawApp);
} else {
  initSawApp();
}

/* ==========================================================================
   GLOBAL SECTION 18 HANDLERS (CINEMATIC THEATER & FOREMAN VIKRAM STORY)
   ========================================================================== */
const SAW_VIDEOS = [
  {
    src: "assets/videos/commando-formwork-site-live.mp4",
    fallback: "assets/videos/high-rise-construction-skyline.mp4",
    poster: "assets/images/commando-formwork-live-poster.jpg",
    headline: "COMMANDO™ 18mm Slab Shuttering & Column Formwork Site",
    badge: "Live Site Capture • Heavy-Duty Column Shuttering",
    desc: "Live on-site installation of COMMANDO™ calibrated 18mm film-faced plywood column boxes and slab shuttering decking with heavy steel rebars and timber runners."
  },
  {
    src: "assets/videos/pinewood-timber-runners-branding.mp4",
    fallback: "assets/videos/gandhidham-lumber-mill-stock.mp4",
    poster: "assets/images/pinewood-timber-branding-poster.jpg",
    headline: "Global Pinewood Sourcing, Precision Sizing & Structural Runners",
    badge: "Imported Pinewood • SAW • WudPlus™ • COMMANDO™",
    desc: "Direct vessel import of certified pine species (Uruguay, Austral, SYP, New Zealand) and sawmill precision sizing into calibrated structural runners engineered for zero-deflection formwork."
  },
  {
    src: "assets/videos/commercial-timber-staging-framing.mp4",
    fallback: "assets/videos/high-rise-construction-skyline.mp4",
    poster: "assets/images/site-red-film-face-formwork-02.jpg",
    headline: "Commercial Heavy Timber Staging & Column Framing",
    badge: "Structural Framing • Column & Beam Shuttering",
    desc: "Heavy-duty structural framing and load-bearing pine battens assembled on-site to support multi-ton column and beam concrete pours."
  },
  {
    src: "assets/videos/concrete-pouring-formwork-pour.mp4",
    fallback: "assets/videos/high-rise-construction-skyline.mp4",
    poster: "assets/images/site-red-film-face-formwork-04.jpg",
    headline: "Wet Concrete Pouring onto Film-Faced Formwork Decking",
    badge: "Jobsite Pouring • Slab Shuttering Cast",
    desc: "Active concrete pump placement over phenolic film-faced shuttering plywood and timber runners for seamless mirror-finish concrete slabs."
  },
  {
    src: "assets/videos/client-yard-dispatch-loading.mp4",
    fallback: "assets/videos/gandhidham-lumber-mill-stock.mp4",
    poster: "assets/images/warehouse-shuttering-plywood-dispatch.jpg",
    headline: "Gandhidham Port Timber Yard: Same-Day Dispatch Loading",
    badge: "Live Yard Operation • Same-Day Dispatch",
    desc: "Direct facility capture from Shashwat Ashapura Woods' Gandhidham port yard showing forklift pallet loading and same-day trailer clearance for interstate infrastructure projects."
  },
  {
    src: "assets/videos/gandhidham-lumber-mill-stock.mp4",
    fallback: "assets/videos/client-yard-dispatch-loading.mp4",
    poster: "assets/images/product-showcase-wudplus-commando.jpg",
    headline: "Gandhidham Stocking Yards & Automated Pine Sizing",
    badge: "Gandhidham Mill Yard • Bulk Dispatch",
    desc: "15,000+ MT kiln-dried pine lumber and calibrated WudPlus™ shuttering boards stacked in Gandhidham yards ready for express pan-India truck dispatch."
  },
  {
    src: "assets/videos/client-timber-stock-yard.mp4",
    fallback: "assets/videos/client-yard-dispatch-loading.mp4",
    poster: "assets/images/site-red-film-face-formwork-03.jpg",
    headline: "Direct Seaport Timber Buffer & Quality Inspection",
    badge: "Stock Inspection • CBM Buffer",
    desc: "On-site walkthrough of certified imported pinewood bundles and densified film-faced shuttering plywood stacks ready for immediate loading."
  }
];

let sawActiveVideoIndex = 0;

window.sawSwitchVideoMode = function (mode) {
  const tabCinema = document.getElementById('tabModeCinema');
  const tabMascot = document.getElementById('tabModeMascot');
  const modeCinema = document.getElementById('modeCinemaContent');
  const modeMascot = document.getElementById('modeMascotContent');

  if (mode === 'cinema') {
    tabCinema?.classList.add('active');
    tabMascot?.classList.remove('active');
    modeCinema?.classList.add('active');
    modeMascot?.classList.remove('active');
  } else {
    tabMascot?.classList.add('active');
    tabCinema?.classList.remove('active');
    modeMascot?.classList.add('active');
    modeCinema?.classList.remove('active');
  }
};

function updatePlayButtonState(isPlaying) {
  const theaterBox = document.getElementById('cinemaTheaterBox');
  const playTri = document.getElementById('iconPlayTriangle');
  const pauseBars = document.getElementById('iconPauseBars');

  if (isPlaying) {
    theaterBox?.classList.add('is-playing');
    if (playTri) playTri.style.display = 'none';
    if (pauseBars) pauseBars.style.display = 'block';
  } else {
    theaterBox?.classList.remove('is-playing');
    if (playTri) playTri.style.display = 'block';
    if (pauseBars) pauseBars.style.display = 'none';
  }
}

window.sawSelectVideo = function (index) {
  if (index < 0 || index >= SAW_VIDEOS.length) return;
  sawActiveVideoIndex = index;
  const vidData = SAW_VIDEOS[index];
  const videoEl = document.getElementById('spotlightVideo');
  const headlineEl = document.getElementById('cinemaActiveHeadline');
  const badgeEl = document.getElementById('cinemaLiveBadgeText');
  const descEl = document.getElementById('cinemaActiveDesc');
  const theaterBox = document.getElementById('cinemaTheaterBox');

  document.querySelectorAll('.video-card').forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });

  if (headlineEl) headlineEl.textContent = vidData.headline;
  if (badgeEl) badgeEl.textContent = vidData.badge;
  if (descEl) descEl.textContent = vidData.desc;

  if (videoEl) {
    videoEl.pause();
    videoEl.poster = vidData.poster;
    const sources = videoEl.querySelectorAll('source');
    if (sources.length > 0) {
      sources[0].src = vidData.src;
      if (sources[1]) sources[1].src = vidData.fallback || vidData.src;
    }
    videoEl.src = vidData.src;
    videoEl.load();
    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        theaterBox?.classList.add('is-playing');
        updatePlayButtonState(true);
      }).catch(() => {
        // Fallback for autoplay compliance: ensure muted and retry
        videoEl.muted = true;
        videoEl.play().then(() => {
          theaterBox?.classList.add('is-playing');
          updatePlayButtonState(true);
        }).catch(() => {
          updatePlayButtonState(false);
        });
      });
    }
  }
};

window.sawToggleVideoAudio = function () {
  const videoEl = document.getElementById('spotlightVideo');
  const btnSound = document.getElementById('btnVideoSound');
  const iconMuted = document.getElementById('iconSoundMuted');
  const iconActive = document.getElementById('iconSoundActive');
  const lblSound = document.getElementById('lblSoundStatus');

  if (!videoEl) return;

  videoEl.muted = !videoEl.muted;

  if (videoEl.muted) {
    btnSound?.classList.remove('unmuted');
    if (iconMuted) iconMuted.style.display = 'block';
    if (iconActive) iconActive.style.display = 'none';
    if (lblSound) lblSound.textContent = 'Unmute Video';
  } else {
    btnSound?.classList.add('unmuted');
    if (iconMuted) iconMuted.style.display = 'none';
    if (iconActive) iconActive.style.display = 'block';
    if (lblSound) lblSound.textContent = 'Video Audio ON';
  }
};

window.sawToggleVideoPlayback = function () {
  const videoEl = document.getElementById('spotlightVideo');
  if (!videoEl) return;

  if (videoEl.paused) {
    videoEl.play().then(() => {
      updatePlayButtonState(true);
    }).catch(() => {
      updatePlayButtonState(false);
    });
  } else {
    videoEl.pause();
    updatePlayButtonState(false);
  }
};

/* Professional Studio Cinematic Audio & Background Music Engine */
let sawIsBgmPlaying = false;
let sawBgmAutoAttempted = false;

window.sawStartBgmAuto = function () {
  if (sawIsBgmPlaying || sawBgmAutoAttempted) return;
  sawBgmAutoAttempted = true;
  const audio = document.getElementById('cinemaBgmAudio');
  const btnBgm = document.getElementById('btnBgmMusic');
  const lblBgm = document.getElementById('lblBgmStatus');
  if (!audio) return;

  audio.volume = 0.55;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      sawIsBgmPlaying = true;
      btnBgm?.classList.add('playing');
      if (lblBgm) lblBgm.textContent = 'Cinematic Music: ON ♪';
    }).catch(() => {
      // Browser autoplay restriction: listen for first interaction gesture to start
      const unlockAudio = () => {
        if (!sawIsBgmPlaying) {
          audio.volume = 0.55;
          audio.play().then(() => {
            sawIsBgmPlaying = true;
            btnBgm?.classList.add('playing');
            if (lblBgm) lblBgm.textContent = 'Cinematic Music: ON ♪';
          }).catch(() => {});
        }
        ['click', 'touchstart', 'scroll', 'keydown'].forEach((evt) => {
          window.removeEventListener(evt, unlockAudio);
        });
      };
      ['click', 'touchstart', 'scroll', 'keydown'].forEach((evt) => {
        window.addEventListener(evt, unlockAudio, { passive: true, once: true });
      });
    });
  }
};

window.sawToggleBgm = function (forceState) {
  const audio = document.getElementById('cinemaBgmAudio');
  const btnBgm = document.getElementById('btnBgmMusic');
  const lblBgm = document.getElementById('lblBgmStatus');
  if (!audio) return;

  const targetPlay = typeof forceState === 'boolean' ? forceState : !sawIsBgmPlaying;

  if (targetPlay) {
    audio.volume = 0.55;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        sawIsBgmPlaying = true;
        btnBgm?.classList.add('playing');
        if (lblBgm) lblBgm.textContent = 'Cinematic Music: ON ♪';
      }).catch(() => {
        sawIsBgmPlaying = false;
        btnBgm?.classList.remove('playing');
        if (lblBgm) lblBgm.textContent = 'Cinematic Music: Tap to Play';
      });
    }
  } else {
    audio.pause();
    sawIsBgmPlaying = false;
    btnBgm?.classList.remove('playing');
    if (lblBgm) lblBgm.textContent = 'Cinematic Music: OFF';
  }
};

/* Foreman Vikram Cartoon Mascot Presentation Data & Controls */
const STORY_CHAPTERS = [
  {
    chapterNum: "Chapter 01 of 05 • The Gandhidham Timber Hub",
    title: "Namaste! Welcome to India's Direct Port-Based Timber Source",
    speech: "Hello contractors, developers, and engineers! I’m Foreman Vikram. For over 15+ years, <strong>Shashwat Ashapura Woods</strong> has supplied first-grade imported pinewood and shuttering plywood straight from our 15,000+ MT stocking yards near Kandla &amp; Mundra Ports! We cut out brokers so your jobsite gets certified timber at unbeatable mill prices.",
    metrics: [
      { num: "15+ Yrs", label: "Industry Heritage" },
      { num: "15,000 MT", label: "Ready Yard Stock" },
      { num: "24-48 Hrs", label: "Pan-India Dispatch" }
    ]
  },
  {
    chapterNum: "Chapter 02 of 05 • Global Procurement",
    title: "Sourcing 6 World-Class Pine Conifer Species",
    speech: "We import directly from FSC-certified sustainable plantations across New Zealand, Europe, North America, and Australia! From dense Southern Yellow Pine (SYP) for colossal beam loads, to European Spruce and Maritime Pine for clean shuttering frames — we stock every density class your project blueprints demand.",
    metrics: [
      { num: "6 Species", label: "Imported Conifers" },
      { num: "100% Legal", label: "FSC / PEFC Certified" },
      { num: "Grade A", label: "Structural Select logs" }
    ]
  },
  {
    chapterNum: "Chapter 03 of 05 • Flagship Brands",
    title: "WudPlus™ Film-Faced Plywood & COMMANDO™ Pine Runners",
    speech: "When you pour concrete, you cannot afford warped boards or honeycombing! Our signature <strong>WudPlus™ 34kg &amp; 30kg</strong> shuttering plywood withstands 30+ repetitions with mirror-like finish. Paired with our <strong>COMMANDO™</strong> calibrated pine runners, your staging never bows or cracks under pressure.",
    metrics: [
      { num: "30+ Reps", label: "Mirror Concrete Pours" },
      { num: "72 Hrs", label: "BWR/BWP Boil Proof" },
      { num: "Zero Swell", label: "Calibrated Core Plies" }
    ]
  },
  {
    chapterNum: "Chapter 04 of 05 • Mill Yard Processing",
    title: "Automated German Gang-Saws & Kiln Seasoning",
    speech: "At our Gandhidham facility, German band-saws cut logs into custom runners, walers, and battens within ±0.5mm tolerance. Every piece passes through automated chemical dipping tanks for anti-termite protection and computerized dry kilns ensuring optimal 12-14% moisture content.",
    metrics: [
      { num: "±0.5 mm", label: "Precision Tolerance" },
      { num: "12-14%", label: "Kiln-Dried Moisture" },
      { num: "Vacuum Dip", label: "Anti-Borer Treatment" }
    ]
  },
  {
    chapterNum: "Chapter 05 of 05 • Zero-Broker Logistics",
    title: "Direct Port-to-Site Fleet Across 28 Indian States",
    speech: "No middle-man commissions, no hidden freight fees! We load directly from Kandla Port onto dedicated multi-axle trailers. Whether you need 10 truckloads in Ahmedabad, Mumbai, Bangalore, or Delhi — we deliver on schedule with computerized weighbridge slips and GST invoicing.",
    metrics: [
      { num: "Pan-India", label: "Direct Freight Fleet" },
      { num: "Zero Broker", label: "Factory Direct Rates" },
      { num: "100% GST", label: "Transparent Billing" }
    ]
  }
];

let sawCurrentChapter = 0;
let sawStoryAutoTimer = null;

window.sawGoToChapter = function (index) {
  if (index < 0 || index >= STORY_CHAPTERS.length) return;
  sawCurrentChapter = index;
  const chapterData = STORY_CHAPTERS[index];

  const stepper = document.getElementById('storyChapterStepper');
  if (stepper) {
    const pills = stepper.querySelectorAll('.step-pill');
    pills.forEach((p, i) => p.classList.toggle('active', i === index));
  }

  const numEl = document.getElementById('storyChapterNum');
  const titleEl = document.getElementById('storyTitle');
  const speechEl = document.getElementById('storySpeech');
  const metricsEl = document.getElementById('storyMetrics');

  if (numEl) numEl.textContent = chapterData.chapterNum;
  if (titleEl) titleEl.textContent = chapterData.title;
  if (speechEl) speechEl.innerHTML = `&ldquo;${chapterData.speech}&rdquo;`;

  if (metricsEl) {
    metricsEl.innerHTML = chapterData.metrics.map(m => `
      <div class="story-stat-card">
        <span class="stat-big">${m.num}</span>
        <span>${m.label}</span>
      </div>
    `).join('');
  }
};

window.sawNextChapter = function () {
  const nextIdx = (sawCurrentChapter + 1) % STORY_CHAPTERS.length;
  window.sawGoToChapter(nextIdx);
};

window.sawPrevChapter = function () {
  const prevIdx = (sawCurrentChapter - 1 + STORY_CHAPTERS.length) % STORY_CHAPTERS.length;
  window.sawGoToChapter(prevIdx);
};

window.sawToggleStoryAuto = function () {
  const badge = document.getElementById('storyAutoBadge');
  const btn = document.getElementById('btnToggleAutoStory');

  if (sawStoryAutoTimer) {
    clearInterval(sawStoryAutoTimer);
    sawStoryAutoTimer = null;
    if (badge) badge.textContent = 'Auto-Play: OFF';
    if (btn) btn.textContent = 'Play Tour •';
  } else {
    if (badge) badge.textContent = 'Auto-Play: ON (5s)';
    if (btn) btn.textContent = 'Pause Tour ❚❚';
    sawStoryAutoTimer = setInterval(() => {
      window.sawNextChapter();
    }, 5500);
  }
};

/* ==========================================================================
   STRUCTURE SLAB SHUTTERING SLIDER (Section 08 / Brand Philosophy)
   Continuous 1.5s Auto-Sliding Loop
   ========================================================================== */
(function initStructureSlabSlider() {
  function setup() {
    const slider = document.getElementById('introSlabSlider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.intro-slide');
    const dots = slider.querySelectorAll('.intro-dot');
    const prevBtn = document.getElementById('introSliderPrev');
    const nextBtn = document.getElementById('introSliderNext');
    if (slides.length === 0) return;

    let currentIndex = 0;
    let autoTimer = null;
    const SLIDE_INTERVAL = 1500; // 1.5 seconds per slide duration

    function goToSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentIndex);
      });
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    function nextSlide() {
      // Loop sequentially: 0 -> 1 -> 2 -> 3 -> 4 -> 0
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(nextSlide, SLIDE_INTERVAL);
    }

    function stopAuto() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    window._sawNextIntroSlideImpl = () => { nextSlide(); startAuto(); };
    window._sawPrevIntroSlideImpl = () => { prevSlide(); startAuto(); };
    window._sawGoToIntroSlideImpl = (idx) => { goToSlide(idx); startAuto(); };

    prevBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
      startAuto();
    });

    nextBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
      startAuto();
    });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(idx);
        startAuto();
      });
    });

    // Ensure continuous auto-sliding without requiring user interaction
    // Page visibility listener restarts cleanly when tab is focused
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAuto();
      } else {
        startAuto();
      }
    });

    // Start auto sliding immediately without user interaction
    startAuto();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
