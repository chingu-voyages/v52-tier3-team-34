# Add User-Venue Relationship

Relates to #42

## Description
Adding a one-to-one relationship between Venue and User models, where each venue must have one owner/manager user.

## Implementation Checklist
- [ ] Schema Changes
  - [ ] Add User relation to Venue model in schema.prisma
  - [ ] Generate and review migration
  
- [ ] Seed Data Update
  - [ ] Modify seed data to include user references for venues
  - [ ] Ensure referential integrity in seed data

- [ ] Type System Updates
  - [ ] Update VenueSchema to include userId
  - [ ] Update VenueResponse type to include user information
  
- [ ] Service Layer Updates
  - [ ] Modify VenueService methods to handle user relation
  - [ ] Update create, update, and findById methods

- [ ] Controller Layer Updates
  - [ ] Update VenueController to handle user data in responses
  - [ ] Modify response transformations

- [ ] Testing & Validation
  - [ ] Test all CRUD operations
  - [ ] Verify error handling
  - [ ] Test seed data operation

- [ ] Documentation Updates
  - [ ] Update API documentation
  - [ ] Update migration guide/notes
  - [ ] Document seed data changes

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

## Testing Instructions
1. Reset development database:
   ```bash
   npx prisma migrate reset
   ```
2. Test venue creation with user reference
3. Verify user data is included in venue responses

## Notes
- This is a backend-only change
- One user can own multiple venues
- Development database will be reset with new seed data
