import { useAppSelector } from "../app/hooks";

export function useAuth() {
  // Returns the global auth state from Redux
  const auth = useAppSelector(state => state.auth);
  return auth && auth.isLoggedIn
    ? { authenticated: true, userId: auth.user?.id, email: auth.user?.email }
    : { authenticated: false };
}