        // Enhanced JavaScript functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize shopping cart
            initializeShoppingCart();
            
            // Create particle system
            createParticleSystem();
            
            // Mobile navigation
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close mobile menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
            
            // Navbar scroll effect
            window.addEventListener('scroll', function() {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
            
            // Back to top button
            const backToTop = document.querySelector('.back-to-top');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const headerOffset = 100;
                        const elementPosition = target.offsetTop;
                        const offsetPosition = elementPosition - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Intersection Observer for scroll animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);
            
            // Observe all elements with animation classes
            document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
                observer.observe(el);
            });
            
            // Menu category filtering
            const categoryBtns = document.querySelectorAll('.category-btn');
            const menuItems = document.querySelectorAll('.menu-item');
            
            categoryBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove active class from all buttons
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Simple show all items for demo (in real app, you'd filter based on categories)
                    menuItems.forEach(item => {
                        item.style.display = 'block';
                        item.classList.add('fade-in');
                    });
                });
            });
            
            // Enhanced contact form handling
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Get form data
                    const formData = new FormData(this);
                    const name = formData.get('name').trim();
                    const email = formData.get('email').trim();
                    const phone = formData.get('phone').trim();
                    const message = formData.get('message').trim();
                    
                    // Enhanced validation
                    const errors = [];
                    
                    if (!name || name.length < 2) {
                        errors.push('Name must be at least 2 characters long');
                    }
                    
                    if (!email || !isValidEmail(email)) {
                        errors.push('Please enter a valid email address');
                    }
                    
                    if (phone && !isValidPhone(phone)) {
                        errors.push('Please enter a valid phone number');
                    }
                    
                    if (!message || message.length < 10) {
                        errors.push('Message must be at least 10 characters long');
                    }
                    
                    if (errors.length > 0) {
                        showNotification(errors.join('\n'), 'error');
                        return;
                    }
                    
                    // Simulate form submission with loading state
                    const submitBtn = this.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<span>Sending...</span>';
                    submitBtn.disabled = true;
                    
                    // Simulate API call
                    setTimeout(() => {
                        showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
                        this.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        
                        // Reset form labels
                        this.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
                            input.classList.remove('has-value');
                        });
                    }, 2000);
                });
                
                // Add floating label functionality
                contactForm.querySelectorAll('input, textarea').forEach(input => {
                    input.addEventListener('focus', function() {
                        this.parentElement.classList.add('focused');
                    });
                    
                    input.addEventListener('blur', function() {
                        this.parentElement.classList.remove('focused');
                        if (this.value.trim()) {
                            this.classList.add('has-value');
                        } else {
                            this.classList.remove('has-value');
                        }
                    });
                    
                    input.addEventListener('input', function() {
                        if (this.value.trim()) {
                            this.classList.add('has-value');
                        } else {
                            this.classList.remove('has-value');
                        }
                    });
                });
            }
            
            // Enhanced add to cart functionality
            document.querySelectorAll('.add-to-cart').forEach(btn => {
                btn.addEventListener('click', function() {
                    const menuItem = this.closest('.menu-item');
                    const itemName = menuItem.querySelector('h3').textContent;
                    const priceText = menuItem.querySelector('.price-tag').textContent;
                    const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
                    
                    // Add item to cart
                    addToCart({
                        id: Date.now(), // Simple ID generation
                        name: itemName,
                        price: price,
                        quantity: 1
                    });
                    
                    // Animate button
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                    
                    showNotification(`${itemName} added to cart!`, 'success');
                });
            });
            
            // Enhanced hover effects for menu items
            document.querySelectorAll('.menu-item').forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-20px) scale(1.03)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
            
            // Counter animation for stats
            animateCounters();
        });
        
        // Shopping Cart System
        let shoppingCart = [];

        function initializeShoppingCart() {
            // Load cart from localStorage
            const savedCart = localStorage.getItem('parkTimeCart');
            if (savedCart) {
                shoppingCart = JSON.parse(savedCart);
            }
            
            // Create cart icon in navbar
            createCartIcon();
            updateCartDisplay();
        }

        function createCartIcon() {
            const navMenu = document.querySelector('.nav-menu');
            const cartItem = document.createElement('li');
            cartItem.className = 'nav-item cart-item';
            cartItem.innerHTML = `
                <a href="#" class="cart-icon" id="cartIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span class="cart-count" id="cartCount">0</span>
                </a>
            `;
            
            // Insert before the last item (login button)
            navMenu.insertBefore(cartItem, navMenu.lastElementChild);
            
            // Add cart modal functionality
            document.getElementById('cartIcon').addEventListener('click', function(e) {
                e.preventDefault();
                showCartModal();
            });
        }

        function addToCart(item) {
            const existingItem = shoppingCart.find(cartItem => cartItem.name === item.name);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                shoppingCart.push(item);
            }
            
            // Save to localStorage
            localStorage.setItem('parkTimeCart', JSON.stringify(shoppingCart));
            updateCartDisplay();
        }

        function updateCartDisplay() {
            const cartCount = document.getElementById('cartCount');
            const totalItems = shoppingCart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Add animation if items were added
            if (totalItems > 0) {
                cartCount.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    cartCount.style.transform = 'scale(1)';
                }, 200);
            }
        }

        function showCartModal() {
            // Create cart modal
            const modal = document.createElement('div');
            modal.className = 'modal-overlay cart-modal';
            modal.id = 'cartModal';
            
            const total = shoppingCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            modal.innerHTML = `
                <div class="modal-container cart-container">
                    <div class="modal-header">
                        <h2>Shopping Cart</h2>
                        <button class="modal-close" id="closeCartModal">&times;</button>
                    </div>
                    <div class="cart-content">
                        ${shoppingCart.length === 0 ? 
                            '<p class="empty-cart">Your cart is empty. Add some delicious coffee!</p>' :
                            shoppingCart.map(item => `
                                <div class="cart-item-row">
                                    <div class="cart-item-info">
                                        <h4>${item.name}</h4>
                                        <p>₱${item.price.toFixed(2)}</p>
                                    </div>
                                    <div class="cart-item-controls">
                                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                                        <span class="quantity">${item.quantity}</span>
                                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                                        <button class="remove-btn" onclick="removeFromCart(${item.id})">×</button>
                                    </div>
                                </div>
                            `).join('')
                        }
                    </div>
                    ${shoppingCart.length > 0 ? `
                        <div class="cart-footer">
                            <div class="cart-total">
                                <strong>Total: ₱${total.toFixed(2)}</strong>
                            </div>
                            <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
                        </div>
                    ` : ''}
                </div>
            `;
            
            document.body.appendChild(modal);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Close modal functionality
            document.getElementById('closeCartModal').addEventListener('click', () => {
                closeCartModal();
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeCartModal();
                }
            });
        }

        function closeCartModal() {
            const modal = document.getElementById('cartModal');
            if (modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    if (modal.parentNode) {
                        modal.parentNode.removeChild(modal);
                    }
                }, 300);
                document.body.style.overflow = 'auto';
            }
        }

        // Make these functions globally accessible for inline onclick handlers
        window.updateQuantity = function(itemId, change) {
            const item = shoppingCart.find(cartItem => cartItem.id === itemId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    window.removeFromCart(itemId);
                } else {
                    localStorage.setItem('parkTimeCart', JSON.stringify(shoppingCart));
                    updateCartDisplay();
                    showCartModal(); // Refresh modal
                }
            }
        };

        window.removeFromCart = function(itemId) {
            shoppingCart = shoppingCart.filter(item => item.id !== itemId);
            localStorage.setItem('parkTimeCart', JSON.stringify(shoppingCart));
            updateCartDisplay();
            showCartModal(); // Refresh modal
        };

        window.checkout = function() {
            if (shoppingCart.length === 0) {
                showNotification('Your cart is empty!', 'error');
                return;
            }
            
            // Clear cart
            shoppingCart = [];
            localStorage.removeItem('parkTimeCart');
            updateCartDisplay();
            closeCartModal();
            
            showNotification('Order placed successfully! Thank you for choosing Park-Time Coffee.', 'success');
        };
        
        // Modal functionality
        document.addEventListener('DOMContentLoaded', function() {
            const loginBtn = document.getElementById('loginBtn');
            const loginModal = document.getElementById('loginModal');
            const signupModal = document.getElementById('signupModal');
            const closeLoginModal = document.getElementById('closeLoginModal');
            const closeSignupModal = document.getElementById('closeSignupModal');
            const switchToSignup = document.getElementById('switchToSignup');
            const switchToLogin = document.getElementById('switchToLogin');
            const loginForm = document.getElementById('loginForm');
            const signupForm = document.getElementById('signupForm');
            const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
            const forgotPasswordModal = document.getElementById('forgotPasswordModal');
            const closeForgotPasswordModal = document.getElementById('closeForgotPasswordModal');
            const forgotPasswordForm = document.getElementById('forgotPasswordForm');
            const backToLogin = document.getElementById('backToLogin');

            // Debug: Check if all elements are found
            console.log('Login form found:', !!loginForm);
            console.log('Signup form found:', !!signupForm);
            console.log('Forgot password form found:', !!forgotPasswordForm);

            // Open login modal
            loginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                loginModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            // Close modals
            function closeModal(modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }

            closeLoginModal.addEventListener('click', () => closeModal(loginModal));
            closeSignupModal.addEventListener('click', () => closeModal(signupModal));
            closeForgotPasswordModal.addEventListener('click', () => closeModal(forgotPasswordModal));

            // Close modal when clicking outside
            loginModal.addEventListener('click', function(e) {
                if (e.target === loginModal) {
                    closeModal(loginModal);
                }
            });

            signupModal.addEventListener('click', function(e) {
                if (e.target === signupModal) {
                    closeModal(signupModal);
                }
            });

            forgotPasswordModal.addEventListener('click', function(e) {
                if (e.target === forgotPasswordModal) {
                    closeModal(forgotPasswordModal);
                }
            });

            // Switch between modals
            switchToSignup.addEventListener('click', function(e) {
                e.preventDefault();
                closeModal(loginModal);
                setTimeout(() => {
                    signupModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }, 300);
            });

            switchToLogin.addEventListener('click', function(e) {
                e.preventDefault();
                closeModal(signupModal);
                setTimeout(() => {
                    loginModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }, 300);
            });

            // Forgot password functionality
            forgotPasswordBtn.addEventListener('click', function(e) {
                e.preventDefault();
                closeModal(loginModal);
                setTimeout(() => {
                    forgotPasswordModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }, 300);
            });

            backToLogin.addEventListener('click', function(e) {
                e.preventDefault();
                closeModal(forgotPasswordModal);
                setTimeout(() => {
                    loginModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }, 300);
            });

            // Enhanced login form handling
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Login form submitted'); // Debug log
                
                const email = document.getElementById('loginEmail').value.trim();
                const password = document.getElementById('loginPassword').value;
                const remember = document.querySelector('input[name="remember"]').checked;

                // Enhanced validation
                const errors = [];
                
                if (!email || !isValidEmail(email)) {
                    errors.push('Please enter a valid email address');
                }
                
                if (!password || password.length < 6) {
                    errors.push('Password must be at least 6 characters long');
                }
                
                if (errors.length > 0) {
                    showNotification(errors.join('\n'), 'error');
                    return;
                }

                // Simulate login process
                const submitBtn = loginForm.querySelector('.auth-submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Signing In...</span>';
                submitBtn.disabled = true;

                setTimeout(() => {
                    // Simulate successful login
                    showNotification('Login successful! Welcome back to Park-Time Coffee.', 'success');
                    closeModal(loginModal);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    loginForm.reset();
                    
                    // Update login button to show user is logged in
                    const loginBtn = document.getElementById('loginBtn');
                    loginBtn.textContent = 'Welcome!';
                    loginBtn.style.background = 'var(--coffee-gradient)';
                }, 2000);
            });

            // Enhanced signup form handling
            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Signup form submitted'); // Debug log
                
                const formData = new FormData(signupForm);
                const data = Object.fromEntries(formData);
                
                console.log('Form data:', data); // Debug log
                
                // Enhanced validation
                const errors = [];
                
                if (!data.firstName || data.firstName.trim().length < 2) {
                    errors.push('First name must be at least 2 characters long');
                }
                
                if (!data.lastName || data.lastName.trim().length < 2) {
                    errors.push('Last name must be at least 2 characters long');
                }
                
                if (!data.email || !isValidEmail(data.email)) {
                    errors.push('Please enter a valid email address');
                }
                
                if (data.phone && !isValidPhone(data.phone)) {
                    errors.push('Please enter a valid phone number');
                }
                
                if (!data.password || data.password.length < 8) {
                    errors.push('Password must be at least 8 characters long');
                }
                
                if (data.password !== data.confirmPassword) {
                    errors.push('Passwords do not match');
                }
                
                if (!data.terms) {
                    errors.push('You must agree to the Terms of Service and Privacy Policy');
                }
                
                console.log('Validation errors:', errors); // Debug log
                
                if (errors.length > 0) {
                    showNotification(errors.join('\n'), 'error');
                    return;
                }

                // Simulate signup process
                const submitBtn = signupForm.querySelector('.auth-submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Creating Account...</span>';
                submitBtn.disabled = true;

                setTimeout(() => {
                    // Simulate successful signup
                    showNotification('Account created successfully! Welcome to Park-Time Coffee.', 'success');
                    closeModal(signupModal);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    signupForm.reset();
                    
                    // Switch to login modal
                    setTimeout(() => {
                        loginModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }, 500);
                }, 2000);
            });

            // Close modal with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    if (loginModal.classList.contains('active')) {
                        closeModal(loginModal);
                                    } else if (signupModal.classList.contains('active')) {
                    closeModal(signupModal);
                } else if (forgotPasswordModal.classList.contains('active')) {
                    closeModal(forgotPasswordModal);
                } else if (document.getElementById('cartModal')?.classList.contains('active')) {
                    closeCartModal();
                }
                }
            });
            
            // Forgot password form handling
            forgotPasswordForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('forgotPasswordEmail').value.trim();

                if (!email || !isValidEmail(email)) {
                    showNotification('Please enter a valid email address', 'error');
                    return;
                }

                const submitBtn = forgotPasswordForm.querySelector('.auth-submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Sending...</span>';
                submitBtn.disabled = true;

                setTimeout(() => {
                    showNotification('Password reset link sent! Check your email for instructions.', 'success');
                    closeModal(forgotPasswordModal);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    forgotPasswordForm.reset();
                }, 2000);
            });

            // Add floating label functionality to auth forms
            [loginForm, signupForm, forgotPasswordForm].forEach(form => {
                if (form) {
                    console.log('Setting up floating labels for form:', form.id);
                    form.querySelectorAll('input, textarea').forEach(input => {
                        input.addEventListener('focus', function() {
                            this.parentElement.classList.add('focused');
                        });
                        
                        input.addEventListener('blur', function() {
                            this.parentElement.classList.remove('focused');
                            if (this.value.trim()) {
                                this.classList.add('has-value');
                            } else {
                                this.classList.remove('has-value');
                            }
                        });
                        
                        input.addEventListener('input', function() {
                            if (this.value.trim()) {
                                this.classList.add('has-value');
                            } else {
                                this.classList.remove('has-value');
                            }
                        });
                    });
                } else {
                    console.log('Form not found for floating labels setup');
                }
            });
        });
        
        // Particle system creation
        function createParticleSystem() {
            const container = document.querySelector('.particle-container');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                createParticle(container);
            }
            
            // Continuously create new particles
            setInterval(() => {
                if (document.querySelectorAll('.particle').length < particleCount) {
                    createParticle(container);
                }
            }, 2000);
        }
        
        function createParticle(container) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random horizontal position
            particle.style.left = Math.random() * 100 + '%';
            
            // Random size
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random animation duration
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            container.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 25000);
        }
        
        // Counter animation
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = counter.textContent.replace(/[^\d]/g, '');
                        const increment = Math.ceil(target / 100);
                        let current = 0;
                        
                        const updateCounter = () => {
                            if (current < target) {
                                current += increment;
                                if (current > target) current = target;
                                
                                if (counter.textContent.includes('★')) {
                                    counter.textContent = current + '★';
                                } else if (counter.textContent.includes('+')) {
                                    counter.textContent = current + '+';
                                } else {
                                    counter.textContent = current;
                                }
                                
                                requestAnimationFrame(updateCounter);
                            }
                        };
                        
                        updateCounter();
                        observer.unobserve(counter);
                    }
                });
            });
            
            counters.forEach(counter => observer.observe(counter));
        }
        
        // Notification system
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: ${type === 'success' ? 'var(--coffee-gradient)' : '#dc3545'};
                color: white;
                padding: 1rem 2rem;
                border-radius: 25px;
                z-index: 10000;
                transform: translateX(400px);
                transition: all 0.3s ease;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                backdrop-filter: blur(20px);
                font-weight: 600;
                letter-spacing: 0.5px;
            `;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Remove after delay
            setTimeout(() => {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }
        
        // Enhanced scroll effects
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero');
            const speed = scrolled * 0.5;
            
            if (parallax) {
                parallax.style.transform = `translateY(${speed}px)`;
            }
            
            // Add floating animation to shapes based on scroll
            document.querySelectorAll('.shape').forEach((shape, index) => {
                const movement = scrolled * (0.1 + index * 0.05);
                shape.style.transform = `translateY(${movement}px) rotate(${movement * 0.5}deg)`;
            });
        });
        
        // Add loading animation
        window.addEventListener('load', function() {
            document.body.classList.add('loaded');
            
            // Trigger initial animations
            setTimeout(() => {
                document.querySelectorAll('.fade-in').forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, index * 100);
                });
            }, 500);
        });

        // Utility functions
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function isValidPhone(phone) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
        }