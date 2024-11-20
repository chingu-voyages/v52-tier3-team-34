# Testing Infrastructure Documentation

## Overview
This document outlines the testing infrastructure for the Live Music Finder backend. Our testing strategy includes API tests, integration tests, and unit tests, with a focus on maintaining high code quality and test coverage.

## Test Structure
```
/server/tests/
├── api/                    # API endpoint tests
│   └── venues.test.ts      # Venue endpoint tests
├── integration/            # Integration tests
├── unit/                   # Unit tests
├── scripts/               # Test utility scripts
├── config.ts              # Test configuration
├── setup.ts              # Test setup and teardown
└── types.d.ts            # TypeScript declarations
```

## Technology Stack
- **Test Framework**: Jest
- **TypeScript Support**: ts-jest
- **HTTP Client**: Axios
- **Coverage Tool**: Jest's built-in coverage reporter

## Configuration Files

### Jest Configuration (jest.config.ts)
```typescript
{
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: '.',
    roots: ['<rootDir>/tests'],
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    testTimeout: 10000,
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,ts}',
        '!src/**/*.d.ts',
        '!src/**/*.test.{js,ts}'
    ],
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
}
```

### TypeScript Configuration (tsconfig.json)
```json
{
    "compilerOptions": {
        "types": ["node", "jest"],
        "typeRoots": ["./node_modules/@types", "./tests"]
    },
    "include": ["src/**/*", "prisma/**/*", "tests/**/*"]
}
```

## Running Tests

### Available Commands
```bash
# Run all tests
npm test

# Run API tests only
npm run test:api

# Run specific test file
npm run test:api venues.test.ts

# Run tests with coverage
npm run test -- --coverage

# Watch mode for development
npm run test -- --watch
```

### Environment Setup
1. Ensure the development server is running
2. Database should be migrated and seeded
3. Required environment variables should be set

## Writing Tests

### API Test Example
```typescript
describe('Venues API', () => {
    describe('GET /venues', () => {
        it('should return a list of venues', async () => {
            const response = await axios.get('/api/venues');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.data)).toBe(true);
        });
    });
});
```

### Best Practices
1. **Test Organization**
   - Group related tests using `describe` blocks
   - Use clear, descriptive test names
   - Follow the AAA pattern (Arrange, Act, Assert)

2. **Test Isolation**
   - Each test should be independent
   - Clean up test data after tests
   - Use beforeEach/afterEach hooks when needed

3. **Error Handling**
   - Test both success and error cases
   - Verify error messages and status codes
   - Test edge cases and boundary conditions

## Coverage Requirements
- Minimum 80% coverage for:
  - Statements
  - Branches
  - Functions
  - Lines

## Continuous Integration
- Tests run automatically on pull requests
- Coverage reports generated and checked
- All tests must pass before merging

## Debugging Tests
1. Use `--verbose` flag for detailed output
2. Enable Jest debug mode:
   ```bash
   node --inspect-brk node_modules/.bin/jest --runInBand
   ```
3. Use console.log() or debug breakpoints

## Common Issues and Solutions
1. **Timeouts**
   - Increase timeout in jest.config.ts
   - Check for async operations not being properly awaited

2. **Database Conflicts**
   - Ensure proper cleanup between tests
   - Use unique test data
   - Reset database state in setup/teardown

3. **Type Errors**
   - Verify tsconfig.json includes test files
   - Check @types dependencies are installed
   - Ensure proper type definitions in tests/types.d.ts

## Test Performance

### Test Timing Thresholds
- Tests taking longer than 10 seconds are marked as "slow" (highlighted in red)
- This threshold is configured in `jest.config.ts` using `slowTestThreshold: 10`
- API tests naturally take longer due to:
  - HTTP requests
  - Database operations
  - Server response time

### Optimizing Test Performance
1. **Parallel Test Execution**
   - Jest runs tests in parallel by default
   - Use `--runInBand` for sequential execution when needed

2. **Database Operations**
   - Use transactions when possible
   - Clean up test data efficiently
   - Consider using test database snapshots

3. **Network Requests**
   - Mock external services when appropriate
   - Use local development server
   - Consider request timeouts

## Adding New Tests
1. Create test file in appropriate directory
2. Import required dependencies and types
3. Follow existing test patterns
4. Update coverage thresholds if needed
5. Document any new test utilities or helpers

## Future Improvements
- [ ] Add E2E testing with Cypress
- [ ] Implement test data factories
- [ ] Add performance testing
- [ ] Improve test reporting
- [ ] Add API contract testing
