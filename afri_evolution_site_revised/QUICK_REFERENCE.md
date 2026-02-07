# 🚀 AfriEvolution Launch - Quick Reference Card

**Print this or bookmark it!**

---

## ⚡ Pre-Launch Checklist (Do This First)

### Step 1: Google Analytics Setup (5 min)
```
1. Go to analytics.google.com
2. Create GA4 property "AfriEvolution Website"
3. Copy your Measurement ID (G-XXXXXXXXXX)
```

### Step 2: Update Code (2 min)
```bash
# Edit src/partials/analytics.html
# Replace both instances of:
  G-XXXXXXXXXX
# With:
  G-ABC123XYZ (your real ID)

# Then rebuild:
npm run build
```

### Step 3: Deploy (30 min)
```bash
# For Netlify:
npm install -g netlify-cli
netlify deploy --prod --dir=dist

# For others:
# Upload dist/ folder to your hosting
```

### Step 4: Verify (10 min)
```
✓ Visit https://www.afrievolution.com
✓ Check Google Analytics → Real-time report
✓ Should see events appearing
```

---

## 📊 What to Monitor Post-Launch

### Day 1
- [ ] Site loads (no 404s)
- [ ] HTTPS works (lock icon visible)
- [ ] GA4 real-time showing events
- [ ] No console errors (F12)

### Week 1
- [ ] Google Search Console indexation
- [ ] PageSpeed Insights score
- [ ] GA4 traffic baseline

### Ongoing
- Check PageSpeed: https://pagespeed.web.dev
- Check Analytics: https://analytics.google.com
- Check Search: https://search.google.com/search-console

---

## 📁 Important Files

```
PROJECT ROOT/
├── src/partials/analytics.html          ← Add your GA4 ID here
├── _headers                             ← Security headers (don't touch)
├── public/sitemap.xml                   ← SEO sitemap (updated ✓)
├── dist/                                ← Upload this folder to hosting
│
documentation/
├── LAUNCH_CHECKLIST.md                  ← Full deployment guide
├── GOOGLE_ANALYTICS_SETUP.md            ← GA4 step-by-step
├── POST_LAUNCH_OPTIMIZATION.md          ← Optimization roadmap
└── LAUNCH_READY_SUMMARY.md              ← This project summary

ROOT/
└── LAUNCH_READY_SUMMARY.md              ← Quick overview
```

---

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Clean build (if issues)
rm -r dist node_modules
npm install
npm run build
```

---

## ✅ Pre-Launch Checklist (Final)

- [ ] Google Analytics Measurement ID obtained
- [ ] src/partials/analytics.html updated with real ID
- [ ] npm run build completed successfully
- [ ] dist/ folder ready to deploy
- [ ] Hosting/domain ready
- [ ] SSL/HTTPS certificate enabled
- [ ] Backup created (optional but recommended)

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Site shows wrong page | Upload dist/ contents, not dist folder |
| Styles missing | Check CSP allows `'unsafe-inline'` (it does ✓) |
| GA4 no data | Verify real ID in analytics.html, wait 24h |
| 404 errors on links | Configure server to hide .html extensions |
| HTTPS not working | Ensure SSL cert installed on hosting |
| Images broken | Check paths in dist/ match image file names |

---

## 📞 Get Help

**Google Analytics:**
→ See: `documentation/GOOGLE_ANALYTICS_SETUP.md`

**Deployment Issues:**
→ See: `documentation/LAUNCH_CHECKLIST.md`

**Performance Optimization:**
→ See: `documentation/POST_LAUNCH_OPTIMIZATION.md`

**General Help:**
- Google Analytics: support.google.com/analytics
- Netlify: docs.netlify.com
- Vite: vitejs.dev

---

## 🎯 Success Criteria

✅ Site loads without errors  
✅ All pages accessible  
✅ HTTPS working  
✅ Google Analytics tracking events  
✅ Forms submitting properly  
✅ Mobile responsive  

---

## 🚀 You're Ready to Launch!

**Total setup time: ~30 minutes**

1. Get GA4 Measurement ID (5 min)
2. Update src/partials/analytics.html (2 min)
3. npm run build (1 min)
4. Deploy dist/ to hosting (15-30 min)
5. Verify it works (10 min)

**Good luck! 🎉**

---

**Created:** December 8, 2025  
**Status:** 🟢 Ready for Production
