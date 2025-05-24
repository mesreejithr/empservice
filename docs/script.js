// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in animation to elements
document.querySelectorAll('.feature-card, .stat-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// Add click event listeners to CTA buttons
document.querySelectorAll('.primary-button, .cta-button').forEach(button => {
    button.addEventListener('click', () => {
        // Open a modal or redirect to a demo scheduling page
        window.location.href = 'https://calendly.com/hireclap/demo'; // Replace with your actual demo scheduling URL
    });
});

// Mobile Menu Logic
const hamburgerMenu = document.getElementById('hamburgerMenu');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'mobile-menu-overlay';
document.body.appendChild(overlay);

function openMobileMenu() {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (hamburgerMenu && mobileMenu && mobileMenuClose) {
    hamburgerMenu.addEventListener('click', openMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);

    // Close menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Contact Modal Logic for Mobile
const contactIconMobile = document.getElementById('contactIconMobile');
const contactModal = document.getElementById('contactModal');
const closeContactModal = document.getElementById('closeContactModal');

if (contactIconMobile && contactModal && closeContactModal) {
    contactIconMobile.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Position the modal relative to the contact icon
        const iconRect = contactIconMobile.getBoundingClientRect();
        const modalContent = contactModal.querySelector('.contact-modal-content');
        
        // Set the modal position
        contactModal.style.position = 'fixed';
        contactModal.style.top = `${iconRect.bottom + window.scrollY}px`;
        contactModal.style.right = `${window.innerWidth - iconRect.right}px`;
        
        // Show the modal
        contactModal.style.display = 'block';
        
        // Add a small delay to trigger the animation
        setTimeout(() => {
            contactModal.classList.add('show');
        }, 10);
    });

    function closeModal() {
        contactModal.classList.remove('show');
        // Wait for the fade-out animation to complete before hiding the modal
        setTimeout(() => {
            contactModal.style.display = 'none';
        }, 200);
    }

    closeContactModal.addEventListener('click', function(e) {
        e.stopPropagation();
        closeModal();
    });

    // Close modal when clicking outside
    document.addEventListener('click', function(event) {
        if (!contactModal.contains(event.target) && !contactIconMobile.contains(event.target)) {
            closeModal();
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && contactModal.classList.contains('show')) {
            closeModal();
        }
    });
}

// Add loading animation for images
// Updated to handle cached images as well

document.querySelectorAll('img').forEach(img => {
    function showImage() {
        img.style.opacity = '1';
    }
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-in';
    img.addEventListener('load', showImage);

    // If the image is already loaded (from cache), show it immediately
    if (img.complete) {
        showImage();
    }
}); 