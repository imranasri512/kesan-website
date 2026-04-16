/* ============================================================
   KESAN Website — Main JavaScript  (js/main.js)

   This file handles ALL interactive behaviour.
   Content data (programs, institutions) lives in js/data.js.
   ============================================================ */


/* ════════════════════════════════════════════════════════════
   1. NAVIGATION — scroll shadow + mobile hamburger
   ════════════════════════════════════════════════════════════ */

const nav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
  });
});


/* ════════════════════════════════════════════════════════════
   2. ACTIVE NAV LINK
   ════════════════════════════════════════════════════════════ */

(function markActivePage() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const linkFile = (link.getAttribute('href') || '').split('/').pop();
    if (linkFile === page || (page === '' && linkFile === 'index.html')) {
      link.classList.add('nav-active');
    }
  });
})();


/* ════════════════════════════════════════════════════════════
   3. SCROLL REVEAL
   
   NOTE: This observer only watches elements that exist at
   page load. Dynamically injected cards (programs grid) use
   revealCards() below instead — do NOT add program cards here.
   ════════════════════════════════════════════════════════════ */

(function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Only observe elements already in the DOM (not program cards — those are dynamic)
  document.querySelectorAll('.scroll-reveal:not(.program-card)').forEach(el => observer.observe(el));
})();


/* ════════════════════════════════════════════════════════════
   4. GLITCH COUNTER ANIMATION (Home page Impact section)
   To change a stat: edit data-target / data-suffix in index.html
   ════════════════════════════════════════════════════════════ */

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const glyphSet = '0123456789#@%&?!';
  const totalFrames = 50;
  const glitchEnd = Math.floor(totalFrames * 0.6);
  let frame = 0;
  const interval = setInterval(() => {
    if (frame < glitchEnd) {
      let glitch = '';
      for (let i = 0; i < String(target).length; i++) {
        glitch += glyphSet[Math.floor(Math.random() * glyphSet.length)];
      }
      el.textContent = glitch + suffix;
      el.style.color = frame % 3 === 0 ? 'var(--gold)' : 'rgba(255,222,89,0.35)';
    } else {
      const progress = (frame - glitchEnd) / (totalFrames - glitchEnd);
      el.textContent = Math.floor(progress * target) + suffix;
      el.style.color = 'var(--gold)';
    }
    frame++;
    if (frame >= totalFrames) {
      clearInterval(interval);
      el.textContent = target + suffix;
      el.style.color = 'var(--gold)';
    }
  }, 32);
}

(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounter(entry.target); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
})();


/* ════════════════════════════════════════════════════════════
   5. INSTITUTION TICKER (Home page)
   Reads INSTITUTIONS array from data.js and builds the ticker.
   The list is duplicated for seamless CSS looping.
   ════════════════════════════════════════════════════════════ */

(function buildInstitutionTicker() {
  const track = document.getElementById('instTrack');
  if (!track || typeof INSTITUTIONS === 'undefined') return;

  function makeTile(inst) {
    const logoHtml = inst.logo
      ? `<img src="${inst.logo}" alt="${inst.name}" />`
      : `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="white" stroke-width="1.5">
           <rect x="4" y="10" width="24" height="18" rx="1"/>
           <path d="M16 2L2 10h28L16 2z"/>
           <rect x="12" y="18" width="8" height="10"/>
         </svg>`;
    return `<div class="inst-item">${logoHtml}<span>${inst.name}</span></div>`;
  }

  // Duplicate the list so the CSS scroll animation loops seamlessly
  const html = [...INSTITUTIONS, ...INSTITUTIONS].map(makeTile).join('');
  track.innerHTML = html;
})();


/* ════════════════════════════════════════════════════════════
   6. PROGRAMS PAGE — rendering, search, see more, overview capsule

   Reads from PROGRAMS array in data.js.
   Only runs on programs.html (checks for #programsGrid).

   WHY CARDS DON'T USE initScrollReveal()
   ────────────────────────────────────────
   initScrollReveal() runs once at page load and only watches
   elements already in the DOM at that moment. Program cards
   are injected *after* page load by renderCards(), so they
   would never be seen by that observer.

   Instead, revealCards() handles the animation directly:
   it adds 'program-card--visible' (not 'scroll-reveal') to
   each new card with a small staggered delay. This class
   is defined in style.css to make the card fully visible.
   ════════════════════════════════════════════════════════════ */

