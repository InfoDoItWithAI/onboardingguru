# Screenshot Manager Usage Guide

## 🎯 **Purpose**
Organize OnboardingGuru landing page optimization screenshots systematically with automatic directory structure and performance tracking.

## 📁 **Directory Structure**
```
screenshots/
├── 2025-09/                          # Current month
│   └── session-11-optimization/      # Session date
│       ├── OPTIMIZATION_SUMMARY.md   # Complete session summary
│       └── prompt-{name}/             # Individual prompts
│           ├── iteration-1-before-desktop.png
│           ├── iteration-1-after-desktop.png  
│           ├── iteration-1-before-mobile.png
│           ├── iteration-1-after-mobile.png
│           └── performance-metrics-iteration-1.json
```

## 🚀 **How to Use**

### 1. Start New Optimization Prompt
```javascript
const { startNewPrompt } = require('./screenshot-manager.js');

// At the beginning of each new optimization focus
startNewPrompt('hero-optimization');
// Creates: screenshots/2025-09/session-11-optimization/prompt-hero-optimization/
```

### 2. Complete Iteration Cycle (Recommended)
```javascript
const { completeIterationScreenshots, completeAfterScreenshots } = require('./screenshot-manager.js');

// Before making changes
await completeIterationScreenshots(page, 'live-counter-implementation');

// Make your code changes here...
// Edit components, adjust styles, etc.

// After making changes  
await completeAfterScreenshots(page, 'live-counter-implementation');
```

### 3. Manual Screenshots (For Specific Needs)
```javascript
const { takeBeforeScreenshot, takeAfterScreenshot, takeMobileScreenshot, takeDesktopScreenshot } = require('./screenshot-manager.js');

// Individual screenshots
await takeBeforeScreenshot(page, 'baseline');
// ... make changes ...
await takeAfterScreenshot(page, 'enhanced');

// Specific viewport screenshots
await takeDesktopScreenshot(page, 'desktop-final');
await takeMobileScreenshot(page, 'mobile-final');
```

### 4. Performance Tracking
```javascript
const { logPerformanceMetrics } = require('./screenshot-manager.js');

// Log performance data with screenshots
const metrics = await logPerformanceMetrics(page);
// Saves performance-metrics-iteration-X.json
```

## 📱 **Viewport Standards**
- **Desktop**: 1920x1080 (Primary development view)
- **Mobile**: 375x667 (iPhone 13 standard)

## 📊 **Performance Metrics Tracked**
- Load Time (ms)
- DOM Content Loaded (ms)  
- First Paint (ms)
- First Contentful Paint (ms)
- Transfer Size (bytes)
- DOM Elements count

## 🎯 **Naming Conventions**

### Prompt Names:
- `1-social-proof` - Live counters and social proof
- `2-roi-calculator` - Interactive risk calculator  
- `3-porsche-metaphor` - Visualization components
- `4-anti-personio` - Positioning and messaging
- `5-mobile-optimization` - Responsive improvements

### Screenshot Descriptions:
- `baseline` - Initial state documentation
- `desktop` - Standard desktop view
- `mobile` - Mobile responsive view  
- `live-counter` - Specific component focus
- `final` - Completion state

## ✅ **Best Practices**

### Before Starting:
1. Always call `startNewPrompt()` for new optimization focus
2. Ensure dev server is running (`npm run dev`)
3. Clear browser cache for accurate performance metrics

### During Optimization:
1. Use `completeIterationScreenshots()` for systematic documentation
2. Make one focused change per iteration
3. Always test both desktop and mobile viewports
4. Log performance metrics for significant changes

### After Optimization:
1. Review all before/after comparisons
2. Document key changes in commit messages
3. Update optimization summary with results
4. Archive screenshots in organized structure

## 🔄 **Example Optimization Flow**

```javascript
// 1. Start new optimization focus
startNewPrompt('hero-section-redesign');

// 2. Document current state
await completeIterationScreenshots(page, 'current-hero-baseline');

// 3. Make targeted improvement
// Edit src/app/page.tsx - update hero headline

// 4. Document changes
await completeAfterScreenshots(page, 'new-hero-headline');

// 5. Performance check
await logPerformanceMetrics(page);

// 6. Continue with next iteration...
```

## 📈 **Performance Targets**
- **Load Time**: <2.5s (Currently: 739ms ✅)
- **First Contentful Paint**: <1.8s (Currently: 352ms ✅)
- **Transfer Size**: <50KB (Currently: 12KB ✅)
- **DOM Elements**: <500 (Currently: 406 ✅)

## 🛠️ **Troubleshooting**

### Screenshots Not Saving:
- Check directory permissions
- Ensure screenshot-manager.js is in project root
- Verify Node.js fs module access

### Performance Metrics Empty:
- Ensure page is fully loaded before measuring
- Use `await page.waitForTimeout(1000)` after navigation
- Check browser console for JavaScript errors

### Mobile Screenshots Issues:
- Verify viewport dimensions (375x667)
- Check responsive breakpoints in CSS
- Test touch targets are ≥44px

## 🎯 **Integration with OnboardingGuru Optimization**

This screenshot manager is specifically designed for our systematic OnboardingGuru landing page optimization workflow:

1. **Social Proof Implementation** - Document live counter iterations
2. **ROI Calculator Development** - Track interactive component changes
3. **Porsche Metaphor Creation** - Visual gamification screenshots  
4. **Anti-Personio Positioning** - Messaging and CTA optimizations
5. **Mobile-First Excellence** - Responsive design validation

**Result**: Complete visual documentation of conversion optimization journey with performance tracking and organized comparison system.

---

*Created for OnboardingGuru SaaS landing page optimization - Systematic Playwright workflow with Claude Code.*