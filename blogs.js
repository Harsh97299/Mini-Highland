// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (same as in script.js)
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                // First set opacity to trigger transition
                mobileMenu.style.opacity = '0';
                mobileMenu.style.transform = 'translateY(-10px)';
                
                // After transition completes, hide the menu
                setTimeout(() => {
                    mobileMenu.classList.remove('active');
                }, 300);
                
                menuBtn.classList.remove('fa-times');
                menuBtn.classList.add('fa-bars');
            } else {
                mobileMenu.classList.add('active');
                // Set initial styles then update to trigger transition
                mobileMenu.style.opacity = '0';
                mobileMenu.style.transform = 'translateY(-10px)';
                
                // Force a reflow
                mobileMenu.offsetHeight;
                
                // Update styles to trigger transition
                mobileMenu.style.opacity = '1';
                mobileMenu.style.transform = 'translateY(0)';
                
                menuBtn.classList.remove('fa-bars');
                menuBtn.classList.add('fa-times');
            }
        });
    }
    
    // Set current year in footer copyright
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Blog Category Filtering
    const categoryTabs = document.querySelectorAll('.category-tab');
    const postCards = document.querySelectorAll('.post-card');
    
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                categoryTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Get category to filter
                const category = this.getAttribute('data-category');
                
                // Filter posts
                postCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        
                        // Add animation
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        // Force reflow
                        card.offsetHeight;
                        
                        // Trigger animation
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            card.style.transition = 'all 0.4s ease-out';
                        }, 50 * Array.from(postCards).indexOf(card));
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Blog Pagination (for demonstration)
    const paginationLinks = document.querySelectorAll('.page-link');
    
    if (paginationLinks.length > 0) {
        paginationLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                paginationLinks.forEach(l => l.classList.remove('active'));
                
                // Don't add active class to the "Next" link
                if (!this.textContent.includes('Next')) {
                    this.classList.add('active');
                }
                
                // Here you would typically fetch new content or show different posts
                // For demo purposes, we'll just scroll to top
                window.scrollTo({
                    top: document.querySelector('.blog-posts').offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    // Blog Newsletter Form
    const blogNewsletterForm = document.getElementById('blog-newsletter-form');
    
    if (blogNewsletterForm) {
        blogNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('nl-name').value.trim();
            const email = document.getElementById('nl-email').value.trim();
            
            // Basic form validation
            if (!name || !email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show a success message
            alert(`Thanks for subscribing, ${name}! We'll send our latest farm updates to your inbox.`);
            
            // Reset form
            blogNewsletterForm.reset();
        });
    }
    
    // Enhanced header color transition on scroll (same as in script.js)
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                // Apply scrolled class with proper contrast
                header.classList.remove('header-transparent');
                header.classList.add('header-scrolled');
                header.style.backgroundColor = 'rgba(136, 201, 161, 0.95)'; // Semi-transparent green
                header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            } else {
                // Apply transparent class with proper contrast
                header.classList.add('header-transparent');
                header.classList.remove('header-scrolled');
                header.style.backgroundColor = 'var(--primary-color)';
                header.style.boxShadow = '0 4px 20px rgba(136, 201, 161, 0.5)';
            }
        });
        
        // Set initial state
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
            header.style.backgroundColor = 'rgba(136, 201, 161, 0.95)';
            header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.classList.add('header-transparent');
        }
    }
    
    // Floating animation for blog hero bubbles
    const bubbles = document.querySelectorAll('.bubble');
    
    if (bubbles.length > 0) {
        // When mouse moves over the hero section, make bubbles react
        const blogHero = document.querySelector('.blog-hero');
        
        if (blogHero) {
            blogHero.addEventListener('mousemove', function(e) {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                bubbles.forEach((bubble, index) => {
                    // Different bubbles react differently to create a natural effect
                    const offsetX = (mouseX - 0.5) * (10 + index * 5);
                    const offsetY = (mouseY - 0.5) * (10 + index * 5);
                    
                    // Apply the translation with the existing animation
                    bubble.style.transform = `translate(${offsetX}px, ${offsetY}px) translateY(var(--translateY, 0)) rotate(var(--rotate, 0deg))`;
                });
            });
            
            // Reset bubbles position when mouse leaves
            blogHero.addEventListener('mouseleave', function() {
                bubbles.forEach(bubble => {
                    bubble.style.transform = '';
                });
            });
        }
    }
    
    // Implement a simple fade-in animation for blog post sections as they come into view
    const animateBlogElements = document.querySelectorAll('.post-card, .featured-post-card');
    
    if (animateBlogElements.length > 0) {
        // Set initial state - hidden
        animateBlogElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease-out';
        });
        
        // Check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
                rect.bottom >= 0
            );
        }
        
        // Add 'visible' class when element comes into view
        function handleScroll() {
            animateBlogElements.forEach((element, index) => {
                if (isInViewport(element) && element.style.opacity === '0') {
                    // Stagger the animations
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 100 * index);
                }
            });
        }
        
        // Initial check on page load
        handleScroll();
        
        // Check on scroll
        window.addEventListener('scroll', handleScroll);
    }
});