import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import { toast } from 'react-toastify';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  error: null,
};

// Mock user data for demo purposes
const MOCK_USERS = [
  { id: 1, email: 'user@example.com', password: 'password', name: 'John Doe' },
  { id: 2, email: 'jane@example.com', password: 'password', name: 'Jane Smith' },
];

// Check if user is already logged in from local storage
export const checkAuthState = createAsyncThunk('auth/checkState', async () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr) as User;
  }
  return null;
});

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!user) {
        return rejectWithValue('Invalid email or password');
      }
      
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (error) {
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (
    { name, email, password }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const existingUser = MOCK_USERS.find(u => u.email === email);
      
      if (existingUser) {
        return rejectWithValue('Email already in use');
      }
      
      // Create new user (in a real app, this would be an API call)
      const newUser = {
        id: MOCK_USERS.length + 1,
        name,
        email,
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return newUser;
    } catch (error) {
      return rejectWithValue('Registration failed. Please try again.');
    }
  }
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check auth state
      .addCase(checkAuthState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(checkAuthState.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        toast.success('Login successful!');
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        toast.success('Registration successful!');
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        toast.success('Logged out successfully');
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;