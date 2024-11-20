# Set the base URL
$BASE_URL = "http://localhost:3000/api"

Write-Host "Testing Venues API endpoints..."
Write-Host "==============================="

# 1. List all venues
Write-Host "`n1. GET /venues - List all venues"
Invoke-RestMethod -Method GET -Uri "$BASE_URL/venues"

# 2. Get single venue (using ID 16 from seed data)
Write-Host "`n2. GET /venues/:id - Get single venue"
Invoke-RestMethod -Method GET -Uri "$BASE_URL/venues/16"

# 3. Create new venue
Write-Host "`n3. POST /venues - Create new venue"
$newVenue = @{
    name = "Test Venue"
    description = "A test venue"
    address = "123 Test St"
    contact = @{
        email = "test@venue.com"
        phone = "+1-555-0123"
        website = "https://test.venue.com"
    }
    coordinates = @{
        lat = 40.7128
        lng = -74.0060
    }
    images = @("https://example.com/test1.jpg")
    userId = 4
}
$response = Invoke-RestMethod -Method POST -Uri "$BASE_URL/venues" -Body ($newVenue | ConvertTo-Json -Depth 10) -ContentType "application/json"
$VENUE_ID = $response.data.id

# 4. Update venue
Write-Host "`n4. PATCH /venues/:id - Update venue"
$updateVenue = @{
    description = "An updated test venue"
}
Invoke-RestMethod -Method PATCH -Uri "$BASE_URL/venues/$VENUE_ID" -Body ($updateVenue | ConvertTo-Json) -ContentType "application/json"

# 5. Replace venue
Write-Host "`n5. PUT /venues/:id - Replace venue"
$replaceVenue = @{
    name = "Replaced Venue"
    description = "A completely replaced venue"
    address = "456 Replace St"
    contact = @{
        email = "replaced@venue.com"
        phone = "+1-555-9999"
        website = "https://replaced.venue.com"
    }
    coordinates = @{
        lat = 40.7128
        lng = -74.0060
    }
    images = @("https://example.com/replaced1.jpg")
    userId = 4
}
Invoke-RestMethod -Method PUT -Uri "$BASE_URL/venues/$VENUE_ID" -Body ($replaceVenue | ConvertTo-Json -Depth 10) -ContentType "application/json"

# 6. Delete venue
Write-Host "`n6. DELETE /venues/:id - Delete venue"
Invoke-RestMethod -Method DELETE -Uri "$BASE_URL/venues/$VENUE_ID"

# 7. Verify deletion
Write-Host "`n7. Verify deletion - Try to get deleted venue"
try {
    Invoke-RestMethod -Method GET -Uri "$BASE_URL/venues/$VENUE_ID"
} catch {
    Write-Host "Venue not found (Expected error)"
    Write-Host $_.Exception.Response.StatusCode
}

Write-Host "`nAPI testing completed!"
