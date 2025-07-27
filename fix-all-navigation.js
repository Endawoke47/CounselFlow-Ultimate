const fs = require('fs');
const path = require('path');

// Navigation link mappings for static deployment
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

// JavaScript code to fix navigation links
const navigationFixScript = `
<script>
// Fix navigation links for static deployment
document.addEventListener('DOMContentLoaded', function() {
  // Map of absolute paths to relative paths for GitHub Pages
  const pathMappings = ${JSON.stringify(pathMappings, null, 4)};

  // Fix all navigation links
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (pathMappings[href]) {
      link.setAttribute('href', pathMappings[href]);
      console.log('Fixed navigation link:', href, '->', pathMappings[href]);
    }
  });

  // Add click handlers for better user experience
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('../') && href.endsWith('/')) {
      link.addEventListener('click', function(e) {
        // Check if the target page exists
        const moduleName = href.replace('../', '').replace('/', '');
        if (moduleName) {
          // Show loading state (optional enhancement)
          console.log('Navigating to:', href);
        }
      });
    }
  });
});
</script>`;

// List of directories that contain index.html files to fix
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

function fixNavigationInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the navigation fix script is already present
    if (content.includes('Fix navigation links for static deployment')) {
      console.log(`Navigation fix already present in: ${filePath}`);
      return;
    }
    
    // Find the last script tag before </body>
    const lastScriptMatch = content.match(/<script>self\.__next_f\.push\(\[1,""\]\)<\/script>/);
    if (lastScriptMatch) {
      const updatedContent = content.replace(
        /<script>self\.__next_f\.push\(\[1,""\]\)<\/script><\/body><\/html>/,
        `<script>self.__next_f.push([1,""])</script>${navigationFixScript}</body></html>`
      );
      
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`Fixed navigation in: ${filePath}`);
    } else {
      console.log(`Could not find insertion point in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Process all module directories
moduleDirectories.forEach(dir => {
  const indexPath = path.join(__dirname, dir, 'index.html');
  if (fs.existsSync(indexPath)) {
    fixNavigationInFile(indexPath);
  } else {
    console.log(`File not found: ${indexPath}`);
  }
});

console.log('Navigation fix script completed!');
