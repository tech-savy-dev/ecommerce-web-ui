import React from "react";

export const LoginButton: React.FC = () => {
  // Always target the backend BFF by default. Allow override via REACT_APP_API_BASE.
  const apiBase = process.env.REACT_APP_API_BASE || ((window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:8080' : '');
  const login = () => {
  const url = `${apiBase}/oauth2/authorization/google`;
    // eslint-disable-next-line no-console
    console.log('Login redirect to', url);
    window.location.href = url;
  };

  return <button onClick={login}>Sign in with Google</button>;
};