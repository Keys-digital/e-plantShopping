import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      return {
        ...state,
        items: state.items.filter(item => item.name !== action.payload.name),
      };
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Selector to calculate total quantity
export const selectTotalQuantity = state => state.cart.items.reduce((total, item) => total + item.quantity, 0);

// Export the action creators
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Export the reducer as the default export
export default cartSlice.reducer;
