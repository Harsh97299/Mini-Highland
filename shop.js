/* shop.js - JavaScript for the Farm Shop page */


document.addEventListener('DOMContentLoaded', function () {
    // Shopping cart functionality
    const cart = {
        items: [],
        total: 0,

        // Add item to cart
        addItem(name, price, image) {
            // Check if item already in cart
            const existingItem = this.items.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                this.items.push({
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                });
            }

            this.updateTotal();
            this.saveCart();
            this.renderCart();
            this.updateCartCount();

            // Show notification
            showNotification(`${name} added to your basket!`);
        },

        // Remove item from cart
        removeItem(index) {
            this.items.splice(index, 1);
            this.updateTotal();
            this.saveCart();
            this.renderCart();
            this.updateCartCount();
        },

        // Update item quantity
        updateQuantity(index, quantity) {
            if (quantity < 1) quantity = 1;
            this.items[index].quantity = quantity;
            this.updateTotal();
            this.saveCart();
            this.renderCart();
            this.updateCartCount();
        },

        // Calculate total
        updateTotal() {
            this.total = this.items.reduce((sum, item) => {
                return sum + (parseFloat(item.price) * item.quantity);
            }, 0);
        },

        // Clear cart
        clearCart() {
            this.items = [];
            this.total = 0;
            this.saveCart();
            this.renderCart();
            this.updateCartCount();
        },

        // Save cart to localStorage
        saveCart() {
            localStorage.setItem('farmShopCart', JSON.stringify(this.items));
        },

        // Load cart from localStorage
        loadCart() {
            const savedCart = localStorage.getItem('farmShopCart');
            if (savedCart) {
                this.items = JSON.parse(savedCart);
                this.updateTotal();
                this.renderCart();
                this.updateCartCount();
            }
        },

        // Render cart items in modal
        renderCart() {
            const cartItemsElement = document.getElementById('cart-items');
            const cartTotalElement = document.getElementById('cart-total');

            if (!cartItemsElement || !cartTotalElement) return;

            // Clear current items
            cartItemsElement.innerHTML = '';

            if (this.items.length === 0) {
                cartItemsElement.innerHTML = '<div class="empty-cart-message">Your basket is empty</div>';
            } else {
                // Add each item
                this.items.forEach((item, index) => {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'cart-item';

                    const itemPrice = parseFloat(item.price) * item.quantity;

                    itemElement.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${itemPrice.toFixed(2)}</div>
                        </div>
                        <div class="cart-item-actions">
                            <div class="cart-item-quantity">
                                <button class="quantity-btn decrease" data-index="${index}">-</button>
                                <span class="quantity-value">${item.quantity}</span>
                                <button class="quantity-btn increase" data-index="${index}">+</button>
                            </div>
                            <button class="remove-item" data-index="${index}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;

                    cartItemsElement.appendChild(itemElement);
                });

                // Add event listeners to new elements
                document.querySelectorAll('.decrease').forEach(btn => {
                    btn.addEventListener('click', function () {
                        const index = parseInt(this.getAttribute('data-index'));
                        const newQuantity = cart.items[index].quantity - 1;
                        if (newQuantity >= 1) {
                            cart.updateQuantity(index, newQuantity);
                        }
                    });
                });

                document.querySelectorAll('.increase').forEach(btn => {
                    btn.addEventListener('click', function () {
                        const index = parseInt(this.getAttribute('data-index'));
                        cart.updateQuantity(index, cart.items[index].quantity + 1);
                    });
                });

                document.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', function () {
                        const index = parseInt(this.getAttribute('data-index'));
                        cart.removeItem(index);
                    });
                });
            }

            // Update total
            cartTotalElement.textContent = `$${this.total.toFixed(2)}`;
        },

        // Update cart count on button
        updateCartCount() {
            const cartCount = document.getElementById('cart-count');
            if (!cartCount) return;

            const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = count;

            // Show/hide count based on if there are items
            if (count > 0) {
                cartCount.style.display = 'flex';
            } else {
                cartCount.style.display = 'none';
            }
        }
    };

    // Load cart from localStorage
    cart.loadCart();

    // Cart modal functionality
    const cartModal = document.getElementById('cart-modal');
    const cartOverlay = document.getElementById('cart-overlay');
    const floatingCartBtn = document.getElementById('floating-cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const clearCartBtn = document.getElementById('clear-cart');
    const checkoutBtn = document.getElementById('checkout');

    // Open cart modal
    if (floatingCartBtn) {
        floatingCartBtn.addEventListener('click', function () {
            cartModal.classList.add('active');
            cartOverlay.classList.add('active');
        });
    }

    // Close cart modal
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', function () {
            cartModal.classList.remove('active');
            cartOverlay.classList.remove('active');
        });
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', function () {
            cartModal.classList.remove('active');
            cartOverlay.classList.remove('active');
        });
    }

    // Clear cart
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function () {
            if (confirm('Are you sure you want to clear your basket?')) {
                cart.clearCart();
            }
        });
    }

    // Checkout
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            if (cart.items.length > 0) {
                alert('Thank you for your order! In a real implementation, you would proceed to a checkout page. For this demo, we\'ll just clear your cart.');
                cart.clearCart();
                cartModal.classList.remove('active');
                cartOverlay.classList.remove('active');
            } else {
                alert('Your basket is empty. Add some products before checking out!');
            }
        });
    }

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.product-card');
            const name = card.querySelector('.product-name').textContent;
            const priceText = card.querySelector('.product-price').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            const image = card.querySelector('.product-image').getAttribute('src');

            cart.addItem(name, price, image);
        });
    });

    // Box order buttons
    document.querySelectorAll('.box-order-btn').forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.box-card');
            const name = card.querySelector('.box-title').textContent;
            const priceText = card.querySelector('.box-price').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            const image = card.querySelector('.box-image').getAttribute('src');

            cart.addItem(name, price, image);
        });
    });

    // Product category tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    const productCards = document.querySelectorAll('.product-card');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Get category
            const category = this.getAttribute('data-category');

            // Filter products
            productCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('animate');
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('animate');
                    }
                }, 300);
            });
        });
    });

    // Schedule visit form
    const visitForm = document.getElementById('visit-form');
    if (visitForm) {
        visitForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('visit-name').value;
            const date = document.getElementById('visit-date').value;
            const time = document.getElementById('visit-time').value;

            // Show confirmation
            alert(`Thank you, ${name}! Your visit is scheduled for ${date} at ${time}. We'll send a confirmation email with details.`);

            // Reset form
            this.reset();
        });
    }

    // Helper function to show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles inline since we don't want to modify the CSS file again
        notification.style.position = 'fixed';
        notification.style.bottom = '100px';
        notification.style.right = '30px';
        notification.style.backgroundColor = 'var(--primary-color)';
        notification.style.color = 'white';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '10px';
        notification.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '9999';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'all 0.3s ease';

        // Add to body
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';

            // Remove from DOM after transition
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Animate product cards on scroll
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    function handleScroll() {
        productCards.forEach(card => {
            if (isInViewport(card) && !card.classList.contains('scrolled')) {
                card.classList.add('scrolled');
                card.classList.add('animate');
            }
        });
    }

    // Initial animation
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });

    // Check on scroll and initial load
    window.addEventListener('scroll', handleScroll);
    handleScroll();
});

