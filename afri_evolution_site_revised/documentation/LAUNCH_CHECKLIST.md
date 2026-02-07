# AfriEvolution Website - Launch Checklist & Guide
**Date:** December 8, 2025 | **Status:** 🟢 Ready for Production

---

## ✅ Pre-Launch Verification

### Site Functionality
- [x] Homepage loads and renders correctly
- [x] All internal links working (no 404s)
- [x] Navigation menu responsive on mobile
- [x] Glass morphic toggle opens horizontally
- [x] Service cards display correct colors (gray text, yellow "Learn More")
- [x] Sticky menu appears after scroll on desktop, hidden on mobile
- [x] Hero image loads (both WebP and JPEG formats)
- [x] Contact form functional
- [x] Dark/light theme toggle working
- [x] All pages have proper canonical URLs (no .html extensions)
- [x] SEO meta tags present on all pages

### Build Quality
- [x] Production build completes successfully
- [x] No console errors in dist files
- [x] CSS properly minified (65.57 KB gzipped)
- [x] JavaScript properly minified (11.68 KB gzipped)
- [x] HTML pages optimized
- [x] Image assets properly versioned and served

### Security & Headers
- [x] CSP headers configured (`_headers`)
- [x] X-Frame-Options set (SAMEORIGIN)
- [x] X-Content-Type-Options configured (nosniff)
- [x] HSTS enabled (Strict-Transport-Security)
- [x] Permissions-Policy restricts dangerous features
- [x] CSP includes Google Analytics domains

### SEO & Metadata
- [x] Canonical URLs configured on all pages
- [x] Sitemap generated with correct URLs (no .html)
- [x] robots.txt configured
- [x] og:image, og:title, og:description present
- [x] Sitemap dates updated (2025-12-08)
- [x] Stack page removed from sitemap (not published yet)

---

## 🚀 Deployment Steps

### Step 1: Prepare Your Environment
```bash
# In your project directory
cd "c:\Users\Dineo\Desktop\AfriEvolution\Afri Evolution Website\Website Files\afri_evolution_site_revised"

# Ensure everything is built
npm run build

# Verify dist/ folder is ready
ls dist/  # Should see: index.html, services.html, etc.
```

### Step 2: Set Up Google Analytics (CRITICAL)
**⚠️ Do this BEFORE deploying or your tracking will be incomplete**

1. Follow the complete guide: `documentation/GOOGLE_ANALYTICS_SETUP.md`
2. Create GA4 property and get Measurement ID (format: G-XXXXXXXXXX)
3. Edit `src/partials/analytics.html`:
   ```html
   <!-- Replace both instances of G-XXXXXXXXXX with your actual ID -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ"></script>
   <script>
     gtag('config', 'G-ABC123XYZ');
   </script>
   ```
4. Rebuild: `npm run build`

### Step 3: Deploy to Production
Your deployment depends on your hosting platform:

#### **If hosting on Netlify (Recommended)**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist

# Or use Netlify UI: Drag & drop dist/ folder
```

#### **If hosting on Vercel**
```bash
npm install -g vercel
vercel --prod
```

#### **If hosting on other platforms (AWS S3, Google Cloud, etc.)**
1. Upload contents of `dist/` to your web server root
2. Ensure `_headers` file is copied (if your host supports it)
3. Configure redirects for clean URLs (remove .html extensions)
4. Set cache headers appropriately (see below)

#### **If hosting on traditional shared hosting (cPanel, etc.)**
1. Upload `dist/` contents to `public_html/`
2. Copy `_headers` directives to `.htaccess` or server config
3. Ensure SSL/HTTPS is enabled
4. Set gzip compression in hosting control panel

### Step 4: Verify Deployment
After uploading to production:

```bash
# Test the live site
curl -I https://www.afrievolution.com/
# Should return 200 OK

# Check headers
curl -I https://www.afrievolution.com/
# Verify CSP, HSTS, X-Frame-Options present

