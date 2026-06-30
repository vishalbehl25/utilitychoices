import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  mobileMenuOpen: boolean;
  activeModal: string | null;
}

const initialState: UiState = {
  mobileMenuOpen: false,
  activeModal: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },
  },
});

export const { toggleMobileMenu, setMobileMenuOpen, setActiveModal } = uiSlice.actions;
export default uiSlice.reducer;

export const selectMobileMenuOpen = (state: { ui: UiState }) => state.ui.mobileMenuOpen;
