/**
 * ============================================================
 * CV — Alfredo Pablo García
 * app.js  |  Logic layer only — zero style declarations
 * ============================================================
 *
 * Modules
 * -------
 * 1.  Config & data
 * 2.  SidebarSkillBars   — animate sidebar progress bars on load
 * 3.  SkillBarObserver   — animate main skill bars on scroll enter
 * 4.  RevealObserver     — fade-in sections as they enter viewport
 * 5.  ActiveNavObserver  — sync nav highlight + topbar breadcrumb
 * 6.  AvatarLoader       — call Claude API for Ghibli SVG (fallback: real photo)
 * 7.  Bootstrap          — wire everything up on DOMContentLoaded
 * ============================================================
 */

'use strict';

/* ============================================================
   1. CONFIG & DATA
   ============================================================ */

const CONFIG = {
  avatar: {
    /** Set to true to use the real photo embedded in the HTML.
     *  Set to false to attempt a Claude-generated Ghibli SVG.   */
    useRealPhoto: true,
    apiModel: 'claude-sonnet-4-20250514',
    apiMaxTokens: 1500,
    apiPrompt: `Create a pure SVG (only SVG primitives, no external images) of a
Studio Ghibli anime-style portrait. Subject: young Mexican male software
engineer ~25 years old, dark hair, warm brown skin, friendly intelligent
expression, dark blue shirt. Style: Hayao Miyazaki — large expressive eyes
with shine, rosy cheeks, soft features, sky blue watercolor background with
fluffy clouds. Portrait from shoulders up, viewBox="0 0 104 104". Make it
detailed and beautiful. Return ONLY the SVG element starting <svg and ending
</svg>. No markdown, no explanation.`,
  },

  observers: {
    /** IntersectionObserver thresholds */
    skillBars:   { threshold: 0.30 },
    reveal:      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    activeNav:   { threshold: 0.40 },
  },

  /** Map section id → human-readable breadcrumb label */
  sectionLabels: {
    hero:       'inicio',
    profile:    'perfil',
    experience: 'experiencia',
    skills:     'habilidades',
    certs:      'certificaciones',
    education:  'educación',
    contact:    'contacto',
  },

  /** Delay (ms) before starting sidebar bars animation on load */
  sidebarBarDelay: 600,

  /** Delay (ms) before skill bar fills when entering viewport */
  skillBarDelay: 200,
};


/* ============================================================
   2. SIDEBAR SKILL BARS
   — Animate progress bars inside the sidebar on page load.
   ============================================================ */

class SidebarSkillBars {
  constructor(selector = '.sb-bar-fill') {
    this.elements = document.querySelectorAll(selector);
  }

  /** Kick off animation after a brief delay so the page has painted. */
  init() {
    setTimeout(() => this._animate(), CONFIG.sidebarBarDelay);
  }

  _animate() {
    this.elements.forEach(el => {
      el.style.width = this._getTarget(el);
    });
  }

  /** Read the desired width from the data-w attribute (e.g. "88" → "88%"). */
  _getTarget(el) {
    const raw = el.getAttribute('data-w');
    return raw ? `${raw}%` : '0%';
  }
}


/* ============================================================
   3. SKILL BAR OBSERVER
   — Animate main-content skill bars when their parent card
     scrolls into the viewport.
   ============================================================ */

class SkillBarObserver {
  constructor(cardSelector = '.skill-group') {
    this.cardSelector = cardSelector;
    this.observer = null;
  }

  init() {
    this.observer = new IntersectionObserver(
      entries => this._onIntersect(entries),
      CONFIG.observers.skillBars
    );

    document.querySelectorAll(this.cardSelector).forEach(card => {
      this.observer.observe(card);
    });
  }

  _onIntersect(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      /* Animate every [data-w] bar inside the entering card. */
      entry.target.querySelectorAll('[data-w]').forEach(bar => {
        setTimeout(() => {
          bar.style.width = `${bar.getAttribute('data-w')}%`;
        }, CONFIG.skillBarDelay);
      });

      /* Unobserve so the animation only fires once. */
      this.observer.unobserve(entry.target);
    });
  }
}


