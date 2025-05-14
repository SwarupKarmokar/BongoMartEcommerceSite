import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductFilters } from '../../types';
import { fetchProducts, fetchProductsByCategory } from '../../api/products';

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  filters: ProductFilters;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
    searchQuery: '',
    sortBy: 'default',
  },
  isLoading: false,
  error: null,
};

// Fetch all products
export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const data = await fetchProducts();
  return data;
});

// Fetch products by category
export const getProductsByCategory = createAsyncThunk(
  'products/getProductsByCategory',
  async (category: string) => {
    const data = await fetchProductsByCategory(category);
    return data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      
      // Apply filters
      let filtered = [...state.items];
      
      if (state.filters.category) {
        filtered = filtered.filter(product => product.category === state.filters.category);
      }
      
      if (state.filters.minPrice !== null) {
        filtered = filtered.filter(product => product.price >= (state.filters.minPrice || 0));
      }
      
      if (state.filters.maxPrice !== null) {
        filtered = filtered.filter(product => product.price <= (state.filters.maxPrice || Infinity));
      }
      
      if (state.filters.searchQuery) {
        const query = state.filters.searchQuery.toLowerCase();
        filtered = filtered.filter(
          product => 
            product.title.toLowerCase().includes(query) || 
            product.description.toLowerCase().includes(query)
        );
      }
      
      // Sort products
      switch (state.filters.sortBy) {
        case 'price_low_high':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_high_low':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
        default:
          // Keep default order
          break;
      }
      
      state.filteredItems = filtered;
    },
    
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all products
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      
      // Get products by category
      .addCase(getProductsByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
        state.filters.category = action.meta.arg; // Update category filter
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products by category';
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;