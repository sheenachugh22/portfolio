// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

// Close menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        menuToggle?.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close menu on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu?.classList.remove('active');
        menuToggle?.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// ===== SCROLL ANIMATIONS =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll(
        '.hero-content, .hero-visual, .section-header, .about-content, .about-cards, .timeline-item, .skill-category, .contact-wrapper > *'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for groups
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
};

// Initialize animations on load
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
}

// ===== TYPING EFFECT FOR HERO (Optional Enhancement) =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ===== PARALLAX EFFECT FOR HERO VISUAL =====
const heroVisual = document.querySelector('.hero-visual');

if (heroVisual && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroVisual.style.transform = `translateY(${rate}px)`;
    });
}

// ===== HOVER EFFECTS FOR SKILL TAGS =====
document.querySelectorAll('.skill-tags span').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ===== COPY EMAIL FUNCTIONALITY =====
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Email copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Email click handler
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
    emailLink.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const email = emailLink.getAttribute('href').replace('mailto:', '');
        copyToClipboard(email);
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, duration = 3000) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: linear-gradient(135deg, #d4a574, #b8845f);
        color: #0f172a;
        padding: 14px 24px;
        border-radius: 10px;
        font-weight: 600;
        font-size: 0.9rem;
        box-shadow: 0 10px 40px rgba(212, 165, 116, 0.4);
        z-index: 10000;
        animation: slideUp 0.4s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideUp {
                from { transform: translateY(100px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes slideDown {
                from { transform: translateY(0); opacity: 1; }
                to { transform: translateY(100px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.4s ease forwards';
        setTimeout(() => notification.remove(), 400);
    }, duration);
}

// ===== CONSOLE EASTER EGG =====
console.log(
    '%c👋 Hello there! Looking for quality-driven project management?\n' +
    '%cLet\'s connect: sheenachugh92@gmail.com',
    'color: #d4a574; font-size: 16px; font-weight: bold;',
    'color: #2dd4bf; font-size: 14px;'
);

// ===== LOAD STATE =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations immediately
    setTimeout(() => {
        document.querySelector('.hero-content')?.classList.add('animate');
        document.querySelector('.hero-visual')?.classList.add('animate');
    }, 100);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        navMenu?.classList.remove('active');
        menuToggle?.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});
