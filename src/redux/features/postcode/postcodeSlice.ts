import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PostcodeState {
  postcode: string;
  addressLabel: string;
  selectedService: string;
  isValid: boolean;
  error: string | null;
}

const initialState: PostcodeState = {
  postcode: '',
  addressLabel: '',
  selectedService: 'home-loan',
  isValid: false,
  error: null,
};

const AU_POSTCODE_REGEX = /^[0-9]{4}$/;

const postcodeSlice = createSlice({
  name: 'postcode',
  initialState,
  reducers: {
    setPostcode: (state, action: PayloadAction<string>) => {
      const value = action.payload.replace(/\D/g, '').slice(0, 4);
      state.postcode = value;
      state.isValid = AU_POSTCODE_REGEX.test(value);
      state.error =
        value.length > 0 && !state.isValid
          ? 'Please enter a valid 4-digit postcode'
          : null;
    },
    setSelectedService: (state, action: PayloadAction<string>) => {
      state.selectedService = action.payload;
    },
    setExploreLocation: (
      state,
      action: PayloadAction<{ label: string; postcode: string }>
    ) => {
      state.addressLabel = action.payload.label;
      state.postcode = action.payload.postcode;
      state.isValid = AU_POSTCODE_REGEX.test(action.payload.postcode);
      state.error = null;
    },
    setLocationQuery: (state, action: PayloadAction<string>) => {
      state.addressLabel = action.payload;
      const digits = action.payload.replace(/\D/g, '').slice(0, 4);
      if (/^[0-9]{4}$/.test(action.payload.trim())) {
        state.postcode = action.payload.trim();
        state.isValid = true;
        state.error = null;
        return;
      }
      if (AU_POSTCODE_REGEX.test(digits) && action.payload.trim().length <= 4) {
        state.postcode = digits;
        state.isValid = digits.length === 4;
        state.error =
          digits.length > 0 && digits.length < 4
            ? 'Please enter a valid 4-digit postcode'
            : null;
        return;
      }
      state.postcode = '';
      state.isValid = false;
      state.error = null;
    },
    clearPostcode: (state) => {
      state.postcode = '';
      state.addressLabel = '';
      state.isValid = false;
      state.error = null;
    },
  },
});

export const {
  setPostcode,
  setSelectedService,
  setExploreLocation,
  setLocationQuery,
  clearPostcode,
} = postcodeSlice.actions;
export default postcodeSlice.reducer;

export const selectPostcode = (state: { postcode: PostcodeState }) =>
  state.postcode;
