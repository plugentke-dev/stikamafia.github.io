# 🎨 StiKaMafia - Custom Sticker Landing Page

> **Professional landing page for StiKaMafia** - A custom sticker business based in Embu, Kenya that offers no-minimum orders, 48-hour delivery, and free design services.

![StiKaMafia](images/logo.svg)

---

## 🌟 Overview

This is a modern, conversion-optimized landing page built for **StiKaMafia**, a local Kenyan sticker printing business. The page is designed to convert visitors into WhatsApp leads through clear messaging, social proof, and strategic CTAs.

### ✨ Key Features

- 🎯 **Conversion-Focused Design** - Multiple strategic CTAs throughout the page
- 📱 **Fully Responsive** - Beautiful on all devices (mobile, tablet, desktop)
- ⚡ **Fast Loading** - Optimized assets and lazy loading
- ♿ **Accessible** - WCAG compliant with proper semantic HTML
- 🎨 **Modern UI** - Gradient effects, animations, and smooth transitions
- 📊 **Analytics Ready** - Built-in event tracking system

---

## 🚀 Quick Start

### Prerequisites

- A modern web browser
- A web server (optional for local development)

### Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/stikamafia-landing.git
   cd stikamafia-landing
   ```

2. **Open in browser**
   - Simply open `index.html` in your browser, OR
   - Use a local server (recommended):
   
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (with http-server)
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```

3. **Visit in browser**
   ```
   http://localhost:8000
   ```

---

## 📁 Project Structure

```
stikamafia-landing/
├── index.html                 # Main landing page
├── README.md                  # Documentation (you are here)
│
├── assets/                    # Stylesheets
│   ├── main.css              # Core styles & variables
│   ├── components.css        # Component-specific styles
│   ├── animations.css        # Animation & transition effects
│   └── images.css            # Image-specific styles
│
├── js/                        # JavaScript modules
│   ├── main.js               # Main app orchestrator
│   ├── navigation.js         # Navigation & scroll behavior
│   ├── faq.js                # FAQ accordion functionality
│   └── analytics.js          # Event tracking & analytics
│
└── images/                    # Image assets
    ├── logo.svg              # SVG logo
    └── logo.png              # PNG logo fallback
```

---

## 🎨 Customization Guide

### 1. Update Contact Information

**WhatsApp Number** (currently: `254714929896`)

Update in these files:
- `index.html` - Search for `254714929896` and replace all instances
- `js/main.js` - Line 12: Update `whatsappNumber` variable

**Email & Social Links**

Update in `index.html`:
- Footer section (search for `info@stikamafia.co.ke`)
- Social media links (`@stikamafia`)

### 2. Add Your Own Images

Replace placeholder images with real photos:

```html
<!-- Portfolio Work Images -->
<img src="assets/images/work/cafe-stickers.jpg" alt="Café stickers">
<img src="assets/images/work/event-stickers.jpg" alt="Event stickers">

<!-- Founder Photo -->
<img src="assets/images/founder.jpg" alt="Job Junior Kimanthi">
```

### 3. Customize Colors

Edit `assets/main.css` - CSS Variables (lines 6-44):

```css
:root {
    --primary: #667eea;        /* Main brand color */
    --secondary: #764ba2;      /* Secondary brand color */
    --success: #25D366;        /* WhatsApp green */
    /* ... more variables */
}
```

### 4. Update Copy & Content

Edit `index.html` sections:
- **Hero Section** - Main headline and value proposition
- **Problem Section** - Customer pain points
- **Solution Section** - Your unique selling points
- **Testimonials** - Real customer reviews
- **FAQ** - Common questions (edit `js/faq.js` for content)

### 5. Add Google Analytics

