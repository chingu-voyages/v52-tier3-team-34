# Test Data Management Guide

## Overview
This guide describes how to create and manage test data in the Live Music Finder API test suite.

## Test Data Factory

The `TestDataFactory` class (`/server/tests/utils/testDataFactory.ts`) provides methods for creating test data with consistent patterns and unique identifiers.

### Features
- Automatic ID generation
- Consistent data patterns
- Type-safe data creation
- Optional property overrides
- Bulk data creation

## Usage Examples

### Creating Users

```typescript
// Create a single user with defaults
const user = TestDataFactory.createUser();

// Create a user with specific properties
const customUser = TestDataFactory.createUser({
    name: 'John Doe',
    email: 'john@example.com'
});

// Create multiple users
const users = TestDataFactory.createUsers(3);
```

### Creating Venues

```typescript
// Create a single venue
const venue = TestDataFactory.createVenue();

// Create a venue with custom location
const customVenue = TestDataFactory.createVenue({
    location: {
        type: 'Point',
        coordinates: [-74.006, 40.7128] // NYC coordinates
    }
});

// Create multiple venues
const venues = TestDataFactory.createVenues(3);
```

### Creating Events

```typescript
// First create a venue for the event
const venue = TestDataFactory.createVenue();

// Create a single event at the venue
const event = TestDataFactory.createEvent(venue);

// Create an event with specific dates
const customEvent = TestDataFactory.createEvent(venue, {
    startDate: '2024-01-01T19:00:00Z',
    endDate: '2024-01-01T23:00:00Z'
});

// Create multiple events at the venue
const events = TestDataFactory.createEvents(venue, 3);
```

## Best Practices

### 1. Reset Counter Between Tests
```typescript
beforeEach(() => {
    TestDataFactory.resetCounter();
});
```

### 2. Use Type-Safe Overrides
```typescript
// Good: TypeScript will catch invalid properties
const user = TestDataFactory.createUser({
    name: 'John',
    email: 'john@example.com'
});

// Bad: TypeScript will error on invalid properties
const user = TestDataFactory.createUser({
    invalidProp: 'value' // Type error
});
```

### 3. Maintain Relationships
```typescript
// Create related data in order
const venue = TestDataFactory.createVenue();
const event = TestDataFactory.createEvent(venue); // Uses venue.id
```

### 4. Use Meaningful Test Data
```typescript
// Good: Clear what the test is about
const venue = TestDataFactory.createVenue({
    name: 'Large Concert Hall',
    capacity: 5000
});

// Bad: Generic data doesn't convey test purpose
const venue = TestDataFactory.createVenue();
```

## Data Patterns

### User Data
- IDs: Incremental integers
- Emails: `test.userN@example.com`
- Names: `Test User N`

### Venue Data
- IDs: Incremental integers
- Names: `Test Venue N`
- Locations: Random variations around NYC coordinates
- Capacities: Random between 100-1000

### Event Data
- IDs: Incremental integers
- Names: `Test Event N`
- Dates: Random future dates within 30 days
- Duration: 3 hours by default
- Capacity: Random, but never exceeds venue capacity

## Test Data Cleanup
- Use `beforeEach` to reset counter
- Clean up test database between test runs
- Avoid test data leaks between tests
