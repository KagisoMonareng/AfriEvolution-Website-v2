# Glassmorphism Quick Reference Card

## 🚀 Quick Start (30 seconds)

### Enable Glass
Click the **✨ button** in the header navigation or run:
```javascript
window.aeToggleSkin();
```

### View Demo
Visit: `/src/pages/styleguide/glass-qa.html`

---

## 📝 Basic Usage

### Standard Glass Card
```html
<div class="glass glass-card">
  <h3 class="heading">Title</h3>
  <p class="body">Content</p>
  <button class="btn-primary">Action</button>
</div>
```

### Strong Glass Modal
```html
<div class="glass-strong glass-modal">
  <h3 class="heading">Modal Title</h3>
  <p class="body">Modal content</p>
</div>
```

### Glass Navigation
```html
<header class="glass glass-nav">
  <!-- Nav content -->
</header>
```

### Glass Hero (Bold)
```html
<section class="v-bold">
  <div class="glass-strong glass-hero">
    <h1 class="heading">Hero Title</h1>
    <p class="body">Hero description</p>
  </div>
</section>
```

---

## 🎨 Variants

| Variant | Blur | Saturation | Use Case |
|---------|------|------------|----------|
| **Standard** | 14px | 125% | General UI, cards, navigation |
| **Bold** (`.v-bold`) | 22px | 135% | Hero sections, marketing |
| **Subtle** (`.v-subtle`) | 8px | 108% | Dense data, analytics |

### Applying Variants
```html
<!-- Bold Hero -->
<section class="v-bold">
  <div class="glass-strong">...</div>
</section>

<!-- Subtle Analytics -->
<div class="v-subtle">
  <div class="glass">...</div>
</div>
```

---

## 🎯 Essential Classes

### Glass Shells
- `.glass` - Standard glass background
- `.glass-strong` - Enhanced opacity

### Role-Based (Spacing)
- `.glass-nav` - Sticky navigation
- `.glass-hero` - Hero section padding
- `.glass-card` - Card padding
- `.glass-modal` - Modal padding

### Content (Inside Glass)
- `.heading` - For headings (proper color)
- `.body` - For body text (proper color)
- `.btn-primary` - Primary button (preserves gradient)
- `.btn-ghost` - Ghost button

### Interactive
- `.glass-interactive` - Enhanced on hover

---

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 76+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Firefox 103+ | ✅ Full |
| Safari 12-13 | ⚠️ Partial |
| IE11 | 🔄 Fallback |

**Total Coverage**: 96% with full support, 100% with fallbacks

---

## ♿ Accessibility

### Automatic Features
- ✅ WCAG AA contrast ratios maintained
- ✅ Enhanced focus indicators
- ✅ `prefers-reduced-transparency` support
- ✅ `prefers-reduced-motion` support
- ✅ Print-friendly (glass disabled)

### Requirements
Always use semantic classes inside glass:
```html
<div class="glass">
  <h3 class="heading"><!-- Use .heading --></h3>
  <p class="body"><!-- Use .body --></p>
</div>
```

---

## 📱 Mobile Performance

### Automatic Optimizations
- Blur reduced from 14px → 8px on mobile
- GPU acceleration enabled
- Scroll performance optimization active

### Manual Performance Tweaks
If experiencing issues:
1. Limit glass elements per page (5-7 max)
2. Use `.v-subtle` variant
3. Reduce `--glass-blur` in tokens.css:
   ```css
   :root {
     --glass-blur: 10px; /* Reduce from 14px */
   }
   ```

---

## 🔧 Toggle Methods

### Via UI Button
Click **✨** in header navigation

### Via JavaScript
```javascript
// Toggle on/off
window.aeToggleSkin();

// Check current state
const isGlass = document.body.getAttribute('data-skin') === 'glass';
console.log(isGlass);
```

### Via HTML (Default On)
```html
<body data-skin="glass">
```

---

## 🎨 Customization

### Custom Variant
```css
.my-variant {
  --glass-blur: 18px;
  --glass-saturate: 120%;
  --glass-tint: color-mix(in oklab, var(--bg) 75%, transparent);
}
```

Usage:
```html
<div class="my-variant">
  <div class="glass">...</div>
</div>
```

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Glass not showing | Check `data-skin="glass"` on `<body>` |
| Low performance | Limit glass elements, use `.v-subtle` |
| Text hard to read | Use `.glass-strong`, semantic classes |
| Focus not visible | Already enhanced, check browser zoom |
| Double blur | Don't nest `.glass` inside `.glass` |

---

## ✅ Best Practices

### DO ✅
- Use glass for nav, modals, cards, hero
- Apply `.v-bold` to hero/marketing
- Test contrast in both themes
- Limit to 5-7 glass elements per page
- Use semantic classes (`.heading`, `.body`)

### DON'T ❌
- Apply to forms/inputs
- Use on data tables
- Nest glass inside glass
- Apply `.v-bold` everywhere
- Skip mobile testing

---

## 📊 Testing

### Quick Test
1. Click ✨ to enable glass
2. Check nav, hero, modals
3. Toggle light/dark theme
4. Test on mobile
5. Print preview (glass should disappear)

### Full Test
Visit `/src/pages/styleguide/glass-qa.html` for:
- Variant comparison
- Contrast validation
- Performance indicators
- Integration checklist

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/styles/tokens.css` | Glass tokens (colors, blur, etc.) |
| `src/styles/glass.css` | All glass utilities |
| `src/scripts/skin.js` | Toggle logic + persistence |
| `src/pages/styleguide/glass-qa.html` | Comprehensive QA page |

---

## 🎯 Common Patterns

### Marketing Card
```html
<div class="glass glass-card glass-interactive">
  <h3 class="heading text-2xl font-bold mb-3">Feature</h3>
  <p class="body mb-4">Description text here.</p>
  <button class="btn-primary w-full py-2 rounded-lg">
    Learn More
  </button>
</div>
```

### Modal Dialog
```html
<div class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
  <div class="glass-strong glass-modal max-w-md w-full">
    <h3 class="heading text-2xl font-bold mb-4">Modal Title</h3>
    <p class="body mb-6">Modal content</p>
    <div class="flex gap-3">
      <button class="btn-primary flex-1">Confirm</button>
      <button class="btn-ghost flex-1">Cancel</button>
    </div>
  </div>
</div>
```

### Hero Section
```html
<section class="relative py-24 overflow-hidden v-bold">
  <img src="background.jpg" class="absolute inset-0 w-full h-full object-cover">
  <div class="absolute inset-0 bg-black opacity-40"></div>
  
  <div class="container mx-auto relative z-20">
    <div class="glass-strong glass-hero text-center max-w-4xl mx-auto">
      <h1 class="heading text-5xl font-bold mb-4">
        Your Hero Title
      </h1>
      <p class="body text-xl mb-8">
        Your compelling description
      </p>
      <button class="btn-primary px-8 py-3 rounded-full">
        Get Started
      </button>
    </div>
  </div>
</section>
```

---

## 🔗 Resources

- **Full Guide**: `GLASS_IMPLEMENTATION_GUIDE.md`
- **QA Page**: `/src/pages/styleguide/glass-qa.html`
- **Tokens**: `src/styles/tokens.css`
- **Utilities**: `src/styles/glass.css`
- **Toggle Script**: `src/scripts/skin.js`

---

**Quick Access**: Press `Ctrl+F` to search this card for specific topics!

**Version**: 1.0 | **Last Updated**: October 12, 2025

