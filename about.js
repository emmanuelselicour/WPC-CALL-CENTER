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
            
            // Si c'est un élément de statistiques, animer les compteurs
            if (entry.target.classList.contains('stat-number')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.value-box, .team-member, .stat-item, .history-image img, .commitment-image img').forEach(el => {
    observer.observe(el);
});

// Animation des statistiques
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);
        
        if (count < target) {
            counter.innerText = Math.min(count + increment, target);
            setTimeout(() => animateCounters(), 1);
        }
    });
}

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

// Animation des équipes
const teamMembers = document.querySelectorAll('.team-member');
teamMembers.forEach(member => {
    member.addEventListener('mouseenter', function() {
        this.querySelector('.member-social').style.bottom = '0';
    });
    
    member.addEventListener('mouseleave', function() {
        this.querySelector('.member-social').style.bottom = '-50px';
    });
});