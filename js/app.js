// Splash screen
window.addEventListener('load', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash');
    if (splash) {
      splash.classList.add('hidden');
      setTimeout(() => splash.remove(), 500);
    }
  }, 1800);
});

// Sidebar toggle
function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('open');
  document.getElementById('overlay')?.classList.toggle('show');
}

// Dark mode
function toggleDark() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// Restore theme on load
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// PWA install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const banner = document.getElementById('pwaBanner');
  if (banner) banner.style.display = 'flex';
});

function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
      const banner = document.getElementById('pwaBanner');
      if (banner) banner.style.display = 'none';
    });
  }
}

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/elite-members/sw.js').catch(() => {});
}

// Like button toggle
document.querySelectorAll('.post-action').forEach(btn => {
  btn.addEventListener('click', function () {
    this.classList.toggle('liked');
  });
});

// Active nav highlight
document.querySelectorAll('.nav-item').forEach(item => {
  if (item.href === window.location.href) {
    item.classList.add('active');
  }
});
