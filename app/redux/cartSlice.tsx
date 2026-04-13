import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  cartOpen: boolean;
};

const initialState: CartState = {
  items: [],
  cartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        price: number;
        thumbnail: string;
      }>,
    ) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      state.items.push({
        ...action.payload,
        quantity: 1,
      });
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find((item) => item.id === action.payload);

      if (!existingItem) {
        return;
      }

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        return;
      }

      existingItem.quantity -= 1;
    },
    clearCart: (state) => {
      state.items = [];
      state.cartOpen = false;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.cartOpen = action.payload;
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  clearCart,
  setCartOpen,
  toggleCart,
} = cartSlice.actions;

export default cartSlice.reducer;
