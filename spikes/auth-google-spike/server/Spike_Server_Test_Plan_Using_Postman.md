# Auth Spike Test Plan Using Postman

## Prerequisites
- Server running at http://localhost:3000
- Postman collection imported
- Environment variables configured:
  - `GOOGLE_CLIENT_ID` (from Google Cloud Console)
  - `GOOGLE_CLIENT_SECRET` (from Google Cloud Console)
  - `BASE_URL` (http://localhost:3000/api/v1)

## Initial Setup

### Step 0: Configure OAuth in Postman
1. Import both the collection and environment files
2. Set your environment variables in Postman
3. Go to "Get Google ID Token" request
4. In the Authorization tab, configure OAuth 2.0 exactly as follows:

```
Type: OAuth 2.0
Add auth data to: Request Headers
Token Name: Google OAuth
Grant Type: Authorization Code
Callback URL: https://oauth.pstmn.io/v1/callback
Auth URL: https://accounts.google.com/o/oauth2/v2/auth
Access Token URL: https://oauth2.googleapis.com/token
Client ID: {{GOOGLE_CLIENT_ID}}
Client Secret: {{GOOGLE_CLIENT_SECRET}}
Scope: email profile openid
State: (leave empty)
Client Authentication: Send as Basic Auth header
```

5. Click "Get New Access Token"
6. Complete Google sign-in
7. In the token response, copy the ID token (not the Access token)
8. Use this ID token for subsequent "Login with Google" requests

## Test Suites

### 1️⃣ Health Check Tests

#### 1.1 Public Health Check
**Endpoint**: GET `/health`

**Steps**:
1. Send GET request to `/health`
2. Verify response status and format

**Acceptance Criteria**:
- [ ] Returns 200 status code
- [ ] Response matches format: `{ status: "up" }`
- [ ] Content-Type header is "application/json"
- [ ] Works without authentication

#### 1.2 Protected Health Check
**Endpoint**: GET `/health/auth`

**Steps**:
1. Try without token
2. Try with invalid token
3. Try with valid token (after login)

**Acceptance Criteria**:
- [ ] Without token: Returns 401 Unauthorized
- [ ] With invalid token: Returns 401 Unauthorized
- [ ] With valid token:
  - [ ] Returns 200 status code
  - [ ] Response includes authenticated user data
  - [ ] Response format matches:
    ```json
    {
      "status": "up",
      "auth": {
        "status": "authenticated",
        "provider": "google",
        "user": {
          "id": number,
          "email": string,
          "name": string,
          "profileImage": string
        }
      },
      "timestamp": string
    }
    ```

### 2️⃣ Authentication Flow Tests

#### 2.1 Google Token Acquisition
**Request**: "Get Google Token"

**Steps**:
1. Open "Get Google Token" request
2. Click "Authorization" tab
3. Click "Get New Access Token"
4. Complete Google login
5. Copy ID token to environment

**Acceptance Criteria**:
- [ ] OAuth 2.0 flow starts successfully
- [ ] Redirects to Google login
- [ ] Successfully returns to Postman
- [ ] Receives valid ID token
- [ ] Token can be saved to environment

#### 2.2 Login Endpoint
**Endpoint**: POST `/auth/login`

**Steps**:
1. Try without token
2. Try with invalid token
3. Try with valid Google ID token

**Acceptance Criteria**:
- [ ] Without token: Returns 400 Bad Request
- [ ] With invalid token: Returns 401 Unauthorized
- [ ] With valid token:
  - [ ] Returns 200 status code
  - [ ] Returns JWT token
  - [ ] Returns user profile
  - [ ] Creates/updates user in database
  - [ ] Response format matches:
    ```json
    {
      "token": string,
      "user": {
        "id": number,
        "email": string,
        "name": string,
        "profileImage": string
      }
    }
    ```

#### 2.3 Profile Endpoint
**Endpoint**: GET `/auth/profile`

**Steps**:
1. Try without token
2. Try with invalid token
3. Try with valid JWT (from login)

**Acceptance Criteria**:
- [ ] Without token: Returns 401 Unauthorized
- [ ] With invalid token: Returns 401 Unauthorized
- [ ] With valid token:
  - [ ] Returns 200 status code
  - [ ] Returns correct user data
  - [ ] Data matches login response

#### 2.4 Logout Endpoint
**Endpoint**: POST `/auth/logout`

**Steps**:
1. Try without token
2. Try with invalid token
3. Try with valid JWT
4. Try using same JWT after logout

**Acceptance Criteria**:
- [ ] Without token: Returns 401 Unauthorized
- [ ] With invalid token: Returns 401 Unauthorized
- [ ] With valid token:
  - [ ] Returns 200 status code
  - [ ] Returns success message

### 3️⃣ Error Handling Tests

#### 3.1 Invalid Routes
**Test**: Request non-existent endpoints

**Steps**:
1. Try accessing non-existent route
2. Try accessing valid route with typo

**Acceptance Criteria**:
- [ ] Returns 404 Not Found
- [ ] Returns clear error message

#### 3.2 Invalid Methods
**Test**: Use wrong HTTP methods

**Steps**:
1. Try POST on GET endpoints
2. Try GET on POST endpoints

**Acceptance Criteria**:
- [ ] Returns 405 Method Not Allowed
- [ ] Returns clear error message

#### 3.3 Malformed Requests
**Test**: Send invalid data

**Steps**:
1. Send missing required fields
2. Send invalid field types
3. Send extra fields

**Acceptance Criteria**:
- [ ] Returns 400 Bad Request
- [ ] Returns descriptive validation errors
- [ ] Handles missing fields appropriately
- [ ] Handles invalid types appropriately

### 4️⃣ Security Tests

#### 4.1 Token Validation
**Test**: Test token security

**Steps**:
1. Try modified JWT token
2. Try expired token
3. Try token with invalid signature

**Acceptance Criteria**:
- [ ] Rejects modified tokens
- [ ] Rejects expired tokens
- [ ] Rejects invalid signatures
- [ ] Returns appropriate 401 errors

#### 4.2 Request Validation
**Test**: Test input validation

**Steps**:
1. Try SQL injection in fields
2. Try XSS in text fields
3. Try oversized payloads

**Acceptance Criteria**:
- [ ] Sanitizes input data
- [ ] Validates data types
- [ ] Prevents injection attempts
- [ ] Returns appropriate 400 errors

## Test Execution Order
1. Health Check Tests (verify basic setup)
2. Authentication Flow (core functionality)
3. Error Handling (robustness)
4. Security Tests (protection)

## Recording Results
- Use checkboxes to track progress
- Document any failures or issues
- Note any unexpected behavior
- Record suggestions for improvements

## Success Criteria
- All test cases pass
- No security vulnerabilities found
- Error handling is consistent
- Response formats match specifications
- Authentication flow works end-to-end