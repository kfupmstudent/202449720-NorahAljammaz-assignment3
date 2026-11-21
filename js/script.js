// =========================================================
// script.js
// Handles: mobile nav toggle, dark/light theme toggle (saved
// in localStorage), time-of-day greeting, and contact form
// validation feedback (no backend — front-end only).
// =========================================================
const GITHUB_USERNAME = 'kfupmstudent';
document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  setupMobileNav();
  setupThemeToggle();
  setGreetingByTime();
    setupVisitorName();
  setupContactForm();
  setupProjectFilter();
  setupReadMore();
  loadRepos();
  setupScrollReveal();
    setupVisitTimer();
    
});

// ---- Footer year -----------------------------------------
function setFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ---- Mobile hamburger menu --------------------------------
function setupMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu after a link is clicked (mobile UX nicety)
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- Dark / light theme toggle ----------------------------
function setupThemeToggle() {
  const button = document.getElementById('themeToggle');
  if (!button) return;

  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    button.textContent = saved === 'dark' ? '☀️' : '🌙';
  }

  button.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    button.textContent = next === 'dark' ? '☀️' : '🌙';
  });
}

function setGreetingByTime() {
  const el = document.getElementById('greeting');
  if (!el) return;

  const hour = new Date().getHours();
  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';

  const name = localStorage.getItem('visitorName');
  el.textContent = name ? `${greeting}, ${name}` : `${greeting}, welcome`;
}

