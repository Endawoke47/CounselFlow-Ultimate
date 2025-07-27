#!/bin/bash
# Fix GitHub Pages paths script

echo "Fixing paths for GitHub Pages deployment..."

# Fix main index.html
sed -i 's|href="/_next/|href="./_next/|g' index.html
sed -i 's|src="/_next/|src="./_next/|g' index.html

# Fix dashboard index.html  
sed -i 's|href="/_next/|href="../_next/|g' dashboard/index.html
sed -i 's|src="/_next/|src="../_next/|g' dashboard/index.html

# Fix all other HTML files in subdirectories
find . -name "*.html" -not -path "./_next/*" -not -name "404.html" | while read file; do
    # Count directory depth
    depth=$(echo "$file" | tr -cd '/' | wc -c)
    
    if [ $depth -eq 1 ]; then
        # Root level files
        sed -i 's|href="/_next/|href="./_next/|g' "$file"
        sed -i 's|src="/_next/|src="./_next/|g' "$file"
    else
        # Subdirectory files - need to go up one level
        sed -i 's|href="/_next/|href="../_next/|g' "$file"
        sed -i 's|src="/_next/|src="../_next/|g' "$file"
    fi
done

echo "GitHub Pages path fixing complete!"
