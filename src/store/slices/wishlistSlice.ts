import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';
import { toast } from 'react-toastify';

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: JSON.parse(localStorage.getItem('wishlist') || '[]'),
};

const saveWishlistToLocalStorage = (items: Product[]) => {
  localStorage.setItem('wishlist', JSON.stringify(items));
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveWishlistToLocalStorage(state.items);
        toast.success('Added to wishlist!');
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveWishlistToLocalStorage(state.items);
      toast.info('Removed from wishlist');
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToLocalStorage(state.items);
      toast.info('Wishlist cleared');
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;