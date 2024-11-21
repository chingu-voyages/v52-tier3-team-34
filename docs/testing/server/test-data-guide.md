# Server Test Data Guide

## Test Data Management
Our testing framework uses a centralized test data management system to ensure consistent and valid test data across all tests.

## Available Helpers

### User Data
```typescript
await getTestUser()         // Get a valid user for testing
```

### Data Validation
```typescript
await validateTestData()    // Verify minimum required test data exists
```

## Required Test Data

### For Venue Tests
- At least one user in the database
- User must exist before creating venues

### Planned Requirements
- Users API: TBD
- Events API: Will require venues and users

## Database Seeding
1. Run seed command:
   ```bash
   npm run seed
   ```
2. Verify data:
   ```bash
   npm test
   ```

## Best Practices
1. Always use test data helpers instead of hardcoding IDs
2. Run validation before tests that require specific data
3. Keep test data minimal and focused
