document.addEventListener('DOMContentLoaded', () => {
    // === Mobile Menu Toggle ===
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('active');
            menuBtn.classList.toggle('fa-times', isOpen);
            menuBtn.classList.toggle('fa-bars', !isOpen);

            mobileMenu.style.opacity = isOpen ? '1' : '0';
            mobileMenu.style.transform = isOpen ? 'translateY(0)' : 'translateY(-10px)';
        });
    }

    // === Set Footer Year ===
    const year = document.getElementById('current-year');
    if (year) year.textContent = new Date().getFullYear();

    // === Pagination Variables ===
    const tabs = document.querySelectorAll('.category-tab');
    const cards = document.querySelectorAll('.post-card');
    const pageLinks = document.querySelectorAll('.page-link');
    const postsPerPage = 3;
    let currentPage = 1;
    let currentCategory = 'all';

    // === Helper Functions ===
    function getFilteredPosts() {
        return [...cards].filter(card => 
            currentCategory === 'all' || card.dataset.category === currentCategory
        );
    }

    function getTotalPages() {
        const filteredPosts = getFilteredPosts();
        return Math.ceil(filteredPosts.length / postsPerPage);
    }

    function updatePaginationControls() {
        const totalPages = getTotalPages();
        
        pageLinks.forEach(link => {
            const page = link.dataset.page;
            link.classList.remove('active');
            
            if (page === 'next') {
                link.style.display = currentPage < totalPages ? 'flex' : 'none';
            } else if (!isNaN(page)) {
                const pageNum = parseInt(page);
                if (pageNum <= totalPages) {
                    // link.style.display = 'inline-block';
                    if (pageNum === currentPage) {
                        link.classList.add('active');
                    }
                } else {
                    link.style.display = 'none';
                }
            }
        });
    }

    function showPosts() {
        const filteredPosts = getFilteredPosts();
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;

        // Hide all posts first
        cards.forEach(card => {
            card.style.display = 'none';
        });

        // Show only the posts for current page and category
        filteredPosts.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = 'block';
                // Animate in
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.offsetHeight; // Force reflow
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.transition = 'all 0.4s ease-out';
                }, 100 * (index - startIndex));
            }
        });

        updatePaginationControls();
    }

    // === Category Filter ===
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update current category and reset to page 1
            currentCategory = category;
            currentPage = 1;
            
            // Show filtered posts
            showPosts();
        });
    });

    // === Pagination ===
    pageLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const page = link.dataset.page;
            
            if (page === 'next') {
                const totalPages = getTotalPages();
                if (currentPage < totalPages) {
                    currentPage++;
                }
            } else {
                const pageNum = parseInt(page);
                if (!isNaN(pageNum) && pageNum <= getTotalPages()) {
                    currentPage = pageNum;
                }
            }
            
            showPosts();
            scrollToPosts();
        });
    });

    function scrollToPosts() {
        const section = document.querySelector('.blog-posts');
        if (section) {
            window.scrollTo({ top: section.offsetTop - 100, behavior: 'smooth' });
        }
    }

    // Initialize - show first page of all posts
    showPosts();

    // === Newsletter Form ===
    const newsletterForm = document.getElementById('blog-newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', e => {
            e.preventDefault();

            const name = document.getElementById('nl-name').value.trim();
            const email = document.getElementById('nl-email').value.trim();
            const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!name || !email) return alert('Please fill in all required fields.');
            if (!validEmail) return alert('Please enter a valid email address.');

            alert(`Thanks for subscribing, ${name}! 🐮`);
            newsletterForm.reset();
        });
    }

    // === Header Scroll Effects ===
    const header = document.querySelector('.header');
    if (header) {
        const updateHeader = () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
                header.style.backgroundColor = 'rgba(136, 201, 161, 0.95)';
                header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            } else {
                header.classList.remove('header-scrolled');
                header.classList.add('header-transparent');
                header.style.backgroundColor = 'var(--primary-color)';
                header.style.boxShadow = '0 4px 20px rgba(136, 201, 161, 0.5)';
            }
        };
        window.addEventListener('scroll', updateHeader);
        updateHeader();
    }

    // === Floating Bubbles ===
    const bubbles = document.querySelectorAll('.bubble');
    const blogHero = document.querySelector('.blog-hero');
    if (bubbles.length && blogHero) {
        blogHero.addEventListener('mousemove', e => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            bubbles.forEach((b, i) => {
                const offsetX = (x - 0.5) * (10 + i * 5);
                const offsetY = (y - 0.5) * (10 + i * 5);
                b.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });

        blogHero.addEventListener('mouseleave', () => {
            bubbles.forEach(b => (b.style.transform = ''));
        });
    }

    // === Scroll Reveal for Posts ===
    const animateEls = document.querySelectorAll('.post-card, .featured-post-card');
    animateEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    const revealOnScroll = () => {
        animateEls.forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.9 && rect.bottom >= 0 && el.style.opacity === '0') {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100 * i);
            }
        });
    };

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
});