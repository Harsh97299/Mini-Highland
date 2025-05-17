/* contact.js - JavaScript for the Contact page */

document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeSuccessBtn = document.getElementById('close-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real implementation, you would send the form data to a server here
            // For this demo, we'll just show the success modal
            
            // Show success modal
            successModal.classList.add('active');
            modalOverlay.classList.add('active');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Close success modal
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', function() {
            successModal.classList.remove('active');
            modalOverlay.classList.remove('active');
        });
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            successModal.classList.remove('active');
            modalOverlay.classList.remove('active');
        });
    }
    
    // FAQ Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        header.addEventListener('click', function() {
            // Close all other items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-header').classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = '0';
                }
            });
            
            // Toggle current item
            const isActive = item.classList.contains('active');
            
            if (isActive) {
                item.classList.remove('active');
                header.classList.remove('active');
                content.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                header.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
            
            // Change icon
            const icon = header.querySelector('.accordion-icon i');
            if (isActive) {
                icon.className = 'fas fa-plus';
            } else {
                icon.className = 'fas fa-minus';
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('nl-email').value.trim();
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address for the newsletter.');
                return;
            }
            
            // Show a custom notification instead of the modal
            showNotification('Thanks for subscribing to our newsletter!');
            
            // Reset form
            newsletterForm.reset();
        });
    }
    
    // Helper function to show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        
        // Add styles inline since we don't want to modify the CSS file again
        notification.style.position = 'fixed';
        notification.style.bottom = '30px';
        notification.style.right = '30px';
        notification.style.backgroundColor = 'var(--primary-color)';
        notification.style.color = 'white';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '10px';
        notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '9999';
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(50px)';
        notification.style.transition = 'all 0.3s ease';
        
        // Content
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(50px)';
            
            // Remove from DOM after transition
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
    
    // Highlight the current day in hours
    function highlightCurrentDay() {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date().getDay(); // 0 (Sunday) to 6 (Saturday)
        const todayName = daysOfWeek[today];
        
        const hoursItems = document.querySelectorAll('.hours-item');
        
        hoursItems.forEach(item => {
            const dayText = item.querySelector('.day').textContent;
            
            if (dayText.includes(todayName)) {
                item.classList.add('current-day');
                item.querySelector('.day').textContent += ' (Today)';
            }
        });
    }
    
    highlightCurrentDay();
    
    // Animate contact method cards on scroll
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    function handleScroll() {
        const methodCards = document.querySelectorAll('.method-card');
        
        methodCards.forEach((card, index) => {
            if (isInViewport(card) && !card.classList.contains('animated')) {
                card.classList.add('animated');
                
                // Add staggered animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }
    
    // Set initial state
    const methodCards = document.querySelectorAll('.method-card');
    methodCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease-out';
    });
    
    // Check on scroll and initial load
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    // Validate form inputs as the user types
    const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form select');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
    
    function validateInput(input) {
        if (input.hasAttribute('required') && input.value.trim() === '') {
            input.style.borderColor = 'var(--accent-color)';
            return false;
        } else if (input.type === 'email' && input.value.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                input.style.borderColor = 'var(--accent-color)';
                return false;
            }
        }
        
        input.style.borderColor = 'var(--primary-color)';
        return true;
    }
});