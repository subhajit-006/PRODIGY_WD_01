/* ==================== NAVBAR SCROLL EFFECT ==================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ==================== HAMBURGER MENU ==================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
});

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Close mobile menu when CTA button is clicked
const mobileCtaBtn = mobileMenu.querySelector('.cta-btn');
if (mobileCtaBtn) {
    mobileCtaBtn.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
}

/* ==================== SMOOTH SCROLL ENHANCEMENT ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            const offsetTop = element.offsetTop - 70;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

/* ==================== ANIMATE STATS ON SCROLL ==================== */
const statElements = document.querySelectorAll('[data-target]');
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;
    
    statElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 50);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 50);
    });
    
    statsAnimated = true;
};

// Check if stats section is in view
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(aboutSection);
}

/* ==================== PORTFOLIO FILTER ==================== */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter and animate projects
        projectCards.forEach(card => {
            card.style.display = 'none';
            card.classList.remove('show');
            
            // Check if card matches filter or show all
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                setTimeout(() => {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('show');
                    }, 10);
                }, 50);
            }
        });
    });
});

// Show all projects on load
projectCards.forEach(card => {
    card.classList.add('show');
});

/* ==================== CONTACT FORM ==================== */
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const courseInterest = document.getElementById('courseInterest').value;
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!fullName || !email || !courseInterest || !message) {
            showFeedback('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFeedback('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show success message
        showFeedback('✅ Message sent successfully! We\'ll contact you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

function showFeedback(message, type) {
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formFeedback.className = 'form-feedback';
    }, 5000);
}

/* ==================== SCROLL TO TOP BUTTON ==================== */
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==================== COURSE CARDS ANIMATION ==================== */
const courseCards = document.querySelectorAll('.course-card');

const courseObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            courseObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

courseCards.forEach(card => {
    courseObserver.observe(card);
});

/* ==================== TRAINER CARDS ANIMATION ==================== */
const trainerCards = document.querySelectorAll('.trainer-card');

const trainerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            trainerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

trainerCards.forEach(card => {
    trainerObserver.observe(card);
});

/* ==================== LAZY LOAD IMAGES ==================== */
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

/* ==================== TRACK ACTIVE NAV LINK ==================== */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

/* ==================== DEBOUNCE FUNCTION FOR PERFORMANCE ==================== */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* ==================== HANDLE RESIZE ==================== */
const handleResize = debounce(() => {
    // Handle any resize-based logic
}, 250);

window.addEventListener('resize', handleResize);

/* ==================== PRELOAD CRITICAL IMAGES ==================== */
document.addEventListener('DOMContentLoaded', () => {
    // Preload hero section images
    const preloadImages = document.querySelectorAll('img[data-preload]');
    preloadImages.forEach(img => {
        const image = new Image();
        image.src = img.getAttribute('data-preload');
    });
});

/* ==================== INITIALIZE ANIMATIONS ==================== */
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on page load
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.animation = 'fadeIn 0.6s ease-out forwards';
        }, index * 100);
    });
});

/* ==================== ERROR HANDLING ==================== */
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // Could implement error tracking here
});

/* ==================== PERFORMANCE MONITORING ==================== */
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    });
}
