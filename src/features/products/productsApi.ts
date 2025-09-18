// Fetch products from BFF (auth-service) using session cookie
import localProducts from '../../data/products.json';

export async function fetchProducts(): Promise<any[]> {
	const apiBase = process.env.REACT_APP_API_BASE || '';
	const forceLocal = (process.env.REACT_APP_FORCE_LOCAL_PRODUCTS || '').toLowerCase() === 'true';
	if (forceLocal) {
		return localProducts as any;
	}
	const url = `${apiBase}/api/v1/product/productCheck`;

	try {
		const response = await fetch(url, {
			credentials: 'include',
		});

		if (response.status === 200) {
			try {
				return localProducts as any;
			} catch (e) {
				console.warn('fetchProducts: failed to parse JSON from API, falling back to local data', e);
				try {
					return localProducts as any;
				} catch (e) {
					console.warn('fetchProducts: failed to load local products', e);
				}
			}
		} else {
			console.warn(`fetchProducts: API returned status ${response.status}, falling back to local data`);
		}
	} catch (e) {
		console.warn('fetchProducts: error fetching from API, falling back to local data', e);
	}

	return localProducts as any;
}
