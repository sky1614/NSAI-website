// ── Theme Toggle ────────────────────────────────────────────────────────────
const html = document.documentElement;
const saved = localStorage.getItem('nsai-theme') || 'dark';
html.setAttribute('data-theme', saved);

function toggleTheme() {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('nsai-theme', next);
  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.textContent = html.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
}

// ── Mobile Nav ───────────────────────────────────────────────────────────────
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  if (!nav) return;
  nav.classList.toggle('open');
}

// ── Active nav link ──────────────────────────────────────────────────────────
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ── Scroll reveal ────────────────────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) el.target.classList.add('visible');
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ── Smooth scroll for anchor links ───────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
}

// ── Contact form handler ─────────────────────────────────────────────────────
function handleContactForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  const original = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✓ Message sent!';
    btn.style.background = 'linear-gradient(135deg,#00e5c3,#00c4a8)';
    btn.style.color = '#000';
    e.target.reset();
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
    }, 3000);
  }, 1000);
}

// ── Tab system ───────────────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.group;
      const target = btn.dataset.tab;
      document.querySelectorAll(`[data-group="${group}"].tab-btn`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll(`[data-group="${group}"].tab-panel`).forEach(p => {
        p.style.display = p.dataset.tab === target ? 'grid' : 'none';
      });
    });
  });
}

// ── Product demo toggle ───────────────────────────────────────────────────────
function initProductToggle() {
  const products = ['Product 1', 'Product 2', 'Product 3'];
  document.querySelectorAll('.product-toggle-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.product-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const label = document.querySelector('.demo-slot-label');
      if (label) label.textContent = products[btn.dataset.product];
    });
  });
}

// ── Toast notification ───────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `position:fixed;bottom:28px;right:28px;padding:14px 22px;border-radius:10px;font-size:14px;font-family:var(--fu);font-weight:600;z-index:9999;transform:translateY(80px);opacity:0;transition:all .3s;max-width:320px;border:1px solid`;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.background = type === 'success' ? 'rgba(0,229,195,0.15)' : 'rgba(255,77,109,0.15)';
  toast.style.borderColor = type === 'success' ? 'rgba(0,229,195,0.4)' : 'rgba(255,77,109,0.4)';
  toast.style.color = type === 'success' ? '#00e5c3' : '#ff4d6d';
  setTimeout(() => { toast.style.transform = 'translateY(0)'; toast.style.opacity = '1'; }, 10);
  setTimeout(() => { toast.style.transform = 'translateY(80px)'; toast.style.opacity = '0'; }, 3500);
}

// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateThemeIcon();
  setActiveNav();
  initReveal();
  initSmoothScroll();
  initTabs();
  initProductToggle();
  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', handleContactForm);
});
