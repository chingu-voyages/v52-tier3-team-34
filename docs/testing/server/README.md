# Server Testing Documentation

## Overview
This directory contains comprehensive documentation for the Live Music Finder backend testing infrastructure. Our testing approach focuses on type safety, clean data management, and environment-aware testing.

## Documentation Structure

### 1. [Testing Infrastructure](./testing-infrastructure.md)
- Architecture overview
- Key components
- Current test coverage
- Future enhancements

### 2. [Test Data Guide](./test-data-guide.md)
- Test data management system
- Available helpers
- Data requirements
- Seeding instructions

### 3. [Testing Workflow](./testing-workflow.md)
- Running tests
- Environment configuration
- Best practices
- Troubleshooting guide

## Quick Start

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Seed test data:
   ```bash
   npm run seed
   ```

3. Run tests:
   ```bash
   npm test
   ```

## Key Features
- Type-safe API testing
- Environment-aware test configuration
- Clean response handling (no circular references)
- Centralized test data management
- Clear error messages and troubleshooting

## Current Status
- ✅ Venues API tests
- 🔄 Users API tests (planned)
- 🔄 Events API tests (planned)

## Contributing
When adding new tests:
1. Review the test data guide
2. Use existing helpers and patterns
3. Update documentation as needed
4. Follow type-safe practices
