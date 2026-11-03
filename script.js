// 1. Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme in local storage
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

themeBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    
    // Change icon based on theme
    themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// 2. Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 3. Scroll Reveal Animation using Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Run animation only once
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden').forEach((element) => {
    observer.observe(element);
});

// 4. Typewriter Effect for Hero Section
const phrases = ["Hardware Prototyper", "AI Systems Integrator", "Creative Developer"];
const typewriterElement = document.getElementById('typewriter');
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, letterIndex - 1);
        letterIndex--;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, letterIndex + 1);
        letterIndex++;
    }

    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && letterIndex === currentPhrase.length) {
        typingSpeed = 2000; // Pause at end of phrase
        isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before starting new phrase
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start the typing effect after a short delay
setTimeout(typeEffect, 1000);
