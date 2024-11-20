# Add User-Venue Relationship

Relates to #42

## Description
Adding a one-to-one relationship between Venue and User models, where each venue must have one owner/manager user.

## Implementation Checklist
- [x] Schema Changes
  - [x] Add User relation to Venue model in schema.prisma
  - [x] Generate and review migration
  
- [x] Seed Data Update
  - [x] Modify seed data to include user references for venues
  - [x] Ensure referential integrity in seed data

- [x] Type System Updates
  - [x] Update VenueSchema to include userId
  - [x] Update VenueResponse type to include user information
  
- [x] Service Layer Updates
  - [x] Modify VenueService methods to handle user relation
  - [x] Update create, update, and findById methods

- [x] Controller Layer Updates
  - [x] Update VenueController to handle user data in responses
  - [x] Modify response transformations

- [x] Testing & Validation
  - [x] Test all CRUD operations
  - [x] Verify error handling
  - [x] Test seed data operation

- [x] Documentation Updates
  - [x] Update API documentation
  - [x] Update migration guide/notes
  - [x] Document seed data changes

## API Changes
```typescript
// New Venue Creation Payload
{
  "name": "string",
  "description": "string",
  "address": "string",
  "userId": "number",  // New required field
  "contact": {
    "phone": "string?",
    "email": "string?",
    "website": "string?"
  },
  "coordinates": {
    "lat": "number",
    "lng": "number"
  }
}
```

## Breaking Changes
- Venue creation/updates will now require a `userId`
- Existing development database will need to be reset
- New seed data structure

## Testing Implementation
### Test Infrastructure
- Jest + TypeScript configuration
- API tests in `/tests/api/venues.test.ts`
- Test setup in `/tests/setup.ts`
- Centralized test config in `/tests/config.ts`

### Test Coverage
1. GET /venues
   - Returns list of venues
   - Includes user relationship data

2. POST /venues
   - Creates venue with user relationship
   - Validates required user ID

3. GET /venues/:id
   - Returns single venue with user data
   - Handles 404 for non-existent venues

4. PATCH /venues/:id
   - Updates venue properties
   - Maintains user relationship

5. PUT /venues/:id
   - Replaces entire venue
   - Validates user relationship

6. DELETE /venues/:id
   - Removes venue
   - Verifies deletion with 404 check

### Running Tests
```bash
# Run all API tests
npm run test:api

# Run venue-specific tests
npm run test:api venues.test.ts

# Run with coverage
npm run test:api -- --coverage
```

## Notes
- This is a backend-only change
- One user can own multiple venues
- Development database will be reset with new seed data
- All tests are passing with proper error handling
- Test coverage meets minimum threshold of 80%
