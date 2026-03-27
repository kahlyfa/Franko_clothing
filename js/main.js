/* ============================================================
   FRANKO CLOTHING — Global JavaScript
   ============================================================ */

/* ── CUSTOM CURSOR ── */
(function () {
  // const cursors = ['👟', '👕', '👟', '👕']; 
  let cursorIndex = 0;

  const el = document.createElement('div');
  el.id = 'cursor';
  el.textContent = cursors[0];
  document.body.appendChild(el);

  document.addEventListener('mousemove', e => {
    el.style.left = e.clientX + 'px';
    el.style.top  = e.clientY + 'px';
  });

  document.addEventListener('mouseover', e => {
    const t = e.target.closest('a, button, .product-card, .filter-btn, .hamburger');
    if (t) {
      cursorIndex = (cursorIndex + 1) % cursors.length;
      el.textContent = cursors[cursorIndex];
    }
  });

  document.addEventListener('mousedown', () => el.classList.add('clicking'));
  document.addEventListener('mouseup',   () => el.classList.remove('clicking'));
})();


/* ── CART COUNT (shared via localStorage) ── */
function getCartCount() {
  return parseInt(localStorage.getItem('franko_cart') || '0');
}
function setCartCount(n) {
  localStorage.setItem('franko_cart', n);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = n);
}

document.addEventListener('DOMContentLoaded', () => {

  // sync cart badge
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = getCartCount());

  // ── HAMBURGER MENU ──
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });

    // close on outside click
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });
  }

  // ── BUY BUTTONS ──
  document.querySelectorAll('.btn-buy').forEach(btn => {
    btn.addEventListener('click', () => {
      setCartCount(getCartCount() + 1);
      const orig = btn.innerHTML;
      btn.innerHTML = '✓ Added';
      btn.classList.add('added');
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.classList.remove('added');
      }, 1600);
    });
  });

  // ── WISHLIST TOGGLE ──
  document.querySelectorAll('.card-wish').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      btn.classList.toggle('liked');
    });
  });

  // ── FILTER BUTTONS ──
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.filter-bar');
      group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      document.querySelectorAll('.product-card[data-cat]').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.cat === filter) ? '' : 'none';
      });
    });
  });

  // ── SCROLL REVEAL ──
  const sr = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        sr.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.product-card, .value-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity .55s ease ${i * 0.08}s, transform .55s ease ${i * 0.08}s, box-shadow .32s`;
    sr.observe(el);
  });

  // ── NAV ACTIVE LINK ──
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === current) a.classList.add('active');
  });

  // ── PAGE INDICATOR ACTIVE ──
  document.querySelectorAll('.pi-item').forEach(item => {
    const href = item.getAttribute('href').split('/').pop();
    if (href === current) item.classList.add('active');
  });
});


/* ── NAV SCROLL SHADOW ── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav.main-nav');
  if (!nav) return;
  nav.style.boxShadow = window.scrollY > 10
    ? '0 6px 30px rgba(100,80,50,.18)'
    : '0 4px 24px rgba(100,80,50,.1)';
});
