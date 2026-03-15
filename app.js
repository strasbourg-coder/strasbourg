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
