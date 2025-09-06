import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../products/productsSlice";

interface CartItem extends Product {
  quantity: number;
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      return state.filter(i => i.id !== action.payload);
    },
    decrementFromCart: (state, action: PayloadAction<number>) => {
      const item = state.find(i => i.id === action.payload);
      if (!item) return state;
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // remove item when quantity would go to zero
        return state.filter(i => i.id !== action.payload);
      }
    }
  }
});

export const { addToCart, removeFromCart, decrementFromCart } = cartSlice.actions;
export default cartSlice.reducer;
