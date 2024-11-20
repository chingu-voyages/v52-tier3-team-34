#!/bin/bash

# Set the base URL
BASE_URL="http://localhost:3000/api"

echo "Testing Venues API endpoints..."
echo "==============================="

# 1. List all venues
echo "\n1. GET /venues - List all venues"
curl -X GET "$BASE_URL/venues"

# 2. Get single venue (using ID 16 from seed data)
echo "\n\n2. GET /venues/:id - Get single venue"
curl -X GET "$BASE_URL/venues/16"

# 3. Create new venue
echo "\n\n3. POST /venues - Create new venue"
curl -X POST "$BASE_URL/venues" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Venue",
    "description": "A test venue",
    "address": "123 Test St",
    "contact": {
      "email": "test@venue.com",
      "phone": "+1-555-0123",
      "website": "https://test.venue.com"
    },
    "coordinates": {
      "lat": 40.7128,
      "lng": -74.0060
    },
    "images": ["https://example.com/test1.jpg"],
    "userId": 4
  }'

# Store the created venue ID for subsequent operations
VENUE_ID=$(curl -s -X POST "$BASE_URL/venues" -H "Content-Type: application/json" -d '{"name":"Temp Venue","description":"Temp","address":"Temp St","contact":{"email":"temp@venue.com","phone":"+1-555-0000","website":"https://temp.com"},"coordinates":{"lat":0,"lng":0},"images":[],"userId":4}' | grep -o '"id":[0-9]*' | grep -o '[0-9]*')

# 4. Update venue
echo "\n\n4. PATCH /venues/:id - Update venue"
curl -X PATCH "$BASE_URL/venues/$VENUE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "An updated test venue"
  }'

# 5. Replace venue
echo "\n\n5. PUT /venues/:id - Replace venue"
curl -X PUT "$BASE_URL/venues/$VENUE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Replaced Venue",
    "description": "A completely replaced venue",
    "address": "456 Replace St",
    "contact": {
      "email": "replaced@venue.com",
      "phone": "+1-555-9999",
      "website": "https://replaced.venue.com"
    },
    "coordinates": {
      "lat": 40.7128,
      "lng": -74.0060
    },
    "images": ["https://example.com/replaced1.jpg"],
    "userId": 4
  }'

# 6. Delete venue
echo "\n\n6. DELETE /venues/:id - Delete venue"
curl -X DELETE "$BASE_URL/venues/$VENUE_ID"

# 7. Verify deletion
echo "\n\n7. Verify deletion - Try to get deleted venue"
curl -X GET "$BASE_URL/venues/$VENUE_ID"

echo "\n\nAPI testing completed!"