(function initProgramsPage() {
  const grid = document.getElementById('programsGrid');
  if (!grid || typeof PROGRAMS === 'undefined') return;

  const CARDS_PER_PAGE = 4; // ← change how many load before "See More"
  let visibleCount = CARDS_PER_PAGE;
  let filteredPrograms = [...PROGRAMS];


  /* ── Build one card's HTML string ──────────────────────── */
  function buildCard(p) {
    // Press release button — disabled style if no link yet
    const pressBtn = p.pressLink
      ? `<a href="${p.pressLink}" target="_blank" class="press-btn">
           <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
           <polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/>
           <line x1="16" y1="17" x2="8" y2="17"/></svg>Read Press Release</a>`
      : `<span class="press-btn press-btn--disabled">
           <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
           <polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/>
           <line x1="16" y1="17" x2="8" y2="17"/></svg>Press Release Coming</span>`;

    // highlights array → <li> items (supports any number of bullets)
    const highlights = p.highlights.map(h => `<li>${h}</li>`).join('');

    // Note: cards use class "program-card" only — NOT "scroll-reveal"
    // Animation is handled by revealCards() using "program-card--visible"
    return `
      <div class="program-card">
        <div class="program-photos">
          <img src="${p.photo}" alt="${p.name}" />
          <span class="program-photos-badge">Program Photos</span>
          <!-- Overview capsule: slides up on hover. Text from data.js 'overview' field. -->
          <div class="program-overview-capsule">
            <p class="program-overview-text">${p.overview}</p>
          </div>
        </div>
        <div class="program-header">
          <span class="program-number">Program ${p.id}</span>
          <h3>${p.name}</h3>
          <p>${p.tagline}</p>
        </div>
        <div class="program-meta">
          <div class="meta-stat">
            <strong>${p.participants}</strong>
            <span>Participants</span>
          </div>
          <div class="meta-divider"></div>
          <div class="meta-stat">
            <strong class="meta-date">${p.date}</strong>
            <span>Date</span>
          </div>
        </div>
        <div class="program-body">
          <h4>Press Release Highlights</h4>
          <p>${p.pressRelease}</p>
          <ul class="program-highlights">${highlights}</ul>
        </div>
        <div class="program-footer">${pressBtn}</div>
      </div>`;
  }


  /* ── Animate newly added cards in ─────────────────────── */
  /*
     Each card starts hidden (opacity 0, shifted down).
     revealCards() adds 'program-card--visible' with a staggered
     delay so cards pop in one after another, not all at once.
     The CSS for .program-card and .program-card--visible is in style.css.
  */
  function revealCards() {
    grid.querySelectorAll('.program-card:not(.program-card--visible)').forEach((card, i) => {
      setTimeout(() => {
        card.classList.add('program-card--visible');
      }, i * 80); // 80ms stagger between each card
    });
  }


  /* ── Render the current visible slice into the grid ────── */
  function renderCards() {
    grid.innerHTML = filteredPrograms.slice(0, visibleCount).map(buildCard).join('');
    revealCards();
    updateSeeMoreButton();
    updateResultCount();
  }


  /* ── "See More" button ─────────────────────────────────── */
  function updateSeeMoreButton() {
    const btn = document.getElementById('seeMoreBtn');
    if (!btn) return;
    const remaining = filteredPrograms.length - visibleCount;
    btn.style.display = remaining <= 0 ? 'none' : 'inline-flex';
    btn.textContent = `See More  (${remaining} more)`;
  }

  const seeMoreBtn = document.getElementById('seeMoreBtn');
  if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', () => {
      visibleCount += CARDS_PER_PAGE;
      renderCards();
    });
  }


  /* ── Result count label ────────────────────────────────── */
  function updateResultCount() {
    const label = document.getElementById('resultCount');
    if (!label) return;
    const shown = Math.min(visibleCount, filteredPrograms.length);
    const total = filteredPrograms.length;
    label.textContent = total === PROGRAMS.length
      ? `Showing ${shown} of ${total} programs`
      : `${total} result${total !== 1 ? 's' : ''} — showing ${shown}`;
  }


  /* ── Search ────────────────────────────────────────────── */
  /*
     Searches: name, tagline, date, overview, press release, highlights.
     Live — updates on every keystroke.
  */
  const searchInput = document.getElementById('programSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      filteredPrograms = !q ? [...PROGRAMS] : PROGRAMS.filter(p =>
        [p.name, p.tagline, p.date, p.overview, p.pressRelease, ...p.highlights]
          .join(' ').toLowerCase().includes(q)
      );
      visibleCount = CARDS_PER_PAGE;
      renderCards();
    });
  }


  /* ── Initial render ────────────────────────────────────── */
  renderCards();

})();











