# Google Analytics 4 Setup Guide for AfriEvolution

## Overview
This guide walks you through setting up Google Analytics 4 (GA4) for the AfriEvolution website. GA4 is Google's latest analytics platform that provides comprehensive insights into user behavior, traffic sources, conversions, and more.

---

## Step 1: Create a Google Analytics Account

### If you don't have a Google account:
1. Go to [accounts.google.com](https://accounts.google.com)
2. Click **Create account**
3. Follow the setup wizard to create your account
4. Verify your email

### If you already have a Google account:
1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **Start measuring** or **Create account**
3. Enter your account name (e.g., "AfriEvolution")
4. Choose account sharing settings and click **Next**

---

## Step 2: Create a GA4 Property

1. In Google Analytics, click **Admin** (gear icon at bottom-left)
2. In the **Property** column, click **Create Property**
3. Fill in the property details:
   - **Property name**: "AfriEvolution Website" or similar
   - **Reporting timezone**: Select your timezone (recommend UTC or your local timezone)
   - **Currency**: USD (or your preferred currency)
4. Click **Create Property**

---

## Step 3: Create a Web Data Stream

1. After property creation, you'll see **Data Stream** setup
2. Choose **Web** as the platform
3. Enter the website details:
   - **Website URL**: `https://www.afrievolution.com` (without trailing slash)
   - **Stream name**: "AfriEvolution Website" or similar
4. Click **Create Stream**

### ✅ You now have your **Measurement ID**
- It will look like: `G-XXXXXXXXXX` (11 characters)
- **Copy this ID** - you'll need it in the next step

---

## Step 4: Add the Measurement ID to Your Site

### In the AfriEvolution codebase:

1. Open `src/partials/analytics.html`
2. Replace `G-XXXXXXXXXX` with your actual Measurement ID (appears twice in the file)

**Example:**
```html
<!-- BEFORE -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  gtag('config', 'G-XXXXXXXXXX');
</script>

<!-- AFTER (with real ID like G-ABC123XYZ) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ"></script>
<script>
  gtag('config', 'G-ABC123XYZ');
</script>
```

3. Save the file
4. Run `npm run build` to rebuild the project
5. Deploy to production

---

## Step 5: Verify GA4 is Working

1. After deployment, open your website in a browser
2. Go back to Google Analytics at [analytics.google.com](https://analytics.google.com)
3. Select your property and data stream
4. Look for the **Real-time** report
5. Browse your website and watch real-time events appear in GA4

### ✅ You should see:
- Page views
- Session starts
- User counts
- Event timestamps

**Note:** It may take 24-48 hours for historical data to populate in reports.

---

## Step 6: Set Up Key Features (Recommended)

### Goal Conversions
Track specific user actions (button clicks, form submissions, etc.):

1. In Google Analytics Admin, click **Conversions**
2. Click **Create new conversion event**
3. Set up events for:
   - Contact form submissions
   - Service inquiry clicks
   - CTA button clicks

### E-Commerce Tracking (Optional)
If you sell products, enable e-commerce measurement:
1. Admin > Data Streams > Web > Enhanced measurement
2. Check **Purchase** and **View item list**

### Custom Events
Add custom JavaScript tracking:
```javascript
// Track custom events
gtag('event', 'contact_inquiry', {
  'category': 'engagement',
  'label': 'Services'
});
```

---

## Security & CSP Configuration

### ✅ Already Configured in `_headers`:
The AfriEvolution site's CSP headers already allow Google Analytics:

```plaintext
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com
connect-src 'self' https://formspree.io https://www.google-analytics.com
```

**No additional CSP changes needed** - GA4 will work immediately after deployment.

### Why this matters:
- Allows GA4 script to load from googletagmanager.com ✅
- Allows data transmission to google-analytics.com ✅
- Maintains security by restricting to these specific origins ✅

---

## Useful Reports to Monitor

### Essential Reports:
1. **Real-time** → See live user activity
2. **Users** → Active users, new vs returning
3. **Events** → Track specific user actions
4. **Acquisition** → Where traffic comes from (organic, direct, referral)
5. **Engagement** → Session duration, bounce rate
6. **Conversion** → Goal completions and funnels

### Business Insights:
1. **User demographics** (requires consent management)
2. **Traffic sources** → Compare organic, paid, referral
3. **Device category** → Mobile vs desktop usage
4. **Geographic data** → Users by country/region

---

## Troubleshooting

### GA4 Not Showing Data

**Issue:** Real-time shows no activity after 24 hours
- ✓ Verify Measurement ID is correct (copy from Admin > Data Streams)
- ✓ Confirm GA4 script loaded: Open DevTools → Console, check for JS errors
- ✓ Check CSP headers: Ensure googletagmanager.com isn't blocked
- ✓ Wait 24-48 hours for historical reports to populate

**Issue:** Script blocked by browser extensions
- ✓ Ask users to whitelist your site in their adblocker
- ✓ Test in incognito mode to bypass extensions
- ✓ This is expected - some users block analytics

### Lost Data
- ✓ GA4 keeps data for minimum 2 months (longer in paid accounts)
- ✓ Export reports to CSV for long-term storage

---

## Privacy & GDPR Compliance

### Important Notes:
1. **Consent Management:** If your audience includes EU users, implement a cookie consent banner before GA4 loads
2. **Privacy Policy:** Update your privacy policy to mention Google Analytics
3. **Data Retention:** Configure data retention in GA4 Admin settings
4. **User Anonymization:** Consider enabling IP anonymization if needed

### Resources:
- [Google Analytics Privacy & Compliance](https://support.google.com/analytics/answer/9019185)
- [GDPR Compliance Guide](https://support.google.com/analytics/answer/10976779)

---

## Advanced: Custom Event Tracking

Once GA4 is live, you can track custom events. Example:

```javascript
// Track when user clicks "Learn More"
document.querySelectorAll('[data-track="learn-more"]').forEach(btn => {
  btn.addEventListener('click', () => {
    gtag('event', 'learn_more_clicked', {
      'service_type': btn.dataset.service,
      'section': btn.dataset.section
    });
  });
});
```

Add `data-track` attributes to your HTML buttons to track interactions.

---

## Next Steps

1. ✅ Create GA4 account and property
2. ✅ Get your Measurement ID
3. ✅ Update `src/partials/analytics.html` with your ID
4. ✅ Run `npm run build` to rebuild
5. ✅ Deploy to production
6. ✅ Wait 24-48 hours for data to appear
7. ✅ Set up conversion tracking
8. ✅ Configure custom dashboards

---

## Support & Resources

- **Google Analytics Help**: [support.google.com/analytics](https://support.google.com/analytics)
- **GA4 Documentation**: [analytics.google.com/analytics/academy](https://analytics.google.com/analytics/academy)
- **Community Forum**: [support.google.com/analytics/community](https://support.google.com/analytics/community)

---

## Checklist for Launch

- [ ] Google Analytics account created
- [ ] GA4 property created
- [ ] Measurement ID obtained (format: G-XXXXXXXXXX)
- [ ] Analytics ID added to `src/partials/analytics.html`
- [ ] Site rebuilt with `npm run build`
- [ ] Deployed to production (https://www.afrievolution.com)
- [ ] Real-time reports showing data (24-48 hours)
- [ ] Conversion tracking configured
- [ ] Privacy policy updated
- [ ] CSP headers verified (already done ✅)

---

**Last Updated:** December 8, 2025
