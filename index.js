// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navigation Active Link
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    
    // Smooth Scrolling
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    // ===== Mobile Menu Toggle =====
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu bars
        const bars = this.querySelectorAll('.bar');
        if (this.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            
            // Reset hamburger icon
            const bars = mobileMenu.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
    
    // ===== Navigation Active Link on Scroll =====
    function setActiveLink() {
        let scrollPosition = window.scrollY;
        
        // Account for fixed header height
        const headerHeight = document.querySelector('header').offsetHeight;
        scrollPosition += headerHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Add some offset
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // ===== Project Filtering =====
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    // Add animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    // Add animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ===== Form Submission =====
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Here you would normally send data to a server
            // For demonstration, we'll simulate a successful submission
            showFormMessage('Thank you! Your message has been sent.', 'success');
            contactForm.reset();
        });
    }
    
    // Show form submission message
    function showFormMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Check if a message already exists and remove it
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Insert message after the form
        contactForm.after(messageDiv);
        
        // Style based on message type
        if (type === 'success') {
            messageDiv.style.color = 'var(--success-color)';
        } else {
            messageDiv.style.color = '#dc3545'; // Error color
        }
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ===== Smooth Scrolling =====
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Check if the href is just "#" (empty anchor)
            if (targetId === "#") {
                return; // Skip processing for empty anchors
            }
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate position accounting for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Animation on Scroll =====
    // Adding fade-in animation for elements as they appear in viewport
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.about-content, .skills-container, .project-card, .contact-container');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 1s ease forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .about-content, .skills-container, .project-card, .contact-container {
            opacity: 0;
        }
        
        .form-message {
            padding: 10px;
            margin-top: 15px;
            border-radius: var(--border-radius);
            text-align: center;
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize animations on page load
    animateOnScroll();
    setActiveLink();
    
    // Initialize project filters - show all by default
    document.querySelector('.filter-btn[data-filter="all"]').click();
    
    // Animate skill bars on page load
    function animateSkills() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        skillLevels.forEach(skill => {
            const width = skill.style.width;
            skill.style.width = '0';
            
            setTimeout(() => {
                skill.style.transition = 'width 1.5s ease-in-out';
                skill.style.width = width;
            }, 300);
        });
    }
    
    // Run skill animation when skills section is visible
    function checkSkillsVisibility() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;
        
        const elementPosition = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            animateSkills();
            // Remove this event listener after animating once
            window.removeEventListener('scroll', checkSkillsVisibility);
        }
    }
    
    window.addEventListener('scroll', checkSkillsVisibility);
    checkSkillsVisibility(); // Check on page load as well
});