/* ════════════════════════════════════════════════════════════
   7. ORGANISATIONAL CHART — SVG-BASED RENDERER

   HOW IT WORKS
   ─────────────
   Instead of fighting CSS layout for connector lines, we:

   1. Calculate exact (x, y) pixel positions for every node
      mathematically — no browser layout involved.

   2. Inject HTML cards into a position:relative container,
      placed with position:absolute + left/top.

   3. Draw an SVG layer (same size as the container) behind
      the cards, with <line> elements connecting each node
      centre to the horizontal trunk line above it.

   This means connector lines are ALWAYS correct regardless
   of scroll position, viewport size, or rendering order.

   LAYOUT MATHS
   ─────────────
   Row 0: President — centred
   Row 1: tier2 (Secretary, Finance) — centred group
   Row 2: tier3 (Heads + co-heads) — centred group

   All rows share one vertical trunk line coming from President.
   Each node gets a vertical drop from the trunk to itself.
   Secretary/Finance drop is SHORT; Heads drop is LONG —
   creating the two-level visual while all lines still
   connect only to the trunk from President.

   RESPONSIVE
   ───────────
   On screens < 900px the chart switches to a simple vertical
   stacked list — no SVG, just flex column with indent lines.
   ════════════════════════════════════════════════════════════ */

