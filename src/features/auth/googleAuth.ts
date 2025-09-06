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
