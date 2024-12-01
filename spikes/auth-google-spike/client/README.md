# Google OAuth Authentication Spike - Client

This spike explores implementing Google OAuth2 authentication in a React client application, working with our custom backend server.

## Tech Stack
- React + TypeScript
- Vite for build tooling
- @tanstack/react-router for routing
- @react-oauth/google for Google OAuth
- Tailwind CSS for styling
- Axios for API requests
- Zod for runtime type validation

## Project Structure
```
/client
├── src/
│   ├── auth/        # Authentication related components and hooks
│   ├── components/  # Reusable UI components
│   ├── pages/       # Page components
│   ├── services/    # API and external services
│   ├── styles/      # Global styles and Tailwind configuration
│   └── types/       # TypeScript type definitions
```

## Development Setup

### Prerequisites
- Node.js 18+
- npm 9+
- Google OAuth credentials (Client ID and Secret)

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment Configuration:
   - Copy `.env.example` to `.env`
   - Configure your Google OAuth credentials
   - Set the API URL (default: http://localhost:3000)

3. Start Development Server:
   ```bash
   npm run dev
   ```

## Implementation Details

### Authentication Flow
1. User clicks "Login with Google"
2. Google OAuth popup opens
3. On successful authentication:
   - Receive Google ID token
   - Exchange token with our backend
   - Store JWT for subsequent requests

### Security Considerations
- OAuth credentials stored in `.env`
- No sensitive data in localStorage
- Token validation on each protected request

### Type Safety
- TypeScript for compile-time safety
- Zod for runtime validation
- Environment variable type definitions

## Testing Instructions
1. Start the development server
2. Test authentication flow:
   - Login with Google
   - Access protected routes
   - Test token expiration
   - Test logout flow

## Known Issues & Limitations
- Document any issues discovered during development
- Add workarounds if applicable

## Lessons Learned
- Document key decisions and their rationale
- Note improvements for main project implementation

## Development Decisions & Notes
- Update this section as we implement features
- Document important architectural decisions
- Note any challenges and solutions
