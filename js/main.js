/* ============================================================
   KESAN Website — Main JavaScript
   All interactive behaviour lives here.
   ============================================================ */


/* ── 1. NAV: Scroll shadow & mobile hamburger ── */

const nav = document.getElementById('mainNav');

// Add a slightly darker background when user scrolls down
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Toggle the mobile dropdown menu
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
  });
});


/* ── 2. ACTIVE NAV LINK — highlights the current page ── */

(function markActivePage() {
  // Get the filename from the URL, default to 'index.html'
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';

  // Map filenames to nav link hrefs
  // ← ADD NEW PAGES HERE if you create more
  const pageMap = {
    'index.html': 'Home',
    'journey.html': 'Mentoring Journey',
    'programs.html': 'Programs',
    '': 'Home'               // handles root path
  };

  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop();

    // Mark as active if the href filename matches the current page
    if (linkFile === page || (page === '' && linkFile === 'index.html')) {
      link.classList.add('nav-active');
    }
  });
})();


/* ── 3. SCROLL REVEAL — fades elements up as they enter viewport ── */

(function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop watching once revealed (one-shot animation)
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
})();


/* ── 4. GLITCH COUNTER ANIMATION (Impact section) ── */

/*
   How it works:
   - Phase 1 (0–60% of frames): Display random characters to simulate a "glitch"
   - Phase 2 (60–100% of frames): Count up from 0 to the real target number
   
   To change stats: edit data-target and data-suffix on each .stat-number element in index.html
*/

function animateCounter(el) {
  const target  = parseInt(el.dataset.target, 10);
  const suffix  = el.dataset.suffix || '';
  const glyphSet = '0123456789#@%&?!';
  const totalFrames  = 50;
  const glitchFrames = Math.floor(totalFrames * 0.6);  // first 60% = glitch
  let frame = 0;

  const interval = setInterval(() => {
    if (frame < glitchFrames) {
      // ── Glitch phase: random characters ──
      const digits = String(target).length;
      let glitch = '';
      for (let i = 0; i < digits; i++) {
        glitch += glyphSet[Math.floor(Math.random() * glyphSet.length)];
      }
      el.textContent = glitch + suffix;
      el.style.color = frame % 3 === 0 ? 'var(--gold)' : 'rgba(255,222,89,0.35)';
    } else {
      // ── Count-up phase ──
      const progress = (frame - glitchFrames) / (totalFrames - glitchFrames);
      el.textContent = Math.floor(progress * target) + suffix;
      el.style.color = 'var(--gold)';
    }

    frame++;
    if (frame >= totalFrames) {
      clearInterval(interval);
      el.textContent = target + suffix;   // ensure exact final value
      el.style.color = 'var(--gold)';
    }
  }, 32); // ~30fps for smooth animation
}

// Trigger counter when the stat card scrolls into view
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;  // only runs on index.html

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
})();


/* ── 5. PROGRAMS FILTER (programs.html only) ── */

/*
   Clicking a filter button shows/hides program cards by data-category.
   Each .program-card should have: data-category="personal|team|community"
*/

function filterPrograms(category, btn) {
  // Update active button style
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Show/hide cards
  document.querySelectorAll('.program-card').forEach(card => {
    const matches = category === 'all' || card.dataset.category === category;
    // Animate in/out with opacity transition
    if (matches) {
      card.style.display = 'flex';
      // Small delay so display:flex renders before opacity transition
      requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px)';
      setTimeout(() => { card.style.display = 'none'; }, 300);
    }
  });
}
