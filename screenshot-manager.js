// OnboardingGuru Screenshot-Organisation für Playwright
const fs = require('fs');
const path = require('path');

// Automatische Ordner-Erstellung basierend auf aktuellem Datum
function createScreenshotDirs() {
    const currentMonth = new Date().toISOString().slice(0, 7); // "2025-09"
    const sessionDate = new Date().toISOString().slice(8, 10); // "11"
    
    const baseDir = path.join(process.cwd(), 'screenshots', currentMonth, `session-${sessionDate}-optimization`);
    
    // Basis-Ordner erstellen falls nicht vorhanden
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
        console.log(`📁 Created screenshot directory: ${baseDir}`);
    }
    
    return baseDir;
}

// Globale Variables für aktuellen Prompt
let currentPromptDir = '';
let iterationCounter = 1;

// Setup für neuen Prompt (zu Beginn jedes Prompts aufrufen)
function startNewPrompt(promptName) {
    const baseDir = createScreenshotDirs();
    currentPromptDir = path.join(baseDir, `prompt-${promptName}`);
    
    if (!fs.existsSync(currentPromptDir)) {
        fs.mkdirSync(currentPromptDir, { recursive: true });
        console.log(`🚀 Started prompt: ${promptName} | Screenshots: ${currentPromptDir}`);
    }
    
    iterationCounter = 1;
    return currentPromptDir;
}

// Screenshot-Funktionen mit automatischer Organisation
async function takeBeforeScreenshot(page, description = '') {
    const filename = `iteration-${iterationCounter}-before${description ? '-' + description : ''}.png`;
    const filepath = path.join(currentPromptDir, filename);
    
    await page.screenshot({ path: filepath, fullPage: true });
    console.log(`📸 BEFORE Screenshot: ${filename}`);
    return filepath;
}

async function takeAfterScreenshot(page, description = '') {
    const filename = `iteration-${iterationCounter}-after${description ? '-' + description : ''}.png`;
    const filepath = path.join(currentPromptDir, filename);
    
    await page.screenshot({ path: filepath, fullPage: true });
    console.log(`📸 AFTER Screenshot: ${filename}`);
    
    iterationCounter++; // Nächste Iteration vorbereiten
    return filepath;
}

// Mobile Screenshot (375px iPhone 13)
async function takeMobileScreenshot(page, type = 'mobile') {
    await page.setViewportSize({ width: 375, height: 667 });
    const filename = `iteration-${iterationCounter}-${type}.png`;
    const filepath = path.join(currentPromptDir, filename);
    
    await page.screenshot({ path: filepath, fullPage: true });
    console.log(`📱 Mobile Screenshot: ${filename}`);
    return filepath;
}

// Desktop Screenshot (1920px)
async function takeDesktopScreenshot(page, type = 'desktop') {
    await page.setViewportSize({ width: 1920, height: 1080 });
    const filename = `iteration-${iterationCounter}-${type}.png`;
    const filepath = path.join(currentPromptDir, filename);
    
    await page.screenshot({ path: filepath, fullPage: true });
    console.log(`🖥️ Desktop Screenshot: ${filename}`);
    return filepath;
}

// Kompletter Before/After Zyklus für eine Iteration
async function completeIterationScreenshots(page, description = '') {
    console.log(`\n🔄 Starting Iteration ${iterationCounter}: ${description}`);
    
    // Before Screenshots
    await page.setViewportSize({ width: 1920, height: 1080 });
    await takeBeforeScreenshot(page, 'desktop');
    
    await page.setViewportSize({ width: 375, height: 667 });
    await takeBeforeScreenshot(page, 'mobile');
    
    console.log(`⏸️ Make your changes now, then call completeAfterScreenshots()`);
}

async function completeAfterScreenshots(page, description = '') {
    // After Screenshots
    await page.reload(); // Sicherstellen dass Änderungen geladen sind
    await page.waitForTimeout(1000);
    
    await page.setViewportSize({ width: 1920, height: 1080 });
    await takeAfterScreenshot(page, 'desktop');
    
    await page.setViewportSize({ width: 375, height: 667 });
    await takeAfterScreenshot(page, 'mobile');
    
    console.log(`✅ Iteration ${iterationCounter-1} complete: ${description}\n`);
}

// Performance Metrics Logging
async function logPerformanceMetrics(page) {
    const metrics = await page.evaluate(() => {
        const performanceEntries = performance.getEntriesByType('navigation')[0];
        const paintEntries = performance.getEntriesByType('paint');
        
        return {
            loadTime: Math.round(performanceEntries.loadEventEnd - performanceEntries.fetchStart),
            domContentLoaded: Math.round(performanceEntries.domContentLoadedEventEnd - performanceEntries.fetchStart),
            firstPaint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0,
            firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
            transferSize: performanceEntries.transferSize,
            domElements: document.querySelectorAll('*').length
        };
    });
    
    const logFile = path.join(currentPromptDir, `performance-metrics-iteration-${iterationCounter}.json`);
    fs.writeFileSync(logFile, JSON.stringify(metrics, null, 2));
    
    console.log(`📊 Performance Metrics logged:`, metrics);
    return metrics;
}

// Export functions for use
module.exports = {
    startNewPrompt,
    takeBeforeScreenshot,
    takeAfterScreenshot,
    takeMobileScreenshot,
    takeDesktopScreenshot,
    completeIterationScreenshots,
    completeAfterScreenshots,
    logPerformanceMetrics
};

// USAGE EXAMPLES:

// 1. Zu Beginn eines neuen Prompts:
// startNewPrompt('1-social-proof');

// 2. Für eine komplette Iteration:
// await completeIterationScreenshots(page, 'live-counter-implementation');
// // ... deine Code-Änderungen hier ...
// await completeAfterScreenshots(page, 'live-counter-implementation');

// 3. Oder manuell:
// await takeBeforeScreenshot(page);
// // ... Änderungen ...
// await takeAfterScreenshot(page);

// 4. Performance-Tracking:
// await logPerformanceMetrics(page);