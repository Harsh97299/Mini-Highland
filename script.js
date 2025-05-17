// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle with improved transition
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
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return; // Skip if href is just "#"
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic form validation
            if (!name || !email || !message) {
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
            alert(`Thanks for reaching out, ${name}! We'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Basic validation
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would typically send the email to a server for subscription
            // For this example, we'll just show a success message
            alert('Thanks for subscribing to our newsletter!');
            
            // Reset form
            newsletterForm.reset();
        });
    }
    
    // Enhanced header color transition on scroll
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
    
    // Image gallery functionality (for Animals or Shop pages)
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const imgAlt = this.querySelector('img').getAttribute('alt');
                
                // Create modal elements
                const modal = document.createElement('div');
                modal.className = 'gallery-modal';
                
                const modalContent = document.createElement('div');
                modalContent.className = 'gallery-modal-content';
                
                const closeBtn = document.createElement('span');
                closeBtn.className = 'gallery-modal-close';
                closeBtn.innerHTML = '&times;';
                
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = imgAlt;
                
                const caption = document.createElement('p');
                caption.className = 'gallery-modal-caption';
                caption.textContent = imgAlt;
                
                // Append elements
                modalContent.appendChild(closeBtn);
                modalContent.appendChild(img);
                modalContent.appendChild(caption);
                modal.appendChild(modalContent);
                document.body.appendChild(modal);
                
                // Prevent scrolling on body
                document.body.style.overflow = 'hidden';
                
                // Close modal when clicking close button or outside the image
                closeBtn.addEventListener('click', closeModal);
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        closeModal();
                    }
                });
                
                function closeModal() {
                    document.body.removeChild(modal);
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    // Product quantity selector
    const quantityInputs = document.querySelectorAll('.quantity-input');
    if (quantityInputs.length > 0) {
        quantityInputs.forEach(input => {
            const decreaseBtn = input.parentElement.querySelector('.decrease-btn');
            const increaseBtn = input.parentElement.querySelector('.increase-btn');
            
            decreaseBtn.addEventListener('click', function() {
                let value = parseInt(input.value);
                if (value > 1) {
                    input.value = value - 1;
                }
            });
            
            increaseBtn.addEventListener('click', function() {
                let value = parseInt(input.value);
                input.value = value + 1;
            });
            
            // Ensure only numbers are entered
            input.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9]/g, '');
                if (this.value === '' || parseInt(this.value) < 1) {
                    this.value = '1';
                }
            });
        });
    }
    
    // Testimonials slider (if implemented)
    const testimonialsContainer = document.querySelector('.testimonials-slider');
    if (testimonialsContainer) {
        const testimonials = testimonialsContainer.querySelectorAll('.testimonial-card');
        const prevBtn = testimonialsContainer.querySelector('.slider-prev');
        const nextBtn = testimonialsContainer.querySelector('.slider-next');
        
        let currentIndex = 0;
        
        // Show initial testimonial
        updateSlider();
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = testimonials.length - 1;
            }
            updateSlider();
        });
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            currentIndex++;
            if (currentIndex >= testimonials.length) {
                currentIndex = 0;
            }
            updateSlider();
        });
        
        function updateSlider() {
            testimonials.forEach((testimonial, index) => {
                if (index === currentIndex) {
                    testimonial.style.display = 'block';
                } else {
                    testimonial.style.display = 'none';
                }
            });
        }
        
        // Auto-advance slider every 5 seconds
        setInterval(function() {
            currentIndex++;
            if (currentIndex >= testimonials.length) {
                currentIndex = 0;
            }
            updateSlider();
        }, 5000);
    }
    
    // Implement a simple fade-in animation for sections as they come into view
    const animatedSections = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedSections.length > 0) {
        // Check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }
        
        // Add 'animate' class when element comes into view
        function handleScroll() {
            animatedSections.forEach(section => {
                if (isInViewport(section) && !section.classList.contains('animated')) {
                    section.classList.add('animated');
                }
            });
        }
        
        // Initial check on page load
        handleScroll();
        
        // Check on scroll
        window.addEventListener('scroll', handleScroll);
    }
});