// Fix all shop page issues
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS to fix styling and prevent label overlap
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Position coming soon label */
      .coming-soon-label {
        position: relative;
        display: inline-block;
        margin: 10px 0;
        padding: 5px 10px;
        background-color: #336633;
        color: white;
        font-weight: bold;
        border-radius: 3px;
        z-index: 5;
        text-align: center;
        font-size: 18px;
      }
      
      /* Position labels to avoid overlap */
      .product-item .best-seller-label,
      .product-card .best-seller-label {
        top: 10px;
        right: 10px;
      }
      
      .product-item .seasonal-label,
      .product-card .seasonal-label {
        top: 10px;
        right: 100px;
      }
      
      .product-item .sold-out-label,
      .product-card .sold-out-label {
        top: 50px !important;
        right: 10px;
        background-color: #FF5733 !important;
        color: white !important;
        text-align: center;
      }
      
      /* Ensure farm fresh section has proper positioning */
      .farm-fresh-box, .farm-fresh-section, #farm-fresh {
        position: relative;
        margin-top: 20px;
        padding-top: 10px;
      }
    `;
    document.head.appendChild(styleElement);
    
    // 1. Make all products visible
    const productElements = document.querySelectorAll('.product-item, .product-card');
    productElements.forEach(function(product) {
      // Make sure all products are visible
      if (product.style.display === 'none') {
        product.style.display = 'block';
      }
      product.style.opacity = '1';
      
      // Ensure product has position relative for absolute positioning
      if (window.getComputedStyle(product).position === 'static') {
        product.style.position = 'relative';
      }
      
      // 2. Add SOLD OUT label to each product
      if (!product.querySelector('.sold-out-label')) {
        const soldOutLabel = document.createElement('div');
        soldOutLabel.className = 'product-label sold-out-label';
        soldOutLabel.textContent = 'SOLD OUT';
        product.appendChild(soldOutLabel);
      }
    });
    
    // 3. Add COMING SOON to farm fresh box section
    const farmFreshSection = document.querySelector('.farm-fresh-box, .farm-fresh-section, #farm-fresh');
    if (farmFreshSection) {
      // Create coming soon label
      const comingSoonLabel = document.createElement('div');
      comingSoonLabel.className = 'coming-soon-label';
      comingSoonLabel.textContent = 'COMING SOON';
      
      // Add it to the section
      if (farmFreshSection.firstChild) {
        farmFreshSection.insertBefore(comingSoonLabel, farmFreshSection.firstChild);
      } else {
        farmFreshSection.appendChild(comingSoonLabel);
      }
    }
    
    // Ensure product containers are visible
    const productContainers = document.querySelectorAll('.products-container, .product-grid, .product-list');
    productContainers.forEach(function(container) {
      if (window.getComputedStyle(container).display === 'none') {
        container.style.display = 'block';
      }
    });
  });
