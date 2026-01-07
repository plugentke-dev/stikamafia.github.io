/* ===================================
   STIKAMAFIA - PRICING TAB SWITCHER
   Handles size category switching
   =================================== */

// Pricing data for all size categories
const pricingData = {
    small: {
        label: 'Small (1"-3")',
        sizes: [
            {
                name: 'Starter',
                description: 'Test the waters',
                price: 250,
                quantity: 20,
                size: '2"×2"',
                savings: 0,
                unitPrice: 12.5,
                borderColor: '#64748b',
                buttonStyle: 'outline'
            },
            {
                name: 'Hustler',
                description: 'Small business ready',
                price: 450,
                quantity: 40,
                size: '2"×2"',
                savings: 50,
                unitPrice: 11.25,
                borderColor: '#dc2626',
                buttonStyle: 'red'
            },
            {
                name: 'Boss Pack',
                description: 'Best value • Recommended',
                price: 800,
                quantity: 80,
                size: '2"×2"',
                savings: 200,
                unitPrice: 10,
                borderColor: '#dc2626',
                buttonStyle: 'red',
                popular: true,
                highlight: true
            },
            {
                name: 'Empire',
                description: 'Maximum volume',
                price: 1800,
                quantity: 200,
                size: '2"×2"',
                savings: 700,
                unitPrice: 9,
                borderColor: '#000000',
                buttonStyle: 'black'
            }
        ]
    },
    medium: {
        label: 'Medium (3"-5")',
        sizes: [
            {
                name: 'Starter',
                description: 'Test the waters',
                price: 450,
                quantity: 20,
                size: '3"×3"',
                savings: 0,
                unitPrice: 22.5,
                borderColor: '#64748b',
                buttonStyle: 'outline'
            },
            {
                name: 'Hustler',
                description: 'Small business ready',
                price: 1050,
                quantity: 50,
                size: '3"×3"',
                savings: 75,
                unitPrice: 21,
                borderColor: '#dc2626',
                buttonStyle: 'red'
            },
            {
                name: 'Boss Pack',
                description: 'Best value • Recommended',
                price: 1900,
                quantity: 100,
                size: '3"×3"',
                savings: 350,
                unitPrice: 19,
                borderColor: '#dc2626',
                buttonStyle: 'red',
                popular: true,
                highlight: true
            },
            {
                name: 'Empire',
                description: 'Maximum volume',
                price: 4400,
                quantity: 250,
                size: '3"×3"',
                savings: 1225,
                unitPrice: 17.6,
                borderColor: '#000000',
                buttonStyle: 'black'
            }
        ]
    },
    large: {
        label: 'Large (5"-8")',
        sizes: [
            {
                name: 'Starter',
                description: 'Test the waters',
                price: 650,
                quantity: 10,
                size: '4"×6"',
                savings: 0,
                unitPrice: 65,
                borderColor: '#64748b',
                buttonStyle: 'outline'
            },
            {
                name: 'Hustler',
                description: 'Small business ready',
                price: 1500,
                quantity: 25,
                size: '4"×6"',
                savings: 125,
                unitPrice: 60,
                borderColor: '#dc2626',
                buttonStyle: 'red'
            },
            {
                name: 'Boss Pack',
                description: 'Best value • Recommended',
                price: 2800,
                quantity: 50,
                size: '4"×6"',
                savings: 450,
                unitPrice: 56,
                borderColor: '#dc2626',
                buttonStyle: 'red',
                popular: true,
                highlight: true
            },
            {
                name: 'Empire',
                description: 'Maximum volume',
                price: 5200,
                quantity: 100,
                size: '4"×6"',
                savings: 1300,
                unitPrice: 52,
                borderColor: '#000000',
                buttonStyle: 'black'
            }
        ]
    },
    xl: {
        label: 'XL (8"+)',
        sizes: [
            {
                name: 'Starter',
                description: 'Test the waters',
                price: 850,
                quantity: 5,
                size: '8"×8"',
                savings: 0,
                unitPrice: 170,
                borderColor: '#64748b',
                buttonStyle: 'outline'
            },
            {
                name: 'Hustler',
                description: 'Small business ready',
                price: 2400,
                quantity: 15,
                size: '8"×8"',
                savings: 150,
                unitPrice: 160,
                borderColor: '#dc2626',
                buttonStyle: 'red'
            },
            {
                name: 'Boss Pack',
                description: 'Best value • Recommended',
                price: 4500,
                quantity: 30,
                size: '8"×8"',
                savings: 600,
                unitPrice: 150,
                borderColor: '#dc2626',
                buttonStyle: 'red',
                popular: true,
                highlight: true
            },
            {
                name: 'Empire',
                description: 'Maximum volume',
                price: 7000,
                quantity: 50,
                size: '8"×8"',
                savings: 1500,
                unitPrice: 140,
                borderColor: '#000000',
                buttonStyle: 'black'
            }
        ]
    }
};

// Current active size category
let currentSize = 'small';

// Initialize pricing tabs
function initPricingTabs() {
    const tabs = document.querySelectorAll('.size-tab');
    const pricingGrid = document.querySelector('.pricing-cards-grid');
    
    if (!tabs.length || !pricingGrid) return;

    // Add click handlers to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const size = tab.dataset.size;
            if (size === currentSize) return;

            // Update active tab
            tabs.forEach(t => {
                t.style.background = 'transparent';
                t.style.borderColor = '#4b5563';
                t.classList.remove('active');
            });
            tab.style.background = '#dc2626';
            tab.style.borderColor = '#dc2626';
            tab.classList.add('active');

            // Update pricing cards
            currentSize = size;
            updatePricingCards(size, pricingGrid);
        });
    });
}

