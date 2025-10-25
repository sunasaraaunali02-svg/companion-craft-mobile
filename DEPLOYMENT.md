# EnglishTutor - Deployment Guide

## Overview

This guide covers the deployment and launch preparation for EnglishTutor, an AI-powered English learning Progressive Web App (PWA).

## Prerequisites

- Node.js 18+ installed
- Supabase project configured
- Domain name (optional, for production)
- SSL certificate (automatic with Lovable hosting)

## Environment Setup

### Required Environment Variables

Create a `.env` file with the following variables:

```env
VITE_SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

### Supabase Configuration

1. **Database Tables**: Already configured via migrations
2. **Edge Functions**: Deployed automatically
   - `analyze-grammar`: Grammar analysis using AI
   - `ai-conversation`: AI conversation generation

3. **Storage Buckets**:
   - `avatars`: Public bucket for user profile pictures

4. **Authentication**:
   - Email/Password enabled
   - Email confirmation required (configure in Supabase Dashboard)

## Deployment Options

### Option 1: Lovable Hosting (Recommended)

1. Click the **Publish** button in Lovable
2. Your app will be deployed to `yourproject.lovable.app`
3. Automatic SSL, CDN, and global distribution included
4. Zero configuration required

**Custom Domain Setup**:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate auto-provisioned

### Option 2: Self-Hosting

#### Build for Production

```bash
npm install
npm run build
```

This creates optimized files in the `dist/` directory.

#### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

#### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Deploy to Traditional Hosting

1. Build the project: `npm run build`
2. Upload contents of `dist/` folder to your web server
3. Configure server to serve `index.html` for all routes (SPA)
4. Ensure HTTPS is enabled

### Docker Deployment

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## PWA Configuration

### Service Worker

The service worker is automatically registered in `src/main.tsx` and handles:
- Offline caching of app shell
- API response caching
- Background sync for progress data

### Manifest Configuration

Located at `public/manifest.json`:
- App name, icons, and theme colors configured
- Screenshots for app store listings
- Display mode set to "standalone"

### Installation

Users can install EnglishTutor as a native app:
- **iOS**: Safari → Share → Add to Home Screen
- **Android**: Chrome → Menu → Install App
- **Desktop**: Browser will show install prompt

## Testing Checklist

### Pre-Deployment Testing

- [ ] All routes load correctly
- [ ] Authentication flow works (sign up, sign in, sign out)
- [ ] Speech recognition functions in target browsers
- [ ] Grammar analysis returns results
- [ ] AI conversation generates responses
- [ ] Progress tracking saves correctly
- [ ] PWA installs successfully
- [ ] Offline mode works for basic features
- [ ] Responsive design works on mobile/tablet/desktop

### Browser Compatibility

- ✅ Chrome 90+ (Recommended)
- ✅ Edge 90+
- ✅ Safari 14.5+ (iOS speech recognition support)
- ⚠️ Firefox (limited speech recognition)

### Performance Targets

- Lighthouse Performance Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## Security Considerations

### Implemented Security Measures

- Row Level Security (RLS) on all Supabase tables
- HTTPS enforced for all connections
- JWT-based authentication with Supabase
- Environment variables for API keys
- CORS configured for Supabase edge functions

### Security Checklist

- [ ] All database RLS policies tested
- [ ] API keys stored as environment variables (never in code)
- [ ] HTTPS enabled on production domain
- [ ] Content Security Policy headers configured
- [ ] Rate limiting on edge functions
- [ ] User data encryption at rest (Supabase default)

## Monitoring & Analytics

### Error Tracking

The app includes error tracking via `useErrorTracking` hook:
- Global error handler for JavaScript errors
- Unhandled promise rejection tracking
- Manual error tracking capability

**Integration Options**:
- Sentry: Add DSN to environment variables
- LogRocket: Include script in index.html
- Custom endpoint: Modify `useErrorTracking.ts`

### Analytics

The app includes analytics preparation via `useAnalytics` hook:
- Page view tracking
- Event tracking (practice, conversation, etc.)
- User journey tracking

**Integration Options**:
- Google Analytics: Add GA4 measurement ID
- Mixpanel: Include project token
- Plausible: Self-hosted privacy-focused analytics

## Launch Preparation

### Pre-Launch Checklist

- [ ] Privacy Policy updated with contact information
- [ ] Terms of Service reviewed and finalized
- [ ] Help documentation complete and accurate
- [ ] Feedback mechanism tested
- [ ] Onboarding tutorial reviewed
- [ ] Email templates configured in Supabase
- [ ] Custom domain connected (if applicable)
- [ ] SSL certificate active
- [ ] Social media metadata (Open Graph) added
- [ ] App store assets prepared (if submitting to stores)

### Post-Launch Monitoring

First 24 Hours:
- Monitor error rates in console
- Check authentication success rates
- Verify AI edge functions response times
- Track user signup/conversion rates

First Week:
- Review user feedback submissions
- Monitor practice completion rates
- Check conversation quality and relevance
- Analyze most popular topics

### Support Setup

1. **Email Support**: Configure `support@yourdomain.com`
2. **Documentation**: Keep Help page updated
3. **Community**: Consider Discord or forum for users
4. **Status Page**: Monitor uptime (use UptimeRobot or similar)

## App Store Submission (Optional)

### Progressive Web App vs Native

EnglishTutor is built as a PWA and can be:
1. Used directly in browser (no installation required)
2. Installed as PWA on mobile devices
3. Wrapped in native container for app stores

### Converting to Native App

**Using Capacitor (Recommended)**:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add ios
npx cap add android
```