(function buildOrgChart() {
  const container = document.getElementById('orgChart');
  if (!container || typeof ORG_CHART === 'undefined') return;

  /* ── Layout constants — tweak these to adjust spacing ── */
  const CARD_W        = 155;  // card width  (px) — ← adjust to taste
  const CARD_H        = 190;  // card height (px) — photo + text
  const COL_GAP       = 40;   // horizontal gap between cards — ← increase for more breathing room
  const ROW_GAP_SHORT = 60;   // vertical gap: trunk → tier-2 cards (Secretary, Finance)
  const ROW_GAP_LONG  = 320;  // vertical gap: trunk → tier-3 cards (Heads) — must be > ROW_GAP_SHORT + CARD_H
  const TRUNK_Y       = CARD_H + 50; // y of the horizontal trunk line
  const LINE_COLOR    = 'rgba(255,222,89,0.45)';
  const LINE_WIDTH    = 2;

  /* ── Build node list with positions ─────────────────── */
  /*
     We calculate positions in two passes:
     Pass 1: measure total width needed for each row group.
     Pass 2: assign absolute x positions centred on canvas.
  */

  // Flatten tier3 into individual cards (co-heads are separate cards)
  const tier3Cards = [];
  (ORG_CHART.tier3 || []).forEach(group => {
    tier3Cards.push({ ...group, groupId: group.role });
    if (group.co) tier3Cards.push({ ...group.co, groupId: group.role });
  });

  const tier2Cards = ORG_CHART.tier2 || [];

  // Total width of a row of N cards
  function rowWidth(n) {
    return n * CARD_W + (n - 1) * COL_GAP;
  }

  // Canvas width = widest row + padding
  const PADDING     = 80;  // outer padding around the whole canvas
  const tier2Width  = rowWidth(tier2Cards.length);
  const tier3Width  = rowWidth(tier3Cards.length);
  const canvasWidth = Math.max(CARD_W, tier2Width, tier3Width) + PADDING * 2;
  const centreX     = canvasWidth / 2;

  // X position of card i in a row of n cards (left edge)
  function cardX(i, n) {
    const total = rowWidth(n);
    const startX = centreX - total / 2;
    return startX + i * (CARD_W + COL_GAP);
  }

  // Card centre X
  function cardCX(i, n) { return cardX(i, n) + CARD_W / 2; }

  /* ── Calculate canvas height ─────────────────────────── */
  const presY   = PADDING;
  const trunkY  = presY + CARD_H + 36;          // horizontal trunk y
  const tier2Y  = trunkY + ROW_GAP_SHORT;       // tier2 card top
  const tier3Y  = trunkY + ROW_GAP_LONG;        // tier3 card top
  const canvasH = tier3Y + CARD_H + PADDING;


  /* ── Build card HTML ─────────────────────────────────── */
  function buildCard(person, tier, x, y) {
    const name  = person.name || '';
    const photo = person.photo
      ? `<img src="${person.photo}" alt="${name}" />`
      : `<div class="org-photo-placeholder">
           <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5">
             <circle cx="12" cy="8" r="4"/>
             <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/>
           </svg>
         </div>`;

    return `
      <div class="org-node-wrap org-node--tier-${tier}"
           style="position:absolute; left:${x}px; top:${y}px; width:${CARD_W}px;">
        <div class="org-node">
          <div class="org-photo-wrap">${photo}</div>
          <div class="org-text">
            <div class="org-role">${person.role}</div>
            <div class="org-name">${name}</div>
          </div>
        </div>
        <div class="org-details">
          <div class="org-details-inner">
            <div class="org-details-role">${person.role}</div>
            <div class="org-details-name">${name || 'TBA'}</div>
            <p class="org-details-bio">${person.bio}</p>
          </div>
        </div>
      </div>`;
  }


  /* ── Build SVG lines ─────────────────────────────────── */
  function buildSVG(lines) {
    const lineEls = lines.map(l =>
      `<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}"
             stroke="${LINE_COLOR}" stroke-width="${LINE_WIDTH}"
             stroke-linecap="round"/>`
    ).join('\n');

    return `
      <svg class="org-svg"
           width="${canvasWidth}" height="${canvasH}"
           viewBox="0 0 ${canvasWidth} ${canvasH}"
           xmlns="http://www.w3.org/2000/svg"
           style="position:absolute;top:0;left:0;pointer-events:none;">
        ${lineEls}
      </svg>`;
  }


  /* ── Render ──────────────────────────────────────────── */
  function render() {
    let cardsHTML = '';
    const lines   = [];

    /* President */
    const presX   = centreX - CARD_W / 2;
    const presCX  = centreX;
    const presBotY = presY + CARD_H;  // bottom of president card
    cardsHTML += buildCard(ORG_CHART, 1, presX, presY);

    /* Vertical from President down to trunk */
    lines.push({ x1: presCX, y1: presBotY, x2: presCX, y2: trunkY });

    /* Determine x span of trunk:
       covers from leftmost column to rightmost column of ALL nodes */
    const allN    = tier2Cards.length + tier3Cards.length;
    // We'll compute trunk span after placing all columns

    const allCentres = [];

    /* Tier 2 cards */
    tier2Cards.forEach((person, i) => {
      const x  = cardX(i, tier2Cards.length);
      const cx = cardCX(i, tier2Cards.length);
      cardsHTML += buildCard(person, 2, x, tier2Y);
      allCentres.push(cx);

      /* Vertical from trunk down to this card */
      lines.push({ x1: cx, y1: trunkY, x2: cx, y2: tier2Y });
    });

    /* Tier 3 cards */
    tier3Cards.forEach((person, i) => {
      const x  = cardX(i, tier3Cards.length);
      const cx = cardCX(i, tier3Cards.length);
      cardsHTML += buildCard(person, 3, x, tier3Y);
      allCentres.push(cx);

      /* Vertical from trunk down to this card */
      lines.push({ x1: cx, y1: trunkY, x2: cx, y2: tier3Y });
    });

    /* Horizontal trunk spanning all columns */
    if (allCentres.length >= 2) {
      const trunkLeft  = Math.min(...allCentres);
      const trunkRight = Math.max(...allCentres);
      lines.push({ x1: trunkLeft, y1: trunkY, x2: trunkRight, y2: trunkY });
    }

    /* Assemble container */
    container.style.position = 'relative';
    container.style.width    = canvasWidth + 'px';
    container.style.height   = canvasH + 'px';
    container.style.margin   = '0 auto';
    container.style.overflow = 'visible';

    container.innerHTML = buildSVG(lines) + cardsHTML;
  }

  render();


  /* ── Responsive: switch to stacked list on mobile ─── */
  /*
     On narrow screens the SVG chart is replaced by a simple
     indented vertical list — much more readable on phones.
  */
  function buildMobileChart() {
    let html = '<div class="org-mobile">';

    // President
    html += mobileCard(ORG_CHART, 0);

    // Tier 2
    (ORG_CHART.tier2 || []).forEach(p => {
      html += mobileCard(p, 1);
    });

    // Tier 3 (with co-heads)
    (ORG_CHART.tier3 || []).forEach(group => {
      html += mobileCard(group, 1);
      if (group.co) html += mobileCard(group.co, 1);
    });

    html += '</div>';
    return html;
  }

  function mobileCard(person, indent) {
    const name = person.name || 'TBA';
    return `
      <div class="org-mobile-card org-mobile-indent-${indent}">
        <div class="org-mobile-photo">
          ${person.photo
            ? `<img src="${person.photo}" alt="${name}" />`
            : `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                 <circle cx="12" cy="8" r="4"/>
                 <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/>
               </svg>`}
        </div>
        <div class="org-mobile-text">
          <div class="org-mobile-role">${person.role}</div>
          <div class="org-mobile-name">${name}</div>
          <div class="org-mobile-bio">${person.bio}</div>
        </div>
      </div>`;
  }

  function applyResponsive() {
    const isMobile = window.innerWidth < 900;
    if (isMobile) {
      container.removeAttribute('style');
      container.innerHTML = buildMobileChart();
    } else {
      render();
    }
  }

  applyResponsive();
  window.addEventListener('resize', applyResponsive);

})();


