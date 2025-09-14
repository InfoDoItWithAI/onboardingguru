// FIXED SCREENSHOT SYSTEM - Works with Playwright MCP Tool
const fs = require('fs');
const path = require('path');

class ScreenshotManager {
    constructor() {
        this.currentPromptDir = '';
        this.iterationCounter = 1;
        this.baseDir = '';
        this.downloadsDir = 'C:\\Users\\Sven\\Downloads'; // Windows Downloads path
    }

    // Create and setup directory structure
    startNewPrompt(promptName) {
        const currentMonth = new Date().toISOString().slice(0, 7); // "2025-09"
        const sessionDate = new Date().toISOString().slice(8, 10); // "11"
        
        // Use absolute Windows path
        this.baseDir = path.join('D:', 'programmierung', 'onboardingguru', 'onboardingguru', 'screenshots', currentMonth, `session-${sessionDate}-optimization`);
        this.currentPromptDir = path.join(this.baseDir, `prompt-${promptName}`);
        
        // Create directories with error handling
        try {
            if (!fs.existsSync(this.currentPromptDir)) {
                fs.mkdirSync(this.currentPromptDir, { recursive: true });
                console.log(`📁 Created screenshot directory: ${this.currentPromptDir}`);
            }
        } catch (error) {
            console.error('❌ Error creating directories:', error);
            // Fallback to current directory
            this.currentPromptDir = path.join(process.cwd(), 'temp-screenshots');
            fs.mkdirSync(this.currentPromptDir, { recursive: true });
        }
        
        this.iterationCounter = 1;
        console.log(`🚀 Started prompt: ${promptName}`);
        console.log(`📸 Screenshots will be organized in: ${this.currentPromptDir}`);
        
        return this.currentPromptDir;
    }

    // Move screenshot from Downloads to organized folder
    async moveScreenshotFromDownloads(screenshotName, targetFilename) {
        const maxAttempts = 10;
        const delay = 500; // 500ms delay between attempts
        
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                // Look for the most recent file in Downloads matching the pattern
                const files = fs.readdirSync(this.downloadsDir)
                    .filter(file => file.includes(screenshotName) && file.endsWith('.png'))
                    .map(file => ({
                        name: file,
                        path: path.join(this.downloadsDir, file),
                        stats: fs.statSync(path.join(this.downloadsDir, file))
                    }))
                    .sort((a, b) => b.stats.mtime - a.stats.mtime); // Sort by modification time, newest first

                if (files.length > 0) {
                    const sourceFile = files[0].path;
                    const targetFile = path.join(this.currentPromptDir, targetFilename);
                    
                    // Copy file to organized location
                    fs.copyFileSync(sourceFile, targetFile);
                    
                    // Delete from Downloads
                    fs.unlinkSync(sourceFile);
                    
                    console.log(`📸 Screenshot organized: ${targetFilename}`);
                    return targetFile;
                }
                
                // Wait before next attempt
                if (attempt < maxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            } catch (error) {
                console.log(`⚠️ Attempt ${attempt}/${maxAttempts} failed:`, error.message);
                if (attempt < maxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
        
        console.error(`❌ Failed to find and move screenshot after ${maxAttempts} attempts`);
        return null;
    }

    // Generate organized filename
    generateFilename(type, description = '') {
        const desc = description ? `-${description}` : '';
        return `iteration-${this.iterationCounter}-${type}${desc}.png`;
    }

    // Get current paths for direct file operations
    getCurrentPaths() {
        return {
            promptDir: this.currentPromptDir,
            iteration: this.iterationCounter,
            baseDir: this.baseDir
        };
    }

    // Increment counter
    nextIteration() {
        this.iterationCounter++;
    }
}

// Create global instance
const screenshotManager = new ScreenshotManager();

// Export functions that work with Playwright MCP
module.exports = {
    // Initialize system
    startNewPrompt: (promptName) => screenshotManager.startNewPrompt(promptName),
    
    // Get paths for manual file operations
    getCurrentPaths: () => screenshotManager.getCurrentPaths(),
    
    // Generate proper filename
    generateFilename: (type, description) => screenshotManager.generateFilename(type, description),
    
    // Move screenshot from Downloads after MCP screenshot
    moveScreenshotFromDownloads: (screenshotName, targetFilename) => 
        screenshotManager.moveScreenshotFromDownloads(screenshotName, targetFilename),
    
    // Increment iteration counter
    nextIteration: () => screenshotManager.nextIteration(),
    
    // Direct access to manager
    manager: screenshotManager
};

// USAGE WITH PLAYWRIGHT MCP:
/*
const { startNewPrompt, generateFilename, moveScreenshotFromDownloads, nextIteration } = require('./fixed-screenshot-system.js');

// 1. Start new prompt
startNewPrompt('screenshot-system-test');

// 2. Take screenshot with MCP tool
await mcp__playwright__playwright_screenshot({
    name: 'temp-screenshot-before',
    fullPage: true,
    savePng: true,
    width: 1920,
    height: 1080
});

// 3. Move to organized location
const targetFilename = generateFilename('before', 'desktop');
await moveScreenshotFromDownloads('temp-screenshot-before', targetFilename);

// 4. Continue with next iteration
nextIteration();
*/