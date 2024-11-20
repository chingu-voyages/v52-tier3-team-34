# Run API Tests
Write-Host "Running API Tests..."
Write-Host "=================="

# Ensure server is running
$serverRunning = $false
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/health" -Method GET
    if ($response.StatusCode -eq 200) {
        $serverRunning = $true
    }
} catch {
    Write-Host "Server is not running. Starting server..."
}

if (-not $serverRunning) {
    # Start the server in a new window
    Start-Process powershell -ArgumentList "-Command `"cd $PSScriptRoot\..\..; npm run dev`""
    Write-Host "Waiting for server to start..."
    Start-Sleep -Seconds 5
}

# Run the tests
Write-Host "Running tests..."
npm test -- tests/api/venues.test.ts

if (-not $serverRunning) {
    Write-Host "Tests completed. Stopping server..."
    # Find and stop the Node.js process
    Get-Process node -ErrorAction SilentlyContinue | Where-Object {$_.MainWindowTitle -eq ""} | Stop-Process
}
