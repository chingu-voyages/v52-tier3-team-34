# Server Testing Workflow

## Running Tests

### Local Development
```bash
# Run all tests
npm test

# Run with specific environment
set NODE_ENV=production && npm test
```

## When to Run Tests

### During Development
- After making API changes
- Before committing code
- When modifying test data helpers

### Before Merging
1. Ensure database is in known state:
   ```bash
   npm run seed
   ```
2. Run full test suite:
   ```bash
   npm test
   ```

## Environments

### Development (default)
- Uses local database
- Default test configuration
- Quick feedback loop

### Production
- Uses production API URL
- Requires proper environment setup
- Used for smoke tests only

## Troubleshooting

### Common Issues
1. **Missing Test Data**
   - Error: "No test user found in database"
   - Solution: Run `npm run seed`

2. **Environment Issues**
   - Error: "Invalid environment"
   - Solution: Use valid environment name (development/staging/production)

### Getting Help
1. Check test output for specific error messages
2. Review test data requirements
3. Verify environment configuration
