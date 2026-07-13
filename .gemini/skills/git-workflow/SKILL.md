---
name: git-workflow
description: >-
  Guides the agent on using standard git workflows and formatting commit messages
  in accordance with the Conventional Commits v1.0.0 specification.
---

# Git Workflow & Conventional Commits

## Overview
This skill defines git workflow policies, branch naming structures, and commit message formats to ensure a clean, searchable, and semantically versioned repository.

## Dependencies
None.

## Quick Start
To commit a new feature:
```bash
git checkout -b feat/add-login-screen
# make changes...
git add .
git commit -m "feat(auth): add login screen using clerk integration"
```

## Workflow

### 1. Branch Naming Policy
Always create descriptive branch names prefixed with the change type:
- `feat/<short-description>`: for new features (e.g. `feat/adoptable-reports`)
- `fix/<short-description>`: for bug fixes (e.g. `fix/profile-avatar-render`)
- `refactor/<short-description>`: for code reorganization/refactoring (e.g. `refactor/move-theme-constants`)
- `docs/<short-description>`: for documentation changes (e.g. `docs/update-readme`)

### 2. Commit Message Structure
Commit messages must follow the Conventional Commits v1.0.0 format:
```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

#### Commit Types
- `feat`: A new feature (corresponds to MINOR in semantic versioning).
- `fix`: A bug fix (corresponds to PATCH in semantic versioning).
- `docs`: Documentation-only changes.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, semi-colons, etc.).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance.
- `test`: Adding missing tests or correcting existing tests.
- `build`: Changes that affect the build system or external dependencies.
- `ci`: Changes to CI configuration files and scripts.
- `chore`: Other changes that do not modify src or test files.
- `revert`: Reverts a previous commit.

#### Scopes (Optional but Recommended)
Scopes should correspond to the domain feature modules or architectural components:
- `auth`: Authentication and login flows.
- `reports`: Animal reporting, feeds, and detail views.
- `matches`: Animal matching flows and visual similarity views.
- `common`: Reusable UI primitives, helpers, types, and library code.
- `deps`: Dependency upgrades or package manager lockfile changes.
- `config`: Configurations like babel, metro, tsconfig, etc.

#### Body (Optional)
Used to explain the motivation, context, and details of the changes. Keep it in the present tense (e.g. "add login validation schema instead of validating inline").

#### Footers (Optional)
Used to denote breaking changes or reference issue trackers:
- **BREAKING CHANGE**: Start the footer with `BREAKING CHANGE:` followed by a space and description. Alternatively, append a `!` after the type/scope in the header (e.g., `feat(auth)!: replace custom token storage with clerk`).
- **Issue References**: Reference closed issues (e.g., `Refs: #42` or `Closes #11`).

### 3. Commit Guidelines
- **Atomic Commits**: Keep commits focused and atomic. Avoid mixing a refactor and a new feature in the same commit.
- **Lowercase Header**: The header description must be in lowercase and imperative present tense (e.g. "add custom button component" instead of "Added custom button component").
- **No Period**: Do not end the commit header with a period.

## Common Mistakes
- **Vague Commit Headers**: Avoid headings like `fix: fixes` or `feat: updates`. Always specify what was done.
- **Uppercase Headers**: Writing `feat(common): Add Button` (incorrect) instead of `feat(common): add button` (correct).
- **Mixed Changes**: Committing formatting style fixes along with functional code changes in a single massive commit.
