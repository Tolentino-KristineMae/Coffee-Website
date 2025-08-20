        // Enhanced JavaScript functionality
        document.addEventListener('DOMContentLoaded', function() {
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
            
            // Contact form handling
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Simple form validation and submission simulation
                    const formData = new FormData(this);
                    const name = formData.get('name');
                    const email = formData.get('email');
                    const message = formData.get('message');
                    
                    if (name && email && message) {
                        // Simulate form submission
                        showNotification('Thank you! Your message has been sent successfully.', 'success');
                        this.reset();
                    } else {
                        showNotification('Please fill in all required fields.', 'error');
                    }
                });
            }
            
            // Add to cart functionality
            document.querySelectorAll('.add-to-cart').forEach(btn => {
                btn.addEventListener('click', function() {
                    const menuItem = this.closest('.menu-item');
                    const itemName = menuItem.querySelector('h3').textContent;
                    
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

            // Handle form submissions
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                const remember = document.querySelector('input[name="remember"]').checked;

                // Add your login logic here
                console.log('Login attempt:', { email, password, remember });
                
                // Simulate login process
                const submitBtn = loginForm.querySelector('.auth-submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Signing In...</span>';
                submitBtn.disabled = true;

                setTimeout(() => {
                    // Simulate successful login
                    alert('Login successful! Welcome back to Park-Time Coffee.');
                    closeModal(loginModal);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    loginForm.reset();
                }, 2000);
            });

            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(signupForm);
                const data = Object.fromEntries(formData);

                // Add your signup logic here
                console.log('Signup attempt:', data);

                // Validate password match
                if (data.password !== data.confirmPassword) {
                    alert('Passwords do not match!');
                    return;
                }

                // Simulate signup process
                const submitBtn = signupForm.querySelector('.auth-submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Creating Account...</span>';
                submitBtn.disabled = true;

                setTimeout(() => {
                    // Simulate successful signup
                    alert('Account created successfully! Welcome to Park-Time Coffee.');
                    closeModal(signupModal);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    signupForm.reset();
                }, 2000);
            });

            // Close modal with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    if (loginModal.classList.contains('active')) {
                        closeModal(loginModal);
                    } else if (signupModal.classList.contains('active')) {
                        closeModal(signupModal);
                    }
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