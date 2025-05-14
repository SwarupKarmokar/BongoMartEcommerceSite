import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../../types';
import { toast } from 'react-toastify';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

// Fetch cart from local storage
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const cartStr = localStorage.getItem('cart');
  if (cartStr) {
    return JSON.parse(cartStr) as CartItem[];
  }
  return [] as CartItem[];
});

// Helper function to save cart to local storage
const saveCartToLocalStorage = (items: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
      
      saveCartToLocalStorage(state.items);
      toast.success(`${product.title.substring(0, 20)}... added to cart!`);
    },
    
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const itemIndex = state.items.findIndex(item => item.product.id === productId);
      
      if (itemIndex >= 0) {
        const productName = state.items[itemIndex].product.title;
        state.items.splice(itemIndex, 1);
        saveCartToLocalStorage(state.items);
        toast.info(`${productName.substring(0, 20)}... removed from cart`);
      }
    },
    
    updateCartItemQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product.id === productId);
      
      if (item) {
        item.quantity = quantity;
        saveCartToLocalStorage(state.items);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
      toast.info('Cart cleared');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch cart';
      });
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;