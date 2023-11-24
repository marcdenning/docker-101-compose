# Movie API

> JSON API for movie data using Express and Node.js.

## Configuration

Set the `PORT` variable to specify which port the API will listen on.

Set the `MONGO_URL` variable to the full MongoDB connection string.

To enable authentication of requests with JWT access tokens, set the following environment variables.
If these variables are not set, then authentication will not be required.

Inspect your OAuth provider's `.well-known/openid-configuration` endpoint for some of these details.
You may also want to set up your OAuth provider to work with Postman, and inspect the access tokens to determine the appropriate issuer and audience according to your provider's behavior.

```
AUTH_ISSUER=https://YOUR_ISSUER_DOMAIN
AUTH_JWKS_URI=https://URI-TO-WELL-KNOWN-JWKS-ENDPOINT
AUTH_AUDIENCE=https://my-api.com
```
