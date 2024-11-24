# Test Implementation Guide

> This is the implementation guide for the Live Music Finder API test infrastructure.
> For comprehensive documentation, see [Testing Infrastructure Documentation](/docs/testing-infrastructure.md).

## Quick Start

```bash
# Run all tests
npm test

# Run specific test file
npm test -- venues.test.ts

# Run tests with specific environment
NODE_ENV=staging npm test
```

## Directory Structure

```
tests/
├── api/                    # API endpoint tests
│   └── venues.test.ts     # Venue endpoint tests
├── data/                  # Test data definitions
│   ├── events.ts         # Event test data
│   └── venues.ts         # Venue test data
├── setup/                # Test setup utilities
│   └── testServer.ts    # Test server management
├── types/               # TypeScript type definitions
│   ├── api.ts          # Generic API types
│   ├── events.ts       # Event-specific types
│   └── venues.ts       # Venue-specific types
├── utils/              # Test utilities
│   ├── apiClient.ts    # API client for tests
│   ├── environment.ts  # Environment utilities
│   └── testData.ts     # Test data management
├── config.ts          # Test configuration
├── setup.ts          # Jest setup file
└── README.md        # This file
```

## Implementation Details

### Configuration
- `config.ts`: Environment-specific configuration
  - Loads from environment variables
  - Provides defaults for development
  - Supports environment overrides

### Test Data Management
- `data/`: Test data definitions per resource
  - Typed test data fixtures
  - Environment-specific data sets
- `utils/testData.ts`: Test data helpers
  - Data validation
  - Environment-aware selection

### Type System
- `types/`: TypeScript definitions
  - Modular type organization
  - Shared API response types
  - Resource-specific types

### Test Utilities
- `utils/apiClient.ts`: HTTP client wrapper
  - Environment-aware base URL
  - Common request/response handling
- `utils/environment.ts`: Environment detection
  - Current environment validation
  - Environment variable management

## Environment Support

Tests run in multiple environments:
- development (default)
- staging
- production

Configure via environment variables:
- `NODE_ENV`: Environment name
- `API_URL`: API endpoint URL

## Adding New Tests

1. Create test file in appropriate directory
2. Import required utilities and types
3. Use test data helpers for fixtures
4. Follow existing patterns for structure

For detailed guidelines, best practices, and more information, see the [Testing Infrastructure Documentation](/docs/testing-infrastructure.md).
