export type AuthSession = {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
    emailVerified?: string | null;
  };
  expires?: string;
};

export const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3001";

const AUTH_TOKEN_KEY = "pixgallery_auth_token";
const AUTH_CHANGED_EVENT = "pixgallery-auth-changed";

function canUseBrowserStorage() {
  return typeof window !== "undefined";
}

export function getStoredAuthToken(): string | null {
  if (!canUseBrowserStorage()) {
    return null;
  }
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredAuthToken(token: string) {
  if (!canUseBrowserStorage()) {
    return;
  }
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function clearStoredAuthToken() {
  if (!canUseBrowserStorage()) {
    return;
  }
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export async function getSession(): Promise<AuthSession | null> {
  const token = getStoredAuthToken();

  if (token) {
    const response = await fetch(`${backendUrl}/api/auth/me`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const payload = (await response.json()) as {
        ok: boolean;
        user?: AuthSession["user"];
      };

      if (payload.user) {
        return { user: payload.user };
      }
    } else if (response.status === 401) {
      clearStoredAuthToken();
    }
  }

  const response = await fetch(`${backendUrl}/api/auth/session`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const session = (await response.json()) as AuthSession;
  return session.user ? session : null;
}

export function googleSignInUrl(callbackPath = "/profile") {
  const callbackUrl = encodeURIComponent(`http://localhost:3000${callbackPath}`);
  return `${backendUrl}/auth/signin?callbackUrl=${callbackUrl}`;
}

export async function signOut() {
  clearStoredAuthToken();

  try {
    const csrfResponse = await fetch(`${backendUrl}/api/auth/csrf`, {
      credentials: "include",
    });

    if (csrfResponse.ok) {
      const { csrfToken } = (await csrfResponse.json()) as { csrfToken: string };

      await fetch(`${backendUrl}/api/auth/signout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          csrfToken,
          callbackUrl: "http://localhost:3000/auth/login",
        }),
      });
    }
  } catch {
    // No-op: local session is already cleared.
  }

  window.location.href = "/auth/login";
}