/* ============================================================
   4. REVEAL OBSERVER
   — Fade-in + slide-up elements with class `.reveal` as they
     enter the viewport.
   ============================================================ */

class RevealObserver {
  constructor(selector = '.reveal') {
    this.selector = selector;
    this.observer = null;
  }

  init() {
    this.observer = new IntersectionObserver(
      entries => this._onIntersect(entries),
      CONFIG.observers.reveal
    );

    document.querySelectorAll(this.selector).forEach(el => {
      this.observer.observe(el);
    });
  }

  _onIntersect(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      this.observer.unobserve(entry.target);
    });
  }
}


/* ============================================================
   5. ACTIVE NAV OBSERVER
   — Keeps the sidebar navigation link and topbar breadcrumb
     in sync with the currently visible section.
   ============================================================ */

class ActiveNavObserver {
  constructor() {
    this.navLinks        = document.querySelectorAll('.sb-nav-link');
    this.breadcrumbEl    = document.getElementById('bc-current');
    this.sectionEls      = document.querySelectorAll('section[id]');
    this.observer        = null;
  }

  init() {
    this.observer = new IntersectionObserver(
      entries => this._onIntersect(entries),
      CONFIG.observers.activeNav
    );

    this.sectionEls.forEach(section => this.observer.observe(section));
  }

  _onIntersect(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;
      this._highlightNavLink(id);
      this._updateBreadcrumb(id);
    });
  }

  _highlightNavLink(activeId) {
    this.navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('is-active', isActive);
    });
  }

  _updateBreadcrumb(sectionId) {
    if (!this.breadcrumbEl) return;
    const label = CONFIG.sectionLabels[sectionId] ?? sectionId;
    this.breadcrumbEl.textContent = label;
  }
}


/* ============================================================
   6. AVATAR LOADER
   — If CONFIG.avatar.useRealPhoto is false, call the Claude
     API to generate a Ghibli-style SVG and inject it into the
     avatar slot.  Falls back silently on any error.
   ============================================================ */

class AvatarLoader {
  constructor(avatarContainerId = 'avatar-container') {
    this.container = document.getElementById(avatarContainerId);
  }

  async init() {
    if (CONFIG.avatar.useRealPhoto) {
      /* Real photo is already in the HTML — nothing to do. */
      return;
    }

    try {
      const svgMarkup = await this._fetchGhibliSVG();
      if (svgMarkup) this._inject(svgMarkup);
    } catch (err) {
      console.warn('[AvatarLoader] Could not load Ghibli avatar:', err.message);
    }
  }

  async _fetchGhibliSVG() {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model:      CONFIG.avatar.apiModel,
        max_tokens: CONFIG.avatar.apiMaxTokens,
        messages:   [{ role: 'user', content: CONFIG.avatar.apiPrompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }

    const data    = await response.json();
    const rawText = (data.content ?? [])
      .map(block => block.text ?? '')
      .join('')
      .trim();

    /* Extract the <svg>…</svg> block from the response. */
    const match = rawText.match(/<svg[\s\S]*<\/svg>/i);
    return match ? match[0] : null;
  }

  _inject(svgMarkup) {
    if (!this.container) return;

    const parser = new DOMParser();
    const doc    = parser.parseFromString(svgMarkup, 'image/svg+xml');
    const svgEl  = doc.querySelector('svg');

    if (!svgEl) return;

    /* Normalise dimensions so it fills the circular container. */
    svgEl.setAttribute('viewBox', svgEl.getAttribute('viewBox') ?? '0 0 104 104');
    svgEl.style.cssText = 'width:100%;height:100%;display:block;border-radius:50%;';

    this.container.innerHTML = '';
    this.container.appendChild(svgEl);
  }
}


/* ============================================================
   7. BOOTSTRAP
   — Instantiate every module and call .init() once the DOM
     is fully parsed.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  new SidebarSkillBars().init();
  new SkillBarObserver().init();
  new RevealObserver().init();
  new ActiveNavObserver().init();
  new AvatarLoader().init();
});
