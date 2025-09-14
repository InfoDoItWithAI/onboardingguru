// SCREENSHOT WRAPPER - Simple interface for MCP Playwright screenshots
const { startNewPrompt, generateFilename, moveScreenshotFromDownloads, nextIteration, getCurrentPaths } = require('./fixed-screenshot-system.js');

// Global state
let isInitialized = false;

// Simple initialization
function initScreenshots(promptName) {
    startNewPrompt(promptName);
    isInitialized = true;
    console.log(`🎯 Screenshot system initialized for: ${promptName}`);
}

// Take organized screenshot using MCP tool
async function takeOrganizedScreenshot(mcpScreenshotFunction, type, description = '', viewport = { width: 1920, height: 1080 }) {
    if (!isInitialized) {
        throw new Error('❌ Screenshot system not initialized. Call initScreenshots() first.');
    }
    
    // Generate unique temporary name and target filename
    const timestamp = Date.now();
    const tempName = `temp-${type}-${timestamp}`;
    const targetFilename = generateFilename(type, description);
    
    console.log(`📸 Taking ${type} screenshot: ${targetFilename}`);
    
    try {
        // Take screenshot using MCP tool
        await mcpScreenshotFunction({
            name: tempName,
            fullPage: true,
            savePng: true,
            width: viewport.width,
            height: viewport.height
        });
        
        // Wait a moment for file to be written
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Move to organized location
        const finalPath = await moveScreenshotFromDownloads(tempName, targetFilename);
        
        if (finalPath) {
            console.log(`✅ Screenshot organized: ${targetFilename}`);
            return finalPath;
        } else {
            console.error(`❌ Failed to organize screenshot: ${targetFilename}`);
            return null;
        }
    } catch (error) {
        console.error(`❌ Error taking screenshot:`, error);
        return null;
    }
}

// Convenient functions for common screenshot types
async function takeBeforeDesktop(mcpScreenshotFunction, description = '') {
    return takeOrganizedScreenshot(mcpScreenshotFunction, 'before', `desktop${description ? '-' + description : ''}`, { width: 1920, height: 1080 });
}

async function takeBeforeMobile(mcpScreenshotFunction, description = '') {
    return takeOrganizedScreenshot(mcpScreenshotFunction, 'before', `mobile${description ? '-' + description : ''}`, { width: 375, height: 667 });
}

async function takeAfterDesktop(mcpScreenshotFunction, description = '') {
    return takeOrganizedScreenshot(mcpScreenshotFunction, 'after', `desktop${description ? '-' + description : ''}`, { width: 1920, height: 1080 });
}

async function takeAfterMobile(mcpScreenshotFunction, description = '') {
    return takeOrganizedScreenshot(mcpScreenshotFunction, 'after', `mobile${description ? '-' + description : ''}`, { width: 375, height: 667 });
}

// Complete before/after cycle
async function completeBeforeAfterCycle(mcpScreenshotFunction, description = '') {
    console.log(`\n🔄 Starting screenshot cycle: ${description}`);
    
    // Before screenshots
    await takeBeforeDesktop(mcpScreenshotFunction, description);
    await takeBeforeMobile(mcpScreenshotFunction, description);
    
    console.log(`⏸️ Make your changes now, then call completeAfterCycle()`);
}

async function completeAfterCycle(mcpScreenshotFunction, description = '') {
    // After screenshots
    await takeAfterDesktop(mcpScreenshotFunction, description);
    await takeAfterMobile(mcpScreenshotFunction, description);
    
    // Move to next iteration
    nextIteration();
    
    console.log(`✅ Screenshot cycle complete: ${description}\n`);
}

// Get current status
function getStatus() {
    if (!isInitialized) {
        return { initialized: false, message: 'Call initScreenshots() first' };
    }
    
    const paths = getCurrentPaths();
    return {
        initialized: true,
        promptDir: paths.promptDir,
        iteration: paths.iteration,
        baseDir: paths.baseDir
    };
}

module.exports = {
    initScreenshots,
    takeOrganizedScreenshot,
    takeBeforeDesktop,
    takeBeforeMobile, 
    takeAfterDesktop,
    takeAfterMobile,
    completeBeforeAfterCycle,
    completeAfterCycle,
    getStatus,
    nextIteration
};

// SIMPLE USAGE EXAMPLE:
/*
const { initScreenshots, takeBeforeDesktop, takeAfterDesktop, nextIteration } = require('./screenshot-wrapper.js');

// 1. Initialize
initScreenshots('test-system');

// 2. Take before screenshot
await takeBeforeDesktop(mcp__playwright__playwright_screenshot, 'baseline');

// 3. Make changes...

// 4. Take after screenshot  
await takeAfterDesktop(mcp__playwright__playwright_screenshot, 'baseline');

// 5. Next iteration
nextIteration();
*/