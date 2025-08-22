// Menu mobile
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuContainer = document.querySelector('.mobile-menu-container');
const overlay = document.querySelector('.overlay');
const closeMenuBtn = document.querySelector('.close-menu');

function toggleMenu() {
    mobileMenuContainer.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileMenuContainer.classList.contains('active') ? 'hidden' : '';
    
    // Animation des barres du menu hamburger
    mobileMenu.classList.toggle('active');
}

mobileMenu.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Fermer le menu en cliquant sur un lien
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Animation au défilement
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.service-card, .process-step, .tech-item').forEach(el => {
    observer.observe(el);
});

// Header fixed
window.addEventListener('scroll', function() {
    const header = document.querySelector('nav');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        header.style.padding = '10px 0';
    } else {
        header.style.boxShadow = 'none';
        header.style.padding = '15px 0';
    }
});

// Testimonials Slider
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    
    if (index < 0) {
        currentTestimonial = testimonials.length - 1;
    } else if (index >= testimonials.length) {
        currentTestimonial = 0;
    } else {
        currentTestimonial = index;
    }
    
    testimonials[currentTestimonial].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    showTestimonial(currentTestimonial - 1);
});

nextBtn.addEventListener('click', () => {
    showTestimonial(currentTestimonial + 1);
});

// Auto-rotate testimonials
setInterval(() => {
    showTestimonial(currentTestimonial + 1);
}, 5000);

// Service card hover effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
    });
});