// MANUAL SCREENSHOT ORGANIZER - Move specific file from Downloads
const fs = require('fs');
const path = require('path');

// Configuration
const downloadsDir = 'C:\\Users\\Sven\\Downloads';
const targetDir = 'D:\\programmierung\\onboardingguru\\onboardingguru\\screenshots\\2025-09\\session-11-optimization\\prompt-system-repair-test';

function moveLatestScreenshot(partialName, targetFilename) {
    try {
        console.log(`🔍 Looking for screenshot containing: ${partialName}`);
        
        // Get all PNG files in Downloads that match the pattern
        const files = fs.readdirSync(downloadsDir)
            .filter(file => file.includes(partialName) && file.endsWith('.png'))
            .map(file => ({
                name: file,
                path: path.join(downloadsDir, file),
                stats: fs.statSync(path.join(downloadsDir, file))
            }))
            .sort((a, b) => b.stats.mtime - a.stats.mtime); // Sort by newest first
        
        if (files.length === 0) {
            console.log(`❌ No screenshot found containing: ${partialName}`);
            return false;
        }
        
        const sourceFile = files[0];
        const targetPath = path.join(targetDir, targetFilename);
        
        console.log(`📸 Found: ${sourceFile.name}`);
        console.log(`📁 Moving to: ${targetPath}`);
        
        // Copy file
        fs.copyFileSync(sourceFile.path, targetPath);
        
        // Delete original
        fs.unlinkSync(sourceFile.path);
        
        console.log(`✅ Successfully organized: ${targetFilename}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Error organizing screenshot:`, error.message);
        return false;
    }
}

// Move the test screenshot
const success = moveLatestScreenshot('test-system-repair-1', 'iteration-1-before-desktop.png');

if (success) {
    // List files in organized directory
    console.log(`\n📁 Contents of organized directory:`);
    const organizedFiles = fs.readdirSync(targetDir);
    organizedFiles.forEach(file => console.log(`  - ${file}`));
    
    console.log(`\n🎯 SCREENSHOT ORGANIZATION TEST: ✅ SUCCESS`);
    console.log(`Screenshot successfully moved from Downloads to organized structure!`);
} else {
    console.log(`\n🚨 SCREENSHOT ORGANIZATION TEST: ❌ FAILED`);
}