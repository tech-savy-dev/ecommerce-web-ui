import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { clearAuth } from "../features/auth/authSlice";
import { googleSignOut } from "../features/auth/authService";

export default function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const signOut = () => {
    googleSignOut();
    dispatch(clearAuth());
  };

  return { auth, signOut };
}
