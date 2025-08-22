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
document.querySelectorAll('.contact-card, .form-content, .form-info, .faq-item, .map-placeholder, .map-info').forEach(el => {
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

// FAQ functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');
const submitBtn = document.querySelector('.submit-btn');
const formStatus = document.getElementById('form-status');
const statusMessage = document.querySelector('.status-message');
const statusIcon = document.querySelector('.status-icon');

// Intercepter la soumission du formulaire
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (validateForm()) {
        // Show loading state
        submitBtn.classList.add('loading');
        
        // Envoyer le formulaire via Formspree avec fetch
        const formData = new FormData(contactForm);
        
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Succès
                showFormStatus('success', 'Votre message a été envoyé avec succès! Vous serez redirigé vers la page d\'accueil dans <span class="redirect-countdown">5</span> secondes.');
                
                // Redirection vers la page d'accueil après 5 secondes
                let countdown = 5;
                const countdownElement = document.querySelector('.redirect-countdown');
                const countdownInterval = setInterval(() => {
                    countdown--;
                    countdownElement.textContent = countdown;
                    
                    if (countdown <= 0) {
                        clearInterval(countdownInterval);
                        window.location.href = 'index.html'; // Redirection vers la page d'accueil
                    }
                }, 1000);
            } else {
                // Erreur
                showFormStatus('error', 'Une erreur s\'est produite lors de l\'envoi du message. Veuillez réessayer.');
            }
        })
        .catch(error => {
            // Erreur réseau
            showFormStatus('error', 'Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.');
        })
        .finally(() => {
            // Cacher l'état de chargement
            submitBtn.classList.remove('loading');
        });
    }
});

// Fonction pour afficher le statut du formulaire
function showFormStatus(type, message) {
    formStatus.className = `form-status ${type}`;
    statusMessage.innerHTML = message;
    statusIcon.className = 'status-icon';
    
    if (type === 'success') {
        statusIcon.classList.add('fas', 'fa-check-circle');
    } else {
        statusIcon.classList.add('fas', 'fa-exclamation-circle');
    }
    
    formStatus.style.display = 'block';
    
    // Faire défiler jusqu'au message de statut
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function validateForm() {
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    
    // Validate name
    const nameInput = document.getElementById('name');
    if (!nameInput.value.trim()) {
        document.getElementById('nameError').textContent = 'Le nom est requis';
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }
    
    // Validate email
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        document.getElementById('emailError').textContent = 'L\'email est requis';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        document.getElementById('emailError').textContent = 'Veuillez entrer un email valide';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    // Validate phone (if provided)
    const phoneInput = document.getElementById('phone');
    if (phoneInput.value.trim() && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(phoneInput.value)) {
        document.getElementById('phoneError').textContent = 'Veuillez entrer un numéro de téléphone valide';
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    }
    
    // Validate service
    const serviceInput = document.getElementById('service');
    if (!serviceInput.value) {
        document.getElementById('serviceError').textContent = 'Veuillez sélectionner un service';
        document.getElementById('serviceError').style.display = 'block';
        isValid = false;
    }
    
    // Validate message
    const messageInput = document.getElementById('message');
    if (!messageInput.value.trim()) {
        document.getElementById('messageError').textContent = 'Le message est requis';
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        document.getElementById('messageError').textContent = 'Le message doit contenir au moins 10 caractères';
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }
    
    // Validate consent
    const consentInput = document.getElementById('consent');
    if (!consentInput.checked) {
        document.getElementById('consentError').textContent = 'Vous devez accepter le traitement de vos données';
        document.getElementById('consentError').style.display = 'block';
        isValid = false;
    }
    
    return isValid;
}

// Real-time validation
const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        // Clear error when user starts typing
        const errorElement = document.getElementById(this.id + 'Error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    });
});

function validateField(field) {
    const errorElement = document.getElementById(field.id + 'Error');
    
    if (!errorElement) return;
    
    // Clear previous error
    errorElement.style.display = 'none';
    
    // Validate based on field type
    switch(field.id) {
        case 'name':
            if (!field.value.trim()) {
                errorElement.textContent = 'Le nom est requis';
                errorElement.style.display = 'block';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!field.value.trim()) {
                errorElement.textContent = 'L\'email est requis';
                errorElement.style.display = 'block';
            } else if (!emailRegex.test(field.value)) {
                errorElement.textContent = 'Veuillez entrer un email valide';
                errorElement.style.display = 'block';
            }
            break;
            
        case 'phone':
            if (field.value.trim() && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(field.value)) {
                errorElement.textContent = 'Veuillez entrer un numéro de téléphone valide';
                errorElement.style.display = 'block';
            }
            break;
            
        case 'service':
            if (!field.value) {
                errorElement.textContent = 'Veuillez sélectionner un service';
                errorElement.style.display = 'block';
            }
            break;
            
        case 'message':
            if (!field.value.trim()) {
                errorElement.textContent = 'Le message est requis';
                errorElement.style.display = 'block';
            } else if (field.value.trim().length < 10) {
                errorElement.textContent = 'Le message doit contenir au moins 10 caractères';
                errorElement.style.display = 'block';
            }
            break;
    }
}

// Contact card hover effect
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
    });
});