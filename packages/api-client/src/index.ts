import createClient, { type Middleware } from "openapi-fetch";

/**
 * Framework-independent API client factory.
 *
 * Typed with an empty `paths` map until the backend OpenAPI schema exists and
 * `@roomsync/contracts` exports generated types.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Paths = {};

export interface ApiClientConfig {
  /** Base URL of the backend API, e.g. http://localhost:8000/api */
  baseUrl: string;
  /**
   * Integration point for future authentication. Called per request; return
   * a token to send as a Bearer header, or null/undefined for anonymous calls.
   */
  getAuthToken?: () => string | null | undefined | Promise<string | null | undefined>;
}

export function createApiClient({ baseUrl, getAuthToken }: ApiClientConfig) {
  const client = createClient<Paths>({ baseUrl });

  if (getAuthToken) {
    const authMiddleware: Middleware = {
      async onRequest({ request }) {
        const token = await getAuthToken();
        if (token) request.headers.set("Authorization", `Bearer ${token}`);
        return request;
      },
    };
    client.use(authMiddleware);
  }

  return client;
}

export type ApiClient = ReturnType<typeof createApiClient>;
