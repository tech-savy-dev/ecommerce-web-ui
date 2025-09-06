import { createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

const initialState: Product[] = [
  { id: 1, name: "Laptop", price: 1200, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=60&auto=format&fit=crop" },
  { id: 2, name: "Headphones", price: 150, image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&q=60&auto=format&fit=crop" },
  { id: 3, name: "Keyboard", price: 80, image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&q=60&auto=format&fit=crop" },
];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {}
});

export default productsSlice.reducer;
