// Removed duplicate logout declaration
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuth, clearAuth } from "./authSlice";
export const logout = createAsyncThunk(
	"auth/logout",
	async (_, { dispatch }) => {
		const apiBase = process.env.REACT_APP_API_BASE || ((window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:8080' : '');
	const url = apiBase ? `${apiBase.replace(/\/$/, '')}/logout` : '/logout';
		try {
			await fetch(url, { method: 'POST', credentials: 'include' });
		} catch {}
		dispatch(clearAuth());
	}
);

export const fetchAuthMe = createAsyncThunk(
	"auth/fetchAuthMe",
	async (_, { dispatch }) => {
		const apiBase = process.env.REACT_APP_API_BASE || ((window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:8080' : '');
		const url = apiBase ? `${apiBase.replace(/\/$/, '')}/api/v1/auth/me` : '/api/v1/auth/me';
		try {
			const response = await fetch(url, { credentials: 'include' });
			if (response.status === 401) {
				dispatch(clearAuth());
				return;
			}
			const data = await response.json();
			if (data && data.authenticated && data.email) {
				dispatch(setAuth({ token: null, user: data }));
			} else {
				dispatch(clearAuth());
			}
		} catch {
			dispatch(clearAuth());
		}
	}
);