Add your tracking code in `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🧩 Page Sections

### 1. **Navigation Bar**
- Sticky header with smooth scroll links
- WhatsApp CTA button
- Responsive mobile menu ready

### 2. **Hero Section**
- Eye-catching headline with clear value proposition
- Primary CTA (WhatsApp)
- Trust indicators (delivery time, free design)
- Animated visual elements

### 3. **Trust Bar**
- Social proof statistics
- 200+ clients, 10,000+ stickers, 48hr delivery, 5★ rating

### 4. **Problem Section**
- Before/After comparison
- Customer pain points highlighted
- Builds urgency and need

### 5. **Solution Section**
- Introduces StiKaMafia
- Feature list with benefits
- Founder card with credibility

### 6. **Portfolio/Work Showcase**
- Masonry gallery layout
- Sample work categories
- Links to Instagram for more

### 7. **Benefits Section**
- 6 key benefits with icons
- No minimums, fast delivery, free design, quality, local, guaranteed

### 8. **Testimonials**
- 3 customer reviews
- Avatar, name, role, star rating
- Real customer stories

### 9. **FAQ Section**
- Accordion-style FAQ (JavaScript powered)
- 5 common questions answered
- CTA to WhatsApp for more questions

### 10. **Final CTA**
- Strong conversion section
- Reinforces value proposition
- Clear next step

### 11. **Footer**
- Brand info, quick links, contact, social
- Professional closing

### 12. **Floating WhatsApp Button**
- Always visible
- Pulse animation
- Easy access to contact

---

## 📊 Analytics & Tracking

The site includes a custom analytics module (`js/analytics.js`) that tracks:

- ✅ Page views
- ✅ WhatsApp CTA clicks
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Time on page (30s, 60s, 180s)
- ✅ Outbound link clicks
- ✅ FAQ interactions

### Enable Debug Mode

In `js/analytics.js` (line 10):
```javascript
debug: true  // Set to false in production
```

View events in browser console (F12).

---

## 🎯 Conversion Optimization Tips

1. **Test Your WhatsApp Links** - Make sure all CTAs work correctly
2. **Add Real Images** - Replace placeholders with actual work photos
3. **Update Testimonials** - Use real customer reviews
4. **Speed Test** - Use Google PageSpeed Insights
5. **Mobile Test** - Check on actual mobile devices
6. **A/B Test Headlines** - Try different value propositions
7. **Track Conversions** - Monitor WhatsApp click-through rates

---

## 🛠️ Technical Details

### Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** - Modular architecture
- **Tailwind CSS** - Utility-first framework (CDN)
- **Google Fonts** - Poppins font family

### Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Performance

- Lazy loading for images
- Optimized animations with `requestAnimationFrame`
- Minimal external dependencies
- CSS variables for theme consistency
- Smooth 60fps animations

---

## 📱 Deployment

### Option 1: GitHub Pages (Free)

1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select main branch
4. Your site will be live at `https://yourusername.github.io/repo-name`

### Option 2: Netlify (Free)

1. Drag and drop your folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your Git repository
3. Automatic deployments on every push

### Option 3: Traditional Hosting

1. Upload all files via FTP
2. Ensure directory structure is maintained
3. Point domain to hosting

---

## 🔧 Troubleshooting

### CSS Not Loading?

Check file paths in `index.html`:
```html
<link rel="stylesheet" href="assets/main.css">
<!-- NOT assets/css/main.css -->
```

### JavaScript Not Working?

1. Check browser console (F12) for errors
2. Ensure all JS files are loaded
3. Verify file paths in `index.html`

### WhatsApp Links Not Working?

- Verify phone number format: `254714929896` (no + or spaces)
- Test on mobile device with WhatsApp installed

---

## 📄 License

This project is proprietary software for **StiKaMafia**. All rights reserved.

For licensing inquiries, contact: info@stikamafia.co.ke

---

## 👨‍💻 Credits

**Designed & Developed for:**
- **StiKaMafia** - Custom Stickers, No Minimums
- **Founder:** Job Junior Kimanthi (Mista Trix)
- **Location:** Embu, Kenya

**Built with:**
- Love ❤️
- Coffee ☕
- Kenyan ingenuity 🇰🇪

---

## 📞 Support

Need help with this landing page?

- 📱 WhatsApp: +254 714 929 896
- 📧 Email: info@stikamafia.co.ke
- 📸 Instagram: [@stikamafia](https://instagram.com/stikamafia)

---

## 🚀 Next Steps

**Immediate Actions:**
1. ✅ Update WhatsApp number throughout site
2. ✅ Add real portfolio images to `/images/work/`
3. ✅ Add founder photo to `/images/founder.jpg`
4. ✅ Customize testimonials with real reviews
5. ✅ Set up Google Analytics
6. ✅ Test all CTAs and links
7. ✅ Deploy to live server

**Future Enhancements:**
- [ ] Add Instagram feed integration
- [ ] Create blog section for SEO
- [ ] Add pricing calculator
- [ ] Build order form
- [ ] Implement live chat
- [ ] Add multi-language support (Swahili)

---

**Made with 💜 in Embu, Kenya** 🇰🇪#   s t i k a m a f i a . g i t h u b . i o  
 