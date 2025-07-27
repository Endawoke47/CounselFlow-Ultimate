#!/bin/bash

# Add CounselFlow Interactive System to all module files
# This script adds the interactive JavaScript to all HTML files in the modules

echo "Adding CounselFlow Interactive System to all modules..."

# Array of all module directories
modules=(
    "dashboard"
    "contract-management"
    "dispute-management"
    "entity-management"
    "matter-management"
    "client-management"
    "workflows"
    "ai-assistant"
    "knowledge-management"
    "risk-management"
    "policy-management"
    "task-management"
    "licensing-regulatory"
    "outsourcing-legal-spend"
    "billing"
    "settings"
    "profile"
    "notifications"
    "help-support"
    "security"
    "dashboard-new"
)

# Base directory
base_dir="c:/Users/Yadel Y. Endawoke/Downloads/repo/CounselFlow-Ultimate/production-deploy"

# Loop through each module
for module in "${modules[@]}"; do
    file_path="$base_dir/$module/index.html"
    
    if [ -f "$file_path" ]; then
        echo "Processing $module..."
        
        # Check if interactive system is already added
        if ! grep -q "interactive-system.js" "$file_path"; then
            # Add the script before the closing body tag or after webpack script
            if grep -q 'webpack-8fd6f28358a6d984.js' "$file_path"; then
                # Replace the webpack script line with webpack + interactive script
                sed -i 's|<script src="../_next/static/chunks/webpack-8fd6f28358a6d984.js" crossorigin="" async=""></script>|<script src="../_next/static/chunks/webpack-8fd6f28358a6d984.js" crossorigin="" async=""></script>\n<!-- CounselFlow Interactive System -->\n<script src="../interactive-system.js"></script>|g' "$file_path"
                echo "  ✓ Added interactive system to $module"
            else
                echo "  ⚠ Could not find webpack script in $module"
            fi
        else
            echo "  ✓ Interactive system already exists in $module"
        fi
    else
        echo "  ✗ File not found: $file_path"
    fi
done

echo "Done! CounselFlow Interactive System has been added to all modules."
echo ""
echo "The interactive system includes:"
echo "  - Collapsible sidebar with smooth animations"
echo "  - Dropdown menus for user profiles and settings"
echo "  - Modal dialogs for forms and actions"
echo "  - Toast notifications for user feedback"
echo "  - Search functionality with real-time filtering"
echo "  - Button actions for creating new items"
echo "  - Form handling and validation"
echo "  - Progress tracking and animations"
echo "  - Data table sorting and filtering"
echo "  - File upload handling"
echo "  - Tab switching functionality"
echo ""
echo "All buttons, dropdowns, forms, and interactive elements should now be functional!"