Then build native apps for submission to:
- Apple App Store (iOS)
- Google Play Store (Android)

### App Store Requirements

- App icons in all required sizes
- App screenshots (multiple devices)
- Privacy policy URL
- App description and keywords
- Developer account ($99/year Apple, $25 one-time Google)

## Maintenance & Updates

### Regular Maintenance

- Weekly: Review user feedback and error logs
- Monthly: Update dependencies for security patches
- Quarterly: Review and optimize edge functions usage
- As needed: Add new topics and features

### Updating the App

1. Make changes in code
2. Test thoroughly in development
3. Build and deploy
4. Service worker will update automatically for users
5. Consider showing "Update Available" prompt

## Cost Estimation

### Lovable Hosting
- Included in Lovable subscription
- Unlimited bandwidth and storage
- Global CDN included

### Supabase Costs (Usage-Based)
- Free tier: 500MB database, 1GB file storage, 2GB bandwidth
- Database queries: Free tier generous for MVP
- Edge function invocations: First 500k free monthly
- Paid plans start at $25/month for production apps

### AI Costs (via Lovable AI)
- Included in Lovable subscription
- Alternative: Direct OpenAI API (~$0.002 per 1k tokens)

### Domain & SSL
- Domain: $10-15/year
- SSL: Free with Let's Encrypt or hosting provider

## Troubleshooting

### Common Issues

**Speech Recognition Not Working**:
- Check browser compatibility (Chrome/Edge recommended)
- Verify microphone permissions granted
- Ensure HTTPS connection (required for Web Speech API)

**Edge Functions Timeout**:
- Check Supabase logs
- Verify API keys are set correctly
- Consider optimizing AI prompts for faster responses

**Authentication Errors**:
- Verify Supabase URL and anon key
- Check email confirmation settings
- Ensure redirect URLs configured correctly

## Support & Resources

- **Lovable Documentation**: https://docs.lovable.dev
- **Supabase Docs**: https://supabase.com/docs
- **Web Speech API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- **PWA Best Practices**: https://web.dev/progressive-web-apps/

## License

Copyright © 2024 EnglishTutor. All rights reserved.

---

**Questions?** Contact the development team or refer to the help documentation in the app.