// ---- Contact form (front-end only, no backend) --------------
function setupContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const errors = {
      nameError: name.length < 2 ? 'Please enter your name (at least 2 characters).' : '',
      emailError: !isValidEmail(email) ? 'Enter a valid email like you@example.com.' : '',
      messageError: message.length < 10 ? 'Please write at least 10 characters.' : '',
    };

    let hasError = false;
    for (const [id, text] of Object.entries(errors)) {
      document.getElementById(id).textContent = text;
      if (text) hasError = true;
    }

    if (hasError) {
      status.textContent = 'Please fix the errors above and send again.';
      status.className = 'form-status is-error';
      return;
    }

    status.textContent = `Thanks, ${name}! Your message has been noted (demo only — no server is connected).`;
    status.className = 'form-status is-success';
    form.reset();
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
// ---- Project filter + live search + sort ----
function setupProjectFilter() {
  const cards = document.querySelectorAll('.project-card');
  const buttons = document.querySelectorAll('.filter-btn');
  const search = document.getElementById('projectSearch');
  const count = document.getElementById('resultsCount');
  const empty = document.getElementById('emptyState');
  const sortSelect = document.getElementById('projectSort'); // get each by the idea which will differentiate and order them when we get to sorting
  const grid = document.querySelector('.project-grid');
  let activeFilter = 'all';

  // compare the cards based on the selected sort order and rearrange them in the grid, if same date then sort by name
  function sortCards() {
    const order = sortSelect.value;
    const sorted = [...cards].sort((a, b) => {
      const nameA = a.querySelector('h3').textContent;
      const nameB = b.querySelector('h3').textContent;

      if (order === 'az') return nameA.localeCompare(nameB);

      const byDate = order === 'newest'
        ? b.dataset.date.localeCompare(a.dataset.date)
        : a.dataset.date.localeCompare(b.dataset.date);

      return byDate !== 0 ? byDate : nameA.localeCompare(nameB);
    });
    sorted.forEach((card) => grid.appendChild(card));
  }

  function apply() {
    sortCards(); // apply sorting before filtering and searching
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const text = (card.querySelector('h3').textContent + ' ' +
        card.dataset.tags + ' ' +
        card.querySelector('.project-desc').textContent).toLowerCase();
      const matchesFilter = activeFilter === 'all' || card.dataset.tags.split(' ').includes(activeFilter);
      const show = matchesFilter && text.includes(query);
      card.hidden = !show;
      if (show) visible++;
    });
    count.textContent = `Showing ${visible} of ${cards.length} projects`;
    empty.hidden = visible !== 0;
  }

  buttons.forEach((btn) => btn.addEventListener('click', () => {
    activeFilter = btn.dataset.filter;
    buttons.forEach((b) => b.classList.toggle('active', b === btn));
    apply();
  }));
  search.addEventListener('input', apply);
  sortSelect.addEventListener('change', apply); // this will trigger the sorting when the user changes the sort order
  apply();
}
// ---- Read more / Show less ----
function setupReadMore() {
  document.querySelectorAll('.project-desc').forEach((desc) => {
    desc.classList.add('is-collapsed');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'read-more';
    btn.textContent = 'Read more';
    btn.addEventListener('click', () => {
      const collapsed = desc.classList.toggle('is-collapsed');
      btn.textContent = collapsed ? 'Read more' : 'Show less';
    });
    desc.after(btn);
  });
}
// ---- GitHub repositories (public API) ----
async function loadRepos() {
  const status = document.getElementById('repoStatus');
  const list = document.getElementById('repoList');
  list.innerHTML = '';
  status.textContent = 'Loading repositories…';
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
    if (!res.ok) throw new Error('Status ' + res.status);
    const repos = await res.json();
    if (repos.length === 0) {
      status.textContent = 'No public repositories yet. Check back soon!';
      return;
    }
    status.textContent = '';
    repos.forEach((repo) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = repo.html_url;
      a.textContent = repo.name;
      a.target = '_blank';
      a.rel = 'noopener';
      const p = document.createElement('p');
      p.textContent = repo.description || 'No description provided.';
      li.append(a, p);
      list.appendChild(li);
    });
  } catch (error) {
    status.textContent = 'Could not load repositories. Check your internet connection and try again. ';
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.textContent = 'Try again';
    retry.addEventListener('click', loadRepos);
    status.appendChild(retry);
  }
}
// ---- Fade-in on scroll ----
function setupScrollReveal() {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section-title, .project-card, .contact-form').forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}
// ---- Time-on-site timer ----
// This will display the time the user has spent on the site in the footer, 
// setInterval runs the code every 1000 ms (one second). 
// document.hidden is true while you're on another tab, so the timer pauses there. padStart(2, '0') turns 5 into 05, so the time reads 1:05 and not 1:5.
function setupVisitTimer() {
  const display = document.getElementById('visitTime');
  if (!display) return;

  let seconds = 0;
  setInterval(() => {
    if (document.hidden) return;
    seconds++;
    display.textContent = formatDuration(seconds);
  }, 1000);
}

function formatDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:${seconds}`;
  return `${minutes}:${seconds}`;
}

// ---- Visitor name (saved in localStorage) ----
// this saves the visitor's name in localStorage and displays it in the greeting, 
// also pre-fills the contact form name field if it's empty
// it is used ny setgrreetingByTime() to display the name in the greeting
function setupVisitorName() {
  const form = document.getElementById('nameForm');
  const input = document.getElementById('visitorName');
  const error = document.getElementById('visitorNameError');
  const saved = document.getElementById('nameSaved');
  const savedName = document.getElementById('savedName');
  const forget = document.getElementById('forgetName');
  if (!form) return;

  function render() {
    const name = localStorage.getItem('visitorName');
    form.hidden = Boolean(name);
    saved.hidden = !name;
    if (name) savedName.textContent = name;
    setGreetingByTime();

    const contactName = document.getElementById('name');
    if (name && contactName && !contactName.value) contactName.value = name;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = input.value.trim();

    if (!/^[\p{L}][\p{L} '-]{1,29}$/u.test(name)) {
      error.textContent = 'Please enter a name of 2 to 30 letters.';
      return;
    }

    error.textContent = '';
    localStorage.setItem('visitorName', name);
    form.reset();
    render();
  });

  forget.addEventListener('click', () => {
    localStorage.removeItem('visitorName');
    render();
    input.focus();
  });

  render();
}