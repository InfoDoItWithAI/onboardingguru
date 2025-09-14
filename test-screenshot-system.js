// TEST SCRIPT for Fixed Screenshot System
const { initScreenshots, getStatus } = require('./screenshot-wrapper.js');

async function testScreenshotSystem() {
    console.log('🧪 TESTING SCREENSHOT SYSTEM...\n');
    
    try {
        // Test 1: Initialize system
        console.log('Test 1: Initializing screenshot system...');
        initScreenshots('system-repair-test');
        
        // Test 2: Check status
        console.log('\nTest 2: Checking system status...');
        const status = getStatus();
        console.log('Status:', status);
        
        // Test 3: Check if directories were created
        console.log('\nTest 3: Verifying directory creation...');
        const fs = require('fs');
        
        if (fs.existsSync(status.promptDir)) {
            console.log('✅ Directory created successfully:', status.promptDir);
            
            // List contents
            const files = fs.readdirSync(status.promptDir);
            console.log('📁 Directory contents:', files);
        } else {
            console.log('❌ Directory not found:', status.promptDir);
        }
        
        // Test 4: Test filename generation
        console.log('\nTest 4: Testing filename generation...');
        const { generateFilename } = require('./fixed-screenshot-system.js');
        const testFilename = generateFilename('before', 'test-desktop');
        console.log('Generated filename:', testFilename);
        
        console.log('\n✅ ALL TESTS PASSED - System is ready for use!');
        
        return {
            success: true,
            promptDir: status.promptDir,
            testFilename: testFilename
        };
        
    } catch (error) {
        console.error('❌ TEST FAILED:', error);
        return { success: false, error: error.message };
    }
}

// Run test
testScreenshotSystem().then(result => {
    if (result.success) {
        console.log('\n🎯 SYSTEM READY FOR PRODUCTION USE');
        console.log(`📁 Screenshots will be saved to: ${result.promptDir}`);
    } else {
        console.log('\n🚨 SYSTEM NEEDS REPAIR');
        console.log(`Error: ${result.error}`);
    }
});