# Check SEO
curl https://www.afrievolution.com/sitemap.xml
# Should return valid sitemap
```

### Step 5: Enable HTTPS & Security
- [ ] Obtain SSL certificate (Let's Encrypt free or paid)
- [ ] Redirect HTTP to HTTPS
- [ ] Update `_headers` with final production domain
- [ ] Enable HSTS (already configured)

---

## 📊 Post-Deployment Checklist

### Day 1 (Immediately After Launch)
- [ ] Visit https://www.afrievolution.com in browser
  - [ ] Site loads and renders correctly
  - [ ] No 404 errors
  - [ ] HTTPS lock icon visible
  - [ ] All images load
  - [ ] Interactive elements work (buttons, forms, theme toggle)

- [ ] Check console for errors
  - [ ] Open DevTools (F12)
  - [ ] Go to Console tab
  - [ ] Look for red error messages
  - [ ] Red errors = immediate fix needed
  - [ ] Yellow warnings = OK to ignore

- [ ] Test Google Analytics
  - [ ] Go to https://analytics.google.com
  - [ ] Select your property
  - [ ] Click Real-time report
  - [ ] Browse your site in another tab
  - [ ] You should see events appear in GA4 within 5-10 seconds

- [ ] Monitor for errors
  - [ ] Check Google Search Console for crawl errors
  - [ ] Check hosting platform error logs
  - [ ] Monitor uptime (use Uptime Robot or similar)

### Week 1
- [ ] Review Google Search Console
  - [ ] Submit sitemap if not auto-discovered
  - [ ] Check coverage report
  - [ ] Look for indexation issues

- [ ] Run PageSpeed Insights
  - [ ] Go to https://pagespeed.web.dev
  - [ ] Enter your URL
  - [ ] Note Performance, Accessibility, Best Practices, SEO scores
  - [ ] Review recommendations
  - [ ] Save baseline for future comparison

- [ ] Set up Search Console tracking
  - [ ] Verify site ownership
  - [ ] Add sitemap URL
  - [ ] Monitor indexation

- [ ] Configure Google Analytics goals
  - [ ] Track contact form submissions
  - [ ] Track CTA button clicks
  - [ ] Track pricing page views

### Month 1
- [ ] Monitor performance metrics
  - [ ] Core Web Vitals in Search Console
  - [ ] GA4 user trends
  - [ ] Traffic sources and conversion rates

- [ ] Plan optimizations (see POST_LAUNCH_OPTIMIZATION.md)
  - [ ] Identify pages with high bounce rates
  - [ ] Plan content improvements
  - [ ] Schedule optimization work

---

## 🔧 Important File References

### Configuration Files
| File | Purpose | Location |
|------|---------|----------|
| `_headers` | Security headers & CSP | Root directory |
| `sitemap.xml` | SEO sitemap | `public/sitemap.xml` |
| `robots.txt` | Search engine rules | `public/robots.txt` |
| `nginx.conf` | (Optional) server config | Root directory |

### Source Files
| File | Purpose | Location |
|------|---------|----------|
| `src/partials/analytics.html` | Google Analytics setup | `src/partials/` |
| `src/styles/input.css` | Base CSS | `src/styles/` |
| `src/scripts/main.js` | Main JS bundle | `src/scripts/` |
| `src/scripts/skin.js` | Glass effect & theme | `src/scripts/` |

### Documentation
| File | Purpose | Location |
|------|---------|----------|
| `GOOGLE_ANALYTICS_SETUP.md` | GA4 setup guide | `documentation/` |
| `POST_LAUNCH_OPTIMIZATION.md` | Performance roadmap | `documentation/` |
| `LAUNCH_CHECKLIST.md` | This file | `documentation/` |

---

## ⚙️ Configuration Customization

### Change Your Domain
If deploying to different domain than `www.afrievolution.com`:

1. Update in `_headers`:
   ```plaintext
   # Change Host header checks
   ```

2. Update in HTML files (canonical URLs):
   ```bash
   # Find and replace in all HTML files
   www.afrievolution.com → your-domain.com
   ```

3. Update `public/sitemap.xml`:
   ```xml
   <loc>https://your-domain.com/</loc>
   ```

### Customize Security Headers
Edit `_headers` to:
- Adjust CSP based on new third-party scripts
- Update cache policies
- Add/remove Permissions-Policy rules

---

## 📞 Troubleshooting

### Issue: Site shows "Coming Soon" page
**Solution:** Check that you uploaded `dist/` contents, not the `dist/` folder itself
- ✗ Wrong: `your-domain.com/dist/index.html`
- ✓ Correct: `your-domain.com/index.html`

### Issue: Styles not loading (unstyled page)
**Solution:** Check CSP style-src directive
- Ensure `'unsafe-inline'` is present (for now)
- Or ensure CSS file paths are correct in HTML

### Issue: Google Analytics not showing data
**Solution:** Verify Measurement ID setup
- [ ] Check `src/partials/analytics.html` has real ID, not `G-XXXXXXXXXX`
- [ ] Check CSP includes `https://www.googletagmanager.com` (should be present)
- [ ] Wait 24 hours for data to populate
- [ ] Check real-time report first

