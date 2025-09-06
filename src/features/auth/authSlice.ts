import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "./types";

interface AuthState {
  isLoggedIn: boolean;
  token?: string | null;
  user?: UserProfile | null;
}

const initialState: AuthState = { isLoggedIn: false, token: null, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; user: UserProfile }>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    clearAuth: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