/* ════════════════════════════════════════════════════════════
   8. SUCCESS STORIES PAGE (stories.html)
   Reads SUCCESS_STORIES from data.js.
   Only runs when #storiesGrid exists on the page.
   ════════════════════════════════════════════════════════════ */

(function initStoriesPage() {
  const grid  = document.getElementById('storiesGrid');
  const empty = document.getElementById('storiesEmpty');
  if (!grid || typeof SUCCESS_STORIES === 'undefined') return;

  let filtered = [...SUCCESS_STORIES];

  function buildCard(s) {
    const photo = s.photo
      ? `<img src="${s.photo}" alt="${s.name}" />`
      : `<div class="story-photo-placeholder">
           <svg viewBox="0 0 24 24" fill="none" stroke-width="1">
             <circle cx="12" cy="9" r="5"/>
             <path d="M3 22c0-5 4-9 9-9s9 4 9 9"/>
           </svg>
         </div>`;

    const achievements = s.achievements.map(a => `<li>${a}</li>`).join('');

    return `
      <div class="story-card">
        <div class="story-photo">
          ${photo}
          <span class="story-cohort-badge">${s.cohort}</span>
        </div>
        <div class="story-body">
          <div class="story-name">${s.name}</div>
          <div class="story-role">${s.role}</div>
          <blockquote class="story-quote">&ldquo;${s.quote}&rdquo;</blockquote>
          <ul class="story-achievements">${achievements}</ul>
          <div class="story-full" id="story-full-${s.id}">${s.story}</div>
          <button class="story-toggle-btn" onclick="toggleStory('${s.id}', this)" aria-expanded="false">
            <span>Read More</span>
            <svg viewBox="0 0 24 24"><polyline points="6,9 12,15 18,9"/></svg>
          </button>
        </div>
      </div>`;
  }

  function render() {
    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (empty) empty.style.display = 'block';
    } else {
      if (empty) empty.style.display = 'none';
      grid.innerHTML = filtered.map(buildCard).join('');
      grid.querySelectorAll('.story-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('story-card--visible'), i * 80);
      });
    }
    const countEl = document.getElementById('storyCount');
    if (countEl) {
      const total = SUCCESS_STORIES.length;
      countEl.textContent = filtered.length === total
        ? `${total} ${total === 1 ? 'story' : 'stories'}`
        : `${filtered.length} of ${total} stories`;
    }
  }

  const searchInput = document.getElementById('storySearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      filtered = !q ? [...SUCCESS_STORIES] : SUCCESS_STORIES.filter(s =>
        [s.name, s.role, s.cohort, s.quote, s.story, ...s.achievements]
          .join(' ').toLowerCase().includes(q)
      );
      render();
    });
  }

  render();
})();

/* Toggle story full text — called from onclick in each card */
function toggleStory(id, btn) {
  const el = document.getElementById('story-full-' + id);
  if (!el) return;
  const open = el.classList.toggle('open');
  btn.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', String(open));
  btn.querySelector('span').textContent = open ? 'Read Less' : 'Read More';
}