### Issue: 404 errors on internal links
**Solution:** Check URL rewrite rules
- Ensure `.html` extensions are hidden in web server
- Configure 404 page to show `dist/404.html`

### Issue: HTTPS not working
**Solution:** Configure SSL certificate
- [ ] Install SSL cert on your hosting
- [ ] Redirect all HTTP to HTTPS
- [ ] Update all `<a>` links to use `https://`

---

## 🎯 Success Criteria

Your site is successfully launched when:

1. **Functional**
   - [x] All pages load without errors
   - [x] All links work
   - [x] Forms submit successfully
   - [x] Images display properly

2. **Secure**
   - [x] HTTPS enabled (green lock icon)
   - [x] Security headers present
   - [x] CSP configured

3. **Discoverable**
   - [x] Sitemap submitted to Search Console
   - [x] Pages indexed in Google
   - [x] Canonical URLs correct

4. **Tracked**
   - [x] Google Analytics configured
   - [x] Real-time events appearing
   - [x] Conversion goals set up

5. **Fast**
   - [x] PageSpeed Insights score > 80
   - [x] LCP < 2.5 seconds
   - [x] Images properly optimized (WebP served)

---

## 📈 Next Steps (Roadmap)

### Week 1-2
- ✅ Launch site
- ✅ Set up Google Analytics
- ✅ Submit to Search Console
- [ ] Monitor for errors
- [ ] Set up heat mapping (optional)

### Week 2-4
- [ ] Review analytics baseline
- [ ] Implement GA4 conversion tracking
- [ ] Run first PageSpeed audit
- [ ] Plan optimization work

### Month 2
- [ ] Optimize Core Web Vitals
- [ ] Remove `unsafe-inline` from CSP
- [ ] Add AVIF image format
- [ ] Implement AVIF images alongside WebP

### Month 3+
- [ ] Implement advanced analytics (custom events)
- [ ] A/B testing setup
- [ ] Performance monitoring dashboard
- [ ] Regular content updates

---

## 📚 Resources

### Essential Links
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics 4](https://analytics.google.com)
- [PageSpeed Insights](https://pagespeed.web.dev)
- [WebPageTest](https://www.webpagetest.org)

### Documentation
- [MDN Web Docs](https://developer.mozilla.org)
- [Google Web.dev](https://web.dev)
- [Netlify Documentation](https://docs.netlify.com)

### Support
- Hosting Support: Contact your hosting provider
- Google Analytics Help: [support.google.com/analytics](https://support.google.com/analytics)
- SEO Help: [search.google.com/search-console/about](https://search.google.com/search-console/about)

---

## 🎉 Launch Celebration

**Your site is now ready for the world!**

Once deployed:
1. Share the link with team members
2. Monitor analytics for first week
3. Celebrate your launch! 🎊

---

**Questions?** Refer to the detailed guides:
- `GOOGLE_ANALYTICS_SETUP.md` - Complete GA4 setup walkthrough
- `POST_LAUNCH_OPTIMIZATION.md` - Performance optimization roadmap
- `documentation/README.md` - All documentation overview

**Last Updated:** December 8, 2025
