# Security Specification for IOIS Platform

## Data Invariants
1. A user document `/users/{userId}` can only be accessed or modified by the authenticated user whose `request.auth.uid == userId`.
2. A user's subcollections `/users/{userId}/savedItems/{itemId}` and `/users/{userId}/kidProgress/{progressId}` can only be accessed or mutated by that user (`request.auth.uid == userId`).
3. Document IDs must be valid alphanumeric strings of max length 128 (`isValidId(id)`).
4. No unauthenticated user can read or write any user data.
5. All catch-all paths are denied by default.

## The Dirty Dozen Payloads (Targeting Rejection)
1. Unauthenticated read to `/users/{userId}` -> DENIED
2. User A attempting to read `/users/{userB}` -> DENIED
3. User A attempting to write into `/users/{userB}` -> DENIED
4. User A attempting to create saved item under `/users/{userB}/savedItems/{itemId}` -> DENIED
5. User A attempting to list items from `/users/{userB}/savedItems` -> DENIED
6. Attacker injecting oversized path variable `id` (> 128 chars or special chars) -> DENIED
7. User attempting to delete `/users/{userB}/savedItems/{itemId}` -> DENIED
8. Unauthenticated query on `savedItems` -> DENIED
9. Malicious write with non-matching `userId` field -> DENIED
10. Attacker writing to arbitrary collection `/admin_secrets` -> DENIED
11. Unauthenticated write to `kidProgress` -> DENIED
12. Cross-user modification of kid progress -> DENIED
