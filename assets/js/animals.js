/* animals.js - JavaScript for the Animals page */
document.addEventListener('DOMContentLoaded', function() {
    // Category filtering
    const categoryTags = document.querySelectorAll('.category-tag');
    const cowCards = document.querySelectorAll('.cow-card');
    
    categoryTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Remove active class from all tags
            categoryTags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tag
            this.classList.add('active');
            
            // Get category
            const category = this.getAttribute('data-category');
            
            // Filter items with animation
            cowCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Animate cards on scroll
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    function handleScroll() {
        cowCards.forEach(card => {
            if (isInViewport(card) && !card.classList.contains('animated')) {
                card.classList.add('animated');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state
    cowCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease-out';
    });
    
    // Check on scroll and initial load
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    // Add hover effect guidance for mobile
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        const flipHints = document.querySelectorAll('.flip-hint');
        flipHints.forEach(hint => {
            hint.innerHTML = '<i class="fas fa-hand-point-up"></i>';
            hint.setAttribute('title', 'Tap to flip');
        });
    }
});