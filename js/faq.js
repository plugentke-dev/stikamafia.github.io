/* ===================================
   FAQ ACCORDION MODULE
   Handles FAQ toggle functionality
   =================================== */

(function () {
    'use strict';

    // FAQ data structure
    const faqData = [
        {
            icon: '📦',
            question: "What's the smallest order I can place?",
            answer: "We have <strong>no minimums</strong>. Order as few as 10 stickers or as many as 10,000 — whatever you actually need. You only pay for what you use."
        },
        {
            icon: '⏰',
            question: "How long does it really take?",
            answer: "<strong>Free design proof in 24 hours.</strong> Once you approve, finished stickers delivered in 2–3 days (Embu area). Countrywide shipping available. <strong>Rush orders (next-day)</strong> available for urgent deadlines."
        },
        {
            icon: '🎨',
            question: "What if I don't like the design?",
            answer: "We offer <strong>unlimited free revisions</strong> until you're 100% happy. No production starts until you approve the proof. No hidden designer fees. No surprises."
        },
        {
            icon: '🚚',
            question: "Do you deliver outside Embu?",
            answer: "Yes! We offer <strong>countrywide shipping</strong> across Kenya. Embu gets priority with 2-3 day delivery, and other locations typically receive orders within 4-5 business days."
        },
        {
            icon: '💰',
            question: "How much do stickers cost?",
            answer: "Pricing depends on size, quantity, and material. <strong>Get a free custom quote on WhatsApp</strong> — we'll give you an exact price within minutes, no obligation."
        }
    ];

    // Initialize FAQ
    function initFAQ() {
        const container = document.getElementById('faq-accordion');
        if (!container) {
            console.warn('FAQ container not found');
            return;
        }

        // Build FAQ HTML
        const faqHTML = faqData.map((item, index) => `
            <div class="faq-item" data-faq-index="${index}">
                <button class="faq-question" 
                        aria-expanded="false" 
                        aria-controls="faq-answer-${index}"
                        onclick="FAQ.toggle(${index})">
                    <span class="faq-question-text">
                        <span aria-hidden="true">${item.icon}</span>
                        ${item.question}
                    </span>
                    <svg class="faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>
                <div class="faq-answer" id="faq-answer-${index}">
                    <div class="faq-answer-content">
                        ${item.answer}
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = faqHTML;
    }

    // Toggle FAQ item
    function toggleFAQ(index) {
        const allItems = document.querySelectorAll('.faq-item');
        const targetItem = document.querySelector(`[data-faq-index="${index}"]`);

        if (!targetItem) return;

        const button = targetItem.querySelector('.faq-question');
        const answer = targetItem.querySelector('.faq-answer');
        const icon = targetItem.querySelector('.faq-icon');
        const isOpen = answer.classList.contains('open');

        // Close all other FAQs
        allItems.forEach((item, i) => {
            if (i !== index) {
                const otherAnswer = item.querySelector('.faq-answer');
                const otherIcon = item.querySelector('.faq-icon');
                const otherButton = item.querySelector('.faq-question');

                otherAnswer.classList.remove('open');
                otherIcon.classList.remove('open');
                otherButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle current FAQ
        if (isOpen) {
            answer.classList.remove('open');
            icon.classList.remove('open');
            button.setAttribute('aria-expanded', 'false');
        } else {
            answer.classList.add('open');
            icon.classList.add('open');
            button.setAttribute('aria-expanded', 'true');
        }

        // Track event
        if (window.Analytics) {
            window.Analytics.trackEvent('faq_toggle', {
                question: faqData[index].question,
                action: isOpen ? 'close' : 'open'
            });
        }
    }

    // Public API
    window.FAQ = {
        init: initFAQ,
        toggle: toggleFAQ
    };

    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFAQ);
    } else {
        initFAQ();
    }

})();