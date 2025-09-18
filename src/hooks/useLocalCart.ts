import { useState, useEffect, useCallback } from 'react';

type CartItem = { id: string; qty: number };

const STORAGE_KEY = 'local_cart_v1';

function readStored(): CartItem[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

export default function useLocalCart() {
	const [items, setItems] = useState<CartItem[]>(() => readStored());

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		} catch {
			// ignore
		}
	}, [items]);

	const add = useCallback((id: string, qty = 1) => {
		setItems((prev) => {
			const found = prev.find((p) => p.id === id);
			if (found) return prev.map((p) => (p.id === id ? { ...p, qty: p.qty + qty } : p));
			return [...prev, { id, qty }];
		});
	}, []);

	const remove = useCallback((id: string) => {
		setItems((prev) => prev.filter((p) => p.id !== id));
	}, []);

	const update = useCallback((id: string, qty: number) => {
		setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
	}, []);

	const clear = useCallback(() => setItems([]), []);

	return { items, add, remove, update, clear };
}


