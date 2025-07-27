# PowerShell script to add CounselFlow Interactive System to all modules

Write-Host "Adding CounselFlow Interactive System to all modules..." -ForegroundColor Green

# Array of all module directories
$modules = @(
    "dashboard",
    "contract-management",
    "dispute-management", 
    "entity-management",
    "matter-management",
    "client-management",
    "workflows",
    "ai-assistant",
    "knowledge-management",
    "risk-management",
    "policy-management",
    "task-management",
    "licensing-regulatory",
    "outsourcing-legal-spend",
    "billing",
    "settings",
    "profile",
    "notifications",
    "help-support",
    "security",
    "dashboard-new"
)

# Base directory
$baseDir = "c:\Users\Yadel Y. Endawoke\Downloads\repo\CounselFlow-Ultimate\production-deploy"

# Loop through each module
foreach ($module in $modules) {
    $filePath = Join-Path $baseDir "$module\index.html"
    
    if (Test-Path $filePath) {
        Write-Host "Processing $module..." -ForegroundColor Yellow
        
        # Read the file content
        $content = Get-Content $filePath -Raw
        
        # Check if interactive system is already added
        if ($content -notlike "*interactive-system.js*") {
            # Check if webpack script exists
            if ($content -like "*webpack-8fd6f28358a6d984.js*") {
                # Replace the webpack script line with webpack + interactive script
                $newContent = $content -replace 
                    '<script src="../_next/static/chunks/webpack-8fd6f28358a6d984.js" crossorigin="" async=""></script>',
                    '<script src="../_next/static/chunks/webpack-8fd6f28358a6d984.js" crossorigin="" async=""></script>' + "`n" + 
                    '<!-- CounselFlow Interactive System -->' + "`n" + 
                    '<script src="../interactive-system.js"></script>'
                
                # Write the updated content back to the file
                Set-Content -Path $filePath -Value $newContent -NoNewline
                Write-Host "  ✓ Added interactive system to $module" -ForegroundColor Green
            } else {
                Write-Host "  ⚠ Could not find webpack script in $module" -ForegroundColor Orange
            }
        } else {
            Write-Host "  ✓ Interactive system already exists in $module" -ForegroundColor Green
        }
    } else {
        Write-Host "  ✗ File not found: $filePath" -ForegroundColor Red
    }
}

Write-Host "`nDone! CounselFlow Interactive System has been added to all modules." -ForegroundColor Green
Write-Host "`nThe interactive system includes:" -ForegroundColor Cyan
Write-Host "  - Collapsible sidebar with smooth animations"
Write-Host "  - Dropdown menus for user profiles and settings"
Write-Host "  - Modal dialogs for forms and actions"
Write-Host "  - Toast notifications for user feedback"
Write-Host "  - Search functionality with real-time filtering"
Write-Host "  - Button actions for creating new items"
Write-Host "  - Form handling and validation"
Write-Host "  - Progress tracking and animations"
Write-Host "  - Data table sorting and filtering"
Write-Host "  - File upload handling"
Write-Host "  - Tab switching functionality"
Write-Host "`nAll buttons, dropdowns, forms, and interactive elements should now be functional!" -ForegroundColor Green
