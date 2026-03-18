// menu mobile
const navToggle = document.querySelector('.nav-toggle');
const sidebar = document.querySelector('.sidebar');
const overlay = document.createElement('div');
overlay.className = 'overlay';

document.body.appendChild(overlay);

function closeSidebar() {
  sidebar?.classList.remove('open');
  overlay.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}

function openSidebar() {
  sidebar?.classList.add('open');
  overlay.classList.add('open');
  navToggle?.setAttribute('aria-expanded', 'true');
}

if (navToggle && sidebar) {
  navToggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    overlay.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

overlay.addEventListener('click', closeSidebar);

// active link based on URL (relies on href matching filename)
const navLinks = document.querySelectorAll('.sidebar a');
const current = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach((link) => {
  if (link.getAttribute('href') === current) {
    link.classList.add('active');
  }
});

// bottom navigation bar (shared across all pages)
const bottomNavItems = [
  { href: 'index.html', label: 'Accueil', icon: '🏠', color: '#ff5b5b' },
  { href: 'statut.html', label: 'Statut', icon: '📊', color: '#1fb6ff' },
  { href: 'faq.html', label: 'FAQ', icon: '❓', color: '#7e5cff' },
  { href: 'regles.html', label: 'Règles', icon: '📜', color: '#f5a623' },
  { href: 'hierarchie.html', label: 'Hiérarchie', icon: '🧭', color: '#17c964' },
  { href: 'recrutement.html', label: 'Recrutement', icon: '🤝', color: '#ffb300' },
  { href: 'annonces.html', label: 'Annonces', icon: '📢', color: '#00d1b2' },
  { href: 'aide.html', label: 'Aide', icon: '🆘', color: '#ff3b8d' },
];

function createBottomNav() {
  const existing = document.querySelector('.bottom-nav');
  if (existing) return existing;

  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  nav.setAttribute('aria-label', 'Navigation secondaire');

  const indicator = document.createElement('span');
  indicator.className = 'indicator';
  nav.appendChild(indicator);

  bottomNavItems.forEach((item) => {
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.icon;
    link.setAttribute('aria-label', item.label);
    link.dataset.color = item.color;
    nav.appendChild(link);
  });

  const layout = document.querySelector('.layout');
  layout?.after(nav);

  return nav;
}

function updateBottomNav() {
  const nav = createBottomNav();
  const links = nav.querySelectorAll('a');
  const indicator = nav.querySelector('.indicator');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const activeLink = Array.from(links).find((link) => link.getAttribute('href') === currentPage) || links[0];
  if (!activeLink || !indicator) return;

  const applyIndicator = (link) => {
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const offsetX = linkRect.left - navRect.left + linkRect.width / 2 - indicator.offsetWidth / 2;
    indicator.style.transform = `translateX(${offsetX}px) translateY(-50%)`;
    indicator.style.background = link.dataset.color || 'var(--link)';
  };

  const setActive = (link) => {
    links.forEach((l) => l.classList.toggle('active', l === link));
    applyIndicator(link);
  };

  // set default active
  setActive(activeLink);

  // animate on hover / focus
  links.forEach((link) => {
    link.addEventListener('mouseenter', () => applyIndicator(link));
    link.addEventListener('focus', () => applyIndicator(link));
    link.addEventListener('mouseleave', () => setActive(activeLink));
    link.addEventListener('blur', () => setActive(activeLink));
  });
}

window.addEventListener('load', updateBottomNav);
window.addEventListener('resize', updateBottomNav);
