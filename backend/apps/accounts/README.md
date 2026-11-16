# accounts

Identity app. Owns the custom `User` model.

**Implemented:** UUID-keyed, email-identified `User` model, its manager, and Django Admin registration.

**Not implemented:** registration, login/logout, password reset, email verification, profiles. These belong to a later authentication task.

## Intended authentication strategy (not yet built)

- **Web:** secure HttpOnly cookies with CSRF protection; server-side session or token handling.
- **Mobile:** short-lived access tokens with rotating refresh tokens, stored in Expo SecureStore; refresh tokens revoked on logout or security events.
- Both clients use the same Django authentication and authorisation rules.
- Credentials are never stored in `localStorage` or `AsyncStorage`.
