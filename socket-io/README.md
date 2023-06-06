# TypeScript-Node-Template

Very easy to use and set up Express app created to ease the process of starting a new (TypeScript + node JS) project.

## Auth flow

1. Login user, store JWE inside cookie, send on every request to authroize a user
2. If not logging in try to decipher the token with a request to server, if token is valid authorize on every other request, if not redirect to login page
