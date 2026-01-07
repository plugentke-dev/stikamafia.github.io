/* ===================================
   ANALYTICS MODULE
   Handles event tracking and user analytics
   =================================== */

(function () {
    'use strict';

    // Configuration
    const config = {
        debug: true, // Set to false in production
        trackClicks: true,
        trackScrollDepth: true,
        trackTimeOnPage: true
    };

    // Event queue (for when analytics isn't loaded yet)
    let eventQueue = [];
    let analyticsReady = false;

    // Track custom event
    function trackEvent(eventName, eventData = {}) {
        const event = {
            name: eventName,
            data: {
                ...eventData,
                timestamp: new Date().toISOString(),
                page: window.location.pathname,
                referrer: document.referrer
            }
        };

        if (config.debug) {
            console.log('📊 Analytics Event:', event);
        }

        // If Google Analytics is available
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, event.data);
        }

        // If Facebook Pixel is available
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', eventName, event.data);
        }

        // Queue for other analytics platforms
        eventQueue.push(event);

        // Send to your own analytics endpoint (optional)
        // sendToServer(event);
    }

    // Track WhatsApp CTA clicks
    function initCTATracking() {
        document.querySelectorAll('[data-event]').forEach(element => {
            element.addEventListener('click', function () {
                const eventName = this.getAttribute('data-event');
                const buttonText = this.textContent.trim();
                const buttonLocation = this.getAttribute('aria-label') || 'unknown';

                trackEvent(eventName, {
                    button_text: buttonText,
                    button_location: buttonLocation
                });
            });
        });
    }

    // Track scroll depth
    function initScrollDepthTracking() {
        if (!config.trackScrollDepth) return;

        const milestones = [25, 50, 75, 100];
        const reached = new Set();

        function checkScrollDepth() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercent = ((scrollTop + windowHeight) / documentHeight) * 100;

            milestones.forEach(milestone => {
                if (scrollPercent >= milestone && !reached.has(milestone)) {
                    reached.add(milestone);
                    trackEvent('scroll_depth', {
                        depth: milestone,
                        page: window.location.pathname
                    });
                }
            });
        }

        let scrollTimeout;
        window.addEventListener('scroll', function () {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(checkScrollDepth);
        });
    }

    // Track time on page
    function initTimeOnPageTracking() {
        if (!config.trackTimeOnPage) return;

        const startTime = Date.now();
        let tracked30s = false;
        let tracked60s = false;
        let tracked180s = false;

        setInterval(() => {
            const timeOnPage = Math.floor((Date.now() - startTime) / 1000);

            if (timeOnPage >= 30 && !tracked30s) {
                tracked30s = true;
                trackEvent('time_on_page', { duration: 30 });
            }
            if (timeOnPage >= 60 && !tracked60s) {
                tracked60s = true;
                trackEvent('time_on_page', { duration: 60 });
            }
            if (timeOnPage >= 180 && !tracked180s) {
                tracked180s = true;
                trackEvent('time_on_page', { duration: 180 });
            }
        }, 5000);

        // Track on page unload
        window.addEventListener('beforeunload', function () {
            const totalTime = Math.floor((Date.now() - startTime) / 1000);
            trackEvent('page_exit', { total_time: totalTime });
        });
    }

    // Track outbound links
    function initOutboundLinkTracking() {
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            link.addEventListener('click', function () {
                const url = this.href;
                if (!url.includes(window.location.hostname)) {
                    trackEvent('outbound_click', {
                        destination: url,
                        link_text: this.textContent.trim()
                    });
                }
            });
        });
    }

    // Send data to server (optional - implement your own endpoint)
    function sendToServer(event) {
        // Example implementation
        /*
        fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        }).catch(err => console.error('Analytics error:', err));
        */
    }

    // Initialize all tracking
    function init() {
        // Track page view
        trackEvent('page_view', {
            title: document.title,
            url: window.location.href
        });

        // Initialize tracking modules
        initCTATracking();
        initScrollDepthTracking();
        initTimeOnPageTracking();
        initOutboundLinkTracking();

        analyticsReady = true;

        if (config.debug) {
            console.log('📊 Analytics initialized');
        }
    }

    // Public API
    window.Analytics = {
        trackEvent: trackEvent,
        init: init,
        config: config
    };

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();