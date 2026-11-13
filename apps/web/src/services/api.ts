import { createApiClient, type ApiClient } from "@roomsync/api-client";
import { env } from "@/config/env";

/**
 * Single integration point for backend requests. UI components must not call
 * fetch directly; future feature services build on these clients.
 */

let browserClient: ApiClient | undefined;

/** Browser client: one shared instance. Token retrieval is added with authentication. */
export function getBrowserApiClient(): ApiClient {
  browserClient ??= createApiClient({
    baseUrl: env.apiUrl,
    // TODO(auth): supply getAuthToken once authentication exists.
  });
  return browserClient;
}

/** Server client: created per call so request-scoped credentials never leak between users. */
export function createServerApiClient(): ApiClient {
  return createApiClient({
    baseUrl: env.apiUrl,
    // TODO(auth): read credentials from request cookies/headers once authentication exists.
  });
}
