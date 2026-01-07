/* ===================================
   NAVIGATION MODULE
   Handles nav behavior, scroll effects, smooth scrolling
   =================================== */

(function () {
    'use strict';

    let lastScroll = 0;
    const nav = document.getElementById('main-nav');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');

                // Skip if it's just "#"
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (!target) return;

                e.preventDefault();

                const offset = 80; // Account for fixed nav height
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }

                // Track navigation click
                if (window.Analytics) {
                    window.Analytics.trackEvent('navigation_click', {
                        target: targetId,
                        from: window.location.pathname
                    });
                }
            });
        });
    }

    // Navbar scroll behavior
    function handleNavScroll() {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            nav.classList.add('shadow-md');
        } else {
            nav.classList.remove('shadow-md');
        }

        // Optional: Hide nav on scroll down, show on scroll up
        // Uncomment below if you want this behavior
        /*
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        */

        lastScroll = currentScroll;
    }

    // Mobile menu toggle
    function initMobileMenu() {
        if (!mobileMenuToggle) return;

        mobileMenuToggle.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);

            // Add your mobile menu show/hide logic here
            // Example: document.querySelector('.mobile-menu').classList.toggle('open');

            if (window.Analytics) {
                window.Analytics.trackEvent('mobile_menu_toggle', {
                    action: isExpanded ? 'close' : 'open'
                });
            }
        });
    }

    // Scroll reveal animation
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.scroll-reveal');

        if (revealElements.length === 0) return;

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // Initialize all navigation features
    function init() {
        initSmoothScroll();
        initMobileMenu();
        initScrollReveal();

        // Throttled scroll handler for performance
        let scrollTimeout;
        window.addEventListener('scroll', function () {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(handleNavScroll);
        });
    }

    // Public API
    window.Navigation = {
        init: init
    };

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();