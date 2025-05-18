// --- CONFIGURABLE DATA ---
// Replace with your works
const works = [
  { img: 'works/work1.jpg', caption: 'Fashion Editorial for Vogue' },
  { img: 'works/work2.jpg', caption: 'Urban Portraits Series' },
  { img: 'works/work3.jpg', caption: 'Wilderness Adventure' },
  // add more works here
];

// --- END CONFIGURABLE DATA ---

// Handle navigation
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.page-section');
const footerMenus = document.querySelectorAll('.footer-menu');

function switchSection(page) {
  sections.forEach(s => s.classList.add('hidden'));
  document.getElementById(page).classList.remove('hidden');
  navBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.page === page));
}

navBtns.forEach(btn => {
  btn.addEventListener('click', () => switchSection(btn.dataset.page));
});
footerMenus.forEach(menu => {
  menu.addEventListener('click', e => {
    e.preventDefault();
    switchSection(menu.dataset.page);
    window.scrollTo({top: 0, behavior: "smooth"});
  });
});

// Initialize: show home
switchSection('home');

// Sync bio/info/email/phone everywhere
const clientBioEls = document.querySelectorAll('.client-bio, .client-bio-about');
const clientInfoEls = document.querySelectorAll('.client-info');
const clientEmailEls = document.querySelectorAll('.client-email, .client-email-footer');
const clientPhoneEls = document.querySelectorAll('.client-phone, .client-phone-footer');

function setClientData({bio, info, email, phone}) {
  clientBioEls.forEach(el => el.textContent = bio);
  clientInfoEls.forEach(el => el.textContent = info);
  clientEmailEls.forEach(el => el.textContent = email);
  clientPhoneEls.forEach(el => el.textContent = phone);
}
// Example:
setClientData({
  bio: "Award-winning photographer based in NYC, specializing in creative portraiture and lifestyle imagery.",
  info: "sahil vishwakarma Photography, New York City. Available for worldwide travel.",
  email: "jane@example.com",
  phone: "+1 123-456-7890"
});

// --- Portfolio works animation ---
const gallery = document.querySelector('.works-gallery');

// Dynamically add works
works.forEach((work, idx) => {
  const w = document.createElement('div');
  w.className = 'work-item';
  w.innerHTML = `
    <img src="${work.img}" alt="work ${idx+1}" class="work-img">
    ${work.caption ? `<div class="work-caption">${work.caption}</div>` : ''}
  `;
  gallery.appendChild(w);
});

// IntersectionObserver for animating works
const observer = new window.IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.work-item').forEach(item => observer.observe(item));

// --- Animate black sheet when last work is visible ---
const blacksheet = document.getElementById('blacksheet');
if (gallery && gallery.lastElementChild) {
  const triggerFooter = new window.IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        blacksheet.style.animationPlayState = 'running';
        triggerFooter.disconnect();
      }
    });
  }, { threshold: 0.5 });
  triggerFooter.observe(gallery.lastElementChild);
}