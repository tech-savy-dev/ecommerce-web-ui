// Fetch products from BFF (auth-service) using session cookie
export async function fetchProducts() {
		// Call BFF (auth-service) which will mint internal JWT and call product service
		const response = await fetch('/api/v1/product/productCheck', {
		credentials: 'include', // ensures session cookie is sent
	});
	if (!response.ok) throw new Error('Failed to fetch products');
	return response.json();
}
