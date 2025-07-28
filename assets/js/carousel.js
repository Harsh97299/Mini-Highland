// === IMAGE CAROUSEL FUNCTIONALITY ===

// Function to set up the image carousel for each feature card
function setupCarousels() {
    // Get all carousel containers
    const carousels = document.querySelectorAll('.image-carousel');
    
    // Initialize each carousel
    carousels.forEach((carousel, index) => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const prevBtn = carousel.querySelector('.carousel-arrow.prev');
        const nextBtn = carousel.querySelector('.carousel-arrow.next');
        const playPauseBtn = carousel.querySelector('.carousel-control');
        
        let currentSlide = 0;
        let isPlaying = true;
        let slideInterval = null;
        
        // Function to show a specific slide
        const showSlide = (n) => {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Calculate the correct slide index
            currentSlide = (n + slides.length) % slides.length;
            
            // Add active class to current slide and dot
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };
        
        // Function to move to the next slide
        const nextSlide = () => {
            showSlide(currentSlide + 1);
        };
        
        // Function to move to the previous slide
        const prevSlide = () => {
            showSlide(currentSlide - 1);
        };
        
        // Set up click events for navigation arrows
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetTimer();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetTimer();
            });
        }
        
        // Set up click events for dots
        dots.forEach((dot, dotIndex) => {
            dot.addEventListener('click', () => {
                showSlide(dotIndex);
                resetTimer();
            });
        });
        
        // Function to toggle play/pause
        const togglePlayPause = () => {
            if (isPlaying) {
                clearInterval(slideInterval);
                if (playPauseBtn) {
                    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            } else {
                startTimer();
                if (playPauseBtn) {
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                }
            }
            isPlaying = !isPlaying;
        };
        
        // Set up click event for play/pause button
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', togglePlayPause);
        }
        
        // Function to start the slideshow timer
        const startTimer = () => {
            // Set different intervals for each carousel to create staggered animation
            const delay = 5000 + (index * 1000);
            slideInterval = setInterval(nextSlide, delay);
        };
        
        // Function to reset the timer
        const resetTimer = () => {
            if (isPlaying) {
                clearInterval(slideInterval);
                startTimer();
            }
        };
        
        // Initialize the first slide
        showSlide(0);
        
        // Start the slideshow
        startTimer();
        
        // Pause slideshow when user hovers over the carousel
        carousel.addEventListener('mouseenter', () => {
            if (isPlaying) {
                clearInterval(slideInterval);
            }
        });
        
        // Resume slideshow when user leaves the carousel
        carousel.addEventListener('mouseleave', () => {
            if (isPlaying) {
                startTimer();
            }
        });
    });
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    setupCarousels();
});