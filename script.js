   // Mobile Navigation Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        const navOverlay = document.getElementById('navOverlay');
        const body = document.body;
        
        function toggleMobileMenu() {
            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }

        function closeMobileMenu() {
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            body.classList.remove('menu-open');
            
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }

        // Toggle menu on button click
        mobileToggle.addEventListener('click', toggleMobileMenu);

        // Close menu when clicking overlay
        navOverlay.addEventListener('click', closeMobileMenu);

        // Close menu when clicking on navigation links
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            });
        });

        // Close menu on window resize if screen becomes larger
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
        
        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active navigation link
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        const icon = mobileToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                        document.body.style.overflow = 'auto';
                    }
                }
            });
        });
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Set active navigation based on scroll position
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('nav a');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
        
        // Animation on scroll
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.section-title, .aim-card, .outcome-box, .help-card, .about-image, .about-text');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Set initial state for animation
        document.querySelectorAll('.section-title, .aim-card, .outcome-box, .help-card, .about-image, .about-text').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
        
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', () => {
            animateOnScroll();
            // Set home link active on load
            document.querySelector('nav a[href="#home"]').classList.add('active');
        });