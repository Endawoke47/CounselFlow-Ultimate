# Fix GitHub Pages paths script for Windows PowerShell

Write-Host "Fixing paths for GitHub Pages deployment..." -ForegroundColor Green

# Fix main index.html
(Get-Content "index.html") | ForEach-Object {
    $_ -replace 'href="/_next/', 'href="./_next/' -replace 'src="/_next/', 'src="./_next/'
} | Set-Content "index.html"

# Fix dashboard index.html  
(Get-Content "dashboard/index.html") | ForEach-Object {
    $_ -replace 'href="/_next/', 'href="../_next/' -replace 'src="/_next/', 'src="../_next/'
} | Set-Content "dashboard/index.html"

# Fix all other HTML files in subdirectories
Get-ChildItem -Recurse -Filter "*.html" | Where-Object { 
    $_.FullName -notlike "*\_next\*" -and $_.Name -ne "404.html" 
} | ForEach-Object {
    $relativePath = $_.FullName.Replace((Get-Location).Path, "").TrimStart("\")
    $depth = ($relativePath -split "\\").Length - 1
    
    if ($depth -eq 0) {
        # Root level files
        (Get-Content $_.FullName) | ForEach-Object {
            $_ -replace 'href="/_next/', 'href="./_next/' -replace 'src="/_next/', 'src="./_next/'
        } | Set-Content $_.FullName
    } else {
        # Subdirectory files - need to go up one level
        (Get-Content $_.FullName) | ForEach-Object {
            $_ -replace 'href="/_next/', 'href="../_next/' -replace 'src="/_next/', 'src="../_next/'
        } | Set-Content $_.FullName
    }
    
    Write-Host "Fixed: $($_.Name)" -ForegroundColor Yellow
}

Write-Host "GitHub Pages path fixing complete!" -ForegroundColor Green
