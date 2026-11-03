/**
 * KISHORE EDITS - INTERACTION ENGINE
 * Premium Portfolio JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. DYNAMIC HEADER & ACTIVE LINK DETECTION
    // ==========================================
    const siteHeader = document.getElementById('siteHeader');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Toggle header blur background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
        
        highlightNav();
    });
    
    // Highlight menu link based on viewport scroll position
    function highlightNav() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ==========================================
    // 2. MOBILE HAMBURGER MENU
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isActive = menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : 'auto';
        });
        
        // Close menu when a navigation link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // ==========================================
    // 3. ORGANIC CUSTOM CURSOR & GLOW (DESKTOP ONLY)
    // ==========================================
    const cursorGlow = document.getElementById('cursorGlow');
    const customCursor = document.getElementById('customCursor');
    
    if (cursorGlow && customCursor) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;
        let cursorX = 0, cursorY = 0;
        let isMoving = false;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!isMoving) {
                // Show cursors on first mouse move
                cursorGlow.style.opacity = 1;
                customCursor.style.opacity = 1;
                isMoving = true;
            }
        });
        
        // Hide custom cursors when leaving window frame
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = 0;
            customCursor.style.opacity = 0;
            isMoving = false;
        });
        
        // Animating loop for elastic lag cursor following
        const renderCursor = () => {
            // 8% interpolation for glow (smooth slow catch-up)
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            cursorGlow.style.transform = `translate3d(calc(${glowX}px - 50%), calc(${glowY}px - 50%), 0)`;
            
            // 20% interpolation for direct point (faster snapping)
            cursorX += (mouseX - cursorX) * 0.20;
            cursorY += (mouseY - cursorY) * 0.20;
            customCursor.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;
            
            requestAnimationFrame(renderCursor);
        };
        renderCursor();
        
        // Expand cursor on hovering interactive elements
        const interactives = document.querySelectorAll('a, button, input, textarea, select, .project-card, .filter-btn');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering-interactive'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering-interactive'));
        });
    }

    // ==========================================
    // 4. MAGNETIC BUTTON ATTRACTION
    // ==========================================
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            // Calculate mouse coordinates relative to center of the button
            const mouseRelX = e.clientX - rect.left - (rect.width / 2);
            const mouseRelY = e.clientY - rect.top - (rect.height / 2);
            
            // Push button slightly in direction of mouse (30% magnet strength)
            btn.style.transform = `translate3d(${mouseRelX * 0.3}px, ${mouseRelY * 0.3}px, 0) scale(1.02)`;
            btn.style.boxShadow = `0 10px 25px rgba(255, 42, 42, 0.2)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate3d(0, 0, 0) scale(1)';
            btn.style.boxShadow = 'none';
        });
    });

    // ==========================================
    // 5. HERO SHOWREEL PLAYBACK
    // ==========================================
    const mainShowreel = document.getElementById('mainShowreel');
    const showreelVideo = mainShowreel ? mainShowreel.querySelector('.showreel-video') : null;
    const showreelPlayBtn = document.getElementById('showreelPlayBtn');
    const watchShowreelBtn = document.getElementById('watchShowreelBtn');
    
    if (mainShowreel && showreelVideo && showreelPlayBtn) {
        
        // Play showreel when either button is clicked
        const triggerShowreelPlay = () => {
            if (showreelVideo.paused) {
                showreelVideo.muted = false; // Unmute for user viewing
                showreelVideo.play()
                    .then(() => {
                        mainShowreel.classList.add('playing');
                    })
                    .catch(err => console.log('Audio auto play constraint: ', err));
            } else {
                showreelVideo.pause();
                mainShowreel.classList.remove('playing');
            }
        };
        
        showreelPlayBtn.addEventListener('click', triggerShowreelPlay);
        
        if (watchShowreelBtn) {
            watchShowreelBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Scroll to video smooth
                document.getElementById('showreel-anchor').scrollIntoView({ behavior: 'smooth' });
                // Play
                setTimeout(triggerShowreelPlay, 400);
            });
        }
        
        // Play showreel on hover ambiently (muted loop) if in view
        const ambientShowreelObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (showreelVideo.paused && !mainShowreel.classList.contains('playing')) {
                        showreelVideo.muted = true;
                        showreelVideo.play().catch(() => {});
                    }
                } else {
                    showreelVideo.pause();
                }
            });
        }, { threshold: 0.2 });
        ambientShowreelObserver.observe(showreelVideo);
    }

    // ==========================================
    // 6. CARD HOVER VIDEO PLAYBACK LOOP
    // ==========================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const loopVideo = card.querySelector('.card-video-loop');
        if (loopVideo) {
            // Hover: Play video
            card.addEventListener('mouseenter', () => {
                loopVideo.play().catch(() => {});
            });
            
            // Mouseleave: Pause and rewind
            card.addEventListener('mouseleave', () => {
                loopVideo.pause();
                loopVideo.currentTime = 0;
            });
        }
    });

    // ==========================================
    // 7. PROJECT GALLERY FILTERING
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active styling
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCat === filterValue) {
                    // Show matching elements
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    // Hide non-matching elements with fade scale effect
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==========================================
    // 8. FULLSCREEN VIDEO LIGHTBOX MODAL
    // ==========================================
    const lightboxModal = document.getElementById('videoLightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    
    if (lightboxModal && lightboxVideo && lightboxClose) {
        
        // Open lightbox on clicking any project card
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const videoSrc = card.getAttribute('data-video');
                const category = card.querySelector('.project-category').textContent;
                const title = card.querySelector('.project-title').textContent;
                const desc = card.querySelector('.project-desc').textContent;
                
                // Populate Lightbox resources
                lightboxVideo.src = videoSrc;
                lightboxCategory.textContent = category;
                lightboxTitle.textContent = title;
                lightboxDesc.textContent = desc;
                
                // Set aspect ratio classes on lightbox modal
                lightboxModal.classList.remove('vertical-lightbox', 'square-lightbox');
                if (card.classList.contains('vertical')) {
                    lightboxModal.classList.add('vertical-lightbox');
                } else if (card.classList.contains('square')) {
                    lightboxModal.classList.add('square-lightbox');
                }
                
                // Launch modal transition
                lightboxModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Lock scrolling
                
                // Unmute and play immediately
                lightboxVideo.muted = false;
                lightboxVideo.play().catch(() => {});
            });
        });
        
        // Close modal function
        const closeLightbox = () => {
            lightboxModal.classList.remove('active', 'vertical-lightbox', 'square-lightbox');
            lightboxVideo.pause();
            lightboxVideo.src = '';
            document.body.style.overflow = 'auto'; // Unlock scrolling
        };
        
        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close on clicking backdrop overlay
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // ==========================================
    // 9. REVEAL ON SCROLL IntersectionObserver
    // ==========================================
    const revealItems = document.querySelectorAll('.reveal-fade-up, .reveal-scale, .reveal-stagger, .reveal-text');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Animate once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px' // Fire slightly before scroll entrance
        });
        
        revealItems.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealItems.forEach(el => el.classList.add('active'));
    }

    // ==========================================
    // 10. CONTACT FORM VALIDATION & SIMULATION
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formSuccessMsg = document.getElementById('formSuccessMsg');
    const resetFormBtn = document.getElementById('resetFormBtn');
    
    if (contactForm && formSuccessMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let hasErrors = false;
            const nameInput = document.getElementById('clientName');
            const emailInput = document.getElementById('clientEmail');
            const messageInput = document.getElementById('clientMessage');
            
            // Validate Name
            if (!nameInput.value.trim()) {
                nameInput.parentElement.classList.add('error');
                hasErrors = true;
            } else {
                nameInput.parentElement.classList.remove('error');
            }
            
            // Validate Email
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailValue || !emailRegex.test(emailValue)) {
                emailInput.parentElement.classList.add('error');
                hasErrors = true;
            } else {
                emailInput.parentElement.classList.remove('error');
            }
            
            // Validate Message
            if (!messageInput.value.trim()) {
                messageInput.parentElement.classList.add('error');
                hasErrors = true;
            } else {
                messageInput.parentElement.classList.remove('error');
            }
            
            // If fields are valid, run submit effect
            if (!hasErrors) {
                const submitBtn = document.getElementById('submitFormBtn');
                submitBtn.disabled = true;
                submitBtn.textContent = 'SENDING...';
                
                // Simulate network latency (800ms)
                setTimeout(() => {
                    // Hide form and reset submit button
                    contactForm.style.opacity = '0';
                    setTimeout(() => {
                        contactForm.style.display = 'none';
                        formSuccessMsg.style.display = 'flex';
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'SEND ENQUIRY';
                    }, 400);
                }, 800);
            }
        });
        
        // Remove error states dynamically on input
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.parentElement.classList.remove('error');
                }
            });
        });
        
        // Reset form handler
        if (resetFormBtn) {
            resetFormBtn.addEventListener('click', () => {
                contactForm.reset();
                formSuccessMsg.style.display = 'none';
                contactForm.style.display = 'flex';
                setTimeout(() => {
                    contactForm.style.opacity = '1';
                }, 50);
            });
        }
    }
});
