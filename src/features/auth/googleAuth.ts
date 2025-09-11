// Lightweight helper to load Google Identity Services script and initialize
export function loadGoogleScript(clientId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).google && (window as any).google.accounts) return resolve();
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load Google Identity Services"));
    document.head.appendChild(script);
  });
}

export function initializeGoogleButton(renderEl: HTMLElement, clientId: string, callback: (response: any) => void) {
  const google = (window as any).google;
  if (!google || !google.accounts) throw new Error('Google Identity Services not loaded');
  google.accounts.id.initialize({
    client_id: clientId,
    callback,
  });
  google.accounts.id.renderButton(renderEl, { theme: 'outline', size: 'large' });
}

// --- OAuth2 + PKCE redirect helpers (use when backend performs token exchange)
// Generates a cryptographically-random string for PKCE code verifier
export function generateCodeVerifier(length = 128): string {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  // base64url encode
  return base64UrlEncode(arrayToString(array));
}

function arrayToString(bytes: Uint8Array): string {
  let str = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return str;
}

async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await window.crypto.subtle.digest('SHA-256', data);
}

function base64UrlEncode(input: string | ArrayBuffer): string {
  let str: string;
  if (input instanceof ArrayBuffer) {
    const bytes = new Uint8Array(input);
    str = String.fromCharCode.apply(null, Array.from(bytes));
  } else {
    str = input;
  }
  // btoa on binary string
  const base64 = btoa(str);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const hashed = await sha256(verifier);
  return base64UrlEncode(hashed);
}

// Build authorization URL and redirect the browser.
// redirectUri must be registered in Google Cloud Console (Authorized redirect URIs)
export async function redirectToGoogleOAuth(options: {
  clientId: string;
  redirectUri: string;
  scope?: string; // default: 'openid email profile'
  state?: string;
  backendCallbackUrl?: string; // optional: if you want to POST the code to backend directly
}) {
  const { clientId, redirectUri, scope = 'openid email profile', state } = options;
  const codeVerifier = generateCodeVerifier(96);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // Save verifier for later exchange (backend or client)
  sessionStorage.setItem('google_oauth_code_verifier', codeVerifier);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope,
    include_granted_scopes: 'true',
    access_type: 'offline',
    prompt: 'consent',
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });
  if (state) params.set('state', state);

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  window.location.href = authUrl;
}

// Call this in the redirect handler page to extract the `code` and optionally POST to backend
export async function handleGoogleOAuthRedirect(backendExchangeEndpoint?: string): Promise<{ code?: string; error?: string } | null> {
  const url = new URL(window.location.href);
  const error = url.searchParams.get('error');
  if (error) return { error };
  const code = url.searchParams.get('code');
  if (!code) return null;

  // If a backend endpoint is provided, exchange server-side to keep client secret safe
  if (backendExchangeEndpoint) {
    const codeVerifier = sessionStorage.getItem('google_oauth_code_verifier') || '';
    try {
      const resp = await fetch(backendExchangeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, code_verifier: codeVerifier, redirect_uri: window.location.origin + window.location.pathname }),
      });
      if (!resp.ok) throw new Error(`Backend exchange failed: ${resp.status}`);
      return { code };
    } catch (e: any) {
      return { error: e.message || String(e) };
    }
  }

  // Otherwise, return the code and let caller exchange it (if you plan to call Google's token endpoint from the client — not recommended)
  return { code };
}

// Helpful note for developers (do not remove):
// - In Google Cloud Console: create OAuth 2.0 Client ID (type: Web application).
//   - Add your app's origin(s) under "Authorized JavaScript origins" (e.g. http://localhost:3000).
//   - Add the exact redirect URI used above under "Authorized redirect URIs" (e.g. http://localhost:3000/auth/callback).
// - If app is unverified, add test users under OAuth consent screen; otherwise follow verification steps.
// - Backend should perform the token exchange at `token-uri` using client credentials and the `code` (safer), or accept PKCE verifier and exchange.