// Update pricing cards with animation
function updatePricingCards(size, container) {
    const data = pricingData[size];
    if (!data) return;

    // Fade out
    container.style.opacity = '0';
    container.style.transform = 'translateY(10px)';

    setTimeout(() => {
        // Clear existing cards
        container.innerHTML = '';

        // Generate new cards
        data.sizes.forEach((tier, index) => {
            const card = createPricingCard(tier, index);
            container.appendChild(card);
        });

        // Fade in
        requestAnimationFrame(() => {
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        });
    }, 300);
}

// Create a pricing card element
function createPricingCard(tier, index) {
    const card = document.createElement('div');
    const isHighlight = tier.highlight;
    
    card.className = 'pricing-card bg-white rounded-2xl p-8 shadow-lg';
    card.style.cssText = `
        border-top: 3px solid ${tier.borderColor};
        ${isHighlight ? 'transform: scale(1.05); box-shadow: 0 20px 40px rgba(0,0,0,0.15); position: relative;' : ''}
        transition: all 0.3s ease;
    `;

    // Popular badge
    let popularBadge = '';
    if (tier.popular) {
        popularBadge = `
            <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #dc2626; color: white; padding: 0.25rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; white-space: nowrap;">
                MOST POPULAR
            </div>
        `;
    }

    // Savings text
    let savingsText = '';
    if (tier.savings > 0) {
        savingsText = `<p style="color: #dc2626; font-size: 0.75rem; font-weight: 600; margin-top: 0.5rem;">Save KSh ${tier.savings.toLocaleString()} • Just KSh ${tier.unitPrice}/sticker</p>`;
    }

    // Button styles
    let buttonStyles = '';
    let buttonText = '';
    if (tier.buttonStyle === 'outline') {
        buttonStyles = 'background: white; color: #1f2937; border: 2px solid #e5e7eb;';
        buttonText = 'Get Started';
    } else if (tier.buttonStyle === 'red') {
        buttonStyles = 'background: #dc2626; color: white;';
        if (tier.popular) {
            buttonStyles += ' box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);';
        }
        buttonText = tier.popular ? `Choose ${tier.name}` : `Choose ${tier.name}`;
    } else if (tier.buttonStyle === 'black') {
        buttonStyles = 'background: #000000; color: white;';
        buttonText = 'Go Empire';
    }

    const priceColor = isHighlight ? '#dc2626' : '#1f2937';

    card.innerHTML = `
        ${popularBadge}
        
        <div class="mb-6">
            <h3 style="font-size: 1.25rem; font-weight: 700; color: #1f2937; margin-bottom: 0.5rem;">${tier.name}</h3>
            <p style="color: #64748b; font-size: 0.875rem;">${tier.description}</p>
        </div>
        
        <div class="mb-6">
            <div style="display: flex; align-items: baseline; gap: 0.5rem;">
                <span style="font-size: 2.5rem; font-weight: 800; color: ${priceColor};">${tier.price.toLocaleString()}</span>
                <span style="color: #64748b; font-size: 1.125rem;">KSh</span>
            </div>
            <p style="color: #64748b; font-size: 0.875rem; margin-top: 0.25rem;">${tier.quantity} stickers • ${tier.size}</p>
            ${savingsText}
        </div>

        <ul style="space-y: 0.75rem; margin-bottom: 2rem;">
            <li style="display: flex; align-items: start; gap: 0.5rem; color: #4b5563; margin-bottom: 0.75rem;">
                <span style="color: #dc2626; font-weight: bold;">✓</span>
                <span>${index === 0 ? 'Free design service' : 'Everything in ' + (index === 1 ? 'Starter' : index === 2 ? 'Hustler' : 'Boss Pack')}</span>
            </li>
            <li style="display: flex; align-items: start; gap: 0.5rem; color: #4b5563; margin-bottom: 0.75rem;">
                <span style="color: #dc2626; font-weight: bold;">✓</span>
                <span>${index === 0 ? 'Waterproof vinyl' : index === 1 ? 'Better unit price' : index === 2 ? '<strong>Lowest unit price</strong>' : 'Maximum savings'}</span>
            </li>
            <li style="display: flex; align-items: start; gap: 0.5rem; color: #4b5563; margin-bottom: 0.75rem;">
                <span style="color: #dc2626; font-weight: bold;">✓</span>
                <span>${index === 0 ? '2-3 day delivery' : index === 1 ? 'Priority support' : index === 2 ? 'Perfect stock quantity' : 'Dedicated support'}</span>
            </li>
            <li style="display: flex; align-items: start; gap: 0.5rem; color: #4b5563; margin-bottom: 0.75rem;">
                <span style="color: #dc2626; font-weight: bold;">✓</span>
                <span>${index === 0 ? 'Perfect for testing' : index === 1 ? 'Great for events' : index === 2 ? 'Bulk pricing advantage' : 'Enterprise-ready'}</span>
            </li>
        </ul>

        <a href="https://wa.me/254714929896?text=Hi!%20I%27m%20interested%20in%20the%20${encodeURIComponent(tier.name)}%20(${tier.quantity}%20stickers%20•%20${tier.size})" 
           style="display: block; text-align: center; ${buttonStyles} padding: 0.75rem; border-radius: 0.75rem; font-weight: 600; text-decoration: none; transition: all 0.3s;">
            ${buttonText}
        </a>
    `;

    return card;
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPricingTabs);
} else {
    initPricingTabs();
}
