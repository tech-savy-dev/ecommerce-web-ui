import { UserProfile } from "./types";

export function parseJwt(credential: string): UserProfile & { raw: any } {
  try {
    const b64 = credential.split(".")[1];
    const json = JSON.parse(decodeURIComponent(escape(window.atob(b64))));
    return {
      id: json.sub,
      email: json.email,
      name: json.name,
      picture: json.picture,
      raw: json,
    } as any;
  } catch (e) {
    throw new Error("Invalid credential token");
  }
}

export function googleSignOut() {
  const google = (window as any).google;
  if (google && google.accounts && google.accounts.id) {
    try { google.accounts.id.disableAutoSelect(); } catch {}
  }
}
