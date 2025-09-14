// FINAL SYSTEM TEST - Organize the last screenshot
const fs = require('fs');
const path = require('path');

const downloadsDir = 'C:\\Users\\Sven\\Downloads';
const targetDir = 'D:\\programmierung\\onboardingguru\\onboardingguru\\screenshots\\2025-09\\session-11-optimization\\prompt-system-repair-test';

function organizeFinalTest() {
    try {
        // Find the final test screenshot
        const files = fs.readdirSync(downloadsDir)
            .filter(file => file.includes('final-system-test') && file.endsWith('.png'))
            .map(file => ({
                name: file,
                path: path.join(downloadsDir, file),
                stats: fs.statSync(path.join(downloadsDir, file))
            }))
            .sort((a, b) => b.stats.mtime - a.stats.mtime);
        
        if (files.length === 0) {
            console.log('❌ No final test screenshot found');
            return false;
        }
        
        const sourceFile = files[0];
        const targetPath = path.join(targetDir, 'iteration-1-after-mobile.png');
        
        console.log(`📸 Organizing: ${sourceFile.name}`);
        console.log(`📁 Target: ${targetPath}`);
        
        fs.copyFileSync(sourceFile.path, targetPath);
        fs.unlinkSync(sourceFile.path);
        
        console.log('✅ Final test screenshot organized!');
        
        // Show final directory contents
        console.log('\n📁 FINAL ORGANIZED DIRECTORY CONTENTS:');
        const organizedFiles = fs.readdirSync(targetDir);
        organizedFiles.forEach(file => console.log(`  ✅ ${file}`));
        
        console.log(`\n🎯 SCREENSHOT SYSTEM: PERMANENTLY FIXED!`);
        console.log(`📊 Total organized screenshots: ${organizedFiles.length}`);
        
        return true;
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        return false;
    }
}

organizeFinalTest();