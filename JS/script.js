// script.js — shared page behavior for all pages

const typingText = 'Developer & Community Manager';
let typingIndex = 0;

function setupTyping() {
    const subtitleEl = document.querySelector('.typing-subtitle');
    if (!subtitleEl) return;
    const tick = () => {
        if (typingIndex <= typingText.length) {
            subtitleEl.textContent = typingText.slice(0, typingIndex) + (typingIndex % 2 === 0 ? '' : '|');
            typingIndex += 1;
            setTimeout(tick, 90);
        } else {
            subtitleEl.textContent = typingText;
        }
    };
    setTimeout(tick, 500);
}

function scrollRevealSetup() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .card, .skill-item, .contact-item, .project-card, .about-card').forEach((el) => {
        observer.observe(el);
    });
}

function navHighlightOnScroll() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    const updateActive = () => {
        let currentId = 'home';
        const scrollY = window.scrollY + 110;
        sections.forEach((section) => {
            if (section.offsetTop <= scrollY) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentId)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActive);
    updateActive();
}

function accordionSetup() {
    const items = document.querySelectorAll('.accordion');
    items.forEach((item) => {
        item.addEventListener('click', () => {
            const openPanel = document.querySelector('.panel.open');
            const panel = item.nextElementSibling;
            if (openPanel && openPanel !== panel) {
                openPanel.style.maxHeight = null;
                openPanel.classList.remove('open');
            }
            panel.classList.toggle('open');
            if (panel.classList.contains('open')) {
                panel.style.maxHeight = panel.scrollHeight + 'px';
            } else {
                panel.style.maxHeight = null;
            }
        });
    });
}

function pageTransitions() {
    const links = document.querySelectorAll('a.nav-link, a.cta-btn, a.action-btn');
    links.forEach((link) => {
        if (link.target === '_blank') return;
        link.addEventListener('click', (e) => {
            const url = link.getAttribute('href');
            if (!url || url.startsWith('#')) return;
            e.preventDefault();
            document.querySelector('.page-transition').style.opacity = '1';
            setTimeout(() => { window.location.href = url; }, 200);
        });
    });
}

function navbarScrollStyling() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
    });
}

function themeToggleSetup() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    const icon = toggle.querySelector('i');

    const applyTheme = (isLight) => {
        document.documentElement.classList.toggle('light-mode', isLight);
        icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    };

    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme === 'light';
    applyTheme(isLight);

    toggle.addEventListener('click', () => {
        const currentIsLight = document.documentElement.classList.contains('light-mode');
        applyTheme(!currentIsLight);
    });
}

function init() {
    setupTyping();
    scrollRevealSetup();
    navHighlightOnScroll();
    accordionSetup();
    pageTransitions();
    navbarScrollStyling();
    themeToggleSetup();
    const hashTarget = window.location.hash;
    if (hashTarget) {
        setTimeout(() => {
            const target = document.querySelector(hashTarget);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 200);
    }
}

window.addEventListener('DOMContentLoaded', init);
