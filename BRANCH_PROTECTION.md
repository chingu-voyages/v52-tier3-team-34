# Branch Protection Strategy

## Branch Structure
```
main (production)
  └── development (staging, default branch)
       └── feature/* (work branches)
```

## Default Branch
- ✅ Set `development` as default branch
- ✅ All new feature branches should start from `development`
- ✅ Default PR target will be `development`

## Protection Rules (GitHub Settings)

### Main Branch (main)
- ✅ No direct commits
- ✅ Requires pull request before merging
- ✅ Requires 1 reviewer approval
- ✅ Requires status checks to pass before merging
  - Enable "Require branches to be up to date before merging"
- ✅ Block force pushes
- ✅ Restrict deletions

### Development Branch (development)
- ✅ No direct commits
- ✅ Requires pull request before merging
- ✅ Requires 1 reviewer approval
- ✅ Requires status checks to pass before merging
  - Enable "Require branches to be up to date before merging"
- ✅ Block force pushes
- ✅ Restrict deletions

## Team Practices (Not Enforced by GitHub)

### Branch Flow
- Only merge `development` into `main`
- Only merge feature branches into `development`

### Branch Naming Convention
- `feature/*`  - New features
- `fix/*`      - Bug fixes
- `bugfix/*`   - Alternative to fix/*
- `hotfix/*`   - Urgent fixes for production
- `release/*`  - Release preparation
- `chore/*`    - Maintenance tasks, dependencies
- `refactor/*` - Code refactoring
- `docs/*`     - Documentation updates
- `test/*`     - Test additions or modifications
- `style/*`    - Code style/formatting changes

Examples:
- `feature/user-authentication`
- `fix/login-validation`
- `hotfix/security-patch`
- `release/v1.0.0`
- `chore/update-dependencies`
- `refactor/api-structure`
- `docs/api-documentation`
- `test/user-service`
- `style/lint-fixes`

## Setup Steps in GitHub

1. Set Default Branch:
   - Go to Settings > Branches
   - Change default branch to `development`

2. Protect Main Branch:
   - Go to Settings > Branches > Add rule
   - Branch name pattern: `main`
   - Enable:
     - "Require a pull request before merging"
     - "Require approvals" (set to 1)
     - "Require status checks to pass before merging"
       - Check "Require branches to be up to date before merging"
     - "Block force pushes"
     - "Restrict deletions"

3. Protect Development Branch:
   - Add another rule
   - Branch name pattern: `development`
   - Enable same settings as main branch

## Workflow
1. Clone repository (gets `development` branch)
2. Create feature branch from `development` using naming convention
3. Work on feature branch
4. Create PR to merge into `development`
5. Get approval from 1 reviewer
6. Merge feature into `development`
7. When ready for production, create PR from `development` to `main`

This setup ensures:
- ✅ Code quality through review process
- ✅ Stable production branch (`main`)
- ✅ Clean development history
- ✅ Clear feature isolation

Note: Branch name restrictions and source branch restrictions are only available in GitHub Enterprise. These will be enforced through team practices and code review process.