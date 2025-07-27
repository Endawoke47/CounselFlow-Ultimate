const fs = require('fs');
const path = require('path');

// List of all module directories that need navigation fixes
const moduleDirectories = [
  'dashboard',
  'workflows', 
  'matter-management',
  'contract-management',
  'dispute-management',
  'entity-management',
  'knowledge-management',
  'risk-management',
  'policy-management',
  'task-management',
  'licensing-regulatory',
  'outsourcing-legal-spend',
  'client-management',
  'ai-assistant',
  'help-support',
  'settings',
  'billing',
  'notifications',
  'profile',
  'security',
  'african-legal-system'
];

// Navigation fix script template
const navigationFixScript = `
<script>
// Fix navigation links for static deployment
document.addEventListener('DOMContentLoaded', function() {
  console.log('Navigation fix script loaded');
  
  // Map of absolute paths to relative paths for GitHub Pages
  const pathMappings = {
    '/dashboard/': '../dashboard/',
    '/workflows/': '../workflows/',
    '/matter-management/': '../matter-management/',
    '/contract-management/': '../contract-management/',
    '/dispute-management/': '../dispute-management/',
    '/entity-management/': '../entity-management/',
    '/knowledge-management/': '../knowledge-management/',
    '/risk-management/': '../risk-management/',
    '/policy-management/': '../policy-management/',
    '/task-management/': '../task-management/',
    '/licensing-regulatory/': '../licensing-regulatory/',
    '/outsourcing-legal-spend/': '../outsourcing-legal-spend/',
    '/client-management/': '../client-management/',
    '/ai-assistant/': '../ai-assistant/',
    '/help-support/': '../help-support/',
    '/settings/': '../settings/',
    '/billing/': '../billing/',
    '/notifications/': '../notifications/',
    '/profile/': '../profile/',
    '/security/': '../security/',
    '/african-legal-system/': '../african-legal-system/'
  };

  // Fix all navigation links
  const links = document.querySelectorAll('a[href]');
  console.log(\`Found \${links.length} links to fix\`);
  
  let linksFixed = 0;
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (pathMappings[href]) {
      link.setAttribute('href', pathMappings[href]);
      console.log(\`Fixed link: \${href} -> \${pathMappings[href]}\`);
      linksFixed++;
    }
  });
  
  console.log(\`Fixed \${linksFixed} navigation links\`);
  
  // Additional fix: Update any dynamically created links
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) { // Element node
            const newLinks = node.querySelectorAll ? node.querySelectorAll('a[href]') : [];
            newLinks.forEach(link => {
              const href = link.getAttribute('href');
              if (pathMappings[href]) {
                link.setAttribute('href', pathMappings[href]);
                console.log(\`Dynamically fixed link: \${href} -> \${pathMappings[href]}\`);
              }
            });
          }
        });
      }
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
});
</script>`;

// Function to fix navigation in HTML files
function fixNavigationInFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove any existing navigation fix scripts to avoid duplicates
    content = content.replace(/<script>[\s\S]*?Fix navigation links for static deployment[\s\S]*?<\/script>/g, '');
    content = content.replace(/<script>[\s\S]*?pathMappings[\s\S]*?<\/script>/g, '');
    
    // Add the navigation fix script before the closing body tag
    if (content.includes('</body>')) {
      content = content.replace('</body>', navigationFixScript + '\n</body>');
    } else {
      // If no closing body tag, add at the end
      content += navigationFixScript;
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed navigation in: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Function to directly fix href attributes in HTML content
function fixHrefAttributesInFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Path mappings for direct replacement
    const pathMappings = {
      'href="/dashboard/"': 'href="../dashboard/"',
      'href="/workflows/"': 'href="../workflows/"',
      'href="/matter-management/"': 'href="../matter-management/"',
      'href="/contract-management/"': 'href="../contract-management/"',
      'href="/dispute-management/"': 'href="../dispute-management/"',
      'href="/entity-management/"': 'href="../entity-management/"',
      'href="/knowledge-management/"': 'href="../knowledge-management/"',
      'href="/risk-management/"': 'href="../risk-management/"',
      'href="/policy-management/"': 'href="../policy-management/"',
      'href="/task-management/"': 'href="../task-management/"',
      'href="/licensing-regulatory/"': 'href="../licensing-regulatory/"',
      'href="/outsourcing-legal-spend/"': 'href="../outsourcing-legal-spend/"',
      'href="/client-management/"': 'href="../client-management/"',
      'href="/ai-assistant/"': 'href="../ai-assistant/"',
      'href="/help-support/"': 'href="../help-support/"',
      'href="/settings/"': 'href="../settings/"',
      'href="/billing/"': 'href="../billing/"',
      'href="/notifications/"': 'href="../notifications/"',
      'href="/profile/"': 'href="../profile/"',
      'href="/security/"': 'href="../security/"',
      'href="/african-legal-system/"': 'href="../african-legal-system/"'
    };

    // Replace all absolute paths with relative paths
    for (const [absolute, relative] of Object.entries(pathMappings)) {
      if (content.includes(absolute)) {
        content = content.replaceAll(absolute, relative);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed href attributes in: ${filePath}`);
      return true;
    } else {
      console.log(`ℹ️  No href attributes to fix in: ${filePath}`);
      return true;
    }
  } catch (error) {
    console.error(`❌ Error fixing href attributes in ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
console.log('🔧 Starting comprehensive navigation fix...\n');

let totalFiles = 0;
let fixedFiles = 0;

moduleDirectories.forEach(moduleDir => {
  const indexPath = path.join(__dirname, moduleDir, 'index.html');
  
  console.log(`\n📁 Processing module: ${moduleDir}`);
  totalFiles++;
  
  // First, fix href attributes directly in HTML
  const hrefFixed = fixHrefAttributesInFile(indexPath);
  
  // Then, add JavaScript navigation fix
  const scriptFixed = fixNavigationInFile(indexPath);
  
  if (hrefFixed && scriptFixed) {
    fixedFiles++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`Total modules processed: ${totalFiles}`);
console.log(`Successfully fixed: ${fixedFiles}`);
console.log(`Failed: ${totalFiles - fixedFiles}`);

if (fixedFiles === totalFiles) {
  console.log('\n🎉 All navigation issues have been fixed!');
  console.log('\n📝 Changes made:');
  console.log('1. ✅ Fixed all href attributes from absolute to relative paths');
  console.log('2. ✅ Added JavaScript navigation fix script to all pages');
  console.log('3. ✅ Added mutation observer for dynamic content');
  console.log('4. ✅ Added console logging for debugging');
  
  console.log('\n🚀 You can now test the navigation in your deployed application.');
  console.log('Open the browser developer tools (F12) to see the navigation fix logs.');
} else {
  console.log('\n⚠️  Some files could not be fixed. Please check the errors above.');
}
