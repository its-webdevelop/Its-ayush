/* --------------------------------------------------
   FIREBASE: loaded from firebase.js using the modular SDK
   -------------------------------------------------- */

        /* --------------------------------------------------
           PAGE INITIALIZATION & PRELOADER
           -------------------------------------------------- */
        window.addEventListener('DOMContentLoaded', () => {
            const progressBar = document.getElementById('loader-progress-bar');
            const preloader = document.getElementById('preloader');
            let progress = 0;

            // Keep the decorative loader short; the website must not depend on Firebase loading.
            const interval = setInterval(() => {
                progress = Math.min(100, progress + Math.floor(Math.random() * 15) + 5);
                if (progressBar) progressBar.style.width = progress + '%';
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        if (preloader) {
                            preloader.style.opacity = '0';
                            preloader.style.visibility = 'hidden';
                            preloader.style.pointerEvents = 'none';
                        }
                        // A missing optional animation must not keep the page blocked.
                        if (typeof animateSkills === 'function') animateSkills();
                    }, 200);
                }
            }, 50);
        });

        /* --------------------------------------------------
           DARK/LIGHT THEME SWITCHER
           -------------------------------------------------- */
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        const storedTheme = localStorage.getItem('theme') || 'dark';

        document.documentElement.setAttribute('data-theme', storedTheme);

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme = 'dark';

            if (currentTheme === 'dark') {
                newTheme = 'light';
            }

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Update Three.js theme color adjustments if necessary
            if (window.particleMaterial) {
                if (newTheme === 'light') {
                    window.particleMaterial.color.setHex(0x0070f3);
                    window.scene.background = new THREE.Color(0xf8fafc);
                } else {
                    window.particleMaterial.color.setHex(0x00f0ff);
                    window.scene.background = new THREE.Color(0x030309);
                }
            }
        });

        /* --------------------------------------------------
           CUSTOM CURSOR
           -------------------------------------------------- */
        const cursorDot = document.getElementById('custom-cursor-dot');
        const cursorOutline = document.getElementById('custom-cursor-outline');

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot matches exactly
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // Smooth lag animation for outer outline circle
        function animateCursor() {
            const speed = 0.15; // interpolation value
            outlineX += (mouseX - outlineX) * speed;
            outlineY += (mouseY - outlineY) * speed;

            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Event listener checks for cursor hover tags
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-card, input, select, textarea, .faq-header, .logo');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });

        /* --------------------------------------------------
           SCROLL PROGRESS BAR
           -------------------------------------------------- */
        const scrollProgress = document.getElementById('scroll-progress');
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progressPercent = (window.scrollY / scrollHeight) * 100;
            scrollProgress.style.width = progressPercent + '%';
        });

        /* --------------------------------------------------
           STICKY NAVBAR & ACTIVE NAVIGATION LINK TRACKING
           -------------------------------------------------- */
        const navbar = document.getElementById('main-navbar');
        const sections = document.querySelectorAll('section, header');
        const navLinks = document.querySelectorAll('#desktop-nav-links a, #mobile-menu-container a');

        window.addEventListener('scroll', () => {
            // Sticky header class trigger
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Active link highlighting
            let currentSection = 'hero';
            sections.forEach(sec => {
                const top = sec.offsetTop - 150;
                const height = sec.offsetHeight;
                if (window.scrollY >= top && window.scrollY < top + height) {
                    currentSection = sec.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });

        /* --------------------------------------------------
           MOBILE HAMBURGER TOGGLE MENU
           -------------------------------------------------- */
        const hamburger = document.getElementById('mobile-hamburger');
        const mobileMenu = document.getElementById('mobile-menu-container');
        const mobileOverlay = document.getElementById('mobile-overlay');
        const mobileLinks = mobileMenu.querySelectorAll('a');

        function toggleMenu() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
        }

        hamburger.addEventListener('click', toggleMenu);
        mobileOverlay.addEventListener('click', toggleMenu);
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });

        /* --------------------------------------------------
           THREE.JS INTERACTIVE BACKGROUND
           -------------------------------------------------- */
        const canvas = document.getElementById('hero-canvas');
        const heroSection = document.getElementById('hero');
        let renderer, scene, camera, particles, particleMaterial, torusKnot, lightPoint;
        let mouse3D = new THREE.Vector2(0, 0);

        function initThree() {
            const width = heroSection.clientWidth;
            const height = heroSection.clientHeight;

            // Scene Setup
            scene = new THREE.Scene();
            const currentTheme = document.documentElement.getAttribute('data-theme');
            scene.background = currentTheme === 'light' ? new THREE.Color(0xf8fafc) : new THREE.Color(0x030309);
            window.scene = scene;

            // Camera Setup
            camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
            camera.position.z = 8;

            // Renderer Setup
            renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true
            });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // Lighting configuration
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
            scene.add(ambientLight);

            lightPoint = new THREE.PointLight(0x00f0ff, 2, 30);
            lightPoint.position.set(0, 0, 4);
            scene.add(lightPoint);

            const lightPurple = new THREE.PointLight(0x7000ff, 1.5, 30);
            lightPurple.position.set(5, 5, 2);
            scene.add(lightPurple);

            // Particle Constellation Geometries
            const particleCount = window.innerWidth < 768 ? 200 : 600;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount * 3; i += 3) {
                positions[i] = (Math.random() - 0.5) * 20; // X
                positions[i + 1] = (Math.random() - 0.5) * 20; // Y
                positions[i + 2] = (Math.random() - 0.5) * 10; // Z
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            // Custom Glowing Particle Material
            particleMaterial = new THREE.PointsMaterial({
                color: currentTheme === 'light' ? 0x0070f3 : 0x00f0ff,
                size: 0.04,
                transparent: true,
                opacity: 0.8,
                sizeAttenuation: true
            });
            window.particleMaterial = particleMaterial;

            particles = new THREE.Points(geometry, particleMaterial);
            scene.add(particles);

            // Centerpiece Floating Wireframe Geometric Shape
            const torusGeo = new THREE.TorusKnotGeometry(1.6, 0.4, 100, 16);
            const torusMat = new THREE.MeshStandardMaterial({
                color: 0x7000ff,
                wireframe: true,
                roughness: 0.2,
                metalness: 0.8
            });

            torusKnot = new THREE.Mesh(torusGeo, torusMat);
            // Position centerpiece on the right side if screens are large
            if (window.innerWidth > 992) {
                torusKnot.position.x = 2.5;
            } else {
                torusKnot.position.y = -2.5;
                torusKnot.scale.set(0.6, 0.6, 0.6);
            }
            scene.add(torusKnot);

            // Listen to window size adjustments
            window.addEventListener('resize', onWindowResize);
            window.addEventListener('mousemove', onMouseMove);
        }

        function onMouseMove(event) {
            // Normalize mouse coordinates (-1 to +1)
            mouse3D.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse3D.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }

        function onWindowResize() {
            const width = heroSection.clientWidth;
            const height = heroSection.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);

            // Reposition centered geometries based on viewport changes
            if (window.innerWidth > 992) {
                torusKnot.position.set(2.5, 0, 0);
                torusKnot.scale.set(1, 1, 1);
            } else {
                torusKnot.position.set(0, -2.5, 0);
                torusKnot.scale.set(0.6, 0.6, 0.6);
            }
        }

        // Animation Loop Variables
        let animationFrameId;
        let clock = new THREE.Clock();

        function animateThree() {
            animationFrameId = requestAnimationFrame(animateThree);

            const elapsed = clock.getElapsedTime();

            // Rotate particle systems slowly
            particles.rotation.y = elapsed * 0.03;
            particles.rotation.x = elapsed * 0.01;

            // Rotate Wireframe Knots
            if (torusKnot) {
                torusKnot.rotation.y = elapsed * 0.15;
                torusKnot.rotation.x = elapsed * 0.1;
            }

            // Dynamic light movement based on pointer coordinate tracing
            if (lightPoint) {
                lightPoint.position.x = mouse3D.x * 6;
                lightPoint.position.y = mouse3D.y * 6;
            }

            // Parallax effect on camera base offsets
            camera.position.x += (mouse3D.x * 0.8 - camera.position.x) * 0.05;
            camera.position.y += (mouse3D.y * 0.8 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        // Initialize 3D on viewport check
        initThree();
        animateThree();

        // Optimize performance: pause loop if hero container is out of view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateThree();
                } else {
                    cancelAnimationFrame(animationFrameId);
                }
            });
        }, {
            threshold: 0.1
        });
        observer.observe(heroSection);

        /* --------------------------------------------------
           HERO TYPING ANIMATION
           -------------------------------------------------- */
        const typewriterElement = document.getElementById('typewriter-text');
        const typewriterPhrases = [
            "High-Converting Websites.",
            "Custom Web Solutions.",
            "Stunning UI Experiences.",
            "SEO Dominating Portals."
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function handleTypewriter() {
            const currentPhrase = typewriterPhrases[phraseIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 80;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at the end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
                typeSpeed = 500; // Pause before typing new phrase
            }

            setTimeout(handleTypewriter, typeSpeed);
        }

        // Start Typing sequence
        setTimeout(handleTypewriter, 1500);

        /* --------------------------------------------------
           PORTFOLIO GRID INTERACTIVE FILTERING
           -------------------------------------------------- */
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioCards = document.querySelectorAll('.portfolio-card');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Active button visual swap
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hidden');
                        // Re-apply reveal transitions
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.classList.add('hidden');
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                    }
                });
            });
        });

        /* --------------------------------------------------
           PROJECT DETAILS MODAL TRIGGERING
           -------------------------------------------------- */
        const modal = document.getElementById('project-details-modal');
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const modalCloseBtnSec = document.querySelector('.modal-close-btn-secondary');

        const modalTitle = document.getElementById('modal-project-title');
        const modalScope = document.getElementById('modal-project-scope');
        const modalTech = document.getElementById('modal-project-tech');
        const modalDescription = document.getElementById('modal-project-description');
        const modalDemoBtn = document.getElementById('modal-demo-btn');

        document.querySelectorAll('.btn-modal-trigger').forEach((trigger, index) => {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = trigger.closest('.portfolio-card');

                // Populate modal data elements
                modalTitle.textContent = card.getAttribute('data-title');
                modalScope.textContent = card.getAttribute('data-category').toUpperCase();
                modalTech.textContent = card.getAttribute('data-tech');
                modalDescription.textContent = card.getAttribute('data-desc');
                modalDemoBtn.setAttribute('href', card.getAttribute('data-link'));

                // Open modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop scroll
            });
        });

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scroll
        }

        modalCloseBtn.addEventListener('click', closeModal);
        modalCloseBtnSec.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        /* --------------------------------------------------
           TESTIMONIALS SLIDING CAROUSEL
           -------------------------------------------------- */
        const track = document.getElementById('testimonial-track');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        const slides = Array.from(track.children);

        let currentSlideIndex = 0;

        function moveSlides() {
            const width = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentSlideIndex * width}px)`;
        }

        nextBtn.addEventListener('click', () => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            moveSlides();
        });

        prevBtn.addEventListener('click', () => {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            moveSlides();
        });

        // Make carousel responsive on resize
        window.addEventListener('resize', moveSlides);

        /* --------------------------------------------------
           FAQ ACCORDION SLIDES
           -------------------------------------------------- */
        const faqHeaders = document.querySelectorAll('.faq-header');

        faqHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const isActive = item.classList.contains('active');
                const content = header.nextElementSibling;

                // Close other items
                document.querySelectorAll('.faq-item').forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.faq-content').style.maxHeight = null;
                });

                if (!isActive) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        });

        /* --------------------------------------------------
           BUDGET SLIDER UPDATE VALUE DISPLAY
           -------------------------------------------------- */
        const budgetSlider = document.getElementById('client-budget');
        const budgetText = document.getElementById('budget-amount-text');

        budgetSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            if (val >= 10000) {
                budgetText.textContent = '$10,000+';
            } else {
                budgetText.textContent = '$' + val.toLocaleString();
            }
        });

        /* --------------------------------------------------
           CONTACT LEAD FORM HANDLING & FIREBASE WRITING
           -------------------------------------------------- */
        const leadForm = document.getElementById('lead-generation-form');
        const submitBtn = document.getElementById('form-submit-button');
        const successModal = document.getElementById('lead-success-modal');
        const successModalClose = document.getElementById('lead-success-close');
        const successModalCloseBtn = document.querySelector('.success-modal-close-btn');

        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Extract Form Field Values
            const fullName = document.getElementById('client-name').value;
            const email = document.getElementById('client-email').value;
            const phone = document.getElementById('client-phone').value || "";
            const companyName = document.getElementById('client-company').value || "";
            const projectType = document.getElementById('client-project-type').value;
            const budgetVal = +document.getElementById('client-budget').value;
            const budget = budgetVal >= 10000 ? "$10,000+" : "$" + budgetVal.toLocaleString();
            const deliveryTime = document.getElementById('client-delivery-time').value || "";
            const websiteURL = document.getElementById('client-website-url').value || "";
            const projectDescription = document.getElementById('client-description').value;

            // Generate Auto-Metadata
            const now = new Date();
            const leadId = "LD-" + Math.random().toString(36).substring(2, 9).toUpperCase();
            const status = "New";
            // The supplied Firestore rules permit only name, email, message and createdAt.
            // Put the additional project details inside the message field.
            const message = [
                `Project type: ${projectType}`,
                `Budget: ${budget}`,
                `Preferred delivery: ${deliveryTime || "Not specified"}`,
                `Phone: ${phone || "Not provided"}`,
                `Company: ${companyName || "Not provided"}`,
                `Existing website: ${websiteURL || "Not provided"}`,
                "Project description:",
                projectDescription.trim(),
                `Reference: ${leadId}`
            ].join("\n").slice(0, 3000);

            try {
                if (!fullName.trim() || fullName.trim().length > 100) {
                    throw new Error("Please enter a name with no more than 100 characters.");
                }
                if (!email.trim() || email.trim().length > 254) {
                    throw new Error("Please enter a valid email address.");
                }
                if (!projectDescription.trim()) {
                    throw new Error("Please enter a project description.");
                }
                if (typeof window.sendMessage !== "function") {
                    throw new Error("Firebase module has not loaded. Make sure firebase.js is uploaded beside index.html and loaded with type=module.");
                }
                await window.sendMessage(fullName, email, message);
                console.info("Contact message saved to Firestore:", leadId);

                // Display Premium success modal
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    successModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    leadForm.reset();
                    budgetText.textContent = '$2,500';
                }, 1200);

            } catch (err) {
                console.error("Database submission write error:", err);
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                alert("Your request was not sent. " + (err && err.message ? err.message : "Please try again later.") + "\n\nCheck Firebase configuration, Firestore setup, and Security Rules.");
            }
        });

        function closeSuccessModal() {
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        successModalClose.addEventListener('click', closeSuccessModal);
        successModalCloseBtn.addEventListener('click', closeSuccessModal);
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeSuccessModal();
            }
        });

        // Handle "Get Quote" triggers from service cards
        document.querySelectorAll('.service-card .btn-card, .pricing-cta-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                const card = trigger.closest('.service-card, .pricing-card');
                let selectedService = '';

                if (card && card.classList.contains('service-card')) {
                    selectedService = card.getAttribute('data-service');
                } else if (card && card.classList.contains('pricing-card')) {
                    const pkg = trigger.getAttribute('data-package');
                    if (pkg === 'Starter Suite') selectedService = 'Landing Pages';
                    else if (pkg === 'Business Growth') selectedService = 'E-commerce Websites';
                    else if (pkg === 'Custom Platform') selectedService = 'Custom Web Applications';
                }

                if (selectedService) {
                    const selectElement = document.getElementById('client-project-type');
                    selectElement.value = selectedService;
                }
            });
        });

        /* --------------------------------------------------
           STATS COUNTER COUNTS TRIGGER ON SCROLL
           -------------------------------------------------- */
        const statsNumbers = document.querySelectorAll('.stat-number');
        let animatedCounters = false;

        function animateCounters() {
            statsNumbers.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / 80;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(animateCounters, 20);
                } else {
                    counter.innerText = target + (target === 48 ? '+' : (target === 100 ? '%' : '+'));
                }
            });
        }

        // Trigger skills loading values
        function animateSkills() {
            document.querySelectorAll('.skill-progress').forEach(progress => {
                const width = progress.getAttribute('data-width');
                progress.style.width = width;
            });
        }

        // Scroll reveal observers
        const scrollRevealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    if (entry.target.id === 'about' && !animatedCounters) {
                        animatedCounters = true;
                        animateCounters();
                    }
                }
            });
        }, {
            threshold: 0.15
        });

        document.querySelectorAll('.reveal').forEach(el => {
            scrollRevealObserver.observe(el);
        });

        /* --------------------------------------------------
           BACK TO TOP BUTTON
           -------------------------------------------------- */
        const backToTopBtn = document.getElementById('scroll-to-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        /* --------------------------------------------------
           EASTER EGG HANDLER (MATRIX HACK TERMINAL)
           -------------------------------------------------- */
        const siteLogo = document.getElementById('site-logo');
        const hackerTerminal = document.getElementById('hacker-terminal');
        const terminalClose = document.getElementById('terminal-close-btn');
        const terminalInput = document.getElementById('terminal-input-field');
        const terminalOutput = document.getElementById('terminal-log-output');

        let logoClicks = 0;

        siteLogo.addEventListener('click', () => {
            logoClicks++;
            if (logoClicks >= 5) {
                logoClicks = 0;
                openHackerTerminal();
            }
        });

        function openHackerTerminal() {
            hackerTerminal.classList.add('active');
            terminalInput.focus();
            document.body.style.overflow = 'hidden';
        }

        function closeHackerTerminal() {
            hackerTerminal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        terminalClose.addEventListener('click', closeHackerTerminal);

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value.trim().toLowerCase();
                terminalInput.value = '';
                executeTerminalCommand(cmd);
            }
        });

        function printTerminalLine(text, delay = 0) {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = 'terminal-line';
                line.innerHTML = text;
                terminalOutput.appendChild(line);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }, delay);
        }

        function executeTerminalCommand(cmd) {
            printTerminalLine(`AYUSH@ROOT:~# ${cmd}`);

            if (cmd === 'help') {
                printTerminalLine(`Authorized commands:<br>
        - 'bio'       : Display developer blueprints.<br>
        - 'unlock'    : Fetch VIP client onboarding promo code.<br>
        - 'clear'     : Clear standard output displays.<br>
        - 'matrix'    : Display cascading system vectors.<br>
        - 'disconnect': Close shell override connection.`);
            } else if (cmd === 'bio') {
                printTerminalLine(`> ACCESSING BIO ARCHIVE...<br>
        NAME: Aayush Raj<br>
        ROLES: Full Stack Developer & UI Architect<br>
        PRIMARY TARGET: Craft ultra-fast, high-converting platforms for agencies.`);
            } else if (cmd === 'unlock') {
                printTerminalLine(`> DECRYPTING SECRET KEY CODE...<br>
        STATUS: ACCESS SUCCESSFUL // CODE UNLOCKED: <span style="color:#ff0055; font-weight:bold;">NEURAL20</span><br>
        BENEFIT: Mention 'NEURAL20' in brief for 20% discount on initial scope.`);
            } else if (cmd === 'clear') {
                terminalOutput.innerHTML = '';
            } else if (cmd === 'matrix') {
                for (let i = 0; i < 15; i++) {
                    const randomHex = Math.random().toString(16).substring(2, 10);
                    printTerminalLine(`SYS_ERR_LOG_NODE_${i}: [0x${randomHex.toUpperCase()}] CONNECTED`, i * 50);
                }
            } else if (cmd === 'disconnect') {
                closeHackerTerminal();
            } else {
                printTerminalLine(`sh: command not found: '${cmd}'. Type 'help' to review directory.`);
            }
        }

        /* --------------------------------------------------
           CSS 3D CARD TILT EFFECT (SERVICE CARDS)
           -------------------------------------------------- */
        const cards = document.querySelectorAll('.service-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                if (window.innerWidth < 1024) return; // Disable on tablet/mobile for performance

                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x coordinate relative to card
                const y = e.clientY - rect.top; // y coordinate relative to card

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const deltaX = (x - centerX) / centerX; // normalize from -1 to 1
                const deltaY = (y - centerY) / centerY; // normalize from -1 to 1

                const maxTilt = 12; // Maximum tilt angle in degrees
                const tiltX = -deltaY * maxTilt;
                const tiltY = deltaX * maxTilt;

                card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateX(0) rotateY(0) translateY(0)';
            });
        });

        /* --------------------------------------------------
           HERO CARD & ABOUT PROFILE PHOTO MOUSE ROTATION
           -------------------------------------------------- */
        const holoCard = document.getElementById('hero-holo-card');
        if (holoCard) {
            window.addEventListener('mousemove', (e) => {
                if (window.innerWidth < 1024) return;

                const x = e.clientX / window.innerWidth - 0.5;
                const y = e.clientY / window.innerHeight - 0.5;

                holoCard.style.transform = `rotateY(${x * 30}deg) rotateX(${-y * 30}deg)`;
            });
        }

        const profileCard = document.getElementById('about-profile-card');
        if (profileCard) {
            profileCard.addEventListener('mousemove', (e) => {
                if (window.innerWidth < 1024) return;
                const rect = profileCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;

                profileCard.style.transform = `rotateY(${deltaX * 15}deg) rotateX(${-deltaY * 15}deg) translateY(-8px)`;
            });
            profileCard.addEventListener('mouseleave', () => {
                profileCard.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0px)';
            });
        }
