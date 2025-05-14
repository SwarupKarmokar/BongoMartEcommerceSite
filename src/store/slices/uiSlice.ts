import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isMobileMenuOpen: boolean;
  isDarkMode: boolean;
}

const initialState: UIState = {
  isMobileMenuOpen: false,
  isDarkMode: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('darkMode', state.isDarkMode.toString());
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleMobileMenu, closeMobileMenu, toggleDarkMode, setDarkMode } = uiSlice.actions;
export default uiSlice.reducer;