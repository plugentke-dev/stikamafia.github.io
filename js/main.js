/* ===================================
   MAIN APPLICATION SCRIPT
   Orchestrates all modules and handles global functionality
   =================================== */

(function () {
    'use strict';

    // App configuration
    const App = {
        version: '1.0.0',
        debug: true,
        whatsappNumber: '254714929896', // REPLACE WITH YOUR REAL NUMBER
        modules: []
    };

    // Error handler
    function handleError(error, context = 'Unknown') {
        if (App.debug) {
            console.error(`❌ Error in ${context}:`, error);
        }

        // Send to error tracking service (optional)
        // Example: Sentry.captureException(error);
    }

    // Lazy load images
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;

                        // Load image
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }

                        // Load background image
                        if (img.dataset.bgSrc) {
                            img.style.backgroundImage = `url(${img.dataset.bgSrc})`;
                            img.removeAttribute('data-bg-src');
                        }

                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });

            // Observe all images with data-src or data-bg-src
            document.querySelectorAll('img[data-src], [data-bg-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // Dynamic WhatsApp link updates
    function initWhatsAppLinks() {
        const defaultMessage = encodeURIComponent('Hi StiKaMafia! I need custom stickers');
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

        whatsappLinks.forEach(link => {
            // Ensure correct number is used
            if (!link.href.includes(App.whatsappNumber)) {
                const currentHref = link.href;
                const messagePart = currentHref.split('?text=')[1] || defaultMessage;
                link.href = `https://wa.me/${App.whatsappNumber}?text=${messagePart}`;
            }
        });
    }

    // Form validation (if you add forms later)
    function initFormValidation() {
        const forms = document.querySelectorAll('form[data-validate]');

        forms.forEach(form => {
            form.addEventListener('submit', function (e) {
                e.preventDefault();

                const formData = new FormData(form);
                const data = Object.fromEntries(formData);

                // Validate
                if (validateForm(data)) {
                    // Submit form
                    submitForm(form, data);
                } else {
                    // Show error
                    showFormError(form, 'Please fill in all required fields');
                }
            });
        });
    }

    // Performance monitoring
    function initPerformanceMonitoring() {
        if (!App.debug) return;

        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const connectTime = perfData.responseEnd - perfData.requestStart;

                console.log('⚡ Performance Metrics:');
                console.log(`  Page Load Time: ${pageLoadTime}ms`);
                console.log(`  Server Response Time: ${connectTime}ms`);

                // Track in analytics
                if (window.Analytics) {
                    window.Analytics.trackEvent('performance', {
                        page_load_time: pageLoadTime,
                        server_response_time: connectTime
                    });
                }
            }, 0);
        });
    }

    // Service Worker registration (PWA - optional)
    function initServiceWorker() {
        if ('serviceWorker' in navigator && !App.debug) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('❌ Service Worker registration failed:', error);
                });
        }
    }

    // Initialize all app modules
    function init() {
        try {
            console.log(`🚀 StiKaMafia v${App.version} initializing...`);

            // Initialize core modules
            initLazyLoading();
            initWhatsAppLinks();
            initFormValidation();
            initPerformanceMonitoring();

            // Initialize external modules (if loaded)
            if (window.FAQ) {
                App.modules.push('FAQ');
                window.FAQ.init();
            }

            if (window.Navigation) {
                App.modules.push('Navigation');
                window.Navigation.init();
            }

            if (window.Analytics) {
                App.modules.push('Analytics');
                window.Analytics.init();
            }

            // Optional: Initialize Service Worker
            // initServiceWorker();

            console.log('✅ App initialized. Active modules:', App.modules);

        } catch (error) {
            handleError(error, 'App Initialization');
        }
    }

    // Expose App globally for debugging
    window.StiKaMafiaApp = App;

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();