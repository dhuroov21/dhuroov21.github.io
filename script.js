const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav-toggle');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle?.querySelector('i');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const revealEls = document.querySelectorAll('.reveal');
const backToTop = document.querySelector('.back-to-top');
const contactForm = document.getElementById('contactForm');

const updateTheme = (isLight) => {
  document.body.classList.toggle('light-theme', isLight);

  if (themeIcon) {
    themeIcon.classList.toggle('fa-moon', !isLight);
    themeIcon.classList.toggle('fa-sun', isLight);
  }

  localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
};

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
  updateTheme(true);
} else {
  updateTheme(false);
}

themeToggle?.addEventListener('click', () => {
  const isLight = !document.body.classList.contains('light-theme');
  updateTheme(isLight);
});

navToggle?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((element) => revealObserver.observe(element));

const updateActiveNav = () => {
  let currentSection = 'home';

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < top + height) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    const { hash } = link;
    const isActive = hash === `#${currentSection}`;
    link.classList.toggle('active', isActive);
  });
};

window.addEventListener('scroll', () => {
  updateActiveNav();

  if (window.scrollY > 280) {
    backToTop?.classList.add('visible');
  } else {
    backToTop?.classList.remove('visible');
  }
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = (formData.get('name') || '').toString().trim();
  const email = (formData.get('email') || '').toString().trim();
  const subject = (formData.get('subject') || '').toString().trim();
  const message = (formData.get('message') || '').toString().trim();

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    'Message:',
    message
  ].join('\n');

  const mailtoLink = `mailto:dhuroovkumar68@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
  contactForm.reset();
});

updateActiveNav();
