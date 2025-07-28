// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    function handleScroll() {
        timelineItems.forEach(item => {
            if (isInViewport(item) && !item.classList.contains('animated')) {
                item.classList.add('animated');
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.5s ease-out';
    });
    
    // Check on scroll and initial load
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasRun = false;
    
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCount() {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                return;
            }
            
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCount);
        }
        
        updateCount();
    }
    
    function handleStatsScroll() {
        const statsContainer = document.querySelector('.stats-container');
        if (statsContainer && isInViewport(statsContainer) && !hasRun) {
            hasRun = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                stat.textContent = '0';
                setTimeout(() => {
                    animateCounter(stat, target);
                }, 300);
            });
        }
    }
    
    window.addEventListener('scroll', handleStatsScroll);
    handleStatsScroll();
    
    // Team member hover effects
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});