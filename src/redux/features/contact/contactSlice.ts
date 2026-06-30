import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ServiceType =
  | 'credit-card'
  | 'nbn'
  | 'inverter'
  | 'Inverters'
  | 'personal-loan'
  | 'home-loan'
  | 'health-insurance'
  | 'life-insurance';

export interface ContactFormData {
  fullName: string;
  contactNumber: string;
  email: string;
  currentAddress: string;
  services: ServiceType[];
  termsAccepted: boolean;
}

interface ContactState {
  formData: ContactFormData;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

const initialFormData: ContactFormData = {
  fullName: '',
  contactNumber: '',
  email: '',
  currentAddress: '',
  services: [],
  termsAccepted: false,
};

const initialState: ContactState = {
  formData: initialFormData,
  isSubmitting: false,
  isSubmitted: false,
  error: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    updateFormField: (
      state,
      action: PayloadAction<{
        field: keyof ContactFormData;
        value: string | boolean | ServiceType[];
      }>
    ) => {
      const { field, value } = action.payload;
      (state.formData as Record<string, unknown>)[field] = value;
    },
    toggleService: (state, action: PayloadAction<ServiceType>) => {
      const service = action.payload;
      const index = state.formData.services.indexOf(service);
      if (index >= 0) {
        state.formData.services.splice(index, 1);
      } else {
        state.formData.services.push(service);
      }
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isSubmitted = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetForm: (state) => {
      state.formData = initialFormData;
      state.isSubmitting = false;
      state.isSubmitted = false;
      state.error = null;
    },
  },
});

export const {
  updateFormField,
  toggleService,
  setSubmitting,
  setSubmitted,
  setError,
  resetForm,
} = contactSlice.actions;
export default contactSlice.reducer;

export const selectContact = (state: { contact: ContactState }) =>
  state.contact;
